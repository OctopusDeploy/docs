[Getting Started - Variables](https://www.youtube.com/watch?v=Hd71uhcD61E)

Octopus supports variables so that your deployment processes and runbooks can be parameterized. This allows your processes to work across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.

For instance, when you deploy software into your test environment, you may need to provide the connection string for the test database, and when you promote the release to production, you need to provide the connection string for the production database. By assigning the connections strings as variable values and scoping those values to the test and production environments, the same deployment process works for both environments. When the software is deployed to test, the test database is used, and when the software is deployed to production, the production database is used:

| Name | Value | Scope |
| --- | --- | --- |
| database | TestSQLConnectionString | Testing |
| database | ProductionSQLConnectionString | Production |

You can manage the variables for your projects, by navigating to your project in the **Project** tab of the Octopus Web Portal and selecting **Variables**:

![Project variables](/docs/shared-content/concepts/images/variables.png "width=500")
