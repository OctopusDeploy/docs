---
title: New Octopus Target Command
description: Function for removing an Octopus target
position: 50
---

Targets defined by step packages can be created either by PowerShell or bash functions available in any Octopus script-running context.  To learn more about step packages, read the [step package documentation](https://github.com/octopusdeploy/step-api#overview).

To create a target defined by a step package, you will need to know the `target identifier`, and the `inputs` required by the target. These can currently be found in the following locations:

**Target Identifiers**

- [AWS ECS Cluster](https://github.com/OctopusDeploy/step-package-ecs/blob/main/targets/ecs-target/src/metadata.json#L5)

**Required Inputs**

- [AWS ECS Cluster](https://github.com/OctopusDeploy/step-package-ecs/blob/main/targets/ecs-target/src/inputs.ts)

## New octopus target

Command (pwsh): **New-OctopusTarget** 

| Parameter                           | Value                                  |
| ----------------------------------- | -------------------------------------- |
| `-name`                             | The Name of the target to create |
| `-targetId`                         | The target identifier of target to create |
| `-inputs`                           | The inputs required to define the target being created |
| `-roles`                            | Comma separated list of Roles to assign |
| `-updateIfExisting`                 | Will update an existing target with the same name, create if it doesn't exist |
| `-workerPoolIdOrName`               | Name or Id of the Worker Pool for the deployment target to use. (Optional) |

Command (bash) **new_octopustarget** 

| Parameter                           | Value                                  |
| ----------------------------------- | -------------------------------------- |
| `-n` | `--name`                     | The Name of the target to create |
| `-t` | `--targetId`                 | The target identifier of target to create |
| `--inputs`                          | The inputs required to define the target being created |
| `--roles`                           | Comma separated list of Roles to assign |
| `--update-if-existing`              | Will update an existing target with the same name, create if it doesn't exist |
| `--worker-pool`                     | Name or Id of the Worker Pool for the deployment target to use. (Optional) |

### Examples

The below examples demonstrate creating a new AWS ECS Cluster target, evidenced by the `aws-ecs-target` target identifier. These scripts would typically be invoked after creating the cluster in a preceeding step. The required information can be passed to these scripts via [passing parameters](/docs/deployments/custom-scripts/passing-parameters-to-scripts.md), or via [output variables](/docs/deployments/custom-scripts/output-variables.md) published in preceeding steps, or can simply be hard-coded.

```powershell PowerShell
$inputs = @"
{
    "clusterName": "$($OctopusParameters["clusterName"])",
    "region": "$($OctopusParameters["region"])",
    "awsAccount": "$($OctopusParameters["awsAccount"])",
}
"@

New-OctopusTarget -Name $OctopusParameters["target_name"] -TargetId "aws-ecs-target" -Inputs $inputs -Roles $OctopusParameters["role"]
```
```bash Bash
read -r -d '' INPUTS <<EOT
{
    "clusterName": "$(get_octopusvariable "clusterName")",
    "name": "$(get_octopusvariable "target_name")",
    "awsAccount": "$(get_octopusvariable "awsAccount")",
}
EOT

new_octopustarget -n "$(get_octopusvariable "target_name")" -t "aws-ecs-target" --inputs "$INPUTS" --roles "$(get_octopusvariable "role")"
```