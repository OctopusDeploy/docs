---
title: Branching
description: Implementing different branching strategies with Octopus Deploy.
position: 4
---

This section describes how different branching strategies can be modeled in Octopus Deploy.

## Branching strategies {#Branching-Branchingstrategies}

When thinking about branching and Octopus, keep this rule in mind:

> Octopus doesn't care about branches. It cares about NuGet packages.

Your build server cares about source code and branches, and uses them to compile and [package your application](/docs/packaging-applications/index.md).

Octopus, on the other hand, only sees packages. It doesn't particularly care which branch they came from, or how they were built, or which source control system you used.

The section below describes some common branching strategies, and what they mean in terms of NuGet packages and releases in Octopus.

### No branches {#Branching-Nobranches}

:::hint
**Development note**
Channels don't do anything to help with this scenario, but we do discuss this scenario in the [Channels Walk-through](https://octopus.com/blog/channels-walk-through#safer-standard-release-promotion) as "standard release promotion".
:::

The simplest branching workflow is, of course, no branches - all developers work directly on trunk or master. For small projects with few developers, and when the project isn't really in "production" yet, this strategy can work well.

![](images/3278438.png)

Builds from this single branch will produce a NuGet package, and that package goes into a release which is deployed by Octopus.

![](images/3278468.png)

### Release branches {#Branching-Releasebranches}

:::hint
**Development note**
Channels don't do anything to help with this scenario.
:::

Sometimes developers work on new features that aren't quite ready to ship, whilst also maintaining a current production release. Bugs can be fixed on the release branch, and deployed, without needing to also ship the half-baked features.

![](images/3278439.png)

So long as one release branch never overlaps another, from an Octopus point of view, the process is similar to the "no branches" scenario above - new NuGet packages are built, and those packages go into a release, which is deployed. Octopus doesn't care that they came from a branch; to Octopus, there's just a stream of new, incrementing package versions.

### Multiple active release branches {#Branching-Multipleactivereleasebranches}

