---
title: Release Notes 
description: Enrich your releases with notes 
position: 5 
---

When creating a release, notes may be supplied.

![Editing release notes](release-notes-edit.png)

![Viewing release notes](release-notes-view.png)

## Using Variables in Release Notes

Release notes may contain variable expressions. These will be evaluated and substituted when the release is created.

Only variables in scope when the release is created will be available for use in release notes. Variables scoped to environments, tenants, target roles, or targets will _not_ be available as these scopes apply only during deployments.   

[Build information](/docs/packaging-applications/build-servers/build-information.md) associated with packages in the release may also be used in release notes.

## Accessing Release Notes During a Deployment

The release notes may be accessed during a deployment using the [Octopus.Release.Notes](/docs/deployment-process/system-variables.md#Systemvariables-Release) variable.  

Release notes are also rolled up into the [deployment notes](deployment-notes.md). 

## Release Notes Templates {#Release-Notes-Templates}

A release notes template can be configured in {{Project,Settings,Release Notes Template}}

A release notes template is a convenient way to keep release notes consistent and avoid entering the same text repeatedly.   
