---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: BitBucket Pipelines
description: Octopus Deploy can be integrated with your BitBucket Pipelines build chain with the help of the Octopus CLI.
navOrder: 40
---

[Bitbucket](https://bitbucket.org/) is a git-based source-control platform made by Atlassian that serves as an alternative to GitHub with free unlimited private repos.

[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) is Atlassian's cloud-based continuous integration server, built using pre-configured docker containers.

:::div{.warning}
As Bitbucket Pipelines is only available as a cloud offering, your Octopus Server must be accessible over the Internet.
:::

## Integrating with Bitbucket Pipelines

When using Octopus Deploy with BitBucket, BitBucket Pipelines will be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating packages for deployment.

Octopus Deploy will be used to take those packages and to push them to development, test, and production environments.

Octopus Deploy can be integrated with BitBucket Pipelines in two ways:

- Using the up-to-date [Octopus CLI Docker image](https://hub.docker.com/r/octopusdeploy/octo/) of the [Octopus CLI](/docs/octopus-rest-api/octopus-cli) command-line tool.
- Using the new **experimental** BitBucket Pipe called [octopus-cli-run](https://bitbucket.org/octopusdeploy/octopus-cli-run/src/master/README/).

:::div{.warning}
 
**Experimental Pipe:**

The `octopus-cli-run` Bitbucket Pipe is currently experimental.

If you want to try the latest integration, and only need to use some of the more commonly used commands, for example, to manage your packages, releases, and deployments, then using the experimental Pipe might be the right choice for you. 

However, if you need full control over integrating your Bitbucket Pipeline with Octopus, the pre-configured CLI Docker image is the recommended method to do that. 
:::

## BitBucket Pipelines environment variables

You can use [environment variables](https://confluence.atlassian.com/bitbucket/variables-in-pipelines-794502608.html) in your Pipelines (available from the **Settings ➜ Environment Variables** menu of your BitBucket repository), which is a great place to store sensitive information such as your Octopus Deploy API keys (which is ideally not something you store in your source control).

For example:

| Variable name       | Description|
| ------------- | ------- |
| OCTOPUS_SERVER | The Octopus Server URL you wish to push the final package to |
| OCTOPUS_APIKEY | The Octopus Deploy API Key required for authentication |

## BitBucket Pipeline configuration

When you enable BitBucket Pipelines for your repository, BitBucket stores all the information it requires into a `bitbucket-pipelines.yml` file in the base of your repository. This is the file we need to modify to run our build, pack and/or push package commands.

### Docker CLI Example of packing and pushing

Here's an example pipeline step that demonstrates using the `octo` CLI Docker image, which packs the current state of your repository into a zip file and then pushes that package to Octopus Deploy.

```yaml
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

### Pipe example of packing and pushing

To show how you can achieve the same pack and push commands as above, here's an example pipeline step, but this time using the `octopus-cli-run` Bitbucket Pipe.

```yaml
- step:
    name: octo pack + push
    script:
      - pipe: !include <image-version-octo-bitbucket-pipe>
        variables:
          CLI_COMMAND: 'pack'
          ID: $BITBUCKET_REPO_SLUG
          FORMAT: 'Zip'
          VERSION: $VERSION
          OUTPUT_PATH: './out'
      - pipe: !include <image-version-octo-bitbucket-pipe>
        variables:
          CLI_COMMAND: 'push'
          OCTOPUS_SERVER: $OCTOPUS_SERVER
          OCTOPUS_APIKEY: $OCTOPUS_API_KEY
          OCTOPUS_SPACE: $OCTOPUS_SPACE
          PACKAGES: [ "./out/$BITBUCKET_REPO_SLUG.$VERSION.zip" ]
```

:::div{.success}
**Example Bitbucket Pipeline with octopus-cli-run Pipe:**
View a working Pipeline example on our [samples Bitbucket repository](https://bitbucket.org/octopussamples/petclinic/addon/pipelines/home#!/).

See the corresponding Octopus project on our [samples instance](https://samples.octopus.app/app#/Spaces-85/projects/petclinic/).
:::

## Learn more

- [Bitbucket feature documentation](https://bitbucket.org/product/features/pipelines)
- [Bitbucket Pipe for Octopus Deploy: octopus-cli-run](https://octopus.com/blog/octopus-bitbucket-pipe)
- [Bitbucket Pipelines: Pipes and integrating with Octopus Deploy](https://octopus.com/blog/bitbucket-pipes-and-octopus-deploy)
- [Webinar: Integrating your Atlassian Cloud Pipeline with Octopus Deploy](https://youtube.com/embed/yPjooXDJUA0)
