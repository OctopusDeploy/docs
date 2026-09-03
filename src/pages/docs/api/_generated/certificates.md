---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Certificates
---

## List X.509 certificates managed by Octopus

:endpoint{method="GET" path="/api/\{spaceId\}/certificates"}

Also reachable at `/api/certificates`, `/api/spaces/{spaceIdentifier}/certificates`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`archived`** :span[boolean]{.type-label}  
  If true, returns only archived Certificates. Otherwise, returns only non-archived Certificates.
- **`firstResult`** :span[string]{.type-label}  
  Certificate ID which if specified, adds the Certificate with matching ID to the result if it is not already included.
- **`ids`** :span[string]{.type-label}  
  Comma delimited list of Certificate IDs which if specified, filters the result to only include Certificates with matching IDs.
- **`orderBy`** :span[string]{.type-label}  
  If the value is 'recent' (case-insensitive), then the result will be sorted by Created instead of NotAfter.
- **`partialName`** :span[string]{.type-label}  
  Alternative parameter to Search; filters Certificates by Name/Subject/Thumbprint.
- **`search`** :span[string]{.type-label}  
  Filters Certificates by Name/Subject/Thumbprint.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 15. Minimum `0`.
- **`tenant`** :span[string]{.type-label}  
  Tenant ID which if specified, filters the result to only include Certificates which are related to the provided Tenant.

**Response**

`200` — The requested Certificates

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Archived`** :span[string]{.type-label}  
    Format `date-time`.
  - **`CertificateChain`** :span[array of object]{.type-label}
  - **`CertificateData`** :span[sensitive value]{.type-label}
  - **`CertificateDataFormat`** :span[enum]{.type-label}  
    Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
  - **`EnvironmentIds`** :span[array of string]{.type-label}
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
  - **`SpaceId`** :span[string]{.type-label}
  - **`SubjectAlternativeNames`** :span[array of string]{.type-label}
  - **`SubjectCommonName`** :span[string]{.type-label}  
    The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`SubjectOrganization`** :span[string]{.type-label}  
    The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
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
      "Archived": "2020-01-01T00:00:00.000Z",
      "CertificateChain": [
        {}
      ],
      "CertificateData": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "CertificateDataFormat": "Pkcs12",
      "EnvironmentIds": [
        "Environments-1",
        "..."
      ],
      "HasPrivateKey": false,
      "Id": "string",
      "IsExpired": false,
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
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "ReplacedBy": "string",
      "SelfSigned": false,
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SpaceId": "Spaces-1",
      "SubjectAlternativeNames": [
        "string"
      ],
      "SubjectCommonName": "string",
      "SubjectDistinguishedName": "string",
      "SubjectOrganization": "string",
      "TenantIds": [
        "Tenants-1",
        "..."
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
:::

## Create a new certificate

:endpoint{method="POST" path="/api/\{spaceId\}/certificates"}

Also reachable at `/api/certificates`, `/api/spaces/{spaceIdentifier}/certificates`.

Adds a new certificate

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CertificateData`** :span[sensitive value]{.type-label} *(required)*
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Maximum length 10240.
- **`Password`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

