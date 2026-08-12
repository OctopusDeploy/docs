---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Platform Hub
---

## Gets Platform Hub accounts

`GET` `/api/platformhub/accounts`

**Parameters**

- **`accountType`** <span class="type-label">array of string</span> — The type of accounts to return.
- **`name`** <span class="type-label">string</span> — Filter by partial name match.
- **`skip`** <span class="type-label">integer</span> — Number of records to skip.
- **`take`** <span class="type-label">integer</span> — Number of records to take.

**Response**

`200` — Success

`PlatformHubAccountResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
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
      "Description": "string",
      "Details": {
        "AccountType": "string"
      },
      "Id": "string",
      "Name": "string",
      "Slug": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a new Platform Hub account

`POST` `/api/platformhub/accounts`

**Request Body**

`CreatePlatformHubAccountCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`AccountType`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "AccountType": "string"
  },
  "Name": "string",
  "Slug": "string"
}
```
</div>

**Response**

`201` — Created

`CreatePlatformHubAccountResponse`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Gets a specific Platform Hub account

`GET` `/api/platformhub/accounts/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the account to get.

**Response**

`200` — An Account within the Platform Hub

`PlatformHubAccountResource`.

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span>
  - **`AccountType`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Description": "string",
  "Details": {
    "AccountType": "string"
  },
  "Id": "string",
  "Name": "string",
  "Slug": "string"
}
```
</div>

## Modify an existing Platform Hub account

`PUT` `/api/platformhub/accounts/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyPlatformHubAccountCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`AccountType`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "AccountType": "string"
  },
  "Id": "string",
  "Name": "string",
  "Slug": "string"
}
```
</div>

**Response**

`200` — Indicates that the Platform Hub account was successfully modified.

`ModifyPlatformHubAccountResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Delete an existing Platform Hub account

`DELETE` `/api/platformhub/accounts/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the account to delete.

**Response**

`200` — Confirmation that the Platform Hub account has been deleted

`DeletePlatformHubAccountResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets Platform Hub certificates

`GET` `/api/platformhub/certificates`

**Parameters**

- **`archived`** <span class="type-label">boolean</span> — If true, returns only archived certificates. Otherwise, returns only non-archived certificates.
- **`firstResult`** <span class="type-label">string</span> — Certificate ID which if specified, adds the certificate with matching ID to the result if it is not already included.
- **`ids`** <span class="type-label">string</span> — Comma delimited list of certificate IDs used to filter the result.
- **`orderBy`** <span class="type-label">string</span> — If the value is 'recent' (case-insensitive), the result is sorted by Created instead of NotAfter.
- **`partialName`** <span class="type-label">string</span> — Alternative parameter to Search; filters certificates by Name, Subject, or Thumbprint.
- **`search`** <span class="type-label">string</span> — Filters certificates by Name, Subject, or Thumbprint.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 15. Minimum `0`.

**Response**

`200` — The requested Platform Hub certificates.

`PlatformHubCertificateResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Archived`** <span class="type-label">string</span> — Format `date-time`.
  - **`CertificateChain`** <span class="type-label">array of object</span>
  - **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
  - **`HasPrivateKey`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsExpired`** <span class="type-label">boolean</span>
  - **`IssuerCommonName`** <span class="type-label">string</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`IssuerOrganization`** <span class="type-label">string</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`Notes`** <span class="type-label">string</span>
  - **`Password`** <span class="type-label">sensitive value</span>
  - **`ReplacedBy`** <span class="type-label">string</span>
  - **`SelfSigned`** <span class="type-label">boolean</span>
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
  - **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
  - **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
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
      "Archived": "2020-01-01T00:00:00.000Z",
      "CertificateChain": [
        {}
      ],
      "CertificateData": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "CertificateDataFormat": "Pkcs12",
      "HasPrivateKey": true,
      "Id": "string",
      "IsExpired": true,
      "IssuerCommonName": "string",
      "IssuerDistinguishedName": "string",
      "IssuerOrganization": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "Notes": "string",
      "Password": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "ReplacedBy": "string",
      "SelfSigned": true,
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "Slug": "string",
      "SubjectAlternativeNames": [
        "string"
      ],
      "SubjectCommonName": "string",
      "SubjectDistinguishedName": "string",
      "SubjectOrganization": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Creates a new Platform Hub certificate

`POST` `/api/platformhub/certificates`

**Request Body**

`CreatePlatformHubCertificateCommand`

- **`CertificateData`** <span class="type-label">sensitive value</span> *(required)*
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Notes`** <span class="type-label">string</span> — Maximum length 10240.
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Name": "string",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Slug": "string"
}
```
</div>

**Response**

`201` — Created

`PlatformHubCertificateResource`.

- **`Archived`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateChain`** <span class="type-label">array of object</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
- **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsExpired`** <span class="type-label">boolean</span>
- **`IssuerCommonName`** <span class="type-label">string</span>
- **`IssuerDistinguishedName`** <span class="type-label">string</span>
- **`IssuerOrganization`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
- **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
- **`Notes`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`ReplacedBy`** <span class="type-label">string</span>
- **`SelfSigned`** <span class="type-label">boolean</span>
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Archived": "2020-01-01T00:00:00.000Z",
  "CertificateChain": [
    {
      "IssuerDistinguishedName": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SubjectDistinguishedName": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "HasPrivateKey": true,
  "Id": "string",
  "IsExpired": true,
  "IssuerCommonName": "string",
  "IssuerDistinguishedName": "string",
  "IssuerOrganization": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "NotAfter": "2020-01-01T00:00:00.000Z",
  "NotBefore": "2020-01-01T00:00:00.000Z",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": true,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "Slug": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Creates a self-signed Platform Hub certificate

`POST` `/api/platformhub/certificates/generate`

**Request Body**

`CreateSelfSignedPlatformHubCertificateCommand`

- **`Archived`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateChain`** <span class="type-label">array of object</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
- **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsExpired`** <span class="type-label">boolean</span>
- **`IssuerCommonName`** <span class="type-label">string</span>
- **`IssuerDistinguishedName`** <span class="type-label">string</span>
- **`IssuerOrganization`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
- **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
- **`Notes`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`ReplacedBy`** <span class="type-label">string</span>
- **`SelfSigned`** <span class="type-label">boolean</span>
- **`SelfSignedCertificateCurve`** <span class="type-label">string</span>
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Request">

```json
{
  "Archived": "2020-01-01T00:00:00.000Z",
  "CertificateChain": [
    {
      "IssuerDistinguishedName": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SubjectDistinguishedName": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "HasPrivateKey": true,
  "Id": "string",
  "IsExpired": true,
  "IssuerCommonName": "string",
  "IssuerDistinguishedName": "string",
  "IssuerOrganization": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "NotAfter": "2020-01-01T00:00:00.000Z",
  "NotBefore": "2020-01-01T00:00:00.000Z",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": true,
  "SelfSignedCertificateCurve": "string",
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "Slug": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

**Response**

`200` — The created self-signed Platform Hub certificate.

`PlatformHubCertificateResource`.

- **`Archived`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateChain`** <span class="type-label">array of object</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
- **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsExpired`** <span class="type-label">boolean</span>
- **`IssuerCommonName`** <span class="type-label">string</span>
- **`IssuerDistinguishedName`** <span class="type-label">string</span>
- **`IssuerOrganization`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
- **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
- **`Notes`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`ReplacedBy`** <span class="type-label">string</span>
- **`SelfSigned`** <span class="type-label">boolean</span>
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Archived": "2020-01-01T00:00:00.000Z",
  "CertificateChain": [
    {
      "IssuerDistinguishedName": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SubjectDistinguishedName": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "HasPrivateKey": true,
  "Id": "string",
  "IsExpired": true,
  "IssuerCommonName": "string",
  "IssuerDistinguishedName": "string",
  "IssuerOrganization": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "NotAfter": "2020-01-01T00:00:00.000Z",
  "NotBefore": "2020-01-01T00:00:00.000Z",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": true,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "Slug": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Gets a Platform Hub certificate by ID or Thumbprint

`GET` `/api/platformhub/certificates/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Platform Hub certificate.

`PlatformHubCertificateResource`.

- **`Archived`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateChain`** <span class="type-label">array of object</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
- **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsExpired`** <span class="type-label">boolean</span>
- **`IssuerCommonName`** <span class="type-label">string</span>
- **`IssuerDistinguishedName`** <span class="type-label">string</span>
- **`IssuerOrganization`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
- **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
- **`Notes`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`ReplacedBy`** <span class="type-label">string</span>
- **`SelfSigned`** <span class="type-label">boolean</span>
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Archived": "2020-01-01T00:00:00.000Z",
  "CertificateChain": [
    {
      "IssuerDistinguishedName": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SubjectDistinguishedName": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "HasPrivateKey": true,
  "Id": "string",
  "IsExpired": true,
  "IssuerCommonName": "string",
  "IssuerDistinguishedName": "string",
  "IssuerOrganization": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "NotAfter": "2020-01-01T00:00:00.000Z",
  "NotBefore": "2020-01-01T00:00:00.000Z",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": true,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "Slug": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Modifies an existing Platform Hub certificate

`PUT` `/api/platformhub/certificates/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyPlatformHubCertificateCommand`

- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Notes`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Id": "string",
  "Name": "string",
  "Notes": "string",
  "Slug": "string"
}
```
</div>

**Response**

`200` — The modified Platform Hub certificate.

`PlatformHubCertificateResource`.

- **`Archived`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateChain`** <span class="type-label">array of object</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
- **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsExpired`** <span class="type-label">boolean</span>
- **`IssuerCommonName`** <span class="type-label">string</span>
- **`IssuerDistinguishedName`** <span class="type-label">string</span>
- **`IssuerOrganization`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
- **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
- **`Notes`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`ReplacedBy`** <span class="type-label">string</span>
- **`SelfSigned`** <span class="type-label">boolean</span>
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Archived": "2020-01-01T00:00:00.000Z",
  "CertificateChain": [
    {
      "IssuerDistinguishedName": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SubjectDistinguishedName": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "HasPrivateKey": true,
  "Id": "string",
  "IsExpired": true,
  "IssuerCommonName": "string",
  "IssuerDistinguishedName": "string",
  "IssuerOrganization": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "NotAfter": "2020-01-01T00:00:00.000Z",
  "NotBefore": "2020-01-01T00:00:00.000Z",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": true,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "Slug": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Deletes an existing archived Platform Hub certificate

`DELETE` `/api/platformhub/certificates/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Confirmation that the Platform Hub certificate has been deleted.

`DeletePlatformHubCertificateResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Archives an existing Platform Hub certificate

`POST` `/api/platformhub/certificates/{id}/archive`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Confirmation that the Platform Hub certificate has been archived.

`ArchivePlatformHubCertificateResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Exports the Platform Hub certificate

`GET` `/api/platformhub/certificates/{id}/export`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

- **`format`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`includePrivateKey`** <span class="type-label">boolean</span>
- **`password`** <span class="type-label">string</span>
- **`pemOptions`** <span class="type-label">enum</span> — Allowed values: `PrimaryOnly`, `PrimaryAndChain`, `ChainOnly`.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Replaces an existing Platform Hub certificate with another

`POST` `/api/platformhub/certificates/{id}/replace`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ReplacePlatformHubCertificateCommand`

- **`CertificateData`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Password`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "CertificateData": "string",
  "Id": "string",
  "Password": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Platform Hub certificate has been replaced.

`PlatformHubCertificateResource`.

- **`Archived`** <span class="type-label">string</span> — Format `date-time`.
- **`CertificateChain`** <span class="type-label">array of object</span>
  - **`IssuerDistinguishedName`** <span class="type-label">string</span>
  - **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
  - **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
  - **`SerialNumber`** <span class="type-label">string</span>
  - **`SignatureAlgorithmName`** <span class="type-label">string</span>
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
- **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsExpired`** <span class="type-label">boolean</span>
- **`IssuerCommonName`** <span class="type-label">string</span>
- **`IssuerDistinguishedName`** <span class="type-label">string</span>
- **`IssuerOrganization`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`NotAfter`** <span class="type-label">string</span> — Format `date-time`.
- **`NotBefore`** <span class="type-label">string</span> — Format `date-time`.
- **`Notes`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`ReplacedBy`** <span class="type-label">string</span>
- **`SelfSigned`** <span class="type-label">boolean</span>
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — The slug of the certificate.
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Archived": "2020-01-01T00:00:00.000Z",
  "CertificateChain": [
    {
      "IssuerDistinguishedName": "string",
      "NotAfter": "2020-01-01T00:00:00.000Z",
      "NotBefore": "2020-01-01T00:00:00.000Z",
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SubjectDistinguishedName": "string",
      "Thumbprint": "string",
      "Version": 0
    }
  ],
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "HasPrivateKey": true,
  "Id": "string",
  "IsExpired": true,
  "IssuerCommonName": "string",
  "IssuerDistinguishedName": "string",
  "IssuerOrganization": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "NotAfter": "2020-01-01T00:00:00.000Z",
  "NotBefore": "2020-01-01T00:00:00.000Z",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": true,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "Slug": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Unarchives an existing archived Platform Hub certificate

`POST` `/api/platformhub/certificates/{id}/unarchive`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Confirmation that the Platform Hub certificate has been unarchived.

`UnarchivePlatformHubCertificateResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets usages for a Platform Hub certificate

`GET` `/api/platformhub/certificates/{id}/usages`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The published template versions that use a Platform Hub certificate.

`PlatformHubCertificateUsageResource`.

- **`DefaultBranchProcessTemplateUsageCount`** <span class="type-label">integer</span>
- **`DefaultBranchProcessTemplateUsages`** <span class="type-label">array of object</span>
  - **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`UsageSource`** <span class="type-label">string</span> — Minimum length 1.
- **`DefaultBranchProjectTemplateUsageCount`** <span class="type-label">integer</span>
- **`DefaultBranchProjectTemplateUsages`** <span class="type-label">array of object</span>
  - **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`UsageSource`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProcessTemplateVersionUsageCount`** <span class="type-label">integer</span>
- **`ProcessTemplateVersionUsages`** <span class="type-label">array of object</span>
  - **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`Version`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectTemplateVersionUsageCount`** <span class="type-label">integer</span>
- **`ProjectTemplateVersionUsages`** <span class="type-label">array of object</span>
  - **`GitRef`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PublishedDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`Version`** <span class="type-label">string</span> — Minimum length 1.
- **`TotalUsageCount`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "DefaultBranchProcessTemplateUsageCount": 0,
  "DefaultBranchProcessTemplateUsages": [
    {
      "GitRef": "string",
      "Id": "string",
      "Name": "string",
      "Slug": "string",
      "UsageSource": "string"
    }
  ],
  "DefaultBranchProjectTemplateUsageCount": 0,
  "DefaultBranchProjectTemplateUsages": [
    {
      "GitRef": "string",
      "Id": "string",
      "Name": "string",
      "Slug": "string",
      "UsageSource": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProcessTemplateVersionUsageCount": 0,
  "ProcessTemplateVersionUsages": [
    {
      "GitRef": "string",
      "Id": "string",
      "Name": "string",
      "PublishedDate": "2020-01-01T00:00:00.000Z",
      "Slug": "string",
      "Version": "string"
    }
  ],
  "ProjectTemplateVersionUsageCount": 0,
  "ProjectTemplateVersionUsages": [
    {
      "GitRef": "string",
      "Id": "string",
      "Name": "string",
      "PublishedDate": "2020-01-01T00:00:00.000Z",
      "Slug": "string",
      "Version": "string"
    }
  ],
  "TotalUsageCount": 0
}
```
</div>

## Get a list of Platform Hub Feeds

`GET` `/api/platformhub/feeds`

**Parameters**

- **`feedType`** <span class="type-label">array of string</span> — The feed types to be matched, provided as a comma separated list of strings.
- **`ids`** <span class="type-label">array of string</span> — The feed ids to be matched, provided as a comma separated list of strings.
- **`name`** <span class="type-label">string</span> — The exact name of a feed to be matched.
- **`partialName`** <span class="type-label">string</span> — The partial name of feeds to be matched.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Platform Hub Feeds

`PlatformHubFeedResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
  - **`Id`** <span class="type-label">string</span>
  - **`LastModifiedBy`** <span class="type-label">string</span>
  - **`LastModifiedOn`** <span class="type-label">string</span> — Format `date-time`.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
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
      "FeedType": "None",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Name": "string",
      "PackageAcquisitionLocationOptions": [
        "Server"
      ],
      "Slug": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Creates a new Platform Hub Feed

`POST` `/api/platformhub/feeds`

**Request Body**

`CreatePlatformHubFeedCommand`

- **`FeedType`** <span class="type-label">enum</span> *(required)* — The type of the feed. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — The feed's package acquisition location options. Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — The slug of the feed.

<div data-example="Request">

```json
{
  "FeedType": "None",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string"
}
```
</div>

**Response**

`201` — Created

`PlatformHubFeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span>
- **`LastModifiedOn`** <span class="type-label">string</span> — Format `date-time`.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "FeedType": "None",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string"
}
```
</div>

## Get a Platform Hub Feed by its id

`GET` `/api/platformhub/feeds/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Platform Hub Feed to get.

**Response**

`200` — A Feed within the Platform Hub

`PlatformHubFeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span>
- **`LastModifiedOn`** <span class="type-label">string</span> — Format `date-time`.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "FeedType": "None",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string"
}
```
</div>

## Modify a Platform Hub Feed

`PUT` `/api/platformhub/feeds/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed.

**Request Body**

`ModifyPlatformHubFeedCommand`

- **`FeedType`** <span class="type-label">enum</span> *(required)* — The type of the feed. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span> *(required)* — The id of the feed.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — The feed's package acquisition location options. Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — The slug of the feed.

<div data-example="Request">

```json
{
  "FeedType": "None",
  "Id": "string",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string"
}
```
</div>

**Response**

`200` — The response returned from the request to modify a platform hub feed.

`PlatformHubFeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span>
- **`LastModifiedOn`** <span class="type-label">string</span> — Format `date-time`.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "FeedType": "None",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string"
}
```
</div>

## Delete an existing Platform Hub Feed

`DELETE` `/api/platformhub/feeds/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Platform Hub Feed to delete.

**Response**

`200` — Confirmation that the Platform Hub feed has been deleted

`DeletePlatformHubFeedResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Searches the specified platform hub feed for packages based on the provided search term

`GET` `/api/platformhub/feeds/{id}/packages/search`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed resource.

- **`packageType`** <span class="type-label">string</span> — The package type to filter results by. Used by feeds that can contain multiple package types. Valid values are ContainerImage and HelmChart.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 20. Minimum `0`.
- **`term`** <span class="type-label">string</span> — The term to search for.

**Response**

`200` — Returns a paginated collection of searched package descriptions in platform hub

`PlatformHubPackageDescriptionResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`LatestVersion`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
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
      "Description": "string",
      "Id": "string",
      "LatestVersion": "string",
      "Name": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Lists available package versions for the specified platform hub feed and package

`GET` `/api/platformhub/feeds/{id}/packages/versions`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed resource.

- **`filter`** <span class="type-label">string</span> — Version number text to filter by.
- **`includePreRelease`** <span class="type-label">boolean</span> — Flag to include pre-release versions, defaults to true.
- **`includeReleaseNotes`** <span class="type-label">boolean</span> — Flag to include release notes, defaults to false.
- **`packageId`** <span class="type-label">string</span> *(required)* — The id of the package.
- **`preReleaseTag`** <span class="type-label">string</span> — The semver tag regex pattern to filter by.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 20. Minimum `0`.
- **`versionRange`** <span class="type-label">string</span> — The range of versions to filter by.

**Response**

`200` — Contains a paginated collection of package versions returned from a search

`PlatformHubPackageVersionResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`PackageId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Published`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`SizeBytes`** <span class="type-label">integer</span>
  - **`Title`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span> — Minimum length 1.
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
      "FeedId": "string",
      "Id": "string",
      "PackageId": "string",
      "Published": "2020-01-01T00:00:00.000Z",
      "ReleaseNotes": "string",
      "SizeBytes": 0,
      "Title": "string",
      "Version": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Gets Platform Hub Git credentials

`GET` `/api/platformhub/git-credentials`

**Parameters**

- **`name`** <span class="type-label">string</span> — Filter by partial name match.
- **`skip`** <span class="type-label">integer</span> — Number of records to skip.
- **`take`** <span class="type-label">integer</span> — Number of records to take.

**Response**

`200` — Success

`PlatformHubGitCredentialResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`RepositoryRestrictions`** <span class="type-label">object</span>
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
      "Description": "string",
      "Details": {
        "Type": "UsernamePassword"
      },
      "Id": "string",
      "Name": "string",
      "RepositoryRestrictions": {
        "AllowedRepositories": [
          "string"
        ],
        "Enabled": true
      }
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a new Platform Hub Git credential

`POST` `/api/platformhub/git-credentials`

**Request Body**

`CreatePlatformHubGitCredentialCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Password`** <span class="type-label">sensitive value</span> *(required)*
  - **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Username": "string"
  },
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  }
}
```
</div>

**Response**

`201` — Created

`CreatePlatformHubGitCredentialResponse`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Gets Platform Hub Git credentials (V2)

`GET` `/api/platformhub/git-credentials/v2`

**Parameters**

- **`name`** <span class="type-label">string</span> — Filter by partial name match.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`PlatformHubGitCredentialResourceV2PaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`RepositoryRestrictions`** <span class="type-label">object</span>
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
      "Description": "string",
      "Details": {
        "Type": "UsernamePassword"
      },
      "Id": "string",
      "Name": "string",
      "RepositoryRestrictions": {
        "AllowedRepositories": [
          "string"
        ],
        "Enabled": true
      }
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a new Platform Hub Git credential

`POST` `/api/platformhub/git-credentials/v2`

**Request Body**

`CreatePlatformHubGitCredentialCommandV2`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Type`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "Type": "string"
  },
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  }
}
```
</div>

**Response**

`201` — Created

`CreatePlatformHubGitCredentialResponseV2`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Gets a specific Platform Hub Git credential

`GET` `/api/platformhub/git-credentials/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get.

**Response**

`200` — The requested Platform Hub Git Credential

`PlatformHubGitCredentialResource`.

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `UsernamePassword`, `Anonymous`, `Library`, `GitHub`, `NotSpecified`, `SshKey`.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "Details": {
    "Type": "UsernamePassword"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  }
}
```
</div>

## Modify an existing Platform Hub Git credential

`PUT` `/api/platformhub/git-credentials/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyPlatformHubGitCredentialCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Password`** <span class="type-label">sensitive value</span> *(required)*
  - **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Username": "string"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  }
}
```
</div>

