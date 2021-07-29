```powershell PowerShell (REST API)
function AddAzureADLogins(
    [Parameter(Mandatory=$True)]
    [String]$OctopusURL,
    [Parameter(Mandatory=$True)]
    [String]$OctopusAPIKey,
    [String]$Path,
    [String]$OctopusUsername,
    [String]$AzureEmailAddress,
    [String]$AzureDisplayName = $null,
    [Boolean]$UpdateOctopusEmailAddress = $False,
    [Boolean]$UpdateOctopusDisplayName = $False,
    [Boolean]$ContinueOnError = $False,
    [Boolean]$Force = $False,
    [Boolean]$WhatIf = $True,
    [Boolean]$DebugLogging = $False
)
{
    Write-Host "OctopusURL: $OctopusURL"
    Write-Host "OctopusAPIKey: ********"
    Write-Host "Path: $Path"
    Write-Host "OctopusUsername: $OctopusUsername"
    Write-Host "AzureEmailAddress: $AzureEmailAddress"
    Write-Host "AzureDisplayName: $AzureDisplayName"
    Write-Host "UpdateOctopusEmailAddress: $UpdateOctopusEmailAddress"
    Write-Host "UpdateOctopusDisplayName: $UpdateOctopusDisplayName"
    Write-Host "ContinueOnError: $ContinueOnError"
    Write-Host "Force: $Force"
    Write-Host "WhatIf: $WhatIf"
    Write-Host "DebugLogging: $DebugLogging"
    Write-Host $("=" * 60)
    Write-Host

    if (-not [string]::IsNullOrWhiteSpace($OctopusURL)) {
        $OctopusURL = $OctopusURL.TrimEnd('/')
    }

    if($DebugLogging -eq $True) {
        $DebugPreference = "Continue"
    }

    $header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
    $usersToUpdate = @()
    $recordsUpdated = 0
    # Validate we have minimum required details.
    if ([string]::IsNullOrWhiteSpace($Path) -eq $true) {
        if([string]::IsNullOrWhiteSpace($OctopusUsername) -eq $true -or [string]::IsNullOrWhiteSpace($AzureEmailAddress) -eq $true) {
            Write-Warning "Path not supplied. OctopusUsername or AzureEmailAddress are either null, or an empty string."
            return
        }
        $usersToUpdate += [PSCustomObject]@{
            OctopusUsername = $OctopusUsername
            AzureEmailAddress = $AzureEmailAddress
            AzureDisplayName = $AzureDisplayName
        }
    }
    else {
        # Validate path 
        if(-not (Test-Path $Path)) {
            Write-Warning "Path '$Path' not found. Does a file exist at that location?"
            return
        }

        $usersToUpdate = Import-Csv -Path $Path -Delimiter ","
    }

    # Check if we have any users. If we do, get existing octopus users
    if($usersToUpdate.Count -gt 0) {
        Write-Host "Users to update: $($usersToUpdate.Count)"
        $ExistingOctopusUsers = @()
        $response = $null
        do {
            $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$OctopusURL/api/users" }
            $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
            $ExistingOctopusUsers += $response.Items
        } while ($response.Links.'Page.Next')

        Write-Debug "Found $($ExistingOctopusUsers.Count) existing Octopus users"
    }
    else {
        Write-Host "No users to update, exiting."
        return
    }
    
    if($ExistingOctopusUsers.Count -le 0) {
        Write-Warning "No users found in Octopus, exiting."
        return
    }

    foreach($user in $usersToUpdate)
    {
        Write-Host "Working on user $($User.OctopusUsername)"
        try {
            $existingOctopusUser = $ExistingOctopusUsers | Where-Object {$_.Username -eq $user.OctopusUsername} | Select-Object -First 1
            if($null -ne $ExistingOctopusUser) {
                Write-Debug "Found matching octopus user for $($user.OctopusUsername)"
                # Check if its a service account
                if($user.IsService -eq $True) {
                    Write-Debug "User $($user.OctopusUsername) is a Service account. This user won't be updated..."
                    continue
                }
                # Check if its an active account
                if($user.IsActive -eq $False) {
                    Write-Debug "User $($user.OctopusUsername) is an inactive account. This user won't be updated..."
                    continue
                }

                # Check for existing Azure AD Identity first.
                $azureAdIdentity = $existingOctopusUser.Identities | Where-Object {$_.IdentityProviderName -eq "Azure AD"} | Select-Object -First 1
                if($null -ne $azureAdIdentity) {
                    Write-Debug "Found existing AzureAD login for user $($user.OctopusUsername)"
                    if($Force -eq $True) {
                        Write-Debug "Force set to true. Replacing existing AzureAD Claims for Display Name and Email for user $($user.OctopusUsername)"
                        $azureAdIdentity.Claims.email.Value = $User.AzureEmailAddress
                        $azureAdIdentity.Claims.dn.Value = $User.AzureDisplayName
                    }
                    else {
                        Write-Debug "Force set to false. Skipping replacing existing AzureAD Claims for Display Name and Email for user $($user.OctopusUsername)"
                    }
                }
                else {
                    Write-Debug "No existing AzureAD login found for user $($user.OctopusUsername), creating new"
                    $newAzureADIdentity = @{
                        IdentityProviderName = "Azure AD"
                        Claims = @{
                            email = @{
                                Value = $User.AzureEmailAddress
                                IsIdentifyingClaim = $True
                            }
                            dn = @{
                                Value = $User.AzureDisplayName
                                IsIdentifyingClaim = $False
                            }
                        }
                    }
                    $existingOctopusUser.Identities += $newAzureADIdentity
                }

                # Update user's email address if set AND the value isnt empty.
                if($UpdateOctopusEmailAddress -eq $True -and -not([string]::IsNullOrWhiteSpace($User.AzureEmailAddress) -eq $true)) {
                    Write-Debug "Setting Octopus email address to: $($User.AzureEmailAddress)"
                    $existingOctopusUser.EmailAddress = $User.AzureEmailAddress
                }

                 # Update user's display name if set AND the value isnt empty.
                 if($UpdateOctopusDisplayName -eq $True -and -not([string]::IsNullOrWhiteSpace($User.AzureDisplayName) -eq $true)) {
                    Write-Debug "Setting Octopus display name to: $($User.AzureDisplayName)"
                    $existingOctopusUser.DisplayName = $User.AzureDisplayName
                }

                $userJsonPayload = $($existingOctopusUser | ConvertTo-Json -Depth 10)

                if($WhatIf -eq $True) {
                    Write-Host "What If set to true, skipping update for user $($User.OctopusUsername). For details of the payload, set DebugLogging to True"
                    Write-Debug "Would have done a POST to $OctopusUrl/api/users/$($existingOctopusUser.Id) with body:"
                    Write-Debug $userJsonPayload
                } 
                else {
                    Write-Host "Updating the user $($User.OctopusUsername) in Octopus Deploy"
                    Invoke-RestMethod -Method PUT -Uri "$OctopusUrl/api/users/$($existingOctopusUser.Id)" -Headers $header -Body $userJsonPayload | Out-Null
                    $recordsUpdated += 1
                }
            }
            else {
                Write-Warning "No match found for an existing octopus user with Username: $($User.OctopusUsername)"
            }
        }
        catch {
            If($ContinueOnError -eq $true) {
                Write-Warning "Error encountered updating $($User.OctopusUsername): $($_.Exception.Message), continuing..."
                continue
            }
            else {
                throw
            }
        }
    }
    Write-Host "Updated $($recordsUpdated) user records."
}
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'

function AddAzureLogins
(
    [Parameter(Mandatory=$True)]
    [String]$OctopusURL,
    [Parameter(Mandatory=$True)]
    [String]$OctopusAPIKey,
    [String]$Path,
    [String]$OctopusUsername,
    [String]$AzureEmailAddress,
    [String]$AzureDisplayName = $null,
    [Boolean]$UpdateOctopusEmailAddress = $False,
    [Boolean]$UpdateOctopusDisplayName = $False,
    [Boolean]$ContinueOnError = $False,
    [Boolean]$Force = $False,
    [Boolean]$WhatIf = $True,
    [Boolean]$DebugLogging = $False
)
{
    Write-Host "OctopusURL: $OctopusURL"
    Write-Host "OctopusAPIKey: ********"
    Write-Host "Path: $Path"
    Write-Host "OctopusUsername: $OctopusUsername"
    Write-Host "AzureEmailAddress: $AzureEmailAddress"
    Write-Host "AzureDisplayName: $AzureDisplayName"
    Write-Host "UpdateOctopusEmailAddress: $UpdateOctopusEmailAddress"
    Write-Host "UpdateOctopusDisplayName: $UpdateOctopusDisplayName"
    Write-Host "ContinueOnError: $ContinueOnError"
    Write-Host "Force: $Force"
    Write-Host "WhatIf: $WhatIf"
    Write-Host "DebugLogging: $DebugLogging"
    Write-Host $("=" * 60)
    Write-Host

    if (-not [string]::IsNullOrWhiteSpace($OctopusURL)) {
        $OctopusURL = $OctopusURL.TrimEnd('/')
    }

    if($DebugLogging -eq $True) {
        $DebugPreference = "Continue"
    }

    
    $endpoint = New-Object Octopus.Client.OctopusServerEndpoint($OctopusURL, $OctopusAPIKey)
    $repository = New-Object Octopus.Client.OctopusRepository($endpoint)
    $client = New-Object Octopus.Client.OctopusClient($endpoint)

    $usersToUpdate = @()
    $recordsUpdated = 0
    # Validate we have minimum required details.
    if ([string]::IsNullOrWhiteSpace($Path) -eq $true) {
        if([string]::IsNullOrWhiteSpace($OctopusUsername) -eq $true -or [string]::IsNullOrWhiteSpace($AzureEmailAddress) -eq $true) {
            Write-Warning "Path not supplied. OctopusUsername or AzureEmailAddress are either null, or an empty string."
            return
        }
        $usersToUpdate += [PSCustomObject]@{
            OctopusUsername = $OctopusUsername
            AzureEmailAddress = $AzureEmailAddress
            AzureDisplayName = $AzureDisplayName
        }
    }
    else {
        # Validate path 
        if(-not (Test-Path $Path)) {
            Write-Warning "Path '$Path' not found. Does a file exist at that location?"
            return
        }

        $usersToUpdate = Import-Csv -Path $Path -Delimiter ","
    }
    
    # Check if we have any users. If we do, get existing octopus users
    if($usersToUpdate.Count -gt 0) {
        Write-Host "Users to update: $($usersToUpdate.Count)"
        $ExistingOctopusUsers = @()

        # Loop through users
        foreach ($user in $usersToUpdate)
        {
            # Retrieve user account from Octopus
            Write-Host "Searching Octopus users for $($user.OctopusUsername) ..."
            $existingOctopusUser = $client.Repository.Users.FindByUsername($user.OctopusUsername)
            
            # Check for null
            if ($null -ne $existingOctopusUser)
            {
                # Check user types
                if ($existingOctopusUser.IsService)
                {
                    # This is a service account and will not be updated
                    Write-Warning "$($user.OctopusUsername) is a service account, skipping ..."

                    continue
                }

                if ($existingOctopusUser.IsActive -eq $False)
                {
                    # Inactive user skipping
                    Write-Warning "$($user.OctopusUsername) is an inactive account, skipping ..."

                    continue
                }

                # Check to see if there's already an Azure identity
                $azureAdIdentity = $existingOctopusUser.Identities | Where-Object {$_.IdentityProviderName -eq "Azure AD"}
                if($null -ne $azureAdIdentity) 
                {
                    Write-Debug "Found existing AzureAD login for user $($user.OctopusUsername)"
                    if($Force -eq $True) 
                    {
                        Write-Debug "Force set to true. Replacing existing AzureAD Claims for Display Name and Email for user $($user.OctopusUsername)"
                        $azureAdIdentity.Claims.email.Value = $User.AzureEmailAddress
                        $azureAdIdentity.Claims.dn.Value = $User.AzureDisplayName
                    }
                    else 
                    {
                        Write-Warning "Force set to false. Skipping replacing existing AzureAD Claims for Display Name and Email for user $($user.OctopusUsername)"
                    }
                }
                else 
                {
                    Write-Debug "No existing AzureAD login found for user $($user.OctopusUsername), creating new"
                    $newAzureADIdentity = New-Object Octopus.Client.Model.IdentityResource
                    $newAzureADIdentity.IdentityProviderName = "Azure AD"
                    
                    $newEmailClaim = New-Object Octopus.Client.Model.IdentityClaimResource
                    $newEmailClaim.IsIdentifyingClaim = $True
                    $newEmailClaim.Value = $user.AzureEmailAddress

                    $newAzureADIdentity.Claims.Add("email", $newEmailClaim) # Claims is a Dictionary object

                    $newDisplayClaim = New-Object Octopus.Client.Model.IdentityClaimResource
                    $newDisplayClaim.IsIdentifyingClaim = $False
                    $newDisplayClaim.Value = $user.AzureDisplayName

                    $newAzureADIdentity.Claims.Add("dn", $newDisplayClaim)

                    $existingOctopusUser.Identities += $newAzureADIdentity # Identities is an array
                }

                # Update user's email address if set AND the value isnt empty.
                if($UpdateOctopusEmailAddress -eq $True -and -not([string]::IsNullOrWhiteSpace($User.AzureEmailAddress) -eq $true)) 
                {
                    Write-Debug "Setting Octopus email address to: $($User.AzureEmailAddress)"
                    $existingOctopusUser.EmailAddress = $User.AzureEmailAddress
                }

                # Update user's display name if set AND the value isnt empty.
                if($UpdateOctopusDisplayName -eq $True -and -not([string]::IsNullOrWhiteSpace($User.AzureDisplayName) -eq $true)) 
                {
                    Write-Debug "Setting Octopus display name to: $($User.AzureDisplayName)"
                    $existingOctopusUser.DisplayName = $User.AzureDisplayName
                }

                if($WhatIf -eq $True) 
                {
                    Write-Host "What If set to true, skipping update for user $($User.OctopusUsername). For details of the payload, set DebugLogging to True"
                    Write-Debug "Would have done a POST to $OctopusUrl/api/users/$($existingOctopusUser.Id) with body:"
                    Write-Debug $userJsonPayload
                } 
                else 
                {
                    Write-Host "Updating the user $($User.OctopusUsername) in Octopus Deploy"
                    $client.Repository.Users.Modify($existingOctopusUser)
                    $recordsUpdated += 1
                }
            }
            else
            {
                # User not found
                Write-Warning "$($user.OctopusUsername) not found!"
            }
        }
        Write-Debug "Found $($ExistingOctopusUsers.Count) existing Octopus users"
    }
    else {
        Write-Host "No users to update, exiting."
        return
    }
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

public class UserToUpdate
{
    public string OctopusUserName
    {
        get;
        set;
    }

    public string AzureEmailAddress
    {
        get;
        set;
    }

    public string AzureDisplayName
    {
        get;
        set;
    }
}

public static void AddAzureLogins(string OctopusUrl, string ApiKey, string Path = "", string OctopusUserName = "", string AzureEmailAddress = "", string AzureDisplayName = "", bool UpdateOctopusEmail = false, bool UpdateOctopusDisplayName = false, bool Force = false, bool WhatIf = false)
{
    // Display passed in information
    Console.WriteLine(string.Format("OctopusURL: {0}", OctopusUrl));
    Console.WriteLine("OctopusAPIKey: ****");
    Console.WriteLine(string.Format("OctopusUsername: {0}", OctopusUserName));
    Console.WriteLine(string.Format("AzureEmailAddress: {0}", AzureEmailAddress));
    Console.WriteLine(string.Format("AzureDisplayName: {0}", AzureDisplayName));
    Console.WriteLine(string.Format("UpdateOctopusEmailAddress: {0}", UpdateOctopusEmail.ToString()));
    Console.WriteLine(string.Format("UpdateOctopusDisplayName: {0}", UpdateOctopusDisplayName.ToString()));
    Console.WriteLine(string.Format("Force: {0}", Force.ToString()));
    Console.WriteLine(string.Format("WhatIf: {0}", WhatIf.ToString()));

    // Check to see url is emtpy
    if (!string.IsNullOrWhiteSpace(OctopusUrl))
    {
        // Remove trailing /
        OctopusUrl = OctopusUrl.TrimEnd('/');
    }

    // Create Octopus.Client objects
    var endpoint = new Octopus.Client.OctopusServerEndpoint(OctopusUrl, ApiKey);
    var repository = new Octopus.Client.OctopusRepository(endpoint);
    var client = new Octopus.Client.OctopusClient(endpoint);

    // Declare collection of users to update
    var usersToUpdate = new System.Collections.Generic.List<UserToUpdate>();

    // Test to see if path was provided
    if (string.IsNullOrWhiteSpace(Path))
    {
        if (!string.IsNullOrWhiteSpace(OctopusUserName) || !string.IsNullOrWhiteSpace(AzureEmailAddress))
        {
            // Create new user to update object
            var userToUpdate = new UserToUpdate();
            userToUpdate.AzureDisplayName = AzureDisplayName;
            userToUpdate.AzureEmailAddress = AzureEmailAddress;
            userToUpdate.OctopusUserName = OctopusUserName;

            // Add to collection
            usersToUpdate.Add(userToUpdate);
        }
    }
    else
    {
        // Read from csv
        using (var reader = new System.IO.StreamReader(Path))
        {
            while (!reader.EndOfStream)
            {
                var line = reader.ReadLine();
                var columns = line.Split(',');

                // Create new user to update object
                var userToUpdate = new UserToUpdate();
                userToUpdate.AzureDisplayName = columns[0];
                userToUpdate.AzureEmailAddress = columns[1];
                userToUpdate.OctopusUserName = columns[2];

                // Add to collection
                usersToUpdate.Add(userToUpdate);
            }
        }
    }

    // Check to see if we have anything to update
    if (usersToUpdate.Count > 0)
    {
        Console.WriteLine(string.Format("Users to update: {0}", usersToUpdate.Count));

        // Loop through collection
        foreach (var userToUpdate in usersToUpdate)
        {
            Console.WriteLine(string.Format("Searching for user {0}", userToUpdate.OctopusUserName));
            var existingOctopusUser = client.Repository.Users.FindByUsername(userToUpdate.OctopusUserName);

            // Check to see if something was returned
            if (null != existingOctopusUser)
            {
                // Check to see if it is a service account
                if (existingOctopusUser.IsService)
                {
                    Console.WriteLine(string.Format("{0} is a service account, skipping ...", userToUpdate.OctopusUserName));
                    continue;
                }

                // Check to see if user is active
                if (!existingOctopusUser.IsActive)
                {
                    Console.WriteLine(string.Format("{0} is not an active account, skipping ...", userToUpdate.OctopusUserName));
                }

                // Get existing azure identity, if exists
                var azureAdIdentity = existingOctopusUser.Identities.FirstOrDefault(i => i.IdentityProviderName == "Azure AD");

                // Check to see if something was returned
                if(null != azureAdIdentity)
                {
                    // Check to see if force update was set
                    if (Force)
                    {
                        Console.WriteLine(string.Format("Force set to true, replacing existing entries for {0}", userToUpdate.OctopusUserName));
                        azureAdIdentity.Claims["email"].Value = userToUpdate.AzureEmailAddress;
                        azureAdIdentity.Claims["dn"].Value = userToUpdate.AzureDisplayName;
                    }
                }
                else
                {
                    Console.WriteLine(string.Format("No existing AzureAD login found for user {0}", userToUpdate.OctopusUserName));

                    // Create new octopus objects
                    var newAzureIdentity = new Octopus.Client.Model.IdentityResource();
                    newAzureIdentity.IdentityProviderName = "Azure AD";

                    var newEmailClaim = new Octopus.Client.Model.IdentityClaimResource();
                    newEmailClaim.IsIdentifyingClaim = true;
                    newEmailClaim.Value = userToUpdate.AzureEmailAddress;

                    newAzureIdentity.Claims.Add("email", newEmailClaim);

                    var newDisplayNameClaim = new Octopus.Client.Model.IdentityClaimResource();
                    newDisplayNameClaim.IsIdentifyingClaim = false;
                    newDisplayNameClaim.Value = userToUpdate.AzureDisplayName;

                    newAzureIdentity.Claims.Add("dn", newDisplayNameClaim);

                    // Add identity object to user
                    var identityCollection = new System.Collections.Generic.List<Octopus.Client.Model.IdentityResource>(existingOctopusUser.Identities);
                    identityCollection.Add(newAzureIdentity);
                    existingOctopusUser.Identities = identityCollection.ToArray();
                }

                if (UpdateOctopusDisplayName && !string.IsNullOrWhiteSpace(userToUpdate.AzureDisplayName))
                {
                    Console.WriteLine(string.Format("Setting Octopus Display Name to: {0}", userToUpdate.AzureDisplayName));
                    existingOctopusUser.DisplayName = userToUpdate.AzureDisplayName;
                }

                if (UpdateOctopusEmail && !string.IsNullOrWhiteSpace(userToUpdate.AzureEmailAddress))
                {
                    Console.WriteLine(string.Format("Setting Octopus Email Address to: {0}", userToUpdate.AzureEmailAddress));
                    existingOctopusUser.EmailAddress = userToUpdate.AzureEmailAddress;
                }

                if (WhatIf)
                {
                    Console.WriteLine(string.Format("WhatIf is set to true, skipping update of user: {0}", userToUpdate.OctopusUserName));
                    Console.WriteLine(existingOctopusUser);
                }
                else
                {
                    // Update account
                    Console.WriteLine(string.Format("Updating: {0}", userToUpdate.OctopusUserName));
                    client.Repository.Users.Modify(existingOctopusUser);
                }
            }
        }
    }
}
```
```python Python3
import json
import requests
import csv

# Define class
class userToUpdate:
    OctopusUsername = ''
    AzureEmailAddress = ''
    AzureDisplayName = ''

# Define Octopus server variables
octopus_server_uri = 'https://YourUrl'
octopus_api_key = 'API-YourAPIKey'


# Create function
def AddAzureLogins(OctopusUrl, 
OctopusAPIKey, Path='', 
OctopusUsername='', 
AzureEmailAddress='', 
AzureDisplayName='',
UpdateOctopusEmailAddress=False, 
UpdateOctopusDisplayName=False, 
Force=False, 
WhatIf=False):
    # Display values passed into function
    print ("OctopusURL: ", OctopusUrl)
    print ("OctopusAPIKey: ", "*******")
    print ("Path: ", Path)
    print ("OctopusUsername: ", OctopusUsername)
    print ("AzureEmailAddress: ", AzureEmailAddress)
    print ("AzureDisplayName: ", AzureDisplayName)
    print ("UpdateOctopusEmailAddress", UpdateOctopusEmailAddress)
    print ("UpdateOctopusDisplayName: ", UpdateOctopusDisplayName)  

    headers = {'X-Octopus-ApiKey': OctopusAPIKey}
    usersToUpdate = []

    if Path:
        # Write something to do extraction
        with open(Path) as csvfile:
            csv_reader = csv.reader(csvfile, delimiter=',')
            for row in csv_reader:
                updateUser = userToUpdate()
                updateUser.AzureDisplayName = row[0]
                updateUser.AzureEmailAddress = row[1]
                updateUser.OctopusUsername = row[3]

                usersToUpdate.append(updateUser)
    else:
        updateUser = userToUpdate()
        updateUser.AzureDisplayName = AzureDisplayName
        updateUser.AzureEmailAddress = AzureEmailAddress
        updateUser.OctopusUsername = OctopusUsername

        usersToUpdate.append(updateUser)

    # Gather users from instance
    existingUsers = []
    uri = '{0}/users'.format(OctopusUrl)
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    # Decode content
    results = json.loads(response.content.decode('utf-8'))
    existingUsers += results["Items"]

    # Loop through remaining results
    while ("Page.Next" in results["Links"]):
            response = requests.get(uri, headers=headers)
            response.raise_for_status()

            # Decode content
            results = json.loads(response.content.decode('utf-8'))
            existingUsers += results["Items"]
    for user in usersToUpdate:
        # Search for user
        existingUser = next((u for u in existingUsers if u["Username"] == user.OctopusUsername), None)
        
        if (existingUser != None):
            print(existingUser)
            # Check to see if user is a service account
            if (existingUser["IsService"] == True):
                print (f"User {user.OctopusUsername} is a service account, skipping ...")
                continue

            if (existingUser["IsActive"] == False):
                print (f"User {user.OctopusUsername} is inactive, skipping...")
                continue

            if (existingUser["Identities"] != None):
                azureAdIdentity = next((u for u in existingUser["Identities"] if u["IdentityProviderName"] == "Azure AD"), None)
                
                if (azureAdIdentity != None):
                    print (f"Found existing Azure AD identity for {user.OctopusUsername} ...")
                    
                    if(Force):
                        print("Force is set to true, overwriting values")
                        azureAdIdentity["Claims"]["email"]["Value"] = user.AzureEmailAddress
                        azureAdIdentity["Claims"]["dn"]["Value"] = user.AzureDisplayName
                    else:
                        print("Force is set to false, skipping...")
                        continue
                else:
                    # Create new Identity
                    newIdentity = {
                        'IdentityProviderName': 'Azure AD',
                        'Claims': {
                            'email': {
                                'Value': user.AzureEmailAddress,
                                'IsIdentifyingClaim': True
                            },
                            'dn':{
                                'Value': user.AzureDisplayName,
                                'IsIdentifyingClaim': False
                            }
                        }
                    }
                    existingUser["Identities"].append(newIdentity)

            if (UpdateOctopusEmailAddress):
                existingUser["EmailAddress"] = user.AzureEmailAddress

            if (UpdateOctopusDisplayName):
                existingUser["DisplayName"] = user.AzureDisplayName

            # Update the user account
            uri = '{0}/users/{1}'.format(OctopusUrl, existingUser['Id'])
            response = requests.put(uri, headers=headers, json=existingUser)
            response.raise_for_status()
    return


AddAzureLogins(octopus_server_uri, octopus_api_key, OctopusUsername='some.email@microsoft.com', AzureDisplayName='DisplayName', AzureEmailAddress='some.email@microsoft.com', Force=True )
```
```go Go
package main

import (
	"fmt"
	"log"
	"os"

	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"

	"encoding/csv"
	"io"
)

type User struct {
	OctopusUsername   string
	AzureEmailAddress string
	AzureDisplayName  string
}

func main() {

	apiURL, err := url.Parse("https://YourUrl")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"

	Path := ""
	Users := []User{}
	OctopusUsername := ""
	AzureEmailAddress := ""
	AzureDisplayName := ""
	OverwriteEmailAddress := false
	OverwriteDisplayName := false

	if Path != "" {
		Users = GetCSVData(Path)
	} else {
		u := User{OctopusUsername: OctopusUsername, AzureEmailAddress: AzureEmailAddress, AzureDisplayName: AzureDisplayName}
		Users = append(Users, u)
	}

	for i := 0; i < len(Users); i++ {
		// Get existing user account
		existingUser := GetUser(apiURL, APIKey, Users[i].OctopusUsername)

		// Check to see if something was returned
		if existingUser != nil {
			fmt.Println("Found " + existingUser.Username)

			// Check to see if it has an identity
			if existingUser.Identities != nil {
				identityIndex := -1
				// Loop through Identities collection
				for j := 0; j < len(existingUser.Identities); j++ {
					if existingUser.Identities[i].IdentityProviderName == "Azure AD" {
						fmt.Println("User has existing Azure AD identity")
						identityIndex = j
						break
					}
				}

				if identityIndex > -1 {
					if OverwriteDisplayName {
						existingUser.DisplayName = Users[i].AzureDisplayName
					}

					if OverwriteEmailAddress {
						existingUser.EmailAddress = Users[i].AzureEmailAddress
					}

				} else {
					// Create new identity object
					claimsCollection := make(map[string]octopusdeploy.IdentityClaim)
					emailClaim := octopusdeploy.IdentityClaim{Value: Users[i].AzureEmailAddress, IsIdentifyingClaim: true}
					displayNameClaim := octopusdeploy.IdentityClaim{Value: Users[i].AzureDisplayName, IsIdentifyingClaim: false}
					claimsCollection["email"] = emailClaim
					claimsCollection["dn"] = displayNameClaim
					octopusIdentity := octopusdeploy.Identity{IdentityProviderName: "Azure AD", Claims: claimsCollection}

					// Add new identity
					existingUser.Identities = append(existingUser.Identities, octopusIdentity)
				}

				// Update user account
				client := octopusAuth(apiURL, APIKey, "")
				existingUser, err = client.Users.Update(existingUser)

				if err != nil {
					log.Println(err)
				}
			}
		}
	}
}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func GetUser(octopusURL *url.URL, APIKey string, OctopusUserName string) *octopusdeploy.User {
	// Get client
	client := octopusAuth(octopusURL, APIKey, "")

	// Get user account
	userQuery := octopusdeploy.UsersQuery{
		Filter: OctopusUserName,
	}

	userAccounts, err := client.Users.Get(userQuery)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(userAccounts.Items); i++ {
		// Check to see if it's a match
		if userAccounts.Items[i].Username == OctopusUserName {
			return userAccounts.Items[i]
		}
	}

	return nil
}

func GetCSVData(Path string) []User {
	recordFile, err := os.Open(Path)

	if err != nil {
		log.Println(err)
	}

	Users := []User{}

	reader := csv.NewReader(recordFile)
	reader.Comma = ','

	for i := 0; ; i++ {
		record, err := reader.Read()

		if err == io.EOF {
			break
		}

		userAccount := User{OctopusUsername: record[0], AzureEmailAddress: record[1], AzureDisplayName: record[2]}

		Users = append(Users, userAccount)
	}

	return Users
}
```