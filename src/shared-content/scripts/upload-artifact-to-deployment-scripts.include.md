<details data-group="upload-artifact-to-deployment-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

Add-Type -AssemblyName System.Net.Http

$OctopusURL = "https://your-octopus-url"
$APIKey = "API-YOUR-KEY"
$SpaceName = "YOUR SPACE NAME" 
$projectName = "YOUR PROJECT NAME"
$releaseVersion = "YOUR RELEASE VERSION"
$environmentName = "YOUR ENVIRONMENT NAME"
$filePathToUpload = "PATH OF FILE TO UPLOAD"
$fileNameForOctopus = "NAME FOR OCTOPUS" ## Must include file extension in name!

$header = @{ "X-Octopus-ApiKey" = $APIKey }

Write-Host "Getting the space information"
$spaceList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/spaces?skip=0&take=10&partialName=$([System.Web.HTTPUtility]::UrlEncode($spaceName))" -Headers $header
$space = $spaceList.Items | Where-Object {$_.Name -eq $spaceName}
$spaceId = $space.Id
Write-Host "The space-id for $spaceName is $spaceId"

Write-Host "Getting the environment information"
$environmentList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/environments?skip=0&take=10&partialName=$([System.Web.HTTPUtility]::UrlEncode($environmentName))" -Headers $header
$environment = $environmentList.Items | Where-Object {$_.Name -eq $environmentName}
$environmentId = $environment.Id
Write-Host "The id of $environmentName is $environmentId"

Write-Host "Getting the project information"
$projectList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/projects?skip=0&take=10&partialName=$([System.Web.HTTPUtility]::UrlEncode($projectName))" -Headers $header
$project = $projectList.Items | Where-Object {$_.Name -eq $projectName}
$projectId = $project.Id
Write-Host "The id of $projectName is $projectId"

Write-Host "Getting the release information"
$releaseList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/projects/$projectId/releases?skip=0&take=100&searchByVersion=$releaseVersion" -Headers $header
$release = $releaseList.Items | Where-Object {$_.Version -eq $releaseVersion}
$releaseId = $release.Id
Write-Host "The id of $releaseVersion is $releaseId"

Write-Host "Getting the deployment information"
$deploymentList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/releases/$releaseId/deployments?skip=0&take=1000" -Headers $header
$deploymentsToEnvironment = @($deploymentList.Items | Where-Object {$_.EnvironmentId -eq $environmentId})
$deploymentToUse = $deploymentsToEnvironment | Sort-Object {[DateTime]$_."Created"} | Select-Object -First 1

$serverTaskId = $deploymentToUse.TaskId
Write-Host "The server task id of the most recent deployment to $environmentName for release $releaseVersion is $serverTaskId"

Write-Host "Creating the artifact resource"
$artifact = @{  
  SpaceId = $spaceId
  Filename = $fileNameForOctopus
  Source = $null
  ServerTaskId = $serverTaskId  
  LogCorrelationId = $null
} | ConvertTo-Json -Depth 10

$uploadedArtifact = Invoke-RestMethod -Method Post -Uri "$OctopusUrl/api/$spaceId/artifacts" -Headers $header -Body $artifact
$artifactId = $uploadedArtifact.Id
Write-Host "Created the base artifact object with the id of $artifactId"

Write-Host "Preparing file upload"
$httpClientHandler = New-Object System.Net.Http.HttpClientHandler

$httpClient = New-Object System.Net.Http.HttpClient $httpClientHandler
$httpClient.DefaultRequestHeaders.Add("X-Octopus-ApiKey", $ApiKey)

$bytes = Get-Content $filePathToUpload -AsByteStream
$content = New-Object System.Net.Http.ByteArrayContent -ArgumentList @(,$bytes)

$uploadUrl = "$OctopusUrl/api/$spaceId/artifacts/$artifactId/content"
Write-Host "Uploading file $filePathToUpload to $uploadUrl"
$httpClient.PutAsync($uploadUrl, $content).Result
```

</details>