---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Scheduled runbook triggers
description: Scheduled runbook triggers allow you to define unattended behavior for your runbook that will cause an automatic runbook run to environments of your choosing.
navOrder: 40
---

Scheduled runbook triggers allow you to define an unattended behavior for your [runbook](/docs/runbooks) that will cause an automatic runbook run to environments of your choosing.

:::div{.hint}
Only published snapshots can be used to create a scheduled runbook trigger, draft snapshots cannot be used to create a scheduled trigger.
:::

## Schedule

Scheduled runbook triggers provide a way to configure your runbooks to run on a defined schedule. This can useful in different scenarios, for instance:

* Run a database backup at 1:00am every day.
* Run a health check on your service every 30 minutes.
* Run a script to reset a test environment every 3 hours.
* Run a streaming process every minute.
* Run a maintenance script on the last Saturday of the month.
* Run a script to provision more machines on the 1st day of the month and a script to deprovision them at a future date.

## Add a scheduled runbook trigger

1. In a project, select **Operations ➜ Triggers**, then **Add Scheduled trigger**.
2. Give the trigger a name.
3. Select a runbook.
4. Specify the target environments the runbook will run against.
5. Set the trigger schedule. The options give you control over how frequently the trigger will run and at what time. You can schedule a trigger based on either days of the week, or dates of the month. You can also use a [CRON expression](#cron-expression) to configure when the trigger will run.

If you are using [tenants](/docs/tenants) you can select the tenants that the runbook will run against. For each tenant, the published runbook will run against the tenant's environment. 

6. Save the trigger.

:::div{.hint}
All schedule options run based on CRON expressions. The other options provide a convenient way of setting up the schedule without worrying about the syntax. A custom CRON expression provides you with more fine-grained control over the exact schedule.
:::

### Using CRON expressions {#cron-expression}

CRON expressions allow you to configure a trigger that will run according to the specific CRON expression.

Example:

`0 0 06 * * Mon-Fri`

Runs at 06:00 AM, Monday through Friday.

:::div{.success}
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
| Year          | 1970–2099            | * , - /                     | N        |
