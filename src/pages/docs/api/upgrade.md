---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Upgrade
---

## Gets information about the upgrade configuration in use by the Octopus Server

`GET` `/api/upgradeconfiguration`

**Response**

`200` — The current upgrade configuration

`UpgradeConfigurationResource`.

- **`AllowChecking`** <span class="type-label">boolean</span> — Whether to check octopus.com to see if a new version is available.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludeStatistics`** <span class="type-label">boolean</span> — Deprecated: please use the [dedicated telemetry page](" + OctoLink.BaseAddress + "telemetry) to determine whether octopus sends usage statistics. See [our documentation](" + OctoLink.BaseAddress + "WhatIsIncludedInUsageStatistics) for information about what is included.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NotificationMode`** <span class="type-label">enum</span> — Controls which notifications are shown in the portal when an upgrade is available. Allowed values: `AlwaysShow`, `ShowOnlyMajorMinor`, `NeverShow`.

<div data-example="Response">

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
</div>

## Updates the upgrade configuration used by the Octopus Server

`PUT` `/api/upgradeconfiguration`

**Request Body**

`SetUpgradeConfigurationCommand`

- **`AllowChecking`** <span class="type-label">boolean</span> *(required)* — Whether to check octopus.com to see if a new version is available.
- **`IncludeStatistics`** <span class="type-label">boolean</span> *(required)* — Deprecated: please use the [dedicated telemetry page](https://oc.to/telemetry) to determine whether octopus sends usage statistics. See [our documentation](https://oc.to/WhatIsIncludedInUsageStatistics) for information about what is included.
- **`NotificationMode`** <span class="type-label">enum</span> *(required)* — Controls which notifications are shown in the portal when an upgrade is available. Allowed values: `AlwaysShow`, `ShowOnlyMajorMinor`, `NeverShow`.

<div data-example="Request">

```json
{
  "AllowChecking": true,
  "IncludeStatistics": true,
  "NotificationMode": "AlwaysShow"
}
```
</div>

**Response**

`200` — The updated upgrade configuration

`UpgradeConfigurationResource`.

- **`AllowChecking`** <span class="type-label">boolean</span> — Whether to check octopus.com to see if a new version is available.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludeStatistics`** <span class="type-label">boolean</span> — Deprecated: please use the [dedicated telemetry page](" + OctoLink.BaseAddress + "telemetry) to determine whether octopus sends usage statistics. See [our documentation](" + OctoLink.BaseAddress + "WhatIsIncludedInUsageStatistics) for information about what is included.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NotificationMode`** <span class="type-label">enum</span> — Controls which notifications are shown in the portal when an upgrade is available. Allowed values: `AlwaysShow`, `ShowOnlyMajorMinor`, `NeverShow`.

<div data-example="Response">

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
</div>
