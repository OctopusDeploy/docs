---
title: Migration API
description: Octopus includes a migration API that provides the ability to back-up and restore parts of an Octopus Deploy instance remotely.
position: 121
version: "2018.6.0"
---

Octopus includes a migration API that provides the ability to back-up and restore parts of an Octopus Deploy instance remotely (available from version **Octopus 2018.6.0**).

The API currently includes support for both the [partial-export](/docs/api-and-integration/octopus.migrator.exe-command-line/partial-export.md) and [import](/docs/api-and-integration/octopus.migrator.exe-command-line/migrator-import.md) commands. The API uses the same [Migrator.exe command line tool](/docs/api-and-integration/octopus.migrator.exe-command-line/index.md) that you'd typically use to migrate data manually, but the API gives you some additional parameters to orchestrate the process between remote servers.

## How it Works

When you trigger a migration via the API, your Octopus Server will queue up a migration task that you can view from your **Tasks** screen. During execution of this task, your Octopus Server will go into [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode.md) to try and minimize any data mutations during the migration. When the task is completed, it will be taken out of maintenance mode.

:::warning
We advise that you only use the migration API under the same conditions that you'd typically do a manual migration, i.e., during a maintenance period when you know that:

 1. You're not going to interrupt your daily deployment operations.
 1. You'll minimize the chance of data mutations during the migration itself.
 1. The versions of your source and destination servers are the same (don't try and export/import between different versions of Octopus).
:::

The typical process for migrating projects between a source and destination server is as follows:

1. Create an API key for your source server (the server you're exporting from).
1. Create an API key for your destination server (the server you're importing to).
1. Get a list of project names that you wish to export from your source server.
1. Call the `partial-export` migration API against your source server, telling it the destination server URL, API key, password for your migration package, and the list of project names you want to export _(You'll receive a 200 response from the API telling you the TaskId that has been queued to do the actual work)_.
1. At this point, your source server's task queue will then execute the `partial-export` command using `Migrator.exe`, package up the contents of your export and push it to your destination server's package feed.
1. Watch your source server's migration task in the Octopus UI to know when this operation is complete ... _Or if you're really keen, you could write a script that queries the task API and it will let you know when the migration task is complete (as seen in the [Octopus.Clients example](#octopus.clients-example) below)_.
1. Call the `import` migration API against your destination server, telling it the package and password to import from _(You'll receive a 200 response from the API telling you the TaskId that has been queued to do the actual work)_.
1. Your destination server's task queue will then execute an `import` command using `Migrator.exe`.
1. _At this point, your destination server's task queue will then execute the `import` command using `Migrator.exe`._

## Partial Export API

Using the partial-export API, we can export one or more of our projects and choose to send the package to the destination Octopus Server's package feed.

Partial Export API parameters:

| Parameter                      | Description |
|--------------------------------|-------------|
| Password=VALUE | Password to encrypt both the migration package and any sensitive values (This is the shared key between partial-export and import migrations) |
| Projects=VALUE | Projects to include in the migration |
| PackageId=VALUE | [Optional] Package Name/ID for your export _(Defaults to `Octopus.Space.Migration` if not provided)_ |
| PackageVersion=VALUE | [Optional] SemVer package version for your export _(Defaults to `1.0.0-{RandomStringGenerator.Generate(8)}` if not provided)_ |
| IgnoreCertificates | [Optional] Excludes certificates from partial export |
| IgnoreMachines | [Optional] Excludes machines from partial export |
| IgnoreDeployments | [Optional] Excludes deployments from partial export |
| IgnoreTenants | [Optional] Excludes tenants from partial export |
| IncludeTaskLogs | [Optional] Include the task log folder as part of the export |
| EncryptPackage | [Optional] Encrypt the contents of your migration package _(Uses the `Password` as a shared key so this can be decrypted by your destination server)_ |
| DestinationApiKey=VALUE | [Optional] The API key of your destination server _(Where you'll be importing this exported package)_ |
| DestinationPackageFeed=VALUE | [Optional] The destination Octopus Server base URL _(E.g. https://myOctopusServer.com)_ |
| SuccessCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on successful completion of the migration task _(Your Octopus Server will call this URL using a GET request, appending the `packageId` and `packageVersion` to the URL as querystring parameters)_ |
| FailureCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on failure of the migration task _(Your Octopus Server will call this URL using a GET request)_ |
| TaskId | [Response only] This will be populated with the TaskId that gets queued for this migration |

## Import API

The import API lets you import a migration package from your Octopus Server's built-in package feed (which is where packages are pushed to when using the partial-export API).

Import API parameters:

| Parameter                      | Description |
|--------------------------------|-------------|
| Password=VALUE | Password that was used during the export migration _(This is the shared key between partial-export and import migrations)_ |
| PackageId=VALUE | Package Name/ID that we are importing |
| PackageVersion=VALUE | SemVer package version that we are importing |
| IsEncryptedPackage | [Optional] Tells us whether the package was encrypted _(E.g. if you set `EncryptPackage` on export, you need to set this to `True`)_ |
| IsDryRun | [Optional] Do not commit changes, just print what would have happened _(This allows you to test an import without actually committing the transaction)_ |
| OverwriteExisting | [Optional] If a document with the same name already exists, it will be skipped by default |
| DeletePackageOnCompletion | [Optional] Removes the migration package that you're importing from on successful completion of the import |
| SuccessCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on successful completion of the migration task _(Your Octopus Server will call this URL using a GET request, appending the `packageId` and `packageVersion` to the URL)_ |
| FailureCallbackUri=VALUE | [Optional] A webhook URL you can add if you wish to be notified on failure of the migration task _(Your Octopus Server will call this URL using a GET request)_ |
| TaskId | [Response only] This will be populated with the TaskId that gets queued for this migration |

## Examples

### Raw Request

You can trigger a request however you prefer, using curl, Fiddler, or your tool of choice...

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

### Spaces

If you using the Spaces feature of Octopus deploy on either the source or destination server, you should supply the appropriate SpaceId values in the example below. There are 3 values to supply:

 1. The location to look for the Projects in the source Space
 1. The Space where the feed will be used to push the exported package to
 1. The Space where the import will occur

If you are not using the Spaces feature, you can leave supplying SpaceId values.

### Octopus.Clients Example

The [Octopus.Clients library](/docs/api-and-integration/octopus.client.md) can also help you run a migration.

Here's an example showing you how that might look, performing a `partial-export` from a _source server_ and sending it to a _destination server_, then automatically running the associated `import` on the _destination server_:

```
Add-Type -Path 'YOUR_LOCAL_PATH\Octopus.Client.dll'

$sourceOctopusURI = 'https://SOURCE_OCTOPUS_SERVER'
$sourceApikey = 'API-SOURCE_API_KEY'
$destinationOctopusURI = 'https://DESTINATION_OCTOPUS_SERVER'
$destinationApikey = 'API-DESTINATION_API_KEY'

# Spaces related
$sourceSpaceId = 'Spaces-1'
$destinationPackageFeedSpaceId = 'Spaces-1'
$destinationSpaceId = 'Spaces-1'

$migrationPackageId = 'MyAwesomeOctopusMigration'
$migrationPackageVersion = '1.0.0'
$migrationPassword = 'Demo1234'
$isDryRun = $true # Only set this to false when you've reviewed the dry run and are happy to proceed with the migration for realz.

$sourceEndpoint = New-Object Octopus.Client.OctopusServerEndpoint $sourceOctopusURI,$sourceApikey
$sourceRepository = New-Object Octopus.Client.OctopusRepository $sourceEndpoint

$migrationExportResource = new-object Octopus.Client.Model.Migrations.MigrationPartialExportResource
$migrationExportResource.PackageId = $migrationPackageId
$migrationExportResource.PackageVersion = $migrationPackageVersion
$migrationExportResource.Password = $migrationPassword
$migrationExportResource.Projects = @('Rick Project', 'Morty Project')
$migrationExportResource.IgnoreCertificates = $false
$migrationExportResource.IgnoreMachines = $false
$migrationExportResource.IgnoreDeployments = $false
$migrationExportResource.IgnoreTenants = $false
$migrationExportResource.IncludeTaskLogs = $true
$migrationExportResource.EncryptPackage = $true
$migrationExportResource.DestinationPackageFeed = $destinationOctopusURI
$migrationExportResource.DestinationApiKey = $destinationApikey

$migrationExportResource.SpaceId = $sourceSpaceId
$migrationExportResource.DestinationPackageFeedSpaceId = $destinationPackageFeedSpaceId


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
$destinationEndpoint = New-Object Octopus.Client.OctopusServerEndpoint $destinationOctopusURI,$destinationApikey
$destinationRepository = New-Object Octopus.Client.OctopusRepository $destinationEndpoint

$migrationImportResource = new-object Octopus.Client.Model.Migrations.MigrationImportResource
$migrationImportResource.PackageId = $migrationPackageId
$migrationImportResource.PackageVersion = $migrationPackageVersion
$migrationImportResource.Password = $migrationPassword
$migrationImportResource.IsDryRun = $isDryRun
$migrationImportResource.IsEncryptedPackage = $true
$migrationImportResource.SpaceId = $destinationSpaceId
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

We do our best to log information and warnings to your task logs during a migration. An API migration follows the same path as a manual migration using [Migrator.exe command line tools](/docs/api-and-integration/octopus.migrator.exe-command-line/index.md) behind the scenes, so if you are having difficulty running migrations, be sure to check your [task logs](/docs/support/get-the-raw-output-from-a-task.md) for information that might help.
