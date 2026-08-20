---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Variables
---

## Return a summary of the variables that will be migrated to Git

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/git/migrate-variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-variables`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  Id of the project to convert.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the requested Project Variables were converted to git

- **`SensitiveVariableCount`** :span[integer]{.type-label}
- **`TextVariableCount`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "SensitiveVariableCount": 0,
  "TextVariableCount": 0
}
```
:::

## Convert all non-sensitive project variables to be stored in Git rather than the database

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/git/migrate-variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-variables`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Branch`** :span[string]{.type-label} *(required)*
- **`CommitMessage`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`CreateBranch`** :span[boolean]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Branch": "string",
  "CommitMessage": "string",
  "CreateBranch": true,
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Empty response indicating the Project Variables were converted

:::api-example{label="Response"}
```json
{}
```
:::

## Get variables for a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/variables`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Variable Set

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OwnerId": "string",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

## Modify variables for the project

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/variables`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`ScopeValues`** :span[object]{.type-label} *(required)*
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`Variables`** :span[array of object]{.type-label} *(required)*
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "ProjectId": "Projects-1",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

**Response**

`200` — Confirms that a Project Variable Set has been modified

:::api-example{label="Response"}
```json
{}
```
:::

## Get variables for a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/variables`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Variable Set

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OwnerId": "string",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

## Modify variables for the project

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/variables`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label}
- **`GitRef`** :span[string]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`ScopeValues`** :span[object]{.type-label} *(required)*
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`Variables`** :span[array of object]{.type-label} *(required)*
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "ProjectId": "Projects-1",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

**Response**

`200` — Confirms that a Project Variable Set has been modified

:::api-example{label="Response"}
```json
{}
```
:::

## Get a list of Variable Sets

:endpoint{method="GET" path="/api/\{spaceId\}/variables/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/variables/all`, `/api/variables/all`.

Lists all the Variable Sets in the supplied Space.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of Variable Set resource IDs used to filter a query.

**Response**

`200` — The requested list of Variable Sets

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
[
  {
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "OwnerId": "string",
    "ScopeValues": {
      "Actions": [
        {}
      ],
      "Channels": [
        {}
      ],
      "EnvironmentParameters": [
        {}
      ],
      "Environments": [
        {}
      ],
      "Machines": [
        {}
      ],
      "ProcessTemplateSteps": [
        {}
      ],
      "Processes": [
        {}
      ],
      "Roles": [
        {}
      ],
      "TargetTagParameters": [
        {}
      ],
      "TenantTagParameters": [
        {}
      ],
      "TenantTags": [
        {}
      ]
    },
    "SpaceId": "Spaces-1",
    "Variables": [
      {
        "Description": "string",
        "Id": "string",
        "IsEditable": true,
        "IsSensitive": true,
        "Name": "string",
        "Prompt": {},
        "Scope": {},
        "Type": "string",
        "Value": "string"
      }
    ],
    "Version": 0
  }
]
```
:::

## Get a list of Variable names

:endpoint{method="GET" path="/api/\{spaceId\}/variables/names"}

Also reachable at `/api/spaces/{spaceIdentifier}/variables/names`, `/api/variables/names`.

List the names of variables that can be used in deployment actions. If a project is specified, this will include variables in that project. If a project environments filter is specified, project variables which are scoped to an unspecified environment will be excluded.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`gitRef`** :span[string]{.type-label}  
  GitRef for the project variables.
- **`project`** :span[string]{.type-label}  
  ID of the Project.
- **`projectEnvironmentsFilter`** :span[array of string]{.type-label}  
  ID of the Deployment Environments to filter on.
- **`runbook`** :span[string]{.type-label}  
  ID of the Runbook.

**Response**

`200` — The requested list of Variable names

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## Get a Variable Set preview

:endpoint{method="GET" path="/api/\{spaceId\}/variables/preview"}

Also reachable at `/api/spaces/{spaceIdentifier}/variables/preview`, `/api/variables/preview`.

Lists the evaluated Variables for a deployment.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`action`** :span[string]{.type-label}  
  ID of the Action.
- **`channel`** :span[string]{.type-label}  
  ID of the Channel.
- **`environment`** :span[string]{.type-label}  
  ID of the Deployment Environment.
- **`gitRef`** :span[string]{.type-label}  
  GitRef for the project variables.
- **`machine`** :span[string]{.type-label}  
  ID of the Machine.
- **`project`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`role`** :span[string]{.type-label}  
  Name of the Role.
- **`runbook`** :span[string]{.type-label}  
  ID of the Runbook.
- **`tenant`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — The requested Variable Set Preview

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OwnerId": "string",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

## Get a Variable Set by Id

:endpoint{method="GET" path="/api/\{spaceId\}/variables/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/variables/{id}`, `/api/variables/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Variable Set.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Variable Set

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OwnerId": "string",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

## Update a Variable Set

:endpoint{method="PUT" path="/api/\{spaceId\}/variables/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/variables/{id}`, `/api/variables/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Request"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OwnerId": "string",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::

**Response**

`200` — Confirms that a variable set has been modified, containing the updated variable set

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OwnerId": "string",
  "ScopeValues": {
    "Actions": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Channels": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "EnvironmentParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Machines": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "ProcessTemplateSteps": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Processes": [
      {
        "Id": "string",
        "Name": "string",
        "ProcessType": "Deployment"
      }
    ],
    "Roles": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TargetTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTagParameters": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "TenantTags": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "SpaceId": "Spaces-1",
  "Variables": [
    {
      "Description": "string",
      "Id": "string",
      "IsEditable": true,
      "IsSensitive": true,
      "Name": "string",
      "Prompt": {
        "Description": "string",
        "DisplaySettings": {},
        "Label": "string",
        "Required": true
      },
      "Scope": {
        "Action": [
          "string"
        ],
        "Channel": [
          "string"
        ],
        "Environment": [
          "string"
        ],
        "EnvironmentParameter": [
          "string"
        ],
        "Machine": [
          "string"
        ],
        "ParentDeployment": [
          "string"
        ],
        "Private": [
          "string"
        ],
        "ProcessOwner": [
          "string"
        ],
        "ProcessTemplateStep": [
          "string"
        ],
        "Project": [
          "string"
        ],
        "ProjectTemplate": [
          "string"
        ],
        "Role": [
          "string"
        ],
        "TargetRole": [
          "string"
        ],
        "TargetTagParameter": [
          "string"
        ],
        "TemplatedProject": [
          "string"
        ],
        "Tenant": [
          "string"
        ],
        "TenantTag": [
          "string"
        ],
        "TenantTagParameter": [
          "string"
        ],
        "Trigger": [
          "string"
        ],
        "User": [
          "string"
        ]
      },
      "Type": "string",
      "Value": "string"
    }
  ],
  "Version": 0
}
```
:::