**Response**

`200` — Indicates that the Platform Hub Git Credential was successfully modified.

`ModifyPlatformHubGitCredentialResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Delete an existing Platform Hub Git credential

`DELETE` `/api/platformhub/git-credentials/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to delete.

**Response**

`200` — Confirmation that the Platform Hub Git Credential has been deleted

`DeletePlatformHubGitCredentialResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets a specific Platform Hub Git credential (V2)

`GET` `/api/platformhub/git-credentials/{id}/v2`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get.

**Response**

`200` — A Platform Hub Git credential (V2)

`PlatformHubGitCredentialResourceV2`.

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `UsernamePassword`, `Anonymous`, `Library`, `GitHub`, `NotSpecified`, `SshKey`.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "Details": {
    "Type": "UsernamePassword"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  }
}
```
</div>

## Modify an existing Platform Hub Git credential

`PUT` `/api/platformhub/git-credentials/{id}/v2`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyPlatformHubGitCredentialCommandV2`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Type`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "Type": "string"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  }
}
```
</div>

**Response**

`200` — Indicates that the Platform Hub Git Credential was successfully modified.

`ModifyPlatformHubGitCredentialResponseV2`.

<div data-example="Response">

```json
{}
```
</div>

## Requests the list of Branches for the Platform Hub

`GET` `/api/platformhub/git/branches`

**Parameters**

- **`searchByName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`GitBranchResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanonicalName`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsProtected`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
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
      "CanonicalName": "string",
      "Id": "string",
      "IsProtected": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a branch given the base git ref, and the new branch's name

`POST` `/api/platformhub/git/branches`

**Request Body**

`CreatePlatformHubBranchCommand`

- **`BaseGitRef`** <span class="type-label">string</span> *(required)*
- **`NewBranchName`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "BaseGitRef": "string",
  "NewBranchName": "string"
}
```
</div>

