---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Action Templates
---

## Deletes an existing Action Template and all its versions

`DELETE` `/api/{spaceId}/actionTemplates/{id}`

Also reachable at `/api/actionTemplates/{id}`, `/api/spaces/{spaceIdentifier}/actionTemplates/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Action Template to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Deletes an existing Action Template and all its versions

`DELETE` `/api/{spaceId}/actionTemplates/{id}/v1`

Also reachable at `/api/actionTemplates/{id}/v1`, `/api/spaces/{spaceIdentifier}/actionTemplates/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Action Template to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the requested Action Template has been deleted

`DeleteActionTemplateByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get a list of Action Templates

`GET` `/api/{spaceId}/actiontemplates`

Also reachable at `/api/actiontemplates`, `/api/spaces/{spaceIdentifier}/actiontemplates`.

Lists all of the Action Templates in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — IDs of the action templates to fetch.
- **`isCommunityActionTemplate`** <span class="type-label">boolean</span> — Filters the results based on whether the action is a community template.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a \"contains\" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Action Templates

`ActionTemplateResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ActionType`** <span class="type-label">string</span> — Minimum length 1.
  - **`CommunityActionTemplateId`** <span class="type-label">string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GitDependencies`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Packages`** <span class="type-label">array of object</span>
  - **`Parameters`** <span class="type-label">array of object</span>
  - **`Properties`** <span class="type-label">object</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
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
      "ActionType": "string",
      "CommunityActionTemplateId": "string",
      "Description": "string",
      "GitDependencies": [
        {}
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
      "SpaceId": "string",
      "Version": 0
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

## Create an Action Template

`POST` `/api/{spaceId}/actiontemplates`

Also reachable at `/api/actiontemplates`, `/api/spaces/{spaceIdentifier}/actiontemplates`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the Space that contains the Action Template.

**Request Body**

`CreateActionTemplateCommand`

- **`ActionType`** <span class="type-label">string</span> *(required)* — The action type of the Action Template. Minimum length 1.
- **`CommunityActionTemplateId`** <span class="type-label">string</span> — The community action template id if the Action Template is created from a community template.
- **`Description`** <span class="type-label">string</span> — The description of the Action Template.
- **`GitDependencies`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitCredentialType`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> *(required)*
  - **`RepositoryUri`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span>
- **`Inputs`** <span class="type-label">object</span>
  - **`Value`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the Action Template. Minimum length 1.
- **`Packages`** <span class="type-label">array of object</span> — The list of packages to include in the Action Template.
  - **`AcquisitionLocation`** <span class="type-label">string</span> — The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** <span class="type-label">string</span> — Feed ID, name or a variable-expression.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** <span class="type-label">string</span> — Package ID or a variable-expression.
  - **`Properties`** <span class="type-label">object</span>
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span> — This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** <span class="type-label">string</span> — Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** <span class="type-label">array of object</span> — The list of parameters of the Action Template.
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Properties`** <span class="type-label">object</span> — The list of properties of the Action Template.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the Space that contains the Action Template.
- **`StepPackageVersion`** <span class="type-label">string</span> — The step package version if the Action Template is created from a step package.
- **`Version`** <span class="type-label">integer</span> — The version number of the Action Template. Minimum `0`.

<div data-example="Request">

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
  "Inputs": {
    "Value": "string"
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
  "StepPackageVersion": "string",
  "Version": 0
}
```
</div>

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

## Get all Action Templates

`GET` `/api/{spaceId}/actiontemplates/all`

Also reachable at `/api/actiontemplates/all`, `/api/spaces/{spaceIdentifier}/actiontemplates/all`.

Lists the all of the action templates in the supplied Octopus Deploy Space. The results will be sorted by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Templates

an array of `ActionTemplateResource`.

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
[
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
        "Properties": {},
        "StepPackageInputsReferenceId": "string",
        "Version": "string"
      }
    ],
    "Parameters": [
      {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      }
    ],
    "Properties": {
      "additionalProp1": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp2": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp3": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    },
    "SpaceId": "string",
    "Version": 0
  }
]
```
</div>

## Get a list of Action Template categories

`GET` `/api/{spaceId}/actiontemplates/categories`

Also reachable at `/api/actiontemplates/categories`, `/api/spaces/{spaceIdentifier}/actiontemplates/categories`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Template categories

an array of `ActionTemplateCategoryResource`.

- **`DisplayOrder`** <span class="type-label">integer</span>
- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "DisplayOrder": 0,
    "Id": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
]
```
</div>

## Lists all available action templates including built-in, custom and community contributed step templates

`GET` `/api/{spaceId}/actiontemplates/search`

Also reachable at `/api/actiontemplates/search`, `/api/spaces/{spaceIdentifier}/actiontemplates/search`.

