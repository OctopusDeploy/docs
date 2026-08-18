---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Process Templates
---

## Get the sharing configuration for a given process template

:span[GET]{.api-get} `/api/platformhub/processtemplates/{slug}/share`

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*

**Response**

`200` — The sharing configuration of the requested process template

- **`IndividuallySharedSpaceIds`** :span[array of string]{.type-label}
- **`SharedToAllSpaces`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "IndividuallySharedSpaceIds": [
    "string"
  ],
  "SharedToAllSpaces": true
}
```
:::

## List the process template versions for a given process template

:span[GET]{.api-get} `/api/platformhub/processtemplates/{slug}/versions`

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`fromPublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`toPublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`versionMask`** :span[string]{.type-label}

**Response**

`200` — The requested process template version

- **`Description`** :span[string]{.type-label}
- **`GitCommit`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}
- **`IsPreRelease`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`IsOptional`** :span[boolean]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Values`** :span[array of object]{.type-label}
- **`PublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
[
  {
    "Description": "string",
    "GitCommit": "string",
    "GitRef": "string",
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IsPreRelease": true,
    "Name": "string",
    "Parameters": [
      {
        "DisplaySettings": {},
        "HelpText": "string",
        "IsOptional": true,
        "Label": "string",
        "Name": "string",
        "Values": [
          {}
        ]
      }
    ],
    "PublishedDate": "2020-01-01T00:00:00.000Z",
    "Slug": "string",
    "Steps": [
      {
        "Actions": [
          {}
        ],
        "Condition": "Success",
        "Id": "string",
        "Name": "string",
        "PackageRequirement": "LetOctopusDecide",
        "Properties": {},
        "Slug": "string",
        "StartTrigger": "StartAfterPrevious",
        "Type": "string"
      }
    ],
    "Version": "string"
  }
]
```
:::

## Retrieve a single published process template and its version by version mask (no space context)

:span[GET]{.api-get} `/api/platformhub/processtemplates/{slug}/{versionMask}`

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*
- **`versionMask`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested published process template and its version

- **`ProcessTemplate`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Parameters`** :span[array of object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`ProcessTemplateVersion`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "ProcessTemplate": {
    "Description": "string",
    "GitRef": "string",
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "Name": "string",
    "Parameters": [
      {
        "DisplaySettings": {},
        "HelpText": "string",
        "IsOptional": true,
        "Label": "string",
        "Name": "string",
        "Values": [
          {}
        ]
      }
    ],
    "Slug": "string",
    "Steps": [
      {
        "Actions": [
          {}
        ],
        "Condition": "Success",
        "Id": "string",
        "Name": "string",
        "PackageRequirement": "LetOctopusDecide",
        "Properties": {},
        "Slug": "string",
        "StartTrigger": "StartAfterPrevious",
        "Type": "string"
      }
    ]
  },
  "ProcessTemplateVersion": "string"
}
```
:::

## Create a new process template in the provided source

:span[POST]{.api-post} `/api/platformhub/{gitRef}/processtemplates`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string"
}
```
:::

**Response**

`201` — Created

- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`Parameters`** :span[array of object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`IsOptional`** :span[boolean]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Values`** :span[array of object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "GitRef": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "Name": "string",
  "Parameters": [
    {
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "IsOptional": true,
      "Label": "string",
      "Name": "string",
      "Values": [
        {}
      ]
    }
  ],
  "Slug": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ]
}
```
:::

## Get a single process template by slug

:span[GET]{.api-get} `/api/platformhub/{gitRef}/processtemplates/{slug}`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`Parameters`** :span[array of object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`IsOptional`** :span[boolean]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Values`** :span[array of object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "GitRef": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "Name": "string",
  "Parameters": [
    {
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "IsOptional": true,
      "Label": "string",
      "Name": "string",
      "Values": [
        {}
      ]
    }
  ],
  "Slug": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ]
}
```
:::

## Share new process template to spaces

:span[POST]{.api-post} `/api/platformhub/{gitRef}/processtemplates/{slug}/share`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`GitRef`** :span[string]{.type-label} *(required)*
- **`IndividuallySharedSpaceIds`** :span[array of string]{.type-label} *(required)*
- **`ShareToAllSpaces`** :span[boolean]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "GitRef": "string",
  "IndividuallySharedSpaceIds": [
    "string"
  ],
  "ShareToAllSpaces": true,
  "Slug": "string"
}
```
:::

**Response**

`200` — Response containing the results of the share process template command

