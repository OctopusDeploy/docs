```powershell PowerShell
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$projectName = "Your Project Name"
$environmentName = "Dev"
$tenantNames = @("Customer A Name", "Customer B Name")

try {
    # Get space id
    $spaces = Invoke-WebRequest -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
    $space = $spaces | Where-Object { $_.Name -eq $spaceName }
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific url
    $octopusSpaceUrl = "$octopusBaseURL/$($space.Id)"

    # Get project by name
    $projects = Invoke-WebRequest -Uri "$octopusSpaceUrl/projects/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
    $project = $projects | Where-Object { $_.Name -eq $projectName }
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get environment by name
    $environments = Invoke-WebRequest -Uri "$octopusSpaceUrl/environments/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
    $environment = $environments | Where-Object { $_.Name -eq $environmentName }
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Get the deployment process template
    Write-Host "Fetching deployment process template"
    $template = Invoke-WebRequest -Uri "$octopusSpaceUrl/deploymentprocesses/deploymentprocess-$($project.id)/template" -Headers $headers | ConvertFrom-Json

    # Create the release body
    $releaseBody = @{
        ProjectId        = $project.Id
        Version          = $template.NextVersionIncrement
        SelectedPackages = @()
    }

    # Set the package version to the latest for each package
    # If you have channel rules that dictate what versions can be used, you'll need to account for that
    Write-Host "Getting step package versions"
    $template.Packages | ForEach-Object {
        $uri = "$octopusSpaceUrl/feeds/$($_.FeedId)/packages/versions?packageId=$($_.PackageId)&take=1"
        $version = Invoke-WebRequest -Uri $uri -Method GET -Headers $headers -Body $releaseBody -ErrorVariable octoError | ConvertFrom-Json
        $version = $version.Items[0].Version

        $releaseBody.SelectedPackages += @{
            ActionName           = $_.ActionName
            PackageReferenceName = $_.PackageReferenceName
            Version              = $version
        }
    }

    # Create release
    $releaseBody = $releaseBody | ConvertTo-Json
    Write-Host "Creating release with these values: $releaseBody"
    $release = Invoke-WebRequest -Uri $octopusSpaceUrl/releases -Method POST -Headers $headers -Body $releaseBody -ErrorVariable octoError | ConvertFrom-Json

    # Create deployment for each tenant
    $tenants = Invoke-WebRequest -Uri "$octopusSpaceUrl/tenants/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json

    $tenantNames | ForEach-Object {
        $name = $_
        $tenant = $tenants | Where-Object { $_.Name -eq $name }

        $deploymentBody = @{
            ReleaseId     = $release.Id
            EnvironmentId = $environment.Id
            TenantId      = $tenant.Id
        } | ConvertTo-Json

        Write-Host "Creating deployment with these values: $deploymentBody"
        $deployment = Invoke-WebRequest -Uri $octopusSpaceUrl/deployments -Method POST -Headers $headers -Body $deploymentBody -ErrorVariable octoError
    }
}
catch {
    Write-Host "There was an error during the request: $($octoError.Message)"
    exit
}
```
