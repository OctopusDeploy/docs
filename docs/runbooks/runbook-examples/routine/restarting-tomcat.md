---
title: Restarting Tomcat
description: With Octopus Deploy you can restart a Tomcat web server as part of a routine operations task.
position: 110
---

There are times when web servers get into a state where they are no longer serving content.  Often in these situations a simple restart of the web server software is all that is required to remedy the situation, letting you get back to a working state while your pour through the logs looking for the cause.  Issuing the restart command is typically done from the server itself, or some type of remote access.  Using a runbook you can provide a self-service method for restarting Tomcat.

## Create the runbook

To create a runbook to restart Tomcat:

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code:

:::info
If Tomcat is running as a Service refer to the following:
- [Linux](/docs/runbooks/runbook-examples/services/restart-linux-service.md)
- [Windows]
:::

Stop Tomcat:
```Linux
/opt/tomcat/apache-tomcat-9.0.37/bin/shutdown.sh
```
```Windows
C:\Program Files\Apache Software Foundation\Tomcat 9.0\bin\shutdown.bat
```

Start Tomcat:
```Linux
/opt/tomcat/apache-tomcat-9.0.37/bin/startup.sh
```
```Windows
C:\Program Files\Apache Software Foundation\Tomcat 9.0\bin\startup.bat
```
