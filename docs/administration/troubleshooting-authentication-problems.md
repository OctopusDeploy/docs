---
title: Troubleshooting authentication problems
description: A guide for troubleshooting authentication problems in Octopus Deploy.
position: 6
---

We take every reasonable effort to make Octopus Deploy secure by enabling you to use the best [authentication provider](/docs/administration/authentication-providers/index.md) for your organization. This guide will help you troubleshoot any problems you may encounter when signing in to the Octopus Deploy portal.

## Octopus authentication cookie

Once you have proven your identity to Octopus Server using one of the supported [authentication providers](/docs/administration/authentication-providers/index.md), the Octopus Server will issue a cookie so your web browser can make secure requests on your behalf. The following messages may indicate a problem with your browser, or your network, and the Octopus authentication cookie:

`The sign in succeeded but we failed to get the resultant permissions for this user account. This can happen if the Octopus authentication cookie is blocked.`

This can happen for quite a number of reasons:

1. Your web browser does not support cookies. Configure your browser to accept cookies from your Octopus Server. You may need to ask your systems administrator for help with this.
1. The time is incorrect on your computer, or the time is incorrect on the Octopus Server. This can cause your authentication cookies to expire and become unusable. Correct the time and configure your computers to automatically synchronize their time from a time server.
1. You are using Chrome and have not configured your Octopus Server to use HTTPS. Chrome has started to consider web sites served over `http://` as unsafe and will refuse to accept cookies from those unsafe sites. [Configure your Octopus Server to use HTTPS](/docs/administration/security/exposing-octopus/expose-the-octopus-web-portal-over-https.md) instead of HTTP. [Learn more about Chrome and the move toward a more secure web](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html).
1. You are hosting Octopus Server on the same domain as other applications. One of the other applications may be issuing a malformed cookie causing the Octopus authentication cookies to be misinterpreted. Move Octopus Server to a different domain to isolate it from the other applications, or stop the other applications from issuing malformed cookies. See [this GitHub Issue](https://github.com/OctopusDeploy/Issues/issues/2343) for more details.

## Octopus anti-forgery token

Octopus Server prevents Cross-Site Request Forgery (CSRF) using an anti-forgery token, which requires support for cookies. The following messages may indicate a problem with your browser, or your network, and the Octopus anti-forgery cookie:

`A required anti-forgery token was not supplied or was invalid.`

See our [detailed troubleshooting guide](/docs/administration/csrf-and-octopus-deploy.md) for solving problems with anti-forgery validation.

## Active Directory

If you are using Active Directory please refer to our [detailed troubleshooting guide](/docs/administration/authentication-providers/troubleshooting-active-directory-integration.md).

## External authentication providers

If you are using one of the other external authentication providers you may see a message like these:

- `User login failed: Missing State Hash Cookie.`
- `User login failed: Missing Nonce Hash Cookie.`

This can happen for quite a number of reasons:

1. Your web browser does not support cookies. Configure your browser to accept cookies from your Octopus Server. You may need to ask your systems administrator for help with this.
1. The time is incorrect on your computer, or your external authentication provider. This can cause your authentication cookies to expire and become unusable. Correct the time and configure your computers to automatically synchronize their time from a time server.
1. You are using Chrome and have not configured your external authentication provider to use HTTPS. Chrome has started to consider web sites served over `http://` as unsafe and will refuse to accept cookies from those unsafe sites. Configure your external authentication provider to use HTTPS instead of HTTP. [Learn more about Chrome and the move toward a more secure web](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html).

### Getting help from us {#support}

If none of these troubleshooting steps work, please get in contact with our [support team](https://octopus.com/support) and send along the following details (feel free to ignore points if they don't apply):
  a. Which browser and version are you using? (Help > About in your browser is the best place to get this information)
  b. Does the same thing happen with other browsers, like Internet Explorer, Google Chrome, Firefox?
  c. Does the same thing happen for other people/users?
  d. Does the same thing happen when you access Octopus Deploy over another network, like from home or over your cellular network?
  e. Does the same thing happen if you use InPrivate/Incognito mode in your browser?
  f. Does the same thing happen after clearing all browser data for the Octopus Server (including cookies, history, local data, stored credentials)?
  g. Have you used any other versions of Octopus Deploy in this browser before?
  h. Do you have other web applications hosted on the same server?
  i. Do you have other web applications hosted on the same domain? (for example: `octopus.mycompany.com` and `myapp.mycompany.com`?)
  j. Do you have any intermediary network devices (like proxies or web application firewalls) which may be stripping custom HTTP headers or cookies from your requests?
  k. Please [record the problem occurring in your web browser](/docs/support/record-a-problem-with-your-browser.md) and send the recording to us for analysis. Please record the following steps: Sing out of Octopus Deploy, sign back in again, and then try to do the action that fails.