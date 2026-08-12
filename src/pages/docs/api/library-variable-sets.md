---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Library Variable Sets
---

## Lists all of the library variable sets in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/libraryvariablesets`

Also reachable at `/api/libraryvariablesets`, `/api/spaces/{spaceIdentifier}/libraryvariablesets`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`contentType`** <span class="type-label">string</span> — Filters by the purpose of the set: 'Variables' for ordinary variable sets or 'ScriptModule' for script modules. Omit to return both.
- **`ids`** <span class="type-label">array of string</span>
- **`name`** <span class="type-label">string</span> — The exact name of a Library Variable Set to be matched.
- **`partialName`** <span class="type-label">string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — All of the library variable sets in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

`LibraryVariableSetResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
  - **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.
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
      "SpaceId": "string",
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
</div>

## Creates a new library variable set

`POST` `/api/{spaceId}/libraryvariablesets`

Also reachable at `/api/libraryvariablesets`, `/api/spaces/{spaceIdentifier}/libraryvariablesets`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateLibraryVariableSetsCommand`

- **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
- **`Description`** <span class="type-label">string</span> — A description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of this variable set. This should be short, preferably 5-20 characters. Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Templates`** <span class="type-label">array of object</span> — Variable templates for tenant-specific values: each template defines a variable (name, label, help text, control type and default value) that every tenant connected to a linked project must supply a value for. Leave empty unless working with tenants.
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "ContentType": "Variables",
  "Description": "string",
  "Name": "string",
  "SpaceId": "string",
  "Templates": [
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
  ]
}
```
</div>

**Response**

`201` — Created

`LibraryVariableSetResource`.

- **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
  "Templates": [
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
  "VariableSetId": "string",
  "Version": 0
}
```
</div>

## Get a list of Library Variable Sets

`GET` `/api/{spaceId}/libraryvariablesets/all`

Also reachable at `/api/libraryvariablesets/all`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/all`.

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`contentType`** <span class="type-label">string</span> — A content type use to filter Library Variable Sets.
- **`ids`** <span class="type-label">array of string</span> — A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

an array of `LibraryVariableSetResource`.

- **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
    "SpaceId": "string",
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
</div>

## Get a list of Library Variable Sets

`GET` `/api/{spaceId}/libraryvariablesets/all/v1`

Also reachable at `/api/libraryvariablesets/all/v1`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/all/v1`.

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`contentType`** <span class="type-label">string</span> — A content type use to filter Library Variable Sets.
- **`ids`** <span class="type-label">array of string</span> — A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

`GetAllLibraryVariableSetsResponse`.

- **`LibraryVariableSets`** <span class="type-label">array of object</span>
  - **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
  - **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ]
}
```
</div>

## Get a list of Library Variable Sets

`POST` `/api/{spaceId}/libraryvariablesets/all/v1`

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`contentType`** <span class="type-label">string</span> — A content type use to filter Library Variable Sets.
- **`ids`** <span class="type-label">array of string</span> — A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

`GetAllLibraryVariableSetsResponse`.

- **`LibraryVariableSets`** <span class="type-label">array of object</span>
  - **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
  - **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ]
}
```
</div>

## Get a list of Library Variable Sets

`POST` `/api/spaces/{spaceIdentifier}/libraryvariablesets/all/v1`

Also reachable at `/api/libraryvariablesets/all/v1`.

Lists all the Library Variable Sets in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

- **`contentType`** <span class="type-label">string</span> — A content type use to filter Library Variable Sets.
- **`ids`** <span class="type-label">array of string</span> — A list of Library Variable Set ids used to filter.

**Response**

`200` — Requested list of Library Variable Sets

`GetAllLibraryVariableSetsResponse`.

- **`LibraryVariableSets`** <span class="type-label">array of object</span>
  - **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
  - **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ]
}
```
</div>

## Get a Library Variable Set by ID

`GET` `/api/{spaceId}/libraryvariablesets/{id}`

Also reachable at `/api/libraryvariablesets/{id}`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Library Variable Set to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The Library Variable Set with matching ID.

`LibraryVariableSetResource`.

- **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
  "Templates": [
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
  "VariableSetId": "string",
  "Version": 0
}
```
</div>

## Modifies an existing library variable set

`PUT` `/api/{spaceId}/libraryvariablesets/{id}`

Also reachable at `/api/libraryvariablesets/{id}`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the library variable set.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyLibraryVariableSetCommand`

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the library variable set.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Id": "string",
  "Name": "string",
  "SpaceId": "string",
  "Templates": [
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
  "Version": 0
}
```
</div>

**Response**

`200` — The modified library variable set.

`LibraryVariableSetResource`.

- **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

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
  "SpaceId": "string",
  "Templates": [
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
  "VariableSetId": "string",
  "Version": 0
}
```
</div>

## Deletes an existing Library Variable Set

`DELETE` `/api/{spaceId}/libraryvariablesets/{id}`

Also reachable at `/api/libraryvariablesets/{id}`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Library Variable Set to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Lists projects and deployments which are using an library variable set

`GET` `/api/{spaceId}/libraryvariablesets/{id}/usages`

Also reachable at `/api/libraryvariablesets/{id}/usages`, `/api/spaces/{spaceIdentifier}/libraryvariablesets/{id}/usages`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Library Variable Set.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Response**

`200` — The usages of the library variable set.

`GetLibraryVariableSetUsageResponse`.

- **`CountOfProjectsUserCannotSee`** <span class="type-label">integer</span>
- **`CountOfReleasesUserCannotSee`** <span class="type-label">integer</span>
- **`CountOfRunbookSnapshotsUserCannotSee`** <span class="type-label">integer</span>
- **`Projects`** <span class="type-label">array of object</span>
  - **`IsCurrentlyBeingUsedInProject`** <span class="type-label">boolean</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`ProjectSlug`** <span class="type-label">string</span>
  - **`Releases`** <span class="type-label">array of object</span>
  - **`RunbookSnapshots`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "CountOfProjectsUserCannotSee": 0,
  "CountOfReleasesUserCannotSee": 0,
  "CountOfRunbookSnapshotsUserCannotSee": 0,
  "Projects": [
    {
      "IsCurrentlyBeingUsedInProject": true,
      "ProjectId": "string",
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
</div>
