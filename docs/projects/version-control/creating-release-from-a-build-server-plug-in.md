---
title: Creating releases from a build server plugin on a version-controlled project
description: Examples of how to ensure that the right branch is used to create the release when using a build server plugin.
position: 45 
---

!include <build-server-plugin-version-control-fields>

Below are some examples of how to auto populate these fields using build parameters for common build servers.

## Azure DevOps
 
Azure DevOps stores information differently based on if the build is triggered by a branch push versus via a Pull Request (PR). You need to use a conditional statement to select the right variable. Here's a suggested method to do so.

For *Git Reference*, use
```
$[coalesce(variables['system.pullRequest.sourceBranch'], variables['build.sourceBranch'])]
```

For *Git Commit*, use
```
$[coalesce(variables['system.pullRequest.sourceCommitId'], variables['build.sourceVersion'])]
```

**Note:** this approach doesn't populate the commit details for manually triggered runs. It is recommended that you provide the values for both branch and commit in this case.

## Github Actions

Github Actions provides different event data based on if the build is triggered by a branch push versus via a Pull Request (PR). You need to use a conditional statement to select the right variable. Here's a suggested method to do so.

For *Git Reference*, use
```
${{ github.head_ref || github.ref }}
```

For *Git Commit*, use
```
${{ github.event.push.after || github.event.pull_request.head.sha }}
```

**Note:** this approach doesn't populate the commit details for manually triggered runs. It is recommended that you provide the values for both branch and commit in this case.

## TeamCity

TeamCity provides different data based on if the build is triggered by a branch push versus via a Pull Request (PR). There is no easy way to automate selecting the right one. Based on your process, we suggest using one of the following options.

### Build triggered by a branch push

 For *Git Reference*, use 
 ```
 %teamcity.build.branch%
 ```
 
 For *Git Commit*, you will need to know the name of your previous step of your build process as that value lives in a build parameter like this example -  `dep.CloudPlatform_Build.build.vcs.number`. 
 
 So the value used will likely look like this:

 ```
 %dep.<YOUR PREVIOUS STEP NAME>.build.vcs.number%
 ```

### Build triggered via a PR

For *Git Reference*, use 
```
%teamcity.pullRequest.source.branch%
```

For *Git Commit*, its the same. So the value used will likely look like this -
```
%dep.<YOUR PREVIOUS STEP NAME>.build.vcs.number%
```