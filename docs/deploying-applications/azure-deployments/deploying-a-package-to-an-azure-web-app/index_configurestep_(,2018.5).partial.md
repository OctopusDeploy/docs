1) On the `Package` section, select your `Package Feed` and `Package Id`

2) On the `Azure` Section, select the `Azure Account` that you created in the previous step. Once you do this, the web apps in your subscription will populate the `Web App` dropdown list for you to pick the one you want to deploy to.

For both the `Azure Account` and the `Web App` you can use [variable binding](/docs/deployment-process/variables/binding-syntax.md) to set their values.

If you choose to run this step on behalf of target roles (maybe you are deploying to multiple geographic regions), you will need to ensure a Deployment Target exists when deploying your Azure Web App. For this, we introduced [Cloud Regions](/docs/infrastructure/cloud-regions.md). If you select a role and no Deployment Targets exist at the time of deploying, Octopus will log warnings in your deployment's task log.

![](deploying-an-azure-web-app.png "width=500")