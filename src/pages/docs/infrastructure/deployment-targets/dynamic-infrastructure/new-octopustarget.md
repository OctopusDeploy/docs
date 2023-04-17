---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: New Octopus Target Command
description: Function for creating an Octopus target for a step package
navOrder: 50
---

:::warning
**Deprecated**

Creating deployment targets using the `New-OctopusTarget` function has been deprecated in favor of using [Cloud Target Discovery](/docs/infrastructure/deployment-targets/cloud-target-discovery/).
:::

In **Octopus 2021.3**, a new architecture for deployments and steps targets was developed, known as **step packages**.

Targets defined by step packages can be created either by PowerShell or bash functions available in any Octopus script-running context. Not all targets are defined by step packages. The complete list of targets defined by step packages is available below.

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

The below examples demonstrate creating a new AWS ECS Cluster target, evidenced by the `aws-ecs-target` target identifier. These scripts would typically be invoked after creating the cluster in a preceeding step. The required information can be passed to these scripts via [passing parameters](/docs/deployments/custom-scripts/passing-parameters-to-scripts/), or via [output variables](/docs/deployments/custom-scripts/output-variables/) published in preceeding steps, or can simply be hard-coded.

#### Account credentials

Below is an example of creating an AWS ECS Cluster target with [account credentials](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target/#aws-account).

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

Below is an example of creating an AWS ECS Cluster target with [worker credentials](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target/#worker-credentials).

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

Below is an example of creating an AWS ECS Cluster target using an [assumed role](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target/#assuming-an-iam-role). Assuming a role can be used with either worker or account credentials, the example below uses worker credentials.

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

!include <create-deployment-targets-hint>