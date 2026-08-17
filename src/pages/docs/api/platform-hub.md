---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Platform Hub
---

## Get Platform Hub accounts

:span[GET]{.api-get} `/api/platformhub/accounts`

**Query Parameters**

- **`accountType`** :span[array of string]{.type-label}  
  The type of accounts to return.
- **`name`** :span[string]{.type-label}  
  Filter by partial name match.
- **`skip`** :span[integer]{.type-label}  
  Number of records to skip.
- **`take`** :span[integer]{.type-label}  
  Number of records to take.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

:span[POST]{.api-post} `/api/platformhub/accounts`

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`AccountType`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}

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

- **`Id`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Get a specific Platform Hub account

:span[GET]{.api-get} `/api/platformhub/accounts/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the account to get.

**Response**

`200` — An Account within the Platform Hub

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label}
  - **`AccountType`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.

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

:span[PUT]{.api-put} `/api/platformhub/accounts/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`AccountType`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}

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

<div data-example="Response">

```json
{}
```
</div>

## Delete an existing Platform Hub account

:span[DELETE]{.api-delete} `/api/platformhub/accounts/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the account to delete.

**Response**

`200` — Confirmation that the Platform Hub account has been deleted

<div data-example="Response">

```json
{}
```
</div>

## Get Platform Hub certificates

:span[GET]{.api-get} `/api/platformhub/certificates`

**Query Parameters**

- **`archived`** :span[boolean]{.type-label}  
  If true, returns only archived certificates. Otherwise, returns only non-archived certificates.
- **`firstResult`** :span[string]{.type-label}  
  Certificate ID which if specified, adds the certificate with matching ID to the result if it is not already included.
- **`ids`** :span[string]{.type-label}  
  Comma delimited list of certificate IDs used to filter the result.
- **`orderBy`** :span[string]{.type-label}  
  If the value is 'recent' (case-insensitive), the result is sorted by Created instead of NotAfter.
- **`partialName`** :span[string]{.type-label}  
  Alternative parameter to Search; filters certificates by Name, Subject, or Thumbprint.
- **`search`** :span[string]{.type-label}  
  Filters certificates by Name, Subject, or Thumbprint.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 15. Minimum `0`.

**Response**

`200` — The requested Platform Hub certificates.

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Archived`** :span[string]{.type-label}  
    Format `date-time`.
  - **`CertificateChain`** :span[array of object]{.type-label}
  - **`CertificateData`** :span[sensitive value]{.type-label}
  - **`CertificateDataFormat`** :span[enum]{.type-label}  
    Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
  - **`HasPrivateKey`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsExpired`** :span[boolean]{.type-label}
  - **`IssuerCommonName`** :span[string]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`IssuerOrganization`** :span[string]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Notes`** :span[string]{.type-label}
  - **`Password`** :span[sensitive value]{.type-label}
  - **`ReplacedBy`** :span[string]{.type-label}
  - **`SelfSigned`** :span[boolean]{.type-label}
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}  
    The slug of the certificate.
  - **`SubjectAlternativeNames`** :span[array of string]{.type-label}
  - **`SubjectCommonName`** :span[string]{.type-label}  
    The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`SubjectOrganization`** :span[string]{.type-label}  
    The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

## Create a new Platform Hub certificate

:span[POST]{.api-post} `/api/platformhub/certificates`

**Request Body**

- **`CertificateData`** :span[sensitive value]{.type-label} *(required)*
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Maximum length 10240.
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}

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

- **`Archived`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateChain`** :span[array of object]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`CertificateData`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`CertificateDataFormat`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsExpired`** :span[boolean]{.type-label}
- **`IssuerCommonName`** :span[string]{.type-label}
- **`IssuerDistinguishedName`** :span[string]{.type-label}
- **`IssuerOrganization`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`NotAfter`** :span[string]{.type-label}  
  Format `date-time`.
- **`NotBefore`** :span[string]{.type-label}  
  Format `date-time`.
- **`Notes`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`ReplacedBy`** :span[string]{.type-label}
- **`SelfSigned`** :span[boolean]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug of the certificate.
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

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

## Create a self-signed Platform Hub certificate

:span[POST]{.api-post} `/api/platformhub/certificates/generate`

**Request Body**

- **`Archived`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateChain`** :span[array of object]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`CertificateData`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`CertificateDataFormat`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsExpired`** :span[boolean]{.type-label}
- **`IssuerCommonName`** :span[string]{.type-label}
- **`IssuerDistinguishedName`** :span[string]{.type-label}
- **`IssuerOrganization`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`NotAfter`** :span[string]{.type-label}  
  Format `date-time`.
