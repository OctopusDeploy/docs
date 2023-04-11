---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Managing Octopus subscriptions
description: Control Center is where you manage your Octopus subscriptions and their associated user access. 
navOrder: 40
---

Control Center is where you manage your Octopus subscriptions and their associated user access. 

There are 2 types of Octopus subscriptions:

1. **Cloud instances**: Deployments-as-a-service
2. **Server licenses**: Octopus on your infrastructure

This page focuses on Control Center V2, our new system for managing Octopus subscriptions.

## Control Center V1 and V2 

### Explaining the two versions of Control Center

In October 2022, we moved to Stripe as our payment gateway, so we needed a new system for integration with Stripe. We refer to the new system as Control Center V2, and it will replace Control Center later this year. During 2023, we'll migrate your subscriptions from V1 to V2 as you pay or renew. After the migration is complete, we'll deprecate V1.

### I can’t work out how to do something in Control Center V2 that I used to do in V1

There are some Control Center V1 features that we haven’t included in V2 yet. This is only temporary while we gain feature-parity for Control Center V2.

If you can’t see how to do something in V2 that you could do in V1, please email [support@octopus.com](mailto:support@octopus.com) for assistance. 

### Locating subscriptions

All your subscriptions (Cloud instances and Server licenses) are accessible from Control Center V1. Only subscriptions we've migrated to Control Center V2 are accessible from V2.

### Migration of subscriptions

Trial subscriptions are created in Control Center V1. Subscriptions in Control Center V1 migrate to V2 when you change to a paid subscription or a yearly renewal. This is why you may have some subscriptions in Control Center V1 and others in V2 until they're all transferred to V2. 

## Finance 

### Upgrading a trial to a paid subscription 

Cloud instance:

1. Navigate to your Cloud Instance in Control Center V1.
2. Click **CHANGE PLAN**. 
3. Choose your plan and complete the purchase through Stripe. 

Server license: 

1. Navigate to your Server License in Control Center V1.
2. Click **UPGRADE LICENSE**. 
3. Choose your plan and complete the purchase through Stripe. 

In both cases, upgrading a trial to a paid subscription will migrate your subscription to Control Center V2. 

### Changing payment method or billing information (Cloud only)

1. Navigate to your Cloud instance or Server License.
2. Click **FINANCE** in the left sidebar.
3. Click **MANAGE WITH STRIPE**.
4. Use the options to edit and/or add payment methods and update your billing information.

### Viewing orders (Cloud only)

1. Navigate to your subscription.
2. Click **FINANCE** in the left sidebar.
3. Choose your option for viewing orders:
  - For recent orders, click **VIEW IN STRIPE**.
  - For older orders, click **VIEW IN CONTROL CENTER V1**.

### Configuring maximum deployment targets (Cloud only)

To help you manage your monthly spend, you can set a maximum number of deployment targets for a Cloud instance.

1. Navigate to your Cloud instance.
2. Click **FINANCE** in the left sidebar.
3. Click **SET MAXIMUM TARGETS** to configure a maximum number of targets.

### Canceling your plan (Cloud only)

To modify your plan:

1. Navigate to your Cloud instance.
2. Click **FINANCE** in the left sidebar.
3. Click **CANCEL SUBSCRIPTION**.
4. A confirmation dialog will appear for you to confirm cancellation.

## Configuration 

### Changing outage windows (Cloud only)

We use outage windows to perform updates to the Octopus Deploy software, so you can take advantage of fixes and enhancements.
1. Navigate to your subscription.
2. Click **CONFIGURATION** in the left sidebar.
3. Click **CHANGE OUTAGE WINDOW**.
4. Specify the start and end times.
5. Click **SUBMIT**.

### Changing the instance URL (Cloud only)

1. Navigate to your subscription
2. Click **CONFIGURATION** in the left sidebar.
3. Click **CHANGE URL**.
4. Specify the new URL.
5. Click **SUBMIT**.

## Access control

### Understanding access control

There are 2 levels of access you can provide users in Control Center. Each level has associated user roles.

1. **Subscription Group access** provides management of a group of subscriptions plus access to all current and future subscriptions in the group. 
2. **Direct access** provides access to individual subscriptions.

