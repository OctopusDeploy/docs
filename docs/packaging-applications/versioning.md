---
title: Versioning
description: Considerations when selecting a versioning scheme for your applications.
position: 3
---

The [Package ID](/docs/packaging-applications/package-id.md) and version number uniquely identify your packages, so it's important to choose the right versioning scheme, but it can be a tricky balance between pragmatism and strictness. This page should help you understand how Octopus Deploy handles versions in [packages](/docs/packaging-applications/supported-packages.md), [releases](/docs/deployment-process/releases/index.md), and [channels](/docs/deployment-process/channels/index.md), and subsequently design a versioning scheme that suits your needs.

## Choosing a Versioning Scheme {#VersioninginOctopusDeploy-Choosingaversioningscheme}

The technology you're working with will, in some cases, determine the type of versioning scheme that you choose. We recommend using [Semantic Versioning](http://semver.org/) for your applications, unless you are deploying artifacts to a Maven repository, in which case you will need to use [Maven Versions](https://octopus.com/blog/maven-versioning-explained).

Consider the following factors when deciding on the versioning scheme you'll use for your applications and packages:

1. Can you trace a version back to the commit/check-in the application/package was built from? *For example: We stamp the SHA hash of the git commit into the metadata component of the Semantic Version for Octopus Deploy which makes it easier to find and fix bugs. We also tag the commit with the version of Octopus Deploy it produced so you can quickly determine which commit produced a particular version of Octopus Deploy.*
2. Can your users easily report a version to the development team that supports #1?
3. Will your version numbers be confusing, or will they help people understand the changes that have been made to the software? *For example: bumping a major version component (first part) means there are potentially breaking changes, but bumping a patch (3rd part) should be safe to upgrade, and safe to rollback if something goes wrong.*
4. Does your tool chain support the versioning scheme? *For example: Octopus Deploy supports Semantic Versioning, which enables enhanced features like [Channels](/docs/deployment-process/channels/index.md).*

### Strictness Versus Pragmatism {#VersioninginOctopusDeploy-Strictnessversuspragmatism}

Octopus supports a "pragmatic" implementation of SemVer, including support for 4-digit versions (like `1.0.0.0`) and versions that can be sorted alphanumerically, like `2016.09.01-beta.0001`.

Strictly speaking about SemVer 2.0, a version like `1.5.2-rc.1` is considered a "pre-release" and `1.5.2` would be considered a "full release".  In practice, these concepts carry weight when you are talking about hierarchies of application dependencies like classical NuGet packages or NPM dependencies. This kind of strict semantic versioning enables dependency management tooling to interpret what kind of changes each package version represents. For example, they can automatically protect your software, by preventing accidental upgrades to pre-release versions, or versions that might introduce breaking changes.

When it comes to application versioning however, we suggest the "pre-release tag" (the bit after the `-`) can be used for whatever you want. For example: you could build version `1.5.2-rc` of your application, and configure a [Channel](/docs/deployment-process/channels/index.md) to promote packages like `*-rc` to Staging and eventually Production.

## How Octopus Deploy Treats Versions {#VersioninginOctopusDeploy-HowOctopusDeploytreatsversions}

The Octopus Deploy ecosystem includes a wide variety of external services which care about versions, with some of them being quite opinionated in their versioning implementations, with potential inconsistencies amongst them. Rather than implementing a "lowest common denominator" approach, we've taken a "string-based" approach. This enables you to leverage the idiomatic/natural versioning schemes of your target ecosystem.

These are the decisions we made on handling versions:

1. **Valid versions:** A version string will be considered valid if it is a "strictly compliant" Semantic Version (according to [SemVer 1.0](http://semver.org/spec/v1.0.0.html) or [SemVer 2.0](http://semver.org/spec/v2.0.0.html)). We will also allow for 4-digit versions (like `1.0.0.0`) and zero-padded versions (like `2016.09.01`).
2. **Comparing versions:** We will compare versions using the "semantic" value (as per the Semantic Version specification).  

   a. **Equality:** Two versions will be considered to be equal if they are "semantically equivalent". Some examples:

        i. `1.0.0.0 == 1.0.0`  
        i. `2016.01.02 == 2016.1.2 == 2016.01.2`  
   a. **Ordering:** Versions will be sorted "semantically". Some examples:

        i. `1.4.10 > 1.4.9`  
        i. `3.0.0-beta.10 > 3.0.0-beta.9`  
        i. `1.4.008 < 1.4.9`  

3. **Creating packages (using Octopus tooling like [OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md) and [octo.exe](/docs/packaging-applications/creating-packages/nuget-packages/using-octo.exe.md)):** [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) provided the version you've specified is a valid SemanticVersion (as described earlier). For example, if you build a package using `octo.exe pack --id=MyPackage --version=2016.01.02` the output file will be `MyPackage.2016.01.02.nupkg`.  
4. **Interacting with package feeds/repositories (many and varied, including our own):** We just ask the feed for a package with the version string we stored in the release, and accept what the feed tells us.

## How Octopus Deploy Treats Maven Versions

When working with artifacts from a [Maven feed](/docs/packaging-applications/package-repositories/maven-feeds.md), Octopus respects the [Maven versioning scheme](https://octopus.com/blog/maven-versioning-explained). This versioning scheme is implemented as a copy of the [ComparableVersion](https://github.com/apache/maven/blob/master/maven-artifact/src/main/java/org/apache/maven/artifact/versioning/ComparableVersion.java) class from the Maven library itself.

## When to Use Semver and When to Use Maven Versions

SemVer is still recommended (or required) when versioning any artifact to be deployed to the built-in library or an external NuGet feed.

The only time Maven versions are used by Octopus is when an artifact is sourced from an external Maven feed. Accordingly, the only time to use the Maven versioning scheme over SemVer is when you are deploying artifacts to a Maven repository.

## Package Metadata {#SupportedPackages-PackageMetadata}

The only required pieces of information Octopus Deploy **requires** for a package are an ID, Version, and Format. Other metadata like release notes or descriptions are optional.

- NuGet packages: NuGet packages support embedding metadata within the contents of the package. We use this metadata to determine the version of the package.
- All other packages: In all other cases we have to parse the file name itself and extract the ID, Version and Format.

The expected package convention is therefore:

> `<id>.<version>.<extension>`

So for example the package name for version *2.3* of you project *Sample.Web*, archived with tar & gzip should be named

> `Sample.Web.2.3.tar.gz`

Learn how to [create packages](/docs/packaging-applications/creating-packages/index.md)
