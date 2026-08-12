---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Team Memberships
---

## Gets a list of Team Memberships for a user

`GET` `/api/{spaceId}/teammembership`

Also reachable at `/api/spaces/{spaceIdentifier}/teammembership`, `/api/spaces/{spaceIdentifier}/users/{userId}/teams`, `/api/teammembership`, `/api/users/{userId}/teams`, `/api/{spaceId}/users/{userId}/teams`.

Lists all Teams a user is a member of, including any from external auth-provider security groups. Memberships are filtered by userId.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

- **`userId`** <span class="type-label">string</span> *(required)* — ID of the user.

**Response**

`200` — The requested Team Membership

an array of `TeamMembership`.

- **`ExternalSecurityGroups`** <span class="type-label">array of object</span>
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`IsDirectlyAssigned`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span>
- **`TeamName`** <span class="type-label">string</span>
- **`UserId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "ExternalSecurityGroups": [
      {
        "DisplayIdAndName": true,
        "DisplayName": "string",
        "Id": "string"
      }
    ],
    "IsDirectlyAssigned": true,
    "SpaceId": "string",
    "TeamId": "string",
    "TeamName": "string",
    "UserId": "string"
  }
]
```
</div>

## Preview Users that would belong to the specified Team

`POST` `/api/{spaceId}/teammembership/previewteam`

Also reachable at `/api/spaces/{spaceIdentifier}/teammembership/previewteam`, `/api/teammembership/previewteam`.

Lists all the Users that would belong to the specified Team, including information about whether they are directly assigned and/or indirectly assigned via external security groups.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`GetTeamMembershipPreviewRequest`

- **`Description`** <span class="type-label">string</span>
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> *(required)* — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`MemberUserIds`** <span class="type-label">array of string</span> *(required)* — The users who belong to the team.
- **`Name`** <span class="type-label">string</span> *(required)* — Gets or sets the name of this team. Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "ExternalSecurityGroups": [
    {
      "DisplayIdAndName": true,
      "DisplayName": "string",
      "Id": "string"
    }
  ],
  "Id": "string",
  "MemberUserIds": [
    "string"
  ],
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The requested Preview of Team Membership

an array of `TeamMembershipPreview`.

- **`ExternalSecurityGroups`** <span class="type-label">array of object</span>
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`IsDirectlyAssigned`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span>
- **`TeamName`** <span class="type-label">string</span>
- **`UserId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "ExternalSecurityGroups": [
      {
        "DisplayIdAndName": true,
        "DisplayName": "string",
        "Id": "string"
      }
    ],
    "IsDirectlyAssigned": true,
    "SpaceId": "string",
    "TeamId": "string",
    "TeamName": "string",
    "UserId": "string"
  }
]
```
</div>
