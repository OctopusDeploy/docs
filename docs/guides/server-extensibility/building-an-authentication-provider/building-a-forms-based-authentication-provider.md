---
title: Building a Forms based Authentication Provider

---


All Forms based providers share the Username/Password/Remember Me UI shipping with the Octopus Deploy UI.  To participate as a Forms based authentication provider you must:

- Host an API endpoint that 
 - expects a Http POST of a LoginCommand object
 - returns a Json representation of an IUser and a cookie, as returned by a call to IAuthCookieCreator.CreateAuthCookie
- Implement the IAuthenticationProvider interface and have 
 - GetAuthenticationProviderElement return an element with
  - a Name
  - FormsLoginEnabled = true
  - Links containing path to the API from above
 - GetAuthenticationUrls return the same API url (which is used to whitelisting APIs when in MaintenanceMode etc).
- Implement whatever configuration storage you require.






The Octopus Deploy [UsernamePasswordAuthenticaionProvider](https://github.com/OctopusDeploy/UsernamePasswordAuthenticationProvider) on GitHub provides a good reference point.
