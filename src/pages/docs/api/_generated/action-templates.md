---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Action Templates
---

## Delete an existing Action Template and all its versions

:endpoint{method="DELETE" path="/api/\{spaceId\}/actionTemplates/\{id\}"}

Also reachable at `/api/actionTemplates/{id}`, `/api/spaces/{spaceIdentifier}/actionTemplates/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Action Template to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Delete an existing Action Template and all its versions

:endpoint{method="DELETE" path="/api/\{spaceId\}/actionTemplates/\{id\}/v1"}

Also reachable at `/api/actionTemplates/{id}/v1`, `/api/spaces/{spaceIdentifier}/actionTemplates/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Action Template to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the requested Action Template has been deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get a list of Action Templates

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates"}

Also reachable at `/api/actiontemplates`, `/api/spaces/{spaceIdentifier}/actiontemplates`.

Lists all of the Action Templates in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  IDs of the action templates to fetch.
- **`isCommunityActionTemplate`** :span[boolean]{.type-label}  
  Filters the results based on whether the action is a community template.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a \"contains\" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Action Templates

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ActionType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`CommunityActionTemplateId`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GitDependencies`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Packages`** :span[array of object]{.type-label}
  - **`Parameters`** :span[array of object]{.type-label}
  - **`Properties`** :span[object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** :span[integer]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
      "SpaceId": "Spaces-1",
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
:::

## Create an Action Template

:endpoint{method="POST" path="/api/\{spaceId\}/actiontemplates"}

Also reachable at `/api/actiontemplates`, `/api/spaces/{spaceIdentifier}/actiontemplates`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space that contains the Action Template.

**Request Body**

- **`ActionType`** :span[string]{.type-label} *(required)*  
  The action type of the Action Template. Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}  
  The community action template id if the Action Template is created from a community template.
- **`Description`** :span[string]{.type-label}  
  The description of the Action Template.
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label} *(required)*
  - **`RepositoryUri`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Inputs`** :span[object]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the Action Template. Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}  
  The list of packages to include in the Action Template.
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}  
  The list of parameters of the Action Template.
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}  
  The list of properties of the Action Template.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space that contains the Action Template.
- **`StepPackageVersion`** :span[string]{.type-label}  
  The step package version if the Action Template is created from a step package.
- **`Version`** :span[integer]{.type-label}  
  The version number of the Action Template. Minimum `0`.

:::api-example{label="Request"}
```json
{
  "ActionType": "string",
  "CommunityActionTemplateId": "CommunityActionTemplates-1",
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
        "IsSensitive": false,
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "StepPackageVersion": "string",
  "Version": 0
}
```
:::

**Response**

`201` — Created

- **`ActionType`** :span[string]{.type-label}  
  Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "Version": 0
}
```
:::

## Get all Action Templates

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/all"}

Also reachable at `/api/actiontemplates/all`, `/api/spaces/{spaceIdentifier}/actiontemplates/all`.

Lists the all of the action templates in the supplied Octopus Deploy Space. The results will be sorted by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Templates

- **`ActionType`** :span[string]{.type-label}  
  Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp2": {
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp3": {
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      }
    },
    "SpaceId": "Spaces-1",
    "Version": 0
  }
]
```
:::

## Get a list of Action Template categories

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/categories"}

Also reachable at `/api/actiontemplates/categories`, `/api/spaces/{spaceIdentifier}/actiontemplates/categories`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Template categories

- **`DisplayOrder`** :span[integer]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## List all available action templates

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/search"}

Also reachable at `/api/actiontemplates/search`, `/api/spaces/{spaceIdentifier}/actiontemplates/search`.

Lists all the Action Templates in the supplied Octopus Deploy Space that fit the search criteria. Includes built-in, custom and community contributed step templates.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`type`** :span[string]{.type-label}

**Response**

`200` — The found Action Templates

- **`Author`** :span[string]{.type-label}
- **`Categories`** :span[array of string]{.type-label}
- **`Category`** :span[string]{.type-label}
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Features`** :span[array of string]{.type-label}
- **`HasUpdate`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`IsBuiltIn`** :span[boolean]{.type-label}
- **`IsInstalled`** :span[boolean]{.type-label}
- **`Keywords`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`Prerelease`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Type`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}
- **`Website`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "HasUpdate": false,
    "Id": "string",
    "IsBuiltIn": false,
    "IsInstalled": false,
    "Keywords": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Prerelease": false,
    "SpaceId": "Spaces-1",
    "Type": "string",
    "Version": "string",
    "Website": "string"
  }
]
```
:::

