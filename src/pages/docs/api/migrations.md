---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Migrations
---

## Creates and queues a migration import task, from an export created via the migration partial-export api

`POST` `/api/migrations/import`

The migration API provides the ability to back-up and restore parts of an Octopus Deploy instance remotely Further details can be found in the docs.

**Request Body**

`CreateMigrationImportTaskCommand`

- **`DeletePackageOnCompletion`** <span class="type-label">boolean</span>
- **`FailureCallbackUri`** <span class="type-label">string</span>
- **`IsDryRun`** <span class="type-label">boolean</span>
- **`IsEncryptedPackage`** <span class="type-label">boolean</span>
- **`OverwriteExisting`** <span class="type-label">boolean</span>
- **`PackageFeedSpaceId`** <span class="type-label">string</span>
- **`PackageId`** <span class="type-label">string</span> *(required)*
- **`PackageVersion`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Password`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`SuccessCallbackUri`** <span class="type-label">string</span>

<div data-example="Request">

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
</div>

**Response**

`200` — The requested import task that has been queued.

`MigrationImportResource`.

- **`DeletePackageOnCompletion`** <span class="type-label">boolean</span>
- **`FailureCallbackUri`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDryRun`** <span class="type-label">boolean</span>
- **`IsEncryptedPackage`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OverwriteExisting`** <span class="type-label">boolean</span>
- **`PackageFeedSpaceId`** <span class="type-label">string</span>
- **`PackageId`** <span class="type-label">string</span>
- **`PackageVersion`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">string</span>
- **`SuccessCallbackUri`** <span class="type-label">string</span>
- **`TaskId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Creates and queues a partial-export migration task

`POST` `/api/migrations/partialexport`

The migration API provides the ability to back-up and restore parts of an Octopus Deploy instance remotely Further details can be found in the docs.

**Request Body**

`CreateMigrationPartialExportTaskCommand`

- **`DestinationApiKey`** <span class="type-label">string</span>
- **`DestinationPackageFeed`** <span class="type-label">string</span>
- **`DestinationPackageFeedSpaceId`** <span class="type-label">string</span>
- **`EncryptPackage`** <span class="type-label">boolean</span>
- **`FailureCallbackUri`** <span class="type-label">string</span>
- **`IgnoreCertificates`** <span class="type-label">boolean</span>
- **`IgnoreDeployments`** <span class="type-label">boolean</span>
- **`IgnoreMachines`** <span class="type-label">boolean</span>
- **`IgnoreTenants`** <span class="type-label">boolean</span>
- **`IncludeTaskLogs`** <span class="type-label">boolean</span>
- **`PackageId`** <span class="type-label">string</span>
- **`PackageVersion`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Projects`** <span class="type-label">array of string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span>
- **`SuccessCallbackUri`** <span class="type-label">string</span>

<div data-example="Request">

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
</div>

**Response**

`200` — The requested partial export task that has been queued.

`MigrationPartialExportResource`.

- **`DestinationApiKey`** <span class="type-label">string</span>
- **`DestinationPackageFeed`** <span class="type-label">string</span>
- **`DestinationPackageFeedSpaceId`** <span class="type-label">string</span>
- **`EncryptPackage`** <span class="type-label">boolean</span>
- **`FailureCallbackUri`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreCertificates`** <span class="type-label">boolean</span>
- **`IgnoreDeployments`** <span class="type-label">boolean</span>
- **`IgnoreMachines`** <span class="type-label">boolean</span>
- **`IgnoreTenants`** <span class="type-label">boolean</span>
- **`IncludeTaskLogs`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PackageId`** <span class="type-label">string</span>
- **`PackageVersion`** <span class="type-label">string</span>
- **`Password`** <span class="type-label">string</span>
- **`Projects`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`SuccessCallbackUri`** <span class="type-label">string</span>
- **`TaskId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>
