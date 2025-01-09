---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-01-09
title: Managing Octopus subscriptions
description: Control Center is where you manage your Octopus subscriptions and their associated user access. 
navOrder: 40
---

Control Center is where you manage your Octopus subscriptions and their associated user access. 

There are 2 types of Octopus subscriptions:

1. **Cloud instances**: Deployments-as-a-service
2. **Server licenses**: Octopus on your infrastructure

## Billing 

### Upgrading a trial to a paid subscription 

Cloud instance:

1. Navigate to your Cloud instance in Control Center.
2. Click **Upgrade Plan**. 
3. Choose your plan and complete the purchase through our checkout. 

Server license:

1. Navigate to your Server License in Control Center.
2. Click **Upgrade Plan**. 
3. Choose your plan and complete the purchase through our checkout.

### Paying an invoice

We will share a unique payment link with you to pay your invoice via Zuora's secure payment page. Be weary of phishing attempts and ensure the correct invoice number is displayed to verify the pages authenticity.

### Updating billing information

Please [contact sales](https://octopus.com/company/contact) to update your billing information. We'll continue to improve the billing experience throughout 2025.

### Viewing orders

1. Navigate to your subscription.
2. Click **Billing** in the left sidebar.
3. Click **Contact Sales**.
4. Complete the form and we'll get back to you with the order details.

### Changing your plan

To modify your plan:

1. Navigate to your subscription.
2. Click **Billing** in the left sidebar.
3. Click **Get in Touch** under the change plan section.
4. A contact sales dialog will appear for you to request changes to your plan.

### Canceling your plan

To cancel your plan:

1. Navigate to your subscription.
2. Click **Billing** in the left sidebar.
3. Click **Get in Touch** under the change plan section.
4. A contact sales dialog will appear for you to cancel your plan.

## Configuration 

### Changing outage windows (Cloud only)

We use outage windows to perform updates to the Octopus Deploy software, so you can take advantage of fixes and enhancements.
1. Navigate to your subscription.
2. Click **Configuration** in the left sidebar.
3. Click **Change Window**.
4. Specify the start and end times.
5. Click **Submit**.

### Changing the instance URL (Cloud only)

1. Navigate to your subscription
2. Click **Configuration** in the left sidebar.
3. Click **Change URL**.
4. Specify the new URL.
5. Click **Submit**.

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
| Delete and rename group        | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Access Control                 | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| **Subscriptions within Group** |
| Server: View License Key       | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Server: Manage Billing         | <i class="fa-circle-check"></i>             | <i class="fa-solid fa-circle-xmark"></i>        | <i class="fa-circle-check"></i>                    |
| Server: Manage Access Control  | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Cloud: View Overview           | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-circle-check"></i>                    |
| Cloud: Manage Billing          | <i class="fa-circle-check"></i>             | <i class="fa-solid fa-circle-xmark"></i>        | <i class="fa-circle-check"></i>                    |
| Cloud: Manage Configuration    | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Cloud: Manage Access Control   | <i class="fa-circle-check"></i>             | <i class="fa-circle-check"></i>                 | <i class="fa-solid fa-circle-xmark"></i>           |
| Instance access                | <i class="fa-circle-check"></i> Admin       | <i class="fa-circle-check"></i> Octopus Manager | <i class="fa-solid fa-circle-xmark"></i>           |

**Note:** Management of billing information will be handled via the sales team temporarily while we enhance this functionality throughout 2025.

#### Inviting users to Subscription Group access

1. Navigate to the dashboard and locate your subscription group.
2. Click **Access Control**.
3. Click **Invite User**.
4. Enter the user's details and click **Invite**.

The invited user will receive an email to accept the invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they can accept the invite and **Sign in** to view the related subscriptions and instances. Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to. 

If the invited user already has an Octopus ID, they must still accept the invite sent via email to complete the process.

### Direct access

Below are the roles available for Direct access:

|                              | Cloud Owner | Cloud User |
| ---------------------------- | ----------- | ---------- |
| Cloud: View Overview         | <i class="fa-circle-check"></i>           | <i class="fa-circle-check"></i>                          |
| Cloud: Manage Billing        | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Cloud: Manage Configuration  | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Cloud: Manage Access Control | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Instance access              | <i class="fa-circle-check"></i> Admin     | <i class="fa-circle-check"></i> User                     |

|                              | Server License Owner | Server License Viewer |
| ---------------------------- | ----------- | ---------- |
| Server: View License Key      | <i class="fa-circle-check"></i>           | <i class="fa-circle-check"></i>                          |
| Server: Manage Billing        | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Server: Manage Access Control | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |

**Note:** Management of billing information will be handled via the sales team temporarily while we enhance this functionality throughout 2025.

#### Inviting users to Direct access

##### Cloud

1. Navigate to your Cloud instance.
2. Click **Access Control** in the left sidebar.
3. Click **Invite User**.
4. Enter the user's details and click **Invite**.

The invited user will receive an email to accept the invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they can accept the invite and **Sign in** to view the Octopus instance. Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to. 

If the invited user already has an Octopus ID, they must still accept the invite sent via email to complete the process.

:::div{.hint}
**Note:** The user is only added to the Octopus Cloud instance after they sign in for the first time. After signing in, that user gets assigned to the **“Everyone”** team (if they’re a Cloud User) or the **“Octopus Managers”** team (if they’re a Cloud Owner).
:::

##### Server

1. Navigate to your Server License.
2. Click **Access Control** in the left sidebar.
3. Click **Invite User**.
4. Enter the user's details and click **Invite**.

The invited user will receive an email to accept the invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they can accept the invite and **Sign in** to view the Server License.

If the invited user already has an Octopus ID, they must still accept the invite sent via email to complete the process.

### Changing user roles 

To change a user's role, you must remove that user's access and then re-invite them to the role you want them to have.

### Deleting users

Deleting Subscription Group access users:

1. Navigate to the dashboard and locate your subscription group.
2. Click **Access Control**.
3. Locate the user in the table and click the trash icon.
4. Click **Delete** in the confirmation dialog.

Deleting Direct access users:

1. Navigate to your subscription.
2. Click **Access Control** in the left sidebar.
3. Locate the user in the table and click the trash icon.
4. Click **Delete** in the confirmation dialog.

## Help and support

The question mark icon in the top right of the Control Center provides a menu of helpful links to the docs, to contact support, and to upload support files.

## FAQ

### Locating subscriptions

Most subscriptions (Cloud instances and Server licenses) are accessible from the dashboard of Control Center. Some legacy subscriptions are only accessible from the legacy Control Center V1.
If you need help please contact our [support team](https://octopus.com/support). 

### What is Control Center V1?

Control Center V1 is the legacy Control Center and currently provides access to legacy subscriptions, you'll only have access to Control Center V1 if you need it to manage a legacy subscription.