---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: GitHub Actions
description: GitHub Actions can leverage the Octopus CLI to pack, build, push, and create releases for Octopus Deploy.
navOrder: 55
---

[GitHub](https://github.com/) is a popular git-based source-control platform.

[GitHub Actions](https://github.com/features/actions) is GitHub's cloud-based continuous integration server.

:::div{.warning}
The [GitHub-hosted runners](https://help.github.com/en/actions/getting-started-with-github-actions/core-concepts-for-github-actions#runner) require your Octopus Server to be accessible over the Internet.  Otherwise you must [self-host your runners](https://help.github.com/en/actions/hosting-your-own-runners).
:::

## Integrating with GitHub Actions

Octopus Deploy has several custom GitHub Actions available:
- [Install Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli)
- [Push packages](https://github.com/marketplace/actions/push-package-to-octopus-deploy)
- [Create a release](https://github.com/marketplace/actions/create-release-in-octopus-deploy)
- [Run a runbook](https://github.com/marketplace/actions/run-runbook-in-octopus-deploy)
- [Push Build Information](https://github.com/marketplace/actions/push-build-information-to-octopus-deploy)

All of the Actions are compatible with following runner types:

- Windows
- macOS
- Linux
- Self-Hosted Runners


## GitHub Actions secrets

You can use [encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in your workflow (available from the **Settings ➜ Secrets** menu of your GitHub repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is not something you should store in your source control).

For example:

| Variable name       | Description|
| ------------- | ------- |
| `OCTOPUSSERVERURL` | The Octopus Server URL you wish to push the final package to |
| `OCTOPUSSERVERAPIKEY` | The Octopus Deploy API Key required for authentication |
| `OCTOPUSSERVER_SPACE` | The Space to push packages to |

:::figure
![GitHub Actions Secrets](/docs/packaging-applications/build-servers/images/github-actions-secrets.png)
:::

## GitHub Actions configuration

When you create your first GitHub Action for your repository, GitHub stores the actions as workflows in the `.github/workflows` folder in your repository. You need to modify those files to run the build, pack, and/or push package commands.

### Triggering a build

A build within GitHub Actions can be triggered in a few different ways such as:

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

A common method for triggering a build is to initiate the build whenever something is pushed to the repository.  Adding `push` will trigger a build whenever a push is made to the repository:

```yaml
name: MyBuild

on:
  push:
```

#### Schedule

A GitHub Actions build can also be triggered on a schedule.  Schedules are defined using the unix `cron` format.  The following example configures the build to execute at 7AM every day:

```yaml
name: MyBuild

on:
  schedule:
    - cron: "0 07 * * *"
```

:::div{.warning}
If your repo has been inactive for over 60 days, cron jobs will stop building.
:::

#### On-demand

It's also possible to manually trigger a GitHub Actions build on-demand.  To configure manual builds, add `workflow_dispatch` to your build file:

```yaml
name: MyBuild

on:
  workflow_dispatch:
```

Adding `workflow_dispatch` will enable the `Run workflow` button that will allow manual runs.

:::figure
![GitHub Actions Run Workflow](/docs/packaging-applications/build-servers/images/github-actions-run-workflow.png)
:::

### Building with GitHub Actions

GitHub Actions builds consist of **jobs** which in turn consist of **steps**.  By default, GitHub Actions jobs will run in parallel with each other while the steps within a job are executed sequentially.  It's possible to configure jobs to run sequentially using the `jobs.<job_id>.need` keyword. See the GitHub documentation on [Using jobs in a workflow](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow) for more details.

Before defining the steps for your job, you must first tell GitHub Actions what type of runner to use. The [GitHub documentation](https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job) explains the different types to choose from.

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

The following example demonstrates a GitHub Actions build of our example application, [OctoPetShop](https://github.com/OctopusSamples/OctoPetShop).  This application is written in .NET Core and consists of four components:

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

Below is an example GitHub Actions workflow which includes these steps:

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
        dotnet-version: 6.0.x
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

To package your artifacts for deployment, configure your build to use the `OctopusDeploy/install-octopus-cli-action` developed by Octopus Deploy by adding the following step (previous steps excluded for brevity):

```yaml
    - name: Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1

      with:
        version: latest
```

Adding this Action allows your build to use the commands from the Octopus [command line interface (CLI)](/docs/octopus-rest-api/octopus-cli/).  Using the [pack](/docs/octopus-rest-api/octopus-cli/pack) command, you can package your artifacts for deployment.  The following example packages the OctoPetShop components built above:

```yaml
    - name: Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1

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

Once the artifacts are packaged, use the **OctopusDeploy/push-package-action** Action to push the packages to the Octopus Server built-in repository.  The following example pushes the packages created from the previous `pack` operation:

```yaml
    - name: Push OctoPetShop packages
      uses: OctopusDeploy/push-package-action@v1
      with:
        api_key: ${{ secrets.OCTOPUSSERVERAPIKEY }}
        server: ${{ secrets.OCTOPUSSERVERURL }}
        packages: "artifacts/OctoPetShop.Database.${{ env.PACKAGE_VERSION }}.zip,artifacts/OctoPetShop.Web.${{ env.PACKAGE_VERSION }}.zip,artifacts/OctoPetShop.ProductService.${{ env.PACKAGE_VERSION }}.zip,artifacts/OctoPetShop.ShoppingCartService.${{ env.PACKAGE_VERSION }}.zip"
        space: ${{ secrets.OCTOPUSSERVER_SPACE }}
```

### Creating a release

To create a release, use the **OctopusDeploy/create-release-action**.  This action also contains the ability to deploy the newly created release.  Use either the `progress` or `wait_for_deployment` options to have the build wait for the deployment to complete and report success or failure. Using  `progress` will display messages from Octopus itself whereas `wait_for_deployment` will simply wait for Octopus to report success or failure:

```yaml
    - name: Create and deploy release
      uses: OctopusDeploy/create-release-action@v1
      with:
        api_key: ${{ secrets.OCTOPUSSERVERAPIKEY }}
        server: ${{ secrets.OCTOPUSSERVERURL }}
        space: ${{ secrets.OCTOPUSSERVER_SPACE }}
        project: "Octo Pet Shop"
        deploy_to: "Development"
        progress: true
```

:::div{.warning}
The variable **PACKAGE_VERSION** must be referenced like **${{ env.PACKAGE_VERSION }}** for both **push-package-action** and **create-release-action**
:::

### Complete build example
The previous sections displayed only the portions relevant to the topic being discussed.  The entire build YAML for the Octo Pet Shop is located below:

<details>
  <summary>Click here to view the entire example build YAML</summary>

```yaml
name: MyBuild

on:
  pull_request:
    branches: [ main ]
  schedule:
    - cron: "0 07 * * *"
  workflow_dispatch:
    logLevel:
      description: 'Log level'
      required: true
      default: 'warning'

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
    - name: Test
      run: dotnet test --no-restore --verbosity normal
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
    - name: Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1
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
    - name: Push OctoPetShop packages
      uses: OctopusDeploy/push-package-action@v1
      with:
        api_key: ${{ secrets.OCTOPUSSERVERAPIKEY }}
        server: ${{ secrets.OCTOPUSSERVERURL }}
        packages: "artifacts/OctoPetShop.Database.${{ env.PACKAGE_VERSION }}.zip,artifacts/OctoPetShop.Web.${{ env.PACKAGE_VERSION }}.zip,artifacts/OctoPetShop.ProductService.${{ env.PACKAGE_VERSION }}.zip,artifacts/OctoPetShop.ShoppingCartService.${{ env.PACKAGE_VERSION }}.zip"
        space: ${{ secrets.OCTOPUSSERVER_SPACE }}
    - name: Create and deploy release
      uses: OctopusDeploy/create-release-action@v1
      with:
        api_key: ${{ secrets.OCTOPUSSERVERAPIKEY }}
        server: ${{ secrets.OCTOPUSSERVERURL }}
        space: ${{ secrets.OCTOPUSSERVER_SPACE }}
        project: "Octo Pet Shop"
        deploy_to: "Development"
        progress: true
```
</details>


### Run a runbook
In addition to common build steps, we also have an action that can Run a Runbook.

```yaml
  - name: Run a runbook in Octopus Deploy
    uses: OctopusDeploy/run-runbook-action@1.0.1
    with:
      api_key: ${{ secrets.OCTOPUSSERVERAPIKEY }}
      environments: 'Development'
      project: 'Octo Pet Shop'
      runbook: 'Restart IIS App pool'
      server: ${{ secrets.OCTOPUSSERVERURL }}
      space: ${{ secrets.OCTOPUSSERVER_SPACE }}
      show_progress: 'true'
```

### Push Build Information

[Build information](/docs/packaging-applications/build-servers/build-information) contains a link
to the build which produced the package, details of the source
commits related to the build, and issue references parsed from the commit messages.

Build information is generated and pushed to Octopus with the
`OctopusDeploy/push-build-information-action` step:

```yaml
  - name: Generate Octopus Deploy build information
    uses: OctopusDeploy/push-build-information-action@v1
    env:
      OCTOPUS_API_KEY: ${{ secrets.OCTOPUS_API_TOKEN }}
      OCTOPUS_HOST: ${{ secrets.OCTOPUS_SERVER_URL }}
    with:
      version: ${{ env.PACKAGE_VERSION }}
      packages: OctoPetShopWeb
      overwrite_mode: OverwriteExisting
```

:::div{.success}
**Example GitHub Actions Repo:**

View a working GitHub Actions examples on our [samples GitHub repository](https://github.com/OctopusSamples).
- [.NET Core](https://github.com/OctopusSamples/OctoPetShop/blob/master/.github/workflows/dotnet-core.yml)
- [Java using Maven](https://github.com/OctopusSamples/RandomQuotes-Java/blob/master/.github/workflows/maven.yml)
:::

## GitHub Action Integrations v3

GitHub Action Integrations v3 no longer requires the Octo CLI to function. This new native approach brings many benefits to the table, including but not limited too:
- Smaller actions
- Faster runtimes
- Performance benefits through the [Executions API](https://octopus.com/blog/faster-deployments-with-the-executions-api)

### Migration Guides

Migrations guides can be found on each [GitHub Action Integration Repo](https://github.com/OctopusDeploy/create-release-action/blob/main/migration-guide/).

### New GitHub Actions

The following GitHub actions have been created in collaboration with GitHub Action v3.

### Deploy Release

Incorporate the following actions in your workflow to deploy a release in Octopus Deploy using an API key, a target instance (i.e. server), and a project:

```yaml
env:

steps:
  # ...
  - name: Deploy a release in Octopus Deploy 🐙
    uses: OctopusDeploy/deploy-release-action@v3
    env:
      OCTOPUS_API_KEY: ${{ secrets.API_KEY  }}
      OCTOPUS_URL: ${{ secrets.SERVER }}
      OCTOPUS_SPACE: 'Outer Space'
    with:
      project: 'MyProject'
      release_number: '1.0.0'
      environments: |
        Dev
        Test
      variables: |
        Foo: Bar
        Fizz: Buzz
```

### Deploy Release Tenanted

```yaml
env:

steps:
  # ...
  - name: Deploy a release in Octopus Deploy 🐙
    uses: OctopusDeploy/deploy-release-tenanted-action@v3
    env:
      OCTOPUS_API_KEY: ${{ secrets.API_KEY  }}
      OCTOPUS_URL: ${{ secrets.SERVER }}
      OCTOPUS_SPACE: 'Outer Space'
    with:
      project: 'MyProject'
      release_number: '1.0.0'
      environment: 'Dev'
      tenants: |
        'Some Tenant A'
        'Some Tenant B'
      tenant_tags: |
        'setA/someTagB'
        'setC/someTagD'
      variables: |
        'Foo: Bar'
        'Fizz: Buzz'
```

### Await Task

Incorporate the following actions in your workflow to wait for a task to complete in Octopus Deploy:

```yaml
env:

steps:
  # ...
  - name: Await task in Octopus Deploy 🐙
    uses: OctopusDeploy/await-task-action@v3
    env:
      OCTOPUS_API_KEY: ${{ secrets.API_KEY  }}
      OCTOPUS_URL: ${{ secrets.SERVER }}
      OCTOPUS_SPACE: 'Outer Space'
    with:
      server_task_id: ${{ fromJson(steps.some_previous_deployment_step.outputs.server_tasks)[0].serverTaskId }}
```

### Create Nuget Package

Create NuGet package(s) to push to Octopus Deploy.

```yaml
steps:
  - uses: actions/checkout@v3

  # create a NuGet package from files in the "reports" folder; create package in "packaging" folder
  - name: Create a NuGet package 🐙
    uses: OctopusDeploy/create-nuget-package-action@v3
    with:
      package_id: 'DemoPackage'
      version: '1.0.0'
      output_folder: 'packaging'
      base_path: reports
      files: |
        **/*.*
      nuspec_description: package description
      nuspec_authors: |
        author 1
        author 2
      nuspec_release_notes: |
        This is a multiline
        release note
```

### Create Zip Package

Create Zip package(s) to push to Octopus Deploy.

```yaml
steps:
  - uses: actions/checkout@v3

  # create a Zip package from files in the "reports" folder; create package in "packaging" folder
  - name: Create a Zip package 🐙
    uses: OctopusDeploy/create-zip-package-action@v3
    with:
      package_id: 'DemoPackage'
      version: '1.0.0'
      output_folder: './packaging'
      base_path: reports
      files: |
        **/*.*
```

### Install Octopus CLI Action v3

Although the CLI is not required for GitHub Actions v3, the install Octopus CLI Action v3 will now install the new [Octopus CLI](https://octopus.com/docs/octopus-rest-api/cli).

:::div{.warning}
If you require the use of the original Octo CLI, you can use `OctopusDeploy/install-octopus-cli-action@v1`.
:::

