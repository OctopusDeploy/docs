---
title: Versioning Schemes
description: Considerations for selecting a versioning scheme for the applications you'll deploy.
position: 10
---

The [Package ID](/docs/packaging-applications/index.md#package-id), version number, and [package format](/docs/packaging-applications/index.md#support-formats) uniquely identify your packages, so it's important to choose the right versioning scheme, but it can be a tricky balance between pragmatism and strictness. This page should help you understand how Octopus Deploy handles versions in [packages](/docs/packaging-applications/index.md#supported-formats), [releases](/docs/deployment-process/releases/index.md), and [channels](/docs/deployment-process/channels/index.md), which will help you design a versioning scheme that suits your needs.

## Choosing a Versioning Scheme {#VersioninginOctopusDeploy-Choosingaversioningscheme}

The technology you're working with will, in some cases, determine the type of versioning scheme you choose. We recommend using [Semantic Versioning](#semver) for your applications, unless you are deploying artifacts to a [Maven repository](/docs/packaging-applications/package-repositories/maven-feeds.md), in which case, you need to use [Maven Versions](#maven).

Consider the following factors when deciding on the versioning scheme you'll use for your applications and packages:

1. Can you trace a version back to the commit/check-in the application/package was built from?

  *For example: We stamp the SHA hash of the git commit into the metadata component of the Semantic Version for Octopus Deploy which makes it easier to find and fix bugs. We also tag the commit with the version of Octopus Deploy it produced so you can quickly determine which commit produced a particular version of Octopus Deploy.*
2. Can your users easily report a version to the development team that supports #1?
3. Will your version numbers be confusing, or will they help people understand the changes that have been made to the software?

  *For example: bumping a major version component (first part) means there are potentially breaking changes, but bumping a patch (3rd part) should be safe to upgrade, and safe to rollback if something goes wrong.*
4. Does your tool chain support the versioning scheme?

  *For example: Octopus Deploy supports Semantic Versioning, which enables enhanced features like [Channels](/docs/deployment-process/channels/index.md).*

## SemVer {#semver}

Octopus supports Semantic Versioning 2.0.0, with version numbers constructed in the following way:

> `Major.Minor.Patch`

For instance:

> `1.5.2`

Octopus supports a *pragmatic* implementation of SemVer, including support for 4-digit versions:

> `1.0.0.0`

Octopus also supports versions that can be sorted alphanumerically:

> `2016.09.01-beta.0001`

In strict SemVer 2.0, a version like `1.5.2-rc.1` is considered a **pre-release**, and `1.5.2` is considered a **full release**.

When it comes to application versioning, we suggest the pre-release tag (the bit after the `-`) can be used however works best for you. For example, you could build version `1.5.2-rc` of your application and configure a [Channel](/docs/deployment-process/channels/index.md) to promote packages like `*-rc` to Staging and eventually Production.

Learn more about Semantic Version at [semver.org](http://semver.org/).

### How Octopus Deploy Treats Semantic Versions {#VersioninginOctopusDeploy-HowOctopusDeploytreatsversions}

The Octopus Deploy ecosystem includes a wide variety of external services which care about versions, with some of them being quite opinionated in their versioning implementations, with potential inconsistencies amongst them. Rather than implementing a "lowest common denominator" approach, we've taken a "string-based" approach. This enables you to leverage the idiomatic/natural versioning schemes of your target ecosystem.

These are the decisions we made on handling versions:

1. **Valid versions:** A version string will be considered valid if it is a "strictly compliant" Semantic Version (according to [SemVer 1.0](http://semver.org/spec/v1.0.0.html) or [SemVer 2.0](http://semver.org/spec/v2.0.0.html)). We will also allow for 4-digit versions (like `1.0.0.0`) and zero-padded versions (like `2016.09.01`).
2. **Comparing versions:** We will compare versions using the "semantic" value (as per the Semantic Version specification).  

   a. **Equality:** Two versions will be considered to be equal if they are "semantically equivalent". For instance:

        i. `1.0.0.0 == 1.0.0`  
        i. `2016.01.02 == 2016.1.2 == 2016.01.2`  
   a. **Ordering:** Versions will be sorted "semantically". For instance:

        i. `1.4.10 > 1.4.9`  
        i. `3.0.0-beta.10 > 3.0.0-beta.9`  
        i. `1.4.008 < 1.4.9`  

 3. Interacting with package feeds/repositories (many and varied, including our own), We just ask the feed for a package with the version string we stored in the release, and accept what the feed tells us.

## Maven Versions {#maven}

Maven versions are used by Octopus when an artifact is sourced from an external [Maven feed](/docs/packaging-applications/package-repositories/maven-feeds.md). SemVer is still required when versioning any artifact to be deployed to the built-in library or an external NuGet feed, and the only time to use the Maven versioning scheme over SemVer is when you are deploying artifacts to a Maven repository.

The Maven versioning scheme is implemented as a copy of the [ComparableVersion](https://github.com/apache/maven/blob/master/maven-artifact/src/main/java/org/apache/maven/artifact/versioning/ComparableVersion.java) class from the Maven library itself.

Maven version strings have 5 parts:

* Major
* Minor
* Patch
* Build number
* Qualifier

The Major, Minor, Patch, and Build number are all integer values.

The Qualifier can hold any value, although some qualifiers have special meanings and an associated order of precedence as follows:

* alpha or a
* beta or b
* milestone or m
* rc or cr
* snapshot
* (the empty string) or ga or final
* sp

Qualifiers are case insensitive, and some of the qualifiers have shorthand aliases, for instance, `alpha` and `a`, however, if you use an alias it must include a number, for instance, `a1`. If you do not include a number after the alias, it will be treated as an unrecognized qualifier which will be compared as a case insensitive string after the qualified versions.

Where version stings cannot be parsed as major.minor.patch.build and the qualifier is not recognized, the entire string is considered to be a qualifier.

A dash or a period can be used to separate Major, Minor, Patch, and Build, however, using a separator between the last digit and the qualifier is optional.

For an in-depth look at Maven versions, see the blog post [Maven Versions Explained](https://octopus.com/blog/maven-versioning-explained).
