---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Users
---

## Get a list of Users

`GET` `/api/users`

Lists all of the Users in the current Octopus Deploy instance, from all Teams. The results will be sorted alphabetically by username.

**Parameters**

- **`filter`** <span class="type-label">string</span> — Filters the Users by Username/DisplayName/EmailAddress/IdentificationToken using the specified `filter` fragment.
- **`isActive`** <span class="type-label">boolean</span> — A filter to return only active (true) or disabled (false) users. Omit to return both.
- **`isServiceAccount`** <span class="type-label">boolean</span> — A filter to return only service account users.
- **`serviceAccountType`** <span class="type-label">enum</span> — A filter to return only service accounts of the specified type. Allowed values: `Standard`, `Agent`.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Users that meet the filter conditions

`UserResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
  - **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`Identities`** <span class="type-label">array of object</span>
  - **`IsActive`** <span class="type-label">boolean</span>
  - **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
  - **`IsService`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Password`** <span class="type-label">string</span>
  - **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
  - **`Username`** <span class="type-label">string</span> — Maximum length 64.
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
      "CanPasswordBeEdited": true,
      "Created": "2020-01-01T00:00:00.000Z",
      "DisplayName": "string",
      "EmailAddress": "user@example.com",
      "Id": "string",
      "Identities": [
        {}
      ],
      "IsActive": true,
      "IsRequestor": true,
      "IsService": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Password": "string",
      "ServiceAccountType": "Standard",
      "Username": "string"
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

## Creates a new user

`POST` `/api/users`

**Request Body**

`CreateUserCommand`

- **`DisplayName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`EmailAddress`** <span class="type-label">string</span>
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsService`** <span class="type-label">boolean</span>
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "DisplayName": "string",
  "EmailAddress": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsService": true,
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

**Response**

`201` — Created

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## Get a list of Users

`GET` `/api/users/all`

Lists all the Users in the System. The results will be sorted alphabetically by `Username`.

**Response**

`200` — A list of all the users

an array of `UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
[
  {
    "CanPasswordBeEdited": true,
    "Created": "2020-01-01T00:00:00.000Z",
    "DisplayName": "string",
    "EmailAddress": "user@example.com",
    "Id": "string",
    "Identities": [
      {
        "Claims": {},
        "IdentityProviderName": "string"
      }
    ],
    "IsActive": true,
    "IsRequestor": true,
    "IsService": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Password": "string",
    "ServiceAccountType": "Standard",
    "Username": "string"
  }
]
```
</div>

## Provides the details of the enabled authentication providers and whether the current user can edit logins for the given user

`GET` `/api/users/authentication/{userId}`

Also reachable at `/api/users/authentication`.

**Parameters**

- **`userId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The currently enabled authentication providers

`GetUserAuthenticationProvidersResponse`.

- **`AuthenticationProviders`** <span class="type-label">array of object</span>
  - **`CSSLinks`** <span class="type-label">array of string</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`FormsLoginEnabled`** <span class="type-label">boolean</span>
  - **`IdentityType`** <span class="type-label">enum</span> — Allowed values: `Guest`, `UsernamePassword`, `ActiveDirectory`, `OAuth`.
  - **`JavascriptLinks`** <span class="type-label">array of string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
- **`CanCurrentUserEditIdentitiesForUser`** <span class="type-label">boolean</span>
- **`Links`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "AuthenticationProviders": [
    {
      "CSSLinks": [
        "string"
      ],
      "DisplayName": "string",
      "FormsLoginEnabled": true,
      "IdentityType": "Guest",
      "JavascriptLinks": [
        "string"
      ],
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "CanCurrentUserEditIdentitiesForUser": true,
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

## Searches for users, using the authentication providers

`GET` `/api/users/external-search`

**Parameters**

- **`partialName`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The results of the external user provider search

`SearchExternalAuthenticationProvidersResponse`.

- **`Links`** <span class="type-label">object</span>
- **`Results`** <span class="type-label">array of object</span>
  - **`Identities`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Results": [
    {
      "Identities": [
        {}
      ]
    }
  ]
}
```
</div>

## Gets the metadata to describe the claims/fields used by authentication providers that support identities

`GET` `/api/users/identity-metadata`

**Response**

`200` — The user identity metadata

`GetUserIdentityMetadataResponse`.

- **`Links`** <span class="type-label">object</span>
- **`Providers`** <span class="type-label">array of object</span>
  - **`ClaimDescriptors`** <span class="type-label">array of object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`ScimEnabled`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Providers": [
    {
      "ClaimDescriptors": [
        {}
      ],
      "IdentityProviderName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ScimEnabled": true
    }
  ]
}
```
</div>

## A command resource used for logging in

`POST` `/api/users/login`

**Request Body**

`LoginUserCommand`

- **`Password`** <span class="type-label">string</span> *(required)* — The password to log in with. Minimum length 1.
- **`RememberMe`** <span class="type-label">boolean</span> — Whether the cookie should be persistent.
- **`RemoteIpAddress`** <span class="type-label">string</span> — IP Address of the user.
- **`State`** <span class="type-label">object</span>
  - **`RedirectAfterLoginTo`** <span class="type-label">string</span> — The Url, relative to the portal site, to redirect to post successful login.
  - **`UsingSecureConnection`** <span class="type-label">boolean</span> — Whether the client says it's using a secure connection. We need this because SSL offloading can obscure this and the server cannot tell whether the client initiated the call using a secure connection.
- **`Username`** <span class="type-label">string</span> *(required)* — The username to log in with. Minimum length 1.

<div data-example="Request">

```json
{
  "Password": "string",
  "RememberMe": true,
  "RemoteIpAddress": "string",
  "State": {
    "RedirectAfterLoginTo": "string",
    "UsingSecureConnection": true
  },
  "Username": "string"
}
```
</div>

**Response**

`200` — The details of a successful login

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## POST /api/users/logout

`POST` `/api/users/logout`

Logs out the current user.

**Response**

`200` — Success

## Gets information about the current user

`GET` `/api/users/me`

**Response**

`200` — The current user's details

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## Registers a new user and responds with an authentication cookie. Unless the first administrator user is being registered, an invitation code must be provided

`POST` `/api/users/register`

**Request Body**

`RegisterUserCommand`

- **`DisplayName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`EmailAddress`** <span class="type-label">string</span>
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`InvitationCode`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Password`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "DisplayName": "string",
  "EmailAddress": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "InvitationCode": "string",
  "Password": "string",
  "Username": "string"
}
```
</div>

**Response**

`201` — Created

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## Get a User by ID

`GET` `/api/users/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the User to load.

**Response**

`200` — The user details

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## Modifies an existing user

`PUT` `/api/users/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyUserCommand`

- **`DisplayName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`EmailAddress`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span> *(required)*
- **`Password`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "DisplayName": "string",
  "EmailAddress": "string",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "Password": "string",
  "Username": "string"
}
```
</div>

**Response**

`200` — The updated user

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## Deletes an existing User

`DELETE` `/api/users/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the user to delete.

**Response**

`200` — Success

## Revokes all sessions for a user

`PUT` `/api/users/{userId}/revoke-sessions`

**Parameters**

- **`userId`** <span class="type-label">string</span> *(required)* — ID of the User to revoke.

**Response**

`200` — Empty response, indicating the sessions have been revoked

`RevokeUserSessionsResponse`.

<div data-example="Response">

```json
{}
```
</div>
