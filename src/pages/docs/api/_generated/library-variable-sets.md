---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Library Variable Sets
---

## List Library Variable Sets

:endpoint{method="GET" path="/api/\{spaceId\}/libraryvariablesets"}

Also reachable at `/api/libraryvariablesets`, `/api/spaces/{spaceIdentifier}/libraryvariablesets`.

List all the library variable sets in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`contentType`** :span[string]{.type-label}  
  Filters by the purpose of the set: 'Variables' for ordinary variable sets or 'ScriptModule' for script modules. Omit to return both.
- **`ids`** :span[array of string]{.type-label}
- **`name`** :span[string]{.type-label}  
  The exact name of a Library Variable Set to be matched.
- **`partialName`** :span[string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — All of the library variable sets in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ContentType`** :span[enum]{.type-label}  
    Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
    Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}  
    Gets the variable templates.
  - **`VariableSetId`** :span[string]{.type-label}  
    Gets or sets the id of the associated variable set.
  - **`Version`** :span[integer]{.type-label}  
    Gets or sets the version number.
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
      "ContentType": "Variables",
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SpaceId": "Spaces-1",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
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

## Create a new library variable set

:endpoint{method="POST" path="/api/\{spaceId\}/libraryvariablesets"}

Also reachable at `/api/libraryvariablesets`, `/api/spaces/{spaceIdentifier}/libraryvariablesets`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ContentType`** :span[enum]{.type-label}  
  Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
  Allowed values: `Variables`, `ScriptModule`.
- **`Description`** :span[string]{.type-label}  
  A description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of this variable set. This should be short, preferably 5-20 characters. Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Templates`** :span[array of object]{.type-label}  
  Variable templates for tenant-specific values: each template defines a variable (name, label, help text, control type and default value) that every tenant connected to a linked project must supply a value for. Leave empty unless working with tenants.
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ContentType": "Variables",
  "Description": "string",
  "Name": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
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
  ]
}
```
:::

**Response**

`201` — Created

- **`ContentType`** :span[enum]{.type-label}  
  Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
  Allowed values: `Variables`, `ScriptModule`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}  
  Gets the variable templates.
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`VariableSetId`** :span[string]{.type-label}  
  Gets or sets the id of the associated variable set.
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "ContentType": "Variables",
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
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
  "VariableSetId": "string",
  "Version": 0
}
```
:::

## Get a list of Library Variable Sets (unpaginated)

:endpoint{method="GET" path="/api/\{spaceId\}/libraryvariablesets/all"}

Also reachable at `/api/libraryvariablesets/all`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/all`.

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`contentType`** :span[string]{.type-label}  
  A content type use to filter Library Variable Sets.
- **`ids`** :span[array of string]{.type-label}  
  A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

- **`ContentType`** :span[enum]{.type-label}  
  Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
  Allowed values: `Variables`, `ScriptModule`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}  
  Gets the variable templates.
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`VariableSetId`** :span[string]{.type-label}  
  Gets or sets the id of the associated variable set.
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
[
  {
    "ContentType": "Variables",
    "Description": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "SpaceId": "Spaces-1",
    "Templates": [
      {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      }
    ],
    "VariableSetId": "string",
    "Version": 0
  }
]
```
:::

## Get a list of Library Variable Sets (unpaginated)

:endpoint{method="GET" path="/api/\{spaceId\}/libraryvariablesets/all/v1"}

Also reachable at `/api/libraryvariablesets/all/v1`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/all/v1`.

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`contentType`** :span[string]{.type-label}  
  A content type use to filter Library Variable Sets.
- **`ids`** :span[array of string]{.type-label}  
  A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

