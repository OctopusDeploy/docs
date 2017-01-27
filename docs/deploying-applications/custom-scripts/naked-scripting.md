---
title: Naked Scripting
position: 2
---

## Design Intentions {#NakedScripting-DesignIntentions}

Some Octopus users deploying to SSH Endpoints have had problems installing the Mono prerequisite that provides the runtime for Octopus Deploy's .NET orchestration tool [Calamari](/docs/api-and-integration/calamari.md). Although there is some momentum to package Calamari in a self-contained, cross-platform way with .NET Core, there exists a need now to be able to execute scripts directly on the server without all the added cost and complexity of uploading the latest Calamari. An experiential feature has been provided in Octopus 3.9, accessible via a project variable which will simply open a connection to the remote server and execute a deployment scrip within that session.

:::hint
**Feature Tradeoffs**
In order to provide the ability to perform naked scripting and just execute exactly what the step requires on the remote target, the script execution through Calamari was removed. This results in some behavioral differences as compared with the normal scripting in Octopus that you would be accustomed to.

The script that is provided is executed "as-is" through the open SSH connection so the actual shell will depend on what you have configured for that account and it may not actually be bash. Keep this in mind when expecting certain commands to be available.

The bootstrapping script that is provided by Calamari will not be available and so you will loose the ability to use helper functions like [new\_octopusartifact](/docs/deploying-applications/artifacts.md), [set\_octopusvariable](/docs/deploying-applications/variables/output-variables.md) or [get\_octopusvariable](/docs/deploying-applications/custom-scripts/index.md). You can however still use the standard **#{MyVariable}** variable substitution syntax however since this is replaced on the server, environment variables from your target will not be available.
:::

Naked scripting is great for cases where you are unable to install and run Mono limitations like a your server platform being unsupported by Mono or using an IOT device that does not meet the hardware requirements to run Mono. By eliminating Calamari as the middle man in these deployments, you may also shave a few seconds off your deployment for each step.

## Deploying To SSH Endpoint Without Calamari (i.e. no Mono prerequisite) {#NakedScripting-DeployingToSSHEndpointWithoutCalamari(i.e.noMonoprerequisite)}

While naked scripting does not require a Transfer a Package step, the below scenario walks though a basic scenario of using a naked script in conjunction with the Transfer a Package step to extract a package on a SSH endpoint where Mono is unable to be installed.

1. Add a [Transfer A Package](/docs/deploying-applications/deploying-packages/transfer-package.md) step and provide a temporary location that it should be moved to. Give it the name *Transfer AcmeWeb* and Include the relevant role for your SSH target. Note that this directory will be created if it does not already exist.
   ![](/docs/images/5671696/5866195.png "width=500")
2. Add a [Run A Script](/docs/deploying-applications/custom-scripts/standalone-scripts.md) step and explicitly clear and extract the package to your desired location. In the below example we know that the target shell will be bash so we can use output values from the previous *Transfer AcmeWeb*step to locate the package and extract it to a directory at *~/temp/somewhere*. Note that although we have selected the *Bash* script type for this step, this is purely for helpful syntax highlighting since whatever script is provided will be executed through the open connection regardless of selected type.

   ```bash
   rm -fr ~/temp/somewhere
   unzip -d ~/temp/somewhere "#{Octopus.Action[TransferAcmeWeb].Output.Octopus.Action.Package.FilePath}"
   ```
    ![](/docs/images/5671696/5866196.png "width=500")
3. On the Variables tab set the following variables:

   | Variable                                | Value | Reason                                   |
   | --------------------------------------- | ----- | ---------------------------------------- |
   | Octopus.Acquire.DeltaCompressionEnabled | False | By setting Delta Compression to false, we will ensure that Calamari will not be needed during the package acquisition phase to determine if the package already exists on the remote target. The Package will be pushed to the remote target *on every deployment.* This is a project global variable and so will apply to any steps that require package acquisition for a given deployment. |
   | OctopusUseNakedScript                   | True  | This variable (which can be scoped to the relevant context) instructs Octopus to simply execute the provided script without going through Calamari. |
4. Create a release and deploy the project. You should notice that unlike a typical deployment, there are no calls to upload or run Calamari and the whole thing runs a bit faster due to the reduced overhead. If you check your *~/.octopus* directory on the remote endpoint, you should also notice that there are no Calamari dependencies that have had to be uploaded for this deployment.
   ![](/docs/images/5671696/5866197.png "width=500")

## Naked Tentacles {#NakedScripting-NakedTentacles}

Naked scripting is also supported on standard Windows based Tentacles however in this case the scripts will always be executed in the context of a PowerShell session. Keep in mind that this still means that you need a fully functioning Tentacle actually running on the remote target.