## Get an Action Template by ID

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{id\}"}

Also reachable at `/api/actiontemplates/{id}`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ActionTemplate to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Template

- **`ActionType`** :span[string]{.type-label}  
  Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "Version": 0
}
```
:::

## Modify an existing action template

:endpoint{method="PUT" path="/api/\{spaceId\}/actiontemplates/\{id\}"}

Also reachable at `/api/actiontemplates/{id}`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the existing Action Template.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space that contains the Action Template.

**Request Body**

- **`Description`** :span[string]{.type-label}  
  The description of the Action Template.
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label} *(required)*
  - **`RepositoryUri`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  The id of the existing Action Template.
- **`Inputs`** :span[object]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the Action Template. Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space that contains the Action Template.
- **`StepPackageVersion`** :span[string]{.type-label}

:::api-example{label="Request"}
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
  "Id": "ActionTemplates-1",
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
        "IsSensitive": false,
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "StepPackageVersion": "string"
}
```
:::

**Response**

`200` — Confirmation that the Action Template was modified, including the updated template.

- **`ActionType`** :span[string]{.type-label}  
  Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "Version": 0
}
```
:::

## Update deployment and runbook actions to a specific version of the action template

:endpoint{method="POST" path="/api/\{spaceId\}/actiontemplates/\{id\}/actionsUpdate"}

Also reachable at `/api/actiontemplates/{id}/actionsUpdate`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/actionsUpdate`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Action Template.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space containing the Action Template.

**Request Body**

- **`ActionIdsByProcessId`** :span[object]{.type-label}
- **`ActionsToUpdate`** :span[array of object]{.type-label} *(required)*  
  The actions to be updated to match the action template.
  - **`ActionIds`** :span[array of string]{.type-label} *(required)*  
    The IDs of the actions to update.
  - **`GitRef`** :span[string]{.type-label}  
    The Git reference for the action to update.
  - **`ProcessId`** :span[string]{.type-label} *(required)*  
    The ID of the deployment process which contains the action(s) to update. Minimum length 1.
  - **`ProcessType`** :span[enum]{.type-label} *(required)*  
    The process type of the deployment process containing the action(s) to update.  
    Allowed values: `Deployment`, `Runbook`.
  - **`ProjectId`** :span[string]{.type-label}  
    The Project Id for the action to update.
- **`DefaultPropertyValues`** :span[object]{.type-label}  
  Default values for properties of the action template.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the Action Template.
- **`Overrides`** :span[object]{.type-label}  
  Overrides for values of the properties of the action template.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space containing the Action Template.
- **`Version`** :span[integer]{.type-label} *(required)*  
  The version of the Action Template.

:::api-example{label="Request"}
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "Id": "ActionTemplates-1",
  "Overrides": {
    "additionalProp1": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "Version": 0
}
```
:::

**Response**

`200` — ActionUpdateResultResources with details of the results of the update returned

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`ManualMergeRequiredReasonsByPropertyName`** :span[object]{.type-label}
- **`NamesOfNewParametersMissingDefaultValue`** :span[array of string]{.type-label}
- **`Outcome`** :span[enum]{.type-label}  
  Allowed values: `Success`, `ManualMergeRequired`, `DefaultParamterValueMissing`, `RemovedPackageInUse`.
- **`RemovedPackageUsages`** :span[array of object]{.type-label}
  - **`PackageReference`** :span[string]{.type-label}
  - **`UsedBy`** :span[enum]{.type-label}  
    Allowed values: `ProjectVersionStrategy`, `ProjectReleaseCreationStrategy`, `ChannelRule`.
  - **`UsedById`** :span[string]{.type-label}
  - **`UsedByName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Create a server task to update deployment and runbook actions to a specific version of the action template

:endpoint{method="POST" path="/api/\{spaceId\}/actiontemplates/\{id\}/actionsUpdate/bulk"}

