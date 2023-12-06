---
layout: src/layouts/Default.astro
pubDate: 2023-11-20
modDate: 2023-11-20
title: Artifactory Generic Feeds
description: Configuring an Artifactory Generic Feed in Octopus
navOrder: 60
---

:::div{.warning}
From version **Octopus 2024.1** we support Artifactory Generic Repositories. This functionality is behind the `ArtifactoryGenericFeedFeatureToggle` feature toggle, to request this functionality early, please context [support](https://octopus.com/support).
:::

:::div{.warning}
To use the Artifactory Generic Feeds feature you will need a PRO or higher license of Artifactory
:::

If you're using an Artifactory Generic Repository, you can create a feed in Octopus and use artifacts as part of your deployments. To create a feed go to **Library ➜ External feeds**. Select the **Add feed** button and selecting the _Artifactory Generic Repository_ feed type.

You will then need to provide a feed name, the Artifactory repository name, an [access token](https://oc.to/ArtifactoryAccessToken) and the repository [Artifact Path regex](https://oc.to/ArtifactoryGenericLayouts).

:::figure
![](/docs/packaging-applications/package-repositories/images/artifactory-generic-feed-creation.png)
:::

Artifactory generic feeds accommodate files of any type without requiring a specific file name structure. To handle this Artifactory supports [custom layouts](https://oc.to/ArtifactoryGenericLayouts). Custom layouts produce a regex expression that the file path and name must match, enabling Artifactory to extract the file type, version and module. This customizable package structure does not match Octopus's own expected [package versioning conventions](/docs/packaging-applications/create-packages/versioning) used in other feeds. To handle this we depend on the Artifact Path Pattern regex expression available from Artifactory to be set on the feed in Octopus. To find the _Artifact Path Pattern_ go to **Administration ➜ Layouts ➜ Regular Expression View ➜ Resolve** and copy the Artifact Path Regex expression. The default layout regex for a new repository and layout is <code>(?<orgPath>.+?)/(?<module>[^/]+)/(?<module>\2)-(?<baseRev>[^/]+?)\.(?<ext>(?:(?!\d))[^\-/]+|7z)</code>.

:::figure
![](/docs/packaging-applications/package-repositories/images/artifactory-generic-feeds-custom-layout.png)
:::

The Octopus integration with Artifactory Generic Repositories depends on the artifacts matching the repository layout, specifically on the _module_ and _baseRev_ properties. An artifact can be tested whether it matches the layout regex using the _Test Artifact Path Resolution_ in Artifactory. When artifacts match the layout pattern the [listing versions for a specific package](https://oc.to/ArtifactVersionSearch) endpoint will return a list of all available versions. This also provides the package information when viewing an artifacts details in the Artifactory UI. If the package information properties are not visible in the Artifactory UI Octopus will not be able to list versions, or download these artifacts.

:::figure
![](/docs/packaging-applications/package-repositories/images/artifactory-generic-feed-package-information.png)
:::

The regex layout in Artifactory is used to [list the versions of an artifact](https://oc.to/ArtifactVersionSearch). Searching and selecting a package uses the Artifactory Query Language to search within the repository, this does not depend on the layout. If a package has been found and selected but fetching versions fails when creating deployments this is likely due to the layout not matching the artifact within Artifactory.

On the test page, you can search for packages, this will return the packageId expected by Octopus along with the artifact details. The expected packageId is `path/module` where the path is the folder structure to the artifact returned from the AQL query <code>items.find(...)</code> and the module is determined by parsing the regex expression set on the feed within Octopus.

:::figure
![](/docs/packaging-applications/package-repositories/images/artifactory-generic-feed-test.png)
:::
