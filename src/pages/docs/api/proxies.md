---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Proxies
---

## Get a list of Proxies

`GET` `/api/{spaceId}/proxies`

Also reachable at `/api/proxies`, `/api/spaces/{spaceIdentifier}/proxies`.

Lists all of the Proxies in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

- **`ids`** <span class="type-label">array of string</span>
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Proxies, sorted alphabetically by name.

`ProxyResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Host`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`Password`** <span class="type-label">sensitive value</span>
  - **`Port`** <span class="type-label">integer</span>
  - **`ProxyType`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Username`** <span class="type-label">string</span>
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
      "Host": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "Password": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Port": 0,
      "ProxyType": "string",
      "SpaceId": "string",
      "Username": "string"
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

## Creates a Proxy in the specified Space

`POST` `/api/{spaceId}/proxies`

Also reachable at `/api/proxies`, `/api/spaces/{spaceIdentifier}/proxies`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Request Body**

`CreateProxyCommand`

- **`Host`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Port`** <span class="type-label">integer</span> *(required)* — Minimum `0`. Maximum `65535`.
- **`ProxyType`** <span class="type-label">string</span> — The type of proxy. Currently only HTTP is supported.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.
- **`Username`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Host": "string",
  "Name": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "string",
  "Username": "string"
}
```
</div>

**Response**

`201` — Created

`ProxyResource`.

- **`Host`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Port`** <span class="type-label">integer</span>
- **`ProxyType`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Host": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "string",
  "Username": "string"
}
```
</div>

## Get a list of Proxies

`GET` `/api/{spaceId}/proxies/all`

Also reachable at `/api/proxies/all`, `/api/spaces/{spaceIdentifier}/proxies/all`.

Lists the name and ID of all of the Proxies in the supplied Octopus Deploy Space. The results will be sorted by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — The name and ID of all Proxies in the supplied Octopus Deploy Space, sorted by name.

an array of `ProxyResource`.

- **`Host`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Port`** <span class="type-label">integer</span>
- **`ProxyType`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Host": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Port": 0,
    "ProxyType": "string",
    "SpaceId": "string",
    "Username": "string"
  }
]
```
</div>

## Get a Proxy by ID

`GET` `/api/{spaceId}/proxies/{id}`

Also reachable at `/api/proxies/{id}`, `/api/spaces/{spaceIdentifier}/proxies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Proxy to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — The requested Proxy

`ProxyResource`.

- **`Host`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Port`** <span class="type-label">integer</span>
- **`ProxyType`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Host": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "string",
  "Username": "string"
}
```
</div>

## Modifies the specified Proxy in the specified Space

`PUT` `/api/{spaceId}/proxies/{id}`

Also reachable at `/api/proxies/{id}`, `/api/spaces/{spaceIdentifier}/proxies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Proxy to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space containing the Proxy to modify.

**Request Body**

`ModifyProxyCommand`

- **`Host`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Proxy to modify.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Port`** <span class="type-label">integer</span> *(required)* — Minimum `0`. Maximum `65535`.
- **`ProxyType`** <span class="type-label">string</span> — The type of proxy. Currently only HTTP is supported.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space containing the Proxy to modify.
- **`Username`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Host": "string",
  "Id": "string",
  "Name": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "string",
  "Username": "string"
}
```
</div>

**Response**

`200` — The modified Proxy

`ProxyResource`.

- **`Host`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Port`** <span class="type-label">integer</span>
- **`ProxyType`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Host": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "string",
  "Username": "string"
}
```
</div>

## Deletes an existing Proxy by Id

`DELETE` `/api/{spaceId}/proxies/{id}`

Also reachable at `/api/proxies/{id}`, `/api/spaces/{spaceIdentifier}/proxies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Proxy to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — Success