**Response**

`201` — Created

`GitBranchResource`.

- **`CanonicalName`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsProtected`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "CanonicalName": "string",
  "Id": "string",
  "IsProtected": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string"
}
```
</div>

## Requests a list of Git Tags for the Platform Hub

`GET` `/api/platformhub/git/tags`

**Parameters**

- **`searchByName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`GitTagResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanonicalName`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
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
      "CanonicalName": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Get GitHub App connections for the Platform Hub

`GET` `/api/platformhub/github/connections`

Gets a set of GitHub App connections for the Platform Hub.

**Parameters**

- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — All GitHub App connections for Platform Hub

`GetPlatformHubGitHubAppConnectionsResponse`.

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

## Create a new GitHub App connection in Platform Hub

`POST` `/api/platformhub/github/connections`

**Request Body**

`CreatePlatformHubGitHubAppConnectionCommand`

- **`InstallationId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*

<div data-example="Request">

```json
{
  "InstallationId": "string",
  "RepositoryIds": [
    "string"
  ]
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

## Get a single PlatformHub GitHub app connection by id

`GET` `/api/platformhub/github/connections/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — A PlatformHub GitHub app connection

`GetPlatformHubGitHubAppConnectionByIdResponse`.

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

## Update a Platform Hub GitHub App connection with a new set of repositories

