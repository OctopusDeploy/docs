---
title: Configurable Timeouts and Session Invalidation
description: Timeouts and session invalidation can be used to enforce a user to re-authenticate.
---

:::hint
Configurable Session timeouts and Session invalidation was added in Octopus **2022.2**.
:::

Octopus supports invalidating user sessions using a configurable timeout or explicitly invalidating a user's session.

## Configurable Timeouts {#TimeoutsAndInvalidation-ConfigurableTimeouts}

You can configure **Session Timeouts** in Octopus to force re-authentication after a specified time. By default, session timeouts are set to 20 minutes. This timeout can be changed by a System Administrator and applies to all users in an instance.

To change the Session Timeout duration, navigate to **{{ Configuration, Settings, Authentication }}** in the Octopus Web Portal, and enter the Session Timeout duration (in seconds) and click **SAVE**.

There is also a **Maximum Session Duration**, which applies when users click the `Remember Me` option when signing into Octopus. By default, this option is set to 20 days. Enter the desired maximum session timeout duration (in seconds) and click **SAVE**.

![Configurable Timeout Image](/docs/security/users-and-teams/images/configurable-timeout.png "width=1000")

## Session Invalidation {#TimeoutsAndInvalidation-SessionInvalidation}

A user's sessions can explicitly be revoked. This ensures that a user cannot interact with the system until after they have re-authenticated. 

This can be particularly useful in the following scenarios: 

- An employee reports suspected malicious activity on their account
- Known malicious activity is identified
- Employee offboarding/role change

Any user can revoke their own sessions, or anyone with `AdministerSystem` or `UserEdit` permissions can also revoke sessions of other users.

To invalidate sessions of your own account, perform the following steps:

1. Log into the Octopus Web Portal, click your profile image and select **Profile**.
1. Click the overflow menu (`...`) and choose **Revoke Sessions**

![Session invalidation of your account](/docs/security/users-and-teams/images/session-invalidation-profile.png "width=1000")

To invalidate sessions of another user, perform the following steps:

1. Navigate to **{{ Configuration , Users }}**.
1. Select the User whose sessions you wish to revoke.
1. Click the overflow menu (`...`) and choose **Revoke Sessions**.

![Session invalidation of another user's account](/docs/security/users-and-teams/images/session-invalidation-admin.png "width=1000")