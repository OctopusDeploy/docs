---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Community Action Templates
---

## Get a list of Community Action Templates

`GET` `/api/communityactiontemplates`

**Parameters**

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of Community Action Templates.

`CommunityActionTemplateResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Author`** <span class="type-label">string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`HistoryUrl`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Packages`** <span class="type-label">array of object</span>
  - **`Parameters`** <span class="type-label">array of object</span>
  - **`Properties`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
  - **`Website`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Author": "string",
      "Description": "string",
      "HistoryUrl": "string",
      "Id": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "Packages": [
        {}
      ],
      "Parameters": [
        {}
      ],
      "Properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "Type": "string",
      "Version": 0,
      "Website": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastPageNumber": 0,
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Get a Community Action Template by ID

`GET` `/api/communityactiontemplates/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the CommunityActionTemplate to load.

**Response**

`200` — The requested Community Action Template.

`CommunityActionTemplateResource`.

- **`Author`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`HistoryUrl`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>
- **`Packages`** <span class="type-label">array of object</span>
  - **`AcquisitionLocation`** <span class="type-label">string</span> — The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** <span class="type-label">string</span> — Feed ID, name or a variable-expression.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** <span class="type-label">string</span> — Package ID or a variable-expression.
  - **`Properties`** <span class="type-label">object</span>
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span> — This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** <span class="type-label">string</span> — Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Properties`** <span class="type-label">object</span>
- **`Type`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>
- **`Website`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Author": "string",
  "Description": "string",
  "HistoryUrl": "string",
  "Id": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Packages": [
    {
      "AcquisitionLocation": "string",
      "FeedId": "string",
      "Id": "string",
      "Name": "string",
      "PackageId": "string",
      "Properties": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "StepPackageInputsReferenceId": "string",
      "Version": "string"
    }
  ],
  "Parameters": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "Properties": {
    "additionalProp1": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "Type": "string",
  "Version": 0,
  "Website": "string"
}
```
</div>

## Gets installed version of the template

`GET` `/api/communityactiontemplates/{id}/actiontemplate/{actiontemplatespaceId}`

Also reachable at `/api/communityactiontemplates/{id}/actiontemplate`.

**Parameters**

- **`actiontemplatespaceId`** <span class="type-label">string</span> *(required)* — Then ID of the space where the Action Template can be located.
- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Community Action Template.

**Response**

`200` — The installed version of the template.

`ActionTemplateResource`.

- **`ActionType`** <span class="type-label">string</span> — Minimum length 1.
- **`CommunityActionTemplateId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`GitDependencies`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span> — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitCredentialType`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryUri`** <span class="type-label">string</span> — Minimum length 1.
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Packages`** <span class="type-label">array of object</span>
  - **`AcquisitionLocation`** <span class="type-label">string</span> — The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** <span class="type-label">string</span> — Feed ID, name or a variable-expression.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** <span class="type-label">string</span> — Package ID or a variable-expression.
  - **`Properties`** <span class="type-label">object</span>
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span> — This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** <span class="type-label">string</span> — Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Properties`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "ActionType": "string",
  "CommunityActionTemplateId": "string",
  "Description": "string",
  "GitDependencies": [
    {
      "DefaultBranch": "string",
      "FilePathFilters": [
        "string"
      ],
      "GitCredentialId": "string",
      "GitCredentialType": "string",
      "GitHubConnectionId": "string",
      "Name": "string",
      "RepositoryUri": "string",
      "StepPackageInputsReferenceId": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Packages": [
    {
      "AcquisitionLocation": "string",
      "FeedId": "string",
      "Id": "string",
      "Name": "string",
      "PackageId": "string",
      "Properties": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "StepPackageInputsReferenceId": "string",
      "Version": "string"
    }
  ],
  "Parameters": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "Properties": {
    "additionalProp1": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "string",
  "Version": 0
}
```
</div>

## Installs community step template

`POST` `/api/communityactiontemplates/{id}/installation/{actiontemplatespaceId}`

Also reachable at `/api/communityactiontemplates/{id}/installation`.

**Parameters**

- **`actiontemplatespaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space where the action template should be installed.
- **`id`** <span class="type-label">string</span> *(required)* — The ID of the community action template.

**Response**

`201` — Created

`ActionTemplateResource`.

- **`ActionType`** <span class="type-label">string</span> — Minimum length 1.
- **`CommunityActionTemplateId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`GitDependencies`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span> — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitCredentialType`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryUri`** <span class="type-label">string</span> — Minimum length 1.
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Packages`** <span class="type-label">array of object</span>
  - **`AcquisitionLocation`** <span class="type-label">string</span> — The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** <span class="type-label">string</span> — Feed ID, name or a variable-expression.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** <span class="type-label">string</span> — Package ID or a variable-expression.
  - **`Properties`** <span class="type-label">object</span>
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span> — This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** <span class="type-label">string</span> — Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Properties`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "ActionType": "string",
  "CommunityActionTemplateId": "string",
  "Description": "string",
  "GitDependencies": [
    {
      "DefaultBranch": "string",
      "FilePathFilters": [
        "string"
      ],
      "GitCredentialId": "string",
      "GitCredentialType": "string",
      "GitHubConnectionId": "string",
      "Name": "string",
      "RepositoryUri": "string",
      "StepPackageInputsReferenceId": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Packages": [
    {
      "AcquisitionLocation": "string",
      "FeedId": "string",
      "Id": "string",
      "Name": "string",
      "PackageId": "string",
      "Properties": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "StepPackageInputsReferenceId": "string",
      "Version": "string"
    }
  ],
  "Parameters": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "Properties": {
    "additionalProp1": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "string",
  "Version": 0
}
```
</div>

## Updates installed community step template to the latest version

`PUT` `/api/communityactiontemplates/{id}/installation/{actiontemplatespaceId}`

Also reachable at `/api/communityactiontemplates/{id}/installation`.

**Parameters**

- **`actiontemplatespaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space where the action template should be installed.
- **`id`** <span class="type-label">string</span> *(required)* — The ID of the community action template.

**Response**

`200` — The updated Action Template.

`ActionTemplateResource`.

- **`ActionType`** <span class="type-label">string</span> — Minimum length 1.
- **`CommunityActionTemplateId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`GitDependencies`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span> — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitCredentialType`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryUri`** <span class="type-label">string</span> — Minimum length 1.
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Packages`** <span class="type-label">array of object</span>
  - **`AcquisitionLocation`** <span class="type-label">string</span> — The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** <span class="type-label">string</span> — Feed ID, name or a variable-expression.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** <span class="type-label">string</span> — Package ID or a variable-expression.
  - **`Properties`** <span class="type-label">object</span>
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span> — This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** <span class="type-label">string</span> — Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Properties`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "ActionType": "string",
  "CommunityActionTemplateId": "string",
  "Description": "string",
  "GitDependencies": [
    {
      "DefaultBranch": "string",
      "FilePathFilters": [
        "string"
      ],
      "GitCredentialId": "string",
      "GitCredentialType": "string",
      "GitHubConnectionId": "string",
      "Name": "string",
      "RepositoryUri": "string",
      "StepPackageInputsReferenceId": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Packages": [
    {
      "AcquisitionLocation": "string",
      "FeedId": "string",
      "Id": "string",
      "Name": "string",
      "PackageId": "string",
      "Properties": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "StepPackageInputsReferenceId": "string",
      "Version": "string"
    }
  ],
  "Parameters": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "Properties": {
    "additionalProp1": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "string",
  "Version": 0
}
```
</div>

## Gets the logo associated with the community step template

`GET` `/api/communityactiontemplates/{id}/logo`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the community action template.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
