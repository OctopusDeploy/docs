---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Branching
description: Implementing different branching strategies with Octopus Deploy.
navOrder: 60
---

This section describes how different branching strategies can be modeled in Octopus Deploy.

## Branching strategies {#Branching-Branchingstrategies}

When thinking about branching and Octopus, keep this rule in mind:

> Octopus doesn't care about branches. It cares about NuGet packages.

Your build server cares about source code and branches, and uses them to compile and [package your application](/docs/packaging-applications).

Octopus, on the other hand, only sees packages. It doesn't particularly care which branch they came from, or how they were built, or which source control system you used.

The section below describes some common branching strategies, and what they mean in terms of NuGet packages and releases in Octopus.

### No branches {#Branching-Nobranches}

The simplest branching workflow is, of course, no branches - all developers work directly on `trunk` or the `main` (default) branch. For small projects with few developers, and when the project isn't really in "production" yet, this strategy can work well.

:::figure
![](/docs/deployments/patterns/images/3278438.png "width=500")
:::

Builds from this single branch will produce a NuGet package, and that package goes into a release which is deployed by Octopus.

:::figure
![](/docs/deployments/patterns/images/3278468.png "width=500")
:::

### Release branches {#Branching-Releasebranches}

Sometimes developers work on new features that aren't quite ready to ship, whilst also maintaining a current production release. Bugs can be fixed on the release branch, and deployed, without needing to also ship the half-baked features.

:::figure
![](/docs/deployments/patterns/images/3278439.png "width=500")
:::

So long as one release branch never overlaps another, from an Octopus point of view, the process is similar to the "no branches" scenario above - new NuGet packages are built, and those packages go into a release, which is deployed. Octopus doesn't care that they came from a branch; to Octopus, there's just a stream of new, incrementing package versions.

### Multiple active release branches {#Branching-Multipleactivereleasebranches}

Multiple release branches may be supported over a period of time. For example, you may have customers who are using your 2.x versions of your software in production, and early adopters testing your 3.x versions while you work to make it stable. You'll need to fix bugs in the 2.x version as well as the 3.x version, and deploy them both.

:::figure
![](/docs/deployments/patterns/images/3278440.png "width=500")
:::

