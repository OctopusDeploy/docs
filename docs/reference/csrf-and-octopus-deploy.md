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

### Using the Octopus Web Portal

Please try the following steps:

1. Refresh the Octopus Web Portal in your browser (to make sure you have the latest JavaScript)
2. Sign out of the Octopus Web Portal
3. Sign back in to the Octopus Web Portal
4. If this doesn't work, please try clearing the cookies from your browser and trying again
5. If this doesn't work please get in contact with our [support team](https://octopus.com/support)

### Using the Octopus REST API with raw HTTP

If you use raw HTTP to access Octopus Deploy we recommend using an [API Key](/docs/how-to/how-to-create-an-api-key.md) to authenticate your requests. Learn about the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md) and [authenticating with the Octopus REST API](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Authentication).

