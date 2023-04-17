---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Restarting a Tomcat Web application
description: With Octopus Deploy you can restart a Tomcat web application as part of a routine operations task.
navOrder: 120
---

Restarting a Tomcat app web application requires the user to have the correct permissions.  It is not always feasible to grant access to Tomcat, however, using an Octopus runbook, you don't have to. Octopus Deploy comes with a built-in step with the capability to restart a Tomcat App.  This allows you to provide a self-service method of starting or stopping a Tomcat app without granting any permissions.

## Create the runbook

To create a runbook to restart Tomcat:

1. From your project's overview page, navigate to **{{Operations, Runbooks}}**, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Built-in steps**, and then select the **Start/Stop App in Tomcat** step.
1. Give the step a name.
1. Fill in the parameters of the step:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Tomcat Manage URL | URL of the Tomcat Manager | http://localhost:8080/manager |
| Management user | Name of the management account | tomcat |
| Management password | Password for the management account | MySecretPassword!!! |
| Context path | The relative URL to your application | /myapp |
| Deployment version | Version number of your application | 1.0.0.1 |

The last option under `Advanced Options` is a radio button with two options:
- Leave the application running (default). Note, This option will start the app if in a stopped state.
- Stop the application