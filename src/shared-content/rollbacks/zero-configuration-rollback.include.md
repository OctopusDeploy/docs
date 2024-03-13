The easiest way to rollback to a previous version is to:

1. Find the release you want to roll back.
2. Click the **REDEPLOY** button next to the environment you want to roll back.

That redeployment will work because a snapshot is taken when you create a release.  The snapshot includes:

- Deployment Process
- Project Variables
- Referenced Library Variables Sets
- Package Versions

Re-deploying the previous release will re-run the deployment process as it existed when that release was created.  By default, the deploy package steps (such as deploy to IIS or deploy a Windows Service) will extract to a new folder each time a deployment is run, perform the [configuration transforms](/docs/projects/steps/configuration-features/structured-configuration-variables-feature/), and [run any scripts embedded in the package](/docs/deployments/custom-scripts/scripts-in-packages).  

:::div{.hint}
Zero Configuration Rollbacks should work for most our customers.  However, your deployment process might need a bit more fine tuning.  The rest of this guide is focused on disabling specific steps during a rollback process.
:::