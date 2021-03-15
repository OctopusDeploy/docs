```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$promptedVariable = "PromptedVariableName::PromptedVariableValue"

$spaceName = "Default"
$projectName = "Your Project Name"
$releaseVersion = "0.0.1"
$environmentName = "Development"

# Get space id
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $headers -ErrorVariable octoError
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }
Write-Host "Using Space named $($space.Name) with id $($space.Id)"

# Get project by name
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $headers -ErrorVariable octoError
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }
Write-Host "Using Project named $($project.Name) with id $($project.Id)"

# Get release by version
$releases = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/releases?searchByVersion=$releaseVersion" -Headers $headers -ErrorVariable octoError
$release = $releases.Items | Where-Object { $_.Version -eq $releaseVersion }
Write-Host "Using Release version $($release.Version) with id $($release.Id)"

# Get environment by name
$environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environmentName))&skip=0&take=100" -Headers $headers -ErrorVariable octoError
$environment = $environments.Items | Where-Object { $_.Name -eq $environmentName }
Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

# Get deployment preview for prompted variables
$deploymentPreview = Invoke-RestMethod -Uri "$octopusUrl/api/$($space.Id)/releases/$($release.Id)/deployments/preview/$($environment.Id)?includeDisabledSteps=true" -Headers $header -ErrorVariable OctoError
Write-Host "Found $($deploymentPreview.Form.Elements.Length) prompted variables to populate"

$deploymentFormValues = @{}
if ([string]::IsNullOrWhiteSpace($formValues) -eq $true)
{
    return $deploymentFormValues
}   

$promptedValueList = @(($formValues -Split "`n").Trim())
foreach($element in $deploymentPreview.Form.Elements)
{
    $nameToSearchFor = $element.Control.Name
    $uniqueName = $element.Name
    $isRequired = $element.Control.Required
    
    $promptedVariablefound = $false
    
    Write-Host "Looking for the prompted variable value for $nameToSearchFor"
    foreach ($promptedValue in $promptedValueList)
    {
        $splitValue = $promptedValue -Split "::"
        Write-Host "Comparing $nameToSearchFor with provided prompted variable $($promptedValue[$nameToSearchFor])"
        if ($splitValue.Length -gt 1)
        {
            if ($nameToSearchFor -eq $splitValue[0])
            {
                Write-Host "Found the prompted variable value $nameToSearchFor"
                $deploymentFormValues[$uniqueName] = $splitValue[1]
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

# Create deployment
$deploymentBody = @{
    ReleaseId     = $release.Id
    EnvironmentId = $environment.Id
    FormValues    = $deploymentFormValues
} | ConvertTo-Json

Write-Host "Creating deployment with these values: $deploymentBody"
$deployment = Invoke-RestMethod -Uri $octopusURL/api/$($space.Id)/deployments -Method POST -Headers $headers -Body $deploymentBody
```

