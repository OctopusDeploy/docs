## Package requirement
The package requirement condition allows you to specify when package acquisition should occur. By default, a deployment will acquire packages immediately before the first step that uses a packages. This option can be used to explcitily indicate if a step should run before or after package acqusition.

![](step-condition-package-requirement.png "width=500")

There are three options to choose from:

- Let Octopus Decide (default): Packages may be acquired before or after this step runs - Octopus will determine the best time
- After package acquisition: Packages will be acquired before this step runs
- Before package acqusition: Packages will be acquired after this step runs

This option is hidden when it does not make sense, for example, when a script step is configured to run after a package step (packages must be acquired by this point).
