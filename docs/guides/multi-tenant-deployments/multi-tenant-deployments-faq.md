---
title: Multi-tenant deployments FAQ
position: 1
---

This page contains some of the questions we are asked most often related to multi-tenant deployments in Octopus Deploy.

- Why can't I see the tenant area in the main menu, or anything about tenants for that matter?
- Is there anything special about multi-tenant projects or environments?
- Can I deploy to multiple tenants in a single deployment?
- Can I deploy to multiple tenants at the same time?
- Can I have a combination of tenanted and untenanted projects?
- What is an "un-tenanted deployment"? Don't I have to choose a tenant when deploying my project?
- Can I prevent "un-tenanted deployments" of a project?
- Can I require a tenant for all deployments of a project?
- Why can't I connect a tenant to my project, or perform a tenanted deployment of my project?
- I want to deploy my project to a tenant, but I can't see that tenant in the list?
- Is licensing affected by the number of tenants I have?
- Can I provide 3rd-party self-service sign in, so my tenants can manage their own deployments?
- How are deployment targets selected for each deployment?
- Can I configure deployment targets that are dedicated/limited to a single tenant?
- Can I configure accounts that are dedicated/limited to a single tenant?
- Can I deploy a mixture of projects to my tenants?
- Can I provide my tenants with a staging and production environment?
- Can I configure a standard set of variables that are required by each tenant like an alias or contact details?
- Can I use tenants and channels together?
- Can I pin or lock a tenant to a specific release?

### Why can't I see the tenant area in the main menu, or anything about tenants for that matter? {#Multi-tenantdeploymentsFAQ-Whycan&#39;tIseethetenantareainthemainmenu,oranythingabouttenantsforthatmatter?}

Multi-tenant deployments were shipped as part of Octopus 3.4, perhaps you need to upgrade your Octopus Server? You also need to enable the feature in *Configuration > Features*. For more information refer to [creating your first tenant](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-tenant.md).

### Is there anything special about multi-tenant projects or environments? {#Multi-tenantdeploymentsFAQ-Isthereanythingspecialaboutmulti-tenantprojectsorenvironments?}

No, not really. Any good old Octopus project or environment can work with tenants. To start deploying a project using tenants:

1. Configure the project to allow tenanted deployments in *Project > Settings**> Multi-tenant deployments* - multi-tenant deployments are disabled for your existing projects by default.
2. Connect some tenants to the the project, including the environments where you want to deploy instances of your projects for each tenant.