Also reachable at `/api/actiontemplates/{id}/actionsUpdate/bulk`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/actionsUpdate/bulk`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Action Template.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space containing the Action Template.

**Request Body**

- **`ActionsToUpdate`** :span[array of object]{.type-label} *(required)*  
  The actions to be updated to match the action template.
  - **`ActionIds`** :span[array of string]{.type-label} *(required)*  
    The IDs of the actions to update.
  - **`GitRef`** :span[string]{.type-label}  
    The Git reference for the action to update.
  - **`ProcessId`** :span[string]{.type-label} *(required)*  
    The ID of the deployment process which contains the action(s) to update. Minimum length 1.
  - **`ProcessType`** :span[enum]{.type-label} *(required)*  
    The process type of the deployment process containing the action(s) to update.  
    Allowed values: `Deployment`, `Runbook`.
  - **`ProjectId`** :span[string]{.type-label}  
    The Project Id for the action to update.
- **`DefaultPropertyValues`** :span[object]{.type-label}  
  Default values for properties of the action template.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the Action Template.
- **`Overrides`** :span[object]{.type-label}  
  Overrides for values of the properties of the action template.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space containing the Action Template.
- **`Version`** :span[integer]{.type-label} *(required)*  
  The version of the Action Template.

:::api-example{label="Request"}
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "Id": "ActionTemplates-1",
  "Overrides": {
    "additionalProp1": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "Version": 0
}
```
:::

**Response**

`200` — Returns the results of the update of the actions updated to match the action template.

- **`Outcome`** :span[string]{.type-label}  
  Minimum length 1.
- **`Results`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`ManualMergeRequiredReasonsByPropertyName`** :span[object]{.type-label}
  - **`NamesOfNewParametersMissingDefaultValue`** :span[array of string]{.type-label}
  - **`Outcome`** :span[enum]{.type-label}  
    Allowed values: `Success`, `ManualMergeRequired`, `DefaultParamterValueMissing`, `RemovedPackageInUse`.
  - **`RemovedPackageUsages`** :span[array of object]{.type-label}
- **`TaskId`** :span[string]{.type-label}
- **`ValidationFailures`** :span[array of string]{.type-label}

:::api-example{label="Response"}
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
  "TaskId": "ServerTasks-1",
  "ValidationFailures": [
    "string"
  ]
}
```
:::

## Get the logo associated with the latest version of action template

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{id\}/logo"}

Also reachable at `/api/actiontemplates/{id}/logo`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/logo`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Action Type or ID of the action type logo.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Update the action template logo

:endpoint{method="POST" path="/api/\{spaceId\}/actiontemplates/\{id\}/logo"}

Also reachable at `/api/actiontemplates/{id}/logo`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/logo`.

Updates the logo associated with the latest version of the action template.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the action template for which to set the logo.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the logo was updated

:::api-example{label="Response"}
```json
{}
```
:::

## Update the action template logo

:endpoint{method="PUT" path="/api/\{spaceId\}/actiontemplates/\{id\}/logo"}

Updates the logo associated with the latest version of the action template.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the action template for which to set the logo.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the logo was updated

:::api-example{label="Response"}
```json
{}
```
:::

## Update the action template logo

:endpoint{method="PUT" path="/api/spaces/\{spaceIdentifier\}/actiontemplates/\{id\}/logo"}

Also reachable at `/api/actiontemplates/{id}/logo`.

Updates the logo associated with the latest version of the action template.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the action template for which to set the logo.
- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Response**

`200` — Confirmation that the logo was updated

:::api-example{label="Response"}
```json
{}
```
:::

## Get usages for an Action Template

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{id\}/usage"}

Also reachable at `/api/actiontemplates/{id}/usage`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/usage`.

Gets a list of all steps/deployment processes that use a given action template.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the resource.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`branch`** :span[string]{.type-label}  
  Optionally filter usages associated with a config as code branch.
- **`process`** :span[enum]{.type-label}  
  Optionally filter by process type.  
  Allowed values: `Deployment`, `Runbook`.
- **`project`** :span[string]{.type-label}  
  Optionally filter version controlled usages by project.
- **`withUpdates`** :span[boolean]{.type-label}  
  Optionally filter for only version controlled usages with updates.

**Response**

`200` — The requested Action Template usages

- **`ActionId`** :span[string]{.type-label}  
  Minimum length 1.
- **`ActionName`** :span[string]{.type-label}  
  Minimum length 1.
