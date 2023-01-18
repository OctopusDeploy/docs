---
title: GitHub Actions
description: GitHub Actions can leverage the Octopus CLI to pack, build, push, and create releases for Octopus Deploy.
position: 55
---

[GitHub](https://github.com/) is a popular git-based source-control platform.

[GitHub Actions](https://github.com/features/actions) is GitHub's cloud-based continuous integration server.

:::warning
The [GitHub-hosted runners](https://help.github.com/en/actions/getting-started-with-github-actions/core-concepts-for-github-actions#runner) require your Octopus Server to be accessible over the Internet.  Otherwise, you must [self-host your runners](https://help.github.com/en/actions/hosting-your-own-runners).
:::

## Integrating with GitHub Actions

Octopus Deploy has several custom GitHub Actions available.

Packaging:

- [Create a ZIP package](https://github.com/marketplace/actions/create-zip-package-for-octopus-deploy)
- [Create a NuGet package](https://github.com/marketplace/actions/create-nuget-package-for-octopus-deploy)

Publishing:

- [Push packages](https://github.com/marketplace/actions/push-package-to-octopus-deploy)
- [Push build Information](https://github.com/marketplace/actions/push-build-information-to-octopus-deploy)

Create and deploy a release:

- [Create a release](https://github.com/marketplace/actions/create-release-in-octopus-deploy)
- [Deploy a release](https://github.com/marketplace/actions/deploy-a-release-in-octopus-deploy)
- [Deploy a tenanted release](https://github.com/marketplace/actions/deploy-a-tenanted-release-in-octopus-deploy)

Runbooks:

- [Run a runbook](https://github.com/marketplace/actions/run-runbook-in-octopus-deploy)

:::hint
You can also [install the Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli) to run custom commands. You don't need to install the CLI to run Octopus GitHub Actions for version 3.0 or above.
:::

All of the Actions are compatible with the following runner types:

- Windows
- MacOS
- Linux
- Self-Hosted Runners


## GitHub Actions secrets

You can use [encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in your workflow (available from the **{{Settings > Secrets}}** menu of your GitHub repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is not something you should store in your source control).

For example:

| Variable name     | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `OCTOPUS_URL`     | The Octopus Server URL you wish to push the final package to |
| `OCTOPUS_API_KEY` | The Octopus Deploy API Key required for authentication       |
| `OCTOPUS_SPACE`   | The Space to push packages to                                |

![GitHub Actions Secrets](images/github-actions-secrets.png "width=500")

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

:::warning
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

![GitHub Actions Run Workflow](images/github-actions-run-workflow.png "width=500")

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

- OctopusSamples.OctoPetShop.Database - Database updates using [DbUp](https://dbup.readthedocs.io/en/latest/)
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
    - uses: actions/checkout@v3

    - name: Set Version
      run: echo "PACKAGE_VERSION=$(date +'%Y.%m.%d').$GITHUB_RUN_NUMBER" >> $GITHUB_ENV
    
    - name: Setup .NET Core
      uses: actions/setup-dotnet@v3
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

You can use the Octopus create ZIP package action to package each component. Adding an `id` to the step makes it easier to reference the output variables created when it runs.

```yaml
    - name: Package OctoPetShopWeb
      id: package_web
      with:
        package_id: OctoPetShop.Web
        base_path: "artifacts/OctopusSamples.OctoPetShop.Web"
        version: "${{ env.PACKAGE_VERSION  }}"
        files: "**/*"
        output_folder: artifacts
```



### Pushing artifacts to Octopus Server

Once the artifacts are packaged, use the **OctopusDeploy/push-package-action** Action to push the packages to the Octopus Server built-in repository.  The following example pushes the packages created from the previous `pack` operation:

```yaml
    - name: Push OctoPetShopWeb
      uses: OctopusDeploy/push-package-action@v3
      with:
        packages: ${{ steps.package_web.outputs.package_file_path }}
```

### Creating a release

To create a release, use the **OctopusDeploy/create-release-action**.  This action also contains the ability to deploy the newly created release.  Use either the `progress` or `wait_for_deployment` options to have the build wait for the deployment to complete and report success or failure. Using  `progress` will display messages from Octopus itself whereas `wait_for_deployment` will simply wait for Octopus to report success or failure:

```yaml
    - name: Create a release in Octopus Deploy
      uses: OctopusDeploy/create-release-action@v3
      id: "create_release"
      with:
        project: "Pet Shop"
        package_version: "${{ env.PACKAGE_VERSION  }}"

    - name: Deploy the release in Octopus Deploy
      uses: OctopusDeploy/deploy-release-action@v3
      with:
        project: "Pet Shop"
        release_number: ${{ steps.create_release.outputs.release_number }}
        environments: |
          Development
```

:::warning
The variable **PACKAGE_VERSION** must be referenced like **${{ env.PACKAGE_VERSION }}** for both **push-package-action** and **create-release-action**
:::

### Complete build example
The previous sections displayed only the portions relavent to the topic being discussed.  The entire build YAML for the Octo Pet Shop is located below:

<details>
  <summary>Click here to view the entire example build YAML</summary>

```yaml
name: .NET Core 

on:
  pull_request:
    branches: [ master ]
  schedule:
    - cron: "0 09 * * *"
  workflow_dispatch:
    logLevel:
      description: 'Log level'
      required: true
      derault: 'warning'

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set Version
      run: echo "PACKAGE_VERSION=$(date +'%Y.%m.%d').$GITHUB_RUN_NUMBER" >> $GITHUB_ENV

    - name: Setup .NET 6
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '6.0.x'

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

   - name: Package OctoPetShopDatabase
      id: package_db
      uses: OctopusDeploy/create-zip-package-action@v3
      with:
        package_id: OctoPetShop.Database
        base_path: "artifacts/OctopusSamples.OctoPetShop.Database"
        version: "${{ env.PACKAGE_VERSION  }}"
        files: "**/*"
        output_folder: artifacts
    
    - name: Package OctoPetShopWeb
      id: package_web
      with:
        package_id: OctoPetShop.Web
        base_path: "artifacts/OctopusSamples.OctoPetShop.Web"
        version: "${{ env.PACKAGE_VERSION  }}"
        files: "**/*"
        output_folder: artifacts
    
    - name: Package OctoPetShopProductService
      id: package_productservice
      with:
        package_id: OctoPetShop.ProductService
        base_path: "artifacts/OctopusSamples.OctoPetShop.ProductService"
        version: "${{ env.PACKAGE_VERSION  }}"
        files: "**/*"
        output_folder: artifacts
    
    - name: Package OctoPetShopShoppingCartService
      id: package_cartservice
      with:
        package_id: OctoPetShop.ShoppingCartService
        base_path: "artifacts/OctopusSamples.OctoPetShop.ShoppingCartService"
        version: "${{ env.PACKAGE_VERSION  }}"
        files: "**/*"
        output_folder: artifacts

    - name: Push OctoPetShopDatabase
      uses: OctopusDeploy/push-package-action@v3
      with:
        packages: ${{ steps.package_db.outputs.package_file_path }}

    - name: Push OctoPetShopWeb
      uses: OctopusDeploy/push-package-action@v3
      with:
        packages: ${{ steps.package_web.outputs.package_file_path }}

    - name: Push OctoPetShopProductService
      uses: OctopusDeploy/push-package-action@v3
      with:
        packages: ${{ steps.package_productservice.outputs.package_file_path }}

    - name: Push OctoPetShopShoppingCartService
      uses: OctopusDeploy/push-package-action@v3
      with:
        packages: ${{ steps.package_cartservice.outputs.package_file_path }}

    - name: Create a release in Octopus Deploy
      uses: OctopusDeploy/create-release-action@v3
      id: "create_release"
      with:
        project: "Pet Shop"
        package_version: "${{ env.PACKAGE_VERSION  }}"

    - name: Deploy the release in Octopus Deploy
      uses: OctopusDeploy/deploy-release-action@v3
      with:
        project: "Pet Shop"
        release_number: ${{ steps.create_release.outputs.release_number }}
        environments: |
          Development
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

[Build information](/docs/packaging-applications/build-servers/build-information/index.md) contains a link 
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

:::success
**Example GitHub Actions Repo:**

View a working GitHub Actions examples on our [samples GitHub repository](https://github.com/OctopusSamples).
- [.NET Core](https://github.com/OctopusSamples/OctoPetShop/blob/master/.github/workflows/dotnet-core.yml)
- [Java using Maven](https://github.com/OctopusSamples/RandomQuotes-Java/blob/master/.github/workflows/maven.yml)
:::
