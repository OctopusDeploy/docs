---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Teams
---

## Get a list of Teams

:endpoint{method="GET" path="/api/\{spaceId\}/teams"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams`, `/api/teams`.

Lists all of the Teams in the system or Octopus Deploy Space (if provided). The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of Team IDs, to limit the matching of Teams to those with a particular ID. Example: ["Teams-1", "Teams-2"].
- **`name`** :span[string]{.type-label}  
  The exact name of a Team to be matched.
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the set of Teams to those with a name that includes the partial name.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Requested list of Teams

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanBeDeleted`** :span[boolean]{.type-label}  
    Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
  - **`CanBeRenamed`** :span[boolean]{.type-label}  
    Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
  - **`CanChangeMembers`** :span[boolean]{.type-label}  
    Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
  - **`CanChangeRoles`** :span[boolean]{.type-label}  
    Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
  - **`Description`** :span[string]{.type-label}
  - **`ExternalSecurityGroups`** :span[array of object]{.type-label}  
    The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MemberUserIds`** :span[array of string]{.type-label}  
    The users who belong to the team.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this team.
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
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
:::

## Create a new team

:endpoint{method="POST" path="/api/\{spaceId\}/teams"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams`, `/api/teams`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The space in which to create the team.

**Request Body**

- **`Description`** :span[string]{.type-label}  
  The description for the team.
- **`ExternalSecurityGroups`** :span[array of object]{.type-label} *(required)*  
  The externally-managed security groups (e.g., Active Directory groups) who will belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`MemberUserIds`** :span[array of string]{.type-label} *(required)*  
  The users who will belong to the team.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the team. Minimum length 1. Maximum length 200.
- **`Slug`** :span[string]{.type-label}  
  The slug of the team.
- **`SpaceId`** :span[string]{.type-label}  
  The space in which to create the team.

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

`201` — Created

- **`CanBeDeleted`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** :span[string]{.type-label}
- **`ExternalSecurityGroups`** :span[array of object]{.type-label}  
  The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** :span[array of string]{.type-label}  
  The users who belong to the team.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this team.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Teams

:endpoint{method="GET" path="/api/\{spaceId\}/teams/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams/all`, `/api/teams/all`.

Lists all of the Teams in the supplied Octopus Deploy Space. The results will be sorted by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested list of Teams

- **`CanBeDeleted`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** :span[string]{.type-label}
- **`ExternalSecurityGroups`** :span[array of object]{.type-label}  
  The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** :span[array of string]{.type-label}  
  The users who belong to the team.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this team.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Team by ID

:endpoint{method="GET" path="/api/\{spaceId\}/teams/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}`, `/api/teams/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the team.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — The requested Team

- **`CanBeDeleted`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** :span[string]{.type-label}
- **`ExternalSecurityGroups`** :span[array of object]{.type-label}  
  The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** :span[array of string]{.type-label}  
  The users who belong to the team.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this team.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify an existing Team

:endpoint{method="PUT" path="/api/\{spaceId\}/teams/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}`, `/api/teams/{id}`.

The Everyone Team is treated as a special case and its members and external groups may not be changed.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`ExternalSecurityGroups`** :span[array of object]{.type-label}  
  The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`MemberUserIds`** :span[array of string]{.type-label}  
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

`200` — Indicates the team was modified, containing the updated Team

- **`CanBeDeleted`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be deleted. The built-in teams provided by Octopus generally cannot be deleted.
- **`CanBeRenamed`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team can be renamed. The built-in teams provided by Octopus generally cannot be renamed.
- **`CanChangeMembers`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the members of this team can be changed. The built-in Everyone team provided by Octopus cannot have its members changed, as it will always contain all users.
- **`CanChangeRoles`** :span[boolean]{.type-label}  
  Gets or sets a flag indicating whether the team's roles can be changed. The built-in Octopus Administrators team provided by Octopus cannot have its roles modified; all other teams can.
- **`Description`** :span[string]{.type-label}
- **`ExternalSecurityGroups`** :span[array of object]{.type-label}  
  The externally-managed security groups (e.g., Active Directory groups) who belong to the team.
  - **`DisplayIdAndName`** :span[boolean]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MemberUserIds`** :span[array of string]{.type-label}  
  The users who belong to the team.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this team.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing Team

:endpoint{method="DELETE" path="/api/\{spaceId\}/teams/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}`, `/api/teams/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Team to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Get a list of a Team's Scoped User Roles

:endpoint{method="GET" path="/api/\{spaceId\}/teams/\{id\}/scopeduserroles"}

Also reachable at `/api/spaces/{spaceIdentifier}/teams/{id}/scopeduserroles`, `/api/teams/{id}/scopeduserroles`.

List all the Scoped User Roles for the Team. Results will be sorted by Space Id with System Teams being sorted before Space Teams.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Scoped User Roles

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectGroupIds`** :span[array of string]{.type-label}
  - **`ProjectIds`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TeamId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`UserRoleId`** :span[string]{.type-label}
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
:::
