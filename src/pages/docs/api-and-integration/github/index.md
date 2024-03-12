# GitHub Integration
The Octopus Deploy GitHub App provides seamless integation between Octopus Deploy and GitHub.

:::div{.hint}
The Octopus Deploy GitHub App is only supported on Octopus Cloud instances. 
:::

To get started, go to the GitHub Connections page in the Libarary of your Octopus cloud instance, and follow the prompts.

## GitHub App Connections
GitHub Connections is the recommended way to connect Octopus to your GitHub accounts. It provides seamless and security connection via the Octopus GitHub App, without using personal access tokens.

### Connecting a GitHub account
Each GitHub connection can only be connected once per Space. Once a specific account as been connected in a Space, it will be shown at the top of the list with a Connected label.

// TODO: Screenshot of a connected and not connected account, highlight the connected one.

To connect a new account, select once that has not yet been connected. This will take you to the new connection screen where you can select the repositories and 

// TODO: Screenshot of either the new connection screen or just highlight the disconnected account on the screenshot above.

If you don't see an account that you're expecting in this list, the app probably hasn't been installed (Octopus cannot see an account if the app hasn't been installed in that account yet). To install the Octopus GitHub App in a new account, select the link at the bottom of the screen and you'll be redirected to GitHub to complete the installation process.

### Editing GitHub Connections
When you first open the GitHub connection page, you will be in view mode. This will show the connection details and the currently connected repositories.

To edit the connection, click the edit button at the top of the screen. This will put the connection in edit mode, and load all of the additional GitHub repositories that you are able to connect.


Before saving, you must ensure that at least 1 repositoy is connected. If you want to remove all of the repositories, disconnect the account completely using the Disconnect button in the overflow menu

// TODO: Screenshot of disconnect button in the overflow menu.

### Selecting repositories on the GitHub Connection
Each GitHub Connection defines its own set of repositories (in addition to the list of repositories that is configured on the installation in GitHub).

GitHub accounts can only have a single GitHub App installation, so this installation is shared by all Octopus instances that are connected to that account. Without controlling the accounts that each instance and space has access to, this presents a security risk as adding a new repository to the installation would automatically give every space on every instance access to that repository as well.

By requiring repositories are defined on each connection, you are able to fine-tune the GitHub resources that each connection in each space can access. If you ever add more repositories to the installation in GitHub, you can be confident that these can't be used by any existing connections until you intentionally add the new repository to the connection. This does add an extra step every time you want to add a new repository, but we believe this is worth it for the security benefits this provides.

#### If you can't see a repository
Octopus can only see repositories that are available to the app installation and the current user. If you can't see a repository that you expect to see on this screen, it may not be available to either you or the installation.

To configure more repositories on a connection, follow the link at the bottom of the repository selection screen to configure more repositories on GitHub.

// TODO: Add screenshot of repository selection screen highlighting the link at the bottom

#### Only repository administrators can connect repositories
To connect a repository, you must be an administrator of the repository on GitHub. If you're not an administrator (but you can still view the repository), the repository will be shown, but selector will be disabled and you will need to get an administrator to add that repository to the connection on your behalf.

## Using GitHub App Connections
You can currently use GitHub app connections to authenticate Configuration as Code projects. This removes the need for using Personal Access Tokens to connect to GitHub repositories, and allows individual users to commit . See [Connecting Config as Code projects using GitHub App connections](https://todo)

## More information on installing and authorizing the Octopus GitHub App
You install the Octopus GitHub App on an account (organisation or user) to give the repositories or other content within that account. Authorizing gives the Octopus GitHub App permission to act on your behalf in any account that has the app installed.

Installing and authorizing are both concepts that are defined by GitHub. If you want to find out more about what installing and authorizing GitHub App and how tm manage these installation and authorizations, refer to the GitHub documentation:

- [GitHub Apps documentation](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)
- [Installing GitHub app documentation](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party)
- [Authorizing GitHub apps documentation](https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps)