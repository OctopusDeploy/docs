---
title: GitHub Actions
description: GitHub Actions can leverage the Octopus CLI to pack, build, push, and create releases for Octopus Deploy.
position: 55
---

[GitHub](https://github.com/) is a popular git-based source-control platform.

[GitHub Actions](https://github.com/features/actions) is GitHub's cloud-based continuous integration server.

:::warning
The [GitHub-hosted runners](https://help.github.com/en/actions/getting-started-with-github-actions/core-concepts-for-github-actions#runner) require your Octopus Server to be accessible over the Internet.  Otherwise you must [self-host your runners](https://help.github.com/en/actions/hosting-your-own-runners).
:::

## Integrating with GitHub Actions

Octopus Deploy has a custom GitHub Action, [install-octocli](https://github.com/marketplace/actions/install-octopus-cli).

install-octocli installs the [Octopus Deploy CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) on any operating system, including:
- Windows
- MacOS
- Linux
- Self-Hosted Runners

Once the Octopus Deploy CLI is installed, you can perform any action that you would on the terminal using the CLI.

## GitHub Actions secrets

You can use [encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in your workflow (available from the **{{Settings > Secrets}}** menu of your GitHub repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is not something you should store in your source control).

For example:

| Variable name       | Description|
| ------------- | ------- |
| OCTOPUS_SERVER | The Octopus Server URL you wish to push the final package to |
| OCTOPUS_APIKEY | The Octopus Deploy API Key required for authentication |

## GitHub Actions configuration

When you create your first GitHub Action for your repository, GitHub stores the actions as workflows in the `.github/workflows` folder in your repository. You need to modify those files to run the build, pack, and/or push package commands.

### Example workflows

Here's a few example workflows for Linux, MacOS, and Windows to list deployments from a specific Octopus Deploy server.

:::warning
GitHub Actions includes a number of [default environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables).  These examples use those plus encrypted secrets from above.
:::

```yml Ubuntu Runner
name: listdeployments

env:
  serverURL: your_server_name

on:
   push:
     branches: [ main ]
   pull_request:
     branches: [ main ]

jobs:

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: install Octopus Deploy CLI
        uses: OctopusDeploy/install-octocli@v1
        with:
          version: 7.4.2
          
      - name: list-octopusdeploy-deployments
        run: octo list-deployments --server=${{ env.serverURL }} --apiKey=${{ secrets.apiKey }}
```

```yml Windows Runner
name: listdeployments

env:
  serverURL: your_server_name

on:
   push:
     branches: [ main ]
   pull_request:
     branches: [ main ]

jobs:

  build:
    name: Build
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: install Octopus Deploy CLI
        uses: OctopusDeploy/install-octocli@v1
        with:
          version: 7.4.2
          
      - name: list-octopusdeploy-deployments
        run: octo list-deployments --server=${{ env.serverURL }} --apiKey=${{ secrets.apiKey }}
```

```yml MacOS Runner
name: listdeployments

env:
  serverURL: your_server_name

on:
   push:
     branches: [ main ]
   pull_request:
     branches: [ main ]

jobs:

  build:
    name: Build
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: install Octopus Deploy CLI
        uses: OctopusDeploy/install-octocli@v1
        with:
          version: 7.4.2
          
      - name: list-octopusdeploy-deployments
        run: octo list-deployments --server=${{ env.serverURL }} --apiKey=${{ secrets.apiKey }}
```

:::success
**Example GitHub Actions Repo:**

View a working GitHub Actions example on our [samples GitHub repository](https://github.com/OctopusSamples/OctopusTrident/blob/master/.github/workflows/packageredgate.yml).

See the corresponding Octopus project on our [samples instance](https://samples.octopus.app/app#/Spaces-106/projects/redgate-feature-branch-example/deployments).
:::
