---
title: BitBucket Pipelines
description: Octopus Deploy can be integrated with your BitBucket Pipelines build chain with the help of Octo.exe.
position: 121
---

[Bitbucket](https://bitbucket.org/) is a git-based source-control platform made by Atlassian that serves as an alternative to GitHub with free unlimited private repos.

[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) is Atlassian's cloud-based continuous integration server, built using pre-configured docker containers.

Octopus Deploy can be integrated with BitBucket Pipelines using our up-to-date [Octo.exe docker container image](https://hub.docker.com/r/octopusdeploy/octo/) of our [Octo.exe](https://octopus.com/docs/api-and-integration/octo.exe-command-line) command line tool.

When using Octopus Deploy with BitBucket, BitBucket Pipelines will be responsible for:

- Checking for changes in source control
- Compiling the code
- Running unit tests
- Creating NuGet packages for deployment

Octopus Deploy will be used to take those NuGet packages and to push them to development, test and production environments.

:::warning
If you're using the cloud offering of BitBucket Pipelines, your Octopus server must be accessible over the Internet.
:::

### BitBucket Pipelines Environment Variables

You can use environment variables in your Pipelines (available from the `Settings > Environment Variables` menu of your BitBucket repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is ideally not something you store in your source control).

For example:

| Variable Name       | Description|
| ------------- | ------- |
| OCTOPUS_SERVER | The Octopus Deploy server URL you wish to push the final package to |
| OCTOPUS_APIKEY | The Octopus Deploy API Key required for authentication |

## BitBucket Pack and Push Configuration

When you enable BitBucket Pipelines for your repository, BitBucket stores all the information it requires into a `bitbucket-pipelines.yml` file in the base of your repository. This is the file we need to modify to run our build, pack and/or push package commands.

### Example of Packing and Pushing

To show the basics working, here's an example pipeline step using the Octo.exe docker container which packs the current state of your repository into a zip file and then pushes that package to Octopus Deploy.

```yml
pipelines:
  default:
    - step:
        name: Deploy to Octopus
        image: octopusdeploy/octo:4.37.0-alpine
        script:
          - export VERSION=1.0.$BITBUCKET_BUILD_NUMBER
          - octo pack --id $BITBUCKET_REPO_SLUG --version $VERSION --outFolder ./out --format zip
          - octo push --package ./out/$BITBUCKET_REPO_SLUG.$VERSION.zip  --server $OCTOPUS_SERVER --apiKey $OCTOPUS_APIKEY
```

## Further Information
For more in-depth information about using BitBucket Pipelines, we would recommend checking out their [feature documentation](https://bitbucket.org/product/features/pipelines).