`PUT` `/api/platformhub/github/connections/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyPlatformHubGitHubAppConnectionCommand`

- **`Id`** <span class="type-label">string</span> *(required)*
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*

<div data-example="Request">

```json
{
  "Id": "string",
  "RepositoryIds": [
    "string"
  ]
}
```
</div>

**Response**

`200` — Platform Hub GitHub app connection modified result

`ModifyPlatformHubGitHubAppConnectionResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Deletes a PlatformHub GitHub App connection by id

`DELETE` `/api/platformhub/github/connections/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the GitHub connection to delete.

**Response**

`200` — Confirmation that the PlatformHub GitHub App connection has been deleted

`DeletePlatformHubGitHubAppConnectionByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Recover a platfrom hub GitHub App connection after the registration has changed

`POST` `/api/platformhub/github/connections/{id}/recover`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`RecoverPlatformHubGitHubAppConnectionCommand`

- **`Id`** <span class="type-label">string</span> *(required)*
- **`RepositoryIds`** <span class="type-label">array of string</span> *(required)*

<div data-example="Request">

```json
{
  "Id": "string",
  "RepositoryIds": [
    "string"
  ]
}
```
</div>

**Response**

`200` — Platform Hub GitHub app connection recovery result

`RecoverPlatformHubGitHubAppConnectionResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Refresh the Platform Hub GitHub App connection token