Lists all of the Action Templates in the supplied Octopus Deploy Space that fit the search criteria.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`type`** <span class="type-label">string</span>

**Response**

`200` — The found Action Templates

an array of `ActionTemplateSearchResource`.

- **`Author`** <span class="type-label">string</span>
- **`Categories`** <span class="type-label">array of string</span>
- **`Category`** <span class="type-label">string</span>
- **`CommunityActionTemplateId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`Features`** <span class="type-label">array of string</span>
- **`HasUpdate`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span>
- **`IsBuiltIn`** <span class="type-label">boolean</span>
- **`IsInstalled`** <span class="type-label">boolean</span>
- **`Keywords`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>
- **`Prerelease`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Type`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>
- **`Website`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Author": "string",
    "Categories": [
      "string"
    ],
    "Category": "string",
    "CommunityActionTemplateId": "string",
    "Description": "string",
    "Features": [
      "string"
    ],
    "HasUpdate": true,
    "Id": "string",
    "IsBuiltIn": true,
    "IsInstalled": true,
    "Keywords": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Prerelease": true,
    "SpaceId": "string",
    "Type": "string",
    "Version": "string",
    "Website": "string"
  }
]
```
</div>

## Get an Action Template by ID

`GET` `/api/{spaceId}/actiontemplates/{id}`

Also reachable at `/api/actiontemplates/{id}`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the ActionTemplate to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Template

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

## Modifies an existing action template

`PUT` `/api/{spaceId}/actiontemplates/{id}`

Also reachable at `/api/actiontemplates/{id}`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the existing Action Template.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the Space that contains the Action Template.

**Request Body**

`ModifyActionTemplateCommand`

- **`Description`** <span class="type-label">string</span> — The description of the Action Template.
- **`GitDependencies`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitCredentialType`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> *(required)*
  - **`RepositoryUri`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`StepPackageInputsReferenceId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — The id of the existing Action Template.
- **`Inputs`** <span class="type-label">object</span>
  - **`Value`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the Action Template. Minimum length 1.
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
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the Space that contains the Action Template.
- **`StepPackageVersion`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
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
  "Inputs": {
    "Value": "string"
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
  "StepPackageVersion": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Action Template was modified, including the updated template.

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

## Updates deployment and runbook actions to a specific version of the action template

`POST` `/api/{spaceId}/actiontemplates/{id}/actionsUpdate`

Also reachable at `/api/actiontemplates/{id}/actionsUpdate`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/actionsUpdate`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Action Template.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space containing the Action Template.

**Request Body**

`UpdateActionTemplateActionsCommand`

- **`ActionIdsByProcessId`** <span class="type-label">object</span>
- **`ActionsToUpdate`** <span class="type-label">array of object</span> *(required)* — The actions to be updated to match the action template.
  - **`ActionIds`** <span class="type-label">array of string</span> *(required)* — The IDs of the actions to update.
  - **`GitRef`** <span class="type-label">string</span> — The Git reference for the action to update.
  - **`ProcessId`** <span class="type-label">string</span> *(required)* — The ID of the deployment process which contains the action(s) to update. Minimum length 1.
  - **`ProcessType`** <span class="type-label">enum</span> *(required)* — The process type of the deployment process containing the action(s) to update. Allowed values: `Deployment`, `Runbook`.
  - **`ProjectId`** <span class="type-label">string</span> — The Project Id for the action to update.
- **`DefaultPropertyValues`** <span class="type-label">object</span> — Default values for properties of the action template.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the Action Template.
- **`Overrides`** <span class="type-label">object</span> — Overrides for values of the properties of the action template.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space containing the Action Template.
- **`Version`** <span class="type-label">integer</span> *(required)* — The version of the Action Template.

<div data-example="Request">

```json
{
  "ActionIdsByProcessId": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "ActionsToUpdate": [
    {
      "ActionIds": [
        "string"
      ],
      "GitRef": "string",
      "ProcessId": "string",
      "ProcessType": "Deployment",
      "ProjectId": "string"
    }
  ],
  "DefaultPropertyValues": {
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
  "Id": "string",
  "Overrides": {
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

**Response**

`200` — ActionUpdateResultResources with details of the results of the update returned

an array of `ActionUpdateResultResource`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`ManualMergeRequiredReasonsByPropertyName`** <span class="type-label">object</span>
- **`NamesOfNewParametersMissingDefaultValue`** <span class="type-label">array of string</span>
- **`Outcome`** <span class="type-label">enum</span> — Allowed values: `Success`, `ManualMergeRequired`, `DefaultParamterValueMissing`, `RemovedPackageInUse`.
- **`RemovedPackageUsages`** <span class="type-label">array of object</span>
  - **`PackageReference`** <span class="type-label">string</span>
  - **`UsedBy`** <span class="type-label">enum</span> — Allowed values: `ProjectVersionStrategy`, `ProjectReleaseCreationStrategy`, `ChannelRule`.
  - **`UsedById`** <span class="type-label">string</span>
  - **`UsedByName`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "ManualMergeRequiredReasonsByPropertyName": {
      "additionalProp1": [
        "string"
      ],
      "additionalProp2": [
        "string"
      ],
      "additionalProp3": [
        "string"
      ]
    },
    "NamesOfNewParametersMissingDefaultValue": [
      "string"
    ],
    "Outcome": "Success",
    "RemovedPackageUsages": [
      {
        "PackageReference": "string",
        "UsedBy": "ProjectVersionStrategy",
        "UsedById": "string",
        "UsedByName": "string"
      }
    ]
  }
]
```
</div>

