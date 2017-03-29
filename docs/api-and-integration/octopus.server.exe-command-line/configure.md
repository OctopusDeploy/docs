---
title: Configure
description:  Configure this Octopus instance
---

Use the configure command to configure this Octopus instance.

**Configure options**

```text
Usage: Octopus.Server configure [<options>]

Where [<options>] is any of:
      --home=VALUE                            Home directory
      --masterKey=VALUE                       Set the current master key
      --storageConnectionString=VALUE         SQL Server connection string
      --serverNodeName=VALUE                  Unique Server Node name for a clustered environment
      --cachePackages=VALUE                  Days to cache packages for. Default: 20
      --maxConcurrentTasks=VALUE              Maximum number of concurrent tasks that the
                                                Octopus Server can execute. Default is 0 (no limit)
      --upgradeCheck=VALUE                    Whether checking for upgrades is allowed
                                                (true or false)
      --upgradeCheckWithStatistics=VALUE      Include usage statistics when checking for upgrades
                                                (true or false)
      --webAuthenticationMode=VALUE           Authentication mode to use for the web portal  
                                                (UsernamePassword, Domain)
      --commsListenPort=VALUE                 TCP port that the communications service should listen on
      --commsListenWebSocket=VALUE            WebSocket prefix that the communications service should  
                                                listen on, e.g. 'https://+:443/OctopusComms`  
                                                Set to blank to disable websockets.
                                                Refer to http://g.octopushq.com/WebSocketComms
      --webListenPrefixes=VALUE               Comma-separated list of HTTP.sys listen prefixes (e.g., 'http://localhost/octopus')
      --webForceSSL=VALUE                     Whether SSL should be required (HTTP requests get redirected to HTTPS)
      --requestLoggingEnabled=VALUE           Whether to enable logging of web requests
      --azurePowerShellModule=VALUE           Path to Azure PowerShell module to be used
      --customBundledPackageDirectory=VALUE   A custom folder for getting packages (like Calamari)
                                                that are normally bundled with Octopus Server

Or one of the common options:
      --console                               Don't attempt to run as a service, even if the
                                                user is non-interactive
      --nologo                                Don't print title or version information
      --noconsolelogging                      Don't log to the console
```