`POST` `/api/platformhub/github/connections/{id}/refresh`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Platform Hub GitHub app connection has been refreshed

`RefreshPlatformHubGitHubAppConnectionByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get a list of GitHub organisations accessible to the current GitHub OAuth user. Request will fail if the user does not have a valid GitHub OAuth token

`GET` `/api/platformhub/github/installations`

**Parameters**

- **`excludeConnected`** <span class="type-label">boolean</span>

**Response**

`200` — List of GitHub organisations accessible to the current GitHub OAuth user

`GetPlatformHubGitHubAppInstallationsForUserResponse`.

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

## Get platform hub version control settings configuration

`GET` `/api/platformhub/versioncontrol`

**Response**

`200` — The version control settings for the Platform Hub

`PlatformHubVersionControlSettingsResource`.

- **`BasePath`** <span class="type-label">string</span>
- **`Credentials`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** <span class="type-label">string</span>
- **`Url`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "BasePath": "string",
  "Credentials": {
    "Type": "Anonymous"
  },
  "DefaultBranch": "string",
  "Url": "string"
}
```
</div>

## Command to update the platform hub's existing version control settings configuration

`PUT` `/api/platformhub/versioncontrol`

**Request Body**

`ModifyPlatformHubVersionControlSettingsCommand`

