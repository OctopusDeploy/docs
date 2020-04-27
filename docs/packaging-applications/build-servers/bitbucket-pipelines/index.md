---
title: BitBucket Pipelines
description: Octopus Deploy can be integrated with your BitBucket Pipelines build chain with the help of the Octopus CLI.
position: 40
---

[Bitbucket](https://bitbucket.org/) is a git-based source-control platform made by Atlassian that serves as an alternative to GitHub with free unlimited private repos.

[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) is Atlassian's cloud-based continuous integration server, built using pre-configured docker containers.

Octopus Deploy can be integrated with BitBucket Pipelines using our up-to-date [Octopus CLI docker container image](https://hub.docker.com/r/octopusdeploy/octo/) of our [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md) command line tool.

When using Octopus Deploy with BitBucket, BitBucket Pipelines will be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating NuGet packages for deployment.

Octopus Deploy will be used to take those NuGet packages and to push them to development, test and production environments.

:::warning
If you're using the cloud offering of BitBucket Pipelines, your Octopus Server must be accessible over the Internet.
:::

## BitBucket Pipelines environment variables

You can use environment variables in your Pipelines (available from the **{{Settings > Environment Variables}}** menu of your BitBucket repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is ideally not something you store in your source control).

For example:

| Variable name       | Description|
| ------------- | ------- |
| OCTOPUS_SERVER | The Octopus Server URL you wish to push the final package to |
| OCTOPUS_APIKEY | The Octopus Deploy API Key required for authentication |

## BitBucket pack and push configuration

When you enable BitBucket Pipelines for your repository, BitBucket stores all the information it requires into a `bitbucket-pipelines.yml` file in the base of your repository. This is the file we need to modify to run our build, pack and/or push package commands.

### Example of packing and pushing

To show the basics working, here's an example pipeline step using the Octo.exe docker container which packs the current state of your repository into a zip file and then pushes that package to Octopus Deploy.

```yml
pipelines:
  default:
    - step:
        name: Deploy to Octopus
        image: !include <image-version-octo-alpine>
        script:
          - export VERSION=1.0.$BITBUCKET_BUILD_NUMBER
          - octo pack --id $BITBUCKET_REPO_SLUG --version $VERSION --outFolder ./out --format zip
          - octo push --package ./out/$BITBUCKET_REPO_SLUG.$VERSION.zip  --server $OCTOPUS_SERVER --apiKey $OCTOPUS_APIKEY
```

## Learn more

- [Bitbucket feature documentation](https://bitbucket.org/product/features/pipelines)
- [Webinar: Integrating your Atlassian Cloud Pipeline with Octopus Deploy](youtube.com/embed/yPjooXDJUA0)
