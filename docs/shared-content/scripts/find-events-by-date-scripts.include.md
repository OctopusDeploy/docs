```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "http://octotemp"
$octopusAPIKey = "API-APIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$eventDate = "9/9/2020"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get events
$events = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/events" -Headers $header).Items | Where-Object {([datetime]$_.Occurred -ge [datetime]$eventDate) -and ([datetime]$_.Occurred -le ([datetime]$eventDate).AddDays(1).AddSeconds(-1))}

# Display events
foreach ($event in $events)
{
    $event
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "http://octotemp"
$octopusAPIKey = "API-APIKEY"
$spaceName = "default"
$eventDate = "9/9/2020"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get events
    $events = $repositoryForSpace.Events.FindAll() | Where-Object {($_.Occurred -ge [datetime]$eventDate) -and ($_.Occurred -le ([datetime]$eventDate).AddDays(1).AddSeconds(-1))}

    # Display events
    foreach ($event in $events)
    {
        $event
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
