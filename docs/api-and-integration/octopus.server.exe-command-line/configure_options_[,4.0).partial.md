```text
Usage: Octopus.Server configure [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --home=VALUE           Home directory
      --masterKey=VALUE      Set the current master key
      --storageConnectionString=VALUE
                             SQL Server connection string
      --serverNodeName=VALUE Unique Server Node name for a clustered
                               environment
      --cachePackages=VALUE  Days to cache packages for. Default: 20
      --maxConcurrentTasks=VALUE
                             Maximum number of concurrent tasks that the
                               Octopus Server can execute. Default is 0 (no
                               limit)
      --upgradeCheck=VALUE   Whether checking for upgrades is allowed (true
                               or false)
      --upgradeCheckWithStatistics=VALUE
                             Include usage statistics when checking for
                               upgrades (true or false)
      --webAuthenticationMode=VALUE
                             Authentication mode to use for the web portal
                               (UsernamePassword, Domain)
      --commsListenPort=VALUE
                             TCP port that the communications service should
                               listen on
      --commsListenWebSocket=VALUE
                             WebSocket prefix that the communications service
                               should listen on (e.g.
                               'https://+:443/OctopusComms`); Set to blank to
                               disable websockets; Refer to http://g.octopush-
                               q.com/WebSocketComms
      --webListenPrefixes=VALUE
                             Comma-separated list of HTTP.sys listen prefixes
                               (e.g., 'http://localhost/octopus')
      --webForceSSL=VALUE    Whether SSL should be required (HTTP requests
                               get redirected to HTTPS)
      --requestLoggingEnabled=VALUE
                             Whether to enable logging of web requests
      --azurePowerShellModule=VALUE
                             Path to Azure PowerShell module to be used
      --customBundledPackageDirectory=VALUE
                             A custom folder for getting packages (like
                               Calamari) that are normally bundled with Octopus
                               Server
      --usernamePasswordIsEnabled=VALUE
                             Set whether Octopus username/password
                               authentication is enabled.
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --googleAppsIsEnabled=VALUE
                             Set the googleApps IsEnabled, used for
                               authentication.
      --googleAppsIssuer=VALUE
                             Set the googleApps Issuer, used for
                               authentication.
      --googleAppsResponseType=VALUE
                             Set the googleApps ResponseType.
      --googleAppsResponseMode=VALUE
                             Set the googleApps ResponseMode.
      --googleAppsClientId=VALUE
                             Set the googleApps ClientId.
      --googleAppsScope=VALUE
                             Set the googleApps Scope.
      --googleAppsNameClaimType=VALUE
                             Set the googleApps NameClaimType.
      --googleAppsLoginLinkLabel=VALUE
                             Set the googleApps LoginLinkLabel.
      --googleAppsCertificateUri=VALUE
                             Set the googleApps CertificateUri
      --googleAppsHostedDomain=VALUE
                             Set the googleApps HostedDomain.
      --activeDirectoryIsEnabled=VALUE
                             Set whether active directory is enabled.
      --activeDirectoryContainer=VALUE
                             Set the active directory container used for
                               authentication.
      --webAuthenticationScheme=VALUE
                             When Domain authentication is used, specifies
                               the scheme (Basic, Digest,
                               IntegratedWindowsAuthentication, Negotiate, Ntlm)
      --allowFormsAuthenticationForDomainUsers=VALUE
                             When Domain authentication is used, specifies
                               whether the HTML-based username/password form
                               can be used to sign in.
      --activeDirectorySecurityGroupsEnabled=VALUE
                             When Domain authentication is used, specifies
                               whether to support security groups from AD.
      --azureADIsEnabled=VALUE
                             Set the azureAD IsEnabled, used for
                               authentication.
      --azureADIssuer=VALUE  Set the azureAD Issuer, used for authentication.
      --azureADResponseType=VALUE
                             Set the azureAD ResponseType.
      --azureADResponseMode=VALUE
                             Set the azureAD ResponseMode.
      --azureADClientId=VALUE
                             Set the azureAD ClientId.
      --azureADScope=VALUE   Set the azureAD Scope.
      --azureADNameClaimType=VALUE
                             Set the azureAD NameClaimType.
      --azureADLoginLinkLabel=VALUE
                             Set the azureAD LoginLinkLabel.
      --azureADRoleClaimType=VALUE
                             Set the RoleClaimType.
      --webCorsWhitelist=VALUE
                             Comma-separated whitelist of domains that are
                               allowed to retrieve data (empty turns CORS off,
                               * allows all).
      --webTrustedRedirectUrls=VALUE
                             Comma-seperated list of URLs that are trusted
                               for redirection
      --xFrameOptionAllowFrom=VALUE
                             A uri to provide in the X-Frame-Option http
                               header in conjunction with the ALLOW-FROM value.
      --hstsEnabled=VALUE    Enables or disables sending the Strict-Transport-
                               Security (HSTS) header. Defaults to false.
      --hstsMaxAge=VALUE     Sets the max-age value (in seconds) of the
                               Strict-Transport-Security (HSTS) header.
                               Defaults to 1 year (31556926 seconds).
      --webContentSecurityPolicyEnabled=VALUE
                             Enables or disables sending the Content-Security-
                               Policy header. Defaults to true.
      --autoLoginEnabled=VALUE
                             Enable/disable automatic user login.
      --webReferrerPolicy=VALUE
                             Sets the 'Referrer-Policy' response header.
                               Defaults to 'no-referrer'.

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```
