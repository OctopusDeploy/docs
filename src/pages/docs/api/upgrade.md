---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Upgrade
---

## Get information about the upgrade configuration in use by the Octopus Server

:endpoint{method="GET" path="/api/upgradeconfiguration"}

**Response**

`200` — The current upgrade configuration

- **`AllowChecking`** :span[boolean]{.type-label}  
  Whether to check octopus.com to see if a new version is available.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludeStatistics`** :span[boolean]{.type-label}  
  Deprecated: please use the [dedicated telemetry page](" + OctoLink.BaseAddress + "telemetry) to determine whether octopus sends usage statistics. See [our documentation](" + OctoLink.BaseAddress + "WhatIsIncludedInUsageStatistics) for information about what is included.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NotificationMode`** :span[enum]{.type-label}  
  Controls which notifications are shown in the portal when an upgrade is available.  
  Allowed values: `AlwaysShow`, `ShowOnlyMajorMinor`, `NeverShow`.

:::api-example{label="Response"}
```json
{
  "AllowChecking": true,
  "Id": "string",
  "IncludeStatistics": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NotificationMode": "AlwaysShow"
}
```
:::

## Update the upgrade configuration used by the Octopus Server

:endpoint{method="PUT" path="/api/upgradeconfiguration"}

**Request Body**

- **`AllowChecking`** :span[boolean]{.type-label} *(required)*  
  Whether to check octopus.com to see if a new version is available.
- **`IncludeStatistics`** :span[boolean]{.type-label} *(required)*  
  Deprecated: please use the [dedicated telemetry page](https://oc.to/telemetry) to determine whether octopus sends usage statistics. See [our documentation](https://oc.to/WhatIsIncludedInUsageStatistics) for information about what is included.
- **`NotificationMode`** :span[enum]{.type-label} *(required)*  
  Controls which notifications are shown in the portal when an upgrade is available.  
  Allowed values: `AlwaysShow`, `ShowOnlyMajorMinor`, `NeverShow`.

:::api-example{label="Request"}
```json
{
  "AllowChecking": true,
  "IncludeStatistics": true,
  "NotificationMode": "AlwaysShow"
}
```
:::

**Response**

`200` — The updated upgrade configuration

- **`AllowChecking`** :span[boolean]{.type-label}  
  Whether to check octopus.com to see if a new version is available.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludeStatistics`** :span[boolean]{.type-label}  
  Deprecated: please use the [dedicated telemetry page](" + OctoLink.BaseAddress + "telemetry) to determine whether octopus sends usage statistics. See [our documentation](" + OctoLink.BaseAddress + "WhatIsIncludedInUsageStatistics) for information about what is included.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NotificationMode`** :span[enum]{.type-label}  
  Controls which notifications are shown in the portal when an upgrade is available.  
  Allowed values: `AlwaysShow`, `ShowOnlyMajorMinor`, `NeverShow`.

:::api-example{label="Response"}
```json
{
  "AllowChecking": true,
  "Id": "string",
  "IncludeStatistics": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NotificationMode": "AlwaysShow"
}
```
:::
