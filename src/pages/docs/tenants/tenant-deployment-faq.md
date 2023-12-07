---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-04
title: Multi-tenant deployments FAQ
description: Questions we are often asked relating to multi-tenant deployments.
navOrder: 90
---

This page contains some of the questions we are often asked relating to multi-tenant deployments in Octopus Deploy.

## Is there anything special about multi-tenant projects or environments?

No, not really. Any Octopus project or environment can work with tenants. To start deploying a project using tenants:

1. Configure the project to allow tenanted deployments in **Project ➜ Settings ➜ Multi-tenant deployments** - multi-tenant deployments are disabled for your existing projects by default.
2. Connect some tenants to the project, including the environments where you want to deploy instances of your projects for each tenant.

For more information refer to [creating your first tenant](/docs/tenants/tenant-creation/) and [deploying a multi-tenant project](/docs/tenants/tenant-creation/tenanted-deployments).

## Can I deploy to multiple tenants in a single deployment?

No. A tenant is treated like a smaller slice of an environment. Octopus creates a new deployment for every tenant/environment combination you are deploying a release into. For more information refer to our [tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments) section.

## Can I deploy to multiple tenants at the same time?

Yes! You can create multiple tenanted deployments at the same time very easily by using the Octopus UI, The Octopus CLI or any of the build server extensions. You can choose multiple tenants using [tenant tags](/docs/tenants/tenant-tags/) or all of the tenants in an environment. For more information refer to [deploying releases with the Octopus CLI](/docs/octopus-rest-api/octopus-cli/deploy-release) and [deploying to multiple tenants using tags](/docs/tenants/tenant-tags/#deploying-to-multiple-tenants-tags).

## Can I control the order in which tenanted deployments execute?

No. Octopus will execute deployment tasks as quickly as it can, and order cannot be guaranteed.

When you want to deploy a release to multiple tenants, Octopus will create one deployment per-tenant. This means if you want to deploy to 20 tenants, you will end up with 20 tenanted deployments: one for each tenant. Each deployment is executed in its own task, and Octopus will work through those tasks as quickly as it can.

There are a few ways you can achieve a predictable order of tenanted deployments:

1. Deploy to each tenant manually, one at a time.
2. Use tenant tags to group tenants into batches, and work your way through these batches.
3. Write a simple orchestrator application using the Octopus API to coordinate your tenanted deployments.

We recommend avoiding order dependence of your deployments wherever possible.

## Can I perform tenanted deployments in batches?

Yes! This is a practice we recommend. You can use [tenant tags](/docs/tenants/tenant-tags) to group your tenants together into batches and then promote your releases through your tenants in batches. It can be convenient to deploy to some of your tenants first in order to detect any problems with your release before you promote to all of your other tenants.

Learn more about [deploying to multiple tenants using tags](/docs/tenants/tenant-tags/#deploying-to-multiple-tenants-tags).

## Can I send a single email at the end of a batch of tenanted deployments?

No. Each tenanted deployment is independent. See below.

## If I deploy to a batch of tenants and one fails can Octopus automatically roll the entire batch back?

No. Each tenanted deployment is independent. See below.

## Can I have a single step run once at the beginning or end of a batch of tenanted deployments?

No. Each tenanted deployment is independent. See below.

## Can Octopus coordinate multiple tenanted deployments?

No. Each tenanted deployment is independent. There is no built-in way to perform complex orchestrations across multiple tenants. We considered the idea, but quickly realized there is no "one size fits all approach":

- I want to send an email when a batch of tenanted deployments complete with the results of those deployments.
- I want to send an email once release **1.2.6** has been successfully deployed to all of my tenants in production.
- I want to upgrade a batch of tenants and, if one fails, I want them all to roll-back to the last known good version.

You can achieve these behaviors using a custom script/application which leverages the [Octopus REST API](/docs/octopus-rest-api/) and taking advantage of [Subscriptions](/docs/administration/managing-infrastructure/subscriptions). This way you can use the information provided by Octopus to perform a complex deployment orchestration with any custom logic that suits your scenario perfectly. For example, you could write a script/application which starts a batch of tenanted deployments using a specific tag, then monitor the progress of those deployments, and finally take any action based on the results.

## Can I have a combination of tenanted and untenanted projects?

Yes! Each project can control its interaction with tenants. By default the multi-tenant deployment features are disabled. You can allow deployments with/without a tenant, which is a hybrid mode that is useful when you are transitioning to a fully multi-tenant project. There is also a mode where you can require a tenant for all deployments, which disables untenanted deployments for that project.

:::figure
![](/docs/tenants/images/multi-tenant-project-settings.png)
:::

## What is an "untenanted deployment"? Don't I have to choose a tenant when deploying my project?

When you first enable multi-tenant deployments you won't have any tenants, and we don't want that to stop you from deploying your existing projects. Perhaps you are using an environment-per-tenant model and will migrate to tenants over a period of time, so some deployments will start to have a tenant whilst others do not. Essentially an "untenanted deployment" is the same kind of deployment Octopus always performed: *there is no tenant for this deployment*. When you deploy using a tenant, Octopus includes variables from the tenant. The selected tenant can impact which steps are run, which variable values are used, and which deployment targets are included, at your discretion. For more information refer to our [tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments) section.

## Can I prevent "untenanted deployments" of a project?

Yes. Choose the **Require a tenant for all deployments** option in the project settings. For more information refer to our [tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments) section.

## Can I require a tenant for all deployments of a project? {#always-require-tenant}

Yes, see the previous question. For more information refer to our [tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments) section.

## Can I deploy a tenanted project on an untenanted machine?

Yes!

## Can I deploy an untenanted project on a tenanted machine?

Yes!

## Why can't I connect a tenant to my project, or perform a tenanted deployment of my project?

As long as you have ProjectView permissions for the project, and that project is configured to enable tenanted deployments, you should be able to connect your tenants to that project. You may need to enable tenanted deployments for the project. See above for more details.

## Why can't I connect a tenant to one of the environments for my project?

Firstly, check you can select a project for your tenant (see above for more details). As long as you have EnvironmentView permissions for the environment and the environment is included in one of the lifecycles used by your project, you should be able to connect your tenants to that environment. Check each of the lifecycles used by your project (each channel can specify a different lifecycle) and make sure at least one of them includes the environment.

## I want to deploy my project to a tenant, but I can't see that tenant in the list?

Make sure your tenant is connected to the correct project and environment(s). Multi-tenant deployments can get complicated very quickly, so we've written a [troubleshooting guide](/docs/tenants/troubleshooting-multi-tenant-deployments/) to help when you get stuck. For more information refer to our [tenant creation](/docs/tenants/tenant-creation/) and [tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments) sections.

## Can I provide third-party self-service sign in, so my tenants can manage their own deployments?

Yes, take a look at our [guide on enabling self-service sign in for your tenants](/docs/tenants/tenant-roles-and-security).

## How are deployment targets selected for each deployment?

Octopus uses this rule to determine which deployment targets should be included in a deployment:

- Tenanted deployments will include tenanted deployment targets matching the deployment's tenant
- Untenanted deployments will include untenanted deployment targets

For more information refer to our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.

## Can I configure deployment targets that are dedicated/limited to a single tenant?

Yes. Set the tenant filter on each of the deployment targets to a specific tenant. Octopus will ensure these deployment targets are only used in deployments for that specific tenant.

For more information refer to our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.

## Can I configure accounts that are dedicated/limited to a single tenant?

Yes. The same logic is applied to accounts as deployment targets.

For more information refer to our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.

## Can I deploy a mixture of projects to my tenants?

Yes, you can connect your tenants to as many or as few projects as you desire. The tenant-to-project/environment connection for each tenant can be configured individually, allowing you to connect each tenant to the projects and environments they require. For more information refer to our [connecting tenants to projects](/docs/tenants/tenant-creation/connecting-projects) section.

## Can I provide my tenants with a staging and production environment?

Yes, simply connect the tenant to a project and any number of environments that project can deploy into. For more information refer to our [connecting tenants to projects](/docs/tenants/tenant-creation/connecting-projects) section.

## Can I configure a standard set of variables that are required by each tenant like an alias or contact details?

Yes, we recommend creating some variable templates in a library variable set, and connecting that library variable set to all of the projects where you require those variables. Now Octopus will prompt you for those standard variables, once for each tenant. We cover this in more detail in the [tenant variables](/docs/tenants/tenant-variables) section.

## Can I use tenants and channels together?

Yes, you can apply a tenant filter to a channel as a way of expressing: "Releases in this channel may only be deployed to tenants matching the filter." For examples of working with tenants and channels see our guides:

- [Using channels and tenant tags to restrict releases to the test team](/docs/tenants/tenant-lifecycles/#restricting-test-releases)
- [Implementing an early access program](/docs/tenants/tenant-lifecycles/#early-access-program)
- [Pinning tenants to a release](/docs/tenants/tenant-lifecycles/#pinning-tenants)

## Can I pin or lock a tenant to a specific release?

Yes, you can determine which types of releases should be deployed to a your tenants by using a combination of channels and tag sets. This is part of an advanced topic which is covered in our [pinning tenants to a release](/docs/tenants/tenant-lifecycles/#pinning-tenants) section.

## Are there any known limitations or problems with multi-tenant deployments?

Whenever we discover a limitation or problem with multi-tenant deployments we create a GitHub Issue labeled with the `feature/tenants` to track its progress. [These issues](https://github.com/OctopusDeploy/Issues/issues?q=is%3Aopen+is%3Aissue+label%3Afeature%2Ftenants) represent anything we have agreed is a limitation or problem. We recommend investigating whether these limitations will impact your specific scenario.

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).