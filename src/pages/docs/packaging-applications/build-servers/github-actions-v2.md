---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-09-27
title: GitHub Actions
description: GitHub Actions can leverage the Octopus CLI to pack, build, push, and create releases for Octopus Deploy.
icon: fa-brands fa-github
navOrder: 55
---

<!-- // cc Move into old file when done -->

Integrating Github Actions with Octopus Deploy allows you to trigger events in Octopus (e.g. create a release) based on events in Github (e.g. pushing to main). 

## What can you do with Octopus Deploy GitHub Actions

Octopus Deploy provides custom GitHub Actions which enable you to: <!-- Custom workflow extensions -->
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
- [Wait/watch an Execution Task](https://github.com/marketplace/actions/wait-watch-an-execution-task-in-octopus-deploy)

See each action above for examples of how to include it in your own GitHub Action workflow.

## How to use our Actions in your Workflow

Octopus Deploy GitHub Actions can be easily incorporated into your GitHub Action workflow by including them as steps in your workflow YAML. Here is a simple GitHub Action workflow YAML to get you started:

### Example YAML - Create and Deploy a Release
```
# .github/workflows/hello-octopus-deploy.yml
name: Hello Octopus Deploy

on:
  workflow_dispatch:

jobs:
  say_hello:
    runs-on: ubuntu-latest

    permissions:
      id-token: write # Required by the login action below

    env:
      OCTOPUS_SPACE: 'Outer Space'
      # Supply the following values to skip the login action:
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
        server: https://my-octopus.octopus.app
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

## ✍️ Environment Variables

| Name              | Description                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OCTOPUS_SPACE`   | The Name of a space within which this command will be executed.                                                                                      |
| `OCTOPUS_URL`     | The base URL hosting Octopus Deploy (i.e. `https://octopus.example.app`). It is strongly recommended that this value retrieved from a GitHub secret. |
| `OCTOPUS_API_KEY` | The API key used to access Octopus Deploy. It is strongly recommended that this value retrieved from a GitHub secret.                                |

## 📥 Inputs

| Name                  | Description                                                                                                                                          |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project`             | The name of the Project associated with this Release.                                                                                                |
| `release_number`      | The number for the new Release. If omitted, Octopus Deploy will generate a Release number.                                                           |
| `environments`        | A list of environments in Octopus Deploy in which to run (i.e. Dev, Test, Prod). Add each environment on a new line.                                 |
| `variables`           | A list of variables to use the the Deployment in `key: value` format. Add each variable on a new line.                                               |
| `git_ref`             | The Git branch from which to source the project code. Required for Projects using version control in Octopus.                                        |
| `git_commit`          | The Git commit from which to source the project code. Required for Projects using version control in Octopus.                                        |
| `server`              | The URL of your Octopus server. Required only if using the login action.                                                                             |
| `service_account_id`  | The id of the service account you wish to login as. Required only if using the login action.                                                         |

