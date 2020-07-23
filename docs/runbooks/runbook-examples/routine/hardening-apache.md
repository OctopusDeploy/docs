---
title: Hardening Apache
description: With Octopus Deploy you can harden Apache with a runbook as part of a routine operations task.
position: 90
---

It is an unfortunate fact that web servers are under near constant attack.  Whether it's IIS, NGINX, Tomcat, Apache, etc... hackers will do what they can to exploit any vulnerabilities.  As a web server administrator, it's your job to make sure that attack surface is as small as possible and guard yourself against the known attacks as best you can.  Using an Octopus Deploy runbook, you can operationalize the hardening of your Apache web server.

## Create the runbook

To create a runbook to install Tomcat on an Ubuntu machine:

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code:
