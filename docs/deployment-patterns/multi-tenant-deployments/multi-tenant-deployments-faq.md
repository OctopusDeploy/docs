---
title: Multi-tenant Deployments FAQ
description: Questions we are asked most often related to multi-tenant deployments.
position: 1
---

This page contains some of the questions we are asked most often related to multi-tenant deployments in Octopus Deploy.

!toc

## Why Can't I See the Tenant Area in the Main Menu, or Anything About Tenants For That Matter? {#Multi-tenantdeploymentsFAQ-WhycantIseethetenantareainthemainmenu,oranythingabouttenantsforthatmatter?}

Multi-tenant deployments were shipped as part of **Octopus 3.4**, perhaps you need to upgrade your Octopus Server? Also, before creating your first tenant, you can find tenants in the **Tenants** menu option. For more information refer to [creating your first tenant](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-tenant.md).

## Is There Anything Special About Multi-tenant Projects or Environments? {#Multi-tenantdeploymentsFAQ-Isthereanythingspecialaboutmulti-tenantprojectsorenvironments?}

No, not really. Any good old Octopus project or environment can work with tenants. To start deploying a project using tenants:

1. Configure the project to allow tenanted deployments in {{Project,Settings,Multi-tenant deployments}} - multi-tenant deployments are disabled for your existing projects by default.
2. Connect some tenants to the the project, including the environments where you want to deploy instances of your projects for each tenant.

