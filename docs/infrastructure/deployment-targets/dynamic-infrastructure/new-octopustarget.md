---
title: New Octopus Target Command
description: Function for removing an Octopus target
position: 50
---

Targets defined by step packages can be created either by PowerShell or bash functions available in any Octopus script-running context. Not all targets are defined by step packages. The complete list of targets defined by step packages is available below.

:::hint
**Targets from Step Packages**
Octopus Deploy has recently developed a new architecture for deployment steps and targets, known as step packages. Step packages are available in Octopus Deploy version 2021.3 and later.

Targets defined by step packages use the new generic `New-OctopusTarget` function to create targets.
:::

:::warning
**Deprecated**

Creating deployment targets using the `New-OctopusTarget` function has been deprecated in favour of using [Cloud Target Discovery](/docs/infrastructure/deployment-targets/cloud-target-discovery/index.md).
:::

To create a target defined by a step package, you will need to know the `target identifier`, and the `inputs` required by the target. These can currently be found in the following locations:

| Target          | Identifier                                                                                                           | Required Inputs                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| AWS ECS Cluster | [Identifier](https://github.com/OctopusDeploy/step-package-ecs/blob/main/targets/ecs-target-v2/src/metadata.json#L5) | [Inputs](https://github.com/OctopusDeploy/step-package-ecs/blob/main/targets/ecs-target-v2/src/inputs.ts) |

## New octopus target

Command (pwsh): **New-OctopusTarget**

| Parameter             | Value                                                                         |
| --------------------- | ----------------------------------------------------------------------------- |
| `-name`               | The Name of the target to create                                              |
| `-targetId`           | The target identifier of target to create                                     |
| `-inputs`             | The inputs required to define the target being created                        |
| `-roles`              | Comma separated list of Roles to assign                                       |
| `-updateIfExisting`   | Will update an existing target with the same name, create if it doesn't exist |
| `-workerPoolIdOrName` | Name or Id of the Worker Pool for the deployment target to use. (Optional)    |

Command (bash) **new_octopustarget**

| Parameter              | Value                                                                         |
| ---------------------- | ----------------------------------------------------------------------------- |
| `-n` \| `--name`       | The Name of the target to create                                              |
| `-t` \| `--targetId`   | The target identifier of target to create                                     |
| `--inputs`             | The inputs required to define the target being created                        |
| `--roles`              | Comma separated list of Roles to assign                                       |
| `--update-if-existing` | Will update an existing target with the same name, create if it doesn't exist |
| `--worker-pool`        | Name or Id of the Worker Pool for the deployment target to use. (Optional)    |

### Examples

The below examples demonstrate creating a new AWS ECS Cluster target, evidenced by the `aws-ecs-target` target identifier. These scripts would typically be invoked after creating the cluster in a preceeding step. The required information can be passed to these scripts via [passing parameters](/docs/deployments/custom-scripts/passing-parameters-to-scripts.md), or via [output variables](/docs/deployments/custom-scripts/output-variables.md) published in preceeding steps, or can simply be hard-coded.

#### Account credentials

Below is an example of creating an AWS ECS Cluster target with [account credentials](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target.md#aws-account).

```powershell PowerShell
$inputs = @"
{
    "clusterName": "$($OctopusParameters["clusterName"])",
    "region": "$($OctopusParameters["region"])",
    "authentication": {
        "credentials": {
            "type": "account",
            "account": "$($OctopusParameters["awsAccount"])",
        },
        "role": {
            "type": "noAssumedRole"
        }
    }
}
"@

New-OctopusTarget -Name "$($OctopusParameters["target_name"])" -TargetId "aws-ecs-target" -Inputs $inputs -Roles "$($OctopusParameters["role"])"
```

```bash Bash
read -r -d '' INPUTS <<EOT
{
    "clusterName": "$(get_octopusvariable "clusterName")",
    "name": "$(get_octopusvariable "target_name")",
    "authentication": {
        "credentials": {
            "type": "account",
            "account": "$(get_octopusvariable "awsAccount")",
        },
        "role": {
            "type": "noAssumedRole"
        }
    }
}
EOT

new_octopustarget -n "$(get_octopusvariable "target_name")" -t "aws-ecs-target" --inputs "$INPUTS" --roles "$(get_octopusvariable "role")"
```

#### Worker credentials

Below is an example of creating an AWS ECS Cluster target with [worker credentials](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target.md#worker-credentials).

```powershell PowerShell
$inputs = @"
{
    "clusterName": "$($OctopusParameters["clusterName"])",
    "region": "$($OctopusParameters["region"])",
    "authentication": {
        "credentials": {
            "type": "worker"
        },
        "role": {
            "type": "noAssumedRole"
        }
    }
}
"@

New-OctopusTarget -Name "$($OctopusParameters["target_name"])" -TargetId "aws-ecs-target" -Inputs $inputs -Roles "$($OctopusParameters["role"])"
```

```bash Bash
read -r -d '' INPUTS <<EOT
{
    "clusterName": "$(get_octopusvariable "clusterName")",
    "name": "$(get_octopusvariable "target_name")",
    "authentication": {
        "credentials": {
            "type": "worker"
        },
        "role": {
            "type": "noAssumedRole"
        }
    }
}
EOT

new_octopustarget -n "$(get_octopusvariable "target_name")" -t "aws-ecs-target" --inputs "$INPUTS" --roles "$(get_octopusvariable "role")"
```

#### Assuming an IAM role

Below is an example of creating an AWS ECS Cluster target using an [assumed role](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target.md#assuming-an-iam-role). Assuming a role can be used with either worker or account credentials, the example below uses worker credentials.

```powershell PowerShell
$inputs = @"
{
    "clusterName": "$($OctopusParameters["clusterName"])",
    "region": "$($OctopusParameters["region"])",
    "authentication": {
        "credentials": {
            "type": "worker"
        },
        "role": {
            "type": "assumeRole",
            "arn": "$($OctopusParameters["assumeRoleArn"])",  // Required
            "sessionName": "$($OctopusParameters["assumeRoleSessionName"])", // Optional
            "sessionDuration": $($OctopusParameters["assumeRoleSessionDuration"]), // Optional
            "externalId": "$($OctopusParameters["assumeRoleExternalId"])", // Optional
        }
    }
}
"@

New-OctopusTarget -Name "$($OctopusParameters["target_name"])" -TargetId "aws-ecs-target" -Inputs $inputs -Roles "$($OctopusParameters["role"])"
```

```bash Bash
read -r -d '' INPUTS <<EOT
{
    "clusterName": "$(get_octopusvariable "clusterName")",
    "name": "$(get_octopusvariable "target_name")",
    "authentication": {
        "credentials": {
            "type": "worker"
        },
        "role": {
            "type": "assumeRole",
            "arn": "$($(get_octopusvariable "assumeRoleArn")",  // Required
            "sessionName": "$($(get_octopusvariable "assumeRoleSessionName")", // Optional
            "sessionDuration": $($(get_octopusvariable "assumeRoleSessionDuration"), // Optional
            "externalId": "$($(get_octopusvariable "assumeRoleExternalId")", // Optional
        }
    }
}
EOT

new_octopustarget -n "$(get_octopusvariable "target_name")" -t "aws-ecs-target" --inputs "$INPUTS" --roles "$(get_octopusvariable "role")"
```
