---
title: Team Foundation Server (TFS) & Visual Studio Team Services (VSTS)
description: Octopus Deploy integrates with TFS and VSTS to provide for a full automated build and deployment pipeline.
position: 2
---

Octopus Deploy integrates with Team Foundation Server and VSTS to provide for a full automated build and deployment pipeline. This section provides information about how to  integrate Octopus Deploy and the various verions of Microsoft's build server.

![](\docs\images\5672460\5672461.png)

## Supported TFS/VSTS versions

Depending on the version of TFS/VSTS you are using, the recommended approach for a successful integration with Octopus may vary. Use the below chart to pick the right approach for your build server version.

| Version                     | Recommended approach                     | Notes                                    |
| --------------------------- | ---------------------------------------- | ---------------------------------------- |
| VSTS/VSO                    | [Octopus Extension for TFS and VSTS](/docs/api-and-integration/tfs-vsts/using-octopus-extension/index.md)       | This is the hosted version of TFS. Our integration will always aim to be compatible with this offer, along with the latest TFS on-premise solution. |
| TFS 2015 Update 2 and newer | [Octopus Extension for TFS and VSTS](/docs/api-and-integration/tfs-vsts/using-octopus-extension/index.md)       | While TFS 2015 is supported (from update 2 upwards), it is highly recommended to upgrade to TFS 2017 to get the latest versions of the extension with all the new features and bug fixes. Click on [this link] to learn more about this. |
| TFS 2013 and older          | [Octopack & Octo.exe](/docs/api-and-integration/tfs-vsts/using-octopack.md) | These versions of TFS had XAML-based builds, reason why the approaches required a bit more manual work than with more recent TFS versions. |