---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Variables
---

## Returns a summary of the variables that will be migrated to Git

`GET` `/api/{spaceId}/projects/{projectId}/git/migrate-variables`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-variables`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — Id of the project to convert.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the requested Project Variables were converted to git

`ConvertProjectVariablesToGitSummaryResponse`.

- **`SensitiveVariableCount`** <span class="type-label">integer</span>
- **`TextVariableCount`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "SensitiveVariableCount": 0,
  "TextVariableCount": 0
}
```
</div>

## Converts all non-sensitive project variables to be stored in Git rather than the database

`POST` `/api/{spaceId}/projects/{projectId}/git/migrate-variables`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-variables`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ConvertProjectVariablesToGitCommand`

- **`Branch`** <span class="type-label">string</span> *(required)*
- **`CommitMessage`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`CreateBranch`** <span class="type-label">boolean</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "Branch": "string",
  "CommitMessage": "string",
  "CreateBranch": true,
  "ProjectId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Empty response indicating the Project Variables were converted

`ConvertProjectVariablesToGitResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets variables for a project

`GET` `/api/{spaceId}/projects/{projectId}/variables`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/variables`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Variable Set

`ProjectVariablesResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
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
</div>

## Modifies variables for the project

`PUT` `/api/{spaceId}/projects/{projectId}/variables`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/variables`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyProjectVariableSetInDatabaseCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`ScopeValues`** <span class="type-label">object</span> *(required)*
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`Variables`** <span class="type-label">array of object</span> *(required)*
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "ProjectId": "string",
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
  "SpaceId": "string",
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
</div>

**Response**

`200` — Confirms that a Project Variable Set has been modified

`ModifyProjectVariableSetInDatabaseResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets variables for a project

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/variables`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/variables`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Variable Set

`ProjectVariablesResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
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
</div>

## Modifies variables for the project

`PUT` `/api/{spaceId}/projects/{projectId}/{gitRef}/variables`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/variables`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyProjectVariableSetInGitCommand`

- **`ChangeDescription`** <span class="type-label">string</span>
- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`ScopeValues`** <span class="type-label">object</span> *(required)*
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`Variables`** <span class="type-label">array of object</span> *(required)*
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "GitRef": "string",
  "ProjectId": "string",
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
  "SpaceId": "string",
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
</div>

**Response**

`200` — Confirms that a Project Variable Set has been modified

`ModifyProjectVariableSetInGitResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get a list of Variable Sets

`GET` `/api/{spaceId}/variables/all`

Also reachable at `/api/spaces/{spaceIdentifier}/variables/all`, `/api/variables/all`.

Lists all the Variable Sets in the supplied Space.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A list of Variable Set resource IDs used to filter a query.

**Response**

`200` — The requested list of Variable Sets

an array of `VariableSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
    "SpaceId": "string",
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
</div>

## Get a list of Variable names

`GET` `/api/{spaceId}/variables/names`

Also reachable at `/api/spaces/{spaceIdentifier}/variables/names`, `/api/variables/names`.

List the names of variables that can be used in deployment actions. If a project is specified, this will include variables in that project. If a project environments filter is specified, project variables which are scoped to an unspecified environment will be excluded.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`gitRef`** <span class="type-label">string</span> — GitRef for the project variables.
- **`project`** <span class="type-label">string</span> — ID of the Project.
- **`projectEnvironmentsFilter`** <span class="type-label">array of string</span> — ID of the Deployment Environments to filter on.
- **`runbook`** <span class="type-label">string</span> — ID of the Runbook.

**Response**

`200` — The requested list of Variable names

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Get a Variable Set preview

`GET` `/api/{spaceId}/variables/preview`

Also reachable at `/api/spaces/{spaceIdentifier}/variables/preview`, `/api/variables/preview`.

Lists the evaluated Variables for a deployment.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`action`** <span class="type-label">string</span> — ID of the Action.
- **`channel`** <span class="type-label">string</span> — ID of the Channel.
- **`environment`** <span class="type-label">string</span> — ID of the Deployment Environment.
- **`gitRef`** <span class="type-label">string</span> — GitRef for the project variables.
- **`machine`** <span class="type-label">string</span> — ID of the Machine.
- **`project`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`role`** <span class="type-label">string</span> — Name of the Role.
- **`runbook`** <span class="type-label">string</span> — ID of the Runbook.
- **`tenant`** <span class="type-label">string</span> — ID of the Tenant.

**Response**

`200` — The requested Variable Set Preview

`VariableSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
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
</div>

## Get a Variable Set by Id

`GET` `/api/{spaceId}/variables/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/variables/{id}`, `/api/variables/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Variable Set.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Variable Set

`VariableSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
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
</div>

## Updates a Variable Set

`PUT` `/api/{spaceId}/variables/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/variables/{id}`, `/api/variables/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyVariableSetCommand`

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Request">

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
  "SpaceId": "string",
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
</div>

**Response**

`200` — Confirms that a variable set has been modified, containing the updated variable set

`VariableSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
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
</div>