To prevent [retention policies](/docs/administration/retention-policies) for one channel from impacting deployments for another channel, version `3.12.2` introduces the [Discrete Channel Releases setting](/docs/releases/channels/#discrete-channel-releases). Enabling this feature will also ensure that your project overview dashboard correctly shows which releases are current for each environment _in each channel_. Without this set, the default behavior is for releases across channels to supersede each other (for example, in a hotfix scenario where the `3.2.2-bugfix` is expected to override the `3.2.2` release, allowing `3.2.2` to be considered for retention policy cleanup).

 ![Discrete channel release](/docs/deployments/patterns/images/discrete-channel-release.png "width=500")

Modeling this in Octopus is a little more complicated than the scenarios above, but still easy to achieve. If the only thing that changes between branches is the NuGet package version numbers, and you create releases infrequently, then you can simply choose the correct package versions when creating a release via the release creation page:

:::figure
![](/docs/deployments/patterns/images/3278469.png "width=500")
:::

If you plan to create many releases from both branches, or your deployment process is different between branches, then you will need to use channels. [Channels](/docs/releases/channels) are a feature in Octopus that lets you model differences in releases:

:::figure
![](/docs/deployments/patterns/images/3278470.png "width=500")
:::

In this example, packages that start with 2.x go to the "Stable" channel, while packages that start with 3.x go to the "Early Adopter" channel.

:::div{.hint}
**Tip: Channels aren't branches**
When designing channels in Octopus, don't think about channels as another name for branches:

- **Branches** can be short lived and tend to get merged, and model the way code changes in the system.
- **Channels** are often long lived, and model your release process.

For example, [Google Chrome have four different channels](https://www.chromium.org/getting-involved/dev-channel) (Stable, Beta, Dev, and Canary). Their channels are designed around user's tolerance for bleeding edge features vs. stability. Underneath, they may have many release branches contributing to those channels. You can read about implementing [early-access programs in the Channels Walk-through](https://octopus.com/blog/channels-walkthrough#early-access-programs).

It's important to realize that **branches will map to different channels over time**. For example, right now, packages from the `release/v2` branch might map to your "Stable" channel in Octopus, while packages from `release/v3` go to your "Early Adopter" channel.

Eventually, `release/v3` will become more and more stable, and packages from it will eventually go to your Stable channel, while `release/v4` packages will begin to go to your Early Adopter channel.
:::

### Feature branches {#Branching-Featurebranches}

Feature branches are usually short lived, and allow developers to work on a new feature in isolation. When the feature is complete, it is merged back to the `trunk` or the `main` (default) branch. Often, feature branches are not deployed, and so don't need to be mapped in Octopus.

:::figure
![](/docs/deployments/patterns/images/3278442.png "width=500")
:::

If feature branches do need to be deployed, then you can create NuGet packages from them, and then release them with Octopus as per normal. To keep feature branch packages separate from release-ready packages, [we recommend using SemVer tags](https://docs.nuget.org/create/versioning#really-brief-introduction-to-semver) in the NuGet package version. You should be able to [configure your build server to generate version numbers based on the feature branch](https://octopus.com/blog/teamcity-version-numbers-based-on-branches).

:::figure
![](/docs/deployments/patterns/images/3278443.png "width=500")
:::

Again, channels can be used to make it easier to create releases for feature branches:

:::figure
![](/docs/deployments/patterns/images/3278471.png "width=500")
:::

### Environment branches {#Branching-Environmentbranches}

A final branching strategy that we see is to use a branch per environment that gets deployed to. Code is promoted from one environment to another by merging code between branches.

:::figure
![](/docs/deployments/patterns/images/3278444.png "width=500")
:::

We do not like or recommend this strategy, as it violates the principle of [Build your Binaries Once](http://octopus.com/blog/build-your-binaries-once).

- The code that will eventually run in production may not match 100% the code run during testing.
- It's easy for a merge to go wrong and result in different code than you expected running in production.
- Packages have to be rebuilt, and different dependencies might be used.

You can make this work in Octopus, by creating a package for each environment and pushing them to environment-specific [feeds](/docs/packaging-applications/package-repositories), and then binding the NuGet feed selector in your package steps to an environment-scoped variable:

However, on the whole, this isn't a scenario we've set out to support in Octopus, and we don't believe it's a good idea in general.

## Other considerations {#Branching-Otherconsiderations}

The above section describes common branching strategies and how they map to NuGet packages, releases and channels in Octopus. However, depending on your release process, there may be other things to consider. Below are some issues that often come up in relation to branching and Octopus.

### multiple branches can be "currently deployed" at the same time {#Branching-Multiplebranchescanbe&quot;currentlydeployed&quot;atthesametime}

Normally in Octopus, a single release for a project is deployed to a single environment at a time - for example, only one release is "currently" in Production. When you have multiple active release branches, or sometimes even feature branches, it might be that you actually have more than one "current" release.

For example:

- The stable channel is deployed to the same web servers as the Early Adopter channel, but each goes to a different IIS website.
- The stable channel and Early Adopter channels go to different web servers.
- Each feature branch goes to its own virtual directory.

Your dashboard in Octopus should reflect this reality by displaying each channel individually:

:::figure
![](/docs/deployments/patterns/images/3278472.png "width=500")
:::

### My branches are very different, and i need my deployment process to work differently between them {#Branching-Mybranchesareverydifferent,andIneedmydeploymentprocesstoworkdifferentlybetweenthem}

Sometimes a new branch might introduce a new component that needs to be deployed, which doesn't exist in the old branch. If you use channels, you can scope deployment steps and variables to channels to support this.

For example, the Rate Service package was added as part of v3, so currently only applies to the Early Adopter channel:

:::figure
![](/docs/deployments/patterns/images/3278473.png "width=500")
:::

Likewise, it has variables that only apply on Early Adopter:

:::figure
![](/docs/deployments/patterns/images/3278474.png "width=500")
:::

For more advanced uses, you may need to clone your project.

### We sometimes need to make hotfixes that are deployed straight to staging/production {#Branching-Wesometimesneedtomakehotfixesthataredeployedstraighttostaging/production}

Hotfixes are a special kind of release branch, but typically have a shorter lifecycle - they may need to go directly to production to fix a critical issue, and might skip certain deployment steps.

Again, channels can handle this by creating a Hotfix channel, and assigning the Hotfix channel a different lifecycle:

:::figure
![](/docs/deployments/patterns/images/3278475.png "width=500")
:::

Likewise, steps can be defined that apply to the Stable channel, but not to the Hotfix channel:

When releases are created for the Hotfix channel, they can then be deployed straight to production:

:::figure
![](/docs/deployments/patterns/images/3278476.png "width=500")
:::

While stable releases still follow the usual testing lifecycle:

:::figure
![](/docs/deployments/patterns/images/3278477.png "width=500")
:::

### We need to deploy different components depending on whether it's a "full" release or a "partial" release {#Branching-Weneedtodeploydifferentcomponentsdependingonwhetherit&#39;sa&quot;full&quot;releaseora&quot;partial&quot;release}

You might have a large project with many components. Sometimes you only need to deploy a single component, while other times you may need to deploy all components together.

This can be modeled by creating a channel per component, plus a channel for a release of all components.

:::figure
![](/docs/deployments/patterns/images/3278478.png "width=500")
:::

Steps can then be scoped to their individual channel as well as the major release channel:

:::figure
![](/docs/deployments/patterns/images/3278479.png "width=500")
:::

When creating the release, you can then choose whether the release is for an individual component or all components:

:::figure
![](/docs/deployments/patterns/images/3278480.png "width=500")
:::

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).