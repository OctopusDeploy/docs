---
title: IIS Websites and Application Pools
description: Octopus has built-in support for configuring IIS Web Sites, Applications and Virtual Directories.
position: 20
---

!include <iis-feature>

## IIS configuration in action {#IISWebsitesandApplicationPools-IISconfigurationinaction}

This five minute video demonstrates how Octopus can be used to deploy an ASP.NET MVC web application to remote IIS servers.

<iframe src="//fast.wistia.net/embed/iframe/7wfdk4vtge" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="360" style="margin: 30px"></iframe>

## How to take your website offline during deployment

A IIS Website can be taken offline by placing a `app_offline.htm` file into the root directory of the website. The contents of
that file will be shown to anyone accessing the site. This is useful if you do not want to users to access the site while
the deployment is being performed. It recycles the App Pool, releasing any file locks the site may have.

This can be done by including an `app_online.htm` file in your website and then renaming it to `app_offline.htm` at the
start of the deployment. This can be done via a script or the `IIS - Change App Offline` step in the
[community library](/docs/deployment-process/steps/community-step-templates.md).
