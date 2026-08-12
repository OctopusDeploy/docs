---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Certificates
---

## List X.509 certificates managed by Octopus

`GET` `/api/{spaceId}/certificates`

Also reachable at `/api/certificates`, `/api/spaces/{spaceIdentifier}/certificates`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`archived`** <span class="type-label">boolean</span> — If true, returns only archived Certificates. Otherwise, returns only non-archived Certificates.
- **`firstResult`** <span class="type-label">string</span> — Certificate ID which if specified, adds the Certificate with matching ID to the result if it is not already included.
- **`ids`** <span class="type-label">string</span> — Comma delimited list of Certificate IDs which if specified, filters the result to only include Certificates with matching IDs.
- **`orderBy`** <span class="type-label">string</span> — If the value is 'recent' (case-insensitive), then the result will be sorted by Created instead of NotAfter.
- **`partialName`** <span class="type-label">string</span> — Alternative parameter to Search; filters Certificates by Name/Subject/Thumbprint.
- **`search`** <span class="type-label">string</span> — Filters Certificates by Name/Subject/Thumbprint.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 15. Minimum `0`.
- **`tenant`** <span class="type-label">string</span> — Tenant ID which if specified, filters the result to only include Certificates which are related to the provided Tenant.

**Response**

`200` — The requested Certificates

`CertificateResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Archived`** <span class="type-label">string</span> — Format `date-time`.
  - **`CertificateChain`** <span class="type-label">array of object</span>
  - **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
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
  - **`SpaceId`** <span class="type-label">string</span>
  - **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
  - **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">integer</span>
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
      "EnvironmentIds": [
        "string"
      ],
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
      "SpaceId": "string",
      "SubjectAlternativeNames": [
        "string"
      ],
      "SubjectCommonName": "string",
      "SubjectDistinguishedName": "string",
      "SubjectOrganization": "string",
      "TenantIds": [
        "string"
      ],
      "TenantTags": [
        "string"
      ],
      "TenantedDeploymentParticipation": "Untenanted",
      "Thumbprint": "string",
      "Version": 0
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

## Creates a new certificate

`POST` `/api/{spaceId}/certificates`

Also reachable at `/api/certificates`, `/api/spaces/{spaceIdentifier}/certificates`.

Adds a new certificate

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateCertificateCommand`

- **`CertificateData`** <span class="type-label">sensitive value</span> *(required)*
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Notes`** <span class="type-label">string</span> — Maximum length 10240.
- **`Password`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

<div data-example="Request">

```json
{
  "CertificateData": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "EnvironmentIds": [
    "string"
  ],
  "Name": "string",
  "Notes": "string",
  "Password": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
</div>

**Response**

`201` — Created

`CertificateResource`.

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
  "EnvironmentIds": [
    "string"
  ],
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
  "SpaceId": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Get a list of Certificates

`GET` `/api/{spaceId}/certificates/all`

Also reachable at `/api/certificates/all`, `/api/spaces/{spaceIdentifier}/certificates/all`.

Lists X.509 certificates managed by Octopus.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A set of Certificate IDs to retrieve Certificates for. Example: Certificate-101,Certificate-201.

**Response**

`200` — The list of requested Certificates

an array of `CertificateResource`.

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span>

<div data-example="Response">

```json
[
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
    "EnvironmentIds": [
      "string"
    ],
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
    "SpaceId": "string",
    "SubjectAlternativeNames": [
      "string"
    ],
    "SubjectCommonName": "string",
    "SubjectDistinguishedName": "string",
    "SubjectOrganization": "string",
    "TenantIds": [
      "string"
    ],
    "TenantTags": [
      "string"
    ],
    "TenantedDeploymentParticipation": "Untenanted",
    "Thumbprint": "string",
    "Version": 0
  }
]
```
</div>

## Get the global Certificate

`GET` `/api/certificates/certificate-global`

Returns the server thumbprint used to identify this Octopus Server to any Tentacles when executing a deployment. Deprecated.

**Response**

`200` — The requested global Certificate

`CertificateConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SignatureAlgorithm`** <span class="type-label">string</span>
- **`Thumbprint`** <span class="type-label">string</span>

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
  "Name": "string",
  "SignatureAlgorithm": "string",
  "Thumbprint": "string"
}
```
</div>

## Create a self-signed Certificate

`POST` `/api/{spaceId}/certificates/generate`

Also reachable at `/api/certificates/generate`, `/api/spaces/{spaceIdentifier}/certificates/generate`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateSelfSignedCertificateCommand`

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SelfSignedCertificateCurve`** <span class="type-label">string</span> — Elliptic curve for the generated key pair: nistP256, nistP384 or nistP521. Defaults to nistP384 when omitted.
- **`SerialNumber`** <span class="type-label">string</span>
- **`SignatureAlgorithmName`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
  "EnvironmentIds": [
    "string"
  ],
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
  "SpaceId": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