For more information refer to [creating your first multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md) and [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Deploy to Multiple Tenants in a Single Deployment? {#Multi-tenantdeploymentsFAQ-CanIdeploytomultipletenantsinasingledeployment?}

No. A tenant is treated like a smaller slice of an environment. Octopus creates a new deployment for every tenant/environment combination you are deploying a release into. For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Deploy to Multiple Tenants at the Same Time? {#Multi-tenantdeploymentsFAQ-CanIdeploytomultipletenantsatthesametime?}

Yes! You can create multiple tenanted deployments at the same time very easily by using the Octopus UI, `octo.exe` or any of the build server extensions. You can choose multiple tenants using [Tenant Tags](/docs/deployment-patterns/multi-tenant-deployments/tenant-tags.md) or all of the tenants in an environment. For more information refer to [deploying releases with octo.exe](/docs/api-and-integration/octo.exe-command-line/deploy-release.md) and [designing a multi-tenant upgrade process](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md).

## Can I Control the Order in Which Tenanted Deployments Execute?

No. Octopus will execute deployment tasks as quickly as it can, and order cannot be guaranteed.

When you want to deploy a release to multiple tenants, Octopus will create one deployment per-tenant. This means if you want to deploy to 20 tenants, you will end up with 20 tenanted deployments: one for each tenant. Each deployment is executed in its own task, and Octopus will work through those tasks as quickly as it can.

There are a few ways you can achieve a predictable order of tenanted deployments:

1. Deploy to each tenant manually, one at a time.
2. Use tenant tags to group tenants into batches, and work your way through these batches.
3. Write a simple orchestrator application using the Octopus API to coordinate your tenanted deployments.

We recommend avoiding order dependence of your deployments wherever possible.

## Can I Perform Tenanted Deployments in Batches?

Yes! This is a practice we recommend. You can use [tenant tags](/docs/deployment-patterns/multi-tenant-deployments/tenant-tags.md) to group your tenants together into batches and then promote your releases through your tenants in batches. It can be convenient to deploy to some of your tenants first in order to detect any problems with your release before you promote to all of your other tenants.

Learn more about [designing a multi-tenant upgrade process](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md).

## Can I Send a Single Email at the End of a Batch of Tenanted Deployments?

No. Each tenanted deployment is independent. See below.

## If I Deploy to a Batch of Tenants and One Fails Can Octopus Automatically Roll the Entire Batch Back?

No. Each tenanted deployment is independent. See below.

## Can I Have a Single Step Run Once at the Beginning or End of a Batch of Tenanted Deployments?

No. Each tenanted deployment is independent. See below.

## Can Octopus Coordinate Multiple Tenanted Deployments?

No. Each tenanted deployment is independent. There is no built-in way to perform complex orchestrations across multiple tenants. We considered the idea, but quickly realized there is no "one size fits all approach":

- I want to send an email when a batch of tenanted deployments complete with the results of those deployments.
- I want to send an email once release **1.2.6** has been successfully deployed to all of my tenants in production.
- I want to upgrade a batch of tenants, and if one fails, I want them all to roll-back to the last known good version.

You can achieve these behaviors using a custom script/application which leverages the [Octopus REST API](/docs/api-and-integration/api/index.md) and taking advantage of [Subscriptions](/docs/administration/managing-infrastructure/subscriptions/index.md). This way you can use the information provided by Octopus to perform a complex deployment orchestration with any custom logic that suits your scenario perfectly. For example, you could write a script/application which starts a batch of tenanted deployments using a specific tag, then monitor the progress of those deployments, and finally take any action based on the results.

## Can I Have a Combination of Tenanted and Untenanted Projects? {#Multi-tenantdeploymentsFAQ-CanIhaveacombinationoftenantedanduntenantedprojects?}

Yes! Each project can control its interaction with tenants. By default the multi-tenant deployment features are disabled. You can allow deployments with/without a tenant, which is a hybrid mode that is useful when you are transitioning to a fully multi-tenant project. There is also a mode where you can require a tenant for all deployments, which disables untenanted deployments for that project.

![](/docs/images/5669243/5865711.png)

## What is an "Untenanted Deployment"? Don't I Have to Choose a Tenant When Deploying my Project? {#Multi-tenantdeploymentsFAQ-Whatisanun-tenanteddeploymentDontIhavetochooseatenantwhendeployingmyproject?}

When you first enable multi-tenant deployments you won't have any tenants, and we don't want that to stop you from deploying your existing projects. Perhaps you are using an environment-per-tenant model and will migrate to tenants over a period of time, so some deployments will start to have a tenant whilst others do not. Essentially an "untenanted deployment" is the same kind of deployment Octopus always performed: *there is no tenant for this deployment*. When you deploy using a tenant Octopus includes variables from the tenant, and the selected tenant can impact which steps are run, which variable values are used, and which deployment targets are included, at your discretion. For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Prevent "Untenanted Deployments" of a Project? {#Multi-tenantdeploymentsFAQ-CanIpreventun-tenanteddeploymentsofaproject?}

Yes. Choose the **Require a tenant for all deployments** option in the Project settings. For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Require a Tenant For All Deployments of a Project? {#Multi-tenantdeploymentsFAQ-CanIrequireatenantforalldeploymentsofaproject?}

Yes, see the previous question. For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Deploy a Tenanted Project Onto an Untenanted Machine?

Yes! We shipped support for this in [Octopus 3.15](https://octopus.com/blog/octopus-release-3-15).

## Can I Deploy an Untenanted Project Onto a Tenanted Machine?

Yes! We shipped support for this in [Octopus 3.15](https://octopus.com/blog/octopus-release-3-15).

## Why Can't I Connect a Tenant to my Project, or Perform a Tenanted Deployment of My Project? {#Multi-tenantdeploymentsFAQ-WhycantIconnectatenanttomyproject,orperformatenanteddeploymentofmyproject?}

As long as you have _Project View_ permissions for the project, and that project is configured to enable tenanted deployments, you should be able to connect your tenants to that project. Each project can opt-in to tenanted deployment features, perhaps your project needs to enable tenanted deployments? See above for more details.

## Why Can't I Connect a Tenant to One of the Environments For My Project?

Firstly check you can select a project for your tenant (see above for more details). As long as you have _Environment View_ permissions for the environment, and that environment is included in one of the lifecycles used by your project, you should be able to connect your tenants to that environment. Check each of the lifecycles used by your project (each channel can specify a different lifecycle) and make sure at least one of them includes the environment.

## I Want to Deploy My Project to a Tenant, but I Can't See that Tenant in the List? {#Multi-tenantdeploymentsFAQ-Iwanttodeploymyprojecttoatenant,butIcantseethattenantinthelist?}

Granted, multi-tenant deployments can get complicated very quickly, so we've written a [troubleshooting guide](/docs/deployment-patterns/multi-tenant-deployments/troubleshooting-multi-tenant-deployments.md) to help when you get stuck. At the very least, make sure your tenant is connected to the correct project and environment(s). For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Is Licensing Affected By the Number of Tenants I Have? {#Multi-tenantdeploymentsFAQ-IslicensingaffectedbythenumberoftenantsIhave?}

No, you can create an unlimited number of tenants without any impact on licensing in **Octopus 3.x**.

## Can I Provide Third-party Self-service Sign In, So My Tenants Can Manage Their Own Deployments? {#Multi-tenantdeploymentsFAQ-CanIprovide3rd-partyself-servicesignin,somytenantscanmanagetheirowndeployments?}

Yes, take a look at our [guide on enabling self-service sign in for your tenants](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/multi-tenant-roles-and-security.md).

## How Are Deployment Targets Selected For Each Deployment?   {#Multi-tenantdeploymentsFAQ-Howaredeploymenttargetsselectedforeachdeployment?}

Octopus uses this rule to determine which deployment targets should be included in a deployment:

- Tenanted deployments will include tenanted deployment targets matching the deployment's tenant
- Untenanted deployments will include untenanted deployment targets (just like good old Octopus)

For more information refer to [designing a multi-tenant hosting model](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

## Can I Configure Deployment Targets that Are Dedicated/Limited to a Single Tenant? {#Multi-tenantdeploymentsFAQ-CanIconfiguredeploymenttargetsthatarededicated/limitedtoasingletenant?}

Yes. Set the tenant filter on each of the deployment targets to a specific tenant. Octopus will ensure these deployment targets are only used in deployments for that specific tenant.

For more information refer to [designing a multi-tenant hosting model](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

## Can I Configure Accounts That Are Dedicated/Limited to a Single Tenant? {#Multi-tenantdeploymentsFAQ-CanIconfigureaccountsthatarededicated/limitedtoasingletenant?}

Yes. The same logic is applied to accounts as deployment targets.

For more information refer to [designing a multi-tenant hosting model](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

## Can I Deploy a Mixture of Projects to My Tenants? {#Multi-tenantdeploymentsFAQ-CanIdeployamixtureofprojectstomytenants?}

Yes, you can connect your tenants to as many or as few projects as you desire. The tenant-to-project/environment connection for each tenant can be configured individually, allowing you to connect each tenant to the projects and environments they require. For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Provide My Tenants With a Staging and Production Environment? {#Multi-tenantdeploymentsFAQ-CanIprovidemytenantswithastagingandproductionenvironment?}

Yes, simply connect the tenant to a project and any number of environments that project can deploy into. For more information refer to [deploying a simple multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

## Can I Configure a Standard Set of Variables That Are Required by Each Tenant Like an Alias or Contact Details? {#Multi-tenantdeploymentsFAQ-CanIconfigureastandardsetofvariablesthatarerequiredbyeachtenantlikeanaliasorcontactdetails?}

Yes, we recommend creating some variable templates in a library variable set, and connecting that library variable set to all of the projects where you require those variables. Now Octopus will prompt you for those standard variables, once for each tenant. We cover this in more detail in the [working with tenant-specific variables](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md) section of our guide.

## Can I Use Tenants and Channels Together? {#Multi-tenantdeploymentsFAQ-CanIusetenantsandchannelstogether?}

Yes, you can apply a tenant filter to a channel as a way of expressing: "Releases in this channel may only be deployed to tenants matching the filter." For examples of working with tenants and channels see [using channels and tenant tags to restrict releases to the test team](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md), [implementing an early access program](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md), and [pinning tenants to a release](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md) in our guide.

## Can I Pin or Lock a Tenant to a Specific Release? {#Multi-tenantdeploymentsFAQ-CanIpinorlockatenanttoaspecificrelease?}

Yes, you can determine which types of releases should be deployed to a your tenants by using a combination of channels and tag sets. This is part of an advanced topic which is covered in detail by [designing a multi-tenant upgrade process](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md).

## Are There Any Known Limitations or Problems With Multi-tenant Deployments? {#LimitationsAndBugs?}

Whenever we discover a limitation or problem with multi-tenant deployments we create a GitHub Issue labeled with the `feature/tenants` to track its progress. [These issues](https://github.com/OctopusDeploy/Issues/issues?q=is%3Aopen+is%3Aissue+label%3Afeature%2Ftenants) represent anything we have agreed is a limitation or problem, and we intend to implement it in the near future. We recommend investigating whether these limitations will impact your specific scenario.
