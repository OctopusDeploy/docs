---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-07-25
title: Log files
description: Octopus Server and Tentacle logs, log file locations, with information about retention and logging levels.
navOrder: 1
---

Octopus Server and Tentacles write diagnostic log messages to their local Windows filesystem. The files are rolled periodically to avoid consuming excessive space.

:::div{.success}
**Recent Errors**
The most recent warnings and errors can be view on the **Configuration ➜ Diagnostics** page
:::

## Finding the log files for Octopus Server and Tentacle {#Logfiles-Findingthelogfiles}

When Octopus applications are installed, a "home directory" is chosen - this is usually `C:\Octopus`.

Octopus stores its logs in the `Logs` subdirectory. Three sets of log files may be present: `OctopusServer.txt`, `OctopusTentacle.txt`. Older versions of these files will be stored with numeric suffixes in their names, e.g. the most recent archived server log file will be in `OctopusServer.0.txt`.

When requesting support, send as much log information as possible - the repetitive nature of the files means they usually zip down well.

## Changing log retention {#Logfiles-Changinglogretention}

To increase the number of log files Octopus will store, find the `octopus.server.exe.nlog` file associated with the application. This is usually in a subfolder of the Octopus "Program Files" folder. **Take a backup** of the file before making changes.

The retention of the logs is controlled by the `maxArchiveFiles` property, it defaults to 7 and can be increased or decreased. The Octopus process will automatically switch to the new logging level as soon as the file is saved.

:::div{.warning}
**Updates reset the nlog file**
When you use the Octopus installer to update the version of Octopus the `octopus.server.exe.nlog` will be reset to the default values that ship with Octopus.
:::

## Changing log levels for Octopus Server {#Logfiles-Changingloglevels}

Occasionally it may be necessary to change the logging level of an Octopus application.

First, ensure the environment variable `OCTOPUS__Logging__File__LogEventLevel` is set to `Verbose` or any other desired log level.

:::div{.warning}
**A restart of Octopus Server is required**
A server restart is required in order to apply the changes to environment variables.
:::

Then, find the `octopus.server.exe.nlog` file associated with the application. This is usually in a subfolder of the Octopus "Program Files" folder. **Take a backup** of the file before making changes.

The verbosity of file logging is controlled in the `octopus-log-file` section:

```xml
    <logger name="*" minlevel="Info" writeTo="octopus-log-file" />
```

The `minlevel` attribute is most useful for configuring the logging level. Change this value to `Trace` to gather more information.

The Octopus process will automatically switch to the new logging level as soon as the file is saved.

:::div{.warning}
**Don&#39;t forget to reset your changes**
Leaving your `minlevel` too low will impact the performance of Octopus Server. We recommend resetting back to the default logging configuration once you have completed your diagnostics session.
:::

## Customizing log format {#Logfiles-Customizinglogformat}

The format of log entries is controlled by NLog layout variables in the `octopus.server.exe.nlog` file. The default layout is:

```xml
<variable name="normalLayout" value="${longdate}  ${processid:padding=5}  ${threadid:padding=5} ${uppercase:${level}:padding=5}  ${message}${onexception:${newline}${exception:format=ToString}}"/>
```

This produces log entries in the format:

```text
2024-01-15 10:30:45.1234  12345  67890  INFO  Your log message here
```

The layout components are:

- `${longdate}` - Timestamp in `yyyy-MM-dd HH:mm:ss.ffff` format
- `${processid}` - The process ID
- `${threadid}` - The thread ID
- `${level}` - Log level (Trace, Debug, Info, Warn, Error, Fatal)
- `${message}` - The log message
- `${exception}` - Exception details when present

You can customize the layout by modifying the `normalLayout` variable.

### Custom date formats with timezone {#Logfiles-Customdateformats}

The default `${longdate}` renderer does not include timezone information. To include the timezone offset in your timestamps, replace `${longdate}` with a custom `${date}` format:

```xml
<variable name="normalLayout" value="${date:format=yyyy-MM-dd HH\:mm\:ss.ffff zzz}  ${processid:padding=5}  ${threadid:padding=5} ${uppercase:${level}:padding=5}  ${message}${onexception:${newline}${exception:format=ToString}}"/>
```

