---
title: Log files
position: 1
---


Octopus Deploy Server and Tentacles write diagnostic log messages to their local Windows filesystem. The files are rolled periodically to avoid consuming excessive space.

:::success
**Recent Errors**
The most recent warnings and errors can be view on the Configuration -> Diagnostics page
:::

## Finding the log files


When Octopus applications are installed, a "home directory" is chosen - this is usually `C:\Octopus`.


Octopus stores its logs in the `Logs`subdirectory. Three sets of log files may be present: `OctopusServer.txt`, `OctopusTentacle.txt`. Older versions of these files will be stored with numeric suffixes in their names, e.g. the most recent archived server log file will be in `OctopusServer.0.txt`.


When requesting support, send as much log information as possible - the repetitive nature of the files means they usually zip down well.

## Changing log levels


Occasionally it may be necessary to change the logging level of an Octopus application.


First, find the `octopus.server.exe.nlog` file associated with the application. This is usually in a subfolder of the Octopus "Program Files" folder. **Take a backup** of the file before making changes.


The verbosity of file logging is controlled in the `octopus-log-file` section:

```xml
    <logger name="*" minlevel="Info" writeTo="octopus-log-file" />
```


The `minlevel` attribute is most useful for configuring the logging level. Change this value to `Trace` to gather more information.


Restart the associated Octopus process after making changes.

:::warning
**Don&#39;t forget to reset your changes**
Leaving your `minlevel` too low will impact the performance of Octopus Server. We recommend resetting back to the default logging configuration once you have completed your diagnostics session.
:::
