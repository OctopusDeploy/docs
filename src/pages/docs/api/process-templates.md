---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Process Templates
---

## Gets the sharing configuration for a given process template

`GET` `/api/platformhub/processtemplates/{slug}/share`

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The sharing configuration of the requested process template

`GetProcessTemplateSharingConfigurationResponse`.

- **`IndividuallySharedSpaceIds`** <span class="type-label">array of string</span>
- **`SharedToAllSpaces`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "IndividuallySharedSpaceIds": [
    "string"
  ],
  "SharedToAllSpaces": true
}
```
</div>

## Lists the process template versions for a given process template

`GET` `/api/platformhub/processtemplates/{slug}/versions`

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*

- **`fromPublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`toPublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`versionMask`** <span class="type-label">string</span>

**Response**

`200` — The requested process template version

an array of `ProcessTemplateVersionResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitCommit`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span>
- **`IsPreRelease`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`IsOptional`** <span class="type-label">boolean</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">array of object</span>
- **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Retrieve a single published process template and its version by version mask (no space context)

`GET` `/api/platformhub/processtemplates/{slug}/{versionMask}`

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*
- **`versionMask`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested published process template and its version

`GetPublishedProcessTemplateByVersionMaskResponse`.

- **`ProcessTemplate`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Parameters`** <span class="type-label">array of object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`ProcessTemplateVersion`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Create a new process template in the provided source

`POST` `/api/platformhub/{gitRef}/processtemplates`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateProcessTemplateCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "Description": "string",
  "GitRef": "string",
  "Name": "string"
}
```
</div>

**Response**

`201` — Created

`ProcessTemplateResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`IsOptional`** <span class="type-label">boolean</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">array of object</span>
- **`Slug`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

<div data-example="Response">

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
</div>

## Get a single process template by slug

`GET` `/api/platformhub/{gitRef}/processtemplates/{slug}`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

`ProcessTemplateResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`IsOptional`** <span class="type-label">boolean</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">array of object</span>
- **`Slug`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

<div data-example="Response">

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
</div>

## Command to share new process template to spaces

`POST` `/api/platformhub/{gitRef}/processtemplates/{slug}/share`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`ShareProcessTemplateCommand`

- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`IndividuallySharedSpaceIds`** <span class="type-label">array of string</span> *(required)*
- **`ShareToAllSpaces`** <span class="type-label">boolean</span> *(required)*
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

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
</div>

**Response**

`200` — Response containing the results of the share process template command

`ShareProcessTemplateResponse`.

- **`IndividuallySharedSpaceIds`** <span class="type-label">array of string</span>
- **`IndividuallyUnsharedSpaceIds`** <span class="type-label">array of string</span>
- **`SharedToAllSpaces`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Get all the available variable names for a process template

`GET` `/api/platformhub/{gitRef}/processtemplates/{slug}/variables/names`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Creates a process template version

`POST` `/api/platformhub/{gitRef}/processtemplates/{slug}/versions`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateProcessTemplateVersionCommand`

- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`IsPreRelease`** <span class="type-label">boolean</span> *(required)*
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Version`** <span class="type-label">string</span> *(required)* — The version of the process template. Must follow the semantic versioning format. Minimum length 1.

<div data-example="Request">

```json
{
  "GitRef": "string",
  "IsPreRelease": true,
  "Slug": "string",
  "Version": "string"
}
```
</div>

**Response**

`201` — Created

`ProcessTemplateVersionResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitCommit`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span>
- **`IsPreRelease`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`IsOptional`** <span class="type-label">boolean</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">array of object</span>
- **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.
- **`Version`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Modifies an existing process template

`PUT` `/api/platformhub/{gitref}/processtemplates/{slug}`

**Parameters**

- **`gitref`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyProcessTemplateCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Parameters`** <span class="type-label">array of object</span> *(required)*
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`IsOptional`** <span class="type-label">boolean</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">array of object</span>
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Steps`** <span class="type-label">array of object</span> *(required)*
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

<div data-example="Request">

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
</div>

**Response**

`200` — Success

`ProcessTemplateResource`.

- **`Description`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`IsOptional`** <span class="type-label">boolean</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">array of object</span>
- **`Slug`** <span class="type-label">string</span>
- **`Steps`** <span class="type-label">array of object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Condition`** <span class="type-label">enum</span> — Allowed values: `Success`, `Failure`, `Always`, `Variable`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageRequirement`** <span class="type-label">enum</span> — Allowed values: `LetOctopusDecide`, `BeforePackageAcquisition`, `AfterPackageAcquisition`.
  - **`Properties`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`StartTrigger`** <span class="type-label">enum</span> — Allowed values: `StartAfterPrevious`, `StartWithPrevious`.
  - **`Type`** <span class="type-label">string</span> — Either "Step" or "ProcessTemplateUsage". Defaults to "Step" if no type is provided.

<div data-example="Response">

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
</div>

## Deletes an existing process template

`DELETE` `/api/platformhub/{gitref}/processtemplates/{slug}`

**Parameters**

- **`gitref`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`DeleteProcessTemplateCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "Slug": "string"
}
```
</div>

**Response**

`200` — Success

## Retrieve a single process template and its version by version mask

`GET` `/api/{spaceId}/processtemplates/{slug}/{versionMask}`

Also reachable at `/api/spaces/{spaceIdentifier}/processtemplates/{slug}/{versionMask}`.

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`versionMask`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested process template and its version

`GetProcessTemplateByVersionMaskResponse`.

- **`ProcessTemplate`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Parameters`** <span class="type-label">array of object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`ProcessTemplateVersion`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Gets the icon for a given process template version

`GET` `/api/{spaceId}/processtemplates/{slug}/{versionMask}/icon`

Also reachable at `/api/spaces/{spaceIdentifier}/processtemplates/{slug}/{versionMask}/icon`.

**Parameters**

- **`slug`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`versionMask`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
