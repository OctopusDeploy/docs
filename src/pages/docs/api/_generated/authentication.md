---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Authentication
---

## Get authentication providers

:endpoint{method="GET" path="/api/authentication"}

Provides the details of the enabled authentication providers.

**Response**

`200` — The requested Authentication Information

- **`AnyAuthenticationProvidersSupportPasswordManagement`** :span[boolean]{.type-label}
- **`ApiKeyDefaultExpiryDays`** :span[integer]{.type-label}
- **`ApiKeyMaxExpiryDays`** :span[integer]{.type-label}
- **`AuthenticationProviders`** :span[array of object]{.type-label}
  - **`CSSLinks`** :span[array of string]{.type-label}
  - **`DisplayName`** :span[string]{.type-label}
  - **`FormsLoginEnabled`** :span[boolean]{.type-label}
  - **`IdentityType`** :span[enum]{.type-label}  
    Allowed values: `Guest`, `UsernamePassword`, `ActiveDirectory`, `OAuth`.
  - **`JavascriptLinks`** :span[array of string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`AutoLoginEnabled`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OctopusIdDynamicRegistrationPending`** :span[boolean]{.type-label}
- **`RememberMeEnabled`** :span[boolean]{.type-label}
- **`UserApiKeysEnabled`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "AnyAuthenticationProvidersSupportPasswordManagement": true,
  "ApiKeyDefaultExpiryDays": 0,
  "ApiKeyMaxExpiryDays": 0,
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
  "AutoLoginEnabled": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OctopusIdDynamicRegistrationPending": true,
  "RememberMeEnabled": true,
  "UserApiKeysEnabled": true
}
```
:::

## Determine whether an external server (.e.g Okta) has initiated login from a URL query string and, if so, get the provider's name

:endpoint{method="POST" path="/api/authentication/checklogininitiated"}

**Request Body**

- **`EncodedQueryString`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "EncodedQueryString": "string"
}
```
:::

**Response**

`200` — Whether the external server has initiated login and if so the provider's name

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProviderName`** :span[string]{.type-label}
- **`WasLoginInitiated`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProviderName": "string",
  "WasLoginInitiated": true
}
```
:::