**Response**

`200` — The newly-created self-signed Certificate.

`CertificateResource`.

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
  "EnvironmentIds": [
    "string"
  ],
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
  "SpaceId": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Lists the X.509 certificates in the supplied Octopus Deploy Space in pages. Current certificates are sorted by soonest expiry first unless OrderBy says otherwise; archived certificates are always sorted by most recently archived

`GET` `/api/{spaceId}/certificates/v2`

Also reachable at `/api/certificates/v2`, `/api/spaces/{spaceIdentifier}/certificates/v2`.

Skip and Take are required. TotalResults is always the real count of matching certificates, including when Tenant or FirstResult is supplied. Certificate data and passwords are never returned by this endpoint.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`archived`** <span class="type-label">boolean</span> — When true, returns only archived certificates. Otherwise, returns only current (non-archived) certificates.
- **`firstResult`** <span class="type-label">string</span> — A certificate to return at the top of the first page even if it does not match the other filters, or is archived. Intended for a selector that has to show the currently selected certificate whatever else it lists.
- **`ids`** <span class="type-label">array of string</span> — Filters the certificates using the specified ids.
- **`orderBy`** <span class="type-label">string</span> — The order to return current certificates in: Expiry (the default, soonest to expire first) or Created (most recently added first). Ignored when Archived is true, since archived certificates are always returned most recently archived first. An unrecognised value is treated as Expiry.
- **`search`** <span class="type-label">string</span> — Filters the certificates using the specified fragment, matched against each certificate's name, subject and thumbprint.
- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.
- **`tenant`** <span class="type-label">string</span> — Filters the certificates to those the specified Tenant can use, honouring both direct tenant links and tenant tags.

**Response**

`200` — Success

`CertificateResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Archived`** <span class="type-label">string</span> — Format `date-time`.
  - **`CertificateChain`** <span class="type-label">array of object</span>
  - **`CertificateData`** <span class="type-label">sensitive value</span>
  - **`CertificateDataFormat`** <span class="type-label">enum</span> — Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
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
  - **`SpaceId`** <span class="type-label">string</span>
  - **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
  - **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`SubjectDistinguishedName`** <span class="type-label">string</span>
  - **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
      "EnvironmentIds": [
        "string"
      ],
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
      "SpaceId": "string",
      "SubjectAlternativeNames": [
        "string"
      ],
      "SubjectCommonName": "string",
      "SubjectDistinguishedName": "string",
      "SubjectOrganization": "string",
      "TenantIds": [
        "string"
      ],
      "TenantTags": [
        "string"
      ],
      "TenantedDeploymentParticipation": "Untenanted",
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

## Get a Certificate by ID or Thumbprint

`GET` `/api/{spaceId}/certificates/{id}`

