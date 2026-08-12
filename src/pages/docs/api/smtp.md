---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Smtp
---

## Gets information about the SMTP (email) settings in use by the Octopus Server

`GET` `/api/smtpconfiguration`

**Response**

`200` — The requested SMTP configuration

`SmtpConfigurationResource`.

- **`Details`** <span class="type-label">object</span>
  - **`CredentialType`** <span class="type-label">string</span>
- **`EnableSsl`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SendEmailFrom`** <span class="type-label">string</span>
- **`SmtpHost`** <span class="type-label">string</span>
- **`SmtpPort`** <span class="type-label">number</span> — Minimum `0`. Maximum `65535`.
- **`Timeout`** <span class="type-label">integer</span>

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

## Updates the SMTP settings used by the Octopus Server

`PUT` `/api/smtpconfiguration`

**Request Body**

`ModifySmtpConfigurationCommand`

- **`Details`** <span class="type-label">object</span>
  - **`CredentialType`** <span class="type-label">string</span>
- **`EnableSsl`** <span class="type-label">boolean</span>
- **`SendEmailFrom`** <span class="type-label">string</span>
- **`SmtpHost`** <span class="type-label">string</span>
- **`SmtpPort`** <span class="type-label">integer</span> — Minimum `0`. Maximum `65535`.
- **`Timeout`** <span class="type-label">integer</span>

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

`SmtpConfigurationResource`.

- **`Details`** <span class="type-label">object</span>
  - **`CredentialType`** <span class="type-label">string</span>
- **`EnableSsl`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SendEmailFrom`** <span class="type-label">string</span>
- **`SmtpHost`** <span class="type-label">string</span>
- **`SmtpPort`** <span class="type-label">number</span> — Minimum `0`. Maximum `65535`.
- **`Timeout`** <span class="type-label">integer</span>

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

## A low privilege check to determine if SMTP is configured

`GET` `/api/smtpconfiguration/isconfigured`

**Response**

`200` — The requested information about whether SMTP is configured

`SmtpIsConfiguredResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsConfigured`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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

## A low privilege check to determine if SMTP is configured

`GET` `/api/smtpconfiguration/isconfigured/v1`

**Response**

`200` — The requested information about whether SMTP is configured

`GetSmtpIsConfiguredResponse`.

- **`SmtpIsConfigured`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsConfigured`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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

## Gets information about the SMTP (email) settings in use by the Octopus Server

`GET` `/api/smtpconfiguration/v1`

**Response**

`200` — The requested SMTP configuration

`GetSmtpConfigurationResponse`.

- **`SmtpConfiguration`** <span class="type-label">object</span>
  - **`Details`** <span class="type-label">object</span>
  - **`EnableSsl`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`SendEmailFrom`** <span class="type-label">string</span>
  - **`SmtpHost`** <span class="type-label">string</span>
  - **`SmtpPort`** <span class="type-label">number</span> — Minimum `0`. Maximum `65535`.
  - **`Timeout`** <span class="type-label">integer</span>

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
