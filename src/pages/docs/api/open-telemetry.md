---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Open Telemetry
---

## Request the open telemetry trace file exporter config

:span[GET]{.api-get} `/api/configuration/open-telemetry-trace-file-export`

**Response**

`200` — The requested OpenTelemetry trace file export configuration.

- **`Enabled`** :span[boolean]{.type-label}
- **`MaxStorageSizeMegabytes`** :span[integer]{.type-label}
- **`RetentionDays`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "Enabled": true,
  "MaxStorageSizeMegabytes": 0,
  "RetentionDays": 0
}
```
:::

## Modify OpenTelemetry trace file export configuration

:span[PUT]{.api-put} `/api/configuration/open-telemetry-trace-file-export`

**Request Body**

- **`Enabled`** :span[boolean]{.type-label} *(required)*
- **`MaxStorageSizeMegabytes`** :span[integer]{.type-label} *(required)*
- **`RetentionDays`** :span[integer]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Enabled": true,
  "MaxStorageSizeMegabytes": 0,
  "RetentionDays": 0
}
```
:::

**Response**

`200` — The configuration response for modifying OpenTelemetry trace file export configuration

- **`Enabled`** :span[boolean]{.type-label}
- **`MaxStorageSizeMegabytes`** :span[integer]{.type-label}
- **`RetentionDays`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "Enabled": true,
  "MaxStorageSizeMegabytes": 0,
  "RetentionDays": 0
}
```
:::