## Creates a server task to update deployment and runbook actions to a specific version of the action template

`POST` `/api/{spaceId}/actiontemplates/{id}/actionsUpdate/bulk`

Also reachable at `/api/actiontemplates/{id}/actionsUpdate/bulk`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/actionsUpdate/bulk`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Action Template.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space containing the Action Template.

**Request Body**

`BulkUpdateActionTemplateActionsCommand`

- **`ActionsToUpdate`** <span class="type-label">array of object</span> *(required)* — The actions to be updated to match the action template.
  - **`ActionIds`** <span class="type-label">array of string</span> *(required)* — The IDs of the actions to update.
  - **`GitRef`** <span class="type-label">string</span> — The Git reference for the action to update.
  - **`ProcessId`** <span class="type-label">string</span> *(required)* — The ID of the deployment process which contains the action(s) to update. Minimum length 1.
  - **`ProcessType`** <span class="type-label">enum</span> *(required)* — The process type of the deployment process containing the action(s) to update. Allowed values: `Deployment`, `Runbook`.
  - **`ProjectId`** <span class="type-label">string</span> — The Project Id for the action to update.
- **`DefaultPropertyValues`** <span class="type-label">object</span> — Default values for properties of the action template.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the Action Template.
- **`Overrides`** <span class="type-label">object</span> — Overrides for values of the properties of the action template.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space containing the Action Template.
- **`Version`** <span class="type-label">integer</span> *(required)* — The version of the Action Template.

<div data-example="Request">

```json
{
  "ActionsToUpdate": [
    {
      "ActionIds": [
        "string"
      ],
      "GitRef": "string",
      "ProcessId": "string",
      "ProcessType": "Deployment",
      "ProjectId": "string"
    }
  ],
  "DefaultPropertyValues": {
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
  "Id": "string",
  "Overrides": {
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

**Response**

`200` — Returns the results of the update of the actions updated to match the action template.

`BulkUpdateActionTemplateActionsResponse`.

- **`Outcome`** <span class="type-label">string</span> — Minimum length 1.
- **`Results`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`ManualMergeRequiredReasonsByPropertyName`** <span class="type-label">object</span>
  - **`NamesOfNewParametersMissingDefaultValue`** <span class="type-label">array of string</span>
  - **`Outcome`** <span class="type-label">enum</span> — Allowed values: `Success`, `ManualMergeRequired`, `DefaultParamterValueMissing`, `RemovedPackageInUse`.
  - **`RemovedPackageUsages`** <span class="type-label">array of object</span>
- **`TaskId`** <span class="type-label">string</span>
- **`ValidationFailures`** <span class="type-label">array of string</span>

<div data-example="Response">

```json
{
  "Outcome": "string",
  "Results": [
    {
      "Id": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ManualMergeRequiredReasonsByPropertyName": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      },
      "NamesOfNewParametersMissingDefaultValue": [
        "string"
      ],
      "Outcome": "Success",
      "RemovedPackageUsages": [
        {}
      ]
    }
  ],
  "TaskId": "string",
  "ValidationFailures": [
    "string"
  ]
}
```
</div>

## Gets the logo associated with the latest version of action template

`GET` `/api/{spaceId}/actiontemplates/{id}/logo`

Also reachable at `/api/actiontemplates/{id}/logo`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Action Type or ID of the action type logo.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Updates the logo associated with the latest version of the action template

`POST` `/api/{spaceId}/actiontemplates/{id}/logo`

Also reachable at `/api/actiontemplates/{id}/logo`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the action template for which to set the logo.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the logo was updated

`ModifyActionTemplateLogoResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Updates the logo associated with the latest version of the action template

`PUT` `/api/{spaceId}/actiontemplates/{id}/logo`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the action template for which to set the logo.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the logo was updated

`ModifyActionTemplateLogoResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Updates the logo associated with the latest version of the action template

`PUT` `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/logo`

Also reachable at `/api/actiontemplates/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the action template for which to set the logo.
- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

**Response**

`200` — Confirmation that the logo was updated

`ModifyActionTemplateLogoResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets usages for an Action Template

`GET` `/api/{spaceId}/actiontemplates/{id}/usage`

Also reachable at `/api/actiontemplates/{id}/usage`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/usage`.

Gets a list of all steps/deployment processes that use a given action template.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the resource.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`branch`** <span class="type-label">string</span> — Optionally filter usages associated with a config as code branch.
- **`process`** <span class="type-label">enum</span> — Optionally filter by process type. Allowed values: `Deployment`, `Runbook`.
- **`project`** <span class="type-label">string</span> — Optionally filter version controlled usages by project.
- **`withUpdates`** <span class="type-label">boolean</span> — Optionally filter for only version controlled usages with updates.

**Response**

`200` — The requested Action Template usages

an array of `ActionTemplateUsageResource`.

- **`ActionId`** <span class="type-label">string</span> — Minimum length 1.
- **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
- **`ActionTemplateId`** <span class="type-label">string</span> — Minimum length 1.
- **`Branch`** <span class="type-label">string</span>
- **`DeploymentProcessId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProcessId`** <span class="type-label">string</span> — Minimum length 1.
- **`ProcessType`** <span class="type-label">enum</span> — Allowed values: `Deployment`, `Runbook`.
- **`ProjectId`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectName`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectSlug`** <span class="type-label">string</span> — Minimum length 1.
- **`Release`** <span class="type-label">string</span>
- **`RunbookId`** <span class="type-label">string</span>
- **`RunbookName`** <span class="type-label">string</span>
- **`StepId`** <span class="type-label">string</span> — Minimum length 1.
- **`StepName`** <span class="type-label">string</span> — Minimum length 1.
- **`Version`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "ActionId": "string",
    "ActionName": "string",
    "ActionTemplateId": "string",
    "Branch": "string",
    "DeploymentProcessId": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "ProcessId": "string",
    "ProcessType": "Deployment",
    "ProjectId": "string",
    "ProjectName": "string",
    "ProjectSlug": "string",
    "Release": "string",
    "RunbookId": "string",
    "RunbookName": "string",
    "StepId": "string",
    "StepName": "string",
    "Version": "string"
  }
]
```
</div>

## Get an Action Template by ID

`GET` `/api/{spaceId}/actiontemplates/{id}/v1`

Also reachable at `/api/actiontemplates/{id}/v1`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the ActionTemplate to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Template

`GetActionTemplateByIdResponse`.

- **`ActionTemplate`** <span class="type-label">object</span>
  - **`ActionType`** <span class="type-label">string</span> — Minimum length 1.
  - **`CommunityActionTemplateId`** <span class="type-label">string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GitDependencies`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Packages`** <span class="type-label">array of object</span>
  - **`Parameters`** <span class="type-label">array of object</span>
  - **`Properties`** <span class="type-label">object</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "ActionTemplate": {
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
        "Properties": {},
        "StepPackageInputsReferenceId": "string",
        "Version": "string"
      }
    ],
    "Parameters": [
      {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      }
    ],
    "Properties": {
      "additionalProp1": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp2": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp3": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    },
    "SpaceId": "string",
    "Version": 0
  }
}
```
</div>

## Get all versions of an Action Template

`GET` `/api/{spaceId}/actiontemplates/{id}/versions`

Also reachable at `/api/actiontemplates/{id}/versions`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/versions`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Action Template.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the Space that contains the Action Template.

