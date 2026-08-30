---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Licenses
---

## Return the details of the current license in use by the Octopus Cluster

:endpoint{method="GET" path="/api/licenses/licenses-current"}

**Response**

`200` — The requested License

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LicenseText`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SerialNumber`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update the current Octopus cluster license

:endpoint{method="PUT" path="/api/licenses/licenses-current"}

Updates the license for the Octopus cluster.

**Request Body**

- **`LicenseText`** :span[string]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "LicenseText": "string",
  "SerialNumber": "string"
}
```
:::

**Response**

`200` — Confirmation that the Current License has been modified, containing the new License

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LicenseText`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SerialNumber`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Return a list of enabled features from the license

:endpoint{method="GET" path="/api/licenses/licenses-current-features"}

**Response**

`200` — The list of enabled features from the license

- **`EnabledFeatures`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "EnabledFeatures": [
    "string"
  ]
}
```
:::

## Get the status of the current Octopus license

:endpoint{method="GET" path="/api/licenses/licenses-current-status"}

Calculates the status of the current Octopus license including compliance and maintenance expiry.

**Response**

`200` — The requested License Status

- **`ComplianceSummary`** :span[string]{.type-label}
- **`DaysToEffectiveExpiryDate`** :span[integer]{.type-label}
- **`DoesExpiryBlockKeyActivities`** :span[boolean]{.type-label}
- **`EffectiveClusterTaskLimit`** :span[integer]{.type-label}
- **`EffectiveExpiryDate`** :span[string]{.type-label}
- **`EffectiveNodeTaskLimit`** :span[integer]{.type-label}
- **`EffectiveStartDate`** :span[string]{.type-label}
- **`HostingEnvironment`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsClusterTaskLimitControlledByLicense`** :span[boolean]{.type-label}
- **`IsCompliant`** :span[boolean]{.type-label}
- **`IsInitialisationLicense`** :span[boolean]{.type-label}
- **`IsNodeTaskLimitControlledByLicense`** :span[boolean]{.type-label}
- **`IsPtm`** :span[boolean]{.type-label}
- **`IsTrial`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Limits`** :span[array of object]{.type-label}
  - **`CurrentUsage`** :span[integer]{.type-label}
  - **`Disposition`** :span[enum]{.type-label}  
    Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`EffectiveLimit`** :span[integer]{.type-label}
  - **`EffectiveLimitDescription`** :span[string]{.type-label}
  - **`IsUnlimited`** :span[boolean]{.type-label}
  - **`LicenseLimitDescription`** :span[string]{.type-label}
  - **`LicensedLimit`** :span[integer]{.type-label}
  - **`LimitStatus`** :span[enum]{.type-label}  
    Allowed values: `UnderLimit`, `AlmostAtLimit`, `AtLimit`, `InOverrun`, `ExceedingLimit`.
  - **`Message`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`TargetTypes`** :span[array of string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Messages`** :span[array of object]{.type-label}
  - **`Disposition`** :span[enum]{.type-label}  
    Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`Message`** :span[string]{.type-label}
  - **`MessagePolicy`** :span[enum]{.type-label}  
    Allowed values: `LicensePeriodPolicy`, `AuditStreamPolicy`, `InsightsLicensePolicy`, `TimeLimitedPolicy`, `MaintenancePeriodPolicy`, `TimeLimitedTestLicensePolicy`, `CommunityEditionPolicy`, `NodeLimitPolicy`.
- **`PermissionsMode`** :span[enum]{.type-label}  
  Allowed values: `Unspecified`, `Restricted`, `Full`.
- **`SerialNumber`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ComplianceSummary": "string",
  "DaysToEffectiveExpiryDate": 0,
  "DoesExpiryBlockKeyActivities": false,
  "EffectiveClusterTaskLimit": 0,
  "EffectiveExpiryDate": "string",
  "EffectiveNodeTaskLimit": 0,
  "EffectiveStartDate": "string",
  "HostingEnvironment": "string",
  "Id": "string",
  "IsClusterTaskLimitControlledByLicense": false,
  "IsCompliant": false,
  "IsInitialisationLicense": false,
  "IsNodeTaskLimitControlledByLicense": false,
  "IsPtm": false,
  "IsTrial": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Limits": [
    {
      "CurrentUsage": 0,
      "Disposition": "Information",
      "EffectiveLimit": 0,
      "EffectiveLimitDescription": "string",
      "IsUnlimited": false,
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
:::

## Get the usage of the current Octopus server

:endpoint{method="GET" path="/api/licenses/licenses-current-usage"}

Calculates the usage of the current Octopus server.

**Response**

`200` — Success

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsPtm`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Limits`** :span[array of object]{.type-label}
  - **`CurrentUsage`** :span[integer]{.type-label}
  - **`Disposition`** :span[enum]{.type-label}  
    Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`EffectiveLimit`** :span[integer]{.type-label}
  - **`EffectiveLimitDescription`** :span[string]{.type-label}
  - **`IsUnlimited`** :span[boolean]{.type-label}
  - **`LicenseLimitDescription`** :span[string]{.type-label}
  - **`LicensedLimit`** :span[integer]{.type-label}
  - **`LimitStatus`** :span[enum]{.type-label}  
    Allowed values: `UnderLimit`, `AlmostAtLimit`, `AtLimit`, `InOverrun`, `ExceedingLimit`.
  - **`LimitUsageDescription`** :span[string]{.type-label}
  - **`Message`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`TargetTypes`** :span[array of string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpacesUsage`** :span[array of object]{.type-label}
  - **`MachinesCount`** :span[integer]{.type-label}
  - **`ProjectsCount`** :span[integer]{.type-label}
  - **`SpaceName`** :span[string]{.type-label}
  - **`TenantsCount`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "IsPtm": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Limits": [
    {
      "CurrentUsage": 0,
      "Disposition": "Information",
      "EffectiveLimit": 0,
      "EffectiveLimitDescription": "string",
      "IsUnlimited": false,
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
:::
