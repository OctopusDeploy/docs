---
title: Calamari on Mono
description: Calamari can run on the Mono framework
position: 4
version: "[3.0,)"
---

[Calamari](/docs/api-and-integration/calamari.md) can execute on the [Mono framework](http://www.mono-project.com/), allowing Octopus to deploy via SSH to \*nix operating systems.

Version 3.10 or greater of Mono is required however we recommended a minum of version `4.8.0`.

You can find instructions for installing Mono in the [Mono documentation](http://www.mono-project.com/docs/getting-started/install/linux/).

## Supported Distros

Mono supports many [platforms](http://www.mono-project.com/docs/about-mono/supported-platforms/).  

We currently execute automated tests against the following platforms:

- Centos 7.3 + Mono 4.4.2
- Debian 8.7 + Mono 4.8.0
- Fedora 23 + Mono 4.4.2
- FreeBSD 10.3 + Mono 4.6.2
- Mac OSX 10.12.5 + Mono 4.6.1
- openSUSE 13.2 + Mono 4.6.0
- Redhat 7.2 + Mono 4.4.2
- SUSE LES 12 SP2 + Mono 4.6.0
- Ubuntu 12.04 LTS + Mono 3.12.1
- Ubuntu 14.04 LTS + Mono 4.0.5
- Ubuntu 16.04 LTS + Mono 4.6.1

## Limitations

### TLSv1.2 Support available in Mono >= 4.8.0
[TLSv1.2 support](http://www.mono-project.com/docs/about-mono/releases/4.8.0/#tls-12-support) was only included from Mono version `4.8.0`. Due to the weak cryptographic nature of older encryption algorithms, many websites are no longer providing support for TLSv1 TLSv1.1 and as such clients must ensure that they are able to use TLSv1.2 in order to communicate.

Although previous versions of mono should work in most deployment scenarios, any deployments that involve the target accessing endpoints that require TLSv1.2 (for example downloading from [Maven](/docs/packaging-applications/package-repositories/maven-feeds.md) or [GitHub](/docs/packaging-applications/package-repositories/github-feeds.md) feeds) may fail.

### Configuration Transformations only available in Mono >= 4.2.3  

The [Configuration Transforms](/docs/deployment-process/configuration-features/xml-configuration-variables-feature.md) feature will only work on Mono 4.2.3 and above.

This was due to a [bug with XML Transformations](https://bugzilla.xamarin.com/show_bug.cgi?id=19426).

Note that [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) can still be used without issue on earlier Mono versions.

### Package Repository SSL Certificates

If you configure your deployment such that the target pulls down the package itself directly from the NuGet repository, the correct SSL certificates need to also be available to Mono. By default, Mono pre 3.12 didn’t trust any certificates and the root certs in question would need to be either manually imported, or synced with Mozilla’s list by invoking `mozroots` or `cert-sync`. Thankfully Mono's latest builds perform this step during installation so it should “just work”. See [Mono’s security FAQ](http://www.mono-project.com/docs/faq/security/) for more details.

### ScriptCS and F# only in >= Mono 4.0

Support for ScriptCS and F# scripts are only available with Mono 4 and above.
