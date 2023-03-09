---
title: Control Center V2
description: Control Center is where you create and manage your Octopus subscriptions and their associated user access. 
position: 140
---

Control Center is where you create and manage your Octopus subscriptions and their associated user access. 
There are two types of Octopus subscriptions:

1. **Cloud Instances**: Deployments as-a-service
2. **Server Licenses**: Octopus on your infrastructure

## Control Center V1 and V2 

### Explaining the two versions of Control Center

In October 2022, we made the transition to use Stripe as our payment gateway. This decision required a new system for integration with Stripe. This new system is referred to as Control Center V2, and will be the future of Control Center. During 2023, subscriptions from V1 will be migrated to V2 as they are paid or renewed. Once that migration is complete, V1 will be deprecated.

### I can’t work out how to do something in Control Center V2 that I used to be able to do in V1

There are some Control Center V1 features that haven’t been included in V2 yet. This is only temporary while we gain feature-parity for the new Control Center.

If you can’t see how to do something in V2 that you were able to do in V1 (e.g. change subdomain), please email support@octopus.com for assistance. 

### Locating subscriptions

All your subscriptions (Cloud Instances and Server Licenses) are accessible from Control Center V1. Only subscriptions that have been migrated to Control Center V2 are accessible from V2. 

### Migration of subscriptions

Trial subscriptions are created in Control Center V1. Subscriptions in Control Center V1 are migrated to V2 upon changing to a paid subscription or a yearly renewal. This is why you may have some subscriptions in Control Center V1 and others in V2 until they have all been transferred to V2. 

## Finance 

The finance functionality is coming soon to Server Licenses. 

### Changing payment method or billing information (Cloud only, Server coming soon)

1. Navigate to your Cloud Instance or Server License
2. Click FINANCE in the left sidebar
3. Click MANAGE WITH STRIPE 
4. There are options to edit and/or add payment methods and update your billing information

### Viewing orders (Cloud only, Server coming soon)

1. Navigate to your subscription
2. Click FINANCE in the left sidebar
3. Choose your option for viewing orders:
  - For recent orders, click VIEW IN STRIPE
  - For older orders, click VIEW IN CONTROL CENTER V1

### Configuring maximum deployment targets (Cloud only)

To help you manage your monthly spend, you can set a maximum number deployment targets for a Cloud Instance.

1. Navigate to your Cloud Instance
2. Click FINANCE in the left sidebar
3. Click SET MAXIMUM TARGETS to configure a maximum number of targets

### Cancelling your plan (Cloud only, Server coming soon)

To modify your plan:

1. Navigate to your Cloud Instance
2. Click FINANCE in the left sidebar
3. Click CANCEL SUBSCRIPTION
4. A confirmation dialog will appear for you to confirm cancellation

## Configuration 

### Changing outage windows (Cloud only)

We use outage windows to perform updates to the Octopus Deploy software, so you can take advantage of fixes and enhancements.
Navigate to your subscription

1. Click CONFIGURATION in the left sidebar
2. Click CHANGE OUTAGE WINDOW
3. Specify the start and end times
4. Click SUBMIT
5. Changing the instance URL (Cloud only)

### Navigate to your subscription

1. Click CONFIGURATION in the left sidebar
2. Click Change URL
3. Specify the new URL
4. Click SUBMIT

## Access control

### Understanding access control

There are two options for the level of access you can provide to users in Control Center. Each level has associated user roles.

1. **Subscription Group access** provides management of a group of subscriptions as well as access to all current and future subscriptions within the group. 
2. **Direct access** provides access to individual subscriptions.

### Subscription Group access

Shown below are the roles available for Subscription Group access and the permissions they provide for the group and those subscriptions within the group:

|                                | Administrator | Technical Manager | Billing Manager |
| ------------------------------ | ------------- | ----------------- | --------------- |
| **Subscription Group**         |
| Delete and rename group        | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>                 | <i class="fas fa-times-circle text-danger fs-24"></i>           |
| Access Control                 | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>                 | <i class="fas fa-times-circle text-danger fs-24"></i>           |
| **Subscriptions within Group** |
| Server: View Overview          | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>                 | <i class="fas fa-times-circle text-danger fs-24"></i>           |
| Cloud: View Overview           | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>                 | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>    |
| Cloud: Manage Billing          | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-times-circle text-danger fs-24"></i>                        | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>    |
| Cloud: Manage Configuration    | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>                 | <i class="fas fa-times-circle text-danger fs-24"></i>           |
| Cloud: Manage Access Control   | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>             | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>                 | <i class="fas fa-times-circle text-danger fs-24"></i>           |
| Instance access                | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i> Admin       | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i> Octopus Manager | <i class="fas fa-times-circle text-danger fs-24"></i>           |

Inviting users to Subscription Group access:

1. Navigate to the dashboard and locate your subscription group
2. Click ACCESS CONTROL
3. Click INVITE USER
3. Enter the user’s details and click INVITE

The invited user will receive an email to accept the invitation. 

### Direct access (Cloud only)

Shown below are the roles available for Direct access:

|                              | Cloud Owner | Cloud User |
| ---------------------------- | ----------- | ---------- |
| Cloud: View Overview         | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>           | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>          |
| Cloud: Manage Billing        | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>           | <i class="fas fa-times-circle text-danger fs-24"></i>                 |
| Cloud: Manage Configuration  | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>           | <i class="fas fa-times-circle text-danger fs-24"></i>                 |
| Cloud: Manage Access Control | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i>           | <i class="fas fa-times-circle text-danger fs-24"></i>                 |
| Instance access              | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i> Admin     | <i class="fas fa-check-circle color-text-cyan-40 fs-24"></i> User     |

Inviting users to Direct access:

1. Navigate to your Cloud Instance
2. Click ACCESS CONTROL in the left sidebar
3. Click INVITE USER
4. Enter the user’s details and click INVITE

The invited user will receive an email to accept the invitation. 

Note: The user wont be added to the Octopus Deploy product until they sign into Octopus for the first time. Upon signing in, that user will be assigned to the “Everyone” group (if a Cloud User) or the “Octopus Managers” group (if a Cloud Owner). 

### Changing user roles 

To change a user’s role you must remove that user’s access and then re-invite them into the role you would like them to have.

### Deleting users

Deleting Subscription Group access users:

1. Navigate to the dashboard and locate your subscription group
2. Click ACCESS CONTROL
3. Locate the user in the table and click the trash icon
4. Click DELETE in the confirmation dialog

Deleting Direct access users:

1. Navigate to your Cloud Instance
2. Click ACCESS CONTROL in the left sidebar
3. Locate the user in the table and click the trash icon
4. Click DELETE in the confirmation dialog