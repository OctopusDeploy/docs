1. Install NFS on the Windows VM 

   On the Windows VM, open PowerShell as an administrator, and install the NFS client:

   ```powershell
   # Install the NFS client
   Install-WindowsFeature -Name NFS-Client 
   ```

   Restart the Windows VM instance as prompted, then reconnect.

2. Configure the user ID used by the NFS client

   In PowerShell, run the following commands to create two new registry entries, `AnonymousUid` and `AnonymousGid`:

   ```powershell
   New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\ClientForNFS\CurrentVersion\Default" `
    -Name "AnonymousUid" -Value "0" -PropertyType DWORD

   New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\ClientForNFS\CurrentVersion\Default" `
    -Name "AnonymousGid" -Value "0" -PropertyType DWORD
   ```
3. Restart the NFS client service

   ```cmd
   nfsadmin client stop

   nfsadmin client start
   ```
4. Create a batch file (`.bat` or `.cmd`) to mount the NFS share.

   ```cmd
   net use X: \\your-nfs-share\share-name
   ```

   Substituting the placeholders with your own values:

   - `X:` with the mapped drive letter you want
   - `your-nfs-share` with either the host name or IP address of the Filestore instance
   - `share-name` with the Filestore instance share name

5. Create a Windows Scheduled Task to run at system startup to mount the NFS share using the batch file.
      
   Below is an example scheduled task for mounting an NFS volume. Remember to substitute `C:\OctoHA\MountNfsShare.cmd` with the path to your batch file and ensure the task is set to run as `LocalSystem`. 

   ```xml
   <?xml version="1.0" encoding="UTF-16"?>
   <Task version="1.4" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
     <RegistrationInfo>
       <URI>\OctopusDeploy - mount nfs volume</URI>
     </RegistrationInfo>
     <Triggers>
       <BootTrigger>
         <Enabled>true</Enabled>
       </BootTrigger>
     </Triggers>
     <Principals>
       <Principal id="Author">
         <UserId>S-1-5-18</UserId>
         <RunLevel>HighestAvailable</RunLevel>
       </Principal>
     </Principals>
     <Settings>
       <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
       <DisallowStartIfOnBatteries>true</DisallowStartIfOnBatteries>
       <StopIfGoingOnBatteries>true</StopIfGoingOnBatteries>
       <AllowHardTerminate>true</AllowHardTerminate>
       <StartWhenAvailable>false</StartWhenAvailable>
       <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
       <IdleSettings>
         <StopOnIdleEnd>true</StopOnIdleEnd>
         <RestartOnIdle>false</RestartOnIdle>
       </IdleSettings>
       <AllowStartOnDemand>true</AllowStartOnDemand>
       <Enabled>true</Enabled>
       <Hidden>true</Hidden>
       <RunOnlyIfIdle>false</RunOnlyIfIdle>
       <DisallowStartOnRemoteAppSession>false</DisallowStartOnRemoteAppSession>
       <UseUnifiedSchedulingEngine>true</UseUnifiedSchedulingEngine>
       <WakeToRun>false</WakeToRun>
       <ExecutionTimeLimit>PT1H</ExecutionTimeLimit>
       <Priority>5</Priority>
     </Settings>
     <Actions Context="Author">
       <Exec>
         <Command>C:\OctoHA\MountNfsShare.cmd</Command>
       </Exec>
     </Actions>
   </Task>
   ```
   
   You can add multiple Actions to a Scheduled task. If you want to be sure the NFS share is mounted *before* the Octopus Service is started, you can set the service **Startup Type** to `Manual`, and add the following command to run *after* the NFS share is mounted:

   ```cmd Command-line
   C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" checkservices --instances OctopusServer
   ```
   ```xml Scheduled Task XML Snippet
   <Exec>
     <Command>"C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe"</Command>
     <Arguments>checkservices --instances OctopusServer</Arguments>
   </Exec>

   ```
   :::div{.hint}
   This is in effect the same when using the [watchdog](/docs/octopus-rest-api/octopus.server.exe-command-line/watchdog) command to configure a scheduled task to monitor the Octopus Server service.
   :::

6. Create folders in your **NFS share** for the Artifacts, Packages, TaskLogs, Imports, and EventExports.

7. Create the symbolic links for the Artifacts, Packages, TaskLogs, Imports, and EventExports folders.

   Run the following PowerShell script, substituting the placeholder values with your own:
   
   ```powershell
   # Create the local folder to use to create the symbolic links within.
   $LocalFolder="C:\OctopusShared"
   
   if (-not (Test-Path -Path $LocalFolder)) {
      New-Item -ItemType directory -Path $LocalFolder    
   }

   $NfsShare = "\\your-nfs-share\share-name"
   
   # Create symbolic links
   $ArtifactsFolder = Join-Path -Path $LocalFolder -ChildPath "Artifacts"
   if (-not (Test-Path -Path $ArtifactsFolder)) {
       New-Item -Path $ArtifactsFolder -ItemType SymbolicLink -Value "$NfsShare\Artifacts"
   }

   $PackagesFolder = Join-Path -Path $LocalFolder -ChildPath "Packages"
   if (-not (Test-Path -Path $PackagesFolder)) {
       New-Item -Path $PackagesFolder -ItemType SymbolicLink -Value "$NfsShare\Packages"
   }

   $TaskLogsFolder = Join-Path -Path $LocalFolder -ChildPath "TaskLogs"
   if (-not (Test-Path -Path $TaskLogsFolder)) {
       New-Item -Path $TaskLogsFolder -ItemType SymbolicLink -Value "$NfsShare\TaskLogs"
   }

   $ImportsFolder = Join-Path -Path $LocalFolder -ChildPath "Imports"
   if (-not (Test-Path -Path $ImportsFolder)) {
       New-Item -Path $ImportsFolder -ItemType SymbolicLink -Value "$NfsShare\Imports"
   }

   $EventExportsFolder = Join-Path -Path $LocalFolder -ChildPath "EventExports"
   if (-not (Test-Path -Path $EventExportsFolder)) {
       New-Item -Path $EventExportsFolder -ItemType SymbolicLink -Value "$NfsShare\EventExports"
   }
   ```
   
   :::div{.hint}
   Remember to create the folders in the NFS share before trying to create the symbolic links.
   :::

Once you've completed those steps, [install Octopus](/docs/installation/) and then when you've done that on all nodes, run the [path command](/docs/octopus-rest-api/octopus.server.exe-command-line/path) to change the paths to the shared storage:

```powershell
& 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe' path `
--artifacts "C:\OctopusShared\Artifacts" `
--nugetRepository "C:\OctopusShared\Packages" `
--taskLogs "C:\OctopusShared\TaskLogs" `
--imports "C:\OctopusShared\Imports" `
--eventExports "C:\OctopusShared\EventExports"
```

:::div{.hint}
Changing the path only needs to be done once, and not on each node as the values are stored in the database.
:::