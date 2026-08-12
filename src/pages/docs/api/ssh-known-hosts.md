---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Ssh Known Hosts
---

## Gets a list of SSH Known Hosts

`GET` `/api/sshknownhosts`

**Parameters**

- **`partialHost`** <span class="type-label">string</span> — Filters known hosts matching any part of the `host` fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Contains a list of SSH Known Hosts

`GetSshKnownHostsResponse`.

- **`FilteredCount`** <span class="type-label">integer</span>
- **`Resources`** <span class="type-label">array of object</span>
  - **`Host`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`KeyType`** <span class="type-label">string</span>
  - **`PublicKey`** <span class="type-label">string</span>
- **`TotalCount`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Adds new SSH Known Hosts from a list of entries

`POST` `/api/sshknownhosts`

**Request Body**

`AddSshKnownHostsCommand`

- **`KnownHostEntries`** <span class="type-label">array of string</span> *(required)*

<div data-example="Request">

```json
{
  "KnownHostEntries": [
    "string"
  ]
}
```
</div>

**Response**

`200` — Contains a list of added SSH Known Hosts

`AddSshKnownHostsResponse`.

- **`AddedResources`** <span class="type-label">array of object</span>
  - **`Host`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`KeyType`** <span class="type-label">string</span>
  - **`PublicKey`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Deletes the specific SSH Known Host

`DELETE` `/api/sshknownhosts/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — An empty response

`DeleteSshKnownHostResponse`.

<div data-example="Response">

```json
{}
```
</div>
