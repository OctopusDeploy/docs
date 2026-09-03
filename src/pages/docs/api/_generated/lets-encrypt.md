---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Lets Encrypt
---

To configure the Let's Encrypt integration, see https://octopus.com/docs/security/exposing-octopus/lets-encrypt-integration

## Request the current Let's Encrypt configuration

:endpoint{method="GET" path="/api/letsencryptconfiguration"}

**Response**

`200` — The current Let's Encrypt configuration for this Octopus Server

- **`AcceptLetsEncryptTermsOfService`** :span[boolean]{.type-label}
- **`CertificateExpiryDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateThumbprint`** :span[string]{.type-label}
- **`DnsName`** :span[string]{.type-label}
- **`Enabled`** :span[boolean]{.type-label}
- **`HttpsPort`** :span[integer]{.type-label}
- **`IPAddress`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Path`** :span[string]{.type-label}
- **`RegistrationEmailAddress`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AcceptLetsEncryptTermsOfService": false,
  "CertificateExpiryDate": "2020-01-01T00:00:00.000Z",
  "CertificateThumbprint": "string",
  "DnsName": "string",
  "Enabled": false,
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
:::

## Disable Let's Encrypt

:endpoint{method="PUT" path="/api/letsencryptconfiguration"}

To re-enable Let's Encrypt you must go through the configuration process again. If the integration is enabled, set `Enabled: false` to disable it. If you set `Enabled: true` when it is already enabled, or `Enabled: false` when it is already disabled, no changes occur. If you set `Enabled: true` when the integration is disabled, an error is returned.

**Request Body**

- **`Enabled`** :span[boolean]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Enabled": false
}
```
:::

**Response**

`200` — The updated configuration

- **`AcceptLetsEncryptTermsOfService`** :span[boolean]{.type-label}
- **`CertificateExpiryDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateThumbprint`** :span[string]{.type-label}
- **`DnsName`** :span[string]{.type-label}
- **`Enabled`** :span[boolean]{.type-label}
- **`HttpsPort`** :span[integer]{.type-label}
- **`IPAddress`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Path`** :span[string]{.type-label}
- **`RegistrationEmailAddress`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AcceptLetsEncryptTermsOfService": false,
  "CertificateExpiryDate": "2020-01-01T00:00:00.000Z",
  "CertificateThumbprint": "string",
  "DnsName": "string",
  "Enabled": false,
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
:::
