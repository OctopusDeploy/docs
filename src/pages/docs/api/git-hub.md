---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Git Hub
---

## Get the installation URL for the GitHub App

`GET` `/api/github/accounts/install-url`

**Parameters**

- **`redirectUri`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Get the settings for the GitHub App

`GET` `/api/github/app/settings`

**Response**

`200` — Success

`GetGitHubAppSettingsResponse`.

- **`CanUseGitHubApp`** <span class="type-label">boolean</span>
- **`CanUseTrustedFlow`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "CanUseGitHubApp": true,
  "CanUseTrustedFlow": true
}
```
</div>

## Get the status of the registration between Octopus Server and the GitHub App

`GET` `/api/github/app/status`

**Response**

`200` — Response containing the status of the registration between Octopus Server and the GitHub App

`GetGitHubAppStatusResponse`.

- **`Status`** <span class="type-label">string</span> — The status of the GitHub App registration. Valid values are: Connected, RegistrationInvalid, Error. Minimum length 1.

<div data-example="Response">

```json
{
  "Status": "string"
}
```
</div>

## Get GitHub App connections for the space

`GET` `/api/{spaceId}/github/connections`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — All GitHub App connections for the space

`GetGitHubAppConnectionsResponse`.

- **`Connections`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Installation`** <span class="type-label">object</span>
  - **`Status`** <span class="type-label">enum</span> — Allowed values: `ConnectionNotFound`, `InstallationNotFound`, `InstallationSuspended`, `Connected`, `Error`.
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

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

`POST` `/api/{spaceId}/github/connections`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateGitHubAppConnectionCommand`

- **`InstallationId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*

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

`GET` `/api/{spaceId}/github/connections/{connectionId}/repositories`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{connectionId}/repositories`.

**Parameters**

- **`connectionId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — GitHub repositories available for the current connection

`GetGitHubRepositoriesForConnectionResponse`.

- **`Repositories`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span>
  - **`GitUrl`** <span class="type-label">string</span>
  - **`IsAdmin`** <span class="type-label">boolean</span>
  - **`IsPrivate`** <span class="type-label">boolean</span>
  - **`Language`** <span class="type-label">string</span>
  - **`RepositoryId`** <span class="type-label">string</span>
  - **`RepositoryName`** <span class="type-label">string</span>
  - **`Visibility`** <span class="type-label">string</span>

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

`GET` `/api/{spaceId}/github/connections/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — A GitHub app connection

`GetGitHubAppConnectionByIdResponse`.

- **`Id`** <span class="type-label">string</span>
- **`Installation`** <span class="type-label">object</span>
  - **`AccountAvatarUrl`** <span class="type-label">string</span>
  - **`AccountId`** <span class="type-label">string</span>
  - **`AccountLogin`** <span class="type-label">string</span>
  - **`AccountType`** <span class="type-label">string</span>
  - **`AllRepositories`** <span class="type-label">boolean</span> — true if the installation has access to all repositories in the account, false if it has access to only selected repositories.
  - **`InstallationId`** <span class="type-label">string</span>
- **`Repositories`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span>
  - **`GitUrl`** <span class="type-label">string</span>
  - **`IsAdmin`** <span class="type-label">boolean</span>
  - **`IsPrivate`** <span class="type-label">boolean</span>
  - **`Language`** <span class="type-label">string</span>
  - **`RepositoryId`** <span class="type-label">string</span>
  - **`RepositoryName`** <span class="type-label">string</span>
  - **`Visibility`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Status`** <span class="type-label">string</span> — Minimum length 1.
- **`StatusUserMessage`** <span class="type-label">string</span>
- **`UnknownRepositories`** <span class="type-label">array of object</span> — Repositories IDs that are configured on the connection but do not have a matching repository returned from GitHub.
  - **`RepositoryId`** <span class="type-label">string</span>
  - **`RepositoryName`** <span class="type-label">string</span>

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

`PUT` `/api/{spaceId}/github/connections/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyGitHubAppConnectionCommand`

- **`Id`** <span class="type-label">string</span> *(required)*
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*

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

`ModifyGitHubAppConnectionResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Used to indicate that a GitHub App Connection should be deleted

`DELETE` `/api/{spaceId}/github/connections/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the GitHub connection to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Used to indicate that a GitHub App Connection has been deleted

`DeleteGitHubAppConnectionByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Recover GitHub App connection after the registration has changed

`POST` `/api/{spaceId}/github/connections/{id}/recover`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}/recover`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`RecoverGitHubAppConnectionCommand`

- **`Id`** <span class="type-label">string</span> *(required)*
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*

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

`RecoverGitHubAppConnectionResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Recover GitHub App connection after the installation was not found

`POST` `/api/{spaceId}/github/connections/{id}/recover-not-found`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}/recover-not-found`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`RecoverNotFoundGitHubAppConnectionCommand`

- **`Id`** <span class="type-label">string</span> *(required)*
- **`InstallationId`** <span class="type-label">string</span> *(required)*
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*

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

`RecoverNotFoundGitHubAppConnectionResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Refresh the GitHub App connection token

`POST` `/api/{spaceId}/github/connections/{id}/refresh`

Also reachable at `/api/spaces/{spaceIdentifier}/github/connections/{id}/refresh`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — GitHub app connection has been refreshed

`RefreshGitHubAppConnectionByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get a list of GitHub organisations accessible to the current GitHub OAuth user. Request will fail if the user does not have a valid GitHub OAuth token

`GET` `/api/{spaceId}/github/installations`

Also reachable at `/api/spaces/{spaceIdentifier}/github/installations`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`excludeConnected`** <span class="type-label">boolean</span>

