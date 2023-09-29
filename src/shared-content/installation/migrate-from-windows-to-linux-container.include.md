## Prep Work 

We recommend making the following changes and testing them on your existing Octopus Deploy instance before the move.  This prep work will keep the number of changes made during the actual migration low.

### Migrate from Active Directory to LDAP

Migrating from Active Directory to LDAP is not as simple as turning off Active Directory authentication and enabling LDAP authentication.  As far as Octopus is concerned, they are two separate auth providers.  Having Active Directory and LDAP enabled is treated the same as having Google Auth and LDAP enabled.  

Both users and teams are associated with 0 to N external identities.  The external identities are stored in an array on the user or team object.  For example, a user object with both Active Directory and LDAP could appear as:

```json
{
  "Id": "Users-1",
  "Username": "professor.octopus",
  "DisplayName": "Professor Octopus",
  "IsActive": true,
  "IsService": false,
  "EmailAddress": "professor.octopus@octopus.com",
  "CanPasswordBeEdited": true,
  "IsRequestor": true,
  "Identities": [
    {
      "IdentityProviderName": "Active Directory",
      "Claims": {
        "email": {
          "Value": "",
          "IsIdentifyingClaim": true
        },
        "upn": {
          "Value": "professor.octopus@mycustomdomain.local",
          "IsIdentifyingClaim": true
        },
        "sam": {
          "Value": "\\professor.octopus",
          "IsIdentifyingClaim": true
        },
        "dn": {
          "Value": "Professor Octopus",
          "IsIdentifyingClaim": false
        }
      }
    },
    {
      "IdentityProviderName": "LDAP",
      "Claims": {
        "email": {
          "Value": null,
          "IsIdentifyingClaim": true
        },
        "upn": {
          "Value": "professor.octopus@mycustomdomain.local",
          "IsIdentifyingClaim": true
        },
        "uan": {
          "Value": "professor.octopus",
          "IsIdentifyingClaim": true
        },
        "dn": {
          "Value": "Professor Octopus",
          "IsIdentifyingClaim": false
        }
      }
    }
  ]
}
```

To migrate from Active Directory to LDAP, you will need to:

1. Enable and configure the [LDAP auth provider](/docs/security/authentication/ldap).
2. Add the LDAP auth provider to each user and group.  We created two scripts to help speed that up:
   - [Swap Active Directory groups with matching LDAP groups](/docs/octopus-rest-api/examples/users-and-teams/swap-ad-domain-group-with-ldap-group) for Octopus teams.
   - [Swap Active Directory login records with matching LDAP ones](/docs/octopus-rest-api/examples/users-and-teams/swap-users-ad-domain-to-ldap) for Octopus users.
3. Log out with your current user and log back in, ideally with a new test user.
4. Verify permissions are as expected.
5. Test a few more users out.
6. Disable the Active Directory auth provider.

### Configure a Windows Worker

If you currently have many PowerShell and C# script steps configured to run on the Octopus Server, you will need to configure a Windows Worker to handle that responsibility.  

Under the covers, the Octopus Server includes a [built-in worker](/docs/security/built-in-worker).  When you configure a step to run on the Octopus Server, it runs on the built-in worker.  Switching from the Windows to the Linux Container means changing the underlying OS those steps previously ran on.  If your scripts are not PowerShell Core compliant, this means they will fail.  The vast majority of scripts we encounter work with both PowerShell 5.1 and PowerShell Core.  However, if you have a lot of older scripts, there is a chance they could fail.      

Instead of running directly on the Octopus Server's built-in worker, you will need to offload that work onto Windows [workers](/docs/infrastructure/workers).  

When you create your first worker, you will notice a preexisting worker pool, `Default Worker Pool`.  When the `Default Worker Pool` does not have any workers, all tasks run configured to run on the Octopus Server run on the built-in worker.  The fastest way to change all the steps configured to run on the Octopus Server to run on a worker is to add a worker to the `Default Worker Pool`.  However, doing so is also the riskiest as you cause a lot of deployments to fail.

Our recommendation is to keep that risk to a minimum.

1. Create a new worker pool, `Windows Worker Pool`.  
1. Create the new Windows Servers and configure them as workers.  Register them to the `Windows Worker Pool`.
1. Pick a handful of projects and update the deployment process to use the new `Windows Worker Pool`.
1. Create some test releases and deployments to ensure the new Windows Workers are working correctly.
1. Assuming the testing is successful, you can add those workers to the `Default Worker Pool` or update the remaining steps. 

