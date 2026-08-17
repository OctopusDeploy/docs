---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Git Hub
---

## Get the installation URL for the GitHub App

:span[GET]{.api-get} `/api/github/accounts/install-url`

**Query Parameters**

- **`redirectUri`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## Get the settings for the GitHub App

:span[GET]{.api-get} `/api/github/app/settings`

**Response**

`200` — Success

- **`CanUseGitHubApp`** :span[boolean]{.type-label}
- **`CanUseTrustedFlow`** :span[boolean]{.type-label}

<div data-example="Response">

```json
{
  "CanUseGitHubApp": true,
  "CanUseTrustedFlow": true
}
```
</div>

## Get the status of the registration between Octopus Server and the GitHub App

:span[GET]{.api-get} `/api/github/app/status`

**Response**

`200` — Response containing the status of the registration between Octopus Server and the GitHub App

- **`Status`** :span[string]{.type-label}  
  The status of the GitHub App registration. Valid values are: Connected, RegistrationInvalid, Error. Minimum length 1.

<div data-example="Response">

```json
{
  "Status": "string"
}
```
</div>

## Get GitHub App connections for the space

:span[GET]{.api-get} `/api/{spaceId}/github/connections`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — All GitHub App connections for the space

- **`Connections`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Installation`** :span[object]{.type-label}
  - **`Status`** :span[enum]{.type-label}  
    Allowed values: `ConnectionNotFound`, `InstallationNotFound`, `InstallationSuspended`, `Connected`, `Error`.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "Connections": [
    {
      "Id": "string",
      "Installation": {
        "AccountAvatarUrl": "string",
        "AccountId": "string",
        "AccountLogin": "string",
        "AccountType": "string",
        "AllRepositories": true,
        "InstallationId": "string"
      },
      "Status": "ConnectionNotFound"
    }
  ],
  "ItemsPerPage": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a new GitHub App connection for an installation

:span[POST]{.api-post} `/api/{spaceId}/github/connections`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`InstallationId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "InstallationId": "string",
  "RepositoryIds": [
    "string"
  ],
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

<div data-example="Response">

```json
"string"
```
</div>

## Get the GitHub repositories for the current connection

:span[GET]{.api-get} `/api/{spaceId}/github/connections/{connectionId}/repositories`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{connectionId}/repositories`.

**Path Parameters**

- **`connectionId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — GitHub repositories available for the current connection

- **`Repositories`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}
  - **`GitUrl`** :span[string]{.type-label}
  - **`IsAdmin`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`Language`** :span[string]{.type-label}
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}
  - **`Visibility`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Repositories": [
    {
      "DefaultBranch": "string",
      "GitUrl": "string",
      "IsAdmin": true,
      "IsPrivate": true,
      "Language": "string",
      "RepositoryId": "string",
      "RepositoryName": "string",
      "Visibility": "string"
    }
  ]
}
```
</div>

## Get a single GitHub app connection by id

:span[GET]{.api-get} `/api/{spaceId}/github/connections/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — A GitHub app connection

- **`Id`** :span[string]{.type-label}
- **`Installation`** :span[object]{.type-label}
  - **`AccountAvatarUrl`** :span[string]{.type-label}
  - **`AccountId`** :span[string]{.type-label}
  - **`AccountLogin`** :span[string]{.type-label}
  - **`AccountType`** :span[string]{.type-label}
  - **`AllRepositories`** :span[boolean]{.type-label}  
    true if the installation has access to all repositories in the account, false if it has access to only selected repositories.
  - **`InstallationId`** :span[string]{.type-label}
- **`Repositories`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}
  - **`GitUrl`** :span[string]{.type-label}
  - **`IsAdmin`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`Language`** :span[string]{.type-label}
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}
  - **`Visibility`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Status`** :span[string]{.type-label}  
  Minimum length 1.
- **`StatusUserMessage`** :span[string]{.type-label}
- **`UnknownRepositories`** :span[array of object]{.type-label}  
  Repositories IDs that are configured on the connection but do not have a matching repository returned from GitHub.
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string",
  "Installation": {
    "AccountAvatarUrl": "string",
    "AccountId": "string",
    "AccountLogin": "string",
    "AccountType": "string",
    "AllRepositories": true,
    "InstallationId": "string"
  },
  "Repositories": [
    {
      "DefaultBranch": "string",
      "GitUrl": "string",
      "IsAdmin": true,
      "IsPrivate": true,
      "Language": "string",
      "RepositoryId": "string",
      "RepositoryName": "string",
      "Visibility": "string"
    }
  ],
  "SpaceId": "string",
  "Status": "string",
  "StatusUserMessage": "string",
  "UnknownRepositories": [
    {
      "RepositoryId": "string",
      "RepositoryName": "string"
    }
  ]
}
```
</div>

