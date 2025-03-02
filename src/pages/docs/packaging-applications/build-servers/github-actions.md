---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-11-21
title: GitHub Actions
description: Integrating Octopus Deploy into your GitHub Action workflows
icon: fa-brands fa-github
navOrder: 55
---

Use [GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) to orchestrate Octopus from your CI pipeline for a seamless CI/CD workflow. 

Integrating GitHub Actions with Octopus Deploy allows you to trigger events in Octopus (like creating a Release) based on events in GitHub (like pushing to main) for an effortless transition from CI to CD.

## Octopus Deploy Actions

Octopus Deploy provides GitHub Actions which enable you to:
- [Login to Octopus Deploy](https://github.com/marketplace/actions/login-to-octopus-deploy)
- [Install Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli)
- [Create a Release](https://github.com/marketplace/actions/create-release-in-octopus-deploy)
- [Deploy a Release](https://github.com/marketplace/actions/deploy-a-release-in-octopus-deploy)
- [Deploy a Tenanted Release](https://github.com/marketplace/actions/deploy-a-tenanted-release-in-octopus-deploy)
- [Run a Runbook](https://github.com/marketplace/actions/run-runbook-in-octopus-deploy)
- [Push Build Information](https://github.com/marketplace/actions/push-build-information-to-octopus-deploy)
- [Create a Zip Package](https://github.com/marketplace/actions/create-zip-package-for-octopus-deploy)
- [Create a NuGet Package](https://github.com/marketplace/actions/create-nuget-package-for-octopus-deploy)
- [Push Packages to Octopus Deploy](https://github.com/marketplace/actions/push-package-to-octopus-deploy)
- [Wait for/ watch an Execution Task](https://github.com/marketplace/actions/wait-watch-an-execution-task-in-octopus-deploy)

## Getting started

Octopus Deploy GitHub Actions can be easily incorporated into your own GitHub Action workflows by including them as steps in your workflow YAML. Here is a simple workflow YAML to get you started.

### Example workflow - Create and deploy a release
```yaml
# .github/workflows/hello-octopus-deploy.yml
name: Hello Octopus Deploy

on:
  workflow_dispatch:

jobs:
  octopus-deployment:
    runs-on: ubuntu-latest

    permissions:
      id-token: write # Required by login action

    env:
      OCTOPUS_SPACE: 'Outer Space'
      # Supply the following values if not using the login action:
      # OCTOPUS_API_KEY: ${{ secrets.API_KEY  }}
      # OCTOPUS_URL: ${{ secrets.SERVER }}

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    # Your own build steps go here!
    - name: Your build ✨
      run: echo "Your build steps!"

    # Action to Login to Octopus Deploy
    - name: Login to Octopus Deploy 🐙
      uses: OctopusDeploy/login@v1
      with: 
        server: ${{ secrets.SERVER }}
        service_account_id: a1a1a1a1-b2b2-c3c3-d4d4-e5e5e5e5e5e5
    
    # Action to Create a Release
    - name: Create a release in Octopus Deploy 🐙
      uses: OctopusDeploy/create-release-action@v3
      with:
        project: 'MyProject'
        release_number: '1.0.0'
        git_ref: ${{ github.ref }}
        git_commit: ${{ github.sha }}
    
    # Action to Deploy a Release
    - name: Deploy a release in Octopus Deploy 🐙
      uses: OctopusDeploy/deploy-release-action@v3
      with:
        project: 'MyProject'
        release_number: '1.0.0'
        environments: |
            Dev
            Test
        variables: |
            Flip: Bling
            Fizz: Buzz
```

### ✍️ Environment variables

| Name              | Description                                                                                                                                              |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OCTOPUS_SPACE`   | The Name of the Space where this command will be executed.                                                                                               |
| `OCTOPUS_URL`     | The base URL hosting Octopus Deploy (i.e. `https://octopus.example.app`). It is strongly recommended that this value retrieved from a [GitHub secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions). |
| `OCTOPUS_API_KEY` | The API key used to access Octopus Deploy. It is strongly recommended that this value retrieved from a [GitHub secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions). |


### 📥 Inputs

| Name                  | Description                                                                                                                                          |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project`             | The name of the Project associated with this Release.                                                                                                |
| `release_number`      | The number for the new Release. If omitted, Octopus Deploy will generate a Release number.                                                           |
| `environments`        | A list of Environments in Octopus Deploy in which to run (i.e. Dev, Test, Prod). Add each environment on a new line.                                 |
| `variables`           | A list of Variables to use in the Deployment in `key: value` format. Add each variable on a new line.                                                |
| `git_ref`             | The Git branch from which to source the project code. Required for Projects using version control in Octopus. The example above sources this value from the workflow's [contextual information.](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context) |
| `git_commit`          | The Git commit from which to source the project code. Required for Projects using version control in Octopus. The example above sources this value from the workflow's [contextual information.](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context) |
| `server`              | The base URL hosting Octopus Deploy (i.e. `https://octopus.example.app`). It is strongly recommended that this value retrieved from a [GitHub secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions). |
| `service_account_id`  | The id of the OIDC service account you wish to login as. Service accounts can be viewed and created on the Octopus app under 'Users' on the configuration menu. |


## Handling packages

To help you package your files for deployment, Octopus Deploy provides actions to [Create a Zip Package](https://github.com/marketplace/actions/create-zip-package-for-octopus-deploy) or [Create a NuGet Package](https://github.com/marketplace/actions/create-nuget-package-for-octopus-deploy). 

Alternatively, you can [Install the Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli) and create packages using the [pack command](https://octopus.com/docs/octopus-rest-api/octopus-cli/pack). 

Once your packages are created, simply push them to the Octopus Server built-in repository using our [Push Packages](https://github.com/marketplace/actions/push-package-to-octopus-deploy) Octopus Action. 

You can confirm that your packages have been successfully added by checking for them in your Space under 'Packages'.

Here is a simple example of how to create, push and use a Zip package in a Release.

### Example workflow - Working with packages
```yaml
# .github/workflows/hello-octopus-packages.yml
name: Hello Octopus Packages

on:
  workflow_dispatch:

jobs:
  octopus-packages:
    runs-on: ubuntu-latest

    permissions:
      id-token: write # Required by login action

    env:
      OCTOPUS_SPACE: 'Outer Space'

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      # Action to Login to Octopus Deploy
      - name: Login to Octopus Deploy 🐙
        uses: OctopusDeploy/login@v1
        with: 
          server: ${{ secrets.SERVER }}
          service_account_id: a1a1a1a1-b2b2-c3c3-d4d4-e5e5e5e5e5e5
      
      # Action to Create a Zip Package
      - name: Create a Zip package 🐙
        uses: OctopusDeploy/create-zip-package-action@v3
        with:
          package_id: 'HelloPackage'
          version: '1.0.0'
          output_folder: './packages/'
          base_path: './src/files-to-package/'
          files: |
            **/*.*
      
      # Action to Push Packages to Octopus Deploy
      - name: Push a package to Octopus Deploy 🐙
        uses: OctopusDeploy/push-package-action@v3
        with:
          packages: |
            packages/**/*.zip
      
      # Using your Package in a Release
      - name: Use the Package in a Release 🎉
        uses: OctopusDeploy/create-release-action@v3
        with:
          project: 'MyProject'
          release_number: '1.0.0'
          git_ref: ${{ github.ref }}
          git_commit: ${{ github.sha }}
          packages: |
            HelloPackage:1.0.0
```

### 📥 Additional inputs

| Name                  | Description                                                                                                      |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------|
| `package_id`          | The name of the package.                                                                                         |
| `version`             | The version of the package.                                                                                      |
| `output_folder`       | The folder to put the resulting package in, relative to the current working directory.                           |
| `base_path`           | The path to the folder containing the files to be used in the package                                            |
| `files`               | A list of files to be included in the package relative to the base path. Add each item on a new line.            |
| `packages`            | Used by the Push Packages action. A list of packages to push to Octopus Deploy. Add each item on a new line.     |
| `packages`            | Used by the Create Release action. A list of packages to be used in the Release. Add each item on a new line.    |

## Runners

Octopus Deploy GitHub Actions can be run on every available type of [runner](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions#runners) (Ubuntu Linux, Microsoft Windows, macOS, and Self-Hosted). 

If your Octopus Server is not accessible over the internet, you can connect to it using a [Self-Hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).


## Sequencing tasks

It can be useful to run multiple Octopus Deploy GitHub Actions in sequence as part of a workflow. To do this, simply include each Octopus Action as a step within a single job. 

If you need to run sequential actions in separate jobs, you can also configure your jobs to run sequentially by [defining prerequisite jobs](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-jobs-in-a-workflow#defining-prerequisite-jobs).


## Previous versions

Since the release of v3, Octopus Deploy GitHub Actions no longer need the [Install Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli) package to be installed before running. [Each Octopus Action](#octopus-deploy-actions) introduced before v3 provides a guide to migrating to v3.
