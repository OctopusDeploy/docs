---
title: Upgrading from Octopus 3.x to modern version
description: Information on how to upgrade from Octopus Deploy 3.x to a modern version
position: 4
---

Upgrading from 3.x to a modern version of Octopus Deploy is a big jump.  In addition to a new UI, there are scores of new features, from workers, to spaces, to runbooks, to AWS support and more.

## Risks

It is possible to do an in-place upgrade of 3.x to a modern version of Octopus Deploy.  The upgrade logic was written with that scenario in mind.  With that said, keep in mind the last version 3.x, 3.17.14, was released on November 12th, 2017.  In that time span an API endpoint could've changed, or a key feature was depreceated in favor of something else.  

## Recommended Approach

The recommended approach is to clone the existing instance and upgrade the clone.  This is possible because:

- Modern versions of Octopus Deploy can communicate with [older tentacles](docs/support/compatibility).
- The thumbprints for certificates and other sensitive items are stored in the Octopus Deploy database.  

A high-level overview of the process is:

1. Backup the existing Octopus Deploy instance.
1. Create a clone of the existing Octopus Deploy instance.
2. Upgrade that cloned instance to a modern version of Octopus Deploy.
3. Test the upgraded instance.
4. Migrate from the old instance to the new instance.
5. Turn off the old instance.

## Backup existing Octopus Deploy Instance

!include <upgrade-octopus-backup>

## Create a clone of the existing instance

!include <upgrade-create-cloned-instance>

## Upgrade the cloned instance to a modern version

Upgrading the cloned instance will be the same as performing an in-place upgrade.

!include <inplace-upgrade>

## Test the upgraded instance

!include <upgrade-test-instance>

## Migrating from the old instance to the new instance

It will be possible to run both instances side by side.  In fact, both of them can deploy to the same targets (assuming you are not using polling tentacles).  But there are a few items to keep in mind.

- The Octopus Server is tightly coupled with Calamari.  Deploying to the same target from both servers will result in Calamari getting upgraded/downgraded a lot.  
- The newer Octopus Server will prompt you to upgrade the tentacles.  While running both instances side by side you will want to avoid this.
- The longer you wait to migrate, the greater the drift will be.  Any new releases, deployments, or process changes will need to be migrated over.  
- Polling tentacles will require special care as they need to be informed to point to the new server.

### Drift Concerns

We've seen some customers run instances side by side for a few days, then migrate over.  For others, it could be several weeks.  The advantage of the cloned instance is you have the time to test the upgrade and ensure it is smooth for everyone.  But it could take several weeks to iron out all the kinks.  At that point the drift between the old and new instance could be quite large.

The recommendation is to recreate the clone with a fresh backup of the old instance, and upgrade it to the latest version.  


## Additional items to note

Earlier versions of 3.x, including 3.1, 3.4, and 3.5 also carry some additional caveats to make note of.  Before upgrading to a modern version of Octopus Deploy please keep these in mind.

###  Upgrading to Octopus 3.1 or greater {#UpgradingfromOctopus3.x-UpgradingTo31UpgradingtoOctopus3.1orgreater}

Summary: Tentacle was upgraded from .NET 4.0 to .NET 4.5 to enable TLS 1.2.

:::success
**You can upgrade to Octopus Server 3.1 without upgrading any Tentacles and get all of the new 3.1 deployment features because Calamari will continue to work on both Tentacle 3.0 and 3.1.**
:::

This is the first modern version of Octopus Server where there has been a Tentacle upgrade and it has caused some confusion. This section aims to answer some of the most commonly asked questions about upgrading to Octopus 3.1 and the impact on Tentacles.

**Am I required to upgrade to Tentacle 3.1?**
No, you aren't required to upgrade to Tentacle 3.1. Tentacle 3.0 will still work and benefit from the latest version of Calamari and all of the deployment features we shipped in **Octopus 3.1**.

**What changed with Tentacle 3.1?**
The Octopus-Tentacle communication protocol in 3.1 can use TLS 1.2 which requires .NET 4.5 to be installed on the server.

**When should I upgrade to Tentacle 3.1?**
We recommend upgrading to Tentacle 3.1 as soon as you are able. Upgrading Tentacles in **Octopus 3.1** is automated and can be done through the Environments page. The main benefit you'll get is the Octopus-Tentacle communication protocol can use TLS 1.2.

**What would stop me from upgrading to Tentacle 3.1?**
[Your server needs to support .NET 4.5](https://msdn.microsoft.com/en-us/library/8z6watww%28v=vs.110%29.aspx). Tentacle 3.1 requires .NET 4.5 to be installed on the server, which is what enables TLS 1.2 support, and .NET 4.5 is supported on Windows Server 2008 SP2 or newer. This means Windows Server 2003 and Windows Server 2008 SP1 are not supported for Octopus Server or Tentacle 3.1.

**How can I make Octopus/Tentacle use TLS 1.2 instead of TLS 1.0?**
Octopus Server and Tentacle to 3.1 will use TLS 1.2 by default. **Tentacle 3.0** will still work with **Octopus 3.1**, but the communication protocol will fall back to the lowest-common denominator of TLS 1.0.

**Can I have a mixture of Tentacle 3.0 and 3.1? I'm not ready to upgrade some of my application servers.**
Yes, you can have a mixture of **Tentacle 3.0** and **3.1** working happily with **Octopus 3.1**. We have committed to maintaining compatibility with the communication protocol.

**If I keep running Tentacle 3.0 does that mean I won't get any of the new Octopus 3.1 deployment features?**
The deployment features are handled by Calamari and Octopus Server makes sure all Tentacles have the latest Calamari. This means servers hosting **Tentacle 3.0** or **3.1** will get all of the new deployment features we shipped with **Octopus 3.1** by means of the latest Calamari.

**Will you continue to support Windows Server 2003 or Windows Server 2008 SP1?**
No, from **Octopus 3.1** onward we are dropping official support for Octopus Server and Tentacle hosted on Windows Server 2003 or Windows Server 2008 SP1.

:::hint
**Tentacle communications protocol**
Read more about the [Octopus - Tentacle communication](/docs/security/octopus-tentacle-communication/index.md) protocol and [Troubleshooting Schannel and TLS](/docs/security/octopus-tentacle-communication/troubleshooting-schannel-and-tls.md).
:::

### Upgrading to Octopus 3.4 or greater {#UpgradingfromOctopus3.x-UpgradingtoOctopus3.4orgreater}

See the [Release Notes](https://octopus.com/downloads/compare?from=3.3.27&amp;to=3.4.0) for breaking changes and more information.

**Using TeamCity NuGet feeds?** You will need to upgrade your TeamCity server to v9.0 or newer and [enable the NuGet v2 API](https://teamcity-support.jetbrains.com/hc/en-us/community/posts/206817105-How-to-enable-NuGet-feed-v2). **Octopus 3.4**+ no longer supports the custom NuGet v1 feeds from TeamCity 7.x-8.x. We recommend upgrading to the latest TeamCity version available due to continual improvements in their NuGet feed - or switch to using the [Octopus built-in repository](/docs/packaging-applications/package-repositories/index.md).

**Want to use SemVer 2 for packages or releases?** You will need to upgrade OctoPack and/or Octopus CLI to 3.4 or newer.

### Upgrading to Octopus 3.5 or greater {#UpgradingfromOctopus3.x-UpgradingtoOctopus3.5orgreater}

Some server configuration values are moved from the config file into the database in 3.5+.

If you are upgrading to a 3.5+ version please backup your server config file prior to upgrading. If you need to downgrade then replace the config with the original file after the downgrade and restart the Octopus Server.