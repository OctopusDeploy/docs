```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$packageName = "packageName"
$packageVersion = "1.0.0.0"
$filePath = "/path/to/save/file"

try
{

    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get package details
    Invoke-RestMethod -Method $method -Uri "$octopusURL/api/packages/packages-$packageName.$packageVersion" -Headers $header 

    # Get package
    Invoke-RestMethod -Method $method -Uri "$octopusURL/api/packages/$packageName.$packageVersion/raw" -Headers $header -OutFile $filePath
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
```python Python3

```
