---
title: Scheduled Project Triggers
description: Automatic deployment triggers allow you to define unattended behavior for your project that will cause an automatic deployment of a release into an environment.
position: 2
---

Scheduled Deployment Triggers were introduced in **Octopus 2018.4**.

Scheduled Deployment Triggers allow you to define an unattended behavior for your [Projects](/docs/deployment-process/projects/index.md) that will cause an automatic deployment of a release based on a defined recurring schedule.

## Schedule

Scheduled deployment triggers provide a way to configure your projects to create, deploy, and promote releases on a defined schedule. This can useful in different scenarios, for instance:

* Run a deployment to clean up your test environments once a day at 9:00pm.
* Run a deployment to health check your services every hour.
* Run a deployment to provision a new test environment at 6:00am, Monday - Friday.
* Run a deployment to promote the latest build from staging to production on the 1st day of the month.
* Run a deployment to perform maintenance on the last Saturday of the month.

## Add a Scheduled Trigger

1. From the Project's Overview page, select **Triggers**, then **{{ADD TRIGGER,Scheduled trigger}}**.
2. Give the trigger a name.
3. Set the Trigger schedule. The options give you control over how frequently the trigger will run and at what time. You can specify the time the trigger should run and a daily scheduled, specific days of the week, or days of the month. You can also use a [CRON expression](#cron-expression) to configure when the trigger will run.
4. Select the action the Trigger should take when executed.
  - **Deploy Latest Release** re-deploys a release or promote a release between environments. You need to specify the **Source Environment** and the **Destination Environment**. The latest successful release in the source environment will be deployed to the destination environment.
  - **Deploy New Release** deploys a new release which will deployed to the environment you specify in the **Destination Environment**.

If you are using [channels](/docs/deployment-process/channels/index.md) you may also select the channel to use when deploying the release. The latest successful deployment for the specified channel and source environment will be deployed to the same channel and destination environment. If no channel is specified, the latest successful release from any channel and source environment will be selected for deployment.

If you are using [tenants](/docs/deployment-patterns/multi-tenant-deployments/index.md) you can select the tenants that will receive a deployment. For each tenant, the latest successful release in the source environment will be deployed to the destination environment. When a tenant is not connected to the source environment, the latest successful release that has been deployed to the source environment and meets the lifecycle requirements for promotion to the destination environment will be deployed.

5. Save the Trigger.

### Using CRON Expression {#cron-expression}

CRON expressions allow you to configure a trigger that will run according to the specific CRON expression.

Example:

`0 0 06 * * Mon-Fri`

Runs at 06:00 AM, Monday through Friday.

:::success
The CRON expression must consist of all 6 fields, there is an optional 7th field for "Year".
:::

| Field name    | Allowed values       | Allowed special characters  | Required |
| ------------- |:-------------------- |:--------------------------- | :------: |
| Seconds       | 0-59                 | * , - /                     | Y        |
| Minutes       | 0-59                 | * , - /                     | Y        |
| Hours         | 0-23                 | * , - /                     | Y        |
| Day of month  | 1-31                 | * , - / ? L W               | Y        |
| Month         | 1-12 or JAN-DEC      | * , - /                     | Y        |
| Day of week   | 0-6 or SUN-SAT       | * , - / ? L #               | Y        |
| Year          | 0001–9999            | * , - /                     | N        |
