---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-30
title: Tenant lifecycles
icon: fa-solid fa-arrows-spin
description: You can control release promotion using safe tenant-aware lifecycles.
navOrder: 60
---

You can control which [releases](/docs/releases/) will be deployed to certain tenants using [channels](/docs/releases/channels).

:::figure
![](/docs/tenants/images/channel-restrict-by-tenant.png)
:::

This page discusses some scenarios for controlling release promotion for tenants:

- Implementing an early access program (EAP)
- Restricting test releases to the test team
- Pinning tenants to a release

## Implementing an early access program {#early-access-program}

Quite often, you want to involve certain customers in testing early releases of major upgrades. By using a combination of [channels](/docs/releases/channels/) and [tenant tags](/docs/tenants/tenant-tags) you can implement an opt-in early access program using tenants, making sure the beta releases are only deployed to the correct tenants and environments.

### Step 1: Create the lifecycle {#eap-step-1-lifecycle}

Firstly we will create a new [lifecycle](/docs/releases/lifecycles).

:::figure
![](/docs/tenants/images/multi-tenant-limited-lifecycle.png)
:::

:::div{.hint}
Learn more about [defining a limited lifecycle for your test channel](/docs/releases/channels).
:::

### Step 2: Configure the tenant tags {#eap-step-2-configure-tenant-tag}

Add a new tag called **2.x Beta** to a new or existing tenant tag set.

:::figure
![](/docs/tenants/images/multi-tenant-beta-tenant-tags.png)
:::

### Step 3: Select the tenants participating in the beta program {#eap-step-3-choose-tenants}

Add the **2.x Beta** tag to one or more tenants who are included in the beta program

:::figure
![](/docs/tenants/images/multi-tenant-beta-tester.png)
:::

### Step 4: Configure a channel for the beta program {#eap-step-4-configure-channel}

Create a channel called **2.x Beta** and restrict its use to tenants tagged with **2.x Beta**

:::figure
![](/docs/tenants/images/multi-tenant-beta-channel.png)
:::

### Step 5: Create a beta release {#eap-step-5-create-release}

Create a new release of the project choosing the **2.x Beta** channel for the release, and give it a [SemVer](http://semver.org/) version number like **2.0.0-beta.1**

:::figure
![](/docs/tenants/images/multi-tenant-create-beta-release.png)
:::

### Step 6: Deploy {#eap-step-6-deploy}

Now when you are deploying **2.0.0-beta.1**, you will be able to select tenants participating in the Beta program and prevent selecting tenants who are not participating.

:::figure
![](/docs/tenants/images/multi-tenant-deploy-beta-tenants.png)
:::

## Restricting test releases {#restricting-test-releases}

You may decide to use channels as a safety measure, to restrict test releases to a limited set of test tenants. By using a combination of [channels](/docs/releases/channels/) and [tenant tags](/docs/tenants/tenant-tags) you can make sure test releases are only deployed to the correct tenants and environments.

### Step 1: Create the lifecycle {#test-step-1-lifecycle}

Firstly we will create a new [lifecycle](/docs/releases/lifecycles).

:::figure
![](/docs/tenants/images/multi-tenant-limited-lifecycle.png)
:::

:::div{.hint}
Learn more about [defining a limited lifecycle for your test channel](/docs/releases/channels).
:::

### Step 2: Configure the tenant tags {#test-step-2-configure-tenant-tag}

Add a new tag called **Tester** to a new or existing tenant tag set.

:::figure
![](/docs/tenants/images/multi-tenant-tester-tenant-tags.png)
:::

### Step 3: Select the tenants participating in the test program {#test-step-3-choose-tenants}

Add the **Tester** tag to one or more tenants who are included in the test program

:::figure
![](/docs/tenants/images/multi-tenant-tester.png)
:::

### Step 4: Configure a channel for the test program {#test-step-4-configure-channel}

Create a channel called **1.x Test** and restrict its use to tenants tagged with **Tester**

:::figure
![](/docs/tenants/images/multi-tenant-test-channel.png)
:::

### Step 5: Create a test release {#test-step-5-create-release}

Now create a release in the new **1.x Test** channel giving it a [SemVer](http://semver.org/) pre-release version like **1.0.1-alpha.19** indicating this is a pre-release of **1.0.1** for testing purposes.

:::figure
![](/docs/tenants/images/multi-tenant-create-test-release.png)
:::

### Step 6: Deploy {#test-step-6-deploy}

When you deploy this release, you will be able to choose from the limited set of tenants tagged with the `Tester` tag and deploy into the test environments, but no further.

:::figure
![](/docs/tenants/images/multi-tenant-deploy-test-tenants.png)
:::

## Pinning tenants to a release {#pinning-tenants}

Often, you will want to disable/prevent deployments to a tenant during a period of time where the customer wants guarantees of stability. You can prevent deployments to tenants using a combination of [channels](/docs/releases/channels/) and [tenant tags](/docs/tenants/tenant-tags).

### Step 1: Create the upgrade ring/pinned tag {#pinned-step-1-configure-tenant-tag}

Add a new tag called **Pinned** to a new or existing tenant tag set with a color that stands out.

:::figure
![](/docs/tenants/images/multi-tenant-upgrade-ring-pinned.png)
:::

### Step 2: Configure the channels to prevent deployments to pinned tenants

Now we will configure the project channels to make sure we never deploy any releases to pinned tenants. We will do this using a similar method to the [EAP Beta program](#early-access-program), but in this case, we are making sure none of the channels allow deployments to tenants tagged as pinned.

1. Find the channel in your project that represents normal releases - this is called **1.x Normal** in this example.
1. Restrict deployments of releases in this channel to the following tenant tags: 
    - **Early adopter**
    - **Stable**
    - **Tester**
1. Ensure the **Pinned** tenant tag is not selected on any channel.

:::figure
![](/docs/tenants/images/multi-tenant-pinned-tenants.png)
:::

### Step 3: Prevent deployments to a tenant by tagging them as upgrade ring/pinned

Find a tenant you want to pin and apply the **Pinned** tag, removing any other tags. This will prevent you from deploying any releases to this tenant.

![](/docs/tenants/images/multi-tenant-pinned-tenant-upgrade-ring.png)