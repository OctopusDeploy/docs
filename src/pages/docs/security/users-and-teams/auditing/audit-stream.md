---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Audit Stream
description: Octopus Deploy can stream audit logs to your chosen SIEM solution
---

Audit streaming provides [enterprise-tier](https://octopus.com/pricing) customers with the ability to stream their audit events to their chosen security information and event management (SIEM) solution.

:::div{.hint}
Audit streaming is only available from **Octopus 2022.4** onwards.
:::

## Configure Audit Stream

You can configure the audit stream from the **Audit** page in the **Configuration** area. Click **Stream Audit Log** to open the configuration dialog.

:::figure
![Audit Stream Not Configured](/docs/security/users-and-teams/auditing/images/audit-stream-not-configured.png)
:::

Currently we support streaming to **OpenTelemetry (OTLP)** compatible providers as well as directly to **Splunk** and **Sumo Logic**.

:::figure
![Audit Stream Configure Dialog](/docs/security/users-and-teams/auditing/images/audit-stream-configure-dialog.png)
:::

:::div{.hint}
Looking to connect to a SIEM solution that is not currently supported? Let us know in our [feedback form](https://oc.to/AuditStreamFeedbackForm).
:::

### Streaming to OpenTelemetry (OTLP)

Refer to your SIEM solution's documentation on how to set up collection via OpenTelemetry. Some providers may support OTLP directly, while others recommend hosting your own [OpenTelmetry Collector](https://github.com/open-telemetry/opentelemetry-collector) and use one of the [exporters](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter) to forward the data to the SIEM.

Once you have set up the collector, you will need to provide the connection details in Octopus:
- **OpenTelmetry Endpoint URL** - The collection endpoint. In most cases you will need to append `/v1/logs` to the url
- **OTLP Protocol** - The protocol to use, `HTTP/protobuf` (also known as `OTLP/HTTP`) or `gRPC`
- **Secret** - The authentication token to use, see below
- **Header** - Any HTTP headers that are required by the collector

There is no standard authentication mechanism for OpenTelemetry, so it has to be configured to suit the collector. If there is no authentication, leave the `Secret` blank. You can use the `#{Secret}` replacement token to insert the secret into the URL or the header values.

Common configurations are:
- **Token in the URL** - Remove the token from the URL and replace it with `#{Secret}`. Place the token into the `Secret` field.
- **Custom Header** - Add a header with the required key and value of `#{Secret}`
- **Bearer Authentication** - Add a header with key `Authorization` and value `Bearer #{Secret}` or `Bearer #{Secret | ToBase64}` if the secret needs to be Base64 encoded

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

![Update Audit Stream](/docs/security/users-and-teams/auditing/images/audit-stream-update.png)
