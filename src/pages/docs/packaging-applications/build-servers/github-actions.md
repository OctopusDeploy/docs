---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-09-27
title: GitHub Actions
description: Integrating Octopus Deploy into your GitHub Action workflows
icon: fa-brands fa-github
navOrder: 55
---

Integrating [GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) with Octopus Deploy allows you to trigger events in Octopus (e.g. create a Release) based on events in GitHub (e.g. pushing to main). 

## Octopus Deploy Actions

Octopus Deploy provides GitHub Actions which enable you to:
- [Login to Octopus Deploy](https://github.com/marketplace/actions/login-to-octopus-deploy)
- [Install Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli)
- [Create a Release](https://github.com/marketplace/actions/create-release-in-octopus-deploy)
- [Deploy a Release](https://github.com/marketplace/actions/deploy-a-release-in-octopus-deploy)
- [Deploy a Tenanted Release](https://github.com/marketplace/actions/deploy-a-tenanted-release-in-octopus-deploy)
- [Run a Runbook](https://github.com/marketplace/actions/run-runbook-in-octopus-deploy)
- [Push Build Information](https://github.com/marketplace/actions/push-build-information-to-octopus-deploy)
- [Create a NuGet Package](https://github.com/marketplace/actions/create-nuget-package-for-octopus-deploy)
- [Create a Zip Package](https://github.com/marketplace/actions/create-zip-package-for-octopus-deploy)
- [Push Packages](https://github.com/marketplace/actions/push-package-to-octopus-deploy)
- [Wait for/ watch an Execution Task](https://github.com/marketplace/actions/wait-watch-an-execution-task-in-octopus-deploy)

## Getting Started

Octopus Deploy GitHub Actions can be easily incorporated into your own GitHub Action workflows by including them as steps in your workflow YAML. Here is a simple GitHub Action workflow YAML to get you started.

### Example Workflow - Create and Deploy a Release
```yaml
# .github/workflows/hello-octopus-deploy.yml
name: Hello Octopus Deploy

on:
  workflow_dispatch:

jobs:
  say_hello:
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
        git_ref: ${{ github.ref }}
        git_commit: ${{ github.sha }}
```

### ✍️ Environment Variables

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
| `git_ref`             | The Git branch from which to source the project code. Required for Projects using version control in Octopus.                                        |
| `git_commit`          | The Git commit from which to source the project code. Required for Projects using version control in Octopus.                                        |
| `server`              | The base URL hosting Octopus Deploy (i.e. `https://octopus.example.app`). It is strongly recommended that this value retrieved from a [GitHub secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions). |
| `service_account_id`  | The id of the service account you wish to Login as.                                                                                                  |

## Runners

Octopus Deploy GitHub Actions can be run on every available type of [runner](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions#runners) (Ubuntu Linux, Microsoft Windows, macOS, and Self-Hosted). 

If your Octopus Server is not accessible over the internet, you can connect to it using a [Self-Hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).


## Sequencing Tasks

It can be useful to run multiple Octopus Deploy GitHub Actions in sequence as part of a larger workflow. To do this, simply include each Octopus Action as a step within a single job. 

If you need to run sequential Octopus Actions in separate jobs, you can also configure your jobs to run sequentially by [defining prerequisite jobs](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-jobs-in-a-workflow#defining-prerequisite-jobs).


## Previous Versions

Since the release of v3, Octopus Deploy GitHub Actions no longer need the [Install Octopus CLI](https://github.com/marketplace/actions/install-octopus-cli) package to be installed before running. Each Octopus Action introduced before v3 provides a guide to migrating to v3.
