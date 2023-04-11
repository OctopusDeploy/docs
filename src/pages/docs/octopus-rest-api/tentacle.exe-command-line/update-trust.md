---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Update trust
description: Replaces the trusted Octopus Server thumbprint of any matching polling or listening registrations with a new thumbprint to trust
---

Replaces the trusted Octopus Server thumbprint of any matching polling or listening registrations with a new thumbprint to trust.

**update-trust options**

```text
Usage: tentacle update-trust [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --oldThumbprint=VALUE  The thumbprint of the old Octopus Server to be
                               replaced
      --newThumbprint=VALUE  The thumbprint of the new Octopus Server

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example replaces the trusted thumbprint value `3FAFA8E1EE6A1133701190306E2CBAFA39C30C8D` with the new value `5FAEA8E1EE6A4535701190536E2CBAFA39C30C8F` for any matching instances:

```
Tentacle update-trust --oldThumbprint="3FAFA8E1EE6A1133701190306E2CBAFA39C30C8D" --newThumbprint="5FAEA8E1EE6A4535701190536E2CBAFA39C30C8F"
```

## Automated Update Of Trust

This example will query the Octopus Server endpoint and pull the certificate.  If the endpoint's certificate thumbprint is different than the Tentacle it will find the matching Tentacles installed and update them.

Recommend setting up a scheduled task to run every 20-30 minutes to check the certificate thumbprint of the server when you are in the process of updating your certificate. 

```powershell
$octopusURL = "https://samples.octopus.app:10943" #Replace 10943 with 443 for polling Tentacles over websockets
$tentacleExe = "C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe"
$logLocation = "C:\OctopusScripts"
$logFile = "$logLocation\UpdatePollingCert_Log.Txt"

$uri = New-Object System.Uri($octopusURL)
if (-Not ($uri.Scheme -eq "https"))
{
    Write-Error "You can only get keys for https addresses"
    exit 1
}

if ((Test-Path $logLocation) -eq $false)
{
    New-Item $logLocation -ItemType Directory
}

if ((Test-Path $logfile) -eq $false)
{
    New-Item $logfile -ItemType File
}

function Write-ToLog
{
    param (
        $message
    )

    $currentDate = (Get-Date).ToString("HH:mm:ss yyyy/MM/dd")

    Write-Host "$currentDate $message"
    Add-Content -value "$currentDate $message" -Path $logfile
}

$request = [System.Net.HttpWebRequest]::Create($uri)

try
{
    #Make the request but ignore (dispose it) the response, since we only care about the service point 
    $request.GetResponse().Dispose()
}
catch [System.Net.WebException]
{
    if ($_.Exception.Status -eq [System.Net.WebExceptionStatus]::TrustFailure)
    {
        #We ignore trust failures, since we only want the certificate, and the service point is still populated at this point
    }
    else
    {       
        Write-ToLog $_.Exception.Message 
        throw
    }
}

$servicePoint = $request.ServicePoint
$certificate = $servicePoint.Certificate    

if ($null -eq $certificate)
{
    Write-ToLog "Unable to pull the certificate for $uri"
    exit 1
}

$certinfo = New-Object system.security.cryptography.x509certificates.x509certificate2($certificate)
$thumbParts = $certinfo.Thumbprint.ToCharArray()

$thumbParts2 = New-Object System.Collections.ArrayList
for ($i = 0; $i -lt $thumbParts.Length; $i = $i+2) {
    [Void]$thumbParts2.Add([string]$thumbParts[$i]+$thumbParts[$i+1])
}

$certThumbprint = ([String]::Join(':',$thumbParts2.toarray([string]))) -replace ":", ""

Write-ToLog "The certificate for $OctopusUrl is $certThumbprint"
$instanceList = (& $tentacleExe list-instances --format="JSON") | Out-String | ConvertFrom-Json
Write-ToLog "Found $($instanceList.length) Tentacle instances"

foreach ($instance in $instanceList)
{
    $instanceConfig = (& $tentacleExe show-configuration --instance="$($instance.InstanceName)") | Out-String | ConvertFrom-Json

    # This should come back as an array, but if there is only one trusted server it won't, force it to be an array.
    $trustedServers = @($instanceConfig.Tentacle.Communication.TrustedOctopusServers)

    foreach ($server in $trustedServers)
    {
        $currentThumbprint = $server.Thumbprint

        if ([string]::IsNullOrWhiteSpace($server.Address))
        {
            Write-ToLog "The current server is not a polling Tentacle, moving onto next one."
            continue
        }

        if ($server.Address -notlike "$octopusURL*")
        {
            Write-ToLog "The server $($server.Address) does not match $octopusUrl, moving onto next server"
            continue
        }

        if ([string]::IsNullOrWhiteSpace($currentThumbprint))
        {
            Write-ToLog "The server $($server.Address) does not trust anything, adding in the trust."
            & $tentacleExe service --instance="$($instance.InstanceName)" --stop
            & $tentacleExe trust --oldThumbprint $currentThumbprint --newThumbprint $certThumbprint --instance="$($instance.InstanceName)"
            & $tentacleExe service --instance="$($instance.InstanceName)" --start
        }
        elseif ($currentThumbprint -ne $certThumbprint)
        {       
            Write-ToLog "The thumbprint has changed from $currentThumbprint to $certThumbprint, updating the Tentacle $($instance.InstanceName)"
            & $tentacleExe service --instance="$($instance.InstanceName)" --stop
            & $tentacleExe update-trust --oldThumbprint $currentThumbprint --newThumbprint $certThumbprint --instance="$($instance.InstanceName)"
            & $tentacleExe service --instance="$($instance.InstanceName)" --start
        }
        else 
        {
            Write-ToLog "The thumbprint for the Tentacle $($instance.InstanceName) is still $certThumbprint"        
        }
    }  
}
```
