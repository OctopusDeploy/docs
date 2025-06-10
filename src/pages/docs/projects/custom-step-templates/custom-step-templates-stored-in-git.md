---
layout: src/layouts/Default.astro
pubDate: 2025-06-09
modDate: 2025-06-09
title: Custom step templates stored in Git
icon: fa-brands fa-git-alt
description: How to create step templates with a git source
navOrder: 10
---

Since Octopus 2023.4, it is now possible to create [custom step templates](/docs/projects/custom-step-templates) with scripts sourced directly from Git.

To start, use the same steps you would normally take to create a custom step template. Just be sure to select a compatible step as some steps aren’t suitable for being sourced from Git.

<a name="git-compatible-base-steps"></a>
The built-in steps listed below are compatible with being sourced from Git and can be used for custom step templates:

- [Run a Script](/docs/deployments/custom-scripts/run-a-script-step)
- [Run an Azure Script](/docs/deployments/azure/running-azure-powershell#running-scripts-in-octopus-cloud)
- [Run an AWS CLI Script](/docs/deployments/custom-scripts/aws-cli-scripts)
- [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script)
- [Deploy an Azure Resource Manager template](/docs/runbooks/runbook-examples/azure/resource-groups)
- [Run a Service Fabric SDK PowerShell Script](/docs/deployments/custom-scripts/service-fabric-powershell-scripts)
- [Run a kubectl script](https://octopus.com/blog/custom-kubectl-scripting-in-octopus)
- [Deploy Kubernetes YAML](/docs/kubernetes/steps/yaml)
- [Deploy a Helm Chart](/docs/kubernetes/steps/helm)
- [Deploy with Kustomize](/docs/kubernetes/steps/kustomize)
- [Deploy a Bicep template](https://octopus.com/blog/using-the-deploy-a-bicep-template-step)
- [Deploy an AWS CloudFormation template](/docs/deployments/aws/cloudformation)

- [Apply a Terraform template](/docs/deployments/terraform/apply-terraform-changes)
- [Destroy Terraform resources](/docs/deployments/terraform/apply-terraform-changes)
- [Plan to apply a Terraform template](/docs/deployments/terraform/plan-terraform)
- [Plan a Terraform destroy](/docs/deployments/terraform/plan-terraform)

*Note: This is not a complete list as it is anticipated that additional steps will be added*

You may use the filter at the top to help find a step to base your custom step template on:
![Base Step Filter](https://github.com/user-attachments/assets/bdae8828-02ab-41c2-b0a1-3604640c955b)

## Source

Git compatible base steps for custom step templates will provide an option to select a source. The name of this option can differ depending on the step, including:

- Script Source
- Template Source
- Chart Source

To use Git as the applicable source, simply select the **Git repository** option in the Step tab.

![Script Source](https://github.com/user-attachments/assets/8a1d4c44-6865-4a3a-832c-206fb9a9f4b6)

Once **Git repository** is selected, additional options will appear below in the **Step** tab. Below are common examples while certain base steps may differ.

## Repository URL

In this section, you will specify the full URL to the root of your target repository.

![Repository URL](https://github.com/user-attachments/assets/5b4e9bb6-04a1-44d6-9ade-c8d306625c35)

## Authentication

Unlike database sourced custom step templates, authentication is typically required to access the repository holding the script.

Git credentials can be added to a Space by navigating to **Deploy ➜ Git Credentials** or via the + button in the Authentication section of the **Step** tab. Use the drop-down arrow to select the appropriate Git credentials once they have been added. 

If newly added Git credentials aren’t showing up, click on the **circular refresh button** next to the drop-down arrow.

![Authentication](https://github.com/user-attachments/assets/176e86ee-5155-4b3f-bb2a-cf866ee7bf04)

## Branch Settings

In this section, you will specify the default branch name.

![Branch Settings](https://github.com/user-attachments/assets/46298d3c-f28c-45c3-be42-41effac326e0)

## Path

Similar to **Source**, the **Path** section will be titled differently depending on the base step type. Examples include:

- Script File Path
- Template Path
- Chart Directory

Any of the above allows you to specify a relative path from the root of the Git repository to the targeted item. Using the example repository of `https://Github.com/OctopusSamples/OctoPetShop.Git` and a target file residing at `Scripts/MyScript.sh` within the repository, simply use **Scripts/MyScript.sh** here as shown below:

![Path](https://github.com/user-attachments/assets/15666ac4-542c-432f-93ca-5057ed3e4f68)

## Parameters and other options

Different base steps used for custom step templates sourced from Git may have additional options such as **Script Parameters** and other options specific to that type of step. You may refer to the instructions found in the UI for these options or [relevant step pages](#git-compatible-base-steps) in our documentation for more information.

## Version management

For custom step templates sourced from Git, aside from the specified target item, only some of the information relating to the step template is stored in Git. Everything in the **Step**, **Parameter**, and **Settings** tab is stored in the Octopus database.

Once a step template is added to a project, an entry is added to the **Usage** section (located just under the title of the step template). Within **Usage**, there are two tabs:

- Version-Controlled Projects
- Database-Backed Projects

Git sourced custom step templates work just like standard step templates in that they are compatible with both types of projects. However, the version displayed on the usage page is only incremented by database changes to a given custom step template.

Git commits that change or update the item sourced from Git are not reflected in the version numbers shown on the usage page for Git sourced custom step templates. This is handled separately when:

- creating a release
- creating runbook snapshot (database sourced)
- running a Git sourced runbook

## Selecting Git sourced custom step templates versions

Octopus offers three ways to select a Git sourced custom step template version, including:

- Branches
- Tags
- Commits

All three options correspond to the listed repository.

When creating a new release, you can see the selection that was made for the previous release. You will notice an icon corresponding to the adjacent branch name, tag, or commit hash.

![Select By Branch Tag Or Commit](https://github.com/user-attachments/assets/dab6f6eb-943e-4cf7-878f-e908921d6bb2)

In the API, this information can be found for a given Release ID under **SelectedGitResources**:

![SelectedGitResources](https://github.com/user-attachments/assets/7840cbb9-7fd0-4590-bb77-d81852b3ccc1)

## Git Protection Rules

Similar to packages, you also have the option to implement [Git Protection Rules](/docs/releases/channels#git-protection-rules) for custom step templates stored in Git.

## Additional resources

You can find more information on Git sourced steps with the resources below:

- [Using Git resources directly in deployments](https://octopus.com/blog/git-resources-in-deployments)
- [Octopus 2023.4: Source Scripts in Git](https://www.youtube.com/watch?v=waUktRhFY-g)


