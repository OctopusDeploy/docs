---
title: Team Foundation Server & Azure DevOps
description: Octopus Deploy integrates with TFS and Azure DevOps to provide for a full automated build and deployment pipeline.
position: 20
---

Octopus Deploy integrates with Team Foundation Server and Azure DevOps to provide for a full automated build and deployment pipeline. This section provides information about how to integrate Octopus Deploy and the various versions of Microsoft's build server.

![](\docs\images\5672460\5672461.png)

## Supported TFS/Azure DevOps Versions

Depending on the version of TFS/Azure DevOps you are using, the recommended approach for a successful integration with Octopus may vary. Use the below chart to pick the right approach for your build server version.

| Version                     | Recommended approach                     | Notes                                    |
| --------------------------- | ---------------------------------------- | ---------------------------------------- |
| Azure DevOps/VSO                    | [Octopus Extension for TFS and Azure DevOps](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md)       | This is the hosted version of TFS. Our integration will always aim to be compatible with this offer, along with the latest TFS on-premise solution. |
| TFS 2015 Update 2 and newer | [Octopus Extension for TFS and Azure DevOps](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md)       | While TFS 2015 is supported (from update 2 upwards), it is highly recommended to upgrade to TFS 2017 to get the latest versions of the extension with all the new features and bug fixes. |
| TFS 2013 and older          | [Octopack & Octo.exe](/docs/api-and-integration/tfs-azure-devops/using-octopack.md) | These versions of TFS had XAML-based builds, reason why the approaches required a bit more manual work than with more recent TFS versions. |
