```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$snapshotName = "Snapshot 9PNENH6"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Get runbook
    $runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbooks/all" -Headers $header) | Where-Object {$_.Name -eq $runbookName -and $_.ProjectId -eq $project.Id}

    # Get the runbook process
    $runbookProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbookProcesses/$($runbook.RunbookProcessId)" -Headers $header

    # Loop through steps and gather referenced packages
    $selectedPackages = @()
    foreach ($step in $runbookProcess.Steps)
    {
        # Loop through the actions of the step
        foreach ($action in $step.Actions)
        {
            # Check to see if action references a package
            if ($null -ne $action.Packages)
            {
                # Loop through selected packages
                foreach ($package in $action.Packages)
                {
                    # Get latest version of package
                    $packageVersion = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/feeds/$($package.FeedId)/packages/versions?packageId=$($package.PackageId)&take=1" -Headers $header).Items[0].Version
                    
                    # Add to selected packages array
                    $selectedPackages += @{
                        ActionName = $action.Name
                        Version = $packageVersion
                        PackageReferenceName = $package.PackageId
                    }
                }
            }
        }
    }

    # Create json payload
    $jsonPayload = @{
        ProjectId = $project.Id
        RunbookId = $runbook.Id
        Name = $snapshotName
        SelectedPackages = $selectedPackages
    }

    # Publish the snapshot
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbookSnapShots?publish=true" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$snapshotName = "Snapshot 9PNENH7"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get runbook
    $runbook = $repositoryForSpace.Runbooks.FindByName($runbookName) | Where-Object {$_.ProjectId -eq $project.Id}

    # Get the runbook process
    $runbookProcess = $repositoryForSpace.RunbookProcesses.Get($runbook.RunbookProcessId)

    # Gather selected packages
    $selectedPackages = @()
    foreach ($step in $runbookProcess.Steps)
    {
        # Loop through actions
        foreach ($action in $step.Actions)
        {
            # Check to see if action references packages
            if ($null -ne $action.Packages)
            {
                # Loop through packages
                foreach ($package in $action.Packages)
                {
                    # Get reference to feed
                    $feed = $repositoryForSpace.Feeds.Get($package.FeedId)
                    
                    # Check to see if built in
                    if ($feed.FeedType -eq [Octopus.Client.Model.FeedType]::BuiltIn)
                    {
                        # Get package version
                        $packageVersion = $repositoryForSpace.BuiltInPackageRepository.ListPackages($package.PackageId).Items[0].Version

                        # Create selected package object
                        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage
                        $selectedPackage.ActionName = $action.Name
                        $selectedPackage.PackageReferenceName = $package.PackageId
                        $selectedPackage.StepName = $step.Name
                        $selectedPackage.Version = $packageVersion

                        # Add to collection
                        $selectedPackages += $selectedPackage
                    }
                }
            }
        }
    }

    # Create new runbook snapshot resource object
    $runbookSnapshot = New-Object Octopus.Client.Model.RunbookSnapshotResource
    $runbookSnapshot.Name = $snapshotName
    $runbookSnapshot.ProjectId = $project.Id
    $runbookSnapshot.RunbookId = $runbook.Id
    $runbookSnapshot.SpaceId = $space.Id
    
    # Add selected packages
    foreach ($item in $selectedPackages)
    {
        # Add to collection
        $runbookSnapshot.SelectedPackages.Add($item)
    }

    # Create the snapshot
    $snapshot = $repositoryForSpace.RunbookSnapshots.Create($runbookSnapshot)
    
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#

```