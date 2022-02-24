---
title: Configurable Timeouts and Session Invalidation
description: Timeouts and session invalidation can be used to enforce a user to re-authenticate.
---

## Configurable Timeouts {#TimeoutsAndInvalidation-ConfigurableTimeouts}
Session timeouts can be configured to enforce re-authentication after a specified time. By default, session timeouts on Octopus are configured at 20 minutes. This timeout can be configured by a System Administrator and will apply to all users in an instance.

To change the "Session Timeout" duration, navigate to the Configuration tab > Settings > Authentication. Enter the desired "Session Timeout" duration (in seconds) and click 'Save'.

There is also a "Maximum Session Duration" which applies when users click the 'Remember Me' option when signing into Octopus. By default, this option is set to 20 days. Enter the desired session timeout duration (in seconds) and click 'Save'.

![Configurable Timeout Image](/docs/security/users-and-teams/images/configurable-timeout.png "width=1000")

## Session Invalidation {#TimeoutsAndInvalidation-SessionInvalidation}
A user's session/s can be revoked. This ensures that a given user cannot interact with the system until after they re-authenticate. 

This can be particularly useful for the following scenarios: 
- An employee reports suspected malicious activity on their account
- Known malicious activity is identified
- Employee offboarding/role change

Any user can revoke their own sessions, or anyone with `AdministerSystem` or `UserEdit` permissions can also revoke sessions of other users.

To invalidate sessions of another user, navigate to **Configuration > Users > Select the User > Revoke Sessions**
![Session invalidation of your account](/docs/security/users-and-teams/images/session-invalidation-admin.png "width=1000")

To invalidate sessions of your own account, click on your **account menu > Profile > Revoke Sessions**
![Session invalidation of your account](/docs/security/users-and-teams/images/session-invalidation-profile.png "width=1000")