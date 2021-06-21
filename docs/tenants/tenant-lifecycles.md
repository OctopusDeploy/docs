---
title: Tenant lifecycles
description: You can control release promotion using safe tenant-aware lifecycles.
position: 60
---

You can control which [releases](/docs/releases/index.md) will be deployed to certain Tenants using [Channels](/docs/releases/channels/index.md). 

![](images/channel-restrict-by-tenant.png "width=500")

This page discusses some scenarios for controlling release promotion for tenants:

- Implementing an Early access program (EAP)
- Restricting test releases to the test team
- Pinning tenants to a release

## Implementing an early access program {#early-access-program}

Quite often, you want to involve certain customers in testing early releases of major upgrades. By using a combination of [Channels](/docs/releases/channels/index.md) and [Tenant Tags](/docs/tenants/tenant-tags.md) you can implement an opt-in early access program using tenants, making sure the beta releases are only deployed to the correct tenants and environments.

Firstly we will create a new [Lifecycle](/docs/releases/lifecycles/index.md).

![](images/multi-tenant-beta-lifecycle.png "width=500")

:::hint
Learn more about [defining a limited Lifecycle for your test Channel](/docs/releases/channels/index.md).
:::

### Step 2: Configure the tenant tags

![](images/multi-tenancy-beta-tenant-tags.png "width=500")

### Step 3: Select the tenants participating in the beta program

![](images/multi-tenant-beta-tester.png "width=500")

### Step 4: Configure a channel for the beta program

![](images/multi-tenancy-beta-channel.png "width=500")

### Step 5: Create a beta release

Create a new release of the project choosing the **2.x Beta** channel for the release, and give it a SemVer 2 version number like **2.0.0-beta.1**

![](images/multi-tenant-create-beta-release.png "width=500")

### Step 6: Deploy

Now when you are deploying **2.0.0-beta.1**, you will be able to select tenants participating in the Beta program and prevent selecting tenants who are not participating.

![](images/multi-tenant-deploy-beta-tenants.png "width=500")

## Restricting test releases {#restricting-test-releases}

You may decide to use channels as a safety measure, to restrict test releases to a limited set of test tenants. By using a combination of [Channels](/docs/releases/channels/index.md) and [Tenant Tags](/docs/tenants/tenant-tags.md) you can make sure test releases are only deployed to the correct tenants and environments.

## Pinning tenants to a release {#pinning-tenants}