- **`NotBefore`** :span[string]{.type-label}  
  Format `date-time`.
- **`Notes`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`ReplacedBy`** :span[string]{.type-label}
- **`SelfSigned`** :span[boolean]{.type-label}
- **`SelfSignedCertificateCurve`** :span[string]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug of the certificate.
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

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

- **`Archived`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateChain`** :span[array of object]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`CertificateData`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`CertificateDataFormat`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsExpired`** :span[boolean]{.type-label}
- **`IssuerCommonName`** :span[string]{.type-label}
- **`IssuerDistinguishedName`** :span[string]{.type-label}
- **`IssuerOrganization`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`NotAfter`** :span[string]{.type-label}  
  Format `date-time`.
- **`NotBefore`** :span[string]{.type-label}  
  Format `date-time`.
- **`Notes`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`ReplacedBy`** :span[string]{.type-label}
- **`SelfSigned`** :span[boolean]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug of the certificate.
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

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

## Get a Platform Hub certificate by ID or Thumbprint

:span[GET]{.api-get} `/api/platformhub/certificates/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Platform Hub certificate.

- **`Archived`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateChain`** :span[array of object]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`CertificateData`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`CertificateDataFormat`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsExpired`** :span[boolean]{.type-label}
- **`IssuerCommonName`** :span[string]{.type-label}
- **`IssuerDistinguishedName`** :span[string]{.type-label}
- **`IssuerOrganization`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`NotAfter`** :span[string]{.type-label}  
  Format `date-time`.
- **`NotBefore`** :span[string]{.type-label}  
  Format `date-time`.
- **`Notes`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`ReplacedBy`** :span[string]{.type-label}
- **`SelfSigned`** :span[boolean]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug of the certificate.
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

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

## Modify an existing Platform Hub certificate

:span[PUT]{.api-put} `/api/platformhub/certificates/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}

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

- **`Archived`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateChain`** :span[array of object]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`CertificateData`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`CertificateDataFormat`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsExpired`** :span[boolean]{.type-label}
- **`IssuerCommonName`** :span[string]{.type-label}
- **`IssuerDistinguishedName`** :span[string]{.type-label}
- **`IssuerOrganization`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`NotAfter`** :span[string]{.type-label}  
  Format `date-time`.
- **`NotBefore`** :span[string]{.type-label}  
  Format `date-time`.
- **`Notes`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`ReplacedBy`** :span[string]{.type-label}
- **`SelfSigned`** :span[boolean]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug of the certificate.
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

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

## Delete an existing archived Platform Hub certificate

:span[DELETE]{.api-delete} `/api/platformhub/certificates/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — Confirmation that the Platform Hub certificate has been deleted.

<div data-example="Response">

```json
{}
```
</div>

## Archive an existing Platform Hub certificate

:span[POST]{.api-post} `/api/platformhub/certificates/{id}/archive`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — Confirmation that the Platform Hub certificate has been archived.

<div data-example="Response">

```json
{}
```
</div>

## Export the Platform Hub certificate

:span[GET]{.api-get} `/api/platformhub/certificates/{id}/export`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`format`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`includePrivateKey`** :span[boolean]{.type-label}
- **`password`** :span[string]{.type-label}
- **`pemOptions`** :span[enum]{.type-label}  
  Allowed values: `PrimaryOnly`, `PrimaryAndChain`, `ChainOnly`.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Replace an existing Platform Hub certificate with another

:span[POST]{.api-post} `/api/platformhub/certificates/{id}/replace`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CertificateData`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Password`** :span[string]{.type-label}

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

- **`Archived`** :span[string]{.type-label}  
  Format `date-time`.
- **`CertificateChain`** :span[array of object]{.type-label}
  - **`IssuerDistinguishedName`** :span[string]{.type-label}
  - **`NotAfter`** :span[string]{.type-label}  
    Format `date-time`.
  - **`NotBefore`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SerialNumber`** :span[string]{.type-label}
  - **`SignatureAlgorithmName`** :span[string]{.type-label}
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`CertificateData`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`CertificateDataFormat`** :span[enum]{.type-label}  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`HasPrivateKey`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsExpired`** :span[boolean]{.type-label}
- **`IssuerCommonName`** :span[string]{.type-label}
- **`IssuerDistinguishedName`** :span[string]{.type-label}
- **`IssuerOrganization`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`NotAfter`** :span[string]{.type-label}  
  Format `date-time`.
- **`NotBefore`** :span[string]{.type-label}  
  Format `date-time`.
- **`Notes`** :span[string]{.type-label}
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`ReplacedBy`** :span[string]{.type-label}
- **`SelfSigned`** :span[boolean]{.type-label}
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug of the certificate.
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

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

## Unarchive an existing archived Platform Hub certificate

:span[POST]{.api-post} `/api/platformhub/certificates/{id}/unarchive`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — Confirmation that the Platform Hub certificate has been unarchived.

<div data-example="Response">

```json
{}
```
</div>

## Get usages for a Platform Hub certificate

:span[GET]{.api-get} `/api/platformhub/certificates/{id}/usages`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — The published template versions that use a Platform Hub certificate.

- **`DefaultBranchProcessTemplateUsageCount`** :span[integer]{.type-label}
- **`DefaultBranchProcessTemplateUsages`** :span[array of object]{.type-label}
  - **`GitRef`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`UsageSource`** :span[string]{.type-label}  
    Minimum length 1.
- **`DefaultBranchProjectTemplateUsageCount`** :span[integer]{.type-label}
- **`DefaultBranchProjectTemplateUsages`** :span[array of object]{.type-label}
  - **`GitRef`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`UsageSource`** :span[string]{.type-label}  
    Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProcessTemplateVersionUsageCount`** :span[integer]{.type-label}
