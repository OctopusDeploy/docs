---
title: SSH Target Requirements
description: Requirements for using SSH deployment targets with Octopus.
position: 10
---

SSH deployment targets must meet the following requirements:

- It is accessible through SSH and SFTP (See [creating an SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair.md#Creating-a-SSH-Key-Pair)).
- The `$HOME` environment variable must be available.
- `bash` 3+ is available at `/bin/bash`. (It does not need to be the user’s default shell.)
- `tar` is available. This is used to unpack Calamari.
- `base64` is available. This is used for encoding and decoding variables.
- `grep` is available.

## Bash Startup Files

When connecting to a target over SSH, the Octopus server connects then executes the script via the `/bin/bash` command to ensure it is running with a bash shell (and not the default terminal shell for that user). Any login scripts that you wish to run should therefore be put into the `.bashrc` script file since this is invoked for non-login shells.

For example, with targets on a Mac the default $PATH variable may be missing `/usr/sbin`. This can be added in the `.bashrc` script with the line:

> PATH=$PATH:/usr/sbin

If the `.bashrc` file doesn't already exist, create it in the user folder of the user that is connecting to the Max OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.

See the Bash Reference Manual, section [6.2 Bash Startup Files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) for more information about startup scripts.

## .NET {#dotnet}

[Calamari](/docs/api-and-integration/calamari.md) is the command-line tool that is invoked to perform the deployment steps on the deployment target. Calamari runs on .NET.  SSH targets can be configured to use either:

- [Self-contained Calamari](#self-contained-calamari) built against .NET Core.
- [Calamari on Mono](#mono-calamari) built against the full .NET framework.

## Python
Octopus can execute Python scripts on SSH targets provided the following criteria are met:

- Python is version 3.4+
- Python3 is on the path for the SSH user executing the deployment
- pip is installed or the pycryptodome python package is installed

## Self-contained Calamari {#self-contained-calamari}

When using the self-contained option, neither .NET Core nor Mono need to be installed on the target server (there are still some [pre-requisite dependencies](#dependencies)).

Self-contained Calamari is built as a [.NET Core self-contained distributable](https://docs.microsoft.com/en-us/dotnet/core/deploying/#self-contained-deployments-scd).

### Self-Contained .NET Core Dependencies

[.NET Core has some dependencies](https://github.com/dotnet/core/blob/master/Documentation/prereqs.md) which must be installed on the target server.

### Self-contained Calamari Limitations {#self-contained-calamari-limitations}

ScriptCS and F# scripts can not execute when using a self-contained Calamari build.

ScriptCS has not been ported for .NET Core ([GitHub issue](https://github.com/scriptcs/scriptcs/issues/1183)).

Similarly, the F# interpreter has also not yet been ported for .NET Core ([GitHub issue](https://github.com/Microsoft/visualfsharp/issues/2407)).

## Calamari on Mono {#mono-calamari}

[Calamari](/docs/api-and-integration/calamari.md) can execute on the [Mono framework](http://www.mono-project.com/).

Version **3.10** or greater of Mono is required; however, we recommended a minimum of version **4.8.0**.

You can find instructions for installing Mono in the [Mono documentation](http://www.mono-project.com/docs/getting-started/install/linux/).

### Calamari on Mono Limitations

#### TLSv1.2 Support available in Mono >= 4.8.0
[TLSv1.2 support](http://www.mono-project.com/docs/about-mono/releases/4.8.0/#tls-12-support) was only included from Mono version **4.8.0**. Due to the weak cryptographic nature of older encryption algorithms, many websites are no longer providing support for TLSv1 TLSv1.1 and as such clients must ensure that they are able to use TLSv1.2 in order to communicate.

Although previous versions of Mono should work in most deployment scenarios, any deployments that involve the target accessing endpoints that require TLSv1.2 (for example downloading from [Maven](/docs/packaging-applications/package-repositories/maven-feeds.md) or [GitHub](/docs/packaging-applications/package-repositories/github-feeds.md) feeds) may fail.

#### Configuration Transformations only available in Mono >= 4.2.3  

The [Configuration Transforms](/docs/deployment-process/configuration-features/xml-configuration-variables-feature.md) feature will only work on Mono **4.2.3** and above.

This was due to a [bug with XML Transformations](https://bugzilla.xamarin.com/show_bug.cgi?id=19426).

Note that [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) can still be used without issue on earlier Mono versions.

#### Package Repository SSL Certificates

If you configure your deployment such that the target pulls down the package itself directly from the NuGet repository, the correct SSL certificates need to also be available to Mono. By default, Mono pre **3.12** didn’t trust any certificates and the root certs in question would need to be either manually imported, or synced with Mozilla’s list by invoking `mozroots` or `cert-sync`. Thankfully Mono's latest builds perform this step during installation so it should “just work”.

See [Mono’s security FAQ](http://www.mono-project.com/docs/faq/security/) for more details.

#### ScriptCS and F# only in >= Mono 4.0

Support for ScriptCS and F# scripts are only available with **Mono 4** and above.

#### Mono on OSX

If you are using a Mac with OSX as an SSH deployment target, you may see the following error message:

`Required command 'mono' is not available`

This can occur even if Mono is installed and can be executed from a local shell. This is because the environment exposed to an SSH session can differ from the environment used by a local shell.

To fix this:

1. If it doesn't already exist, create a file called `.bashrc` in the home folder of the user that is connecting to the Mac OSX instance. If the remote user is called `octopus`, then this file will be located at `/Users/octopus/.bashrc`.
2. Add the path environment variable to the `.bashrc` file to include the location of the mono executable e.g.

```
export PATH=/Library/Frameworks/Mono.framework/Versions/Current/bin/:${PATH}
```