```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "http://octotemp"
$octopusAPIKey = "API-DY8544IVQCQX8JXCGNH4URENNY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$communicationsStyle = "TentacleActive" # Listening mode
$hostName = "OctoTempTentacle"
$tentaclePort = "10934"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()
$tentacleThumbprint = "010FBC824A4C1FB57B18EF7F6C510480B745AFE0"
$tentacleIdentifier = "tmm3zbuptkmdfm4vlhd5" # Must match value in Tentacle.config file on tentacle machine

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get environment Ids
    $environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        $environmentIds += $environment.Id
    }

    # Create unique URI for tentacle
    $tentacleURI = "poll://$tentacleIdentifier"

    # Create JSON payload
    $jsonPayload = @{
        Endpoint = @{
            CommunicationStyle = $communicationsStyle
            Thumbprint = $tentacleThumbprint
            Uri = $tentacleURI
        }
        EnvironmentIds = $environmentIds
        Name = $hostName
        Roles = $roles
        Status = "Unknown"
        IsDisabled = $false
    }

    $jsonPayload

    # Register new target to space
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/machines" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)

```
```csharp C#

```