- **`ProcessTemplateVersionUsages`** :span[array of object]{.type-label}
  - **`GitRef`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PublishedDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Version`** :span[string]{.type-label}  
    Minimum length 1.
- **`ProjectTemplateVersionUsageCount`** :span[integer]{.type-label}
- **`ProjectTemplateVersionUsages`** :span[array of object]{.type-label}
  - **`GitRef`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PublishedDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Version`** :span[string]{.type-label}  
    Minimum length 1.
- **`TotalUsageCount`** :span[integer]{.type-label}

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

:span[GET]{.api-get} `/api/platformhub/feeds`

**Query Parameters**

- **`feedType`** :span[array of string]{.type-label}  
  The feed types to be matched, provided as a comma separated list of strings.
- **`ids`** :span[array of string]{.type-label}  
  The feed ids to be matched, provided as a comma separated list of strings.
- **`name`** :span[string]{.type-label}  
  The exact name of a feed to be matched.
- **`partialName`** :span[string]{.type-label}  
  The partial name of feeds to be matched.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Platform Hub Feeds

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`FeedType`** :span[enum]{.type-label}  
    Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
  - **`Id`** :span[string]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
    Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

## Create a new Platform Hub Feed

:span[POST]{.api-post} `/api/platformhub/feeds`

**Request Body**

- **`FeedType`** :span[enum]{.type-label} *(required)*  
  The type of the feed.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  The feed's package acquisition location options.  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  The slug of the feed.

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

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}
- **`LastModifiedOn`** :span[string]{.type-label}  
  Format `date-time`.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.

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

:span[GET]{.api-get} `/api/platformhub/feeds/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Platform Hub Feed to get.

**Response**

`200` — A Feed within the Platform Hub

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}
- **`LastModifiedOn`** :span[string]{.type-label}  
  Format `date-time`.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.

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

:span[PUT]{.api-put} `/api/platformhub/feeds/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed.

**Request Body**

- **`FeedType`** :span[enum]{.type-label} *(required)*  
  The type of the feed.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label} *(required)*  
  The id of the feed.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  The feed's package acquisition location options.  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  The slug of the feed.

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

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}
- **`LastModifiedOn`** :span[string]{.type-label}  
  Format `date-time`.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.

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

:span[DELETE]{.api-delete} `/api/platformhub/feeds/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Platform Hub Feed to delete.

**Response**

`200` — Confirmation that the Platform Hub feed has been deleted

<div data-example="Response">

```json
{}
```
</div>

## Search the specified platform hub feed for packages based on the provided search term

:span[GET]{.api-get} `/api/platformhub/feeds/{id}/packages/search`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed resource.

**Query Parameters**

- **`packageType`** :span[string]{.type-label}  
  The package type to filter results by. Used by feeds that can contain multiple package types. Valid values are ContainerImage and HelmChart.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 20. Minimum `0`.
- **`term`** :span[string]{.type-label}  
  The term to search for.

**Response**

`200` — Returns a paginated collection of searched package descriptions in platform hub

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LatestVersion`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