- **`ActionTemplateId`** :span[string]{.type-label}  
  Minimum length 1.
- **`Branch`** :span[string]{.type-label}
- **`DeploymentProcessId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProcessType`** :span[enum]{.type-label}  
  Allowed values: `Deployment`, `Runbook`.
- **`ProjectId`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectName`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectSlug`** :span[string]{.type-label}  
  Minimum length 1.
- **`Release`** :span[string]{.type-label}
- **`RunbookId`** :span[string]{.type-label}
- **`RunbookName`** :span[string]{.type-label}
- **`StepId`** :span[string]{.type-label}  
  Minimum length 1.
- **`StepName`** :span[string]{.type-label}  
  Minimum length 1.
- **`Version`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get an Action Template by ID

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{id\}/v1"}

Also reachable at `/api/actiontemplates/{id}/v1`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ActionTemplate to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Action Template

- **`ActionTemplate`** :span[object]{.type-label}
  - **`ActionType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`CommunityActionTemplateId`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GitDependencies`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Packages`** :span[array of object]{.type-label}
  - **`Parameters`** :span[array of object]{.type-label}
  - **`Properties`** :span[object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp2": {
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp3": {
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      }
    },
    "SpaceId": "Spaces-1",
    "Version": 0
  }
}
```
:::

## Get all versions of an Action Template

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{id\}/versions"}

Also reachable at `/api/actiontemplates/{id}/versions`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/versions`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Action Template.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space that contains the Action Template.

**Response**

`200` — The list of action template resources for each version.

- **`ActionType`** :span[string]{.type-label}  
  Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp2": {
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      },
      "additionalProp3": {
        "IsSensitive": false,
        "SensitiveValue": {},
        "Value": "string"
      }
    },
    "SpaceId": "Spaces-1",
    "Version": 0
  }
]
```
:::

## Get a specific version of an Action Template

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{id\}/versions/\{version\}"}

Also reachable at `/api/actiontemplates/{id}/versions/{version}`, `/api/spaces/{spaceIdentifier}/actiontemplates/{id}/versions/{version}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Action Template.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space that contains the Action Template.
- **`version`** :span[string]{.type-label} *(required)*  
  The version number of the Action Template.

**Response**

`200` — The action template resource.

- **`ActionType`** :span[string]{.type-label}  
  Minimum length 1.
- **`CommunityActionTemplateId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GitDependencies`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitCredentialType`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`AcquisitionLocation`** :span[string]{.type-label}  
    The package-acquisition location. One of PackageAcquisitionLocationResource or a variable-expression.
  - **`FeedId`** :span[string]{.type-label}  
    Feed ID, name or a variable-expression.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    A name for the package-reference. This may be empty. This is used to discriminate the package-references. Package ID isn't suitable because an action may potentially have multiple references to the same package ID (e.g. if you wanted to use different versions of the same package). Also, the package ID may be a variable-expression.
  - **`PackageId`** :span[string]{.type-label}  
    Package ID or a variable-expression.
  - **`Properties`** :span[object]{.type-label}
  - **`StepPackageInputsReferenceId`** :span[string]{.type-label}  
    This reference identifier is populated when a step package step contains a package reference It allows us to correlate the reference within the step package inputs to this Server package reference.
  - **`Version`** :span[string]{.type-label}  
    Specific version to use for this package. If not specified, package can be selected at release creation or runbook run time.
- **`Parameters`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Properties`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "IsSensitive": false,
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
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp2": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "additionalProp3": {
      "IsSensitive": false,
      "SensitiveValue": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    }
  },
  "SpaceId": "Spaces-1",
  "Version": 0
}
```
:::

## Get the logo associated with specific version of the action template

:endpoint{method="GET" path="/api/\{spaceId\}/actiontemplates/\{typeOrId\}/versions/\{version\}/logo"}

Also reachable at `/api/actiontemplates/{typeOrId}/versions/{version}/logo`, `/api/spaces/{spaceIdentifier}/actiontemplates/{typeOrId}/versions/{version}/logo`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`typeOrId`** :span[string]{.type-label} *(required)*  
  Action Type or ID of the action type logo.
- **`version`** :span[string]{.type-label} *(required)*  
  Version of the action type logo.

**Response**

`200` — OK

:::api-example{label="Response"}
```json
"string"
```
:::
