---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Tag Sets
---

## Get a list of Tag Sets

`GET` `/api/{spaceId}/tagsets`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets`, `/api/tagsets`.

Lists all of the Tag Sets in the supplied Octopus Deploy Space. The results will be sorted alphabetically by the `SortOrder` field on each tag set.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`ids`** <span class="type-label">array of string</span> — Comma separated list of Ids.
- **`name`** <span class="type-label">string</span> — The exact name of a Tag Set to be matched.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a \"contains\" style match against the supplied name or name-fragment.
- **`scopes`** <span class="type-label">array of string</span> — Limits results to tag sets that apply to any of these resource types. Valid values: 'Tenant', 'Environment', 'Project', 'Target', 'Runbook', 'Feature Toggle'.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`types`** <span class="type-label">array of string</span> — Limits results to tag sets of these types. Valid values: 'SingleSelect', 'MultiSelect', 'FreeText'.

**Response**

`200` — The list of matching Tag Sets, sorted alphabetically by the `SortOrder` field on each tag set.

`TagSetResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag set.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsSystem`** <span class="type-label">boolean</span> — Whether this tag set is a system-managed tag set.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag set. Minimum length 1.
  - **`Scopes`** <span class="type-label">array of string</span> — The resource types this tag set applies to.
  - **`SortOrder`** <span class="type-label">integer</span> — Gets or sets the sort order of this tag set.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Tags`** <span class="type-label">array of object</span> — The tags that make up this tag set.
  - **`Type`** <span class="type-label">string</span> — The type of this tag set.
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

## Creates a new Tag Set

`POST` `/api/{spaceId}/tagsets`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets`, `/api/tagsets`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateTagSetCommand`

- **`Description`** <span class="type-label">string</span> — Sets the description of this tag set.
- **`Name`** <span class="type-label">string</span> *(required)* — Sets the name of this tag set. Minimum length 1.
- **`Scopes`** <span class="type-label">array of string</span> — The resource types the tag set applies to. Valid values: 'Tenant', 'Environment', 'Project', 'Target', 'Runbook', 'Feature Toggle'. Defaults to ['Tenant'] when omitted.
- **`SortOrder`** <span class="type-label">integer</span> — Sets the sort order of this tag set.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Tags`** <span class="type-label">array of object</span> — The tags that make up the tag set. Each tag is an object with a 'Name', an optional 'Description', a 'Color' hex code (e.g. '#3156B3'), and a 'SortOrder'. Leave empty for a 'FreeText' tag set, which does not allow predefined tags.
  - **`CanonicalTagName`** <span class="type-label">string</span> — This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** <span class="type-label">string</span> — Gets or sets the color of this tag.
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag.
  - **`SortOrder`** <span class="type-label">integer</span>
- **`Type`** <span class="type-label">string</span> — How tags from the set are applied to a resource: 'MultiSelect' (any number of tags), 'SingleSelect' (one tag at a time), or 'FreeText' (arbitrary values, no predefined tags). Defaults to 'MultiSelect' when omitted.

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

`TagSetResource`.

- **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag set.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsSystem`** <span class="type-label">boolean</span> — Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** <span class="type-label">array of string</span> — The resource types this tag set applies to.
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets the sort order of this tag set.
- **`SpaceId`** <span class="type-label">string</span>
- **`Tags`** <span class="type-label">array of object</span> — The tags that make up this tag set.
  - **`CanonicalTagName`** <span class="type-label">string</span> — This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** <span class="type-label">string</span> — Gets or sets the color of this tag.
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag.
  - **`SortOrder`** <span class="type-label">integer</span>
- **`Type`** <span class="type-label">string</span> — The type of this tag set.

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

`GET` `/api/{spaceId}/tagsets/all`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/all`, `/api/tagsets/all`.

Lists the details of all of the Tag Sets in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each Tag Set.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`scopes`** <span class="type-label">array of string</span>

**Response**

`200` — List of Tag Sets, sorted by the `SortOrder` field on each Tag Set.

an array of `TagSetResource`.

- **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag set.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsSystem`** <span class="type-label">boolean</span> — Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** <span class="type-label">array of string</span> — The resource types this tag set applies to.
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets the sort order of this tag set.
- **`SpaceId`** <span class="type-label">string</span>
- **`Tags`** <span class="type-label">array of object</span> — The tags that make up this tag set.
  - **`CanonicalTagName`** <span class="type-label">string</span> — This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** <span class="type-label">string</span> — Gets or sets the color of this tag.
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag.
  - **`SortOrder`** <span class="type-label">integer</span>