**Response**

`200` — List of GitHub organisations accessible to the current GitHub OAuth user

`GetGitHubAppInstallationsForUserResponse`.

- **`Installations`** <span class="type-label">array of object</span>
  - **`AccountAvatarUrl`** <span class="type-label">string</span>
  - **`AccountId`** <span class="type-label">string</span>
  - **`AccountLogin`** <span class="type-label">string</span>
  - **`AccountType`** <span class="type-label">string</span>
  - **`AllRepositories`** <span class="type-label">boolean</span> — true if the installation has access to all repositories in the account, false if it has access to only selected repositories.
  - **`InstallationId`** <span class="type-label">string</span>

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

## Response from GitHub after an application has been installed or updated

`GET` `/api/github/installations/updated`

**Parameters**

- **`installation_id`** <span class="type-label">string</span>
- **`redirectUri`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Get the GitHub repositories for an installation visible to the current user https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#list-repositories-accessible-to-the-user-access-token

`GET` `/api/github/installations/{installationId}/repositories`

**Parameters**

- **`installationId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`GitHubRepositoryResponsePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span>
  - **`GitUrl`** <span class="type-label">string</span>
  - **`IsAdmin`** <span class="type-label">boolean</span>
  - **`IsPrivate`** <span class="type-label">boolean</span>
  - **`Language`** <span class="type-label">string</span>
  - **`RepositoryId`** <span class="type-label">string</span>
  - **`RepositoryName`** <span class="type-label">string</span>
  - **`Visibility`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

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

`POST` `/api/github/reset-registration`

**Response**

`200` — GitHub app registration was successfully deleted

`ResetGitHubAppRegistrationResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Search for GitHub repositories for an account visible to the current user https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories

`GET` `/api/github/search/{accountName}/repositories`

**Parameters**

- **`accountName`** <span class="type-label">string</span> *(required)*

- **`keyword`** <span class="type-label">string</span>
- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`GitHubRepositoryResponsePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`DefaultBranch`** <span class="type-label">string</span>
  - **`GitUrl`** <span class="type-label">string</span>
  - **`IsAdmin`** <span class="type-label">boolean</span>
  - **`IsPrivate`** <span class="type-label">boolean</span>
  - **`Language`** <span class="type-label">string</span>
  - **`RepositoryId`** <span class="type-label">string</span>
  - **`RepositoryName`** <span class="type-label">string</span>
  - **`Visibility`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

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

`GET` `/api/github/user/app/authorization_status`

**Parameters**

- **`includeUserDetails`** <span class="type-label">boolean</span>

**Response**

`200` — Get the status of the user's current authorization.

`GetGitHubUserAuthorizationStatusResponse`.

- **`CanAuthorize`** <span class="type-label">boolean</span>
- **`IsAuthorized`** <span class="type-label">boolean</span>
- **`UserDetails`** <span class="type-label">object</span>
  - **`AvatarUrl`** <span class="type-label">string</span>
  - **`Login`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`PrimaryEmail`** <span class="type-label">string</span>
  - **`RefreshTokenValidTo`** <span class="type-label">string</span> — Format `date-time`.
  - **`TokenValidTo`** <span class="type-label">string</span> — Format `date-time`.

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

`POST` `/api/github/user/app/authorize`

**Request Body**

`AuthorizeGitHubAppCommand`

- **`RedirectUri`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "RedirectUri": "string"
}
```
</div>

**Response**

`200` — GitHub URL to authorize the GitHub app

`AuthorizeGitHubAppResponse`.

- **`AuthorizeUri`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "AuthorizeUri": "string"
}
```
</div>

## Exchange a GitHub App authorization code for an access token and store in the instance

`POST` `/api/github/user/app/exchange-access-code`

**Request Body**

`ExchangeAccessCodeForTokenCommand`

- **`Code`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "Code": "string"
}
```
</div>

**Response**

`200` — Reports the success of exchanging a GitHub App authorization code for an access token

`ExchangeAccessCodeForTokenResponse`.

- **`ErrorMessage`** <span class="type-label">string</span>
- **`Status`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "ErrorMessage": "string",
  "Status": "string"
}
```
</div>

## Exchange a GitHub App authorization code for an access token and store in the instance

`GET` `/api/github/user/app/token`

**Parameters**

- **`code`** <span class="type-label">string</span> *(required)*
- **`redirectUri`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Deauthorize the GitHub app for the current user, removing this users GitHub tokens from Octopus

`DELETE` `/api/github/user/app/token`

**Response**

`200` — Deauthorized GitHub app user

`DeauthorizeGitHubAppResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Refresh the GitHub current app user. Refreshing the users token and cached GitHub account details

`POST` `/api/github/user/app/token/refresh`

**Response**

`200` — GitHub App user has been successfully refreshed

`RefreshGitHubAppUserResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Test connectivity to GitHub using the provided credentials

`POST` `/api/githubissuetracker/connectivitycheck`

**Request Body**

`GitHubConnectivityCheckRequest`

- **`BaseUrl`** <span class="type-label">string</span> *(required)* — The GitHub base URL to test connectivity to. Minimum length 1.
- **`Password`** <span class="type-label">string</span> — The GitHub personal access token or password for authentication. If not provided, will be retrieved from configuration.
- **`UserName`** <span class="type-label">string</span> — The GitHub username for authentication.

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

`GitHubConnectivityCheckResponse`.

- **`Messages`** <span class="type-label">array of object</span> — Messages from the connectivity check.
  - **`Category`** <span class="type-label">enum</span> — Allowed values: `Info`, `Warning`, `Error`.
  - **`Message`** <span class="type-label">string</span> — Minimum length 1.

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
