---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-02-20
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

1. Navigate to your Cloud instance in Control Center.
2. Click **Upgrade Plan**.
3. Choose your plan and complete the purchase through our checkout.

Server license:

1. Navigate to your Server License in Control Center.
2. Click **Upgrade Plan**.
3. Choose your plan and complete the purchase through our checkout.

### Pay an invoice

We will send you a unique payment link to pay your invoice through Zuora's secure payment page.

Please be cautious of phishing attempts. You can verify the payment page's authenticity by checking it displays the correct invoice number.

### Update billing information

Please [contact sales](https://octopus.com/company/contact) to update your billing information.

### View orders

1. Navigate to your subscription.
2. Click **Billing** in the left sidebar.
3. Click **Contact Sales**.
4. Complete the form and we'll get back to you with the order details.

### Change your plan

To modify your plan:

1. Navigate to your subscription.
2. Click **Billing** in the left sidebar.
3. Click **Get in Touch** under the change plan section.
4. A contact sales dialog will appear for you to request changes to your plan.

### Cancel your plan

To cancel your plan:

1. Navigate to your subscription.
2. Click **Billing** in the left sidebar.
3. Click **Get in Touch** under the change plan section.
4. A contact sales dialog will appear for you to cancel your plan.

## Configuration

### Change outage window (Cloud only)

To keep Octopus Cloud running smoothly, we use outage windows to perform updates. To minimize disruptions to your deployments, please pick a two-hour [maintenance window](/docs/octopus-cloud/maintenance-window) outside of your regular business hours.

1. Navigate to your subscription.
2. Click **Configuration** in the left sidebar.
3. Click **Change Window**.
4. Specify the start and end times.
5. Click **Submit**.

### Change instance URL (Cloud only)

1. Navigate to your subscription
2. Click **Configuration** in the left sidebar.
3. Click **Change URL**.
4. Specify the new URL.
5. Click **Submit**.

## Manage user access

### Access levels in Control Center

There are two access levels in Control Center:

- **Subscription Group access**: provides access to manage a subscription group and access to all current and future subscriptions in the group.
- **Direct access**: provides access to a specific subscription.

Each access level has associated user roles.

### Subscription Group access

#### Invite a user to Subscription Group access

Invite a user to manage a subscription group and access all current and future subscriptions in the group.

1. Locate your subscription group in [Control Center V2](https://billing.octopus.com/).
2. Click **Access Control**.
3. Click **Invite User**.
4. Enter the user’s details.
5. Select which role to give the user ([see role permissions below](#role-permissions-for-subscription-group-access)).
6. Click **Invite**.

:::figure
![Invite users to a subscription group in Control Center V2](/docs/getting-started/managing-octopus-subscriptions/images/subscription-group-access.png)
:::


The invited user will receive an email invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they just need to click **Accept invite** from the email and then **Sign in** to view the related subscriptions and instances. Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to.

If the invited user already has an Octopus ID, they must still accept the email invite to gain access to the subscription group.

#### Role permissions for Subscription Group access

|                                    | Administrator                                                    | Technical Manager                                                | Billing Manager                                                  |
| ---------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Subscription group-level**                                                                                                                                                                                                                |
| Delete and rename group            | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  | <i class="fa-solid fa-circle-xmark"></i>                         |
| Access Control                     | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  | <i class="fa-solid fa-circle-xmark"></i>                         |
| **Subscription-level**                                                                                                                                                                                                                      |
| View License Key (**Server only**)     | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  | <i class="fa-solid fa-circle-xmark"></i>                         |
| View Overview (**Cloud only**)         | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  |
| Manage Configuration (**Cloud only**)  | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  | <i class="fa-solid fa-circle-xmark"></i>                         |
| Manage Billing                     | <i class="fa-circle-check"></i>                                  | <i class="fa-solid fa-circle-xmark"></i>                         | <i class="fa-circle-check"></i>                                  |
| Manage Access Control              | <i class="fa-circle-check"></i>                                  | <i class="fa-circle-check"></i>                                  | <i class="fa-solid fa-circle-xmark"></i>                         |
| Instance access                    | <i class="fa-circle-check"></i> “Octopus Administrators” team    | <i class="fa-circle-check"></i> “Octopus Managers” team          | <i class="fa-solid fa-circle-xmark"></i>                         |

:::div{.hint}
Octopus uses a team-based system to manage user permissions. The “**Octopus Administrators**” team and “**Octopus Managers**” team provide different levels of access in your instance. Read more about [users and teams](/docs/security/users-and-teams).
:::

### Direct access

#### Invite a user to Direct access

Invite a user to access a specific subscription.

1. Navigate to your Cloud instance or Server license in [Control Center V2](https://billing.octopus.com/).
2. Click **Access Control** in the left sidebar.
3. Click **Invite User**.
4. Enter the user’s details.
5. Select which role to give the user ([see role permissions below](#role-permissions-for-direct-access)).
6. Click **Invite**.

:::figure
![Invite users to a specific subscription in Control Center V2](/docs/getting-started/managing-octopus-subscriptions/images/direct-access.png)
:::

The invited user will receive an email invitation. If they already have an [Octopus ID](/docs/security/authentication/octopusid-authentication) (Octopus Deploy account), they just need to click **Accept invite** from the email and then **Sign in** to view the Octopus instance. Otherwise, they will first need to **Register** a new account using the email address the invitation was sent to.

If the invited user already has an Octopus ID, they must still accept the email invite to gain access to the subscription.

:::div{.hint}
**Cloud instances note:** Users are only added to the Octopus Cloud instance after they sign in for the first time.
:::

#### Role permissions for Direct access

##### Cloud

|                             | Cloud Subscription Owner                                  | Cloud Subscription User                          |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| View Overview               | <i class="fa-circle-check"></i>                           | <i class="fa-circle-check"></i>                  |
| Manage Billing              | <i class="fa-circle-check"></i>                           | <i class="fa-solid fa-circle-xmark"></i>         |
| Manage Configuration        | <i class="fa-circle-check"></i>                           | <i class="fa-solid fa-circle-xmark"></i>         |
| Manage Access Control       | <i class="fa-circle-check"></i>                           | <i class="fa-solid fa-circle-xmark"></i>         |
| Instance access             | <i class="fa-circle-check"></i> “Octopus Managers” team   | <i class="fa-circle-check"></i> “Everyone” team  |

:::div{.hint}
Octopus uses a team-based system to manage user permissions. The “**Octopus Administrators**” team and “**Everyone**” team provide different levels of access in your instance. Read more about [users and teams](/docs/security/users-and-teams).
:::

##### Server

|                              | Server License Owner | Server License Viewer |
| ---------------------------- | ----------- | ---------- |
| View License Key      | <i class="fa-circle-check"></i>           | <i class="fa-circle-check"></i>                          |
| Manage Billing        | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |
| Manage Access Control | <i class="fa-circle-check"></i>           | <i class="fa-solid fa-circle-xmark"></i>                 |

### Change a user's role

To change a user's role, you must remove that user's access and then re-invite them to the role you want them to have.

### Delete a user

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