- **`Type`** <span class="type-label">string</span> — The type of this tag set.

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

`PUT` `/api/{spaceId}/tagsets/sortorder`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/sortorder`, `/api/tagsets/sortorder`.

Takes an array of tag set IDs as the request body, uses the order of items in the array to sort the tag sets on the server. The ID of every tag set must be specified.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

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

`GET` `/api/{spaceId}/tagsets/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/{id}`, `/api/tagsets/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tag Set to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Tag Set

`TagSetResource`.

- **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag set.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsSystem`** <span class="type-label">boolean</span> — Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** <span class="type-label">array of string</span> — The resource types this tag set applies to.
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets the sort order of this tag set.
- **`SpaceId`** <span class="type-label">string</span>
- **`Tags`** <span class="type-label">array of object</span> — The tags that make up this tag set.
  - **`CanonicalTagName`** <span class="type-label">string</span> — This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** <span class="type-label">string</span> — Gets or sets the color of this tag.
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag.
  - **`SortOrder`** <span class="type-label">integer</span>
- **`Type`** <span class="type-label">string</span> — The type of this tag set.

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

## Modifies an existing Tag Set

`PUT` `/api/{spaceId}/tagsets/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/{id}`, `/api/tagsets/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tag Set to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyTagSetCommand`

- **`Description`** <span class="type-label">string</span> — Sets the description of this tag set.
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Tag Set to modify.
- **`Name`** <span class="type-label">string</span> *(required)* — Sets the name of this tag set. Minimum length 1.
- **`Scopes`** <span class="type-label">array of string</span> — The complete set of resource types the tag set applies to; a scope omitted here is removed (rejected if tags are in use for it). Valid values: 'Tenant', 'Environment', 'Project', 'Target', 'Runbook', 'Feature Toggle'. Defaults to ['Tenant'] when omitted.
- **`SortOrder`** <span class="type-label">integer</span> — Sets the sort order of this tag set.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Tags`** <span class="type-label">array of object</span> — The complete list of tags for the tag set; existing tags omitted here are deleted (rejected if still in use). Each tag is an object with a 'Name', an optional 'Description', a 'Color' hex code (e.g. '#3156B3'), a 'SortOrder', and — for existing tags — the 'Id' from get_tag_set, which must be kept to update or rename a tag rather than replace it.
  - **`CanonicalTagName`** <span class="type-label">string</span> — This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** <span class="type-label">string</span> — Gets or sets the color of this tag.
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag.
  - **`SortOrder`** <span class="type-label">integer</span>
- **`Type`** <span class="type-label">string</span> — How tags from the set are applied to a resource: 'MultiSelect' (any number of tags), 'SingleSelect' (one tag at a time), or 'FreeText' (arbitrary values, no predefined tags). Defaults to 'MultiSelect' when omitted; a tag set in use can only change from SingleSelect to MultiSelect.

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

`TagSetResource`.

- **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag set.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsSystem`** <span class="type-label">boolean</span> — Whether this tag set is a system-managed tag set.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag set. Minimum length 1.
- **`Scopes`** <span class="type-label">array of string</span> — The resource types this tag set applies to.
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets the sort order of this tag set.
- **`SpaceId`** <span class="type-label">string</span>
- **`Tags`** <span class="type-label">array of object</span> — The tags that make up this tag set.
  - **`CanonicalTagName`** <span class="type-label">string</span> — This is the canonical name for the Tag formed as {TagSetName}/{TagName} which is easier to work with than the ID in certain scenarios.
  - **`Color`** <span class="type-label">string</span> — Gets or sets the color of this tag.
  - **`Description`** <span class="type-label">string</span> — Gets or sets the description of this tag.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this tag.
  - **`SortOrder`** <span class="type-label">integer</span>
- **`Type`** <span class="type-label">string</span> — The type of this tag set.

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

## Deletes an existing Tag Set

`DELETE` `/api/{spaceId}/tagsets/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tagsets/{id}`, `/api/tagsets/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tag Set to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success
