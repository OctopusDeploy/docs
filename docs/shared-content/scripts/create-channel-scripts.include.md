```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectId = "Projects-101"
$channelName = "Channel Name"

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Create channel json payload
$jsonPayload = @{
    ProjectId = $ProjectId
    Name = $channelName
    Description = ""
    IsDefault = $False
}

# Create channel
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/channels" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header -ContentType "application/json"
```
```go Go
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/OctopusDeploy/go-octopusdeploy/client"
	"github.com/OctopusDeploy/go-octopusdeploy/model"
	"golang.org/x/crypto/ssh/terminal"
)

func main() {
	octopusURL := os.Args[1]
	space := os.Args[2]
	name := os.Args[3]
	projectID := os.Args[4]

	fmt.Println("Enter Password Securely: ")
	apiKey, err := terminal.ReadPassword(0)

	if err != nil {
		log.Println(err)
	}

	APIKey := string(apiKey)

	octopusAuth(octopusURL, APIKey, space)
	CreateChannel(octopusURL, APIKey, space, name, projectID)

}

func octopusAuth(octopusURL, APIKey, space string) *client.Client {
	client, err := client.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func CreateChannel(octopusURL, APIKey, space, name, projectID string) *model.Channel {
	client := octopusAuth(octopusURL, APIKey, space)
	Channel, err := model.NewChannel(name, projectID, "New channel")

	if err != nil {
		log.Println(err)
	}

	client.Channels.Add(Channel)

	return Channel
}
```