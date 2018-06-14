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

## Examples

### Raw request

You could trigger a request however you prefer, using curl or Fiddler...

#### Partial Export

```text
Request Method: POST
Request URL: https://YOUR_SOURCE_OCTOPUS_SERVER/api/migrations/partialexport
Request Headers:
- Content-Type: application/json
- X-Octopus-ApiKey: API-YOUR_SOURCE_API_KEY
Request Body:
{
    "PackageId": "MyAwesomeOctopusMigration",
    "PackageVersion": "1.0.0",
    "Password": "Demo1234",
    "Projects": ["Rick Project", "Morty Project"],
    "EncryptPackage": true,
    "IncludeTaskLogs": true,
	"DestinationApiKey": "API-YOUR_DESTINATION_API_KEY",
	"DestinationPackageFeed": "https://YOUR_DESTINATION_OCTOPUS_SERVER"
}
```

#### Import

```
Request Method: POST
Request URL: https://YOUR_DESTINATION_OCTOPUS_SERVER/api/migrations/import
Request Headers:
- Content-Type: application/json
- X-Octopus-ApiKey: API-YOUR_DESTINATION_OCTOPUS_SERVER
Request Body:
{
    "PackageId": "MyAwesomeOctopusMigration",
    "PackageVersion": "1.0.0",
    "Password": "Demo1234",
    "IsDryRun": "true", // Only set this to false when you've reviewed the dry run and are happy to proceed with the migration for realz.
    "IsEncryptedPackage": true,
}
```

### Octopus.Clients example

The [Octopus.Clients library](/docs/api-and-integration/octopus.client/index.md) can also help you run a migration.

An example of what something like that might look like, end-to-end:

```
Add-Type -Path 'C:\Development\OctopusClients\source\Octopus.Client\bin\Debug\net45\Octopus.Client.dll'

$sourceApikey = 'API-YOUR_SOURCE_API_KEY'
$sourceOctopusURI = 'http://YOUR_SOURCE_OCTOPUS_SERVER'
$sourceEndpoint = New-Object Octopus.Client.OctopusServerEndpoint $sourceOctopusURI,$sourceApikey
$sourceRepository = New-Object Octopus.Client.OctopusRepository $sourceEndpoint

$migrationExportResource = new-object Octopus.Client.Model.Migrations.MigrationPartialExportResource
$migrationExportResource.PackageId = 'MyAwesomeOctopusMigration'
$migrationExportResource.PackageVersion = '1.0.0'
$migrationExportResource.Password = 'Demo1234'
$migrationExportResource.Projects = @('Rick Project', 'Morty Project')
$migrationExportResource.IgnoreCertificates = $false
$migrationExportResource.IgnoreMachines = $false
$migrationExportResource.IgnoreDeployments = $false
$migrationExportResource.IgnoreTenants = $false
$migrationExportResource.IncludeTaskLogs = $true
$migrationExportResource.EncryptPackage = $true
$migrationExportResource.DestinationPackageFeed = 'http://YOUR_DESTINATION_API_KEY';
$migrationExportResource.DestinationApiKey = 'API-YOUR_DESTINATION_API_KEY'

$migrationExportResource = $sourceRepository.Migrations.PartialExport($migrationExportResource)

Write-Host("Export task queued: $($migrationExportResource.TaskId)")
$migrationExportTask = $sourceRepository.Tasks.Get($migrationExportResource.TaskId);
if ($migrationExportTask -eq $null) {
    Write-Host ("Export failed. You'll need to investigate.")
    Exit
}

# Now we can poll this migration task to know when our export is complete #ScriptingFTW
Write-Host("Export task: $($migrationExportTask.Id)")
while($migrationExportTask -and ($migrationExportTask.State -eq 'Queued' -or $migrationExportTask.State -eq 'Executing' -or $migrationExportTask.State -eq 'Cancelling')){
    Write-Host("Export task status: $($migrationExportTask.State). Re-checking in 5 seconds...")
    start-sleep -s 5
    $migrationExportTask = $sourceRepository.Tasks.Get($migrationExportTask.Id);
}
Write-Host("Export task completed: $($migrationExportTask.State)")

if ($migrationExportTask.State -ne 'Success' -or $migrationExportTask.HasWarningsOrErrors -eq $true) {
    Write-Host ("Export failed or has warnings/errors. You'll need to investigate.")
    Exit
}

# From here, we can proceed with an import on our destination server.
$destinationApikey = 'API-YOUR_DESTINATION_API_KEY'
$destinationOctopusURI = 'http://YOUR_DESTINATION_OCTOPUS_SERVER'
$destinationEndpoint = New-Object Octopus.Client.OctopusServerEndpoint $destinationOctopusURI,$destinationApikey
$destinationRepository = New-Object Octopus.Client.OctopusRepository $destinationEndpoint

$migrationImportResource = new-object Octopus.Client.Model.Migrations.MigrationImportResource
$migrationImportResource.PackageId = 'MyAwesomeOctopusMigration'
$migrationImportResource.PackageVersion = '1.0.0'
$migrationImportResource.Password = 'Demo1234'
$migrationImportResource.IsDryRun = $true # Only set this to false when you've reviewed the dry run and are happy to proceed with the migration for realz.
$migrationImportResource.IsEncryptedPackage = $true
$migrationImportResource.DeletePackageOnCompletion = $true # May as well clean up after ourselves.

$migrationImportResource = $destinationRepository.Migrations.Import($migrationImportResource)

Write-Host("Import task queued: $($migrationExportResource.TaskId)")
$migrationImportTask = $destinationRepository.Tasks.Get($migrationImportResource.TaskId);
if ($migrationImportTask -eq $null) {
    Write-Host ("Import failed. You'll need to investigate.")
    Exit
}

# Now we can poll this migration task to know when our import is complete.
Write-Host("Import task: $($migrationImportTask.Id)")
while($migrationImportTask -and ($migrationImportTask.State -eq 'Queued' -or $migrationImportTask.State -eq 'Executing' -or $migrationImportTask.State -eq 'Cancelling')){
    Write-Host("Import task status: $($migrationImportTask.State). Re-checking in 5 seconds...")
    start-sleep -s 5
    $migrationImportTask = $destinationRepository.Tasks.Get($migrationImportTask.Id);
}
Write-Host("Import task completed: $($migrationImportTask.State)")

if ($migrationImportTask.State -ne 'Success' -or $migrationImportTask.HasWarningsOrErrors -eq $true) {
    Write-Host ("Import failed or has warnings/errors. You'll need to investigate.")
    Exit
}

Write-Host ("Migration complete, #GreatSuccess")
```

## Troubleshooting

We do our best to log information and warnings to your task logs during a migration. An API migration follows the same path as a manual migration using [Migrator.exe command line tools](/docs/api-and-integration/octopus.migrator.exe-command-line/index.md) behind the scenes, so if you are having difficulty running migrations, be sure to check your [task logs](/docs/how-to/get-the-raw-output-from-a-task/index.md) for information that might help.
