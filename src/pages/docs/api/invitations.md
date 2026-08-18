---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Invitations
---

## Create an invitation to allow a new person to join this Octopus instance

:endpoint{method="POST" path="/api/\{spaceId\}/users/invitations"}

Also reachable at `/api/spaces/{spaceIdentifier}/users/invitations`, `/api/users/invitations`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space to create the invitation in.

**Request Body**

- **`AddToTeamIds`** :span[array of string]{.type-label} *(required)*  
  The teams the user will be invited to join.
- **`SpaceId`** :span[string]{.type-label}  
  The ID of the space to create the invitation in.

:::api-example{label="Request"}
```json
{
  "AddToTeamIds": [
    "string"
  ],
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`AddToTeamIds`** :span[array of string]{.type-label}
- **`Expires`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`InvitationCode`** :span[string]{.type-label}  
  Minimum length 1.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AddToTeamIds": [
    "string"
  ],
  "Expires": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "InvitationCode": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SpaceId": "string"
}
```
:::

## Get an Invitation by ID

:endpoint{method="GET" path="/api/\{spaceId\}/users/invitations/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/users/invitations/{id}`, `/api/users/invitations/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Invitation to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — An Invitation object

- **`AddToTeamIds`** :span[array of string]{.type-label}
- **`Expires`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`InvitationCode`** :span[string]{.type-label}  
  Minimum length 1.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AddToTeamIds": [
    "string"
  ],
  "Expires": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "InvitationCode": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SpaceId": "string"
}
```
:::
