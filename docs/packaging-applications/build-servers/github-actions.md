---
title: GitHub Actions
description: GitHub Actions can leverage the Octo CLI to pack, build, push, and create releases for Octopus Deploy.
position: 55
---

[GitHub](https://github.com/) is a popular git-based source-control platform.

[GitHub Actions](https://github.com/features/actions) is GitHubs's cloud-based continuous integration server.

:::warning
The [GitHub-hosted runners](https://help.github.com/en/actions/getting-started-with-github-actions/core-concepts-for-github-actions#runner) requires your Octopus Server to be accessible over the Internet.  Otherwise you must [self-host your runners](https://help.github.com/en/actions/hosting-your-own-runners).
:::

## Integrating with Bitbucket Pipelines

When using Octopus Deploy with GitHub Actions, the workflow will be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating packages for deployment.

Octopus Deploy will be used to take those packages and to push them to development, test, and production environments.

Octopus Deploy can be integrated with GitHub Actions using the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md) command-line tool.  The Octopus CLI can be downloaded directly from our website or using popular package management software such as APT for Ubuntu, Chocolatey for Windows and Homebrew for MacOS.  All GitHub-hosted runners include the same package management software.

## GitHub Actions secrets

You can use [encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in your workflow (available from the **{{Settings > Secrets}}** menu of your GitHub repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is ideally not something you store in your source control).

For example:

| Variable name       | Description|
| ------------- | ------- |
| OCTOPUS_SERVER | The Octopus Server URL you wish to push the final package to |
| OCTOPUS_APIKEY | The Octopus Deploy API Key required for authentication |

## GitHub Actions configuration

When you create your first GitHub Action for your repository, GitHub stores the actions as workflows in the .github/workflows folder in your repository. You will need to modify those files to run the build, pack and/or push package commands.

### Example workflows

Here's an example workflow that demonstrates using the Octo CLI tooling, which packs the current state of your repository into a zip file and then pushes that package to Octopus Deploy.  

:::warning
GitHub Actions includes a number of [default environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables).  These examples use those plus encrypted secrets from above.
:::

```yml Ubuntu Runner
name: Package Website

on:
  push:
    branches:
      - master

env:
    PACKAGE_PREFIX: 2020.1.1
    OCTOPUS_PROJECT_NAME: MyApp.Web
    OCTOPUS_SPACE_NAME: Default
    OCTOPUS_ENVIRONMENT_NAME: Development
jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
      
    - name: Set version
      id: set-version
      run: echo "::set-env PACKAGE_VERSION=$PACKAGE_PREFIX.$GITHUB_RUN_NUMBER"
    
    - name: Make package directories
      run: mkdir -p ./packagesoutput/          
    
    - name: Install Octopus CLI
      run: |
        sudo apt update && sudo apt install --no-install-recommends gnupg curl ca-certificates apt-transport-https && \
        curl -sSfL https://apt.octopus.com/public.key | sudo apt-key add - && \
        sudo sh -c "echo deb https://apt.octopus.com/ stable main > /etc/apt/sources.list.d/octopus.com.list" && \
        sudo apt update && sudo apt install octopuscli 
      
    - name: Build and Package Website
      run: dotnet publish ./src/MyApp/MyApp.Web.csproj --output ./packagesoutput/MyApp.Web/ --configuration Release --runtime linux-x64

    - name: Package and Push to Octopus
      run: |
        octo pack --id="MyApp.Web" --format="Zip" --version="$PACKAGE_VERSION" --basePath="./packagesoutput/MyApp.Web" --outFolder="./packages"

        octo push --package="./packages/MyApp.Web.$PACKAGE_VERSION.zip" --server="${{ secrets.OCTOPUS_SERVER }}" --apiKey="${{ secrets.OCTOPUS_APIKEY }}"

    - name: Create and Deploy Release
      run: octo create-release --project="$OCTOPUS_PROJECT_NAME" --packageVersion="$PACKAGE_VERSION" --releaseNumber="$PACKAGE_VERSION" --server="${{ secrets.OCTOPUS_SERVER }}" --apiKey="${{ secrets.OCTOPUS_APIKEY }}" --space="$OCTOPUS_SPACE_NAME" --deployTo="$OCTOPUS_ENVIRONMENT_NAME"
```

```yml Windows Runner
name: Package Website

on:
  push:
    branches:
      - master

env:
    PACKAGE_PREFIX: 2020.1.1
    OCTOPUS_PROJECT_NAME: MyApp.Web
    OCTOPUS_SPACE_NAME: Default
    OCTOPUS_ENVIRONMENT_NAME: Development
jobs:
  build:

    runs-on: windows-latest

    steps:
    - uses: actions/checkout@v2
      
    - name: Set version
      id: set-version
      run: echo "::set-env PACKAGE_VERSION=${env:PACKAGE_PREFIX}.${env:GITHUB_RUN_NUMBER}"
      shell: powershell
    
    - name: Make package directories
      run: New-Item "$PSScriptRoot\packagesoutput\" -ItemType Directory -Force
      shell: powershell          
    
    - name: Install Octopus CLI
      run: choco install octopustools -y
      shell: powershell
      
    - name: Build and Package Website
      run: dotnet publish ./src/MyApp/MyApp.Web.csproj --output "$PSScriptRoot\packagesoutput\MyApp.Web" --configuration Release
      shell: powershell

    - name: Package and Push to Octopus
      env:
        OCTOPUS_URL: ${{ secrets.OCTOPUS_SERVER }}
        OCTOPUS_API_KEY: ${{ secrets.OCTOPUS_APIKEY }}  
      run: |
        octo pack --id="MyApp.Web" --format="Zip" --version="${env:PACKAGE_VERSION}" --basePath="$PSScriptRoot\packagesoutput\MyApp.Web" --outFolder="packages"

        octo push --package="packages\MyApp.Web.${env:PACKAGE_VERSION}.zip" --server="${env:OCTOPUS_URL}" --apiKey="${env:OCTOPUS_API_KEY}"

    - name: Create and Deploy Release
      env:
        OCTOPUS_URL: ${{ secrets.OCTOPUS_SERVER }}
        OCTOPUS_API_KEY: ${{ secrets.OCTOPUS_APIKEY }} 
      run: octo create-release --project="$OCTOPUS_PROJECT_NAME" --packageVersion="${env:PACKAGE_VERSION}" --releaseNumber="${env:PACKAGE_VERSION}" --server="${env:OCTOPUS_URL}" --apiKey="${env:OCTOPUS_API_KEY}" --space="${env:OCTOPUS_SPACE_NAME}" --deployTo="${env:OCTOPUS_ENVIRONMENT_NAME}"
```

:::success
**Example Bitbucket Pipeline with octopus-cli-run Pipe:**
View a working Pipeline example on our [samples GitHub repository](https://github.com/OctopusSamples/OctopusTrident/blob/master/.github/workflows/packageredgate.yml).

See the corresponding Octopus project on our [samples instance](https://samples.octopus.app/app#/Spaces-106/projects/redgate-feature-branch-example/deployments).
:::