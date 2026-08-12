---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Teams
---

## Gets a list of Teams

`GET` `/api/{spaceId}/teams`

Also reachable at `/api/spaces/{spaceIdentifier}/teams`, `/api/teams`.

Lists all of the Teams in the system or Octopus Deploy Space (if provided). The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

- **`ids`** <span class="type-label">array of string</span> — A list of Team IDs, to limit the matching of Teams to those with a particular ID. Example: ["Teams-1", "Teams-2"].
- **`name`** <span class="type-label">string</span> — The exact name of a Team to be matched.
- **`partialName`** <span class="type-label">string</span> — A partial name, to limit the set of Teams to those with a name that includes the partial name.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Requested list of Teams

`TeamResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanBeDeleted`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
  - **`CanBeRenamed`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
  - **`CanChangeMembers`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
  - **`CanChangeRoles`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
  - **`Description`** <span class="type-label">string</span>
  - **`ExternalSecurityGroups`** <span class="type-label">array of object</span> — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MemberUserIds`** <span class="type-label">array of string</span> — The users who belong to the team.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this team.
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
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
      "CanBeDeleted": true,
      "CanBeRenamed": true,
      "CanChangeMembers": true,
      "CanChangeRoles": true,
      "Description": "string",
      "ExternalSecurityGroups": [
        {}
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MemberUserIds": [
        "string"
      ],
      "Name": "string",
      "Slug": "string",
      "SpaceId": "string"
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

## Create a new team

`POST` `/api/{spaceId}/teams`

Also reachable at `/api/spaces/{spaceIdentifier}/teams`, `/api/teams`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The space in which to create the team.

**Request Body**

`CreateTeamCommand`

- **`Description`** <span class="type-label">string</span> — The description for the team.
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> *(required)* — The externally-managed security groups (e.g., Active Directory groups) who will belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`MemberUserIds`** <span class="type-label">array of string</span> *(required)* — The users who will belong to the team.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the team. Minimum length 1. Maximum length 200.
- **`Slug`** <span class="type-label">string</span> — The slug of the team.
- **`SpaceId`** <span class="type-label">string</span> — The space in which to create the team.

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

`201` — Created

`TeamResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** <span class="type-label">string</span>
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** <span class="type-label">array of string</span> — The users who belong to the team.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this team.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CanBeDeleted": true,
  "CanBeRenamed": true,
  "CanChangeMembers": true,
  "CanChangeRoles": true,
  "Description": "string",
  "ExternalSecurityGroups": [
    {
      "DisplayIdAndName": true,
      "DisplayName": "string",
      "Id": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MemberUserIds": [
    "string"
  ],
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Get a list of Teams

`GET` `/api/{spaceId}/teams/all`

Also reachable at `/api/spaces/{spaceIdentifier}/teams/all`, `/api/teams/all`.

Lists all of the Teams in the supplied Octopus Deploy Space. The results will be sorted by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested list of Teams

an array of `TeamResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** <span class="type-label">string</span>
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** <span class="type-label">array of string</span> — The users who belong to the team.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this team.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "CanBeDeleted": true,
    "CanBeRenamed": true,
    "CanChangeMembers": true,
    "CanChangeRoles": true,
    "Description": "string",
    "ExternalSecurityGroups": [
      {
        "DisplayIdAndName": true,
        "DisplayName": "string",
        "Id": "string"
      }
    ],
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "MemberUserIds": [
      "string"
    ],
    "Name": "string",
    "Slug": "string",
    "SpaceId": "string"
  }
]
```
</div>

## Get a Team by ID

`GET` `/api/{spaceId}/teams/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}`, `/api/teams/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the team.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — The requested Team

`TeamResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** <span class="type-label">string</span>
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** <span class="type-label">array of string</span> — The users who belong to the team.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this team.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CanBeDeleted": true,
  "CanBeRenamed": true,
  "CanChangeMembers": true,
  "CanChangeRoles": true,
  "Description": "string",
  "ExternalSecurityGroups": [
    {
      "DisplayIdAndName": true,
      "DisplayName": "string",
      "Id": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MemberUserIds": [
    "string"
  ],
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Modifies an existing Team

`PUT` `/api/{spaceId}/teams/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}`, `/api/teams/{id}`.

The Everyone Team is treated as a special case and its members and external groups may not be changed.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyTeamCommand`

- **`Description`** <span class="type-label">string</span>
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`MemberUserIds`** <span class="type-label">array of string</span> — The users who belong to the team.
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

`200` — Indicates the team was modified, containing the updated Team

`TeamResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** <span class="type-label">boolean</span> — Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** <span class="type-label">string</span>
- **`ExternalSecurityGroups`** <span class="type-label">array of object</span> — The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** <span class="type-label">boolean</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** <span class="type-label">array of string</span> — The users who belong to the team.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this team.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CanBeDeleted": true,
  "CanBeRenamed": true,
  "CanChangeMembers": true,
  "CanChangeRoles": true,
  "Description": "string",
  "ExternalSecurityGroups": [
    {
      "DisplayIdAndName": true,
      "DisplayName": "string",
      "Id": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MemberUserIds": [
    "string"
  ],
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Deletes an existing Team

`DELETE` `/api/{spaceId}/teams/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}`, `/api/teams/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Team to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Get a list of a Team's Scoped User Roles

`GET` `/api/{spaceId}/teams/{id}/scopeduserroles`

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}/scopeduserroles`, `/api/teams/{id}/scopeduserroles`.

List all the Scoped User Roles for the Team. Results will be sorted by Space Id with System Teams being sorted before Space Teams.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Scoped User Roles

`ScopedUserRoleResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectGroupIds`** <span class="type-label">array of string</span>
  - **`ProjectIds`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TeamId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`UserRoleId`** <span class="type-label">string</span>
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
      "EnvironmentIds": [
        "string"
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectGroupIds": [
        "string"
      ],
      "ProjectIds": [
        "string"
      ],
      "SpaceId": "string",
      "TeamId": "string",
      "TenantIds": [
        "string"
      ],
      "UserRoleId": "string"
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
