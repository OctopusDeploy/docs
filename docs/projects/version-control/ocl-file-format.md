---
title: OCL Syntax for Config as Code
description: A description of  for Octopus Deploy's OCL file format.
position: 70
---

## About OCL

Octopus Configuration Language (OCL) is based on a subset of Hashicorp Configuration Language (HCL). OCL files use the `.ocl` file extension, and are located in the base path defined in the projects version control settings.

## Deployment Process

The Deployment Process is defined in the `deployment_process.ocl` file.

### Steps

Deployment processes can consist of many steps, these steps are defined as blocks in OCL.
Each step contains one lable, which is the slug of the step. This must be unique throughout the process.

```ocl
step "<step-slug>" {
    ...
}
```

#### `name`

The name of the step. If omitted, the name will default to the slug. 

#### `condition`

Valid values: `Success`, `Failure`, `Always`, `Variable`
Default: `Success`

#### `package_requirement`

Valid values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`
Default: `LetOctopusDecide`

#### `properties`

Properties is a dictionary of key-value-pairs.
Example:
```ocl
properties = {
    Octopus.Account.Id = "My Awesome Account"
    MyCustomProperty = "My Value"
    ...
}
```

#### `start_trigger`

Valid values: `StartAfterPrevious`, `StartWithPrevious`
Default: `StartAfterPrevious`

### Actions

Steps generally contain a single action. However, there are some cases where they can contain multiple steps.
Actions are also defined as OCL blocks.

```ocl
action "<action-slug>" {
    ...
}
```

#### `action_type`

Tells Octopus what type of action this is, e.g: `Octopus.Script`, `Octopus.Nginx`, `Octopus.AzureWebApp`, etc.

#### `channels`

A list of channel slugs which this action will be executed for.

```ocl
channels = ["default", "pre-release"]
```

#### `condition`

Valid values: `Success`, `Variable`
Default: `Success`

#### `environments`

A list of environment slugs where this action will be executed.

```ocl
environments = ["production", "staging"]
```

#### `excluded_environments`

A list of environment slugs where this action will be excluded from execution.

```ocl
excluded_environments = ["production", "staging"]
```

#### `is_disabled`

Valid values: `True`, `False`
Default: `False`

#### `is_required`

Valid values: `True`, `False`
Default: `False`

#### `notes`

This field allows for any custom notes.

#### `properties`

Same as the Step `properties`.

#### `step_package_version`

<!-- Todo -->

#### `tenant_tags`

A list of canonical tenant tag names which this action applies to.

```ocl
tenant_tags = ["My Tenant/My Tag", "My Tenant/My Other Tag"]
```

#### `worker_pool`

The slug of a worker pool where this action should execute.
```ocl
worker_pool = "my-worker-pool"
```

#### `worker_pool_variable`

The name of the variable pointing to a worker pool where this action should execute.
```ocl
worker_pool_variable = "WorkerPoolVariable"
```

#### Container

If the action should be executed in a container, the `container` block can be used to specify the container.

```ocl
container "<IMAGE_NAME>" {
    feed = "<CONTAINER_FEED_SLUG>"
}
```

#### Packages

Actions can reference packages using one or more `package` blocks.

```ocl
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

### Example

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