### Subscription Group access

Below are the roles for Subscription Group access, the permissions they provide for the group, and the subscriptions in the group:

|                                | Administrator | Technical Manager | Billing Manager |
| ------------------------------ | ------------- | ----------------- | --------------- |
| **Subscription Group**         |
| Delete and rename group        | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-check-circle text-success fs-20"></i>                 | <i class="fas fa-times-circle text-danger fs-20"></i>           |
| Access Control                 | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-check-circle text-success fs-20"></i>                 | <i class="fas fa-times-circle text-danger fs-20"></i>           |
| **Subscriptions within Group** |
| Server: View Overview          | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-check-circle text-success fs-20"></i>                 | <i class="fas fa-times-circle text-danger fs-20"></i>           |
| Cloud: View Overview           | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-check-circle text-success fs-20"></i>                 | <i class="fas fa-check-circle text-success fs-20"></i>    |
| Cloud: Manage Billing          | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-times-circle text-danger fs-20"></i>                        | <i class="fas fa-check-circle text-success fs-20"></i>    |
| Cloud: Manage Configuration    | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-check-circle text-success fs-20"></i>                 | <i class="fas fa-times-circle text-danger fs-20"></i>           |
| Cloud: Manage Access Control   | <i class="fas fa-check-circle text-success fs-20"></i>             | <i class="fas fa-check-circle text-success fs-20"></i>                 | <i class="fas fa-times-circle text-danger fs-20"></i>           |
| Instance access                | <i class="fas fa-check-circle text-success fs-20"></i> Admin       | <i class="fas fa-check-circle text-success fs-20"></i> Octopus Manager | <i class="fas fa-times-circle text-danger fs-20"></i>           |

Inviting users to Subscription Group access:

1. Navigate to the dashboard and locate your subscription group.
2. Click **ACCESS CONTROL**.
3. Click **INVITE USER**.
3. Enter the user’s details and click **INVITE**.

The invited user will receive an email to accept the invitation. 

### Direct access (Cloud only)

Below are the roles available for Direct access:

|                              | Cloud Owner | Cloud User |
| ---------------------------- | ----------- | ---------- |
| Cloud: View Overview         | <i class="fas fa-check-circle text-success fs-20"></i>           | <i class="fas fa-check-circle text-success fs-20"></i>          |
| Cloud: Manage Billing        | <i class="fas fa-check-circle text-success fs-20"></i>           | <i class="fas fa-times-circle text-danger fs-20"></i>                 |
| Cloud: Manage Configuration  | <i class="fas fa-check-circle text-success fs-20"></i>           | <i class="fas fa-times-circle text-danger fs-20"></i>                 |
| Cloud: Manage Access Control | <i class="fas fa-check-circle text-success fs-20"></i>           | <i class="fas fa-times-circle text-danger fs-20"></i>                 |
| Instance access              | <i class="fas fa-check-circle text-success fs-20"></i> Admin     | <i class="fas fa-check-circle text-success fs-20"></i> User     |

Inviting users to Direct access:

1. Navigate to your Cloud instance.
2. Click **ACCESS CONTROL** in the left sidebar.
3. Click **INVITE USER**.
4. Enter the user’s details and click **INVITE**.

The invited user will receive an email to accept the invitation. 

Note: The user is only added to the Octopus Deploy product after they sign into Octopus for the first time. After signing in, that user gets assigned to the "Everyone" group (if they're a Cloud User) or the "Octopus Managers" group (if they're a Cloud Owner). 

### Changing user roles 

To change a user’s role, you must remove that user’s access and then re-invite them to the role you want them to have.

### Deleting users

Deleting Subscription Group access users:

1. Navigate to the dashboard and locate your subscription group.
2. Click **ACCESS CONTROL**.
3. Locate the user in the table and click the trash icon.
4. Click **DELETE** in the confirmation dialog.

Deleting Direct access users:

1. Navigate to your Cloud instance.
2. Click **ACCESS CONTROL** in the left sidebar.
3. Locate the user in the table and click the trash icon.
4. Click **DELETE** in the confirmation dialog.