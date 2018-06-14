---
title: Migration API
description: Octopus includes a migration API that provides the ability to back-up and restore parts of an Octopus Deploy instance remotely.
position: 120
version: "2018.6.0"
---

Octopus includes a migration API that provides the ability to back-up and restore parts of an Octopus Deploy instance remotely (available from version `2018.6.0`).

The API currently includes support for both the [partial-export](/docs/api-and-integration/octopus.migrator.exe-command-line/partial-export.md) and [import](/docs/api-and-integration/octopus.migrator.exe-command-line/migrator-import.md) commands. The API uses the same [Migrator.exe command line tool](/docs/api-and-integration/octopus.migrator.exe-command-line/index.md) that you'd typically use if you were migrating data manually, but gives you some additional parameters to orchestrate the process between remote servers.

## How it works

When you trigger a migration via the API, your Octopus Server will queue up a migration task that you can view from your `Tasks` screen. During execution of this task, your Octopus Server will be put into [maintenance mode](/docs/administration/upgrading/maintenance-mode) to try and minimise any data mutations during the migration. When the task is completed, it will be taken out of maintenance mode.

:::warning
We advise that you only use the migration API under the same conditions that you'd typically do a manual migration. I.e. During a maintenance period when you know that **1)** you're not going to interrupt your daily deployment operations and **2)** you'll minimise the chance of data mutations during the migration itself.
:::

The typical process for migration data between a source and destination server is as follows:

- Create an API key for your source server (where you're exporting from).
- Create an API key for your destination server (where you're importing to).
- Get a list of project names that you wish to export from your source server.
- Call the `partial-export` migration API against your source server, telling it the destination server URL, API key and password for your migration package _(You'll receive a 200 response from the API telling you the TaskId that has been queued to do the actual work)_.
- Your source server's task queue will execute the `partial-export` command using `Migrator.exe`, package up the contents of your export and send to your destination server's package feed.
- Manually watch your source server's migration task to know when this operation is complete ... _Or if you're really keen, you could write a script that queries the task API and to know when the migration task is complete ;)_.
- Call the `import` migration API against your destination server, telling it the package and password to import from _(You'll receive a 200 response from the API telling you the TaskId that has been queued to do the actual work)_.
- Your destination server's task queue will execute an `import` command using `Migrator.exe`.

## Partial Export API

Using the partial-export API, we can export one or more of our projects and choose to send the package to a destination Octopus Server's package feed.

Partial Export API parameters:

| Parameter                      | Description |
|--------------------------------|-------------|
| Password=VALUE | Password to encrypt any sensitive values |
| Projects=VALUE | Project to filter export for |
| PackageId=VALUE | [Optional] Package Name/ID for your export (defaults to `Octopus.Space.Migration` if not provided) |
| PackageVersion=VALUE | [Optional] Semver package version for your export (default to `1.0.0-{RandomStringGenerator.Generate(8)` if not provided) |
| IgnoreCertificates | [Optional] Excludes certificates from partial export |
| IgnoreMachines | [Optional] Excludes machines from partial export |
| IgnoreDeployments | [Optional] Excludes deployments from partial export |
| IgnoreTenants | [Optional] Excludes tenants from partial export |
| IncludeTaskLogs | [Optional] Include the task log folder as part of the export |
| EncryptPackage | [Optional] Encrypt the contents of your migration package (uses the `Password` as a shared key so this can be decrypted by your destination server) |
| DestinationApiKey=VALUE | [Optional] The API key of your destination server (where will you likely be importing this exported package) |
| DestinationPackageFeed=VALUE | [Optional] The desintation Octopus Server base URL (E.g. https://myOctopusServer.com) |
| SuccessCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on successful completion of the migration task (your Octopus Server will call this URL using a GET request, appending the `packageId` and `packageVersion` to the URL) |
| FailureCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on failure of the migration task (your Octopus Server will call this URL using a GET request) |
| TaskId | [Response only] This will be populated with the TaskId that gets queued for this migration |

## Import API

The import API allows you to import a migration package (in your built-in package feed) to your current Octopus Server.

Import API parameters:

| Parameter                      | Description |
|--------------------------------|-------------|
| Password=VALUE | Password that was used during the export migration (this is the shared key between partial-export and import migrations) |
| PackageId=VALUE | Package Name/ID that we are importing |
| PackageVersion=VALUE | Semver package version that we are importing |
| IsEncryptedPackage | [Optional] Tells the import migration whether the package was encrypted (E.g. if you set `EncryptPackage` on export, you need to set this to `True`) |
| IsDryRun | [Optional] Do not commit changes, just print what would have happened. This allows you to test an import without actually committing the transaction |
| OverwriteExisting | [Optional] If a document with the same name already exists, it will be skipped by default |
| DeletePackageOnCompletion | [Optional] Removes the migration package that you're importing from on successful completion of the import |
| SuccessCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on successful completion of the migration task (your Octopus Server will call this URL using a GET request, appending the `packageId` and `packageVersion` to the URL) |
| FailureCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on failure of the migration task (your Octopus Server will call this URL using a GET request) |
| TaskId | [Response only] This will be populated with the TaskId that gets queued for this migration |

### Curl example
```powershell
curl -X POST https://demo.octopus.com/api/packages/raw -H "X-Octopus-ApiKey: API-YOURAPIKEY" -F "data=@Demo.1.0.0.zip"
```
### Octopus.Clients example

