---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Users
---

## Get a list of Users

:endpoint{method="GET" path="/api/users"}

Lists all of the Users in the current Octopus Deploy instance, from all Teams. The results will be sorted alphabetically by username.

**Query Parameters**

- **`filter`** :span[string]{.type-label}  
  Filters the Users by Username/DisplayName/EmailAddress/IdentificationToken using the specified `filter` fragment.
- **`isActive`** :span[boolean]{.type-label}  
  A filter to return only active (true) or disabled (false) users. Omit to return both.
- **`isServiceAccount`** :span[boolean]{.type-label}  
  A filter to return only service account users.
- **`serviceAccountType`** :span[enum]{.type-label}  
  A filter to return only service accounts of the specified type.  
  Allowed values: `Standard`, `Agent`.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Users that meet the filter conditions

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanPasswordBeEdited`** :span[boolean]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DisplayName`** :span[string]{.type-label}  
    Maximum length 64.
  - **`EmailAddress`** :span[string]{.type-label}  
    Format `email`. Maximum length 256.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`Identities`** :span[array of object]{.type-label}
  - **`IsActive`** :span[boolean]{.type-label}
  - **`IsRequestor`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether this user resource represents the user who requested it.
  - **`IsService`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Password`** :span[string]{.type-label}
  - **`ServiceAccountType`** :span[enum]{.type-label}  
    Allowed values: `Standard`, `Agent`.
  - **`Username`** :span[string]{.type-label}  
    Maximum length 64.
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
:::

## Create a new user

:endpoint{method="POST" path="/api/users"}

**Request Body**

- **`DisplayName`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`EmailAddress`** :span[string]{.type-label}
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsService`** :span[boolean]{.type-label}
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Get a list of Users

:endpoint{method="GET" path="/api/users/all"}

Lists all the Users in the System. The results will be sorted alphabetically by `Username`.

**Response**

`200` — A list of all the users

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Provide the details of the enabled authentication providers and whether the current user can edit logins for the given user

:endpoint{method="GET" path="/api/users/authentication/\{userId\}"}

Also reachable at `/api/users/authentication`.

**Path Parameters**

- **`userId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The currently enabled authentication providers

- **`AuthenticationProviders`** :span[array of object]{.type-label}
  - **`CSSLinks`** :span[array of string]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`FormsLoginEnabled`** :span[boolean]{.type-label}
  - **`IdentityType`** :span[enum]{.type-label}  
    Allowed values: `Guest`, `UsernamePassword`, `ActiveDirectory`, `OAuth`.
  - **`JavascriptLinks`** :span[array of string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`CanCurrentUserEditIdentitiesForUser`** :span[boolean]{.type-label}
- **`Links`** :span[object]{.type-label}

:::api-example{label="Response"}
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
:::

## Search for users, using the authentication providers

:endpoint{method="GET" path="/api/users/external-search"}

**Query Parameters**

- **`partialName`** :span[string]{.type-label} *(required)*

**Response**

`200` — The results of the external user provider search

- **`Links`** :span[object]{.type-label}
- **`Results`** :span[array of object]{.type-label}
  - **`Identities`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get the metadata to describe the claims/fields used by authentication providers that support identities

:endpoint{method="GET" path="/api/users/identity-metadata"}

**Response**

`200` — The user identity metadata

- **`Links`** :span[object]{.type-label}
- **`Providers`** :span[array of object]{.type-label}
  - **`ClaimDescriptors`** :span[array of object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`ScimEnabled`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Log in

:endpoint{method="POST" path="/api/users/login"}

**Request Body**

- **`Password`** :span[string]{.type-label} *(required)*  
  The password to log in with. Minimum length 1.
- **`RememberMe`** :span[boolean]{.type-label}  
  Whether the cookie should be persistent.
- **`RemoteIpAddress`** :span[string]{.type-label}  
  IP Address of the user.
- **`State`** :span[object]{.type-label}
  - **`RedirectAfterLoginTo`** :span[string]{.type-label}  
    The Url, relative to the portal site, to redirect to post successful login.
  - **`UsingSecureConnection`** :span[boolean]{.type-label}  
    Whether the client says it's using a secure connection. We need this because SSL offloading can obscure this and the server cannot tell whether the client initiated the call using a secure connection.
- **`Username`** :span[string]{.type-label} *(required)*  
  The username to log in with. Minimum length 1.

:::api-example{label="Request"}
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
:::

**Response**

`200` — The details of a successful login

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## POST /api/users/logout

:endpoint{method="POST" path="/api/users/logout"}

Logs out the current user.

**Response**

`200` — Success

## Get information about the current user

:endpoint{method="GET" path="/api/users/me"}

**Response**

`200` — The current user's details

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Register a new user and responds with an authentication cookie. Unless the first administrator user is being registered, an invitation code must be provided

:endpoint{method="POST" path="/api/users/register"}

**Request Body**

- **`DisplayName`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`EmailAddress`** :span[string]{.type-label}
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`InvitationCode`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Password`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Username`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Get a User by ID

:endpoint{method="GET" path="/api/users/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the User to load.

**Response**

`200` — The user details

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Modify an existing user

:endpoint{method="PUT" path="/api/users/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`DisplayName`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`EmailAddress`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label} *(required)*
- **`Password`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
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
:::

**Response**

`200` — The updated user

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Delete an existing User

:endpoint{method="DELETE" path="/api/users/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the user to delete.

**Response**

`200` — Success

## Revoke all sessions for a user

:endpoint{method="PUT" path="/api/users/\{userId\}/revoke-sessions"}

**Path Parameters**

- **`userId`** :span[string]{.type-label} *(required)*  
  ID of the User to revoke.

**Response**

`200` — Empty response, indicating the sessions have been revoked

:::api-example{label="Response"}
```json
{}
```
:::
