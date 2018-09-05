---
title: Raw Scripting
description: Raw Scripting allows you to transfer packages and execute scripts against SSH deployment targets where you are unable to install and run Mono.
position: 2
---

## Design Intentions {#RawScripting-DesignIntentions}

Some Octopus users deploying to SSH Endpoints have had problems installing the Mono prerequisite that provides the runtime for Octopus Deploy's .NET orchestration tool [Calamari](/docs/api-and-integration/calamari.md). Although there is some momentum to package Calamari in a self-contained, cross-platform way with .NET Core, there exists a need now to be able to execute scripts directly on the server without all the added cost and complexity of uploading the latest Calamari. An experiential feature has been provided in **Octopus 3.9**, accessible via a project variable which will simply open a connection to the remote server and execute a deployment script within that session.

:::hint
**Feature Tradeoffs**
In order to provide the ability to perform raw scripting and just execute exactly what the step requires on the remote target, the script execution through Calamari is bypassed. This results in some behavioral differences as compared with the normal scripting in Octopus that you would be accustomed to.

The script that is provided by the user is executed "as-is" through the open SSH connection so the actual shell will depend on what you have configured for that account and it may not actually be bash. Keep this in mind when expecting certain commands to be available.

The bootstrapping script that is provided by Calamari will not be available and so you will lose the ability to use helper functions like [new\_octopusartifact](/docs/deployment-process/artifacts.md), [set\_octopusvariable](/docs/deployment-process/variables/output-variables.md) or [get\_octopusvariable](/docs/deployment-examples/custom-scripts/index.md). You can still use the standard **#{MyVariable}** variable substitution syntax however since this is replaced on the server, environment variables from your target will not be available through Octopus variables.

While still available as an option in the UI, raw scripts cannot currently be sourced from inside a package unless manually extracted & executed in conjunction with a `Transfer a Package` step.
:::

Raw scripting is great for use cases where you are unable to install and run Mono for example your server platform is unsupported by Mono or deploying to an IOT device that does not meet the hardware requirements to run Mono. By eliminating Calamari as the middle man in these deployments, you may also shave a few seconds off your deployment for each step.

## Deploying To SSH Endpoint Without Calamari (i.e. no Mono prerequisite) {#RawScripting-DeployingToSSHEndpointWithoutCalamari(i.e.noMonoprerequisite)}

While raw scripting does not require a Transfer a Package step, the below scenario walks though a basic scenario of using a raw script in conjunction with the Transfer a Package step to extract a package on a SSH endpoint where Mono is unable to be installed.

1. Add a [Transfer A Package](/docs/deployment-examples/deploying-packages/transfer-package.md) step.
2. In the **Transfer Path** field enter the location the package will be moved to as part of the deployment, for instance, `~/temp/uploads`.  Note that this directory will be created if it does not already exist. Give the step the name *Transfer AcmeWeb* and Include the relevant role for your SSH target.
3. Add a [Run A Script](/docs/deployment-examples/custom-scripts/standalone-scripts.md) step and explicitly clear and extract the package to your desired location. In the below example we know that the target shell will be bash so we can use output values from the previous *Transfer AcmeWeb* step to locate the package and extract it to a directory at *~/temp/somewhere*. Note that although we have selected the *Bash* script type for this step, this is purely for helpful syntax highlighting since whatever script is provided will be executed through the open connection regardless of selected type.

   ```bash
   rm -fr ~/temp/somewhere
   unzip -d ~/temp/somewhere "#{Octopus.Action[Transfer AcmeWeb].Output.Package.FilePath}"
   ```
4. On the Variables tab set the variable `OctopusUseRawScript` to the value `True` which instructs Octopus to perform package transfers and script execution without the aid of Calamari. This means that package transfer will not be able to use [delta compression](/docs/deployment-examples/deploying-packages/delta-compression-for-package-transfers.md) during the package acquisition phase and it will actually be _moved_ from the upload location when the transfer step runs. This is because no target-side logs are kept for this transfer and hence [retention policy](/docs/administration/retention-policies/index.md) will be unable to clean old packages.

5. Create a release and deploy the project. You should notice that unlike a typical deployment, there are no calls to upload or run Calamari and the whole thing runs a bit faster due to the reduced overhead. If you check your *~/.octopus* directory on the remote endpoint, you should also notice that there are no Calamari dependencies that have had to be uploaded for this deployment.  

:::hint
**Raw Target Health Checks** {#RawScripting-HealthChecks}
Given that the point of raw scripting is to avoid having to install Mono and Calamari, you may need to create a custom [Machine Policy](/docs/infrastructure/machine-policies.md) and select the `Only perform connection test` option under the section `Health check for SSH endpoints`. Targets configured with this policy will be considered healthy so long as a SSH connection can be established.

![](/docs/images/machine-policies/ssh-healthchecks.png "width=300")

Using a standard machine policy will otherwise result in the endpoint being considered unhealthy if it is unable to find Mono or Calamari.
:::

## Raw Tentacles {#RawScripting-RawTentacles}

Raw scripting is also supported on standard Windows based Tentacles however in this case the scripts will always be executed in the context of a PowerShell session. Keep in mind that this still means that you need a fully functioning Tentacle actually running on the remote target.
