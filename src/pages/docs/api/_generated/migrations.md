---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-20
title: Migrations
---

Octopus includes a migration API that provides the ability to back-up and restore parts of an Octopus Deploy instance remotely.

The API currently includes support for both the [partial-export](/docs/octopus-rest-api/octopus.migrator.exe-command-line/partial-export/) and [import](/docs/octopus-rest-api/octopus.migrator.exe-command-line/import/) commands. The API uses the same [Migrator.exe command line tool](/docs/octopus-rest-api/octopus.migrator.exe-command-line) that you'd typically use to migrate data manually, but the API gives you some additional parameters to orchestrate the process between remote servers.

:::div{.warning}
**Note:** the migration API is **not supported** for migrations from self-hosted Octopus Server to Octopus Cloud currently - please see [migrating from self-hosted to Octopus Cloud](/docs/octopus-cloud/migrations) for information on how to migrate to Octopus Cloud.
:::

## How it works

When you trigger a migration via the API, your Octopus Server will queue up a migration task that you can view from your **Tasks** screen. During execution of this task, your Octopus Server will go into [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode) to try and minimize any data mutations during the migration. When the task is completed, it will be taken out of maintenance mode.

:::div{.warning}
We advise that you only use the migration API under the same conditions that you'd typically do a manual migration, i.e., during a maintenance period when you know that:

