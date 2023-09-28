---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-09-28
title: Telemetry
description: Find out about Octopus telemetry reporting and how it helps us make a better product.
navOrder: 25
---

Telemetry reporting is enabled by default and transmits once per day. We use the data we receive to inform our decisions and to help us make a better product. Self-hosted customers can opt-out of sending telemetry by navigating to **Configuration ➜ Telemetry** in Octopus.

When the **Telemetry Reporting** option is enabled, Octopus will make a secure HTTPS request containing the following data.

| Data | Description |
| ----- | ------ |
| Version | The current Octopus Deploy version number that you are running. | 
| Installation ID | A GUID that we generate when Octopus is installed. This GUID is simply a way for us to get a rough idea of the number of installations that exist in the wild, and which versions people are using, so we can make decisions about backwards compatibility support. |
| Telemetry payload | Configuration and usage information helps us when making decisions about the product. For example, we expected users to only have a handful of machines, but the statistics tell us that some customers have over 900; we now take that into account when designing the user experience. |

Please do consider enabling **Telemetry Reporting**. We look at the data every week, and it really does help us to make a better product.

Be assured that names, descriptions, URI's, and so on are _never_ included. You can download a preview of the data that will be sent by clicking on the **Download Preview** button on the **Configuration ➜ Telemetry** page. You can also learn more about Octopus and data privacy in our [GDPR page](https://octopus.com/legal/gdpr).
