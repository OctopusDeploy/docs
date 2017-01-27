---
title: Building an Authentication Provider
---

Server Extensibility was new to Octopus Deploy in version 3.5, and is still being actively evolved as we learn more about how it's being used and what customer want to extend.  The documentation in this section covers the implementation as of v2.0.\* of the Extensibility packages.

## Forms vs External {#BuildinganAuthenticationProvider-FormsvsExternal}

There are two key types of Authentication Providers, those that use Forms (Basic) authentication and those that are external to Octopus Deploy.  The main distinction between the two is whether the Octopus Deploy UI is responsible for collecting and username and password or whether control is passed to an external site to handle that and return a token representing the authenticated user (e.g. OpenID Connect providers).

## Understanding paths {#BuildinganAuthenticationProvider-Understandingpaths}

When building extensions there are a couple of concepts that are important to know about.  Path resolution is one of those things.

In the code for the built-in extensions, you would will see "~" being prefixed to things like the paths being returned in the Links collection and the CSS and Javascript file paths.  These are used in the UI code when determining the full path to the API, which may include a virtual directory path.  You will also see examples of this being used in our extensions' Angular modules to determine paths for images that are being served as static content out of the extension.  This latter scenario warrants some explanation, because as an extension author, it may not be necessary for you to handle this the same way our extensions do.

The reason we do it is to support a specific development scenario that we use, which involves running the server in one process (using Nancy) and hosting the UI in a separate process (NodeJS with gulp watch).  In this scenario, we have to distinguish between content being hosted by NodeJS (using standard relative paths) and content being hosted by the extensions (which requires an absolute path based on the Nancy API location).  In the deployed version, there is only one server process in play, so "~/images" would resolve to the same as "images", and as such in a typical extension development scenario you wouldn't need to be concerned with using the "~/".

## AngularJS {#BuildinganAuthenticationProvider-AngularJS}

Octopus Deploy's server UI is currently implemented using AngularJS.  The UI provided by any extensions is also hosted in an Angular directive, so should you want to author your extension UI as an Angular module with directives, controllers etc you can.  This is not mandatory though, you can choose to use vanilla JS if you want to.

As of Server Extensibility v2.0, the out of the box Server Extensions for [OpenID Connect](https://github.com/OctopusDeploy/OpenIDConnectAuthenticationProviders) and [Directory Services](https://github.com/OctopusDeploy/DirectoryServicesAuthenticationProvider) both use Angular modules for their UI.

Learn more about [authoring a Forms based authentication provider](/docs/guides/server-extensibility/building-an-authentication-provider/building-a-forms-based-authentication-provider.md).

Learn more about [authoring an External provider](/docs/guides/server-extensibility/building-an-authentication-provider/building-an-external-authentication-provider.md).
