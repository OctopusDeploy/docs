```powershell PowerShell
# Define working variables
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$roleName = "Project Deployer"
$spaceName = "" # Leave blank if you're using an older version of Octopus or you want to search all spaces

try
{
    # Get the space id
    $spaceId = ((Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError) | Where-Object {$_.Name -eq $spaceName}).Id

    # Get reference to role
    $role = (Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/userroles/all" -Headers $headers -ErrorVariable octoError) | Where-Object {$_.Name -eq $roleName}

    # Get list of teams
    $teams = (Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/teams/all" -Headers $headers -ErrorVariable octoError)

    # Loop through teams
    foreach ($team in $teams)
    {
        # Get the scoped user role
        $scopedUserRoles = Invoke-RestMethod -Method Get -Uri ("$octopusBaseURL/teams/$($team.Id)/scopeduserroles") -Headers $headers -ErrorVariable octoError
        
        # Loop through the scoped user roles
        foreach ($scopedUserRole in $scopedUserRoles)
        {
            # Check to see if space was specified
            if (![string]::IsNullOrEmpty($spaceId))
            {
                # Filter items by space
                $scopedUserRole.Items = $scopedUserRole.Items | Where-Object {$_.SpaceId -eq $spaceId}
            }

            # Check to see if the team has the role
            if ($null -ne ($scopedUserRole.Items | Where-Object {$_.UserRoleId -eq $role.Id}))
            {
                # Display team name
                Write-Output "Team: $($team.Name)"

                # check space id
                if ([string]::IsNullOrEmpty($spaceName))
                {
                    # Get the space id
                    $teamSpaceId = ($scopedUserRole.Items | Where-Object {$_.UserRoleId -eq $role.Id}).SpaceId

                    # Get the space name
                    $teamSpaceName = (Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/spaces/$teamSpaceId" -Headers $headers -ErrorVariable octoError).Name

                    # Display the space name
                    Write-Output "Space: $teamSpaceName"
                }
                else
                {
                    # Display the space name
                    Write-Output "Space: $spaceName"
                }

                Write-Output "Users:"

                # Loop through members
                foreach ($userId in $team.MemberUserIds)
                {
                    # Get user object
                    $user = Invoke-RestMethod -Method Get -Uri ("$octopusBaseURL/users/$userId") -Headers $headers -ErrorVariable octoError
                    
                    # Display user
                    Write-Output "$($user.DisplayName)"
                }

                # Check for external security groups
                if (($null -ne $team.ExternalSecurityGroups) -and ($team.ExternalSecurityGroups.Count -gt 0))
                {
                    # External groups
                    Write-Output "External security groups:"

                    # Loop through groups
                    foreach ($group in $team.ExternalSecurityGroups)
                    {
                        # Display group
                        Write-Output "$($group.Id)"
                    }
                }
            }
        }   
    }
}
catch
{
    if ([string]::IsNullOrEmpty($octoError))
    {
        Write-Output "There was an error during the request: $($octoError.Message)"
    }
    else
    {
        Write-Output "An error occurred: $($_.Exception.Message)"
    }
}

```
```powershell PowerShell (Octopus.Client)

# Define working variables
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"

# Load the Octopus.Client assembly
Add-type -Path "c:\Octopus.Client\Octopus.Client.dll"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusBaseURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$roleName = "Project Deployer"
$spaceName = ""

try
{
    $space = $repository.Spaces.FindByName($spaceName)

    # Get specific role
    $role = $repository.UserRoles.FindByName($roleName)

    # Get all the teams
    $teams = $repository.Teams.GetAll()

    # Loop through the teams
    foreach ($team in $teams)
    {
        # Get all associated user roles
        $scopedUserRoles = $repository.Teams.GetScopedUserRoles($team)

        # Check to see if there was a space defined
        if (![string]::IsNullOrEmpty($spaceName))
        {
            # Filter on space
            $scopedUserRoles = $scopedUserRoles | Where-Object {$_.SpaceId -eq $space.Id}
        }

        # Loop through the scoped user roles
        foreach ($scopedUserRole in $scopedUserRoles)
        {
            # Check role id
            if ($scopedUserRole.UserRoleId -eq $role.Id)
            {
                # Display the team name
                Write-Output "Team: $($team.Name)"

                # Display the space name
                Write-Output "Space: $($repository.Spaces.Get($scopedUserRole.SpaceId).Name)"

                Write-Output "Users:"

                # Loop through the members
                foreach ($member in $team.MemberUserIds)
                {
                    # Get the user account
                    $user = $repository.Users.GetAll() | Where-Object {$_.Id -eq $member}
                    
                    # Display
                    Write-Output "$($user.DisplayName)"
                }

                # Check to see if there were external groups
                if (($null -ne $team.ExternalSecurityGroups) -and ($team.ExternalSecurityGroups.Count -gt 0))
                {
                    Write-Output "External security groups:"

                    # Loop through groups
                    foreach ($group in $team.ExternalSecurityGroups)
                    {
                        # Display group
                        Write-Output "$($group.Id)"
                    }
                }
            }
        }
    }
}
catch
{
    Write-Output "An error occurred: $($_.Exception.Message)"
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

var octopusBaseURL = "https://youroctourl/api";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusBaseURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

string roleName = "Project Deployer";
var spaceName = "";

try
{
    // Get space id
    var space = repository.Spaces.FindByName(spaceName);

    // Get reference to the role
    var role = repository.UserRoles.FindByName(roleName);

    // Get all teams to search
    var teams = repository.Teams.FindAll();

    // Loop through the teams
    foreach (var team in teams)
    {
        // Retrieve scoped user roles
        var scopedUserRoles = repository.Teams.GetScopedUserRoles(team);

        // Check to see if there was a space name specified
        if (!string.IsNullOrEmpty(spaceName))
        {
            // filter returned scopedUserRoles
            scopedUserRoles = scopedUserRoles.Where(x => x.SpaceId == space.Id).ToList();
        }

        // Loop through returned roles
        foreach (var scopedUserRole in scopedUserRoles)
        {
            // Check to see if it's the role we're looking for
            if (scopedUserRole.UserRoleId == role.Id)
            {
                // Output team name
                Console.WriteLine(string.Format("Team: {0}", team.Name));

                // Output space name
                Console.WriteLine(string.Format("Space: {0}", repository.Spaces.Get(scopedUserRole.SpaceId).Name));

                Console.WriteLine("Users:");

                // Loop through team members
                foreach (var member in team.MemberUserIds)
                {
                    // Get the user object
                    var user = repository.Users.Get(member);

                    // Display the user name
                    Console.WriteLine(user.DisplayName);
                }

                // Check for external groups
                if ((team.ExternalSecurityGroups != null) && (team.ExternalSecurityGroups.Count > 0))
                {
                    //
                    Console.WriteLine("External security groups:");

                    // Iterate through external security groups
                    foreach (var group in team.ExternalSecurityGroups)
                    {
                        Console.WriteLine(group.Id);
                    }
                }
            }
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
```