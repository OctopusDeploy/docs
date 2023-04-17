---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Show configuration
description: The Octopus Server show configuration command is used to export Octopus Deploy's current configuration for use with configuration management tools such as Chef, Puppet or Desired State Configuration (DSC).
navOrder: 1700
---

The `show-configuration` command is used to 'export' Octopus Deploy's current configuration.  The intended audience for this command are those using configuration management tools such as Chef, Puppet or Desired State Configuration (DSC).

The [server extensibility](/docs/administration/server-extensibility) functionality was one of the key drivers for the addition of this command.  Most of the configuration settings for the extensions, especially the Authentication Provider related ones, affect all Nodes in the server configuration and as such are stored in the database to avoid inconsistencies between Nodes. 

The knock on effect for this is that the server.config no longer contains a large portion of the settings. This command was added to allow access from scripts.

The command supports the following options:

| Option           | Description                              |
| ---------------- | ---------------------------------------- |
| file             | Exports the server configuration to a file. If not specified, output goes to the console. |
| format           | The format of the export (XML, JSON, JSON-hierarchical). Defaults to XML. |
| noconsolelogging | If specified, all output to the console other than the configuration is suppressed. This is important when using the JSON formats and converting to an object. |

## Format {#ShowConfiguration-Format}

The format option defaults to XML, but also supports two JSON formats.

The first format, JSON, outputs a 'flat' structure that is keyed in the same way the XML file is.  An example of the output is:

```json
{
    "Octopus.Communications.ServicesPort":"10943",
    "Octopus.Storage.NodeName":"NodeA",
    "Octopus.Home":"C:\\Octopus\\Server",
    "Octopus.WebPortal.AutoLoginEnabled":"True"
}
```

The second format, JSON-hierarchical, outputs a hierarchical object structure based on the setting keys. An example of the output is:

```json
{
    "Octopus": {
        "Communications": {
            "ServicesPort":"10943"
        },
        "Storage":{
            "NodeName":"NodeA"
        },
        "Home":"C:\\Octopus\\Server",
        "WebPortal": {
            "AutoLoginEnabled":"True"
        }
    }
}
```

Where this second format really comes into play is in languages such as PowerShell or node.js, as it can be parsed easily into an object structure for use in the script.  An example of how you could use this in PowerShell would be:

```powershell
$config = & .\Octopus.Server.exe show-configuration --format=json-hierarchical --noconsolelogging --console | Out-String | ConvertFrom-Json

if ($config.Octopus.WebPortal.AutoLoginEnabled -eq $FALSE) {
    & Octopus.Server.exe configure --autoLoginEnabled=true --console
}
```

## Extensions {#ShowConfiguration-Extensions}

Some of the values displayed by this command come from the core part of Octopus Server and some come from [server extensions](/docs/administration/server-extensibility/).  Learn about how extensions can [contribute values to the show-configuration](/docs/administration/managing-infrastructure/server-configuration) output.