This produces timestamps like:

```text
2024-01-15 10:30:45.1234 +10:00  12345  67890  INFO  Your log message here
```

Common date format specifiers:

- `zzz` - UTC offset with hours and minutes (e.g., `+10:00`, `-05:00`)
- `zz` - UTC offset with hours only (e.g., `+10`, `-05`)
- `K` - Timezone information in ISO 8601 format

For UTC timestamps instead of local time, use:

```xml
${date:universalTime=true:format=yyyy-MM-dd HH\:mm\:ss.ffff}Z
```

:::div{.hint}
**Note:** Colons in date format strings must be escaped with a backslash (`\:`) because colons are used as parameter delimiters in NLog layout syntax.
::: For example, to include the logger name:

```xml
<variable name="normalLayout" value="${longdate} ${uppercase:${level}:padding=5} [${logger:shortName=true}] ${message}${onexception:${newline}${exception:format=ToString}}"/>
```

For a full list of available layout renderers, see the [NLog documentation](https://nlog-project.org/config/?tab=layout-renderers).

### Preserving custom configuration across upgrades {#Logfiles-Preservingcustomconfiguration}

The default `octopus.server.exe.nlog` file is overwritten when Octopus Server is upgraded. To preserve your customizations:

1. Create a copy of `octopus.server.exe.nlog` in the same directory
2. Rename the copy to `Octopus.Server.exe.user.nlog`
3. Make your changes to the `user.nlog` file
4. Restart Octopus Server

When a `user.nlog` file exists, the server loads it instead of the default configuration. The installer will not overwrite this file during upgrades.

:::div{.warning}
**Keep your custom config in sync**
If you use a custom `user.nlog` file, be aware that future Octopus versions may make changes to the default NLog configuration. After upgrading, compare your custom file with the new default to ensure compatibility.
:::

## Changing log levels for Halibut {#Logfiles-Changingloglevelshalibut}

To change the logging level for Halibut as logged in the Octopus Server, we follow a similar process as described above with a few changes.

First, ensure the environment variable `OCTOPUS__Logging__File__LogEventLevel` is set to `Verbose` or any other desired log level.

Next, change the minimum Halibut log level value by setting the environment variable `OCTOPUS__Logging__Context__Halibut__LogEventLevel` to `Verbose`. This change ensures all logs from Halibut will be processed by Octopus Server.

:::div{.warning}
**A restart of Octopus Server is required**
A server restart is required in order to apply the changes to environment variables.
:::

Then, find the `octopus.server.exe.nlog` file associated with the application. This is usually in a subfolder of the Octopus "Program Files" folder. **Take a backup** of the file before making changes.

The verbosity of file logging is controlled in the `octopus-log-file` section:

```xml
    <logger name="Halibut" minlevel="Info" writeTo="octopus-log-file" />
```

The `minlevel` attribute is most useful for configuring the logging level. Change this value to `Trace` to gather more information.

The Octopus process will automatically switch to the new logging level as soon as the file is saved.

:::div{.warning}
**Don&#39;t forget to reset your changes**
Leaving your `minlevel` too low will impact the performance of Octopus Server. We recommend resetting back to the default logging configuration once you have completed your diagnostics session.
:::

## Changing log levels for Tentacle {#Logfiles-Changingloglevelstentacle}

Occasionally it may be necessary to change the logging level of a Tentacle instance.

First, find the `tentacle.exe.nlog` file associated with the application. This is usually in a subfolder of the Octopus/Tentacle "Program Files" folder. **Take a backup** of the file before making changes.

The verbosity of file logging is controlled in the `octopus-log-file` section:

```xml
    <logger name="*" minlevel="Info" writeTo="octopus-log-file" />
```

The `minlevel` attribute is most useful for configuring the logging level. Change this value to `Trace` to gather more information.

The Tentacle process will automatically switch to the new logging level as soon as the file is saved.

:::div{.warning}
**Don&#39;t forget to reset your changes**
Leaving your `minlevel` too low will impact the performance of Octopus Server. We recommend resetting back to the default logging configuration once you have completed your diagnostics session.
:::
