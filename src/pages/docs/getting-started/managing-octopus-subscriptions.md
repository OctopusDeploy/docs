---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-06-13
title: Managing Octopus subscriptions
description: Control Center is where you manage your Octopus subscriptions and their associated user access. 
navOrder: 40
---

Control Center is where you manage your Octopus subscriptions and their associated user access.

There are two types of Octopus subscriptions:

1. **Cloud instances**: Deployments-as-a-service
2. **Server licenses**: Octopus on your infrastructure

## Billing

### Upgrade a trial to a paid subscription

Cloud instance:

1. Navigate to your Cloud instance in [Control Center](https://billing.octopus.com/).
2. Click **Upgrade Plan**.
3. Choose your plan and complete the purchase through our checkout.

Server license:

1. Navigate to your Server License in [Control Center](https://billing.octopus.com/).
2. Click **Upgrade Plan**.
3. Choose your plan and complete the purchase through our checkout.

### Pay an invoice

We will send you a unique payment link to pay your invoice through Zuora's secure payment page.

Please be cautious of phishing attempts. You can verify the payment page's authenticity by checking it displays the correct invoice number.

### Update billing information

Please [contact sales](https://octopus.com/company/contact) to update your billing information.

### View orders

1. Navigate to your subscription in [Control Center](https://billing.octopus.com/).
2. Click **Billing** in the left sidebar.
3. Click **Contact Sales**.
4. Complete the form and we'll get back to you with the order details.

### Change your plan

To modify your plan:

1. Navigate to your subscription in [Control Center](https://billing.octopus.com/).
2. Click **Billing** in the left sidebar.
3. Click **Get in Touch** under the change plan section.
4. A contact sales dialog will appear for you to request changes to your plan.

### Cancel your plan

To cancel your plan:

1. Navigate to your subscription in [Control Center](https://billing.octopus.com/).
2. Click **Billing** in the left sidebar.
3. Click **Get in Touch** under the change plan section.
4. A contact sales dialog will appear for you to cancel your plan.

## Configuration

### Change outage window (Cloud only)

To keep Octopus Cloud running smoothly, we use outage windows to perform updates. To minimize disruptions to your deployments, please pick a two-hour [maintenance window](/docs/octopus-cloud/maintenance-window) outside of your regular business hours.

1. Navigate to your subscription in [Control Center](https://billing.octopus.com/).
2. Click **Configuration** in the left sidebar.
3. Click **Change Window**.
4. Specify the start and end times.
5. Click **Submit**.

### Change instance URL (Cloud only)

1. Navigate to your subscription in [Control Center](https://billing.octopus.com/).
2. Click **Configuration** in the left sidebar.
3. Click **Change URL**.
4. Specify the new URL.
5. Click **Submit**.

## Manage user access

### Access levels in Control Center

There are two access levels in Control Center:

- **Subscription Group access**: manage a subscription group and access all current and future subscriptions in the group.
- **Direct Subscription access**: access a specific subscription.

### Subscription Group access

#### Invite a user to Subscription Group access

Invite a user to manage a subscription group and access all current and future subscriptions in the group.

1. In the [Control Center](https://billing.octopus.com/) dashboard, locate your subscription group.
2. Click **User Access**.
3. Click **Invite User**.
4. Enter the user’s details.
5. Select which role to give the user ([see role permissions below](#role-permissions-for-subscription-group-access)).
6. Click **Invite**.

:::figure
![Invite users to a subscription group in Control Center](/docs/img/getting-started/managing-octopus-subscriptions/images/subscription-group-access.png)
:::

#### Email invitation

The invited user will receive an email invitation.

If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they just need to click **Accept invite** to gain access to the subscription group and then click **Sign in** to view it.

Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to.

#### Role permissions for Subscription Group access

##### Group-level

|              | Administrator            | Technical Manager              | Billing Manager         |
| ------------ | ------------------------ | ------------------------------ | ----------------------- |
| **Control Center** <div class="table-hint">(billing.octopus.com)</div> | Rename/Delete Group <br>Manage User Access</br> | Rename/Delete Group <br>Manage User Access</br> | - |

##### Subscription-level

<details data-group="subscription-group-level">
<summary>Cloud</summary>

|              | Administrator            | Technical Manager              | Billing Manager         |
| ------------ | ------------------------ | ------------------------------ | ----------------------- |
| **Control Center** <div class="table-hint">(billing.octopus.com)</div> | View Overview <br>Manage Billing</br> Manage Configuration <br>Manage User Access</br> | View Overview <br>Manage Configuration</br> Manage User Access | View Overview <br>Manage Billing</br> |
| **Octopus Instance** <div class="table-hint">(example.octopus.com)</div> | “Octopus Managers" team | “Space Managers” team | -  |

:::div{.hint}
Octopus uses teams and user roles to manage permissions. The “Octopus Managers” and “Space Managers” teams provide different levels of access in your instance. Learn about best practices for [users, roles, and teams](/docs/best-practices/octopus-administration/users-roles-and-teams).
:::

</details>
<details data-group="subscription-group-level">
<summary>Server</summary>

|              | Administrator            | Technical Manager              | Billing Manager         |
| ------------ | ------------------------ | ------------------------------ | ----------------------- |
| **Control Center** <div class="table-hint">(billing.octopus.com)</div> | View License Key <br>Manage Billing</br> Manage User Access | View License Key <br>Manage User Access</br>  | View License Key <br>Manage Billing</br> |


</details>

### Direct Subscription access

#### Invite a user to Direct Subscription access

Invite a user to access a specific subscription.

##### Cloud

1. Navigate to your Cloud instance in [Control Center](https://billing.octopus.com/).
2. Click **User Access** in the left sidebar.
3. Click **Invite User**.
4. Enter the user’s details.
5. Select which role to give the user ([see role permissions below](#role-permissions-for-direct-access)).
6. Click **Invite**.

##### Server

1. Navigate to your Server license in [Control Center](https://billing.octopus.com/).
2. Click **Admin Access** in the left sidebar.
3. Click **Invite Admin**.
4. Enter the user’s details.
5. Select which role to give the user ([see role permissions below](#role-permissions-for-direct-access)).
6. Click **Invite**.

:::figure
![Invite users to a specific subscription in Control Center](/docs/img/getting-started/managing-octopus-subscriptions/images/direct-access.png)
:::

#### Email invitation \{#email-invitation}

The invited user will receive an email invitation.

If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they just need to click **Accept invite** in the email to gain access to the subscription and then click **Sign in** to view the Octopus instance.

Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to.

:::div{.hint}
**Cloud instances note:** Invited users are only added to an Octopus Cloud instance after their first sign-in. To manage a newly invited user’s permissions, you will need to ask them to sign in to your Octopus Cloud instance first.
:::

#### Role permissions for Direct access

<details data-group="subscription-level">
<summary>Cloud</summary>

|                             | Cloud Subscription Owner                 | Cloud Subscription User (Contributor)            | Cloud Subscription User (Base)                   |
| --------------------------- | ---------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| **Control Center** <div class="table-hint">(billing.octopus.com)</div> | View Overview <br>Manage Billing</br> Manage Configuration <br>Manage User Access</br> | View Overview | View Overview |
| **Octopus Instance** <div class="table-hint">(example.octopus.com)</div> | “Octopus Managers” team <div class="table-hint">By default, the user has full permissions across all spaces.</div>| “Space Managers” team  <div class="table-hint">By default, the user has full permissions in the “Default” space only.</div> <div class="table-hint" style="padding-top: 8px;">If you delete the “Default” space, the user will be added to the “Everyone” team.</div> | “Everyone” team  <div class="table-hint">By default, the user can sign in but can't view or do anything.</div> |

:::div{.hint}
Octopus uses teams and user roles to manage permissions. The “Octopus Managers”, “Space Managers”, and “Everyone” teams provide different levels of access in your instance. Learn about best practices for [users, roles, and teams](/docs/best-practices/octopus-administration/users-roles-and-teams).
:::

</details>
<details data-group="subscription-level">
<summary>Server</summary>

|              | Server License Owner           | Server License Viewer         |
| ------------ | ------------------------------ | ------------------------------|
| **Control Center** <div class="table-hint">(billing.octopus.com)</div> | View License Key <br>Manage Billing</br> Manage User Access | View License Key |

</details>

### Change a user's role

To change a user's role, you must remove that user's access and then re-invite them to the role you want them to have.

### Delete a user

Deleting Subscription Group access users:

1. Navigate to the dashboard and locate your subscription group.
2. Click **User Access**.
3. Locate the user in the table and click the trash icon.
4. Click **Delete** in the confirmation dialog.

Deleting Direct access users:

1. Navigate to your subscription.
2. Click **User Access** in the left sidebar.
3. Locate the user in the table and click the trash icon.
4. Click **Delete** in the confirmation dialog.

## Help and support

The question mark icon in the top right of the Control Center provides a menu of helpful links to the docs, to contact support, and to upload support files.

## FAQ

### Locating subscriptions

Most subscriptions (Cloud instances and Server licenses) are accessible from the dashboard of Control Center. Some legacy subscriptions are only accessible from the legacy Control Center V1.

If you need help please contact our [support team](https://octopus.com/support).

### What is Control Center V1?

[Control Center V1](https://octopus.com/control-center) is our legacy system where legacy subscriptions are managed. You should only access Control Center V1 if you need to manage a legacy subscription.
