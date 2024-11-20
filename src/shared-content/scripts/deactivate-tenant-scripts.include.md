<details data-group="deactivate-tenant-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your-octopus-url"
$octopusAPIKey = "API-YOUR-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$tenantName = "MyTenant"
$tenantEnabled = $true

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get tenant
$tenant = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tenants/all" -Headers $header) | Where-Object {$_.Name -eq $tenantName}

# Enable/disable tenant
$tenant.IsDisabled = !$tenantEnabled

# Update tenant
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/tenants/$($tenant.Id)" -Headers $header -Body ($tenant | ConvertTo-Json -Depth 10)
```

</details>
<details data-group="deactivate-tenant-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://your-octopus-url"
$octopusAPIKey = "API-YOUR-KEY"
$spaceName = "default"
$tenantName = "MyTenant"
$tenantEnabled = $true

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get tenant
    $tenant = $repositoryForSpace.Tenants.FindByName($tenantName)

    # Enable/disable tenant
    $tenant.IsDisabled = !$tenantEnabled

    # Update tenant
    $repositoryForSpace.Tenants.Modify($tenant)
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="deactivate-tenant-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://your-octopus-url";
var octopusAPIKey = "API-YOUR-KEY";
var spaceName = "default";
var tenantName = "MyTenant";
bool enabled = false;

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get tenant
    var tenant = repositoryForSpace.Tenants.FindByName(tenantName);

    // Enable/disable tenant
    tenant.IsDisabled = !enabled;

    //update tenant
    repositoryForSpace.Tenants.Modify(tenant);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="deactivate-tenant-scripts">
<summary>Python3</summary>

```python
import json
import requests

octopus_server_uri = 'https://your-octopus-url/api'
octopus_api_key = 'API-YOUR-KEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}


def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))


def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)


space_name = 'Default'
tenant_name = 'Your Tenant Name'
disable_tenant = False

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
tenant = get_by_name('{0}/{1}/tenants/all'.format(octopus_server_uri, space['Id']), tenant_name)

tenant['IsDisabled'] = disable_tenant

uri = '{0}/{1}/tenants/{2}'.format(octopus_server_uri, space['Id'], tenant['Id'])
response = requests.put(uri, headers=headers, json=tenant)
response.raise_for_status()
```

</details>
<details data-group="deactivate-tenant-scripts">
<summary>Go</summary>

```go
package main

import (
	"log"
	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/v2/pkg/client"
	"github.com/OctopusDeploy/go-octopusdeploy/v2/pkg/spaces"
	"github.com/OctopusDeploy/go-octopusdeploy/v2/pkg/tenants"
)

func main() {
	apiURL, err := url.Parse("https://your-octopus-url")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YOUR-KEY"
	spaceName := "Default"
	tenantName := "MyTenant"
	enabled := true

	space := GetSpace(apiURL, APIKey, spaceName)
	if space == nil {
		log.Println(err)
	}

	client := octopusAuth(apiURL, APIKey, space.ID)

	tenant := GetTenantByName(client, tenantName)
	if tenant == nil {
		log.Println(err)
	}

	tenant.IsDisabled = !enabled
	updatedTenant, err := client.Tenants.Update(tenant)
	if err != nil {
		log.Println(err)
	}

	log.Printf("Tenant '%s' updated successfully. IsDisabled: %v", updatedTenant.Name, updatedTenant.IsDisabled)
}

func octopusAuth(octopusURL *url.URL, APIKey string, spaceID string) *client.Client {
	client, err := client.NewClient(nil, octopusURL, APIKey, spaceID)
	if err != nil {
		log.Println(err)
	}
	return client
}

func GetSpace(octopusURL *url.URL, APIKey string, spaceName string) *spaces.Space {
	client := octopusAuth(octopusURL, APIKey, "")

	spaceQuery := spaces.SpacesQuery{
		PartialName: spaceName,
	}

	spaces, err := client.Spaces.Get(spaceQuery)
	if err != nil {
		log.Println(err)
	}

	for _, space := range spaces.Items {
		if space.Name == spaceName {
			return space
		}
	}

	return nil
}

func GetTenantByName(client *client.Client, tenantName string) *tenants.Tenant {
	tenantQuery := tenants.TenantsQuery{
		Name: tenantName,
	}

	tenants, err := client.Tenants.Get(tenantQuery)
	if err != nil {
		log.Println(err)
	}

	if len(tenants.Items) == 1 {
		return tenants.Items[0]
	}

	return nil
}


```

</details>
