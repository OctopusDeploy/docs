---
title: Configure
description:  Configure this Octopus instance
---

Use the configure command to configure this Octopus instance.

**Configure options**

```text
Usage: Octopus.Server configure [<options>]

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
      --azureADIssuer=VALUE  Follow our documentation to find the Issuer for
                               azureAD.
      --azureADClientId=VALUE
                             Follow our documentation to find the Client ID
                               for azureAD.
      --azureADScope=VALUE   Only change this if you need to change the
                               OpenID Connect scope requested by Octopus for
                               azureAD.
      --azureADNameClaimType=VALUE
                             Only change this if you want to use a different
                               security token claim for the name from azureAD.
      --azureADAllowAutoUserCreation=VALUE
                             Tell Octopus to automatically create a user
                               account when a person signs in with azureAD.
      --azureADRoleClaimType=VALUE
                             Tell Octopus how to find the roles in the
                               security token from Azure Active Directory.
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
                             Follow our documentation to find the Issuer for
                               googleApps.
      --googleAppsClientId=VALUE
                             Follow our documentation to find the Client ID
                               for googleApps.
      --googleAppsScope=VALUE
                             Only change this if you need to change the
                               OpenID Connect scope requested by Octopus for
                               googleApps.
      --googleAppsNameClaimType=VALUE
                             Only change this if you want to use a different
                               security token claim for the name from
                               googleApps.
      --googleAppsAllowAutoUserCreation=VALUE
                             Tell Octopus to automatically create a user
                               account when a person signs in with googleApps.
      --googleAppsHostedDomain=VALUE
                             Tell Octopus which Google Apps domain to trust.
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --oktaIsEnabled=VALUE  Set the okta IsEnabled, used for authentication.
      --oktaIssuer=VALUE     Follow our documentation to find the Issuer for
                               okta.
      --oktaClientId=VALUE   Follow our documentation to find the Client ID
                               for okta.
      --oktaScope=VALUE      Only change this if you need to change the
                               OpenID Connect scope requested by Octopus for
                               okta.
      --oktaNameClaimType=VALUE
                             Only change this if you want to use a different
                               security token claim for the name from okta.
      --oktaAllowAutoUserCreation=VALUE
                             Tell Octopus to automatically create a user
                               account when a person signs in with okta.
      --oktaRoleClaimType=VALUE
                             Tell Octopus how to find the roles in the
                               security token from Okta.
      --usernamePasswordIsEnabled=VALUE
                             Set whether Octopus username/password
                               authentication is enabled.

Or one of the common options:

      --help                 Show detailed help for this command


```
