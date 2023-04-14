---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Audit Stream
description: Octopus Deploy can stream audit logs to your chosen SIEM solution
---

Audit streaming provides [enterprise-tier](https://octopus.com/pricing) customers with the ability to stream their audit events to their chosen security information and event management (SIEM) solution.

:::hint
Audit streaming is only available from **Octopus 2022.4** onwards.
:::

## Configure Audit Stream

You can configure the audit stream from the **Audit** page in the **Configuration** area. Click **Stream Audit Log** to open the configuration dialog.

![Audit Stream Not Configured](/docs/security/users-and-teams/auditing/images/audit-stream-not-configured.png "width=500")

Currently we support streaming to **Splunk** and **Sumo Logic**.

![Audit Stream Configure Dialog](/docs/security/users-and-teams/auditing/images/audit-stream-configure-dialog.png "width=500")

:::hint
Looking to connect to a SIEM solution that is not currently supported? Let us know in our [feedback form](https://oc.to/AuditStreamFeedbackForm).
:::

### Streaming to Splunk

An **HTTP Event Collector** is required to stream audit events to Splunk. See the Splunk documentation for [how to set up an HTTP Event Collector](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector). Once you have set up a collector, you will need to provide two configuration values in Octopus:

- **Splunk Endpoint URL**: The base URL of your Splunk instance
- **Token**: The Token Value of your HTTP Event Collector

### Streaming to Sumo Logic

An **HTTP Logs and Metrics Source** is required to stream audit events to Sumo Logic. See the Sumo Logic documentation for [how to set up an HTTP Logs and Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/). Once you have set up a collector, you will need to provide a single configuration value in Octopus:

- **Sumo Logic Endpoint URL**: The URL of your HTTP Source. This is treated as a sensitive value as the token for the collector is included in the URL

### Updating the Audit Stream

Once you have saved an initial configuration of the audit stream, the status on the UI will update to reflect that streaming is now enabled. Any new audit events will also be streamed to your SIEM solution.

You can change the audit stream configuration by clicking **Stream Audit Log** again. This will open a pop-up menu with the following options:

- **Edit**: You can select a different SIEM provider or make changes to the configured endpoint.
- **Pause/Resume**: You can pause audit streaming, preventing any new audit events from being streamed to the configured endpoint. This will show as **Resume** if the audit stream is already paused.
- **Delete**: You can delete the audit stream configuration, which will clear any data relating to the audit stream and prevent any new audit events from being streamed.

![Update Audit Stream](/docs/security/users-and-teams/auditing/images/audit-stream-update.png "width=500")