- **`LibraryVariableSets`** :span[array of object]{.type-label}
  - **`ContentType`** :span[enum]{.type-label}  
    Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
    Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}  
    Gets the variable templates.
  - **`VariableSetId`** :span[string]{.type-label}  
    Gets or sets the id of the associated variable set.
  - **`Version`** :span[integer]{.type-label}  
    Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "LibraryVariableSets": [
    {
      "ContentType": "Variables",
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SpaceId": "Spaces-1",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ]
}
```
:::

## Get a list of Library Variable Sets (unpaginated)

:endpoint{method="POST" path="/api/\{spaceId\}/libraryvariablesets/all/v1"}

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`contentType`** :span[string]{.type-label}  
  A content type use to filter Library Variable Sets.
- **`ids`** :span[array of string]{.type-label}  
  A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

- **`LibraryVariableSets`** :span[array of object]{.type-label}
  - **`ContentType`** :span[enum]{.type-label}  
    Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
    Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}  
    Gets the variable templates.
  - **`VariableSetId`** :span[string]{.type-label}  
    Gets or sets the id of the associated variable set.
  - **`Version`** :span[integer]{.type-label}  
    Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "LibraryVariableSets": [
    {
      "ContentType": "Variables",
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SpaceId": "Spaces-1",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ]
}
```
:::

## Get a list of Library Variable Sets (unpaginated)

:endpoint{method="POST" path="/api/spaces/\{spaceIdentifier\}/libraryvariablesets/all/v1"}

Also reachable at `/api/libraryvariablesets/all/v1`.

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Query Parameters**

- **`contentType`** :span[string]{.type-label}  
  A content type use to filter Library Variable Sets.
- **`ids`** :span[array of string]{.type-label}  
  A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

- **`LibraryVariableSets`** :span[array of object]{.type-label}
  - **`ContentType`** :span[enum]{.type-label}  
    Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
    Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}  
    Gets the variable templates.
  - **`VariableSetId`** :span[string]{.type-label}  
    Gets or sets the id of the associated variable set.
  - **`Version`** :span[integer]{.type-label}  
    Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "LibraryVariableSets": [
    {
      "ContentType": "Variables",
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SpaceId": "Spaces-1",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ]
}
```
:::

## Get a Library Variable Set by ID

:endpoint{method="GET" path="/api/\{spaceId\}/libraryvariablesets/\{id\}"}

Also reachable at `/api/libraryvariablesets/{id}`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Library Variable Set to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The Library Variable Set with matching ID.

- **`ContentType`** :span[enum]{.type-label}  
  Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
  Allowed values: `Variables`, `ScriptModule`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}  
  Gets the variable templates.
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`VariableSetId`** :span[string]{.type-label}  
  Gets or sets the id of the associated variable set.
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "ContentType": "Variables",
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
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
  "VariableSetId": "string",
  "Version": 0
}
```
:::

## Modify an existing library variable set

:endpoint{method="PUT" path="/api/\{spaceId\}/libraryvariablesets/\{id\}"}

Also reachable at `/api/libraryvariablesets/{id}`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the library variable set.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the library variable set.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Id": "LibraryVariableSets-1",
  "Name": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
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
  "Version": 0
}
```
:::

**Response**

`200` — The modified library variable set.

- **`ContentType`** :span[enum]{.type-label}  
  Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
  Allowed values: `Variables`, `ScriptModule`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}  
  Gets the variable templates.
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`VariableSetId`** :span[string]{.type-label}  
  Gets or sets the id of the associated variable set.
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
```json
{
  "ContentType": "Variables",
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
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
  "VariableSetId": "string",
  "Version": 0
}
```
:::

## Delete an existing Library Variable Set

:endpoint{method="DELETE" path="/api/\{spaceId\}/libraryvariablesets/\{id\}"}

Also reachable at `/api/libraryvariablesets/{id}`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Library Variable Set to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## List projects and deployments which are using an library variable set

:endpoint{method="GET" path="/api/\{spaceId\}/libraryvariablesets/\{id\}/usages"}

Also reachable at `/api/libraryvariablesets/{id}/usages`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}/usages`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Library Variable Set.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Response**

`200` — The usages of the library variable set.

- **`CountOfProjectsUserCannotSee`** :span[integer]{.type-label}
- **`CountOfReleasesUserCannotSee`** :span[integer]{.type-label}
- **`CountOfRunbookSnapshotsUserCannotSee`** :span[integer]{.type-label}
- **`Projects`** :span[array of object]{.type-label}
  - **`IsCurrentlyBeingUsedInProject`** :span[boolean]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`ProjectSlug`** :span[string]{.type-label}
  - **`Releases`** :span[array of object]{.type-label}
  - **`RunbookSnapshots`** :span[array of object]{.type-label}

:::api-example{label="Response"}
```json
{
  "CountOfProjectsUserCannotSee": 0,
  "CountOfReleasesUserCannotSee": 0,
  "CountOfRunbookSnapshotsUserCannotSee": 0,
  "Projects": [
    {
      "IsCurrentlyBeingUsedInProject": false,
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "ProjectSlug": "string",
      "Releases": [
        {}
      ],
      "RunbookSnapshots": [
        {}
      ]
    }
  ]
}
```
:::
