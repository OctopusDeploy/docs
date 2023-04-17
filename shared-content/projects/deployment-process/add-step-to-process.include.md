## Adding steps to your deployment processes

1. Navigate to your [project's](/docs/projects) overview page by selecting **Projects** and clicking on the project you are working with.
2. Click the **DEFINE YOUR DEPLOYMENT PROCESS** button, and click **ADD STEP**.
3. Find the step template you need, hover over the step and click **ADD**.

At this point, you have the choice of choosing from the built-in **Installed Step Templates** or the [Community Contributed Step Templates](/docs/projects/community-step-templates).

If you're looking for example deployments, see the [Deploying Applications examples](/docs/deployments).

4. Give the step a short memorable name.
5. The **Execution Location** tells the step where to run. Depending on the type of step you are configuring the options will vary:

  - [Worker Pool](/docs/infrastructure/workers/worker-pools)
  - Worker Pool on behalf of roles
  - Deployment targets

6. If you are deploying to deployment targets or running the step on the server on behalf of deployment targets, you can deploy to all targets in parallel (default) or configure a rolling deployment. To configure a rolling deployment click *configure a rolling deployment* and specify the window size for the deployment. The window size controls how many deployment targets will be deployed to in parallel.

Learn more about [rolling deployments](/docs/deployments/patterns/rolling-deployments).

7. The next section of the step is where you specify the actions for the step to take, if you are running a script or deploying a package this is where you provide the details. This section will vary depending on the type of step you're configuring. For example deployments, see the [Deploying Applications examples](/docs/deployments/). If you're deploying packages you'll likely need to set your [configuration variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature).
8. After providing the actions the steps takes, you can set the conditions for the step. You can set the following conditions:

- Only run the step when deploying to specific environments.
- Only run the step when deploying a release through a specific [channel](/docs/releases/channels).
- Set the step to run depending on the status of the previous step.
- Set when package acquisition should occur.
- Specifying whether or not the step is required.

Learn more about [conditions](/docs/projects/steps/conditions).

9. Save the step.
10. Add additional steps.

With your deployment configured you're ready to create a [release](/docs/releases).