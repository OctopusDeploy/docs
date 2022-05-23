---
title: OCL file format
description: Documentation for Octopus Deploy's OCL file format.
position: 70
---

## Deployment process file

The file name is `deployment_process.ocl` and typically is stored in either the `.octopus` or a `.octopus\[project]` directory.

### Example

```hcl
step "Display the time" {
    action {
        action_type = "Octopus.Script"
        properties = {
            Octopus.Action.RunOnServer = "false"
            Octopus.Action.Script.ScriptBody = <<-EOT
                # Display the current time
                Get-Date
            EOT
            Octopus.Action.Script.ScriptSource = "Inline"
            Octopus.Action.Script.Syntax = "PowerShell"
        }
    }
}
```

### Format

```hcl
step "<STEP NAME>" {                                           # One or more step blocks.
    condition = "<Success|Failure|Always|Variable>"            # Optional, defaults to Success.
    package_requirement = "<LetOctopusDecide                   # Optional, defaults to LetOctopusDecide.
        |BeforePackageAcquisition|AfterPackageAcquisition>"
    properties = {                                             # Optional properties block.
        <PROPERTY NAME> = "<VALUE>"                            # One or more properties.
    }
    start_trigger = "<StartAfterPrevious|StartWithPrevious>"   # Optional, defaults to StartAfterPrevious.

    action "<ACTION NAME>"{                                    # One or more action blocks.
        action_type = "<VALUE>"                                # Optional (???).
        channels = ["<VALUE1>", "<VALUE2>"...]                 # Optional. One or more specific channels.
        condition = "<Success|Variable>"                       # Optional, defaults to Success.
        environments = ["<VALUE1>", "<VALUE2>"...]             # Optional. One or more specific environments.
        excluded_environments = ["<VALUE1>", "<VALUE2>"...]    # Optional. One or more specific environments.
        is_disabled = "<True|False>"                           # Optional (defaults to false).
        is_required = "<True|False>"                           # Optional (defaults to false).
        notes = "<VALUE>"                                      # Optional.
        properties = {                                         # Optional properties block.
            <PROPERTY NAME> = "<VALUE>"                        # One or more properties.
        }
        step_package_version = "1.0"                           # Optional. ??? Display this one ???
        tenant_tags = ["<VALUE1>", "<VALUE2>"...]              # Optional. One or more specific tags.
        worker_pool_id = "<VALUE>"                             # Optional.
        worker_pool_variable = "<VALUE>"                       # Optional.

        container {                                            # Optional container block.
            feed = "<VALUE>"
            image = "<VALUE>"
        }

        packages "<PACKAGE NAME>" {                            # Optional container block.
            acquisition_location = "<VALUE>"
            feed = "<VALUE>"
            package_id = "<VALUE>"
            properties = {                                     # Optional properties block.
                <PROPERTY NAME> = "<VALUE>"                    # One or more properties.
            }
            step_package_inputs_reference_id = "<VALUE>"       # Optional. ??? Display this one ???
        }
    }
}
```

