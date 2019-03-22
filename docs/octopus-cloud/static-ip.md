---
title: Static IP Address
position: 20
description: How to activate a static IP address with Octopus Cloud.
---

For $10 a month you can purchase the option to have a static IP address assigned to your Octopus Cloud instance. This lets you:

- Connect to Listening Tentacles within your infrastructure from the Cloud.
- Whitelist the static IP address of the Octopus server in your network configuration.
- Allow connections to Linux or Unix SSH targets from the static IP address only.

## Activate your Static IP address

1. [Log in to your Octopus Account](https://account.octopus.com/instances).
2. Select the instance that needs a Static IP
3. Choose **Select Plan** and select the option to purchase a static IP address.

Please allow a few minutes for the changes to be applied. There will be a short outage while the static IP address is provisioned. After this has been completed, you can find your IP address by performing a DNS lookup on the host name of your Octopus Cloud instance, where \<yoururl\> is the part of the URL you provided:

https://\<yoururl\>.octopus.app