## Update a GitHub App connection with a new set of repositories

:span[PUT]{.api-put} `/api/{spaceId}/github/connections/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "Id": "string",
  "RepositoryIds": [
    "string"
  ],
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — GitHub app connection modified result

<div data-example="Response">

```json
{}
```
</div>

## Delete a GitHub App Connection

:span[DELETE]{.api-delete} `/api/{spaceId}/github/connections/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the GitHub connection to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Used to indicate that a GitHub App Connection has been deleted

<div data-example="Response">

```json
{}
```
</div>

## Recover GitHub App connection after the registration has changed

:span[POST]{.api-post} `/api/{spaceId}/github/connections/{id}/recover`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}/recover`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "Id": "string",
  "RepositoryIds": [
    "string"
  ],
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — GitHub app connection recovery result

<div data-example="Response">

```json
{}
```
</div>

## Recover GitHub App connection after the installation was not found

:span[POST]{.api-post} `/api/{spaceId}/github/connections/{id}/recover-not-found`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}/recover-not-found`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`InstallationId`** :span[string]{.type-label} *(required)*
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "Id": "string",
  "InstallationId": "string",
  "RepositoryIds": [
    "string"
  ],
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — GitHub app connection not-found recovery result

<div data-example="Response">

```json
{}
```
</div>

## Refresh the GitHub App connection token

:span[POST]{.api-post} `/api/{spaceId}/github/connections/{id}/refresh`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}/refresh`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — GitHub app connection has been refreshed

<div data-example="Response">

```json
{}
```
</div>

## Get a list of GitHub organisations accessible to the current GitHub OAuth user. Request will fail if the user does not have a valid GitHub OAuth token

:span[GET]{.api-get} `/api/{spaceId}/github/installations`

Also reachable at `/api/spaces/{spaceIdentifier}/github/installations`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`excludeConnected`** :span[boolean]{.type-label}

**Response**

`200` — List of GitHub organisations accessible to the current GitHub OAuth user

- **`Installations`** :span[array of object]{.type-label}
  - **`AccountAvatarUrl`** :span[string]{.type-label}
  - **`AccountId`** :span[string]{.type-label}
  - **`AccountLogin`** :span[string]{.type-label}
  - **`AccountType`** :span[string]{.type-label}
  - **`AllRepositories`** :span[boolean]{.type-label}  
    true if the installation has access to all repositories in the account, false if it has access to only selected repositories.
  - **`InstallationId`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Installations": [
    {
      "AccountAvatarUrl": "string",
      "AccountId": "string",
      "AccountLogin": "string",
      "AccountType": "string",
      "AllRepositories": true,
      "InstallationId": "string"
    }
  ]
}
```
</div>

## Handle the response from GitHub after an application has been installed or updated

:span[GET]{.api-get} `/api/github/installations/updated`

**Query Parameters**

- **`installation_id`** :span[string]{.type-label}
- **`redirectUri`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## Get the GitHub repositories for an installation visible to the current user https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#list-repositories-accessible-to-the-user-access-token

:span[GET]{.api-get} `/api/github/installations/{installationId}/repositories`

**Path Parameters**

