<details data-group="run-a-runbook-with-prompted-variables">
<summary>PowerShell (REST API)</summary>

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$runbookBaseUrl = "" ## The base url, IE https://samples.octopus.app
$runbookApiKey = "" ## The API KEY
$runbookSpaceName = "Default" ## The name of the space the runbook is located in
$runbookProjectName = "Sample Project" ## the name of the project the runbook is located in
$runbookRunName = "Sample Name" ## the name of the runbook
$runbookEnvironmentName = "" ## The environment name to run the runbook in
$runbookTenantName = "" ## Optional - the name of the tenant to run the runbook for
$runbookWaitForFinish = $true ## set to either $true or $false
$runbookUseGuidedFailure = $false ## set to either $true or $false
$runbookUsePublishedSnapshot = $true ## set to either $true or $false
$runbookCancelInSeconds = 1800 ## 1800 seconds is 30 minutes

$runbookPromptedVariables = "" ## format is "VariableName::VariableValue"

function FindMatchingItemByName 
{		    
	param (
      [string] $EndPoint, 
      [string] $NameToLookFor, 
      [string] $ItemType, 
      [string] $APIKey, 
      [string] $PullFirstItem
    )
    
	$fullUrl = "$($EndPoint)?partialName=$NameToLookFor&skip=0&take=10000"   
    Write-Host "Attempting to find $ItemType $NameToLookFor by hitting $fullUrl"
        
    $header = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
	$header.Add("X-Octopus-ApiKey", $APIKey)
    
    $itemList = Invoke-RestMethod $fullUrl -Headers $header
    $foundItem = $null

    foreach ($item in $itemList.Items)
    {
        if ($item.Name -eq $NameToLookFor -or $PullFirstItem)
        {
            Write-Host "$ItemType matching $NameToLookFor found"
            $foundItem = $item
            break
        }
    }

    if ($foundItem -eq $null)
    {
        Write-Host "$ItemType $NameToLookFor not found, exiting with error"
        exit 1
    }
    
    return $foundItem
}

Write-Host "Runbook Name $runbookRunName"
Write-Host "Runbook Base Url: $runbookBaseUrl"
Write-Host "Runbook Space Name: $runbookSpaceName"
Write-Host "Runbook Project Name: $runbookProjectName"
Write-Host "Runbook Environment Name: $runbookEnvironmentName"
Write-Host "Runbook Tenant Name: $runbookTenantName"
Write-Host "Wait for Finish: $runbookWaitForFinish"
Write-Host "Use Guided Failure: $runbookUseGuidedFailure"
Write-Host "Cancel run in seconds: $runbookCancelInSeconds"
Write-Host "Prompted Variables: $runbookPromptedVariables"
 
$header = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$header.Add("X-Octopus-ApiKey", $runbookApiKey)

$spaceToUse = FindMatchingItemByName -EndPoint "$runbookBaseUrl/api/spaces" -NameToLookFor $runbookSpaceName -ItemType "Space" -APIKey $runbookApiKey -PullFirstItem $false
$runbookSpaceId = $spaceToUse.Id

$environmentToUse = FindMatchingItemByName -EndPoint "$runbookBaseUrl/api/$runbookSpaceId/environments" -NameToLookFor $runbookEnvironmentName -ItemType "Environment" -APIKey $runbookApiKey -PullFirstItem $false
$environmentIdToUse = $environmentToUse.Id

$tenantIdToUse = $null
if ([string]::IsNullOrWhiteSpace($runbookTenantName) -eq $false)
{
	$tenantToUse = FindMatchingItemByName -EndPoint "$runbookBaseUrl/api/$runbookSpaceId/tenants" -NameToLookFor $runbookTenantName -ItemType "Tenant" -APIKey $runbookApiKey -PullFirstItem $false
    $tenantIdToUse = $tenantToUse.Id
}

$projectToUse = FindMatchingItemByName -EndPoint "$runbookBaseUrl/api/$runbookSpaceId/projects" -NameToLookFor $runbookProjectName -ItemType "Environment" -APIKey $runbookApiKey -PullFirstItem $false
$projectIdToUse = $projectToUse.Id

