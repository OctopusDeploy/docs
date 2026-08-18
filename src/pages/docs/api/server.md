---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Server
---

## Request the current server configuration

:endpoint{method="GET" path="/api/serverconfiguration"}

**Response**

`200` — The current server configuration

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ServerUri`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "ServerUri": "string"
}
```
:::

## Set the server configuration

:endpoint{method="PUT" path="/api/serverconfiguration"}

**Request Body**

- **`ServerUri`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ServerUri": "string"
}
```
:::

**Response**

`200` — The updated server configuration

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ServerUri`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "ServerUri": "string"
}
```
:::

## Request the current server configuration settings

:endpoint{method="GET" path="/api/serverconfiguration/settings"}

**Response**

`200` — The current server configuration settings

- **`ConfigurationSet`** :span[string]{.type-label}
- **`ConfigurationValues`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Key`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "ConfigurationSet": "string",
    "ConfigurationValues": [
      {
        "Description": "string",
        "Key": "string",
        "Value": "string"
      }
    ]
  }
]
```
:::
