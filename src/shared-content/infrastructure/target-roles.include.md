[Getting Started - Machine Roles](https://www.youtube.com/watch?v=AU8TBEOI-0M)

:::div{.info}
**Target roles** are **target tags** from Octopus Deploy **2024.2** onwards. The functionality remains the same. This is only a name change to make our terminology clearer. No action is needed.
:::

Before you can deploy software to your deployment targets, you need to associate them with target tags. This ensures you deploy the right software to the right deployment targets. Typical target tags include:

- web-server
- app-server
- db-server

Using target tags means the infrastructure in each of your environments doesn't need to be identical and the deployment process will know which deployment targets to deploy your software to.

Deployment targets can have more than one target tag, and more than one deployment target can have the same target tag, but every deployment target must have at least one target tag.

