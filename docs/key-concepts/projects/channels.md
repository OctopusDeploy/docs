---
title: Channels
position: 2
---


:::hint
Channels was released in Octopus Deploy version 3.2.
:::

:::success
The [Channels Walkthrough](https://octopus.com/blog/channels-walkthrough) covers all of these topics, and covers how to implement the most common scenarios that will benefit from Channels.
:::


Channels in Octopus Deploy will help you if you want to:

- [Manage multiple active versions of the same project](https://octopus.com/blog/channels-walkthrough#supporting-multiple-versions). For example, maintaining patch/hotfix releases for v1 whilst starting work on v2.
- [Change your deployment process without creating a barrier for production releases](https://octopus.com/blog/channels-walkthrough#supporting-multiple-versions). For example, adding a new step to your process, or modifying an existing step.
- [Deploy a hot-fix directly to Production](https://octopus.com/blog/channels-walkthrough#hotfix-deployments) where you would normal promote each release through a series of Environments.
- [Provide your customers with access to early builds of your project](https://octopus.com/blog/channels-walkthrough#early-access-programs). For example, when we are working on a new version of Octopus Deploy, we run an [Early Access Program](http://docs.octopusdeploy.com/display/ODEAP/Octopus+Deploy+EAP) to gather feedback.
- [Automatically deploy feature-branch builds to a test environment](https://octopus.com/blog/channels-walkthrough#feature-branch-deployments), sometimes called a Phoenix environment. For example, as soon as a developer commits code to a feature branch, you want that version of the project to be deployed into a sandbox test environment.
- [You use a branching strategy in your source code repository](/docs/patterns/branching.md). For example, you might be using [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) or another source code branching strategy.



Each Release you create in Octopus Deploy is placed into a Channel, and Releases in each Channel can be treated differently. For each Channel you can define:

- Which [Lifecycle](/docs/key-concepts/lifecycles.md) to use for promoting Releases: for example, feature releases may be promoted through the testing environments, while hot-fix releases may go directly to production.
- Which [Deployment Process](/docs/deploying-applications.md) to use when deploying Releases: for example, steps can be enabled for specific channels.
- Which [Variables](/docs/deploying-applications/variables.md) to use: Variables can be scoped to channels.
- Which [Tenants](/docs/key-concepts/tenants.md) should be included when deploying Releases: for example, you can ensure only Releases from certain Channels are deployed to certain Tenants



Channels can also help you to create consistent Releases by specifying Version Rules that apply to each Package.


- Managing Channels
 - Defining Version Rules
  - Steps
  - Version Range
  - Tags
- Using Channels
 - Controlling Deployment Lifecycle
 - Modifying Deployment Process
 - Variables
 - Deploying to Tenants
- Creating Releases
 - Manually Creating Releases
 - Using Build Server Extensions or Octo.exe
 - Automatic Release Creation

## Managing Channels


Channels are managed per project.  Select the **Channels** menu item from the Project page.


![](/docs/images/3048999/3278456.png)


Click **Create Channel** to create a new Channel.


![](/docs/images/3048999/3278457.png)


The Channel must have a unique name per project.


You can associate a Lifecycle with the Channel, or it may inherit the default from the Project.

### Defining Version Rules


Version rules assist in selecting the correct versions of packages for the Channel.  They are only used when creating a release, either manually or via [Automatic Release Creation](/docs/deploying-applications/automatic-release-creation.md).

:::hint
**SemVer works best**
Version Rules will work best when you follow [Semantic Versioning (SemVer)](http://semver.org) for your versioning strategy. From Octopus 3.4 onward you can use [SemVer 2.0.0](http://semver.org/spec/v2.0.0.html). For earlier versions of Octopus please use [SemVer 1.0.0](http://semver.org/spec/v1.0.0.html).
:::





To add version rules to a Channel, click **Add version rule** on the Channel page.


![](/docs/images/3048999/3278458.png)

#### Steps


The steps selected for a specific rule define which packages will be filtered on the *Create Release* page based on the following provided range and tag information. Note that either a version range or pre-release tag regex must be provided for a valid version rule.

#### Version Range


A provided version range based on the [NuGet versioning syntax](http://g.octopushq.com/NuGetVersioning) can be applied to the release creation package selection.

:::success
From Octopus 3.4 onward you can use the full semantic version as part of your version range specification. For example: `[2.0.0-alpha.1,2.0.0)` will match all 2.0.0 pre-releases (where the pre-release component is `&gt; alpha.1`), and will exclude the 2.0.0 release.


![](/docs/images/3048999/5865686.png)
:::

#### Tags


Following the standard 2.0.0 [semver syntax](http://semver.org/), a pre-release tag is the alpha numeric text that can appear after the standard *major.minor.patch* pattern immediately following a hyphen. Providing a regex pattern for this field allows the channel to filter packages based on their tag in a very flexible manner. Some examples are.

| **Pattern** | **Description** | **Example use-case** |
| --- | --- | --- |
| .\* | matches any pre-release | Enforce inability to push to production by specifying lifecycle that stops at staging |
| ^$ | matches any non pre-release | Ensure a script step only runs for non pre-release packages |
| beta.\* | matches pre-releases like beta and beta0003 | Deploy pre-releases using a Lifecycle that goes directly to a pre-release Environment |
| ^(?!beta).+ | matches pre-releases that don't start with beta | Consider anything other than 'beta' to be a feature branch package so you can provision short-term infrastructure and deploy to it |
| bugfix- | matches any with '*bugfix-*' prefix (e.g. *bugfix-syscrash)* | Bypass Dev & UAT environments when urgent bug fixes are made to the mainline branch and to be released straight from Staging to Production |

## Using Channels


Once a project has more than one Channel, there a number of places they may be used.

### Controlling Deployment Lifecycle


Each Channel defines which Lifecycle to use when promoting Releases between Environments. You can choose a Lifecycle for each Channel, or use the default Lifecycle defined by the Project.


![](/docs/images/3048999/5865685.png)

### Modifying Deployment Process


Deployment Steps can be restricted to only run on specific Channels.


![](/docs/images/3048999/3278459.png)

### Variables


Variables may be scoped to specific Channels.


![](/docs/images/3048999/3278460.png)

### Deploying to Tenants


You can control which Releases will be deployed to certain Tenants using Channels. In this example, Releases in this Channel will only be deployed to Tenants tagged with `Early access program/2.x Beta`.


![](/docs/images/3048999/5865683.png)

## Creating Releases


Every Release in Octopus Deploy must be placed into a Channel. Wherever possible Octopus will choose the best possible Channel for your Release, or you can manually select a Channel for your Release.

### Manually Creating Releases


When you are creating a Release, you can select a Channel.


![](/docs/images/3048999/3278463.png)


Selecting the Channel will cause the Release to use the Lifecycle associated with the Channel (or the Project default, if the Channel does not have a Lifecycle).  It will also cause the Deployment Process and Variables to be modified as specified above.


The package list allows you to select the version of each package involved in the deployment.  The *latest* column displays the latest packages that match the version rules defined for the Channel (see [version rules](/docs/key-concepts/projects/channels.md) for more information).

### Using Build Server Extensions or Octo.exe


When using one of the [build server extensions](http://docs.octopusdeploy.com/display/OD2/API+and+Integration) or [octo.exe](/docs/api-and-integration/octo.exe-command-line/creating-releases.md) to create releases, you can either let Octopus automatically choose the correct Channel for your Release (this is the default behaviour), or choose a specific Channel yourself.

### Automatic Release Creation


When enabling [Automatic Release Creation](/docs/deploying-applications/automatic-release-creation.md) for your project, you are required to select a Channel (if the project has more than one).


![](/docs/images/3048999/3278462.png)


Any releases created automatically will use the configured channel.  Additionally, any Version Rules configured for the Channel will be used to decide whether a release is automatically created.


For example, if version 3.1.0 of a package Acme.Web is pushed to the Octopus internal NuGet repository, and the Channel selected for Automatic Release Creation has a Version Rule as pictured below,


then no release will be created.


![](/docs/images/3048999/3278461.png)
