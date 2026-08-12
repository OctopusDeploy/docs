---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Invitations
---

## Create an invitation to allow a new person to join this Octopus instance

`POST` `/api/{spaceId}/users/invitations`

Also reachable at `/api/spaces/{spaceIdentifier}/users/invitations`, `/api/users/invitations`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space to create the invitation in.

**Request Body**

`CreateInvitationCommand`

- **`AddToTeamIds`** <span class="type-label">array of string</span> *(required)* — The teams the user will be invited to join.
- **`SpaceId`** <span class="type-label">string</span> — The ID of the space to create the invitation in.

<div data-example="Request">

```json
{
  "AddToTeamIds": [
    "string"
  ],
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`InvitationResource`.

- **`AddToTeamIds`** <span class="type-label">array of string</span>
- **`Expires`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`InvitationCode`** <span class="type-label">string</span> — Minimum length 1.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Get an Invitation by ID

`GET` `/api/{spaceId}/users/invitations/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/users/invitations/{id}`, `/api/users/invitations/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Invitation to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — An Invitation object

`InvitationResource`.

- **`AddToTeamIds`** <span class="type-label">array of string</span>
- **`Expires`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`InvitationCode`** <span class="type-label">string</span> — Minimum length 1.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>
