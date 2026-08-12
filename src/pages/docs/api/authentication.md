---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Authentication
---

## Get authentication providers

`GET` `/api/authentication`

Provides the details of the enabled authentication providers.

**Response**

`200` — The requested Authentication Information

`AuthenticationResource`.

- **`AnyAuthenticationProvidersSupportPasswordManagement`** <span class="type-label">boolean</span>
- **`ApiKeyDefaultExpiryDays`** <span class="type-label">integer</span>
- **`ApiKeyMaxExpiryDays`** <span class="type-label">integer</span>
- **`AuthenticationProviders`** <span class="type-label">array of object</span>
  - **`CSSLinks`** <span class="type-label">array of string</span>
  - **`DisplayName`** <span class="type-label">string</span>
  - **`FormsLoginEnabled`** <span class="type-label">boolean</span>
  - **`IdentityType`** <span class="type-label">enum</span> — Allowed values: `Guest`, `UsernamePassword`, `ActiveDirectory`, `OAuth`.
  - **`JavascriptLinks`** <span class="type-label">array of string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
- **`AutoLoginEnabled`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OctopusIdDynamicRegistrationPending`** <span class="type-label">boolean</span>
- **`RememberMeEnabled`** <span class="type-label">boolean</span>
- **`UserApiKeysEnabled`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Given a URL query string, determines whether an external server (.e.g Okta) has initiated login and if so the provider's name

`POST` `/api/authentication/checklogininitiated`

**Request Body**

`CheckLoginInitiatedCommand`

- **`EncodedQueryString`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "EncodedQueryString": "string"
}
```
</div>

**Response**

`200` — Whether the external server has initiated login and if so the provider's name

`LoginInitiatedResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProviderName`** <span class="type-label">string</span>
- **`WasLoginInitiated`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>
