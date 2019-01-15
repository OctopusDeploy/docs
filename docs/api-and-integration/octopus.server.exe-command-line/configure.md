---
title: Configure
description:  Configure this Octopus instance
---

Use the configure command to configure this Octopus instance.

**Configure options**

```text
Usage: octopus.server configure [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --home=VALUE           Home directory
      --serverNodeName=VALUE Unique Server Node name for a clustered
                               environment
      --cachePackages=VALUE  Days to cache packages for. Default: 20
      --maxConcurrentTasks=VALUE
                             Deprecated: may be removed in a future release
                               (currently has no effect; set Task Cap instead).
                                Maximum number of concurrent tasks that the
                               Octopus Server can execute. Default is 0 (no
                               limit).
      --upgradeCheck=VALUE   Whether checking for upgrades is allowed (true
                               or false)
      --upgradeCheckWithStatistics=VALUE
                             Include usage statistics when checking for
                               upgrades (true or false)
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
      --upgradeNotification=VALUE
                             Modifies the visibility of the notification when
                               upgrades are available. Valid values are
                               AlwaysShow, ShowOnlyMajorMinor and NeverShow.
      --webCorsWhitelist=VALUE
                             Comma-separated whitelist of domains that are
                               allowed to retrieve data (empty turns CORS off,
                               * allows all).
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
      --webReferrerPolicy=VALUE
                             Sets the 'Referrer-Policy' response header.
                               Defaults to 'no-referrer'.
      --webTrustedRedirectUrls=VALUE
                             Comma-seperated list of URLs that are trusted
                               for redirection
      --autoLoginEnabled=VALUE
                             Enable/disable automatic user login.
      --selfServiceLoginEditingEnabled=VALUE
                             Enable/disable whether users can edit their own
                               logins.
      --azureADIsEnabled=VALUE
                             Set the azureAD IsEnabled, used for
                               authentication.
      --azureADIssuer=VALUE  Set the azureAD Issuer, used for authentication.
      --azureADClientId=VALUE
                             Set the azureAD ClientId.
      --azureADScope=VALUE   Set the azureAD Scope.
      --azureADNameClaimType=VALUE
                             Set the azureAD NameClaimType.
      --azureADAllowAutoUserCreation=VALUE
                             Set azureAD AllowAutoUserCreation.
      --azureADRoleClaimType=VALUE
                             Set the RoleClaimType.
      --activeDirectoryIsEnabled=VALUE
                             Set whether active directory is enabled.
      --activeDirectoryContainer=VALUE
                             Set the active directory container used for
                               authentication.
      --webAuthenticationScheme=VALUE
                             When Domain authentication is used, specifies
                               the scheme (Basic, Digest,
                               IntegratedWindowsAuthentication, Negotiate,
                               Ntlm).
      --allowFormsAuthenticationForDomainUsers=VALUE
                             When Domain authentication is used, specifies
                               whether the HTML-based username/password form
                               can be used to sign in.
      --activeDirectorySecurityGroupsEnabled=VALUE
                             When Domain authentication is used, specifies
                               whether to support security groups from AD.
      --activeDirectoryAllowAutoUserCreation=VALUE
                             Whether unknown users will be automatically
                               created upon successful login.
      --googleAppsIsEnabled=VALUE
                             Set the googleApps IsEnabled, used for
                               authentication.
      --googleAppsIssuer=VALUE
                             Set the googleApps Issuer, used for
                               authentication.
      --googleAppsClientId=VALUE
                             Set the googleApps ClientId.
      --googleAppsScope=VALUE
                             Set the googleApps Scope.
      --googleAppsNameClaimType=VALUE
                             Set the googleApps NameClaimType.
      --googleAppsAllowAutoUserCreation=VALUE
                             Set googleApps AllowAutoUserCreation.
      --googleAppsHostedDomain=VALUE
                             Set the googleApps HostedDomain.
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --oktaIsEnabled=VALUE  Set the okta IsEnabled, used for authentication.
      --oktaIssuer=VALUE     Set the okta Issuer, used for authentication.
      --oktaClientId=VALUE   Set the okta ClientId.
      --oktaScope=VALUE      Set the okta Scope.
      --oktaNameClaimType=VALUE
                             Set the okta NameClaimType.
      --oktaAllowAutoUserCreation=VALUE
                             Set okta AllowAutoUserCreation.
      --oktaRoleClaimType=VALUE
                             Set the RoleClaimType.
      --usernamePasswordIsEnabled=VALUE
                             Set whether Octopus username/password
                               authentication is enabled.

Or one of the common options:

      --help                 Show detailed help for this command
```

