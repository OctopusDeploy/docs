```powershell PowerShell
# Define working variables
$OctopusServerUrl = "https://youroctourl/api"
$ApiKey = "API-YOURAPIKEY"
$RoleName = "Project Deployer"

# Get reference to role
$role = (Invoke-RestMethod -Method Get -Uri "$OctopusServerUrl/api/userroles/all" -Headers @{"X-Octopus-ApiKey"="$ApiKey"}) | Where-Object {$_.Name -eq $RoleName}

# Get list of teams
$teams = (Invoke-RestMethod -Method Get -Uri ("$OctopusServerUrl/api/teams/all") -Headers @{"X-Octopus-ApiKey"="$ApiKey"})

# Loop through teams
foreach ($team in $teams)
{
    # Check for scoped user roles
    $scopedUserRoleLinks =  $team.Links | Where-Object -Property "ScopedUserRoles"

    # Loop through the links
    foreach ($scopedUserRoleLink in $scopedUserRoleLinks)
    {
        # Get the scoped user role
        $scopedUserRole = Invoke-RestMethod -Method Get -Uri ("$OctopusServerUrl$($scopedUserRoleLink.Self)/scopeduserroles") -Headers @{"X-Octopus-ApiKey"="$ApiKey"}

        # Check to see if the team has the role
        if ($null -ne ($scopedUserRole.Items | Where-Object {$_.UserRoleId -eq $role.Id}))
        {
            # Display team name
            Write-Output "Team: $($team.Name)"

            # Loop through members
            foreach ($userId in $team.MemberUserIds)
            {
                # Get user object
                $user = Invoke-RestMethod -Method Get -Uri ("$OctopusServerUrl/api/users/$userId") -Headers @{"X-Octopus-ApiKey"="$ApiKey"}
                
                # Display user
                Write-Output "$($user.DisplayName)"
            }

            # External groups
            Write-Output "External security groups: $($team.ExternalSecurityGroups.Id)"
        }
    }
}

```
```powershell PowerShell (Octopus.Client)

# Define working variables
$server = "https://youroctourl/api"
$apiKey = "API-YOURAPIKEY";              # Get this from your 'profile' page in the Octopus web portal
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($server, $apiKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$roleName = "Project Deployer"

# Get specific role
$role = $repository.UserRoles.FindByName($roleName)

# Get all the teams
$teams = $repository.Teams.GetAll()

# Loop through the teams
foreach ($team in $teams)
{
    # Get all associated user roles
    $scopedUserRoles = $repository.ScopedUserRoles.FindAll() | Where-Object {$_.TeamId -eq $team.Id}

    # Loop through the scoped user roles
    foreach ($scopedUserRole in $scopedUserRoles)
    {
        # Check role id
        if ($scopedUserRole.UserRoleId -eq $role.Id)
        {
            # Display the team name
            Write-Output "Team: $($team.Name)"

            # Loop through the members
            foreach ($member in $team.MemberUserIds)
            {
                # Get the user account
                $user = $repository.Users.GetAll() | Where-Object {$_.Id -eq $member}
                
                # Display
                Write-Output "$($user.DisplayName)"
            }

             Write-Output "External security groups: $($team.ExternalSecurityGroups.Id)"
        }
    }
}
```
```csharp C#
// Declare working variables
var octopusServerUrl = "https://youroctourl/api";
var apiKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusServerUrl, apiKey);
var repository = new OctopusRepository(endpoint);

string roleName = "Project Deployer";

// Get reference to the role
var role = repository.UserRoles.FindByName(roleName);

// Get all teams to search
var teams = repository.Teams.FindAll();

// Loop through the teams
foreach (var team in teams)
{
    // Retrieve scoped user roles
    var scopedUserRoles = repository.Teams.GetScopedUserRoles(team);

    // Loop through returned roles
    foreach (var scopedUserRole in scopedUserRoles)
    {
        // Check to see if it's the role we're looking for
        if (scopedUserRole.UserRoleId == role.Id)
        {
            // Output team name
            Console.WriteLine(string.Format("Team: {0}", team.Name));

            // Loop through team members
            foreach (var member in team.MemberUserIds)
            {
                // Get the user object
                var user = repository.Users.Get(member);

                // Display the user name
                Console.WriteLine(user.DisplayName);
            }
        }
    }
}
```