- **`BasePath`** <span class="type-label">string</span> *(required)*
- **`Credentials`** <span class="type-label">object</span> *(required)*
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** <span class="type-label">string</span> *(required)*
- **`Url`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "BasePath": "string",
  "Credentials": {
    "Type": "Anonymous"
  },
  "DefaultBranch": "string",
  "Url": "string"
}
```
</div>

**Response**

`200` — The version control settings for the Platform Hub

`PlatformHubVersionControlSettingsResource`.

- **`BasePath`** <span class="type-label">string</span>
- **`Credentials`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** <span class="type-label">string</span>
- **`Url`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "BasePath": "string",
  "Credentials": {
    "Type": "Anonymous"
  },
  "DefaultBranch": "string",
  "Url": "string"
}
```
</div>

## Gets a paginated list of process templates from the specified Git reference (sorted by name)

`GET` `/api/platformhub/{gitRef}/processtemplates`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of process templates (sorted by name).

`GetProcessTemplatesResponse`.

- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`ProcessTemplates`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Parameters`** <span class="type-label">array of object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "ItemsPerPage": 0,
  "ProcessTemplates": [
    {
      "Description": "string",
      "GitRef": "string",
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "Name": "string",
      "Parameters": [
        {}
      ],
      "Slug": "string",
      "Steps": [
        {}
      ]
    }
  ],
  "TotalResults": 0
}
```
</div>
