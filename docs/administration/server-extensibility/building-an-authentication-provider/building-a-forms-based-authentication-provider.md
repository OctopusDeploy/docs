---
title: Building a forms based authentication provider
description: The step involved in building a Forms based Authentication Provider.
---

:::warning
Server extensibility is deprecated, and no longer maintained.

Some of you may have implemented an extension for Octopus Server, we would be interested in understanding better your requirements so that we can work towards resolving missing capabilities. Get in touch with us via support@octopus.com to let us know if this will affect your instance.
:::

All Forms based providers share the Username/Password/Remember Me UI shipping with the Octopus Deploy UI.  To participate as a Forms based authentication provider you must:

- Host an API endpoint that:
    * expects a Http POST of a LoginCommand object.
    * returns a JSON representation of an IUser and a cookie, as returned by a call to IAuthCookieCreator.CreateAuthCookie.
- Implement the IAuthenticationProvider interface and have:
    * GetAuthenticationProviderElement return an element with:
        * a Name.
        * FormsLoginEnabled = true.
        * Links containing path to the API from above.
    * GetAuthenticationUrls return the same API url (which is used to add APIs to an allow list when in MaintenanceMode etc).
- Implement whatever configuration storage you require.

The Octopus Deploy [UsernamePasswordAuthenticaionProvider](https://github.com/OctopusDeploy/UsernamePasswordAuthenticationProvider) on GitHub provides a good reference point.