Also reachable at `/api/certificates/{id}`, `/api/spaces/{spaceIdentifier}/certificates/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID or Thumbprint of the Certificate.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Certificate

`CertificateResource`.

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
  "EnvironmentIds": [
    "string"
  ],
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
  "SpaceId": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Modify a certificate by ID

`PUT` `/api/{spaceId}/certificates/{id}`

Also reachable at `/api/certificates/{id}`, `/api/spaces/{spaceIdentifier}/certificates/{id}`.

Modifies an existing certificate

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the certificate.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Request Body**

`ModifyCertificateCommand`

- **`EnvironmentIds`** <span class="type-label">array of string</span> — The environments allowed to use this certificate.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the certificate.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the certificate. Minimum length 1.
- **`Notes`** <span class="type-label">string</span> — Additional information on the certificate.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space.
- **`TenantIds`** <span class="type-label">array of string</span> — The tenants this certificate should be associated with.
- **`TenantTags`** <span class="type-label">array of string</span> — The tags this certificate should be associated with.
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — The kind of deployments where this certificate should be included. Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

<div data-example="Request">

```json
{
  "EnvironmentIds": [
    "string"
  ],
  "Id": "string",
  "Name": "string",
  "Notes": "string",
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
</div>

**Response**

`200` — The modified certificate resource

`CertificateResource`.

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
  "EnvironmentIds": [
    "string"
  ],
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
  "SpaceId": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Deletes an existing Certificate

`DELETE` `/api/{spaceId}/certificates/{id}`

Also reachable at `/api/certificates/{id}`, `/api/spaces/{spaceIdentifier}/certificates/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Archives an existing Certificate

`POST` `/api/{spaceId}/certificates/{id}/archive`

Also reachable at `/api/certificates/{id}/archive`, `/api/spaces/{spaceIdentifier}/certificates/{id}/archive`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to archive.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Archives an existing Certificate

`POST` `/api/{spaceId}/certificates/{id}/archive/v1`

Also reachable at `/api/certificates/{id}/archive/v1`, `/api/spaces/{spaceIdentifier}/certificates/{id}/archive/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to archive.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Certificate has been archived

`ArchiveCertificateResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Exports the certificate

`GET` `/api/{spaceId}/certificates/{id}/export`

Also reachable at `/api/certificates/{id}/export`, `/api/spaces/{spaceIdentifier}/certificates/{id}/export`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the certificate to export.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

- **`format`** <span class="type-label">enum</span> — The file format in which to export the certificate. Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`includePrivateKey`** <span class="type-label">boolean</span> — Whether the private key should be included in the exported file.
- **`password`** <span class="type-label">string</span> — The password to read the stored certificate.
- **`pemOptions`** <span class="type-label">enum</span> — Whether the exported PEM file should include the certificate chain. Allowed values: `PrimaryOnly`, `PrimaryAndChain`, `ChainOnly`.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Replaces an existing Certificate with another

`POST` `/api/{spaceId}/certificates/{id}/replace`

Also reachable at `/api/certificates/{id}/replace`, `/api/spaces/{spaceIdentifier}/certificates/{id}/replace`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to Replace.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ReplaceCertificateCommand`

- **`CertificateData`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to Replace.
- **`Password`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "CertificateData": "string",
  "Id": "string",
  "Password": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Certificate has been replaced

`CertificateResource`.

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
- **`EnvironmentIds`** <span class="type-label">array of string</span>
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
- **`SpaceId`** <span class="type-label">string</span>
- **`SubjectAlternativeNames`** <span class="type-label">array of string</span>
- **`SubjectCommonName`** <span class="type-label">string</span> — The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** <span class="type-label">string</span>
- **`SubjectOrganization`** <span class="type-label">string</span> — The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
  "EnvironmentIds": [
    "string"
  ],
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
  "SpaceId": "string",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
</div>

## Unarchives an existing archived Certificate

`POST` `/api/{spaceId}/certificates/{id}/unarchive`

Also reachable at `/api/certificates/{id}/unarchive`, `/api/spaces/{spaceIdentifier}/certificates/{id}/unarchive`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to unarchive.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Unarchives an existing archived Certificate

`POST` `/api/{spaceId}/certificates/{id}/unarchive/v1`

Also reachable at `/api/certificates/{id}/unarchive/v1`, `/api/spaces/{spaceIdentifier}/certificates/{id}/unarchive/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Certificate to unarchive.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Certificate has been un-archived

`UnarchiveCertificateResponse`.

<div data-example="Response">

```json
{}
```
</div>

## GET /api/{spaceId}/certificates/{id}/usages

`GET` `/api/{spaceId}/certificates/{id}/usages`

Also reachable at `/api/certificates/{id}/usages`, `/api/spaces/{spaceIdentifier}/certificates/{id}/usages`.

Get the usages of a certificate

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the certificate.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

**Response**

`200` — The requested Certificate usages

`CertificateUsageResource`.

- **`DeploymentTargetUsages`** <span class="type-label">array of object</span>
  - **`Architecture`** <span class="type-label">string</span>
  - **`Endpoint`** <span class="type-label">object</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`HasLatestCalamari`** <span class="type-label">boolean</span>
  - **`HealthStatus`** <span class="type-label">enum</span> — Allowed values: `Healthy`, `Unavailable`, `Unknown`, `HasWarnings`, `Unhealthy`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`IsInProcess`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachinePolicyId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OperatingSystem`** <span class="type-label">string</span>
  - **`OperatingSystemVersion`** <span class="type-label">string</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`ShellName`** <span class="type-label">string</span>
  - **`ShellVersion`** <span class="type-label">string</span>
  - **`SkipInitialHealthCheck`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StatusSummary`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Uri`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetUsages`** <span class="type-label">array of object</span>
  - **`ContentType`** <span class="type-label">enum</span> — Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately. Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span> — Gets the variable templates.
  - **`VariableSetId`** <span class="type-label">string</span> — Gets or sets the id of the associated variable set.
  - **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectUsages`** <span class="type-label">array of object</span>
  - **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
  - **`AutoCreateRelease`** <span class="type-label">boolean</span>
  - **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`ClonedFromProjectId`** <span class="type-label">string</span>
  - **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
  - **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`DefaultPowerShellEdition`** <span class="type-label">string</span>
  - **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
  - **`DeploymentChangesTemplate`** <span class="type-label">string</span>
  - **`DeploymentProcessId`** <span class="type-label">string</span>
  - **`DeprovisioningRunbookId`** <span class="type-label">string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
  - **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
  - **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
  - **`IsBadgesEnabled`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`IsVersionControlled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`PersistenceSettings`** <span class="type-label">object</span>
  - **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`ProjectGroupId`** <span class="type-label">string</span>
  - **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
  - **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`ProvisioningRunbookId`** <span class="type-label">string</span>
  - **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ReleaseNotesTemplate`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span>
  - **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`VariableSetId`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">object</span>
- **`TenantUsages`** <span class="type-label">array of object</span>
  - **`ClonedFromTenantId`** <span class="type-label">string</span>
  - **`CustomFields`** <span class="type-label">array of string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectEnvironments`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantTags`** <span class="type-label">array of string</span> — Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

<div data-example="Response">

```json
{
  "DeploymentTargetUsages": [
    {
      "Architecture": "string",
      "Endpoint": {
        "CommunicationStyle": "None",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
      "EnvironmentIds": [
        "string"
      ],
      "HasLatestCalamari": true,
      "HealthStatus": "Healthy",
      "Id": "string",
      "IsDisabled": true,
      "IsInProcess": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MachinePolicyId": "string",
      "Name": "string",
      "OperatingSystem": "string",
      "OperatingSystemVersion": "string",
      "Roles": [
        "string"
      ],
      "ShellName": "string",
      "ShellVersion": "string",
      "SkipInitialHealthCheck": true,
      "Slug": "string",
      "SpaceId": "string",
      "StatusSummary": "string",
      "TenantIds": [
        "string"
      ],
      "TenantTags": [
        "string"
      ],
      "TenantedDeploymentParticipation": "Untenanted",
      "Thumbprint": "string",
      "Uri": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetUsages": [
    {
      "ContentType": "Variables",
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "VariableSetId": "string",
      "Version": 0
    }
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectUsages": [
    {
      "AllowIgnoreChannelRules": true,
      "AutoCreateRelease": true,
      "AutoDeployReleaseOverrides": [
        {}
      ],
      "ClonedFromProjectId": "string",
      "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "DefaultPowerShellEdition": "string",
      "DefaultToSkipIfAlreadyInstalled": true,
      "DeploymentChangesTemplate": "string",
      "DeploymentProcessId": "string",
      "DeprovisioningRunbookId": "string",
      "Description": "string",
      "DiscreteChannelRelease": true,
      "ExecuteDeploymentsOnEventBasedPipeline": true,
      "ExtensionSettings": [
        {}
      ],
      "ForcePackageDownload": true,
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IncludedLibraryVariableSetIds": [
        "string"
      ],
      "IsBadgesEnabled": true,
      "IsDisabled": true,
      "IsVersionControlled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LifecycleId": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PersistenceSettings": {
        "Type": "Database"
      },
      "ProjectConnectivityPolicy": {
        "AllowDeploymentsToNoTargets": true,
        "ExcludeUnhealthyTargets": true,
        "SkipMachineBehavior": "None",
        "TargetRoles": [
          "string"
        ]
      },
      "ProjectGroupId": "string",
      "ProjectTags": [
        "string"
      ],
      "ProjectTemplateDetails": {
        "IsShared": true,
        "Slug": "string",
        "VersionMask": "string"
      },
      "ProvisioningRunbookId": "string",
      "ReleaseCreationStrategy": {
        "ChannelId": "string",
        "ReleaseCreationPackage": {}
      },
      "ReleaseNotesTemplate": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "TenantedDeploymentMode": "Untenanted",
      "VariableSetId": "string",
      "VersioningStrategy": {
        "DonorPackage": {},
        "Template": "string"
      }
    }
  ],
  "TenantUsages": [
    {
      "ClonedFromTenantId": "string",
      "CustomFields": [
        "string"
      ],
      "Description": "string",
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IsDisabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectEnvironments": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      },
      "Slug": "string",
      "SpaceId": "string",
      "TenantTags": [
        "string"
      ]
    }
  ]
}
```
</div>

## Requests the list of Certificate Configurations

`GET` `/api/configuration/certificates`

Only returns configurations for the global Certificate

**Parameters**

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Certificate Configurations

`CertificateConfigurationResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`SignatureAlgorithm`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
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
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SignatureAlgorithm": "string",
      "Thumbprint": "string"
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

## Get a Certificate Configuration by ID

`GET` `/api/configuration/certificates/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the CertificateConfiguration to load.

**Response**

`200` — The certificate configuration matching the supplied ID

`CertificateConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SignatureAlgorithm`** <span class="type-label">string</span>
- **`Thumbprint`** <span class="type-label">string</span>

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
  "Name": "string",
  "SignatureAlgorithm": "string",
  "Thumbprint": "string"
}
```
</div>

## Get public certificate

`GET` `/api/configuration/certificates/{id}/public-cer`

Downloads the public portion of the certificate in .cer format

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The Id of the certificate to retrieve the public portion of.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