## List available package versions for the specified platform hub feed and package

:span[GET]{.api-get} `/api/platformhub/feeds/{id}/packages/versions`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed resource.

**Query Parameters**

- **`filter`** :span[string]{.type-label}  
  Version number text to filter by.
- **`includePreRelease`** :span[boolean]{.type-label}  
  Flag to include pre-release versions, defaults to true.
- **`includeReleaseNotes`** :span[boolean]{.type-label}  
  Flag to include release notes, defaults to false.
- **`packageId`** :span[string]{.type-label} *(required)*  
  The id of the package.
- **`preReleaseTag`** :span[string]{.type-label}  
  The semver tag regex pattern to filter by.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 20. Minimum `0`.
- **`versionRange`** :span[string]{.type-label}  
  The range of versions to filter by.

**Response**

`200` — Contains a paginated collection of package versions returned from a search

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`PackageId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Published`** :span[string]{.type-label}  
    Format `date-time`.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`SizeBytes`** :span[integer]{.type-label}
  - **`Title`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    Minimum length 1.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

## Get Platform Hub Git credentials

:span[GET]{.api-get} `/api/platformhub/git-credentials`

**Query Parameters**

- **`name`** :span[string]{.type-label}  
  Filter by partial name match.
- **`skip`** :span[integer]{.type-label}  
  Number of records to skip.
- **`take`** :span[integer]{.type-label}  
  Number of records to take.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RepositoryRestrictions`** :span[object]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

:span[POST]{.api-post} `/api/platformhub/git-credentials`

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Password`** :span[sensitive value]{.type-label} *(required)*
  - **`Username`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}

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

- **`Id`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Get Platform Hub Git credentials (V2)

:span[GET]{.api-get} `/api/platformhub/git-credentials/v2`

**Query Parameters**

- **`name`** :span[string]{.type-label}  
  Filter by partial name match.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RepositoryRestrictions`** :span[object]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

:span[POST]{.api-post} `/api/platformhub/git-credentials/v2`

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Type`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}

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

- **`Id`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Get a specific Platform Hub Git credential

:span[GET]{.api-get} `/api/platformhub/git-credentials/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get.

**Response**

`200` — The requested Platform Hub Git Credential

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `UsernamePassword`, `Anonymous`, `Library`, `GitHub`, `NotSpecified`, `SshKey`.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}

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

:span[PUT]{.api-put} `/api/platformhub/git-credentials/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Password`** :span[sensitive value]{.type-label} *(required)*
  - **`Username`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}

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

<div data-example="Response">

```json
{}
```
</div>

## Delete an existing Platform Hub Git credential

:span[DELETE]{.api-delete} `/api/platformhub/git-credentials/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to delete.

**Response**

`200` — Confirmation that the Platform Hub Git Credential has been deleted

<div data-example="Response">

```json
{}
```
</div>

## Get a specific Platform Hub Git credential (V2)

:span[GET]{.api-get} `/api/platformhub/git-credentials/{id}/v2`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get.

**Response**

`200` — A Platform Hub Git credential (V2)

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `UsernamePassword`, `Anonymous`, `Library`, `GitHub`, `NotSpecified`, `SshKey`.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}

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

:span[PUT]{.api-put} `/api/platformhub/git-credentials/{id}/v2`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Type`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}

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

<div data-example="Response">

```json
{}
```
</div>

## Request the list of Branches for the Platform Hub

:span[GET]{.api-get} `/api/platformhub/git/branches`

**Query Parameters**

- **`searchByName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanonicalName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsProtected`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

:span[POST]{.api-post} `/api/platformhub/git/branches`

**Request Body**

- **`BaseGitRef`** :span[string]{.type-label} *(required)*
- **`NewBranchName`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

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

- **`CanonicalName`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsProtected`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.

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

## Request a list of Git Tags for the Platform Hub

:span[GET]{.api-get} `/api/platformhub/git/tags`

**Query Parameters**

- **`searchByName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanonicalName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

:span[GET]{.api-get} `/api/platformhub/github/connections`

Gets a set of GitHub App connections for the Platform Hub.

**Query Parameters**

- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — All GitHub App connections for Platform Hub

- **`Connections`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Installation`** :span[object]{.type-label}
  - **`Status`** :span[enum]{.type-label}  
    Allowed values: `ConnectionNotFound`, `InstallationNotFound`, `InstallationSuspended`, `Connected`, `Error`.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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

