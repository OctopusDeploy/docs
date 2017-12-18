```powershell
      --instance=VALUE       Name of the instance to use
      --home=VALUE           Home directory
      --storageConnectionString=VALUE
                             SQL Server connection string
      --serverNodeName=VALUE Unique Server Node name for a clustered
                               environment
      --cachePackages=VALUE  Days to cache packages for. Default: 20
      --maxConcurrentTasks=VALUE
                             Maximum number of concurrent tasks that the
                               Octopus Server can execute. Default is 0 (no
                               limit).
      --upgradeCheck=VALUE   Whether checking for upgrades is allowed (true
                               or false)
      --upgradeCheckWithStatistics=VALUE
                             Include usage statistics when checking for
                               upgrades (true or false)
      --masterKey=VALUE      Set the current master key
      --webAuthenticationMode=VALUE
                             Authentication mode to use for the web portal
                               (UsernamePassword, Domain)
      --webAuthenticationScheme=VALUE
                             When Domain authentication is used, specifies
                               the scheme (Basic, Digest,
                               IntegratedWindowsAuthentication, Negotiate, Ntlm)
      --allowFormsAuthenticationForDomainUsers=VALUE
                             When Domain authentication is used, specifies
                               whether the HTML-based username/password form
                               can be used to sign in.
      --webForceSsl=VALUE    Whether SSL should be required (HTTP requests
                               get redirected to HTTPS)
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --webListenPrefixes=VALUE
                             Comma-seperated list of HTTP.sys listen prefixes
                               (e.g., 'http://localhost/octopus')
      --requestLoggingEnabled=VALUE
                             Whether to enable logging of web requests
      --commsListenPort=VALUE
                             TCP port that the communications service should
                               listen on
      --activeDirectoryContainer=VALUE
                             Set the active directory container used for
                               authentication.
      --webCorsWhitelist=VALUE
                             Comma-separated whitelist of domains that are
                               allowed to retrieve data (empty turns CORS off,
                               * allows all).
      --azurePowerShellModule=VALUE
                             Path to Azure PowerShell module to be used

Or one of the common options:

      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
 
Or one of the options supported/provided by the server extensions.
```