1. You're not going to interrupt your daily deployment operations.
1. You'll minimize the chance of data mutations during the migration itself.
1. The versions of your source and destination servers are the same (don't try and export/import between different versions of Octopus).

:::

The typical process for migrating projects between a source and destination server is as follows:

1. Create an API key for your source server (the server you're exporting from).
1. Create an API key for your destination server (the server you're importing to).
1. Get a list of project names that you wish to export from your source server.
1. Call the `partial-export` migration API against your source server, telling it the destination server URL, API key, password for your migration package, and the list of project names you want to export *(You'll receive a 200 response from the API telling you the TaskId that has been queued to do the actual work)*.
1. At this point, your source server's task queue will then execute the `partial-export` command using `Migrator.exe`, package up the contents of your export and push it to your destination server's package feed.
1. Watch your source server's migration task in the Octopus UI to know when this operation is complete ... *Or if you're really keen, you could write a script that queries the task API and it will let you know when the migration task is complete (as seen in the [Octopus.Clients example](#octopusclients-example) below)*.
1. Call the `import` migration API against your destination server, telling it the package and password to import from *(You'll receive a 200 response from the API telling you the TaskId that has been queued to do the actual work)*.
1. Your destination server's task queue will then execute an `import` command using `Migrator.exe`.
1. *At this point, your destination server's task queue will then execute the `import` command using `Migrator.exe`.*

### Spaces

If you are using the Spaces feature of Octopus Deploy on the source server, you should supply the appropriate SpaceID values in the example below. The destination Space cannot be specified; it will match the Source. There are two values to supply:

1. The location to look for the Projects in the source Space.
2. The Space that has the feed we'll be pushing the exported package to.

If you are not using the Spaces feature, you do not need to supply the SpaceID values.

## Troubleshooting

We do our best to log information and warnings to your task logs during a migration. An API migration follows the same path as a manual migration using [Migrator.exe command line tools](/docs/octopus-rest-api/octopus.migrator.exe-command-line/) behind the scenes, so if you are having difficulty running migrations, be sure to check your [task logs](/docs/support/get-the-raw-output-from-a-task) for information that might help.

## Import API

:endpoint{method="POST" path="/api/migrations/import"}

The import API lets you import a migration package from your Octopus Server's built-in package feed (which is where packages are pushed to when using the partial-export API).

**Request Body**

- **`DeletePackageOnCompletion`** :span[boolean]{.type-label}  
  Removes the migration package that you're importing from on successful completion of the import.
- **`FailureCallbackUri`** :span[string]{.type-label}  
  A webhook URL you can add if you wish to be notified on failure of the migration task *(Your Octopus Server will call this URL using a GET request)*.
- **`IsDryRun`** :span[boolean]{.type-label}  
  Do not commit changes, just print what would have happened *(This allows you to test an import without actually committing the transaction)*.
- **`IsEncryptedPackage`** :span[boolean]{.type-label}  
  Tells us whether the package was encrypted *(E.g. if you set `EncryptPackage` on export, you need to set this to `True`)*.
- **`OverwriteExisting`** :span[boolean]{.type-label}  
  If a document with the same name already exists, it will be skipped by default.
- **`PackageFeedSpaceId`** :span[string]{.type-label}  
  If using the Spaces feature, the ID of the Space where the package containing the data to migrate will be uploaded. This is only for the package; the data in the package specifies its own destination Space.
- **`PackageId`** :span[string]{.type-label} *(required)*  
  Package Name/ID that we are importing.
- **`PackageVersion`** :span[string]{.type-label} *(required)*  
  SemVer package version that we are importing. Minimum length 1.
- **`Password`** :span[string]{.type-label} *(required)*  
  Password that was used during the export migration *(This is the shared key between partial-export and import migrations)*. Minimum length 1.
- **`SuccessCallbackUri`** :span[string]{.type-label}  
  A webhook URL you can add if you wish to be notified on successful completion of the migration task *(Your Octopus Server will call this URL using a GET request, appending the `packageId` and `packageVersion` to the URL)*.

:::api-example{label="Request"}
```json
{
  "DeletePackageOnCompletion": false,
  "FailureCallbackUri": "string",
  "IsDryRun": true,
  "IsEncryptedPackage": true,
  "OverwriteExisting": false,
  "PackageFeedSpaceId": "Spaces-1",
  "PackageId": "MyAwesomeOctopusMigration",
  "PackageVersion": "1.0.0",
  "Password": "Demo1234",
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
  This will be populated with the TaskId that gets queued for this migration.

:::api-example{label="Response"}
```json
{
  "DeletePackageOnCompletion": false,
  "FailureCallbackUri": "string",
  "Id": "string",
  "IsDryRun": true,
  "IsEncryptedPackage": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "OverwriteExisting": false,
  "PackageFeedSpaceId": "Spaces-1",
  "PackageId": "MyAwesomeOctopusMigration",
  "PackageVersion": "1.0.0",
  "Password": "string",
  "SuccessCallbackUri": "string",
  "TaskId": "ServerTasks-1234"
}
```
:::

## Partial export API

:endpoint{method="POST" path="/api/migrations/partialexport"}

Using the partial-export API, we can export one or more of our projects and choose to send the package to the destination Octopus Server's package feed.

**Request Body**

- **`DestinationApiKey`** :span[string]{.type-label}  
  The API key of your destination server *(Where you'll be importing this exported package)*.
- **`DestinationPackageFeed`** :span[string]{.type-label}  
  The destination Octopus Server base URL.
- **`DestinationPackageFeedSpaceId`** :span[string]{.type-label}  
  The ID of the Space the Destination Package Feed is located in.
- **`EncryptPackage`** :span[boolean]{.type-label}  
  Encrypt the contents of your migration package *(Uses the `Password` as a shared key so this can be decrypted by your destination server). Defaults to false if not provided*.
- **`FailureCallbackUri`** :span[string]{.type-label}  
  A webhook URL you can add if you wish to be notified on failure of the migration task *(Your Octopus Server will call this URL using a GET request)*.
- **`IgnoreCertificates`** :span[boolean]{.type-label}  
  Excludes certificates from partial export.
- **`IgnoreDeployments`** :span[boolean]{.type-label}  
  Excludes deployments from partial export.
- **`IgnoreMachines`** :span[boolean]{.type-label}  
  Excludes machines from partial export.
- **`IgnoreTenants`** :span[boolean]{.type-label}  
  Excludes tenants from partial export.
- **`IncludeTaskLogs`** :span[boolean]{.type-label}  
  Include the task log folder as part of the export.
- **`PackageId`** :span[string]{.type-label}  
  Package Name/ID for your export *(Defaults to `Octopus.Space.Migration` if not provided)*.
- **`PackageVersion`** :span[string]{.type-label}  
  SemVer package version for your export *(Defaults to `1.0.0-{RandomStringGenerator.Generate(8)}` if not provided)*.
- **`Password`** :span[string]{.type-label} *(required)*  
  Password to encrypt both the migration package and any sensitive values (This is the shared key between partial-export and import migrations). Minimum length 1.
- **`Projects`** :span[array of string]{.type-label} *(required)*  
  Projects to include in the migration.
- **`SpaceId`** :span[string]{.type-label}
- **`SuccessCallbackUri`** :span[string]{.type-label}  
  A webhook URL you can add if you wish to be notified on successful completion of the migration task *(Your Octopus Server will call this URL using a GET request, appending the `packageId` and `packageVersion` to the URL as querystring parameters)*.

:::api-example{label="Request"}
```json
{
  "DestinationApiKey": "API-YOUR-DESTINATION-KEY",
  "DestinationPackageFeed": "https://YOUR_DESTINATION_OCTOPUS_SERVER",
  "DestinationPackageFeedSpaceId": "Spaces-1",
  "EncryptPackage": true,
  "FailureCallbackUri": "string",
  "IgnoreCertificates": false,
  "IgnoreDeployments": false,
  "IgnoreMachines": false,
  "IgnoreTenants": false,
  "IncludeTaskLogs": true,
  "PackageId": "MyAwesomeOctopusMigration",
  "PackageVersion": "1.0.0",
  "Password": "Demo1234",
  "Projects": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
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
  "IgnoreCertificates": false,
  "IgnoreDeployments": false,
  "IgnoreMachines": false,
  "IgnoreTenants": false,
  "IncludeTaskLogs": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PackageId": "MyAwesomeOctopusMigration",
  "PackageVersion": "1.0.0",
  "Password": "string",
  "Projects": [
    "Projects-1"
  ],
  "SpaceId": "Spaces-1",
  "SuccessCallbackUri": "string",
  "TaskId": "ServerTasks-1234"
}
```
:::