:span[POST]{.api-post} `/api/platformhub/github/connections`

**Request Body**

- **`InstallationId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*

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

:span[GET]{.api-get} `/api/platformhub/github/connections/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — A PlatformHub GitHub app connection

- **`Id`** :span[string]{.type-label}
- **`Installation`** :span[object]{.type-label}
  - **`AccountAvatarUrl`** :span[string]{.type-label}
  - **`AccountId`** :span[string]{.type-label}
  - **`AccountLogin`** :span[string]{.type-label}
  - **`AccountType`** :span[string]{.type-label}
  - **`AllRepositories`** :span[boolean]{.type-label}  
    true if the installation has access to all repositories in the account, false if it has access to only selected repositories.
  - **`InstallationId`** :span[string]{.type-label}
- **`Repositories`** :span[array of object]{.type-label}
  - **`DefaultBranch`** :span[string]{.type-label}
  - **`GitUrl`** :span[string]{.type-label}
  - **`IsAdmin`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`Language`** :span[string]{.type-label}
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}
  - **`Visibility`** :span[string]{.type-label}
- **`Status`** :span[string]{.type-label}  
  Minimum length 1.
- **`StatusUserMessage`** :span[string]{.type-label}
- **`UnknownRepositories`** :span[array of object]{.type-label}  
  Repositories IDs that are configured on the connection but do not have a matching repository returned from GitHub.
  - **`RepositoryId`** :span[string]{.type-label}
  - **`RepositoryName`** :span[string]{.type-label}

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

:span[PUT]{.api-put} `/api/platformhub/github/connections/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*

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

<div data-example="Response">

```json
{}
```
</div>

## Delete a PlatformHub GitHub App connection by id

:span[DELETE]{.api-delete} `/api/platformhub/github/connections/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the GitHub connection to delete.

**Response**

`200` — Confirmation that the PlatformHub GitHub App connection has been deleted

<div data-example="Response">

```json
{}
```
</div>

## Recover a platfrom hub GitHub App connection after the registration has changed

:span[POST]{.api-post} `/api/platformhub/github/connections/{id}/recover`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*
- **`RepositoryIds`** :span[array of string]{.type-label} *(required)*

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

<div data-example="Response">

```json
{}
```
</div>

## Refresh the Platform Hub GitHub App connection token

:span[POST]{.api-post} `/api/platformhub/github/connections/{id}/refresh`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — Platform Hub GitHub app connection has been refreshed

<div data-example="Response">

```json
{}
```
</div>

## Get a list of GitHub organisations accessible to the current GitHub OAuth user. Request will fail if the user does not have a valid GitHub OAuth token

:span[GET]{.api-get} `/api/platformhub/github/installations`

**Query Parameters**

- **`excludeConnected`** :span[boolean]{.type-label}

**Response**

`200` — List of GitHub organisations accessible to the current GitHub OAuth user

- **`Installations`** :span[array of object]{.type-label}
  - **`AccountAvatarUrl`** :span[string]{.type-label}
  - **`AccountId`** :span[string]{.type-label}
  - **`AccountLogin`** :span[string]{.type-label}
  - **`AccountType`** :span[string]{.type-label}
  - **`AllRepositories`** :span[boolean]{.type-label}  
    true if the installation has access to all repositories in the account, false if it has access to only selected repositories.
  - **`InstallationId`** :span[string]{.type-label}

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

:span[GET]{.api-get} `/api/platformhub/versioncontrol`

**Response**

`200` — The version control settings for the Platform Hub

- **`BasePath`** :span[string]{.type-label}
- **`Credentials`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** :span[string]{.type-label}
- **`Url`** :span[string]{.type-label}

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

## Update the platform hub's existing version control settings configuration

:span[PUT]{.api-put} `/api/platformhub/versioncontrol`

**Request Body**

- **`BasePath`** :span[string]{.type-label} *(required)*
- **`Credentials`** :span[object]{.type-label} *(required)*
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** :span[string]{.type-label} *(required)*
- **`Url`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

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

- **`BasePath`** :span[string]{.type-label}
- **`Credentials`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** :span[string]{.type-label}
- **`Url`** :span[string]{.type-label}

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

## Get a paginated list of process templates from the specified Git reference (sorted by name)

:span[GET]{.api-get} `/api/platformhub/{gitRef}/processtemplates`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of process templates (sorted by name).

- **`ItemsPerPage`** :span[integer]{.type-label}
- **`ProcessTemplates`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Parameters`** :span[array of object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

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
