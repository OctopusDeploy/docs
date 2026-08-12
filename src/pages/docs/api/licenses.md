---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Licenses
---

## Returns the details of the current license in use by the Octopus Cluster

`GET` `/api/licenses/licenses-current`

**Response**

`200` — The requested License

`LicenseResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LicenseText`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SerialNumber`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LicenseText": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SerialNumber": "string"
}
```
</div>

## Update the current Octopus cluster license

`PUT` `/api/licenses/licenses-current`

Updates the license for the Octopus cluster.

**Request Body**

`ModifyCurrentLicenseCommand`

- **`LicenseText`** <span class="type-label">string</span>
- **`SerialNumber`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "LicenseText": "string",
  "SerialNumber": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Current License has been modified, containing the new License

`LicenseResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LicenseText`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SerialNumber`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LicenseText": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SerialNumber": "string"
}
```
</div>

## Returns a list of enabled features from the license

`GET` `/api/licenses/licenses-current-features`

**Response**

`200` — The list of enabled features from the license

`GetCurrentLicenseFeaturesResponse`.

- **`EnabledFeatures`** <span class="type-label">array of string</span>

<div data-example="Response">

```json
{
  "EnabledFeatures": [
    "string"
  ]
}
```
</div>

## Get the status of the current Octopus license

`GET` `/api/licenses/licenses-current-status`

Calculates the status of the current Octopus license including compliance and maintenance expiry.

**Response**

`200` — The requested License Status

`LicenseStatusResource`.

- **`ComplianceSummary`** <span class="type-label">string</span>
- **`DaysToEffectiveExpiryDate`** <span class="type-label">integer</span>
- **`DoesExpiryBlockKeyActivities`** <span class="type-label">boolean</span>
- **`EffectiveClusterTaskLimit`** <span class="type-label">integer</span>
- **`EffectiveExpiryDate`** <span class="type-label">string</span>
- **`EffectiveNodeTaskLimit`** <span class="type-label">integer</span>
- **`EffectiveStartDate`** <span class="type-label">string</span>
- **`HostingEnvironment`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsClusterTaskLimitControlledByLicense`** <span class="type-label">boolean</span>
- **`IsCompliant`** <span class="type-label">boolean</span>
- **`IsInitialisationLicense`** <span class="type-label">boolean</span>
- **`IsNodeTaskLimitControlledByLicense`** <span class="type-label">boolean</span>
- **`IsPtm`** <span class="type-label">boolean</span>
- **`IsTrial`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Limits`** <span class="type-label">array of object</span>
  - **`CurrentUsage`** <span class="type-label">integer</span>
  - **`Disposition`** <span class="type-label">enum</span> — Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`EffectiveLimit`** <span class="type-label">integer</span>
  - **`EffectiveLimitDescription`** <span class="type-label">string</span>
  - **`IsUnlimited`** <span class="type-label">boolean</span>
  - **`LicenseLimitDescription`** <span class="type-label">string</span>
  - **`LicensedLimit`** <span class="type-label">integer</span>
  - **`LimitStatus`** <span class="type-label">enum</span> — Allowed values: `UnderLimit`, `AlmostAtLimit`, `AtLimit`, `InOverrun`, `ExceedingLimit`.
  - **`Message`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`TargetTypes`** <span class="type-label">array of string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Messages`** <span class="type-label">array of object</span>
  - **`Disposition`** <span class="type-label">enum</span> — Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`Message`** <span class="type-label">string</span>
  - **`MessagePolicy`** <span class="type-label">enum</span> — Allowed values: `LicensePeriodPolicy`, `AuditStreamPolicy`, `InsightsLicensePolicy`, `TimeLimitedPolicy`, `MaintenancePeriodPolicy`, `TimeLimitedTestLicensePolicy`, `CommunityEditionPolicy`, `NodeLimitPolicy`.
- **`PermissionsMode`** <span class="type-label">enum</span> — Allowed values: `Unspecified`, `Restricted`, `Full`.
- **`SerialNumber`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ComplianceSummary": "string",
  "DaysToEffectiveExpiryDate": 0,
  "DoesExpiryBlockKeyActivities": true,
  "EffectiveClusterTaskLimit": 0,
  "EffectiveExpiryDate": "string",
  "EffectiveNodeTaskLimit": 0,
  "EffectiveStartDate": "string",
  "HostingEnvironment": "string",
  "Id": "string",
  "IsClusterTaskLimitControlledByLicense": true,
  "IsCompliant": true,
  "IsInitialisationLicense": true,
  "IsNodeTaskLimitControlledByLicense": true,
  "IsPtm": true,
  "IsTrial": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Limits": [
    {
      "CurrentUsage": 0,
      "Disposition": "Information",
      "EffectiveLimit": 0,
      "EffectiveLimitDescription": "string",
      "IsUnlimited": true,
      "LicenseLimitDescription": "string",
      "LicensedLimit": 0,
      "LimitStatus": "UnderLimit",
      "Message": "string",
      "Name": "string",
      "TargetTypes": [
        "string"
      ]
    }
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Messages": [
    {
      "Disposition": "Information",
      "Message": "string",
      "MessagePolicy": "LicensePeriodPolicy"
    }
  ],
  "PermissionsMode": "Unspecified",
  "SerialNumber": "string"
}
```
</div>

## Get the usage of the current Octopus server

`GET` `/api/licenses/licenses-current-usage`

Calculates the usage of the current Octopus server.

**Response**

`200` — Success

`LicenseUsageResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsPtm`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Limits`** <span class="type-label">array of object</span>
  - **`CurrentUsage`** <span class="type-label">integer</span>
  - **`Disposition`** <span class="type-label">enum</span> — Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`EffectiveLimit`** <span class="type-label">integer</span>
  - **`EffectiveLimitDescription`** <span class="type-label">string</span>
  - **`IsUnlimited`** <span class="type-label">boolean</span>
  - **`LicenseLimitDescription`** <span class="type-label">string</span>
  - **`LicensedLimit`** <span class="type-label">integer</span>
  - **`LimitStatus`** <span class="type-label">enum</span> — Allowed values: `UnderLimit`, `AlmostAtLimit`, `AtLimit`, `InOverrun`, `ExceedingLimit`.
  - **`LimitUsageDescription`** <span class="type-label">string</span>
  - **`Message`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`TargetTypes`** <span class="type-label">array of string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpacesUsage`** <span class="type-label">array of object</span>
  - **`MachinesCount`** <span class="type-label">integer</span>
  - **`ProjectsCount`** <span class="type-label">integer</span>
  - **`SpaceName`** <span class="type-label">string</span>
  - **`TenantsCount`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "IsPtm": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Limits": [
    {
      "CurrentUsage": 0,
      "Disposition": "Information",
      "EffectiveLimit": 0,
      "EffectiveLimitDescription": "string",
      "IsUnlimited": true,
      "LicenseLimitDescription": "string",
      "LicensedLimit": 0,
      "LimitStatus": "UnderLimit",
      "LimitUsageDescription": "string",
      "Message": "string",
      "Name": "string",
      "TargetTypes": [
        "string"
      ]
    }
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SpacesUsage": [
    {
      "MachinesCount": 0,
      "ProjectsCount": 0,
      "SpaceName": "string",
      "TenantsCount": 0
    }
  ]
}
```
</div>
