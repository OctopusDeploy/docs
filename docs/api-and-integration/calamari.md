---
title: Calamari
description: Calamari is the command-line tool invoked by Tentacle during a deployment. It knows how to extract and install NuGet packages, run the Deploy.ps1 etc. conventions, modify configuration files, and all the other things that happen during an deployment.
position: 100
---

Prior to **Octopus 3.0**, Tentacles were responsible for performing deployment steps.  Tentacles were *smart*.They knew how to transform configuration files, modify IIS, and much, much more.

![](/docs/images/3048177/3278198.png)

There were a few cons to this architecture:

- To add or modify features, a new version of the Tentacle service was required.  And some folks have a *lot* of Tentacles.
- Deploying to a target which shouldn't require a Tentacle (e.g. an Azure WebSite), required that the deployment go via a Tentacle.
- This wouldn't support SSH targets.  All SSH can do is to run commands and move files. All the logic and conventions for configuration transforms, etc. would need to be pushed from the Octopus Server.

And so the *communication channel* (Tentacle) was decoupled from the *deployment engine*: Calamari was born.

Calamari is an [open-source](https://github.com/OctopusDeploy/Calamari), console-application.  It supports many commands, which are responsible for performing deployment-steps.  For example:

```bash
Calamari deploy-package --package MyPackage.nupkg --variables Variables.json
```

Calamari has commands to support:

- Deploying NuGet packages
- Running scripts (PowerShell, ScriptCS, Bash, F#)
- Deploying packages to Azure targets (Cloud Services, WebApps)
- Various other deployment related activities

It is our deployment Swiss Army knife.

![](/docs/images/3048177/3278197.png "width=300")

Each deployment, if it is not already present, the latest version of the Calamari executable is pushed to wherever it needs to be.  This may be to

- a Tentacle
- via SSH to a Linux machine
- a network-drive for Offline-Package-Drop targets
- or locally on the Octopus Server for deploying to Azure targets

Deployments now proceed as follows:

1. Octopus acquires packages and generates variables files
2. The packages and variables are pushed to the the target, along with the latest version of Calamari (if it is not already present)
3. The deployment target invokes Calamari to perform each deployment step
4. Calamari performs the deployment step

Now that Calamari is open-source, it might help answer any questions you had around what happens during a deployment.  For example, did you ever wonder what order conventions run in when deploying a package?

```c#
var conventions = new List<IConvention>
{
   new ContributeEnvironmentVariablesConvention(),
   new ContributePreviousInstallationConvention(journal),
   new LogVariablesConvention(),
   new AlreadyInstalledConvention(journal),
   new ExtractPackageToApplicationDirectoryConvention(new LightweightPackageExtractor(), fileSystem, semaphore),
   new FeatureScriptConvention(DeploymentStages.BeforePreDeploy, fileSystem, embeddedResources, scriptCapability, commandLineRunner),
   new ConfiguredScriptConvention(DeploymentStages.PreDeploy, scriptCapability, fileSystem, commandLineRunner),
   new PackagedScriptConvention(DeploymentStages.PreDeploy, fileSystem, scriptCapability, commandLineRunner),
   new FeatureScriptConvention(DeploymentStages.AfterPreDeploy, fileSystem, embeddedResources, scriptCapability, commandLineRunner),
   new SubstituteInFilesConvention(fileSystem, substituter),
   new ConfigurationTransformsConvention(fileSystem, configurationTransformer),
   new ConfigurationVariablesConvention(fileSystem, replacer),
   new CopyPackageToCustomInstallationDirectoryConvention(fileSystem),
   new FeatureScriptConvention(DeploymentStages.BeforeDeploy, fileSystem, embeddedResources, scriptCapability, commandLineRunner),
   new PackagedScriptConvention(DeploymentStages.Deploy, fileSystem, scriptCapability, commandLineRunner),
   new ConfiguredScriptConvention(DeploymentStages.Deploy, scriptCapability, fileSystem, commandLineRunner),
   new FeatureScriptConvention(DeploymentStages.AfterDeploy, fileSystem, embeddedResources, scriptCapability, commandLineRunner),
   new LegacyIisWebSiteConvention(fileSystem, iis),
   new FeatureScriptConvention(DeploymentStages.BeforePostDeploy, fileSystem, embeddedResources, scriptCapability, commandLineRunner),
   new PackagedScriptConvention(DeploymentStages.PostDeploy, fileSystem, scriptCapability, commandLineRunner),
   new ConfiguredScriptConvention(DeploymentStages.PostDeploy, scriptCapability, fileSystem, commandLineRunner),
   new FeatureScriptConvention(DeploymentStages.AfterPostDeploy, fileSystem, embeddedResources, scriptCapability, commandLineRunner),
};
```

Calamari is published under the Apache license, and we'll continue to work on it in the open.  One of the benefits of this architecture is that you can [fork the project](https://github.com/OctopusDeploy/Calamari), make your own changes, and then tell your Octopus 3.0 server to use your own Calamari package.
