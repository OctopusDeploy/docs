---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Tag Sets
---

## Get a list of Tag Sets

:span[GET]{.api-get} `/api/{spaceId}/tagsets`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets`, `/api/tagsets`.

Lists all of the Tag Sets in the supplied Octopus Deploy Space. The results will be sorted alphabetically by the `SortOrder` field on each tag set.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Comma separated list of Ids.
- **`name`** :span[string]{.type-label}  
  The exact name of a Tag Set to be matched.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a \"contains\" style match against the supplied name or name-fragment.
- **`scopes`** :span[array of string]{.type-label}  
  Limits results to tag sets that apply to any of these resource types. Valid values: 'Tenant', 'Environment', 'Project', 'Target', 'Runbook', 'Feature Toggle'.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`types`** :span[array of string]{.type-label}  
  Limits results to tag sets of these types. Valid values: 'SingleSelect', 'MultiSelect', 'FreeText'.

**Response**

`200` — The list of matching Tag Sets, sorted alphabetically by the `SortOrder` field on each tag set.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag set.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsSystem`** :span[boolean]{.type-label}  
    Whether this tag set is a system-managed tag set.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag set. Minimum length 1.
  - **`Scopes`** :span[array of string]{.type-label}  
    The resource types this tag set applies to.
  - **`SortOrder`** :span[integer]{.type-label}  
    Gets or sets the sort order of this tag set.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Tags`** :span[array of object]{.type-label}  
    The tags that make up this tag set.
  - **`Type`** :span[string]{.type-label}  
    The type of this tag set.
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Description": "string",
      "Id": "string",
      "IsSystem": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "Scopes": [
        "string"
      ],
      "SortOrder": 0,
      "SpaceId": "string",
      "Tags": [
        {}
      ],
      "Type": "string"
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

## Create a new Tag Set

:span[POST]{.api-post} `/api/{spaceId}/tagsets`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets`, `/api/tagsets`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}  
  Sets the description of this tag set.
- **`Name`** :span[string]{.type-label} *(required)*  
  Sets the name of this tag set. Minimum length 1.
- **`Scopes`** :span[array of string]{.type-label}  
  The resource types the tag set applies to. Valid values: 'Tenant', 'Environment', 'Project', 'Target', 'Runbook', 'Feature Toggle'. Defaults to ['Tenant'] when omitted.
- **`SortOrder`** :span[integer]{.type-label}  
  Sets the sort order of this tag set.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Tags`** :span[array of object]{.type-label}  
  The tags that make up the tag set. Each tag is an object with a 'Name', an optional 'Description', a 'Color' hex code (e.g. '#3156B3'), and a 'SortOrder'. Leave empty for a 'FreeText' tag set, which does not allow predefined tags.
  - **`CanonicalTagName`** :span[string]{.type-label}  
    This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** :span[string]{.type-label}  
    Gets or sets the color of this tag.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag.
  - **`SortOrder`** :span[integer]{.type-label}
- **`Type`** :span[string]{.type-label}  
  How tags from the set are applied to a resource: 'MultiSelect' (any number of tags), 'SingleSelect' (one tag at a time), or 'FreeText' (arbitrary values, no predefined tags). Defaults to 'MultiSelect' when omitted.

<div data-example="Request">

```json
{
  "Description": "string",
  "Name": "string",
  "Scopes": [
    "string"
  ],
  "SortOrder": 0,
  "SpaceId": "string",
  "Tags": [
    {
      "CanonicalTagName": "string",
      "Color": "string",
      "Description": "string",
      "Id": "string",
      "Name": "string",
      "SortOrder": 0
    }
  ],
  "Type": "string"
}
```
</div>

**Response**

`201` — Created

- **`Description`** :span[string]{.type-label}  
  Gets or sets the description of this tag set.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsSystem`** :span[boolean]{.type-label}  
  Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** :span[array of string]{.type-label}  
  The resource types this tag set applies to.
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets the sort order of this tag set.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of object]{.type-label}  
  The tags that make up this tag set.
  - **`CanonicalTagName`** :span[string]{.type-label}  
    This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** :span[string]{.type-label}  
    Gets or sets the color of this tag.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag.
  - **`SortOrder`** :span[integer]{.type-label}
- **`Type`** :span[string]{.type-label}  
  The type of this tag set.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "IsSystem": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Scopes": [
    "string"
  ],
  "SortOrder": 0,
  "SpaceId": "string",
  "Tags": [
    {
      "CanonicalTagName": "string",
      "Color": "string",
      "Description": "string",
      "Id": "string",
      "Name": "string",
      "SortOrder": 0
    }
  ],
  "Type": "string"
}
```
</div>

## Get a list of Tag Sets

:span[GET]{.api-get} `/api/{spaceId}/tagsets/all`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/all`, `/api/tagsets/all`.

Lists the details of all of the Tag Sets in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each Tag Set.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`scopes`** :span[array of string]{.type-label}

**Response**

`200` — List of Tag Sets, sorted by the `SortOrder` field on each Tag Set.

