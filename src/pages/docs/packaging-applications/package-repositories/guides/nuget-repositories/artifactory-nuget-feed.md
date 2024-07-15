---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Artifactory Local NuGet repository
description: Configuring an Artifactory Local NuGet repository as an Octopus feed.
navOrder: 10
---

Artifactory provides support for a number of [NuGet repositories](https://jfrog.com/help/r/jfrog-artifactory-documentation/nuget-repositories) including Local, Remote and Virtual repositories. An Artifactory Local NuGet repository can be configured in Octopus as an external [NuGet feed](/docs/packaging-applications/package-repositories/nuget-feeds).

## Configuring an Artifactory Local NuGet repository

:::div{.hint}
This guide was written using Artifactory version `7.11.5`.
:::

From the Artifactory web portal, navigate to **Administration ➜ Repositories**. From there, choose **Add Repositories ➜ Local Repository**:

 ![Artifactory repositories addition](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-repo-add.png)

From the Package Type selection screen, choose **NuGet**:

:::figure
![Artifactory local repository](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-repo-select.png)
:::

Give the repository a name in the **Repository Key** field, and fill out any other settings for the repository.

:::figure
![Artifactory local repository settings](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-repo-initial-settings.png)
:::

When you've entered all of the settings, click **Save & Finish**.

### Configure repository authentication

With the repository configured, the next step is to configure access so Octopus can retrieve package information.

The recommended way is to either configure a [user](https://jfrog.com/help/r/jfrog-platform-administration-documentation/manage-users) with sufficient permissions, or use an [access token](https://jfrog.com/help/r/jfrog-platform-administration-documentation/access-tokens). This user is the account which Octopus will use to authenticate with Artifactory.

:::div{.warning}
Every organization is different and the authentication example provided here is only intended to demonstrate functionality. Ensure you are complying with your company's security policies when you configure any user accounts and that your specific implementation matches your needs.
:::

From the Artifactory web portal, navigate to **Administration ➜ Identity and Access ➜ Users** and select **New User**.

:::figure
![Artifactory Add user](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-user.png)
:::

Fill out the **User Name**, **Email Address**, **Password** and any other settings.

:::div{.hint}
If you have an existing group to add the user to, you can do that here. Alternatively you can add the user account when creating a new group.
:::

When you've entered all of the settings, click **Save**.

Next, we need to ensure the user is in a [group](https://jfrog.com/help/r/jfrog-platform-administration-documentation/manage-groups) which can access our new repository.

From the Artifactory web portal, navigate to **Administration ➜ Identity and Access ➜ Groups** and select **New Group**.

:::figure
![Artifactory Add Group](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-group.png)
:::

Fill out the **Group Name** and any other settings. Ensure the user you created earlier is included in the group (in the right hand column).

When you've entered all of the settings, click **Save**.

Lastly, we need to ensure the group has [permissions](https://jfrog.com/help/r/jfrog-platform-administration-documentation/permissions) for Octopus to retrieve package information.

From the Artifactory web portal, navigate to **Administration ➜ Identity and Access ➜ Permissions** and select **New Permission**.

From there, give the permission a **Name**, and choose the **Add Repositories** option:

:::figure
![Artifactory add permission](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-permission.png)
:::

From the repository selection screen, choose the newly created repository so that it's in the **Included Repository** column and click **OK**:

:::figure
![Artifactory add permission repository](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-permission-repo.png)
:::

Next, switch to the **Groups** tab, and add a new group from **Selected Groups**:

:::figure
![Artifactory add permission group](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-permission-add-group.png)
:::

From the groups selection screen, choose the newly created group, or an existing group so that it's in the **Included Group** column and click **OK**.

:::figure
![Artifactory permissions include group](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-permission-include-group.png)
:::

Finally, choose the permissions to grant the group on the included repositories:

:::figure
![Artifactory repository permissions](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-add-permission-repo-permissions.png)
:::

:::div{.hint}
Octopus needs `Read` permissions as a minimum on the Local repository in order to search and download packages.
:::

When you've entered all of the settings, review your permissions are configured how you want, and click **Create**.

:::div{.hint}
You can also choose individual users to assign this permission to.
:::

### Anonymous authentication

An alternative to configuring a user is to enable [anonymous access](https://jfrog.com/help/r/jfrog-artifactory-documentation/anonymous-access-to-nuget-repositories) on the NuGet repository.

## Adding an Artifactory Local NuGet repository as an Octopus External Feed

Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `NuGet Feed` Feed type. 

Give the feed a name and in the URL field, enter the HTTP/HTTPS URL of the feed for your Artifactory Local repository in the format:

`https://your.artifactory.url:port/artifactory/api/nuget/v3/local-nuget-repo`

Replace the URL and port from the example above. In addition, replace `local-nuget-repo` with the name of your Local NuGet repository.

:::figure
![Artifactory Local NuGet feed](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/artifactory-local-nuget-feed.png)
:::

Save and test your feed to ensure that the connection is authenticated successfully.
