---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Open Telemetry
---

## Requests the open telemetry trace file exporter config

`GET` `/api/configuration/open-telemetry-trace-file-export`

**Response**

`200` — The requested OpenTelemetry trace file export configuration.

`GetOpenTelemetryTraceFileExportConfigurationResponse`.

- **`Enabled`** <span class="type-label">boolean</span>
- **`MaxStorageSizeMegabytes`** <span class="type-label">integer</span>
- **`RetentionDays`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Enabled": true,
  "MaxStorageSizeMegabytes": 0,
  "RetentionDays": 0
}
```
</div>

## The command to modify OpenTelemetry trace file export configuration

`PUT` `/api/configuration/open-telemetry-trace-file-export`

**Request Body**

`ModifyOpenTelemetryTraceFileExportConfigurationCommand`

- **`Enabled`** <span class="type-label">boolean</span> *(required)*
- **`MaxStorageSizeMegabytes`** <span class="type-label">integer</span> *(required)*
- **`RetentionDays`** <span class="type-label">integer</span> *(required)*

<div data-example="Request">

```json
{
  "Enabled": true,
  "MaxStorageSizeMegabytes": 0,
  "RetentionDays": 0
}
```
</div>

**Response**

`200` — The configuration response for modifying OpenTelemetry trace file export configuration

`ModifyOpenTelemetryTraceFileExportConfigurationResponse`.

- **`Enabled`** <span class="type-label">boolean</span>
- **`MaxStorageSizeMegabytes`** <span class="type-label">integer</span>
- **`RetentionDays`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Enabled": true,
  "MaxStorageSizeMegabytes": 0,
  "RetentionDays": 0
}
```
</div>
