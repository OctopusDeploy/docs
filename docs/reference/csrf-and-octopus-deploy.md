---
title: Cross-Site Request Forgery (CSRF) and Octopus Deploy
description: Octopus Server actively prevents Cross-Site Request Forgery (CSRF) using anti-forgery tokens.
position: 5
---

We take every reasonable effort to make Octopus Deploy secure against known vulnerabilities, mainly related to browser vulnerabilities. One such browser vulnerability is Cross-Site Request Forgery (CSRF).

## What is CSRF?

Using a CSRF attack a malicious actor could potentially simulate requests to the Octopus Server on behalf of an authenticated user. For more information about CSRF refer to the following:

- [Cross-Site Request Forgery according to OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))

## Does Octopus Deploy prevent CSRF attacks?

Yes. The Octopus HTTP API is protected from CSRF attacks out of the box by requiring an anti-forgery token. If you are using any tools provided by Octopus Deploy, including the Web Portal, and Client SDK, this is all done for you automatically.

## Troubleshooting

If certain HTTP requests are not correctly formed you may see an error message like this either in your web browser or when trying to use the Octopus REST API directly:

`A required anti-forgery token was not supplied or was invalid.`

Octopus also logs a warning like this to your Octopus Server logs:

`It looks like we just prevented a cross-site request forgery (CSRF) attempt on your Octopus Server: The required anti-forgery token was not supplied or was invalid.`

### Using the Octopus Web Portal

If you see this kind of error message when using the Octopus Web Portal in your browser, please try the following steps:

1. Refresh the Octopus Web Portal in your browser (to make sure you have the latest JavaScript)
1. Sign out of the Octopus Web Portal
1. Sign back in to the Octopus Web Portal
1. If this doesn't work, please try clearing the cookies from your browser and trying again
1. After signing in, you should see two cookies from the Octopus Server - the authentication cookie and the anti-forgery cookie:
  a. If both cookies are missing your browser may be blocking cookies altogether, or blocking cookies from your Octopus Server
  b. If only the anti-forgery cookie is missing, you may have a network device (like a firewall or proxy) which is blocking cookies that are not `HttpOnly` - the Octopus JavaScript client requires access to the anti-forgery cookie. Please configure the network device to allow the anti-forgery cookie through to the browser.
  c. The time may be incorrect on either your machine, or the server hosting the Octopus Server.
1. If this doesn't work please get [ask us for help](#support) - see below

### Using the Octopus REST API with raw HTTP

If you use raw HTTP to access Octopus Deploy we recommend using an [API Key](/docs/how-to/how-to-create-an-api-key.md) to authenticate your requests. Learn about the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md) and [authenticating with the Octopus REST API](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Authentication).

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
  i. Do you have other web applications hosted on the same domain? (for example: octopus.mycompany.com and myapp.mycomany.com?)
  j. Do you have any intermediary network devices (like proxies or web application firewalls) which may be stripping custom HTTP headers or cookies from your requests?
  k. Please [record the problem occurring in your web browser](/docs/how-to/record-a-problem-with-your-browser.md) and send the recording to us for analysis. Please record the following steps: Sing out of Octopus Deploy, sign back in again, and then try to do the action that fails.