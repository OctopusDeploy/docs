---
title: Scheduled Deployments
position: 21
---


Deployments now have the option to be scheduled in advance with the Scheduled Deployments feature available with Octopus Server 2.5.

## Setting a Deployment to run Later {#ScheduledDeployments-SettingaDeploymenttorunLater}


When creating a deployment for a release, you have the option to run the deployment now or later. When choosing later you then can set a date and a time to schedule when the release will run.


Deployments can only be scheduled up to 14 days in advance. Simply choose a date and time in the future after selecting the Later option.


![](/docs/images/3048078/5866224.png "width=500")


As of Octopus Server version 3.7.13 you may select a time after which the deployment will time out (prior to 3.7.13 this was always 30 minutes after the scheduled start date).  If the Octopus Server can not process the scheduled deployment between the scheduled start time and the expiry time it will cancel the deployment and mark it as timed out.


The deployment then becomes queued to run at the time that has been selected.


![](/docs/images/3048078/3277642.png "width=500")


You will also see the deployment listed as Queued on your tasks page, dashboard and project page.


![](/docs/images/3048078/3277641.png "width=500")

## Scheduled Deployments and Octo.exe Command Line {#ScheduledDeployments-ScheduledDeploymentsandOcto.exeCommandLine}


For everyone using the [command line tool Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) we have not forgotten about you! You can now use the following option:

```powershell
octo deploy-release --deployAt="2014-07-12 17:54:00 +11:00" --project=HelloWorld --releaseNumber=1.0.0 --deployto=Production --server=http://octopus/api --apiKey=ABCDEF123456
```
