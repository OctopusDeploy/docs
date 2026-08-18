---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Ssh Known Hosts
---

## Get a list of SSH Known Hosts

:span[GET]{.api-get} `/api/sshknownhosts`

**Query Parameters**

- **`partialHost`** :span[string]{.type-label}  
  Filters known hosts matching any part of the `host` fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Contains a list of SSH Known Hosts

- **`FilteredCount`** :span[integer]{.type-label}
- **`Resources`** :span[array of object]{.type-label}
  - **`Host`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`KeyType`** :span[string]{.type-label}
  - **`PublicKey`** :span[string]{.type-label}
- **`TotalCount`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "FilteredCount": 0,
  "Resources": [
    {
      "Host": "string",
      "Id": "string",
      "KeyType": "string",
      "PublicKey": "string"
    }
  ],
  "TotalCount": 0
}
```
:::

## Add new SSH Known Hosts from a list of entries

:span[POST]{.api-post} `/api/sshknownhosts`

**Request Body**

- **`KnownHostEntries`** :span[array of string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "KnownHostEntries": [
    "string"
  ]
}
```
:::

**Response**

`200` — Contains a list of added SSH Known Hosts

- **`AddedResources`** :span[array of object]{.type-label}
  - **`Host`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`KeyType`** :span[string]{.type-label}
  - **`PublicKey`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AddedResources": [
    {
      "Host": "string",
      "Id": "string",
      "KeyType": "string",
      "PublicKey": "string"
    }
  ]
}
```
:::

## Delete the specific SSH Known Host

:span[DELETE]{.api-delete} `/api/sshknownhosts/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — An empty response

:::api-example{label="Response"}
```json
{}
```
:::