:::api-example{label="Request"}
```json
{
  "CertificateData": {
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "Name": "string",
  "Notes": "string",
  "Password": {
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
:::

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "HasPrivateKey": false,
  "Id": "string",
  "IsExpired": false,
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": false,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "SpaceId": "Spaces-1",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
:::

## List all Certificates (unpaginated)

:endpoint{method="GET" path="/api/\{spaceId\}/certificates/all"}

Also reachable at `/api/certificates/all`, `/api/spaces/{spaceIdentifier}/certificates/all`.

Lists X.509 certificates managed by Octopus.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A set of Certificate IDs to retrieve Certificates for. Example: Certificate-101,Certificate-201.

**Response**

`200` — The list of requested Certificates

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
      "HasValue": false,
      "Hint": "string",
      "NewValue": "string"
    },
    "CertificateDataFormat": "Pkcs12",
    "EnvironmentIds": [
      "Environments-1",
      "..."
    ],
    "HasPrivateKey": false,
    "Id": "string",
    "IsExpired": false,
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
      "HasValue": false,
      "Hint": "string",
      "NewValue": "string"
    },
    "ReplacedBy": "string",
    "SelfSigned": false,
    "SerialNumber": "string",
    "SignatureAlgorithmName": "string",
    "SpaceId": "Spaces-1",
    "SubjectAlternativeNames": [
      "string"
    ],
    "SubjectCommonName": "string",
    "SubjectDistinguishedName": "string",
    "SubjectOrganization": "string",
    "TenantIds": [
      "Tenants-1",
      "..."
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
:::

## Get the global Certificate

:endpoint{method="GET" path="/api/certificates/certificate-global"}

Returns the server thumbprint used to identify this Octopus Server to any Tentacles when executing a deployment. Deprecated.

**Response**

`200` — The requested global Certificate

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`SignatureAlgorithm`** :span[string]{.type-label}
- **`Thumbprint`** :span[string]{.type-label}

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
  "Name": "string",
  "SignatureAlgorithm": "string",
  "Thumbprint": "string"
}
```
:::

## Create a self-signed Certificate

:endpoint{method="POST" path="/api/\{spaceId\}/certificates/generate"}

Also reachable at `/api/certificates/generate`, `/api/spaces/{spaceIdentifier}/certificates/generate`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
  Elliptic curve for the generated key pair: nistP256, nistP384 or nistP521. Defaults to nistP384 when omitted.
- **`SerialNumber`** :span[string]{.type-label}
- **`SignatureAlgorithmName`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Request"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "HasPrivateKey": false,
  "Id": "string",
  "IsExpired": false,
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": false,
  "SelfSignedCertificateCurve": "string",
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "SpaceId": "Spaces-1",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
:::

**Response**

`200` — The newly-created self-signed Certificate.

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "HasPrivateKey": false,
  "Id": "string",
  "IsExpired": false,
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": false,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "SpaceId": "Spaces-1",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
:::

## List Certificates

:endpoint{method="GET" path="/api/\{spaceId\}/certificates/v2"}

Also reachable at `/api/certificates/v2`, `/api/spaces/{spaceIdentifier}/certificates/v2`.

List the X.509 certificates in the supplied Octopus Deploy Space in pages. Current certificates are sorted by soonest expiry first unless OrderBy says otherwise; archived certificates are always sorted by most recently archived. Skip and Take are required. TotalResults is always the real count of matching certificates, including when Tenant or FirstResult is supplied. Certificate data and passwords are never returned by this endpoint.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`archived`** :span[boolean]{.type-label}  
  When true, returns only archived certificates. Otherwise, returns only current (non-archived) certificates.
- **`firstResult`** :span[string]{.type-label}  
  A certificate to return at the top of the first page even if it does not match the other filters, or is archived. Intended for a selector that has to show the currently selected certificate whatever else it lists.
- **`ids`** :span[array of string]{.type-label}  
  Filters the certificates using the specified ids.
- **`orderBy`** :span[string]{.type-label}  
  The order to return current certificates in: Expiry (the default, soonest to expire first) or Created (most recently added first). Ignored when Archived is true, since archived certificates are always returned most recently archived first. An unrecognised value is treated as Expiry.
