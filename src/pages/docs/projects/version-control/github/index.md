---
layout: src/layouts/Default.astro
pubDate: 2024-03-14
modDate: 2024-11-07
title: GitHub integration 
description: Octopus Deploy GitHub integration
icon: fa-brands fa-github
navOrder: 30
---

The Octopus Deploy GitHub App provides seamless integration between Octopus Deploy and GitHub.

:::div{.hint}
The Octopus Deploy GitHub App is only supported on Octopus Cloud instances. 
:::

To get started, go to the GitHub Connections page in the Deploy -> Manage section of your Octopus cloud instance, and follow the prompts.

## GitHub App Connections
GitHub Connections is the recommended way to connect Octopus to your GitHub accounts (organizations or users). It provides seamless and secure connection via the Octopus GitHub App, without using personal access tokens.

### Connecting a GitHub account
Before you can use an GitHub account in Octopus Deploy, you need to connect the account to the Space.

:::figure
![Screenshot of Octopus Deploy GitHub Connections screen showing OctopusPetShop organization connected and OctopusDeploy organization not connected](/docs/img/api-and-integration/github/github-connections-screen.png)
:::

To connect a new account, select any currently disconnected account to go to the new connection screen where you can select the repositories and complete the connection. You can only connect each GitHub account once per Space. Once connected, the account will show at the top of the list with a Connected label.

If you don't see an account that you're expecting in this list, the app probably hasn't been installed (Octopus cannot see an account that have the app installed). To install the Octopus GitHub App in a new account, select the link at the bottom of the screen to go to GitHub and complete the installation process.

### Editing GitHub Connections
When you first open the GitHub connection page, you will be in view mode. This will show the connection details and the currently connected repositories. To edit the connection, click the edit button at the top of the screen. This will put the connection in edit mode, and load the GitHub repositories that you are able to connect.

You will not be able to save the connection unless you have at least 1 repository selected. To remove all repositories, disconnect the account completely using the Disconnect button in the overflow menu.

:::figure
![Screenshot of Octopus Deploy GitHub Connections screen showing OctopusPetShop connection with overflow menu expanded showing disconnect button](/docs/img/api-and-integration/github/github-connection-disconnect.png)
:::

### Selecting repositories on the GitHub Connection
Each GitHub Connection defines its own set of repositories (this is on top of the list of repositories configured on the installation in GitHub).

GitHub accounts can only have a single GitHub App installation, so this installation is shared by all Octopus instances connected to that account. By requiring repositories are set for each connection as well, you are able to fine-tune the GitHub resources that each connection in each Space can access. If you ever add more repositories to the installation in GitHub, you can be confident that any existing connections cannot access this repository until you explicitly add it to those connections. This does add an extra step every time you want to add a new repository, but we believe this is worth it for the extra security this provides.

#### If you can't see a repository
Octopus can only see repositories that are available to the app installation and the current user. If you can't see a repository that you expect to see on this screen, it may not be accessible to either you or the installation. To configure more repositories on a connection, follow the link at the bottom of the repository selection screen to configure more repositories on GitHub.

:::figure
![Screenshot of Octopus Deploy GitHub Connections screen for OctopusPetShow in edit mode showing PetShop and ProductAPI repositories selected and UserAPI deselected. Configure repository access in the Octopus Deploy app on GitHub link is shown at the bottom of the page](/docs/img/api-and-integration/github/github-connection-edit.png)
:::

#### Only repository administrators can connect repositories
To connect a repository, you must be an administrator of the repository on GitHub. If you're not an administrator (but can view the repository), you will still see the repository in the list, but will not be able to select it.

## Using GitHub App Connections
You can currently use GitHub App Connections to connect to Configuration as Code projects. This removes the need for using Personal Access Tokens to connect to GitHub repositories, and allows users to commit as their GitHub users (rather than using a shared account).

## Requested Permissions
There are specific GitHub permissions that the Octopus GitHub App requests in order to perform it's tasks.

* **Repository Permissions**
  * **Contents: Read and Write** Allows Octopus to access the files in your repositories for usage such as [Config As Code](https://octopus.com/docs/projects/version-control) projects or Git Project Dependencies.
  * **Metadata: Read-only** Default permission required by all GitHub Apps in to lead basic repository information.
  * **Pull Requests: Read and Write** Used by Octopus when executing some steps, for example deploying releases for [Argo CD](https://octopus.com/docs/argo-cd).
* **Account Permissions**
  * **Email addresses (Read-only):** Required so that Octopus can attempt to obtain the correct email address used when comitting the author information to a commmit.
 
Where viable, whenever Octopus uses a token to perform an action a minimal token is used, scoped down in accordance with the principle of least privilege.

## More information on installing and authorizing the Octopus GitHub App
You install the Octopus GitHub App on an account (organization or user) to give the repositories or other content within that account. Authorizing gives the Octopus GitHub App permission to act on your behalf in any account that has the app installed.

Installing and authorizing are both GitHub concepts. If you want to find out more about what installing and authorizing GitHub App and how to manage these installation and authorizations, refer to the GitHub documentation:

- [GitHub Apps documentation](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)
- [Installing GitHub apps documentation](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party)
- [Authorizing GitHub apps documentation](https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps)

## Known limitations

* Connecting to GitHub organizations with IP allow lists enabled is not currently supported with Octopus GitHub App Connections.

## Older versions

- Prior to version 2024.3.12703 when the new UI navigation was introduced, the GitHub Connections page is located in the Library section of Octopus.
