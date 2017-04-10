---
title: Cross-site request forgery (CSRF) and Octopus Deploy
description: Details of using Octopus Deploy in a FIPS compliant environment.
position: 5
---

We take every reasonable effort to make Octopus Deploy secure against known vulnerabilities, mainly related to browser vulnerabilities. One such browser vulnerability is Cross-Site Request Forgery (CSRF).

## What is CSRF?

Using a CSRF attack a malicious actor could potentially simulate requests to the Octopus Server on behalf of an authenticated user. For more information about CSRF refer to the following:

- [Cross-Site Request Forgery according to OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))

## Does Octopus Deploy prevent CSRF attacks?

Yes. The Octopus HTTP API is protected from CSRF attacks out of the box by requiring an antiforgery token. If you are using any tools provided by Octopus Deploy, including the Web Portal, and Client SDK, this is all done for you automatically.

## Troubleshooting

If certain HTTP requests are not correctly formed you may see an error message like this either in your web browser or when trying to use the Octopus REST API directly:

`A required anti-forgery token was not supplied or was invalid.`

Octopus also logs a warning like this to your Octopus Server logs:

`It looks like we just prevented a cross-site request forgery (CSRF) attempt on your Octopus Server: The required anti-forgery token was not supplied or was invalid.`

### Using the Octopus Web Portal

If you see this kind of error message when using the Octopus Web Portal in your browser, please try the following steps:

1. Refresh the Octopus Web Portal in your browser (to make sure you have the latest JavaScript)
2. Sign out of the Octopus Web Portal
3. Sign back in to the Octopus Web Portal
4. If this doesn't work, please try clearing the cookies from your browser and trying again
5. If this doesn't work please get [ask us for help](#support) - see below

### Using the Octopus REST API with raw HTTP

If you use raw HTTP to access Octopus Deploy we recommend using an [API Key](/docs/how-to/how-to-create-an-api-key.md) to authenticate your requests. Learn about the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md) and [authenticating with the Octopus REST API](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Authentication).

### Getting help from us {#support}

If none of these troubleshooting steps work, please get in contact with our [support team](https://octopus.com/support) and send along the following details (feel free to ignore points if they don't apply):
  a. Which browser and version are you using? (Help > About in your browser is the best place to get this information)
  b. Does the same thing happen with other browsers, like Internet Explorer, Google Chrome, Firefox?
  c. Does the same thing happen for other people/users?
  d. Does the same thing happen when you access Octopus Deploy over another network, like from home or over your cellular network?
  e. Have you used any other versions of Octopus Deploy in this browser before?
  f. Do you have other web applications hosted on the same server?
  g. Do you have other web applications hosted on the same domain? (for example: octopus.mycompany.com and myapp.mycomany.com?)
  h. Please record an HTTP network trace using your browser developer tools or something like [Fiddler](http://www.telerik.com/fiddler). Please record the following steps: Logout, Login, then try to do the action that fails.