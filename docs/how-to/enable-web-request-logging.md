---
title: Enable web request logging
position: 16
---

:::hint
This feature was added in Octopus 3.0.12.
:::

Octopus can be configured to log HTTP requests to text files, which can be very useful for analyzing usage patterns and detecting performance problems. By default, web request logging is **turned off**. This page explains how to turn the feature on, as well as the format of the logs.

## Log file format and retention {#Enablewebrequestlogging-Logfileformatandretention}

Octopus web request logging uses the [W3C extended log file format](http://www.loganalyzer.net/log-analyzer/w3c-extended.html), the same format that IIS uses. This means that tools which normally work with IIS logs should also be able to work with Octopus logs.

The fields that Octopus logs for each request cannot currently be changed. It will log the URL path, the username of the user making the request, the status code, and the time the request took, which should cover most usage scenarios. Here is an example log file:

```powershell
#Software: Octopus Deploy 1.0.0.0
#Version: 1.0
#Date: 2015-08-10 00:25:21
#Fields: date time cs-method cs-uri-stem s-port cs-username c-ip sc-status time-taken
2015-08-10	00:25:21	GET	/api/dashboard	8065	-		::1	503	46
2015-08-10	00:25:22	GET	/api			8065	admin	::1	200	365
2015-08-10	00:25:23	GET	/api/users/me	8065	admin	::1	200	67
```

Octopus writes to a new log file each day, and keeps up to 7 files. Older logs are automatically deleted.

## Configuring web request logging {#Enablewebrequestlogging-Configuringwebrequestlogging}

Web request logging can be enabled or disabled from the command line, using **Octopus.Server.exe**. A restart of the Octopus server is required for the setting to take effect.

```bash
Octopus.Server.exe configure --requestLoggingEnabled=true
Octopus.Server.exe service --stop --start
```

## Using the logs {#Enablewebrequestlogging-Usingthelogs}

Since Octopus uses the same log file format that IIS uses, tools that work with IIS logs will also work with Octopus web request logs, including:

- [Log Parser](https://www.microsoft.com/en-au/download/details.aspx?id=24659) and [Log Parser Studio](https://gallery.technet.microsoft.com/office/Log-Parser-Studio-cd458765)
- [Splunk](http://www.splunk.com/)
- [LogAnalyzer](http://www.loganalyzer.net/)
- [AWStats](http://www.awstats.org/)
- [WebLogExpert](http://www.weblogexpert.com/info/IISLogs.htm)

Different tools have different uses - WebLogExpert and AWStats can be used to build friendly HTML reports of usage which you can explore. Tools like Splunk can be used to monitor the logs in real time, look for outliers, and configure alerts.

For exploratory analysis of the logs to look for performance issues or trends, the simplest way to consume the log files is with the free [Log Parser Studio](https://gallery.technet.microsoft.com/office/Log-Parser-Studio-cd458765) from Microsoft. It builds on top of the command-line LogParser tool, and lets you perform SQL-like queries over the log data.

1. Download and extract [Log Parser Studio](https://gallery.technet.microsoft.com/office/Log-Parser-Studio-cd458765)
2. Run **LPS.exe** to open the UI
3. Click the button to configure the logs folder to look at
![](/docs/images/3048520/3278330.png "width=500")
4. By default, Octopus logs are written to C:\Octopus\Server\Logs, and have the \*.log extension. 
![](/docs/images/3048520/3278331.png "width=500")
5. The Library tab shows a list of sample scripts that will help you get started. Scroll down to the IIS section - these queries are a good starting point:
![](/docs/images/3048520/3278332.png "width=500")
6. Double-click a view to open it, for example, the "IIS: Top 25 Slow URLs" view. You can then modify the query, or simply execute it. 
![](/docs/images/3048520/3278333.png "width=500")
7. Executing the query will display the results in a grid:
![](/docs/images/3048520/3278334.png "width=500")