- **`search`** :span[string]{.type-label}  
  Filters the certificates using the specified fragment, matched against each certificate's name, subject and thumbprint.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`tenant`** :span[string]{.type-label}  
  Filters the certificates to those the specified Tenant can use, honouring both direct tenant links and tenant tags.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Archived`** :span[string]{.type-label}  
    Format `date-time`.
  - **`CertificateChain`** :span[array of object]{.type-label}
  - **`CertificateData`** :span[sensitive value]{.type-label}
  - **`CertificateDataFormat`** :span[enum]{.type-label}  
    Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
  - **`EnvironmentIds`** :span[array of string]{.type-label}
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
  - **`SpaceId`** :span[string]{.type-label}
  - **`SubjectAlternativeNames`** :span[array of string]{.type-label}
  - **`SubjectCommonName`** :span[string]{.type-label}  
    The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`SubjectDistinguishedName`** :span[string]{.type-label}
  - **`SubjectOrganization`** :span[string]{.type-label}  
    The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Version`** :span[integer]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "CertificateDataFormat": "Pkcs12",
      "EnvironmentIds": [
        "Environments-1",
        "..."
      ],
      "HasPrivateKey": false,
      "Id": "string",
      "IsExpired": false,
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
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "ReplacedBy": "string",
      "SelfSigned": false,
      "SerialNumber": "string",
      "SignatureAlgorithmName": "string",
      "SpaceId": "Spaces-1",
      "SubjectAlternativeNames": [
        "string"
      ],
      "SubjectCommonName": "string",
      "SubjectDistinguishedName": "string",
      "SubjectOrganization": "string",
      "TenantIds": [
        "Tenants-1",
        "..."
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
:::

## Get a Certificate by ID or Thumbprint

:endpoint{method="GET" path="/api/\{spaceId\}/certificates/\{id\}"}

Also reachable at `/api/certificates/{id}`, `/api/spaces/{spaceIdentifier}/certificates/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID or Thumbprint of the Certificate.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Certificate

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "HasPrivateKey": false,
  "Id": "string",
  "IsExpired": false,
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": false,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "SpaceId": "Spaces-1",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
:::

## Modify a certificate by ID

:endpoint{method="PUT" path="/api/\{spaceId\}/certificates/\{id\}"}

Also reachable at `/api/certificates/{id}`, `/api/spaces/{spaceIdentifier}/certificates/{id}`.

Modifies an existing certificate

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the certificate.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Request Body**

- **`EnvironmentIds`** :span[array of string]{.type-label}  
  The environments allowed to use this certificate.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the certificate.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the certificate. Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Additional information on the certificate.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space.
- **`TenantIds`** :span[array of string]{.type-label}  
  The tenants this certificate should be associated with.
- **`TenantTags`** :span[array of string]{.type-label}  
  The tags this certificate should be associated with.
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  The kind of deployments where this certificate should be included.  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

:::api-example{label="Request"}
```json
{
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "Id": "Certificates-1",
  "Name": "string",
  "Notes": "string",
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
:::

**Response**

`200` — The modified certificate resource

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "HasPrivateKey": false,
  "Id": "string",
  "IsExpired": false,
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": false,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "SpaceId": "Spaces-1",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
:::

## Delete an existing Certificate

:endpoint{method="DELETE" path="/api/\{spaceId\}/certificates/\{id\}"}

Also reachable at `/api/certificates/{id}`, `/api/spaces/{spaceIdentifier}/certificates/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Archive an existing Certificate

:endpoint{method="POST" path="/api/\{spaceId\}/certificates/\{id\}/archive"}

Also reachable at `/api/certificates/{id}/archive`, `/api/spaces/{spaceIdentifier}/certificates/{id}/archive`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to archive.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Archive an existing Certificate

:endpoint{method="POST" path="/api/\{spaceId\}/certificates/\{id\}/archive/v1"}

Also reachable at `/api/certificates/{id}/archive/v1`, `/api/spaces/{spaceIdentifier}/certificates/{id}/archive/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to archive.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Certificate has been archived

:::api-example{label="Response"}
```json
{}
```
:::

## Export the certificate

:endpoint{method="GET" path="/api/\{spaceId\}/certificates/\{id\}/export"}

Also reachable at `/api/certificates/{id}/export`, `/api/spaces/{spaceIdentifier}/certificates/{id}/export`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the certificate to export.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Query Parameters**

- **`format`** :span[enum]{.type-label}  
  The file format in which to export the certificate.  
  Allowed values: `Pkcs12`, `Der`, `Pem`, `Unknown`.
- **`includePrivateKey`** :span[boolean]{.type-label}  
  Whether the private key should be included in the exported file.
- **`password`** :span[string]{.type-label}  
  The password to read the stored certificate.
- **`pemOptions`** :span[enum]{.type-label}  
  Whether the exported PEM file should include the certificate chain.  
  Allowed values: `PrimaryOnly`, `PrimaryAndChain`, `ChainOnly`.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Replace an existing Certificate with another

:endpoint{method="POST" path="/api/\{spaceId\}/certificates/\{id\}/replace"}

Also reachable at `/api/certificates/{id}/replace`, `/api/spaces/{spaceIdentifier}/certificates/{id}/replace`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to Replace.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`CertificateData`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to Replace.
- **`Password`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "CertificateData": "string",
  "Id": "Certificates-1",
  "Password": "string",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Confirmation that the Certificate has been replaced

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
- **`EnvironmentIds`** :span[array of string]{.type-label}
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
- **`SpaceId`** :span[string]{.type-label}
- **`SubjectAlternativeNames`** :span[array of string]{.type-label}
- **`SubjectCommonName`** :span[string]{.type-label}  
  The certificate subject's common name (CN). When creating a self-signed certificate this becomes the generated certificate's CN, and at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`SubjectDistinguishedName`** :span[string]{.type-label}
- **`SubjectOrganization`** :span[string]{.type-label}  
  The certificate subject's organization (O). When creating a self-signed certificate, at least one of SubjectCommonName or SubjectOrganization must be supplied.
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "CertificateDataFormat": "Pkcs12",
  "EnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "HasPrivateKey": false,
  "Id": "string",
  "IsExpired": false,
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
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "ReplacedBy": "string",
  "SelfSigned": false,
  "SerialNumber": "string",
  "SignatureAlgorithmName": "string",
  "SpaceId": "Spaces-1",
  "SubjectAlternativeNames": [
    "string"
  ],
  "SubjectCommonName": "string",
  "SubjectDistinguishedName": "string",
  "SubjectOrganization": "string",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted",
  "Thumbprint": "string",
  "Version": 0
}
```
:::

## Unarchive an existing archived Certificate

:endpoint{method="POST" path="/api/\{spaceId\}/certificates/\{id\}/unarchive"}

Also reachable at `/api/certificates/{id}/unarchive`, `/api/spaces/{spaceIdentifier}/certificates/{id}/unarchive`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to unarchive.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Unarchive an existing archived Certificate

:endpoint{method="POST" path="/api/\{spaceId\}/certificates/\{id\}/unarchive/v1"}

Also reachable at `/api/certificates/{id}/unarchive/v1`, `/api/spaces/{spaceIdentifier}/certificates/{id}/unarchive/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Certificate to unarchive.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Certificate has been un-archived

:::api-example{label="Response"}
```json
{}
```
:::

## Get the usages of a certificate

:endpoint{method="GET" path="/api/\{spaceId\}/certificates/\{id\}/usages"}

Also reachable at `/api/certificates/{id}/usages`, `/api/spaces/{spaceIdentifier}/certificates/{id}/usages`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the certificate.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Response**

`200` — The requested Certificate usages

- **`DeploymentTargetUsages`** :span[array of object]{.type-label}
  - **`Architecture`** :span[string]{.type-label}
  - **`Endpoint`** :span[object]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`HasLatestCalamari`** :span[boolean]{.type-label}
  - **`HealthStatus`** :span[enum]{.type-label}  
    Allowed values: `Healthy`, `Unavailable`, `Unknown`, `HasWarnings`, `Unhealthy`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`IsInProcess`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachinePolicyId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OperatingSystem`** :span[string]{.type-label}
  - **`OperatingSystemVersion`** :span[string]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`ShellName`** :span[string]{.type-label}
  - **`ShellVersion`** :span[string]{.type-label}
  - **`SkipInitialHealthCheck`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`StatusSummary`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Uri`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetUsages`** :span[array of object]{.type-label}
  - **`ContentType`** :span[enum]{.type-label}  
    Describes the purpose of the variable set. Clients can use this to offer an editing experience appropriately.  
    Allowed values: `Variables`, `ScriptModule`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a description of this variable set that explains the purpose of the variable set to other users. This field may contain markdown.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this variable set. This should be short, preferably 5-20 characters.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}  
    Gets the variable templates.
  - **`VariableSetId`** :span[string]{.type-label}  
    Gets or sets the id of the associated variable set.
  - **`Version`** :span[integer]{.type-label}  
    Gets or sets the version number.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectUsages`** :span[array of object]{.type-label}
  - **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
  - **`AutoCreateRelease`** :span[boolean]{.type-label}
  - **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`ClonedFromProjectId`** :span[string]{.type-label}
  - **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
  - **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
    Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`DefaultPowerShellEdition`** :span[string]{.type-label}
  - **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
  - **`DeploymentChangesTemplate`** :span[string]{.type-label}
  - **`DeploymentProcessId`** :span[string]{.type-label}
  - **`DeprovisioningRunbookId`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
    Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
  - **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
  - **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
    Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
  - **`IsBadgesEnabled`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`IsVersionControlled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PersistenceSettings`** :span[object]{.type-label}
  - **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`ProjectGroupId`** :span[string]{.type-label}
  - **`ProjectTags`** :span[array of string]{.type-label}  
    List of tags assigned to this project.
  - **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`ProvisioningRunbookId`** :span[string]{.type-label}
  - **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ReleaseNotesTemplate`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}
  - **`TenantedDeploymentMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`VariableSetId`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[object]{.type-label}
- **`TenantUsages`** :span[array of object]{.type-label}
  - **`ClonedFromTenantId`** :span[string]{.type-label}
  - **`CustomFields`** :span[array of string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectEnvironments`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}  
    Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

:::api-example{label="Response"}
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
        "Environments-1",
        "..."
      ],
      "HasLatestCalamari": false,
      "HealthStatus": "Healthy",
      "Id": "string",
      "IsDisabled": false,
      "IsInProcess": false,
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
      "SkipInitialHealthCheck": false,
      "Slug": "string",
      "SpaceId": "Spaces-1",
      "StatusSummary": "string",
      "TenantIds": [
        "Tenants-1",
        "..."
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
      "SpaceId": "Spaces-1",
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
      "AllowIgnoreChannelRules": false,
      "AutoCreateRelease": false,
      "AutoDeployReleaseOverrides": [
        {}
      ],
      "ClonedFromProjectId": "Projects-1",
      "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "DefaultPowerShellEdition": "string",
      "DefaultToSkipIfAlreadyInstalled": false,
      "DeploymentChangesTemplate": "string",
      "DeploymentProcessId": "string",
      "DeprovisioningRunbookId": "Runbooks-1",
      "Description": "string",
      "DiscreteChannelRelease": false,
      "ExecuteDeploymentsOnEventBasedPipeline": false,
      "ExtensionSettings": [
        {}
      ],
      "ForcePackageDownload": false,
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IncludedLibraryVariableSetIds": [
        "string"
      ],
      "IsBadgesEnabled": false,
      "IsDisabled": false,
      "IsVersionControlled": false,
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
        "AllowDeploymentsToNoTargets": false,
        "ExcludeUnhealthyTargets": false,
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
        "IsShared": false,
        "Slug": "string",
        "VersionMask": "string"
      },
      "ProvisioningRunbookId": "Runbooks-1",
      "ReleaseCreationStrategy": {
        "ChannelId": "string",
        "ReleaseCreationPackage": {}
      },
      "ReleaseNotesTemplate": "string",
      "Slug": "string",
      "SpaceId": "Spaces-1",
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
      "IsDisabled": false,
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
      "SpaceId": "Spaces-1",
      "TenantTags": [
        "string"
      ]
    }
  ]
}
```
:::

## Request the list of Certificate Configurations

:endpoint{method="GET" path="/api/configuration/certificates"}

Only returns configurations for the global Certificate

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Certificate Configurations

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`SignatureAlgorithm`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
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
:::

## Get a Certificate Configuration by ID

:endpoint{method="GET" path="/api/configuration/certificates/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the CertificateConfiguration to load.

**Response**

`200` — The certificate configuration matching the supplied ID

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`SignatureAlgorithm`** :span[string]{.type-label}
- **`Thumbprint`** :span[string]{.type-label}

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
  "Name": "string",
  "SignatureAlgorithm": "string",
  "Thumbprint": "string"
}
```
:::

## Get public certificate

:endpoint{method="GET" path="/api/configuration/certificates/\{id\}/public-cer"}

Downloads the public portion of the certificate in .cer format

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The Id of the certificate to retrieve the public portion of.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::
