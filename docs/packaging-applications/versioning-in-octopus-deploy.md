---
title: Versioning in Octopus Deploy
position: 4
---


Choosing the best versioning scheme for your applications can be a tricky act of balancing pragmatism and strictness. This page should help you understand how Octopus Deploy handles versions in [packages](/docs/home/packaging-applications/supported-packages.md), [releases](/docs/home/key-concepts/projects/releases.md), and [channels](/docs/home/key-concepts/projects/channels.md), and subsequently design a versioning scheme that suits your needs.

:::success
**Use Semantic Versioning (SemVer)**
We strongly recommend using [Semantic Versioning](http://semver.org/) as a guide when designing a versioning scheme for your applications. Over the years Octopus Deploy has supported different versions of SemVer:

- [SemVer 2.0](http://semver.org/spec/v2.0.0.html) (recommended): requires [Octopus Deploy 3.4](https://octopus.com/blog/semver2) or greater
- [SemVer 1.0](http://semver.org/spec/v1.0.0.html): all prior versions of Octopus Deploy



**If you want everything to "just work" in every situation, stick with strict SemVer.** To cater for alternative scenarios we have also chosen to support a "pragmatic" implementation of SemVer including support for 4-digit versions (like `1.0.0.0`) and versions that can be sorted alphanumerically, like `2016.09.01-beta.0001`. Read further to learn about choosing a versioning scheme, and why we treat versions this way in Octopus Deploy.
:::


On this page:


- Choosing a versioning scheme
 - Strictness versus pragmatism
 - How we version Octopus Deploy
 - Build once, deploy many times
- How Octopus Deploy treats versions

## Choosing a versioning scheme


We highly recommend using [Semantic Versioning](http://semver.org/) for your applications - we use it internally at Octopus Deploy and have found it to be a useful way of communicating semantic meaning with our versions. Think about these factors when considering your own approach to versioning your applications and packages:

1. Can you trace a version back to the commit/checkin the application/package was built from? *For example: We stamp the SHA hash of the git commit into the metadata component of the Semantic Version for Octopus Deploy which makes it easier to find and fix bugs. We also tag the commit with the version of Octopus Deploy it produced so you can quickly determine which commit produced a particular version of Octopus Deploy.*
2. Can your users easily report a version to the development team that supports #1?
3. Will your version numbers be confusing, or will they help people understand the changes that have been made to the software? *For example: bumping a major version component (first part) means there are potentially breaking changes, but bumping a patch (3rd part) should be safe to upgrade, and safe to rollback if something goes wrong.*
4. Does your tool chain support the versioning scheme? *For example: Octopus Deploy supports Semantic Versioning, which enables enhanced features like [Channels](/docs/home/key-concepts/projects/channels.md).*


### Strictness versus pragmatism


Strictly speaking about SemVer 2.0, a version like `1.5.2-rc.1` is considered a "pre-release" and `1.5.2` would be considered a "full release".  In practice, these kinds of concepts carry weight when you are talking about hierarchies of application dependencies like classical NuGet packages or NPM dependencies. This kind of strict semantic versioning enables dependency management tooling to interpret what kind of changes each package version represents. For example, they can automatically protect your software, by preventing you from accidentally upgrading to pre-release versions, or versions that may introduce breaking changes.


When it comes to application versioning however, we suggest the "pre-release tag" (the bit after the `-`) can be used for whatever you want. For example: you could build version `1.5.2-rc` of your application, and configure a [Channel](/docs/home/key-concepts/projects/channels.md) to promote packages like `*-rc` to Staging and eventually Production.

### How we version Octopus Deploy


In practice, we use [GitVersion](https://gitversion.readthedocs.io/en/latest/why/) which interprets our git repository to calculate deterministic versions like `3.5.0-beta.2+Branch.master.SHA.56e05fced214c44a37759efa2dfc25a65d8ae98d` which are fully SemVer 2.0 compliant.


With a version like this we can communicate several semantic concepts with our customers:

1. We can indicate the type of changes between two versions, with these promises:
 1. Major version change = beware of major breaking changes and new features - upgrading may require some manual intervention - check our release notes
 2. Minor version change = new features, potential for minor breaking changes and database changes - upgrading should be easy, but rolling back will usually require restoring your database - check our release notes
 3. Patch version change = small bug fixes and computational logic changes: **safe to update, safe to roll back**
2. We can indicate if this is a "full release" or a "pre-release" and we even change the Main Menu colour to highlight this is a pre-release version of Octopus based on the Semantic Version.
3. We can uniquely identify the SHA hash of the git commit.
4. We show the version as `3.5.0-beta.2` in the UI.
5. We log the full "informational version" to all of our task logs so it is easy for us to identify exactly which version of Octopus Server and Calamari were used in a deployment based on a customer sending us a log file.


### Build once, deploy many times


One of the mantras at Octopus Deploy is "build once, deploy many times" and "deploy the same binaries you tested". This works really well when your versioning scheme can be a simple incremental scheme: every time you build you increment the build number. For example, an internal web application where the version number has no binding ramifications - it's primarily to enable traceability for bugs.


When it comes to versioning Octopus Deploy, we decided to take a slightly different approach and rebuild when we want a new version. The main driver for this is there are differences in the agreement we have with our customers for pre-releases and full-releases.


For example:

- When preparing to ship Octopus Deploy 3.5, we will build and ship several pre-releases to our customers with a version like `3.5.0-beta.1+Branch.release/3.4.0.SHA.53cf8e84bb88e24ae4b4b3df2bsdaab91a3735d8` - note the `-beta.1` prerelease tag.
- When we are ready to ship a full release, we go through the effort to rebuild the software with a version like `3.5.0+Branch.master.SHA.27cf8e84bb88e24ae4b4b3df2b77aab91a3735d8`, and take it through all the same testing before shipping to our customers - notice this is a "full-release" with no pre-release tag.



If you are like us, and the pre-release tag carries significant meaning, you should consider taking a similar approach. Otherwise, if the pre-release tag is just for information, perhaps you can consider whether it is useful for other purposes like configuring [Channels](/docs/home/key-concepts/projects/channels.md).

## How Octopus Deploy treats versions


The Octopus Deploy ecosystem includes a wide variety of external services which care about versions, with some of them being quite opinionated in their versioning implementations, with potential inconsistencies amongst them. Rather than implementing a "lowest common denominator" approach, we have chosen to take a "string-based" approach. This enables you to leverage the idiomatic/natural versioning schemes of your target ecosystem.


These are the decisions we made on handling versions:

1. **Valid versions:** A version string will be considered valid if it is a "strictly compliant" Semantic Version (according to [SemVer 1.0](http://semver.org/spec/v1.0.0.html) or [SemVer 2.0](http://semver.org/spec/v2.0.0.html)). We will also allow for 4-digit versions (like `1.0.0.0`) and zero-padded versions (like `2016.09.01`).
2. **Comparing versions:** We will compare versions using the "semantic" value (as per the Semantic Version specification).
 1. **Equality:** Two versions will be considered to be equal if they are "semantically equivalent". Some examples:
  1. `1.0.0.0 == 1.0.0`
  2. `2016.01.02 == 2016.1.2 == 2016.01.2`
 2. **Ordering:** Versions will be sorted "semantically". Some examples:
  1. `1.4.10 &gt; 1.4.9`
  2. `3.0.0-beta.10 &gt; 3.0.0-beta.9`
  3. `1.4.008 &lt; 1.4.9`
3. **Creating packages (using Octopus tooling like [OctoPack](/docs/home/packaging-applications/nuget-packages/using-octopack.md) and [octo.exe](/docs/home/packaging-applications/nuget-packages/using-octo.exe.md)):**[WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) provided the version you've specified is a valid SemanticVersion (as described earlier). For example:
 1. If you build a package using `octo.exe pack --id=MyPackage --version=2016.01.02` you should be expect the output file to be `MyPackage.2016.01.02.nupkg`.
4. **Interacting with package feeds/repositories (many and varied, including our own):** We just ask the feed for a package with the version string we stored in the release, and accept what the feed tells us.


:::hint
**NuGet &quot;Zero Quirks&quot;**
The NuGet team recently made the choice to "normalize" versions which affects everything in the NuGet ecosystem from building packages all the way through to consuming them. The basis for that decision is to ensure there is only ever one "literal representation" of a given "semantic version". This makes things a lot easier in the long run since "literal comparison" becomes equivalent to "semantic comparison".


[http://docs.nuget.org/ndocs/create-packages/dependency-versions#normalized-version-numbers](http://docs.nuget.org/ndocs/create-packages/dependency-versions#normalized-version-numbers)


This is a really good decision when considering the NuGet ecosystem in isolation. It doesn't work well, however, in the Octopus Deploy ecosystem where you may not be using NuGet's tooling everywhere. Consider the simple example of building a package in a continuous integration tool chain, and then wanting to push that package somewhere. If you happened to build your shiny new `v2.0.0.0` package, it will be written to disk as `MyPackage.2.0.0.nupkg` causing your scripts to break if they depended on the filename to be `MyPackage.2.0.0.0.nupkg`.


This caused us to take stock of how we handle versions across the Octopus Deploy ecosystem and make the decisions we outlined earlier.
:::
