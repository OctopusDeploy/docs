---
title: Azure steps migrated from Octopus Deploy 2
description: Azure Steps migrated from Octopus Deploy 2 will work without modification.
version: "3.0"
---

Azure Steps migrated from Octopus Deploy 2 will work without modification.

Initially they will appear a little different from a step created in Octopus Deploy 3.  Because Accounts didn't exist in OD2, the subscription information was configured directly on the step, and there was a default Azure X509.2 certificate which was used for all Azure deployments.

The image below shows a migrated Azure step. The subscription ID is displayed (read-only), along with a message. Deployments using this step will use the same default Azure certificate as before.

Once an account is selected, the subscription and certificate from the account will be used.  The migrated subscription ID and the message will no longer appear.

![](/docs/images/3048693/3278367.png "width=500")