### Copy Files

Octopus Deploy stores all the BLOB data (deployment logs, runbook logs, packages, artifacts, event exports etc.) on a file share.  If you are moving from a single server, be it hosting Octopus in a Windows Container or directly on a Windows VM, you will need to copy files to your new storage provider.  Once your shared storage provider has been created, you'll want to copy files over from these folders:

- TaskLogs
- Artifacts
- Packages
- EventExports

If you are moving from a Windows VM, the default path for those folders is: `C:\Octopus`.  For example, the task logs folder would be `C:\Octopus\TaskLogs`.  If you are unsure of the path, you can find it in the Octopus Deploy UI by navigating to **Configuration ➜ Settings ➜ Server Folders**.

:::div{.warning}
Failure to copy files over to the new storage location for the Linux Container to access will result in the following:

- Existing deployment and runbook run screens will be empty.
- Project, Step Template, and Tenant images will not appear.
- Attempting to download any existing artifacts will fail.
- If you are using the built-in repository, any existing deployments that use packages hosted there will fail as they won't be able to access them.
:::

### Polling Tentacles

Polling Tentacles are designed to handle connection interruptions.  For example, when the Octopus Server is restarted.  When the Octopus Server comes back online, any running Polling Tentacles will re-connect.  If you are currently using Polling Tentacles, you will need to ensure:

1. The same server URL will be used after the move.
1. You enable the communication port used (default: `10943`) on the Octopus Server Linux Container. 

If you wish to use a new URL, you will need to run this script on each machine hosting the polling tentacles.  Replace the server and API key with values specific to your instance.

Windows:

```
C:\Program Files\Octopus Deploy\Tentacle>Tentacle poll-server --server=https://your.octopus.server --apikey=API-MyApiKey --server-comms-port=10943
```

Linux:

```
/opt/octopus/tentacle/Tentacle poll-server --server=httpa://your.octopus.server --apikey=API-MyApiKey --server-comms-port=10943
```

## Folder Paths

The Dockerfile runs the Octopus Server installer each time the Octopus Server Windows Container or Octopus Server Linux Container starts up.  The installer runs a series of commands to configure Octopus Deploy.  The installer will run the [path](/docs/octopus-rest-api/octopus.server.exe-command-line/path) command to update the paths to leverage the different folder structure.

For example:

```
./Octopus.Server path --instance OctopusServer --nugetRepository "/repository" --artifacts "/artifacts" --taskLogs "/taskLogs" --eventExports "/eventExports" --cacheDirectory="/cache" --skipDatabaseCompatibilityCheck --skipDatabaseSchemaUpgradeCheck
```

Just like the Octopus Server Windows Container, you will want to provide the following volume mounts.

|  Name       |    |
| ------------- | ------- |
|**/repository**|Package path for the built-in package repository|
|**/artifacts**|Path where artifacts are stored|
|**/taskLogs**|Path where task logs are stored|
|**/cache**|Path where cached files are stored|
|**/eventExports**|Path where event audit logs are exported|

If you are running Octopus Server directly on Docker, read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volumes.  You will need to update your Docker compose or Docker run command to point your existing folders to the new volume mounts.  

If you are running Octopus Server on Kubernetes, you will want to configure [persistent volume mounts](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

:::div{.hint}
Due to how paths are stored, you cannot run an Octopus Server Windows Container and Octopus Server Linux Container simultaneously.  It has to be all Windows or all Linux.
:::

## Database Connection String and Master Key

Just as it is with Octopus Server running on Windows (VM or Container), you will need to provide the database connection string and master key to the Octopus Server Linux Container.  The underlying database technology Octopus Deploy relies upon, SQL Server, has not changed.  The connection string format is the same, so you shouldn't need to change anything.

## Server Thumbprint

The certificate backing the server thumbprint is stored in the database.  Any tentacles that trust your existing server thumbprint will continue to work as-is when you move to the Octopus Server Linux Container.

## Outage Window

Migrating to the Octopus Server Linux Container will require an outage window.  The steps to perform during the outage window are:

1. Back up the master key.
1. Enable [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode) to prevent anyone from deploying or making changes during the transition.
1. Shut down the existing Octopus Deploy instance.
1. Perform a final file copy to pick up any new files.
1. Start up the Octopus Server Linux Container.
1. Perform some test deployments, verify you can view preexisting deployment logs and runbook runs.  Verify all images appear.
1. Update any Octopus Server DNS entries.
1. Disable Maintenance Mode.