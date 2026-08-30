---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Proxies
---

## Get a list of Proxies

:endpoint{method="GET" path="/api/\{spaceId\}/proxies"}

Also reachable at `/api/proxies`, `/api/spaces/{spaceIdentifier}/proxies`.

Lists all of the Proxies in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Proxies, sorted alphabetically by name.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Host`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`Password`** :span[sensitive value]{.type-label}
  - **`Port`** :span[integer]{.type-label}
  - **`ProxyType`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Username`** :span[string]{.type-label}
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
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Port": 0,
      "ProxyType": "string",
      "SpaceId": "Spaces-1",
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
:::

## Create a Proxy in the specified Space

:endpoint{method="POST" path="/api/\{spaceId\}/proxies"}

Also reachable at `/api/proxies`, `/api/spaces/{spaceIdentifier}/proxies`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Request Body**

- **`Host`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Port`** :span[integer]{.type-label} *(required)*  
  Minimum `0`. Maximum `65535`.
- **`ProxyType`** :span[string]{.type-label}  
  The type of proxy. Currently only HTTP is supported.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.
- **`Username`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Host": "string",
  "Name": "string",
  "Password": {
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "Spaces-1",
  "Username": "string"
}
```
:::

**Response**

`201` — Created

- **`Host`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Port`** :span[integer]{.type-label}
- **`ProxyType`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "Spaces-1",
  "Username": "string"
}
```
:::

## Get a list of Proxies

:endpoint{method="GET" path="/api/\{spaceId\}/proxies/all"}

Also reachable at `/api/proxies/all`, `/api/spaces/{spaceIdentifier}/proxies/all`.

Lists the name and ID of all of the Proxies in the supplied Octopus Deploy Space. The results will be sorted by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — The name and ID of all Proxies in the supplied Octopus Deploy Space, sorted by name.

- **`Host`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Port`** :span[integer]{.type-label}
- **`ProxyType`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label}

:::api-example{label="Response"}
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
      "HasValue": false,
      "Hint": "string",
      "NewValue": "string"
    },
    "Port": 0,
    "ProxyType": "string",
    "SpaceId": "Spaces-1",
    "Username": "string"
  }
]
```
:::

## Get a Proxy by ID

:endpoint{method="GET" path="/api/\{spaceId\}/proxies/\{id\}"}

Also reachable at `/api/proxies/{id}`, `/api/spaces/{spaceIdentifier}/proxies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Proxy to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — The requested Proxy

- **`Host`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Port`** :span[integer]{.type-label}
- **`ProxyType`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "Spaces-1",
  "Username": "string"
}
```
:::

## Modify the specified Proxy in the specified Space

:endpoint{method="PUT" path="/api/\{spaceId\}/proxies/\{id\}"}

Also reachable at `/api/proxies/{id}`, `/api/spaces/{spaceIdentifier}/proxies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Proxy to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space containing the Proxy to modify.

**Request Body**

- **`Host`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Proxy to modify.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Port`** :span[integer]{.type-label} *(required)*  
  Minimum `0`. Maximum `65535`.
- **`ProxyType`** :span[string]{.type-label}  
  The type of proxy. Currently only HTTP is supported.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space containing the Proxy to modify.
- **`Username`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Host": "string",
  "Id": "Proxys-1",
  "Name": "string",
  "Password": {
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "Spaces-1",
  "Username": "string"
}
```
:::

**Response**

`200` — The modified Proxy

- **`Host`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Port`** :span[integer]{.type-label}
- **`ProxyType`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "Port": 0,
  "ProxyType": "string",
  "SpaceId": "Spaces-1",
  "Username": "string"
}
```
:::

## Delete an existing Proxy by Id

:endpoint{method="DELETE" path="/api/\{spaceId\}/proxies/\{id\}"}

Also reachable at `/api/proxies/{id}`, `/api/spaces/{spaceIdentifier}/proxies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Proxy to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — Success
