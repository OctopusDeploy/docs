
Octopus does not guess or auto-populate the commit or branch when creating a release from a build-server plug-in. Instead, to provide this information, we have added two new fields to our standard integrations - TeamCity, Azure DevOps, Jenkins, GitHub Actions, and Bamboo.

* Git Reference - a user-friendly alias for a commit hash. This is typically a branch name or tag.
* Git Commit - the commit SHA-1 hash.

The use of these fields can change depending on where the version-controlled project's OCL files are stored:

1. If the OCL files are stored in the **same repository** as the application(s) being built, it's likely that a specific commit that relates to any artifacts created as part of the build itself should be used when creating the release. In this scenario, you should provide both the Git Reference and Git Commit hash of the executing build. This ensures that the release will use the correct version of the project, and won't include any potential changes made to the `HEAD` of the branch *before* the build has completed.
2. If the OCL files are stored in a **different repository** than the application(s) being built, a specific branch or tag can identify which version of the project to use when creating the release. In this case, you would provide the Git Reference where the OCL files are stored, and not the Git Commit hash. e.g. Use the `main` branch, regardless of the location of the repository where the application(s) are being built as they are different.

:::hint
Octopus and your build server have a different copy of your git repo. Sending in the commit or reference via the plug-in or the CLI is your build server's way of telling Octopus Deploy which copy of your OCL files to use.
:::