:::hint
**Development note**
[Channels](/docs/deployment-process/channels/index.md) can help with this strategy as discussed in the [Channels Walk-through: Supporting multiple versions](https://octopus.com/blog/channels-walk-through#supporting-multiple-versions). If your project has 5 packages, when you go to the Release creation page, it might show all 3.x versions of the packages when you want to make a 2.x version, since it sorts by version numbers. The [original UserVoice suggestion for this feature](https://octopusdeploy.uservoice.com/forums/170787-general/suggestions/3480536-branch-support-for-deploying-older-app-versions) was simply to make this page a little more user friendly.
:::

Multiple release branches may be supported over a period of time. For example, you may have customers who are using your 2.x versions of your software in production, and early adopters testing your 3.x versions while you work to make it stable. You'll need to fix bugs in the 2.x version as well as the 3.x version, and deploy them both.

![](images/3278440.png)

To prevent [retention policies](/docs/administration/retention-policies/index.md) for one channel from impacting deployments for another channel, version `3.12.2` introduces the `Discrete Channel Releases` flag at under `Deployment Target settings` on the **{{Project,Process}}** page. Enabling this feature will also ensure that your project overview dashboard correctly shows which releases are current for each environment _in each channel_. Without this set, the default behavior is for releases across channels to supersede each other (for example, in a hotfix scenario where the `3.2.2-bugfix` is expected to override the `3.2.2` release, allowing `3.2.2` to be considered for retention policy cleanup).

 ![Discrete channel release](images/discrete-channel-release.png)

Modeling this in Octopus is a little more complicated than the scenarios above, but still easy to achieve. If the only thing that changes between branches is the NuGet package version numbers, and you create releases infrequently, then you can simply choose the correct package versions when creating a release via the release creation page:

![](images/3278469.png)

If you plan to create many releases from both branches, or your deployment process is different between branches, then you will need to use channels. Channels are a feature in Octopus that lets you model differences in releases:

![](images/3278470.png)

In this example, packages that start with 2.x go to the "Stable" channel, while packages that start with 3.x go to the "Early Adopter" channel.

:::hint
**Tip: Channels aren't branches**
When designing channels in Octopus, don't think about channels as another name for branches:

- **Branches** can be short lived and tend to get merged, and model the way code changes in the system.
- **Channels** are often long lived, and model your release process.

For example, [Google Chrome have four different channels](https://www.chromium.org/getting-involved/dev-channel) (Stable, Beta, Dev, and Canary). Their channels are designed around user's tolerance for bleeding edge features vs. stability. Underneath, they may have many release branches contributing to those channels. You can read about implementing [early-access programs in the Channels Walk-through](https://octopus.com/blog/channels-walk-through#early-access-programs).

It's important to realize that **branches will map to different channels over time**. For example, right now, packages from the `release/v2` branch might map to your "Stable" channel in Octopus, while packages from `release/v3` go to your "Early Adopter" channel.

Eventually, `release/v3` will become more and more stable, and packages from it will eventually go to your Stable channel, while `release/v4` packages will begin to go to your Early Adopter channel.
:::

### Feature branches {#Branching-Featurebranches}

:::hint
**Development note**
Again, channels make creating releases a little easier here, but users can do feature branching without channels too. We also discuss [feature branches in the Channels Walk-through](https://octopus.com/blog/channels-walk-through#feature-branch-deployments).
:::

Feature branches are usually short lived, and allow developers to work on a new feature in isolation. When the feature is complete, it is merged back to trunk/master. Often, feature branches are not deployed, and so don't need to be mapped in Octopus.

![](images/3278442.png)

If feature branches do need to be deployed, then you can create NuGet packages from them, and then release them with Octopus as per normal. To keep feature branch packages separate from release-ready packages, [we recommend using SemVer tags](https://docs.nuget.org/create/versioning#really-brief-introduction-to-semver) in the NuGet package version. You should be able to [configure your build server to generate version numbers based on the feature branch](https://octopus.com/blog/teamcity-version-numbers-based-on-branches).

![](images/3278443.png)

Again, channels can be used to make it easier to create releases for feature branches:

![](images/3278471.png)

### Environment branches {#Branching-Environmentbranches}

:::hint
**Development note**
Channels don't do anything to help with this scenario.
:::

A final branching strategy that we see is to use a branch per environment that gets deployed to. Code is promoted from one environment to another by merging code between branches.

![](images/3278444.png)

We do not like or recommend this strategy, as it violates the principle of [Build your Binaries Once](http://octopus.com/blog/build-your-binaries-once).

- The code that will eventually run in production may not match 100% the code run during testing.
- It's easy for a merge to go wrong and result in different code than you expected running in production.
- Packages have to be rebuilt, and different dependencies might be used.

You can make this work in Octopus, by creating a package for each environment and pushing them to environment-specific [feeds](/docs/packaging-applications/package-repositories/index.md), and then binding the NuGet feed selector in your package steps to an environment-scoped variable:

However, on the whole, this isn't a scenario we've set out to support in Octopus, and we don't believe it's a good idea in general.

## Other considerations {#Branching-Otherconsiderations}

The above section describes common branching strategies and how they map to NuGet packages, releases and channels in Octopus. However, depending on your release process, there may be other things to consider. Below are some issues that often come up in relation to branching and Octopus.

### multiple branches can be "currently deployed" at the same time {#Branching-Multiplebranchescanbe&quot;currentlydeployed&quot;atthesametime}

Normally in Octopus, a single release for a project is deployed to a single environment at a time - for example, only one release is "currently" in Production. When you have multiple active release branches, or sometimes even feature branches, it might be that you actually have more than one "current" release.

For example:

- The stable channel is deployed to the same web servers as the Early Adopter channel, but each goes to a different IIS website.
- The stable channel and Early Adopter channels go to different web servers.
- Each feature branch goes to its own virtual directory.

Your dashboard in Octopus should reflect this reality by displaying each channel individually:

![](images/3278472.png)

:::hint
**Development note**
In [the RFC post](https://octopus.com/blog/rfc-branching), we never mentioned this, but it's something we've since discussed a few times and always assumed it would be part of release channels. That said, I'm considering whether we should ship channels without this feature. The Project Overview could still show different channels easily (since each release belongs to a channel), but the global dashboard might not be able to. We can see if there's a big demand for this feature.
:::

### My branches are very different, and i need my deployment process to work differently between them {#Branching-Mybranchesareverydifferent,andIneedmydeploymentprocesstoworkdifferentlybetweenthem}

:::hint
**Development note**
This scenario is why we allow scoping steps and variables to a channel; currently everyone clones projects, and it's hard to maintain.
:::

Sometimes a new branch might introduce a new component that needs to be deployed, which doesn't exist in the old branch. If you use channels, you can scope deployment steps and variables to channels to support this.

For example, the Rate Service package was added as part of v3, so currently only applies to the Early Adopter channel:

![](images/3278473.png)

Likewise, it has variables that only apply on Early Adopter:

![](images/3278474.png)

For more advanced uses, you may need to clone your project.

### We sometimes need to make hotfixes that are deployed straight to staging/production {#Branching-Wesometimesneedtomakehotfixesthataredeployedstraighttostaging/production}

:::hint
**Development note**
With Channels you can define which Lifecycle each Channel will use for promoting Releases. We discuss [hotfix deployments in the Channels Walk-through](https://octopus.com/blog/channels-walk-through#hotfix-deployments).
:::

Hotfixes are a special kind of release branch, but typically have a shorter lifecycle - they may need to go directly to production to fix a critical issue, and might skip certain deployment steps.

Again, channels can handle this by creating a Hotfix channel, and assigning the Hotfix channel a different lifecycle:

![](images/3278475.png)

Likewise, steps can be defined that apply to the Stable channel, but not to the Hotfix channel:

When releases are created for the Hotfix channel, they can then be deployed straight to production:

![](images/3278476.png)

While stable releases still follow the usual testing lifecycle:

![](images/3278477.png)

### We need to deploy different components depending on whether it's a "full" release or a "partial" release {#Branching-Weneedtodeploydifferentcomponentsdependingonwhetherit&#39;sa&quot;full&quot;releaseora&quot;partial&quot;release}

:::hint
**Development note**
This scenario often comes up: we have a micro-service architecture with 50 different packages. Sometimes we deploy a few components, sometimes we deploy them all, sometimes just one.

The only way to support that currently is with cloning, or skipping steps each deployment which is very tedious.
:::

You might have a large project with many components. Sometimes you only need to deploy a single component, while other times you may need to deploy all components together.

This can be modeled by creating a channel per component, plus a channel for a release of all components.

![](images/3278478.png)

Steps can then be scoped to their individual channel as well as the major release channel:

![](images/3278479.png)

When creating the release, you can then choose whether the release is for an individual component or all components:

![](images/3278480.png)

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).