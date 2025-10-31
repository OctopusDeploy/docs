---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-09-22
title: Telemetry
description: Find out about Octopus telemetry reporting and how it helps us make a better product.
navOrder: 25
---

Telemetry reporting is on by default. The data we receive helps us understand how our customers use Octopus and guides product decisions. We also collect usage patterns for the purpose of improving our user experience.

Paid self-hosted customers can turn off telemetry reporting by navigating to **Configuration ➜ Telemetry** and unchecking the **Send telemetry** checkbox in the Octopus instance.

When **Telemetry Reporting** is on, Octopus will make a secure HTTPS request containing the following data.

| Data | Description |
| ----- | ------ |
| Version | The current Octopus Deploy version number that you are running. | 
| Installation ID | A GUID that we generate when Octopus is installed. This GUID is a way for us to get a rough idea of the number of installations that exist in the wild, and which versions people are using, so we can make decisions about backwards compatibility support. |
| Telemetry payload | Configuration and usage information help us make product decisions. For example, we expected users to have only a handful of machines, but the statistics tell us that some customers have over 900; we now take that into account when designing the user experience. |

Be assured that names, descriptions, URIs, and so on are *never* included. You can download a preview of the data that will be sent by clicking **Download Telemetry Preview** on the **Configuration ➜ Telemetry** page.

To learn more about Octopus and data privacy, see our [GDPR page](https://octopus.com/legal/gdpr).

Please consider keeping **Telemetry Reporting** on. We review the data every week, and it really does help us make Octopus a better product 💙.
