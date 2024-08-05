---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-05
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

In October 2022, we moved to Stripe as our payment gateway, so we needed a new system for integration with Stripe. We refer to the new system as Control Center V2, and it replaces the original Control Center V1.

### I can't work out how to do something in Control Center V2 that I used to do in V1

There are some Control Center V1 features that we haven't included in V2 yet. This is only temporary while we gain feature-parity for Control Center V2.

If you can't see how to do something in V2 that you could do in V1, please contact our [support team](https://octopus.com/support). 

### Locating subscriptions

Most subscriptions (Cloud instances and Server licenses) are accessible from Control Center V2. Some legacy subscriptions are only accessible from Control Center V1.

## Finance 

### Upgrading a trial to a paid subscription 

Cloud instance:

1. Navigate to your Cloud Instance in Control Center V2.
2. Click **UPGRADE PLAN**. 
3. Choose your plan and complete the purchase through Stripe. 

Server license:

1. Navigate to your Server License in Control Center V2.
2. Click **UPGRADE PLAN**. 
3. Choose your plan and complete the purchase through Stripe. 

### Changing payment method or billing information (Cloud only)

1. Navigate to your Cloud instance or Server License.
2. Click **FINANCE** in the left sidebar.
3. Click **MANAGE SUBSCRIPTION**.
4. Use the options to edit and/or add payment methods and update your billing information.

### Viewing orders

1. Navigate to your subscription.
2. Click **FINANCE** in the left sidebar.
3. Choose your option for viewing orders:
  - For recent orders, click **VIEW SUBSCRIPTION**.
  - For older orders, click **CONTACT SALES**.

### Configuring maximum deployment targets (legacy Cloud only)

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

Changes to access control in Control Center V1 will only affect subscriptions located in Control Center V1 and changes in Control Center V2 will only affect subscriptions located in Control Center V2.

### Subscription Group access

Below are the roles for Subscription Group access, the permissions they provide for the group, and the subscriptions in the group:

|                                | Administrator | Technical Manager | Billing Manager |
| ------------------------------ | ------------- | ----------------- | --------------- |
| **Subscription Group**         |
| Delete and rename group        | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Access Control                 | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| **Subscriptions within Group** |
| Server: View Overview          | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Cloud: View Overview           | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-circle-check"></i>    |
| Cloud: Manage Billing          | <i class="fa-circle-check"></i>             | <i class="fa-solid fa-circle-xmark"></i>                        | <i class="fa-circle-check"></i>    |
| Cloud: Manage Configuration    | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Cloud: Manage Access Control   | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Instance access                | <i class="fa-circle-check"></i> Admin       | <i class="fa-circle-check"></i> Octopus Manager | <i class="fa-solid fa-circle-xmark"></i>           |

#### Inviting users to Subscription Group access

1. Navigate to the dashboard and locate your subscription group.
2. Click **ACCESS CONTROL**.
3. Click **INVITE USER**.
4. Enter the user's details and click **INVITE**.

The invited user will receive an email to accept the invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they can accept the invite and **Sign in** to view the Octopus instance. Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to. 

If the invited user already has an Octopus ID, they must still accept the invite sent via email to complete the process.

### Direct access (Cloud only)

Below are the roles available for Direct access:

|                              | Cloud Owner | Cloud User |
| ---------------------------- | ----------- | ---------- |
| Cloud: View Overview         | <i class="fa-circle-check"></i>           | <i class="fa-circle-check"></i>          |
| Cloud: Manage Billing        | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Cloud: Manage Configuration  | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Cloud: Manage Access Control | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Instance access              | <i class="fa-circle-check"></i> Admin     | <i class="fa-circle-check"></i> User     |

#### Inviting users to Direct access

1. Navigate to your Cloud instance.
2. Click **ACCESS CONTROL** in the left sidebar.
3. Click **INVITE USER**.
4. Enter the user's details and click **INVITE**.

The invited user will receive an email to accept the invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they can accept the invite and **Sign in** to view the Octopus instance. Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to. 

If the invited user already has an Octopus ID, they must still accept the invite sent via email to complete the process.

:::div{.hint}
**Note:** The user is only added to the Octopus Cloud instance after they sign in for the first time. After signing in, that user gets assigned to the **“Everyone”** team (if they’re a Cloud User) or the **“Octopus Managers”** team (if they’re a Cloud Owner).
:::

### Changing user roles 

To change a user's role, you must remove that user's access and then re-invite them to the role you want them to have.

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
