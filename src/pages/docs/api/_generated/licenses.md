---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-11-12
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
    "Self": "/api/..."
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
    "Self": "/api/..."
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

- **`CanExceedWithUsageReporting`** :span[boolean]{.type-label}  
  True if your license allows exceeding the limit value for one or more item types - while usage reporting is up to date. Shows the type of license and whether it supports excess, not whether it is currently in excess.
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
  - **`CanExceedWithUsageReporting`** :span[boolean]{.type-label}  
    True if your license allows exceeding the limit value for this item type - while usage reporting is up to date. Shows the type of license limit and whether it supports excess, not whether it is currently in excess.
  - **`CurrentUsage`** :span[integer]{.type-label}  
    The number of the limited item your system currently has.
  - **`Disposition`** :span[enum]{.type-label}  
    Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`EffectiveLimit`** :span[integer]{.type-label}  
    The number of the limited item allowed by your license file including any Overrun or other modifiers.
  - **`EffectiveLimitDescription`** :span[string]{.type-label}
  - **`IsEnforced`** :span[boolean]{.type-label}  
    Whether this limit is currently enforced. When false, usage can exceed the licensed limit.
  - **`IsUnlimited`** :span[boolean]{.type-label}
  - **`LicenseLimitDescription`** :span[string]{.type-label}
  - **`LicensedLimit`** :span[integer]{.type-label}  
    The number of the limited item exactly as it is in your license file.
  - **`LimitStatus`** :span[enum]{.type-label}  
    Allowed values: `UnderLimit`, `AlmostAtLimit`, `AtLimit`, `InOverrun`, `ExceedingLimit`.
  - **`Message`** :span[string]{.type-label}  
    A textual description of this license limit and current usage.
  - **`Name`** :span[string]{.type-label}  
    The name of the limited item.
  - **`TargetTypes`** :span[array of string]{.type-label}  
    For Machines/Targets, if your license only limits certain types, they will be present in this list. For other types of license limits, or if your license does not limit by target types, this will be an empty array.
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
- **`UsageDeclarationDueDate`** :span[string]{.type-label}  
  The UTC calendar date at which the system's must send another usage declaration and receive a new receipt. Null when the license doesn't require a usage declaration. Format `date`.
- **`UsageReportingDaysRemaining`** :span[integer]{.type-label}  
  How many days remaining until the system must send another usage declaration and receive a new receipt. Can be negative if the usage declaration is overdue. Null when the license doesn't require a usage declaration.

:::api-example{label="Response"}
```json
{
  "CanExceedWithUsageReporting": false,
  "ComplianceSummary": "Your Octopus Deploy installation is compliant with your license. Happy deployments!",
  "DaysToEffectiveExpiryDate": 1148,
  "DoesExpiryBlockKeyActivities": false,
  "EffectiveClusterTaskLimit": 0,
  "EffectiveExpiryDate": "2030-01-02",
  "EffectiveNodeTaskLimit": 0,
  "EffectiveStartDate": "2025-09-01",
  "HostingEnvironment": "SelfHosted",
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
      "CanExceedWithUsageReporting": false,
      "CurrentUsage": 42,
      "Disposition": "Information",
      "EffectiveLimit": 120,
      "EffectiveLimitDescription": "120",
      "IsEnforced": false,
      "IsUnlimited": false,
      "LicenseLimitDescription": "100",
      "LicensedLimit": 100,
      "LimitStatus": "UnderLimit",
      "Message": "Your license allows 100 targets (TentaclePassive, TentacleActive, Ssh). You currently have 42 targets.",
      "Name": "Machines",
      "TargetTypes": [
        "TentaclePassive",
        "TentacleActive",
        "Ssh"
      ]
    }
  ],
  "Links": {
    "Self": "/api/..."
  },
  "Messages": [
    {
      "Disposition": "Information",
      "Message": "string",
      "MessagePolicy": "LicensePeriodPolicy"
    }
  ],
  "PermissionsMode": "Unspecified",
  "SerialNumber": "12345-12345-12345-12345",
  "UsageDeclarationDueDate": null,
  "UsageReportingDaysRemaining": null
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
  - **`CanExceedWithUsageReporting`** :span[boolean]{.type-label}  
    True if your license allows exceeding the limit value for this item type - while usage reporting is up to date. Shows the type of license limit and whether it supports excess, not whether it is currently in excess.
  - **`CurrentUsage`** :span[integer]{.type-label}  
    The number of the limited item your system currently has.
  - **`Disposition`** :span[enum]{.type-label}  
    Allowed values: `Information`, `Notice`, `Warning`, `Error`.
  - **`EffectiveLimit`** :span[integer]{.type-label}  
    The number of the limited item allowed by your license file including any Overrun or other modifiers.
  - **`EffectiveLimitDescription`** :span[string]{.type-label}
  - **`IsEnforced`** :span[boolean]{.type-label}  
    Whether this limit is currently enforced. When false, usage can exceed the licensed limit.
  - **`IsUnlimited`** :span[boolean]{.type-label}
  - **`LicenseLimitDescription`** :span[string]{.type-label}
  - **`LicensedLimit`** :span[integer]{.type-label}  
    The number of the limited item exactly as it is in your license file.
  - **`LimitStatus`** :span[enum]{.type-label}  
    Allowed values: `UnderLimit`, `AlmostAtLimit`, `AtLimit`, `InOverrun`, `ExceedingLimit`.
  - **`LimitUsageDescription`** :span[string]{.type-label}
  - **`Message`** :span[string]{.type-label}  
    A textual description of this license limit and current usage.
  - **`Name`** :span[string]{.type-label}  
    The name of the limited item.
  - **`TargetTypes`** :span[array of string]{.type-label}  
    For Machines/Targets, if your license only limits certain types, they will be present in this list. For other types of license limits, or if your license does not limit by target types, this will be an empty array.
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
      "CanExceedWithUsageReporting": false,
      "CurrentUsage": 42,
      "Disposition": "Information",
      "EffectiveLimit": 120,
      "EffectiveLimitDescription": "120",
      "IsEnforced": false,
      "IsUnlimited": false,
      "LicenseLimitDescription": "100",
      "LicensedLimit": 100,
      "LimitStatus": "UnderLimit",
      "LimitUsageDescription": "string",
      "Message": "Your license allows 100 targets (TentaclePassive, TentacleActive, Ssh). You currently have 42 targets.",
      "Name": "Machines",
      "TargetTypes": [
        "TentaclePassive",
        "TentacleActive",
        "Ssh"
      ]
    }
  ],
  "Links": {
    "Self": "/api/..."
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