For more information refer to [creating your first multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md) and [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Can I deploy to multiple tenants in a single deployment? {#Multi-tenantdeploymentsFAQ-CanIdeploytomultipletenantsinasingledeployment?}

No. A tenant is treated like a smaller slice of an environment. Octopus creates a new deployment for every tenant/environment combination you are deploying a release into. For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Can I deploy to multiple tenants at the same time? {#Multi-tenantdeploymentsFAQ-CanIdeploytomultipletenantsatthesametime?}

Yes! You can create multiple tenanted deployments at the same time very easily by using the Octopus UI, `octo.exe` or any of the build server extensions. You can choose multiple tenants using [Tenant Tags](/docs/key-concepts/tenants/tenant-tags.md) or all of the tenants in an environment. For more information refer to [deploying releases with octo.exe](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md) and [designing a multi-tenant upgrade process](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md).

### Can I have a combination of tenanted and untenanted projects? {#Multi-tenantdeploymentsFAQ-CanIhaveacombinationoftenantedanduntenantedprojects?}

Yes! Each project can control its interaction with tenants. By default the multi-tenant deployment features are disabled. You can allow deployments with/without a tenant, which is a hybrid mode that is useful when you are transitioning to a fully multi-tenant project. There is also a mode where you can require a tenant for all deployments, which disables untenanted deployments for that project.

![](/docs/images/5669243/5865711.png)

### What is an "un-tenanted deployment"? Don't I have to choose a tenant when deploying my project? {#Multi-tenantdeploymentsFAQ-Whatisan&quot;un-tenanteddeployment&quot;?Don&#39;tIhavetochooseatenantwhendeployingmyproject?}

When you first enable multi-tenant deployments you won't have any tenants, and we don't want that to stop you from deploying your existing projects. Perhaps you are using an [environment-per-tenant](/docs/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4/index.md) model and will migrate to tenants over a period of time, so some deployments will start to have a tenant whilst others do not. Essentially an "un-tenanted deployment" is the same kind of deployment Octopus always performed: *there is no tenant for this deployment*. When you deploy using a tenant Octopus includes variables from the tenant, and the selected tenant can impact which steps are run, which variable values are used, and which deployment targets are included, at your discretion. For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Can I prevent "un-tenanted deployments" of a project? {#Multi-tenantdeploymentsFAQ-CanIprevent&quot;un-tenanteddeployments&quot;ofaproject?}

Yes. Choose the **Require a tenant for all deployments** option in the Project settings. For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Can I require a tenant for all deployments of a project? {#Multi-tenantdeploymentsFAQ-CanIrequireatenantforalldeploymentsofaproject?}

Yes, see the previous question. For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Why can't I connect a tenant to my project, or perform a tenanted deployment of my project? {#Multi-tenantdeploymentsFAQ-Whycan&#39;tIconnectatenanttomyproject,orperformatenanteddeploymentofmyproject?}

Each project can opt-in to tenanted deployment features, perhaps your project needs to enable tenanted deployments? See above for more details.

### I want to deploy my project to a tenant, but I can't see that tenant in the list? {#Multi-tenantdeploymentsFAQ-Iwanttodeploymyprojecttoatenant,butIcan&#39;tseethattenantinthelist?}

Granted, multi-tenant deployments can get complicated very quickly, so we've written a [troubleshooting guide](/docs/guides/multi-tenant-deployments/troubleshooting-multi-tenant-deployments.md) to help when you get stuck. At the very least, make sure your tenant is connected to the correct project and environment(s). For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Is licensing affected by the number of tenants I have? {#Multi-tenantdeploymentsFAQ-IslicensingaffectedbythenumberoftenantsIhave?}

No, you can create an unlimited number of tenants without any impact on licensing in Octopus 3.x.

### Can I provide 3rd-party self-service sign in, so my tenants can manage their own deployments? {#Multi-tenantdeploymentsFAQ-CanIprovide3rd-partyself-servicesignin,somytenantscanmanagetheirowndeployments?}

Yes, take a look at our [guide on enabling self-service sign in for your tenants](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/multi-tenant-roles-and-security.md).

### How are deployment targets selected for each deployment?   {#Multi-tenantdeploymentsFAQ-Howaredeploymenttargetsselectedforeachdeployment?}

Octopus uses this rule to determine which deployment targets should be included in a deployment:

- Tenanted deployments will include tenanted deployment targets matching the deployment's tenant
- Un-tenanted deployments will include un-tenanted deployment targets (just like good old Octopus)

For more information refer to [designing a multi-tenant hosting model](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

### Can I configure deployment targets that are dedicated/limited to a single tenant? {#Multi-tenantdeploymentsFAQ-CanIconfiguredeploymenttargetsthatarededicated/limitedtoasingletenant?}

Yes. Set the tenant filter on each of the deployment targets to a specific tenant. Octopus will ensure these deployment targets are only used in deployments for that specific tenant.

For more information refer to [designing a multi-tenant hosting model](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

### Can I configure accounts that are dedicated/limited to a single tenant? {#Multi-tenantdeploymentsFAQ-CanIconfigureaccountsthatarededicated/limitedtoasingletenant?}

Yes. The same logic is applied to accounts as deployment targets.

For more information refer to [designing a multi-tenant hosting model](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

### Can I deploy a mixture of projects to my tenants? {#Multi-tenantdeploymentsFAQ-CanIdeployamixtureofprojectstomytenants?}

Yes, you can connect your tenants to as many or as few projects as you desire. The tenant-to-project/environment connection for each tenant can be configured individually, allowing you to connect each tenant to the projects and environments they require. For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Can I provide my tenants with a staging and production environment? {#Multi-tenantdeploymentsFAQ-CanIprovidemytenantswithastagingandproductionenvironment?}

Yes, simply connect the tenant to a project and any number of environments that project can deploy into. For more information refer to [deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

### Can I configure a standard set of variables that are required by each tenant like an alias or contact details? {#Multi-tenantdeploymentsFAQ-CanIconfigureastandardsetofvariablesthatarerequiredbyeachtenantlikeanaliasorcontactdetails?}

Yes, we recommend creating some variable templates in a library variable set, and connecting that library variable set to all of the projects where you require those variables. Now Octopus will prompt you for those standard variables, once for each tenant. We cover this in more detail in the [working with tenant-specific variables](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md) section of our guide.

### Can I use tenants and channels together? {#Multi-tenantdeploymentsFAQ-CanIusetenantsandchannelstogether?}

Yes, you can apply a tenant filter to a channel as a way of expressing: "Releases in this channel may only be deployed to tenants matching the filter." For examples of working with tenants and channels see [using channels and tenant tags to restrict releases to the test team](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md), [implementing an early access program](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md), and [pinning tenants to a release](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md) in our guide.

### Can I pin or lock a tenant to a specific release? {#Multi-tenantdeploymentsFAQ-CanIpinorlockatenanttoaspecificrelease?}

Yes, you can determine which types of releases should be deployed to a your tenants by using a combination of channels and tag sets. This is part of an advanced topic which is covered in detail by [designing a multi-tenant upgrade process](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md).