- **`Description`** :span[string]{.type-label}  
  Gets or sets the description of this tag set.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsSystem`** :span[boolean]{.type-label}  
  Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** :span[array of string]{.type-label}  
  The resource types this tag set applies to.
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets the sort order of this tag set.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of object]{.type-label}  
  The tags that make up this tag set.
  - **`CanonicalTagName`** :span[string]{.type-label}  
    This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** :span[string]{.type-label}  
    Gets or sets the color of this tag.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag.
  - **`SortOrder`** :span[integer]{.type-label}
- **`Type`** :span[string]{.type-label}  
  The type of this tag set.

<div data-example="Response">

```json
[
  {
    "Description": "string",
    "Id": "string",
    "IsSystem": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Scopes": [
      "string"
    ],
    "SortOrder": 0,
    "SpaceId": "string",
    "Tags": [
      {
        "CanonicalTagName": "string",
        "Color": "string",
        "Description": "string",
        "Id": "string",
        "Name": "string",
        "SortOrder": 0
      }
    ],
    "Type": "string"
  }
]
```
</div>

## PUT /api/{spaceId}/tagsets/sortorder

:span[PUT]{.api-put} `/api/{spaceId}/tagsets/sortorder`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/sortorder`, `/api/tagsets/sortorder`.

Takes an array of tag set IDs as the request body, uses the order of items in the array to sort the tag sets on the server. The ID of every tag set must be specified.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

A `array of string` payload.

<div data-example="Request">

```json
[
  "string"
]
```
</div>

**Response**

`200` — Success

## Get a Tag Set by ID

:span[GET]{.api-get} `/api/{spaceId}/tagsets/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/{id}`, `/api/tagsets/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tag Set to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Tag Set

- **`Description`** :span[string]{.type-label}  
  Gets or sets the description of this tag set.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsSystem`** :span[boolean]{.type-label}  
  Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** :span[array of string]{.type-label}  
  The resource types this tag set applies to.
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets the sort order of this tag set.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of object]{.type-label}  
  The tags that make up this tag set.
  - **`CanonicalTagName`** :span[string]{.type-label}  
    This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** :span[string]{.type-label}  
    Gets or sets the color of this tag.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag.
  - **`SortOrder`** :span[integer]{.type-label}
- **`Type`** :span[string]{.type-label}  
  The type of this tag set.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "IsSystem": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Scopes": [
    "string"
  ],
  "SortOrder": 0,
  "SpaceId": "string",
  "Tags": [
    {
      "CanonicalTagName": "string",
      "Color": "string",
      "Description": "string",
      "Id": "string",
      "Name": "string",
      "SortOrder": 0
    }
  ],
  "Type": "string"
}
```
</div>

## Modify an existing Tag Set

:span[PUT]{.api-put} `/api/{spaceId}/tagsets/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/{id}`, `/api/tagsets/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tag Set to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}  
  Sets the description of this tag set.
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Tag Set to modify.
- **`Name`** :span[string]{.type-label} *(required)*  
  Sets the name of this tag set. Minimum length 1.
- **`Scopes`** :span[array of string]{.type-label}  
  The complete set of resource types the tag set applies to; a scope omitted here is removed (rejected if tags are in use for it). Valid values: 'Tenant', 'Environment', 'Project', 'Target', 'Runbook', 'Feature Toggle'. Defaults to ['Tenant'] when omitted.
- **`SortOrder`** :span[integer]{.type-label}  
  Sets the sort order of this tag set.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Tags`** :span[array of object]{.type-label}  
  The complete list of tags for the tag set; existing tags omitted here are deleted (rejected if still in use). Each tag is an object with a 'Name', an optional 'Description', a 'Color' hex code (e.g. '#3156B3'), a 'SortOrder', and — for existing tags — the 'Id' from get_tag_set, which must be kept to update or rename a tag rather than replace it.
  - **`CanonicalTagName`** :span[string]{.type-label}  
    This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** :span[string]{.type-label}  
    Gets or sets the color of this tag.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag.
  - **`SortOrder`** :span[integer]{.type-label}
- **`Type`** :span[string]{.type-label}  
  How tags from the set are applied to a resource: 'MultiSelect' (any number of tags), 'SingleSelect' (one tag at a time), or 'FreeText' (arbitrary values, no predefined tags). Defaults to 'MultiSelect' when omitted; a tag set in use can only change from SingleSelect to MultiSelect.

<div data-example="Request">

```json
{
  "Description": "string",
  "Id": "string",
  "Name": "string",
  "Scopes": [
    "string"
  ],
  "SortOrder": 0,
  "SpaceId": "string",
  "Tags": [
    {
      "CanonicalTagName": "string",
      "Color": "string",
      "Description": "string",
      "Id": "string",
      "Name": "string",
      "SortOrder": 0
    }
  ],
  "Type": "string"
}
```
</div>

**Response**

`200` — Confirms that a Tag Set has been modified, containing the updated Tag Set

- **`Description`** :span[string]{.type-label}  
  Gets or sets the description of this tag set.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsSystem`** :span[boolean]{.type-label}  
  Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** :span[array of string]{.type-label}  
  The resource types this tag set applies to.
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets the sort order of this tag set.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of object]{.type-label}  
  The tags that make up this tag set.
  - **`CanonicalTagName`** :span[string]{.type-label}  
    This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** :span[string]{.type-label}  
    Gets or sets the color of this tag.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets the description of this tag.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this tag.
  - **`SortOrder`** :span[integer]{.type-label}
- **`Type`** :span[string]{.type-label}  
  The type of this tag set.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "IsSystem": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Scopes": [
    "string"
  ],
  "SortOrder": 0,
  "SpaceId": "string",
  "Tags": [
    {
      "CanonicalTagName": "string",
      "Color": "string",
      "Description": "string",
      "Id": "string",
      "Name": "string",
      "SortOrder": 0
    }
  ],
  "Type": "string"
}
```
</div>

## Delete an existing Tag Set

:span[DELETE]{.api-delete} `/api/{spaceId}/tagsets/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/{id}`, `/api/tagsets/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tag Set to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success
