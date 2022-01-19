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

Octopus Deploy has a custom GitHub Action, [Install Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli).

The GitHub Action `install-octopus-cli-action` installs the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md) on any operating system, including:
- Windows
- MacOS
- Linux
- Self-Hosted Runners

Once the Octopus CLI is installed, you can perform any action that you would on the terminal using the CLI.

## GitHub Actions secrets

You can use [encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in your workflow (available from the **{{Settings > Secrets}}** menu of your GitHub repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is not something you should store in your source control).

For example:

| Variable name       | Description|
| ------------- | ------- |
| OCTOPUSSERVERURL | The Octopus Server URL you wish to push the final package to |
| OCTOPUSSERVERAPIKEY | The Octopus Deploy API Key required for authentication |
| OCTOPUSSERVER_SPACE | The Space to push packages to |

![](images/github-actions-secrets.png)

## GitHub Actions configuration

When you create your first GitHub Action for your repository, GitHub stores the actions as workflows in the `.github/workflows` folder in your repository. You need to modify those files to run the build, pack, and/or push package commands.

### Triggering a build
A build within GitHub Actions can be triggered on a few different ways such as
- Pull requests on a branch
- Push
- Schedule
- On-demand

All build triggers are defined in the `on` section of the GitHub Actions YAML file.

#### Pull requests
To configure your build to be triggered from a pull request on a branch, add a `pull_request` element to the `on` section of the YAML file.  Branches are listed in an array so you can define more than one.  In this example, the build can be triggered from a pull request on the `main` branch:

```yaml
name: MyBuild

on:
  pull_request:
    branches: [ main ]
```

#### Push
A common method for triggering a build is to iniate the build whenever something is pushed to the repository.  Adding `push` will trigger a build whenever a push is made to the repository

```yaml
name: MyBuild

on:
  push:
```


#### Schedule
A GitHub Actions build can also be triggered on a schedule.  Schedules are defined in `cron job` format.  The following example configures the build to execute at 7AM every day

```yaml
name: MyBuild

on:
  schedule:
    - cron: "0 07 * * *"
```

:::warning
If your repo has been inactive for over 60 days, cron jobs will stop building.
:::

#### On-demand
Lastly, it is possible to trigger a GitHub Actions build manually.  To configure manual builds, add `workflow_dispatch` to your build file

```yaml
name: MyBuild

on:
  workflow_dispatch:
```

Adding `workflow_dispatch` will enable `Run workflow` button which will allow manual runs

![](images/github-actions-run-workflow.png)

### Building with GitHub Actions
GitHub Actions builds consist of `jobs` which in turn cosist of `steps`.  By default, GitHub Actions `jobs` will run in parallel with each other while the `steps` within a job are executed sequentially.  It is possible to configure `jobs` to run sequentually using `jobs.<job_id>.need`, see [here](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow) for more details.

Before defining the steps for your job, you must first tell GitHub Actions what type of runner to use, [this](https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job) documentation explains the different types to choose from.

```yaml
name: MyBuild

on:
  pull_request:
    branches: [ main ]
  schedule:
    - cron: "0 07 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
```

#### Example .NET Core build
The following example demonstrates a GitHub Actions build of our example application, [OctoPetShop](https://github.com/OctopusSamples/OctoPetShop).  This application is written in .NET Core and consists of four components
- OctopusSamples.OctoPetShop.Database - Database updates using DBUp
- OctopusSamples.OctoPetShop.Web - Web front end
- OctopusSamples.OctoPetShop.ProductService - Product service API
- OctopusSamples.OctoPetShop.ShoppingCartService - Shopping cart service API

To build this application, you'll need the following steps:
- Checkout the source code
- Configure the runner with the appropriate version of .NET core
- Restore any NuGet packages required by the solution
- Build the solution
- Create folders to store published/compiled artifacts
- Publish each project to their respective artifact folders

```yaml
name: MyBuild

on:
  pull_request:
    branches: [ main ]
  schedule:
    - cron: "0 07 * * *"
  workflow_dispatch:

jobs:
  build:

    runs-on: ubuntu-latest    
    
    steps:
    - uses: actions/checkout@v2
    - name: Set Version
      run: echo "PACKAGE_VERSION=$(date +'%Y.%m.%d').$GITHUB_RUN_NUMBER" >> $GITHUB_ENV
    - name: Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 2.2.207
    - name: Install dependencies
      run: dotnet restore
    - name: Build
      run: dotnet build --configuration Release --no-restore
    - name: Create artifacts folder
      run: |
        mkdir "$GITHUB_WORKSPACE/artifacts"
        mkdir "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.Database"
        mkdir "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.Web"
        mkdir "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.ProductService"
        mkdir "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.ShoppingCartService"
    - name: Publish OctoPetShopDatabase
      run: dotnet publish OctopusSamples.OctoPetShop.Database/OctopusSamples.OctoPetShop.Database.csproj --configuration Release --no-restore --output "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.Database"
    - name: Publish OctoPetShopWeb
      run: dotnet publish OctopusSamples.OctoPetShop.Web/OctopusSamples.OctoPetShop.Web.csproj --configuration Release --no-restore --output "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.Web"
    - name: Publish OctoPetShopProductService
      run: dotnet publish OctopusSamples.OctoPetShop.ProductService/OctopusSamples.OctoPetShop.ProductService.csproj --configuration Release --no-restore --output "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.ProductService"
    - name: Publish OctoPetShopShoppingCartService
      run: dotnet publish OctopusSamples.OctoPetShop.ShoppingCartService/OctopusSamples.OctoPetShop.ShoppingCartService.csproj --configuration Release --no-restore --output "$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetshop.ShoppingCartService"
```

### Packaging artifacts
To package your artifacts for deployment, configure your build to use the `OctopusDeploy/install-octopus-cli-action` developed by Octopus Deploy by adding the following step (previous steps excluded for brevity)

```yaml
    - name: Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1.1.6
      with:
        version: latest
```

Adding this Action allows your build to use the commands from the Octopus [command line interface (CLI)](https://octopus.com/docs/octopus-rest-api/octopus-cli).  Using the [pack](https://octopus.com/docs/octopus-rest-api/octopus-cli/pack), you can package your artifacts for deployment.  The following example packages the OctoPetShop components built above.

```yaml
    - name: Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1.1.6
      with:
        version: latest
    - name: Package OctoPetShopDatabase
      run: |
        octo pack --id="OctoPetShop.Database" --format="Zip" --version="$PACKAGE_VERSION" --basePath="$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.Database" --outFolder="$GITHUB_WORKSPACE/artifacts"
    - name: Package OctoPetShopWeb
      run: |
        octo pack --id="OctoPetShop.Web" --format="Zip" --version="$PACKAGE_VERSION" --basePath="$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.Web" --outFolder="$GITHUB_WORKSPACE/artifacts"
    - name: Package OctoPetShopProductService
      run: |
        octo pack --id="OctoPetShop.ProductService" --format="Zip" --version="$PACKAGE_VERSION" --basePath="$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetShop.ProductService" --outFolder="$GITHUB_WORKSPACE/artifacts"
    - name: Package OctoPetShopShoppingCartService
      run: |
        octo pack --id="OctoPetShop.ShoppingCartService" --format="Zip" --version="$PACKAGE_VERSION" --basePath="$GITHUB_WORKSPACE/artifacts/OctopusSamples.OctoPetshop.ShoppingCartService" --outFolder="$GITHUB_WORKSPACE/artifacts"
```

### Pushing artifacts to Octopus Server
Once the artifacts are packaged, use the Octopus CLI Action to [push](https://octopus.com/docs/octopus-rest-api/octopus-cli/push) the packages to the Octopus Server built-in repository.  The following example pushes the packages created from the Package operation.

```yaml
    - name: Push OctoPetShop Database
      run: |
        octo push --package="$GITHUB_WORKSPACE/artifacts/OctoPetShop.Database.$PACKAGE_VERSION.zip" --server="${{ secrets.OCTOPUSSERVERURL }}" --apiKey="${{ secrets.OCTOPUSSERVERAPIKEY }}" --space="${{ secrets.OCTOPUSSERVER_SPACE }}"
    - name: Push OctoPetShop Web
      run: |
        octo push --package="$GITHUB_WORKSPACE/artifacts/OctoPetShop.Web.$PACKAGE_VERSION.zip" --server="${{ secrets.OCTOPUSSERVERURL }}" --apiKey="${{ secrets.OCTOPUSSERVERAPIKEY }}" --space="${{ secrets.OCTOPUSSERVER_SPACE }}"
    - name: Push OctoPetShop ProductService
      run: |
        octo push --package="$GITHUB_WORKSPACE/artifacts/OctoPetShop.ProductService.$PACKAGE_VERSION.zip" --server="${{ secrets.OCTOPUSSERVERURL }}" --apiKey="${{ secrets.OCTOPUSSERVERAPIKEY }}" --space="${{ secrets.OCTOPUSSERVER_SPACE }}"
    - name: Push OctoPetShop ShoppingCartService
      run: |
        octo push --package="$GITHUB_WORKSPACE/artifacts/OctoPetShop.ShoppingCartService.$PACKAGE_VERSION.zip" --server="${{ secrets.OCTOPUSSERVERURL }}" --apiKey="${{ secrets.OCTOPUSSERVERAPIKEY }}" --space="${{ secrets.OCTOPUSSERVER_SPACE }}"
```

### Creating a release
Using the Octopus CLI Action, add a step to issue the [create-release](https://octopus.com/docs/octopus-rest-api/octopus-cli/create-release) command to create a release

```yaml
    - name: Create release
      run: |
        octo create-release --project="Octo Pet Shop" --server="${{ secrets.OCTOPUSSERVERURL }}" --apiKey="${{ secrets.OCTOPUSSERVERAPIKEY }}" --space="${{ secrets.OCTOPUSSERVER_SPACE }}"
```

### Deploying a release
To have your GitHub Action build deploy a release, add a step with the [deploy-release](https://octopus.com/docs/octopus-rest-api/octopus-cli/deploy-release) command.
:::hint
Use either the `--progress` or `--waitForDeployment` switches to have the build wait for the deployment to complete and report success or failed.  `--progress` will display messages from Octopus itself whereas `--waitForDeployment` will simply wait for Octopus to report success or failure.

```yaml
    - name: Deploy release
      run: |
        octo deploy-release --project="Octo Pet Shop" --server="${{ secrets.OCTOPUSSERVERURL }}" --apiKey="${{ secrets.OCTOPUSSERVERAPIKEY }}" --space="${{ secrets.OCTOPUSSERVER_SPACE }}" --releaseNumber="latest" --deployTo="Development"
```
:::

:::success
**Example GitHub Actions Repo:**

View a working GitHub Actions examples on our [samples GitHub repository](https://github.com/OctopusSamples).
- [.NET Core](https://github.com/OctopusSamples/OctoPetShop/blob/master/.github/workflows/dotnet-core.yml)
- [Java using Maven](https://github.com/OctopusSamples/RandomQuotes-Java/blob/master/.github/workflows/maven.yml)
:::
