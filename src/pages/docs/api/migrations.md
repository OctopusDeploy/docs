---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Migrations
---

## Create and queue a migration import task, from an export created via the migration partial-export api

:endpoint{method="POST" path="/api/migrations/import"}

The migration API provides the ability to back-up and restore parts of an Octopus Deploy instance remotely Further details can be found in the docs.

**Request Body**

- **`DeletePackageOnCompletion`** :span[boolean]{.type-label}
- **`FailureCallbackUri`** :span[string]{.type-label}
- **`IsDryRun`** :span[boolean]{.type-label}
- **`IsEncryptedPackage`** :span[boolean]{.type-label}
- **`OverwriteExisting`** :span[boolean]{.type-label}
- **`PackageFeedSpaceId`** :span[string]{.type-label}
- **`PackageId`** :span[string]{.type-label} *(required)*
- **`PackageVersion`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Password`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`SuccessCallbackUri`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "DeletePackageOnCompletion": true,
  "FailureCallbackUri": "string",
  "IsDryRun": true,
  "IsEncryptedPackage": true,
  "OverwriteExisting": true,
  "PackageFeedSpaceId": "string",
  "PackageId": "string",
  "PackageVersion": "string",
  "Password": "string",
  "SuccessCallbackUri": "string"
}
```
:::

**Response**

`200` — The requested import task that has been queued.

- **`DeletePackageOnCompletion`** :span[boolean]{.type-label}
- **`FailureCallbackUri`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDryRun`** :span[boolean]{.type-label}
- **`IsEncryptedPackage`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OverwriteExisting`** :span[boolean]{.type-label}
- **`PackageFeedSpaceId`** :span[string]{.type-label}
- **`PackageId`** :span[string]{.type-label}
- **`PackageVersion`** :span[string]{.type-label}
- **`Password`** :span[string]{.type-label}
- **`SuccessCallbackUri`** :span[string]{.type-label}
- **`TaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "DeletePackageOnCompletion": true,
  "FailureCallbackUri": "string",
  "Id": "string",
  "IsDryRun": true,
  "IsEncryptedPackage": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OverwriteExisting": true,
  "PackageFeedSpaceId": "string",
  "PackageId": "string",
  "PackageVersion": "string",
  "Password": "string",
  "SuccessCallbackUri": "string",
  "TaskId": "string"
}
```
:::

## Create and queue a partial-export migration task

:endpoint{method="POST" path="/api/migrations/partialexport"}

The migration API provides the ability to back-up and restore parts of an Octopus Deploy instance remotely Further details can be found in the docs.

**Request Body**

- **`DestinationApiKey`** :span[string]{.type-label}
- **`DestinationPackageFeed`** :span[string]{.type-label}
- **`DestinationPackageFeedSpaceId`** :span[string]{.type-label}
- **`EncryptPackage`** :span[boolean]{.type-label}
- **`FailureCallbackUri`** :span[string]{.type-label}
- **`IgnoreCertificates`** :span[boolean]{.type-label}
- **`IgnoreDeployments`** :span[boolean]{.type-label}
- **`IgnoreMachines`** :span[boolean]{.type-label}
- **`IgnoreTenants`** :span[boolean]{.type-label}
- **`IncludeTaskLogs`** :span[boolean]{.type-label}
- **`PackageId`** :span[string]{.type-label}
- **`PackageVersion`** :span[string]{.type-label}
- **`Password`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Projects`** :span[array of string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label}
- **`SuccessCallbackUri`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "DestinationApiKey": "string",
  "DestinationPackageFeed": "string",
  "DestinationPackageFeedSpaceId": "string",
  "EncryptPackage": true,
  "FailureCallbackUri": "string",
  "IgnoreCertificates": true,
  "IgnoreDeployments": true,
  "IgnoreMachines": true,
  "IgnoreTenants": true,
  "IncludeTaskLogs": true,
  "PackageId": "string",
  "PackageVersion": "string",
  "Password": "string",
  "Projects": [
    "string"
  ],
  "SpaceId": "string",
  "SuccessCallbackUri": "string"
}
```
:::

**Response**

`200` — The requested partial export task that has been queued.

- **`DestinationApiKey`** :span[string]{.type-label}
- **`DestinationPackageFeed`** :span[string]{.type-label}
- **`DestinationPackageFeedSpaceId`** :span[string]{.type-label}
- **`EncryptPackage`** :span[boolean]{.type-label}
- **`FailureCallbackUri`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreCertificates`** :span[boolean]{.type-label}
- **`IgnoreDeployments`** :span[boolean]{.type-label}
- **`IgnoreMachines`** :span[boolean]{.type-label}
- **`IgnoreTenants`** :span[boolean]{.type-label}
- **`IncludeTaskLogs`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PackageId`** :span[string]{.type-label}
- **`PackageVersion`** :span[string]{.type-label}
- **`Password`** :span[string]{.type-label}
- **`Projects`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`SuccessCallbackUri`** :span[string]{.type-label}
- **`TaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "DestinationApiKey": "string",
  "DestinationPackageFeed": "string",
  "DestinationPackageFeedSpaceId": "string",
  "EncryptPackage": true,
  "FailureCallbackUri": "string",
  "Id": "string",
  "IgnoreCertificates": true,
  "IgnoreDeployments": true,
  "IgnoreMachines": true,
  "IgnoreTenants": true,
  "IncludeTaskLogs": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PackageId": "string",
  "PackageVersion": "string",
  "Password": "string",
  "Projects": [
    "string"
  ],
  "SpaceId": "string",
  "SuccessCallbackUri": "string",
  "TaskId": "string"
}
```
:::
