---
title: Building an External authentication provider
---

When authenticating using an external Identity Provider (IP), it is that provider's responsibility to provide the UI for interacting with the user in order to authenticate them.  The Octopus Deploy server extension's responsibility is to provide a UI and API required to initiate the interaction with the IP, handle the token it returns, and route the user back to the Octopus Deploy UI.

Exactly how that is achieved depends on the IP, and the Octopus Deploy [OpenIDConnectAuthenticationProvider](https://github.com/OctopusDeploy/OpenIDConnectAuthenticationProviders) provides a good reference point.

In the OpenIDConnectAuthenticationProvider, the directive returned by the provider will be hosted in a custom directive in the Octopus Deploy UI.  That directive has the follow values that you can bind to

- provider: a javascript object representation of the element returned by the providers IAuthenticationProvider.GetAuthenticationProviderElement method
- shouldAutoLogin: a boolean that is true if the server UI has determined that there is only 1 non-Forms based provider enabled and autoLoginEnabled is set to true for the server
- isSubmitting: a context used to control the busy indicator.  Use the .promise() method when calling to server APIs.
- handleSignInError: a context used to return error information from the API calls to the host UI.  Pass this value as the error parameter to .promise().then()

You may also take controller dependencies to some infrastructure provided by the Octopus Deploy app.  Some examples:

- octopusClient: the core object used for communication with the server APIs.  It provides methods like:
 - get(path,args), post(path, resource), put(path, resource), del(path, resource, args)
 - resolve (which resolves the "~/" to the API location, and is called automatically by the methods mentioned above)
- $rootScope: Root scope from the Angular app, which contains the following of interest

 - redirectAfterExternalLoginTo: the URL to redirect the user to if the authentication is successful.  Setting this is handled by the App and is used for supporting Deep Links (used to either navigate in from a link the user has clicked or when the session has timed out and the user gets redirected to the sign in page, so they'll be returned to the page they were previously on).
