---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-12-11
title: Calamari
navOrder: 70
description: Calamari is the command-line tool invoked by Tentacle during a deployment. It knows how to extract and install packages, deploy to Kubernetes, run scripts, conventions, modify configuration files, and all the other things that happen during a deployment.
---

Calamari is an [open-source](https://github.com/OctopusDeploy/Calamari), console-application.  It supports many commands, which are responsible for performing deployment-steps.  For example:

```bash
Calamari deploy-package --package MyPackage.nupkg --variables Variables.json
```

Calamari has commands to support:

- Deploying to Kubernetes via Helm/Kustomize/Yaml.
- Deploying NuGet packages.
- Running scripts (PowerShell, ScriptCS, Bash, F#).
- Deploying packages to Cloud services (WebApps, Functions etc.).
- Various other deployment related activities.

On each deployment, if it is not already present, the latest version of the Calamari executable is pushed to wherever it needs to be. This may be to:

- A Kubernetes Agent
- A Tentacle.
- Via SSH to a Linux machine.
- A network-drive for Offline-Package-Drop targets.
- Or locally on the Octopus Server for deploying to Azure targets.

Deployments now proceed as follows:

1. Octopus acquires packages and generates variables files.
2. The packages and variables are pushed to the target, along with the latest version of Calamari (if it is not already present).
3. The deployment target invokes Calamari to perform each deployment step.
4. Calamari performs the deployment step.

Since Calamari is open-source, it might help answer any questions you had around what happens during a deployment.  For example, did you ever wonder what order conventions run in when deploying a package?

```csharp
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

Calamari is open-source and published under the Apache license. You can find the source code [here](https://github.com/OctopusDeploy/Calamari).
