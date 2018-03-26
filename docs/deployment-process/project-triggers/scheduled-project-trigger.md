---
title: Scheduled Project Triggers
description: Automatic deployment triggers allow you to define unattended behavior for your project that will cause an automatic deployment of a release into an environment.
position: 2
version: 2018.4
---

## Scheduled Deployment Triggers

Scheduled Deployment Triggers were introduced in **Octopus Deploy 2018.4**.

Scheduled Deployment Triggers allow you to define an unattended behavior for your [Projects](/docs/deployment-process/projects.md) that will cause an automatic deployment of a release base on a defined recurring schedule.

## Schedule

Scheduled deployment triggers provide a way to configure your projects to create, deploy and promote releases on a defined schedule.
you can define a schedule in the following ways.

### Daily Schedule
The Daily schedule is run every day of the week, it can be configured to run once per day, every x hours or every x minutes.
Examples of when this option would be useful is if you wanted to:
* Run a deployment once a day at 6:00am
* Run a deployment every 2 hours

### Days per week
The Days per week schedule works the same to the daily schedule, however you can also choose the days of the week you want the schedule to run on.

Example:
* Run a deployment at 6:00am, Monday - Friday

### Days per month
The days per month schedule allows you to configure a trigger that will run on a specific date of the month or specific day of week of every month

Example:
* Run a deployment 1st day of the month
* Run a deployment on the 1st Monday of the month.

### Cron expression
Allows you to configure a trigger that will run according to the specific CRON expression.

Example:

`0 0 06 * * Mon-Fri`

Runs at 06:00 AM, Monday through Friday

:::success
The Cron expression must consist of all 6 fields, there is an optional 7th field for "Year".
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

## Action

### Deploy latest release
The deploy latest release action allows you to select an environment in which the latest release in that environment will be deployed.
* **Source Environment**: The latest release in this environment will be used to deploy in the destination environment
* **Destination Environment**: This is the environment that the release will be deployed to.

:::success
If the same environment is selected for both source and destination the latest release in the source environment will be re-deployed to the destination environment, if different environments are selected the latest release in the source environment will be promoted to the destination environment
:::

### Deploy new release
The deploy new release action will create a new release and deploy to the selected environment.

### Handling prompted variables
If your project is configured to use [Prompted variables](/deployment-process/variables/prompted-variables.md) you can supply those variables as part of the Scheduled project trigger. Any variables that are specified in the Variable section on the action will replace existing variables in the project.

:::success
Any variables that are supplied in the variable section will override existing variables in the project with the same name.
:::