- **`IndividuallySharedSpaceIds`** :span[array of string]{.type-label}
- **`IndividuallyUnsharedSpaceIds`** :span[array of string]{.type-label}
- **`SharedToAllSpaces`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "IndividuallySharedSpaceIds": [
    "string"
  ],
  "IndividuallyUnsharedSpaceIds": [
    "string"
  ],
  "SharedToAllSpaces": true
}
```
:::

## Get all the available variable names for a process template

:span[GET]{.api-get} `/api/platformhub/{gitRef}/processtemplates/{slug}/variables/names`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## Create a process template version

:span[POST]{.api-post} `/api/platformhub/{gitRef}/processtemplates/{slug}/versions`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`GitRef`** :span[string]{.type-label} *(required)*
- **`IsPreRelease`** :span[boolean]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Version`** :span[string]{.type-label} *(required)*  
  The version of the process template. Must follow the semantic versioning format. Minimum length 1.

:::api-example{label="Request"}
```json
{
  "GitRef": "string",
  "IsPreRelease": true,
  "Slug": "string",
  "Version": "string"
}
```
:::

**Response**

`201` — Created

- **`Description`** :span[string]{.type-label}
- **`GitCommit`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}  
  Minimum length 1.
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}
- **`IsPreRelease`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`IsOptional`** :span[boolean]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Values`** :span[array of object]{.type-label}
- **`PublishedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "GitCommit": "string",
  "GitRef": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsPreRelease": true,
  "Name": "string",
  "Parameters": [
    {
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "IsOptional": true,
      "Label": "string",
      "Name": "string",
      "Values": [
        {}
      ]
    }
  ],
  "PublishedDate": "2020-01-01T00:00:00.000Z",
  "Slug": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ],
  "Version": "string"
}
```
:::

## Modify an existing process template

:span[PUT]{.api-put} `/api/platformhub/{gitref}/processtemplates/{slug}`

**Path Parameters**

- **`gitref`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Parameters`** :span[array of object]{.type-label} *(required)*
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`IsOptional`** :span[boolean]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Values`** :span[array of object]{.type-label}
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Steps`** :span[array of object]{.type-label} *(required)*
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "Description": "string",
  "GitRef": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Name": "string",
  "Parameters": [
    {
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "IsOptional": true,
      "Label": "string",
      "Name": "string",
      "Values": [
        {}
      ]
    }
  ],
  "Slug": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ]
}
```
:::

**Response**

`200` — Success

- **`Description`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`Parameters`** :span[array of object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`IsOptional`** :span[boolean]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Values`** :span[array of object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`Steps`** :span[array of object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Condition`** :span[enum]{.type-label}  
    Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageRequirement`** :span[enum]{.type-label}  
    Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`StartTrigger`** :span[enum]{.type-label}  
    Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** :span[string]{.type-label}  
    Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "GitRef": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "Name": "string",
  "Parameters": [
    {
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "IsOptional": true,
      "Label": "string",
      "Name": "string",
      "Values": [
        {}
      ]
    }
  ],
  "Slug": "string",
  "Steps": [
    {
      "Actions": [
        {}
      ],
      "Condition": "Success",
      "Id": "string",
      "Name": "string",
      "PackageRequirement": "LetOctopusDecide",
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Slug": "string",
      "StartTrigger": "StartAfterPrevious",
      "Type": "string"
    }
  ]
}
```
:::

## Delete an existing process template

:span[DELETE]{.api-delete} `/api/platformhub/{gitref}/processtemplates/{slug}`

**Path Parameters**

- **`gitref`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "Slug": "string"
}
```
:::

**Response**

`200` — Success

## Retrieve a single process template and its version by version mask

:span[GET]{.api-get} `/api/{spaceId}/processtemplates/{slug}/{versionMask}`

Also reachable at `/api/spaces/{spaceIdentifier}/processtemplates/{slug}/{versionMask}`.

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`versionMask`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested process template and its version

- **`ProcessTemplate`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Parameters`** :span[array of object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`ProcessTemplateVersion`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "ProcessTemplate": {
    "Description": "string",
    "GitRef": "string",
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "Name": "string",
    "Parameters": [
      {
        "DisplaySettings": {},
        "HelpText": "string",
        "IsOptional": true,
        "Label": "string",
        "Name": "string",
        "Values": [
          {}
        ]
      }
    ],
    "Slug": "string",
    "Steps": [
      {
        "Actions": [
          {}
        ],
        "Condition": "Success",
        "Id": "string",
        "Name": "string",
        "PackageRequirement": "LetOctopusDecide",
        "Properties": {},
        "Slug": "string",
        "StartTrigger": "StartAfterPrevious",
        "Type": "string"
      }
    ]
  },
  "ProcessTemplateVersion": "string"
}
```
:::

## Get the icon for a given process template version

:span[GET]{.api-get} `/api/{spaceId}/processtemplates/{slug}/{versionMask}/icon`

Also reachable at `/api/spaces/{spaceIdentifier}/processtemplates/{slug}/{versionMask}/icon`.

**Path Parameters**

- **`slug`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`versionMask`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::
