---
title: Import
description: Using the Octo.exe command line tool to import items exported from another Octopus Deploy server.
position: 6
---

This command allows you to import items from one Octopus Deploy server into another Octopus Deploy server.

We currently support importing:

- Projects
- Releases

[Usage:](/docs/api-and-integration/octo.exe-command-line/import.md)

```powershell
Usage: Octo import [<options>]
		
Where [<options>] is any of:
--server=VALUE         		The base URL for your Octopus server - e.g., http://your-octopus/
--user=VALUE           		[Optional] Username to use when authenticating with the server.
--pass=VALUE           		[Optional] Password to use when authenticating with the server.
--apiKey=VALUE         		Your API key. Get this from the user profile page.
--configFile=VALUE     		[Optional] Text file of default values, with one 'key = value' per line.
--debug                		[Optional] Enable debug logging
--ignoreSslErrors      		[Optional] Set this flag if your Octopus server uses HTTPS 
							but the certificate is not trusted on this machine. 
							Any certificate errors will be ignored. 
							WARNING: this option may create a security vulnerability.
--enableServiceMessages 	Enable TeamCity service messages when logging.
--type=VALUE           		The Octopus object type to import
--filePath=VALUE       		The full path and name of the exported file
--project=VALUE        		[Optional] The name of the project
```

## Import a project {#Import-Importaproject}

:::hint
**Prerequisites**
Before importing a project you have to ensure that the following exists on the Octopus Deploy server you are importing to:

- The Project Group used by the Project
- The Environments used in the Project
- The Machines used in the Project
- The NuGet feeds used in the Project
- The Library Variable Sets (if any) used in the Project
- Corresponding Lifecycles (including those linked to channels)
:::

The following options are required when importing a project.

**project import options**

```powershell
--type				The type of object to export
--filePath			The full path and name of the export file

```

Usage:

```powershell
octo import --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=project --filePath=C:\path\to\export\file.json
```

### [Project Import Output when a prerequisite is missing](/docs/api-and-integration/octo.exe-command-line/import.md) {#Import-ProjectImportOutputwhenaprerequisiteismissing}

During the import, Octo.exe will validate that any dependencies, such as feeds and library variable sets, already exist on the target server. If one of these can't be found, the import will not continue, as shown below:

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0
	
Handshaking with Octopus server: http://localhost/octopuslive/
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding importer 'project'
Beginning the import
Export file successfully loaded
Checking that all environments exist
Checking that all machines exist
Checking that all NuGet Feeds exist
Checking that all Library Variable Sets exist
Library Variable Set Logging Variables does not exist
Exit code: -1
```

### [Project Import Output](/docs/api-and-integration/octo.exe-command-line/import.md) {#Import-ProjectImportOutput}

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0
	
Handshaking with Octopus server: http://localhost/octopuslive/
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding importer 'project'
Beginning the import
Export file successfully loaded
Checking that all environments exist
Checking that all machines exist
Checking that all NuGet Feeds exist
Checking that all Library Variable Sets exist
Checking that the Project Group exist
Beginning import of project 'OctoFX Rate Service'
Importing Project
Project does not exist, a new project will be created
Importing the Projects Deployment Process
Updating ID of NuGet Feed
Updating IDs of Environments
Updating ID of NuGet Feed
Updating IDs of Environments
Importing the Projects Variable Set
Updating the Environment IDs of the Variables scope
Updating the Environment IDs of the Variables scope
Updating the Environment IDs of the Variables scope
'Password' is a sensitive variable and it's value will be reset to a blank strin
g, once the import has completed you will have to update it's value from the UI
Updating the Environments of the Variable Sets Scope Values
Updating the Machines of the Variable Sets Scope Values
Successfully imported project 'OctoFX Rate Service'
```

## Import a release, or range of releases {#Import-Importarelease,orrangeofreleases}

:::hint
**Prerequisites**
Before importing a release, or range of releases, you have to ensure that the project exists on the Octopus Deploy server you are importing to
:::

The following options are required when importing a release, or a range of releases.

**release import options**

```powershell
--type				The type of object to export
--filePath			The full path and name of the export file
--project			The name of the project to import the release to
```

Usage:

```powershell
octo import --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=release --project=projectname --filePath=C:\path\to\export\file.json
```

### [Release Import Output](/docs/api-and-integration/octo.exe-command-line/import.md) {#Import-ReleaseImportOutput}

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0
	
Handshaking with Octopus server: http://localhost/octopuslive/
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding importer 'release'
Beginning the import
Export file successfully loaded
Importing release '2.7.2067
Creating new release '2.7.2067' for project OctoFX Rate Service
Successfully imported releases for project OctoFX Rate Service
```
