[Getting Started - Machine Roles](https://www.youtube.com/watch?v=AU8TBEOI-0M)

Before you can deploy software to your deployment targets, you need to tag them with target roles. This ensures you deploy the right software to the right deployment targets. Typical target roles include:

- web-server
- app-server
- db-server

Using target roles means the infrastructure in each of your environments doesn't need to be identical and the deployment process will know which deployment targets to deploy your software to.

Deployment targets can have more than one role, and more than one deployment target can have the same role, but every deployment target must have at least one role.