$runbookToRun = FindMatchingItemByName -EndPoint "$runbookBaseUrl/api/$runbookSpaceId/projects/$projectIdToUse/runbooks" -NameToLookFor $runbookRunName -ItemType "Runbook" -APIKey $runbookApiKey -PullFirstItem $false
$runbookIdToRun = $runbookToRun.Id
$runbookProjectId = $runbookToRun.ProjectId
$runbookSnapShotIdToUse = $runbookToRun.PublishedRunbookSnapshotId

if ($runbookSnapShotIdToUse -eq $null -and $runbookUsePublishedSnapshot -eq $true)
{
    Write-Host "Use Published Snapshot was set; yet the runbook doesn't have a published snapshot.  Exiting"
    Exit 1
}

if ($runbookUsePublishedSnapshot -eq $false)
{
	$snapShotToUse = FindMatchingItemByName -EndPoint "$runbookBaseUrl/api/$runbookSpaceId/runbooks/$runbookIdToRun/runbookSnapshots" -NameToLookFor "" -ItemType "Snapshot" -APIKey $runbookApiKey -PullFirstItem $true
    $runbookSnapShotIdToUse = $snapShotToUse.Id        
}

$projectResponse = Invoke-RestMethod "$runbookBaseUrl/api/$runbookSpaceId/projects/$runbookProjectId" -Headers $header
$projectNameForUrl = $projectResponse.Slug

$runbookFormValues = @{}
if ([string]::IsNullOrWhiteSpace($runbookPromptedVariables) -eq $false)
{
	$runBookPreviewUrl = "$runbookBaseUrl/api/$runbookSpaceId/runbooks/$runbookIdToRun/runbookRuns/preview/$environmentIdToUse"
    Write-Host "Prompted variables were supplied, hitting the preview endpoint $runbookPreviewUrl"
	$runBookPreview = Invoke-RestMethod $runbookPreviewUrl -Headers $header    
    
    $promptedValueList = @(($runbookPromptedVariables -Split "`n").Trim())
    Write-Host $promptedValueList.Length
    
    foreach($element in $runbookPreview.Form.Elements)
    {
    	$nameToSearchFor = $element.Control.Name
        $uniqueName = $element.Name
        $isRequired = $element.Control.Required
        
        $promptedVariablefound = $false
        
        Write-Host "Looking for the prompted variable value for $nameToSearchFor"
    	foreach ($promptedValue in $promptedValueList)
        {
        	$splitValue = $promptedValue -Split "::"
            Write-Host "Comparing $nameToSearchFor with provided prompted variable $($splitValue[0])"
            if ($splitValue.Length -gt 1)
            {
            	if ($nameToSearchFor -eq $splitValue[0])
                {
                	Write-Host "Found the prompted variable value $nameToSearchFor"
                	$runbookFormValues[$uniqueName] = $splitValue[1]
                    $promptedVariableFound = $true
                    break
                }
            }
        }
        
        if ($promptedVariableFound -eq $false -and $isRequired -eq $true)
        {
        	Write-Host "Unable to find a value for the required prompted variable $nameToSearchFor, exiting"
            Exit 1
        }
    }
}

$runbookBody = @{
    RunbookId = $runbookIdToRun;
    RunbookSnapShotId = $runbookSnapShotIdToUse;
    FrozenRunbookProcessId = $null;
    EnvironmentId = $environmentIdToUse;
    TenantId = $tenantIdToUse;
    SkipActions = @();
    QueueTime = $null;
    QueueTimeExpiry = $null;
    FormValues = $runbookFormValues;
    ForcePackageDownload = $false;
    ForcePackageRedeployment = $true;
    UseGuidedFailure = $runbookUseGuidedFailure;
    SpecificMachineIds = @();
    ExcludedMachineIds = @()
}

$runbookBodyAsJson = $runbookBody | ConvertTo-Json
$runbookPostUrl = "$runbookBaseUrl/api/$runbookSpaceId/runbookRuns"
Write-Host "Kicking off runbook run by posting to $runbookPostUrl"

$runBookResponse = Invoke-RestMethod $runbookPostUrl -Method POST -Headers $header -Body $runbookBodyAsJson
$runbookServerTaskId = $runBookResponse.TaskId
$runbookRunId = $runbookResponse.Id

