---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Team Memberships
---

## Get a list of Team Memberships for a user

:span[GET]{.api-get} `/api/{spaceId}/teammembership`

Also reachable at `/api/spaces/{spaceIdentifier}/teammembership`, `/api/spaces/{spaceIdentifier}/users/{userId}/teams`, `/api/teammembership`, `/api/users/{userId}/teams`, `/api/{spaceId}/users/{userId}/teams`.

Lists all Teams a user is a member of, including any from external auth-provider security groups. Memberships are filtered by userId.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Query Parameters**

- **`userId`** :span[string]{.type-label} *(required)*  
  ID of the user.

**Response**

`200` — The requested Team Membership

- **`ExternalSecurityGroups`** :span[array of object]{.type-label}
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`IsDirectlyAssigned`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label}
- **`TeamName`** :span[string]{.type-label}
- **`UserId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Preview Users that would belong to the specified Team

:span[POST]{.api-post} `/api/{spaceId}/teammembership/previewteam`

Also reachable at `/api/spaces/{spaceIdentifier}/teammembership/previewteam`, `/api/teammembership/previewteam`.

Lists all the Users that would belong to the specified Team, including information about whether they are directly assigned and/or indirectly assigned via external security groups.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`ExternalSecurityGroups`** :span[array of object]{.type-label} *(required)*  
  The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`MemberUserIds`** :span[array of string]{.type-label} *(required)*  
  The users who belong to the team.
- **`Name`** :span[string]{.type-label} *(required)*  
  Gets or sets the name of this team. Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Request"}
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
:::

**Response**

`200` — The requested Preview of Team Membership

- **`ExternalSecurityGroups`** :span[array of object]{.type-label}
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`IsDirectlyAssigned`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label}
- **`TeamName`** :span[string]{.type-label}
- **`UserId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