- **`installationId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}
  - **`GitUrl`** :span[string]{.type-label}
  - **`IsAdmin`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`Language`** :span[string]{.type-label}
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}
  - **`Visibility`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "ItemType": "string",
  "Items": [
    {
      "DefaultBranch": "string",
      "GitUrl": "string",
      "IsAdmin": true,
      "IsPrivate": true,
      "Language": "string",
      "RepositoryId": "string",
      "RepositoryName": "string",
      "Visibility": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Reset the GitHub app registration for this Octopus instance. This is a destructive command and will break all existing GitHub app connections across the instance. This should only be used as a last resort to recover connectivity with GitHub

:span[POST]{.api-post} `/api/github/reset-registration`

**Response**

`200` — GitHub app registration was successfully deleted

<div data-example="Response">

```json
{}
```
</div>

## Search for GitHub repositories for an account visible to the current user https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories

:span[GET]{.api-get} `/api/github/search/{accountName}/repositories`

**Path Parameters**

- **`accountName`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`keyword`** :span[string]{.type-label}
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}
  - **`GitUrl`** :span[string]{.type-label}
  - **`IsAdmin`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`Language`** :span[string]{.type-label}
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}
  - **`Visibility`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "ItemType": "string",
  "Items": [
    {
      "DefaultBranch": "string",
      "GitUrl": "string",
      "IsAdmin": true,
      "IsPrivate": true,
      "Language": "string",
      "RepositoryId": "string",
      "RepositoryName": "string",
      "Visibility": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Get status of the users current authorization

:span[GET]{.api-get} `/api/github/user/app/authorization_status`

**Query Parameters**

- **`includeUserDetails`** :span[boolean]{.type-label}

**Response**

`200` — Get the status of the user's current authorization.

- **`CanAuthorize`** :span[boolean]{.type-label}
- **`IsAuthorized`** :span[boolean]{.type-label}
- **`UserDetails`** :span[object]{.type-label}
  - **`AvatarUrl`** :span[string]{.type-label}
  - **`Login`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`PrimaryEmail`** :span[string]{.type-label}
  - **`RefreshTokenValidTo`** :span[string]{.type-label}  
    Format `date-time`.
  - **`TokenValidTo`** :span[string]{.type-label}  
    Format `date-time`.

<div data-example="Response">

```json
{
  "CanAuthorize": true,
  "IsAuthorized": true,
  "UserDetails": {
    "AvatarUrl": "string",
    "Login": "string",
    "Name": "string",
    "PrimaryEmail": "string",
    "RefreshTokenValidTo": "2020-01-01T00:00:00.000Z",
    "TokenValidTo": "2020-01-01T00:00:00.000Z"
  }
}
```
</div>

## Authorize the current user with the Octopus GitHub app

:span[POST]{.api-post} `/api/github/user/app/authorize`

**Request Body**

- **`RedirectUri`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

<div data-example="Request">

```json
{
  "RedirectUri": "string"
}
```
</div>

**Response**

`200` — GitHub URL to authorize the GitHub app

- **`AuthorizeUri`** :span[string]{.type-label}  
  Minimum length 1.

<div data-example="Response">

```json
{
  "AuthorizeUri": "string"
}
```
</div>

## Exchange a GitHub App authorization code for an access token and store in the instance

:span[POST]{.api-post} `/api/github/user/app/exchange-access-code`

**Request Body**

- **`Code`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

<div data-example="Request">

```json
{
  "Code": "string"
}
```
</div>

**Response**

`200` — Reports the success of exchanging a GitHub App authorization code for an access token

- **`ErrorMessage`** :span[string]{.type-label}
- **`Status`** :span[string]{.type-label}  
  Minimum length 1.

<div data-example="Response">

```json
{
  "ErrorMessage": "string",
  "Status": "string"
}
```
</div>

## Exchange a GitHub App authorization code for an access token and store in the instance

:span[GET]{.api-get} `/api/github/user/app/token`

**Query Parameters**

- **`code`** :span[string]{.type-label} *(required)*
- **`redirectUri`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## Deauthorize the GitHub app for the current user, removing this users GitHub tokens from Octopus

:span[DELETE]{.api-delete} `/api/github/user/app/token`

**Response**

`200` — Deauthorized GitHub app user

<div data-example="Response">

```json
{}
```
</div>

## Refresh the GitHub current app user. Refreshing the users token and cached GitHub account details

:span[POST]{.api-post} `/api/github/user/app/token/refresh`

**Response**

`200` — GitHub App user has been successfully refreshed

<div data-example="Response">

```json
{}
```
</div>

## Test connectivity to GitHub using the provided credentials

:span[POST]{.api-post} `/api/githubissuetracker/connectivitycheck`

**Request Body**

- **`BaseUrl`** :span[string]{.type-label} *(required)*  
  The GitHub base URL to test connectivity to. Minimum length 1.
- **`Password`** :span[string]{.type-label}  
  The GitHub personal access token or password for authentication. If not provided, will be retrieved from configuration.
- **`UserName`** :span[string]{.type-label}  
  The GitHub username for authentication.

<div data-example="Request">

```json
{
  "BaseUrl": "string",
  "Password": "string",
  "UserName": "string"
}
```
</div>

**Response**

`200` — Result of testing connectivity to GitHub

- **`Messages`** :span[array of object]{.type-label}  
  Messages from the connectivity check.
  - **`Category`** :span[enum]{.type-label}  
    Allowed values: `Info`, `Warning`, `Error`.
  - **`Message`** :span[string]{.type-label}  
    Minimum length 1.

<div data-example="Response">

```json
{
  "Messages": [
    {
      "Category": "Info",
      "Message": "string"
    }
  ]
}
```
</div>
