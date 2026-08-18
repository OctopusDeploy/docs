---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Community Action Templates
---

## Get a list of Community Action Templates

:endpoint{method="GET" path="/api/communityactiontemplates"}

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of Community Action Templates.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Author`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`HistoryUrl`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Packages`** :span[array of object]{.type-label}
  - **`Parameters`** :span[array of object]{.type-label}
  - **`Properties`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
  - **`Website`** :span[string]{.type-label}
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
:::

## Get a Community Action Template by ID

:endpoint{method="GET" path="/api/communityactiontemplates/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the CommunityActionTemplate to load.

**Response**

`200` — The requested Community Action Template.

- **`Author`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`HistoryUrl`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}
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
- **`Type`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}
- **`Website`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get installed version of the template

:endpoint{method="GET" path="/api/communityactiontemplates/\{id\}/actiontemplate/\{actiontemplatespaceId\}"}

Also reachable at `/api/communityactiontemplates/{id}/actiontemplate`.

**Path Parameters**

- **`actiontemplatespaceId`** :span[string]{.type-label} *(required)*  
  Then ID of the space where the Action Template can be located.
- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Community Action Template.

**Response**

`200` — The installed version of the template.

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
:::

## Install community step template

:endpoint{method="POST" path="/api/communityactiontemplates/\{id\}/installation/\{actiontemplatespaceId\}"}

Also reachable at `/api/communityactiontemplates/{id}/installation`.

**Path Parameters**

- **`actiontemplatespaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space where the action template should be installed.
- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the community action template.

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
:::

## Update installed community step template to the latest version

:endpoint{method="PUT" path="/api/communityactiontemplates/\{id\}/installation/\{actiontemplatespaceId\}"}

Also reachable at `/api/communityactiontemplates/{id}/installation`.

**Path Parameters**

- **`actiontemplatespaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space where the action template should be installed.
- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the community action template.

**Response**

`200` — The updated Action Template.

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
:::

## Get the logo associated with the community step template

:endpoint{method="GET" path="/api/communityactiontemplates/\{id\}/logo"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the community action template.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::