Write-Host "Runbook was successfully invoked, you can access the launched runbook [here]($runbookBaseUrl/app#/$runbookSpaceId/projects/$projectNameForUrl/operations/runbooks/$runbookIdToRun/snapshots/$runbookSnapShotIdToUse/runs/$runbookRunId)"
if ($runbookWaitForFinish -eq $true)
{
	Write-Host "The setting to wait for completion was set, waiting until task has finished"
    $startTime = Get-Date
    $currentTime = Get-Date
    $dateDifference = $currentTime - $startTime
	
    $taskStatusUrl = "$runbookBaseUrl/api/tasks/$runbookServerTaskId"
    $numberOfWaits = 0    
    
    $runbookSuccessful = $null

    While ($dateDifference.TotalSeconds -lt $runbookCancelInSeconds)
    {
        Write-Host "Waiting 5 seconds to check status"
        Start-Sleep -Seconds 5
        $taskStatusResponse = Invoke-RestMethod $taskStatusUrl -Headers $header        
        $taskStatusResponseState = $taskStatusResponse.State

        if ($taskStatusResponseState -eq "Success")
        {
            Write-Host "The task has finished with a status of Success"
            $runbookSuccessful = $true            
            break
        }
        elseif($taskStatusResponseState -eq "Failed" -or $taskStatusResponseState -eq "Canceled")
        {
            Write-Host "The task has finished with a status of $taskStatusResponseState status, stopping the run/deployment"
            $runbookSuccessful = $false
            break            
        }        

        Write-Host "The task state is currently $taskStatusResponseState"
        
        $startTime = $taskStatusResponse.StartTime
        if ($startTime -eq $null)
        {        
        	Write-Host "The task is still queued, let's wait a bit longer"
        	$startTime = Get-Date
        }
        $startTime = [DateTime]$startTime
        
        $currentTime = Get-Date
        $dateDifference = $currentTime - $startTime        
    }

    if ($null -eq $runbookSuccessful)
    {
        Write-Host "The cancel timeout has been reached, cancelling the runbook run"
        $cancelResponse = Invoke-RestMethod "$runbookBaseUrl/api/tasks/$runbookServerTaskId/cancel" -Headers $header -Method Post
        Write-Host "Exiting with an error code of 1 because we reached the timeout"
    }
}
```

</details>
<details data-group="run-a-runbook-with-prompted-variables">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "Default";
string environmentName = "Development";
string runbookName = "Runbook name";

// Leave blank if you'd like to use the published snapshot
string runbookSnapshotId = "";

Dictionary<string, string> promptedVariables = new Dictionary<string, string>();
// Enter multiple values using the .Add() method
// promptedVariables.Add("prompted-variable1", "variable1-value")

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get runbook
    var runbook = repositoryForSpace.Runbooks.FindOne(n => n.Name == runbookName);

    // Get environment
    var environment = repositoryForSpace.Environments.FindByName(environmentName);

    // Use published snapshot if no id provided
    if (string.IsNullOrWhiteSpace(runbookSnapshotId))
    {
        runbookSnapshotId = runbook.PublishedRunbookSnapshotId;
    }

    var runbookTemplate = repositoryForSpace.Runbooks.GetRunbookRunTemplate(runbook);
    var deploymentPromotionTarget = runbookTemplate.PromoteTo.FirstOrDefault(p => p.Name == environmentName);
    var runbookPreview = repositoryForSpace.Runbooks.GetPreview(deploymentPromotionTarget);

    var formValues = new Dictionary<string, string>();
    
    // Associate variable values for the runbook
    foreach (var variableName in promptedVariables.Keys)
    {
        var element = runbookPreview.Form.Elements.FirstOrDefault(e => (e.Control as Octopus.Client.Model.Forms.VariableValue).Name == variableName);
        if (element != null)
        {
            var runbookPromptedVariableId = element.Name;
            var runbookPromptedVariableValue = promptedVariables[variableName];
            formValues.Add(runbookPromptedVariableId, runbookPromptedVariableValue);
        }
    }

    // Create runbook run object
    Octopus.Client.Model.RunbookRunResource runbookRun = new RunbookRunResource();

    runbookRun.EnvironmentId = environment.Id;
    runbookRun.RunbookId = runbook.Id;
    runbookRun.ProjectId = runbook.ProjectId;
    runbookRun.RunbookSnapshotId = runbookSnapshotId;
    runbookRun.FormValues = formValues;
    // Execute runbook
    repositoryForSpace.RunbookRuns.Create(runbookRun);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
