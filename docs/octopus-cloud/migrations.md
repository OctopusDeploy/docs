---
title: Migrating between self-hosted and Octopus Cloud
position: 40
description:  Migrating between self-hosted and Octopus Cloud.
---

:::warning
**Warning:** our existing [Migration API](/docs/api-and-integration/migration-api/index.md) is **not supported** for migrations to cloud instances due to configuration differences between On-Premise and Cloud installations.
:::

## Migrating to Octopus Cloud

If you have an existing self-hosted Octopus server, and you want to switch to Octopus Cloud, you may want to migrate all of your existing projects, variables, history, and configuration from your self-hosted instance to your new Octopus Cloud instance. The only way to achieve this is through a full migration, with an entire database backup and restore. This ensures we don't miss any key dependencies.

### How it Works

To get started migrating from self-hosted to cloud, [email our support team](mailto:support@octopus.com) and book a time for the migration to occur. 

### Prepare for the Migration

- Email [support@octopus.com](mailto:support@octopus.com) to book in a mutually convenient time. We'll reply with the specific steps that are involved.
- Upgrade to the [latest LTS version](https://octopus.com/downloads) of Octopus. This will help eliminate any compatibility problems that could occur.
- Schedule two days of possible downtime for your deployments, while we migrate your instance across to the cloud.
- Due to the length of time required to complete the migration, we will only be able to schedule one migration per week. We will let you know the timeframe when you contact support.

## Migrating from Octopus Cloud

If Octopus Cloud is not the right fit for you, and you would like to switch back to hosting Octopus Server on your own infrastructure, we can provide a copy of the data from your instance.

### How it Works

To get started migrating from self-hosted to cloud, [email our support team](mailto:support@octopus.com) and book a time for the migration to occur. 

### Importing the migrated data 

Start by [installing](/docs/installation/index.md) a new Octopus Server. 

Restore the database backup provided by Octopus Support, ensuring that the user account under which the Octopus Service is running has access to the database.

Using the [database](/docs/api-and-integration/octopus.server.exe-command-line/database.md) command, set the connection string and the master key.
`Octopus.Server.exe database --connectionString=<connection string to restored database> --masterKey=<master key provided by Octopus Support>`

From the provided zip file, copy the *task logs*, *artifacts* and *packages* to the corresponding folders under the Octopus Home folder, by default this is `C:\Octopus`.
Update the paths for the *task logs*, *artifacts* and *packages* folders using the [path](/docs/api-and-integration/octopus.server.exe-command-line/path.md) command.

`Octopus.Server.exe path --nugetRepositry=<path to packages folder> --artifacts=<path to artifacts folder> --tasklogs=<path to task logs folder>`

Restart the Octopus Service.

Once you have completed these steps, login to your local instance and check that everythings looks correct. Somethings to take note of:
- Task logs are showing. Ensure that the log is showing correctly for a recent deployment.
- Packages have been indexed correctly. Check that your Package Library contains the packages you expect.
- Tentacles are healthy. 
    The server address has changed so you may need to update the configuration on Polling Tentacles using `Tentacle.exe` or the Tentacle Manager. For Listening Tentacles, you may need to update the Tentacle address in the Deployment Target page.

## Got questions?

If you're unsure of anything, please [email our support team](mailto:support@octopus.com) and ask the question. We're always happy to help, and we can provide more specific information when you are ready to migrate.
