---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Lets Encrypt
---

## Requests the current Let's Encrypt configuration

`GET` `/api/letsencryptconfiguration`

**Response**

`200` — The current Let's Encrypt configuration for this Octopus Server

`LetsEncryptConfigurationResource`.

- **`AcceptLetsEncryptTermsOfService`** <span class="type-label">boolean</span>
- **`CertificateExpiryDate`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateThumbprint`** <span class="type-label">string</span>
- **`DnsName`** <span class="type-label">string</span>
- **`Enabled`** <span class="type-label">boolean</span>
- **`HttpsPort`** <span class="type-label">integer</span>
- **`IPAddress`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Path`** <span class="type-label">string</span>
- **`RegistrationEmailAddress`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AcceptLetsEncryptTermsOfService": true,
  "CertificateExpiryDate": "2020-01-01T00:00:00.000Z",
  "CertificateThumbprint": "string",
  "DnsName": "string",
  "Enabled": true,
  "HttpsPort": 0,
  "IPAddress": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Path": "string",
  "RegistrationEmailAddress": "string"
}
```
</div>

## Allows you to disable the Let's Encrypt configuration for this Octopus Server

`PUT` `/api/letsencryptconfiguration`

**Request Body**

`ModifyLetsEncryptConfigurationCommand`

- **`Enabled`** <span class="type-label">boolean</span> *(required)*

<div data-example="Request">

```json
{
  "Enabled": true
}
```
</div>

**Response**

`200` — The updated configuration

`LetsEncryptConfigurationResource`.

- **`AcceptLetsEncryptTermsOfService`** <span class="type-label">boolean</span>
- **`CertificateExpiryDate`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateThumbprint`** <span class="type-label">string</span>
- **`DnsName`** <span class="type-label">string</span>
- **`Enabled`** <span class="type-label">boolean</span>
- **`HttpsPort`** <span class="type-label">integer</span>
- **`IPAddress`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Path`** <span class="type-label">string</span>
- **`RegistrationEmailAddress`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AcceptLetsEncryptTermsOfService": true,
  "CertificateExpiryDate": "2020-01-01T00:00:00.000Z",
  "CertificateThumbprint": "string",
  "DnsName": "string",
  "Enabled": true,
  "HttpsPort": 0,
  "IPAddress": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Path": "string",
  "RegistrationEmailAddress": "string"
}
```
</div>