**Response**

`200` — The list of action template resources for each version.

an array of `ActionTemplateResource`.

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
[
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
        "Properties": {},
        "StepPackageInputsReferenceId": "string",
        "Version": "string"
      }
    ],
    "Parameters": [
      {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      }
    ],
    "Properties": {
      "additionalProp1": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp2": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp3": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    },
    "SpaceId": "string",
    "Version": 0
  }
]
```
</div>

## Get a specific version of an Action Template

`GET` `/api/{spaceId}/actiontemplates/{id}/versions/{version}`

Also reachable at `/api/actiontemplates/{id}/versions/{version}`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/versions/{version}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Action Template.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the Space that contains the Action Template.
- **`version`** <span class="type-label">string</span> *(required)* — The version number of the Action Template.

**Response**

`200` — The action template resource.

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

## Gets the logo associated with specific version of the action template

`GET` `/api/{spaceId}/actiontemplates/{typeOrId}/versions/{version}/logo`

Also reachable at `/api/actiontemplates/{typeOrId}/versions/{version}/logo`, `/api/spaces/{spaceIdentifier}/actiontemplates/{typeOrId}/versions/{version}/logo`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`typeOrId`** <span class="type-label">string</span> *(required)* — Action Type or ID of the action type logo.
- **`version`** <span class="type-label">string</span> *(required)* — Version of the action type logo.

**Response**

`200` — OK

<div data-example="Response">

```json
"string"
```
</div>
