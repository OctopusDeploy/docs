---
title: Customising an Octopus Deploy server extension

---


:::hint
Server extensibility is available in Octopus Deploy 3.5 and later
:::


As part of the Octopus Deploy installation, a number of extensions are provided out-of-the-box.  All of these extensions are managed as open-source projects on GitHub.  They include:

- [UsernamePassword authentication](https://github.com/OctopusDeploy/UsernamePasswordAuthenticationProvider)
- [Active Directory authentication](https://github.com/OctopusDeploy/DirectoryServicesAuthenticationProvider)
- [Guest authentication](https://github.com/OctopusDeploy/GuestAuthenticationProvider)
- [OpenID Connect based authentication](https://github.com/OctopusDeploy/OpenIDConnectAuthenticationProviders) (e.g. Azure AD and GoogleApps)



One of the reasons behind open-sourcing these projects is to allow users to customise them if they need to.  For example, Active Directory configurations can vary dramatically and for some users it may make sense to modify parts of our implementation.

# Customising the code {#CustomisinganOctopusDeployserverextension-Customisingthecode}


The simplest option for customising the code is to fork the project in GitHub.  This will allow you to keep up to date with any changes we might make and you'll be able to submit PRs.

# Building the code {#CustomisinganOctopusDeployserverextension-Buildingthecode}


Included in the project repositories are the [Cake](http://cakebuild.net/) build scripts we use to build the extensions.  These are used to both compile the dlls and produce the NuGet packages that we use for distribution.  To use a customised extension, you only need the compiled dll.

# 'Installing' a custom extension {#CustomisinganOctopusDeployserverextension-&#39;Installing&#39;acustomextension}


Once you've compiled the dll, [installing it is as simple as putting it in the right folder](/docs/guides/server-extensibility/installing-a-custom-server-extension.md) and restarting the Octopus Deploy server.
