---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Smtp
---

## Get information about the SMTP (email) settings in use by the Octopus Server

:span[GET]{.api-get} `/api/smtpconfiguration`

**Response**

`200` — The requested SMTP configuration

- **`Details`** :span[object]{.type-label}
  - **`CredentialType`** :span[string]{.type-label}
- **`EnableSsl`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SendEmailFrom`** :span[string]{.type-label}
- **`SmtpHost`** :span[string]{.type-label}
- **`SmtpPort`** :span[number]{.type-label}  
  Minimum `0`. Maximum `65535`.
- **`Timeout`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "Details": {
    "CredentialType": "string"
  },
  "EnableSsl": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SendEmailFrom": "string",
  "SmtpHost": "string",
  "SmtpPort": 0,
  "Timeout": 0
}
```
</div>

## Update the SMTP settings used by the Octopus Server

:span[PUT]{.api-put} `/api/smtpconfiguration`

**Request Body**

- **`Details`** :span[object]{.type-label}
  - **`CredentialType`** :span[string]{.type-label}
- **`EnableSsl`** :span[boolean]{.type-label}
- **`SendEmailFrom`** :span[string]{.type-label}
- **`SmtpHost`** :span[string]{.type-label}
- **`SmtpPort`** :span[integer]{.type-label}  
  Minimum `0`. Maximum `65535`.
- **`Timeout`** :span[integer]{.type-label}

<div data-example="Request">

```json
{
  "Details": {
    "CredentialType": "string"
  },
  "EnableSsl": true,
  "SendEmailFrom": "string",
  "SmtpHost": "string",
  "SmtpPort": 0,
  "Timeout": 0
}
```
</div>

**Response**

`200` — Confirmation that SMTP Configuration was modified, containing the new configuration

- **`Details`** :span[object]{.type-label}
  - **`CredentialType`** :span[string]{.type-label}
- **`EnableSsl`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SendEmailFrom`** :span[string]{.type-label}
- **`SmtpHost`** :span[string]{.type-label}
- **`SmtpPort`** :span[number]{.type-label}  
  Minimum `0`. Maximum `65535`.
- **`Timeout`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "Details": {
    "CredentialType": "string"
  },
  "EnableSsl": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SendEmailFrom": "string",
  "SmtpHost": "string",
  "SmtpPort": 0,
  "Timeout": 0
}
```
</div>

## Check whether SMTP is configured with low privileges

:span[GET]{.api-get} `/api/smtpconfiguration/isconfigured`

**Response**

`200` — The requested information about whether SMTP is configured

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsConfigured`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "Id": "string",
  "IsConfigured": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

## Check whether SMTP is configured with low privileges

:span[GET]{.api-get} `/api/smtpconfiguration/isconfigured/v1`

**Response**

`200` — The requested information about whether SMTP is configured

- **`SmtpIsConfigured`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsConfigured`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "SmtpIsConfigured": {
    "Id": "string",
    "IsConfigured": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  }
}
```
</div>

## Get information about the SMTP (email) settings in use by the Octopus Server

:span[GET]{.api-get} `/api/smtpconfiguration/v1`

**Response**

`200` — The requested SMTP configuration

- **`SmtpConfiguration`** :span[object]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`EnableSsl`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`SendEmailFrom`** :span[string]{.type-label}
  - **`SmtpHost`** :span[string]{.type-label}
  - **`SmtpPort`** :span[number]{.type-label}  
    Minimum `0`. Maximum `65535`.
  - **`Timeout`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "SmtpConfiguration": {
    "Details": {
      "CredentialType": "string"
    },
    "EnableSsl": true,
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "SendEmailFrom": "string",
    "SmtpHost": "string",
    "SmtpPort": 0,
    "Timeout": 0
  }
}
```
</div>
