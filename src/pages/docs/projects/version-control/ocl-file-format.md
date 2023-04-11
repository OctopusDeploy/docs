---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: OCL Syntax for Config as Code
description: A description of Octopus Deploy's OCL file format.
navOrder: 70
---

## About OCL

Octopus Configuration Language (OCL) is based on a subset of Hashicorp Configuration Language (HCL). OCL files use the `.ocl` file extension, and are located in the base path defined in the projects version control settings.

General information about the OCL format can be found [here](https://github.com/OctopusDeploy/Ocl), including the [EBNF notation](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).

## Deployment Process

The Deployment Process is defined in the `deployment_process.ocl` file. It consists of one or more steps. These steps are defined as blocks in OCL.

### `step` block


Each step contains one label, which is the slug of the step. This must be unique throughout the process.

```hcl
step "<step-slug>" {
    ...
}
```

### `step.name`

The name of the step. If omitted, the name will default to the slug.

### `step.condition`

Valid values: `Success`, `Failure`, `Always`, `Variable`
Default: `Success`

### `step.package_requirement`

Valid values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`
Default: `LetOctopusDecide`

### `step.properties`

Properties is a dictionary of key-value-pairs.
Example:
```hcl
properties = {
    Octopus.Account.Id = "My Awesome Account"
    MyCustomProperty = "My Value"
    ...
}
```

### `step.start_trigger`

Valid values: `StartAfterPrevious`, `StartWithPrevious`
Default: `StartAfterPrevious`

### `step.action` block

Steps generally contain a single action. However, there are some cases where they can contain multiple steps.
Actions are also defined as OCL blocks.

```hcl
action "<action-slug>" {
    ...
}
```

### `step.action.action_type`

Tells Octopus what type of action this is, e.g: `Octopus.Script`, `Octopus.Nginx`, `Octopus.AzureWebApp`, etc.

### `step.action.channels`

A list of channel slugs which this action will be executed for.

```hcl
channels = ["default", "pre-release"]
```

### `step.action.condition`

Valid values: `Success`, `Variable`
Default: `Success`

### `step.action.environments`

A list of environment slugs where this action will be executed.

```hcl
environments = ["production", "staging"]
```

### `step.action.excluded_environments`

A list of environment slugs where this action will be excluded from execution.

```hcl
excluded_environments = ["production", "staging"]
```

### `step.action.is_disabled`

Valid values: `True`, `False`
Default: `False`

### `step.action.is_required`

Valid values: `True`, `False`
Default: `False`

### `step.action.notes`

This field allows for any custom notes.

### `step.action.properties`

Same as the Step `properties`.

### `step.action.step_package_version`

<!-- Todo -->

### `step.action.tenant_tags`

A list of canonical tenant tag names which this action applies to.

```hcl
tenant_tags = ["My Tenant/My Tag", "My Tenant/My Other Tag"]
```

### `step.action.worker_pool`

The slug of a worker pool where this action should execute.
```hcl
worker_pool = "my-worker-pool"
```

### `step.action.worker_pool_variable`

The name of the variable pointing to a worker pool where this action should execute.
```hcl
worker_pool_variable = "WorkerPoolVariable"
```

### `step.action.container` block

If the action should be executed in a container, the `container` block can be used to specify the container.

```hcl
container "<IMAGE_NAME>" {
    feed = "<CONTAINER_FEED_SLUG>"
}
```

### `step.action.package` block

Actions can reference packages using one or more `package` blocks.

```hcl
packages "<PACKAGE_NAME>" {
    acquisition_location = "Server|ExecutionTarget|NotAcquired"
    feed = "<FEED_SLUG>"
    package_id = "<PACKAGE_ID>"

    # Optional properties block, same as above properties
    properties = {
        <PROPERTY NAME> = "<VALUE>"
    }

    # Optional: Todo
    step_package_inputs_reference_id = "<VALUE>"
}
```

#### Example

```hcl
step "Hello world (using PowerShell)" {

    action {
        action_type = "Octopus.Script"
        is_required = true
        properties = {
            Octopus.Action.RunOnServer = "true"
            Octopus.Action.Script.ScriptBody = "Write-Host 'Hello world, using PowerShell'"
            Octopus.Action.Script.ScriptSource = "Inline"
            Octopus.Action.Script.Syntax = "PowerShell"
        }
        worker_pool = "raspberry-pi-cluster"
    }
}

step "Hello world (using Bash)" {
    start_trigger = "StartWithPrevious"

    action {
        action_type = "Octopus.Script"
        is_required = true
        properties = {
            Octopus.Action.RunOnServer = "true"
            Octopus.Action.Script.ScriptBody = <<-EOT
                echo 'Hello world, using Bash'
                echo 'We also support multi-line scripts!'
            EOT
            Octopus.Action.Script.ScriptSource = "Inline"
            Octopus.Action.Script.Syntax = "Bash"
        }
        worker_pool = "raspberry-pi-cluster"
    }
}
```

## Variables

The Variables are defined in the `variables.ocl` file. Variables are defined as blocks in OCL.

### `variable` block

```hcl
variable "<LABEL>" {
    ...
}
```

Each variable block has a label, which is the name of the variable. Although not recommended, there can be multiple variable blocks with the same label value. They will be treated a single variable and the contents of each block will be merged.

The variable block contains one or more value blocks.

### `variable.value` block

```hcl
value "<VARIABLE_VALUE>" {
    ...
}
```

### `variable.value.type`

Defines the variable type. If omitted, the type is `String` (text). Valid values are `AzureAccount`, `GoogleCloudAccount`, `AmazonWebServicesAccount`, `Certificate`, `WorkerPool`, `Sensitive`, and `String`. Sensitive values should not be stored in the `variables.ocl` file - they should be stored in the database by using the Octopus Deploy UI instead.

#### Example

```hcl
variable "Backup worker pool" {

    value "WorkerPools-3" {
        type = "WorkerPool"
    }
}
```

### `variable.value.description`

Defines a description for a variable. This is often used to more fully describe what the variable does or any important notes about changing its value.

#### Example

```hcl
variable "Logging.Level" {

    value "Info" {
        description = "Valid values are 'Trace', 'Debug', 'Info', 'Warn', 'Error', 'Fatal', and 'Off'."
    }
}
```

### `variable.value.prompt` block

The `value` block can optional contain a `prompt` block. This allows for values to be set manually during deployment.

#### Example

```hcl
variable "VersionNumber" {

    value {

        prompt {
            description = "Use the 'Version Number' spreadsheet to determine the next available version number."
            label = "Version Number"
            required = true
        }
    }
}
```

### `variable.value.prompt.description`

Defines a description for the prompt. This is often used to provide additional information to the user about what the value should be.

### `variable.value.prompt.label`

Defines a label that will be displayed to the user when a deployment is created. This is often a 'humanized' version of the variable name.

### `variable.value.prompt.required`

Determines whether the value can be left blank when a deployment is done. The value can be `true` or `false`. If omitted, the default value is `false`.

### `variable.value.action`  (Scope)

Defines one or more actions (steps) that the value will apply to.

#### Example

```hcl
variable "Logging.Level" {

    value "Info" {
        action = ["set-up", "tear-down"]
    }
}
```

### `variable.value.channel` (Scope)

Defines one or more channels that the value will apply to.

#### Example

```hcl
variable "Version.Tag" {

    value "2022.3" {
        channel = ["current", "2022.3"]
    }
}
```

### `variable.value.environment` (Scope)

Defines one or more environments that the value will apply to.

```hcl
variable "API.Key" {

    value "20f5cb22-a4f1-493f-a327-a2206f39edd0" {
        channel = ["production"]
    }
}
```

### `variable.value.machine` (Scope)

Defines one or more machines that the value will apply to.

```hcl
variable "Server.Label" {

    value "Test SQL Server" {
        machine = ["AU023SQL0048PS45-1", "AU023SQL0048PS45-2"]
    }
}
```

### `variable.value.role` (Scope)

Defines one or more roles that the value will apply to.

#### Example

```hcl
variable "Application.Name" {

    value "HAL Portal" {
        role = ["Hal-WebApp-Portal"]
    }
}
```
