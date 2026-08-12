---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Audit Stream
---

## Gets the audit stream configuration

`GET` `/api/audit-stream`

**Response**

`200` — The Audit Stream configuration

`AuditStreamConfigurationResource`.

- **`Active`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StreamConfigurationResource`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Active": true,
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StreamConfigurationResource": {}
}
```
</div>

## Modifies the audit stream configuration

`PUT` `/api/audit-stream`

**Request Body**

`ModifyAuditStreamConfigurationCommand`

- **`Active`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`StreamConfigurationResource`** <span class="type-label">object</span>

<div data-example="Request">

```json
{
  "Active": true,
  "Description": "string",
  "StreamConfigurationResource": {}
}
```
</div>

**Response**

`200` — The modified Audit Stream configuration

`AuditStreamConfigurationResource`.

- **`Active`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StreamConfigurationResource`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Active": true,
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StreamConfigurationResource": {}
}
```
</div>
