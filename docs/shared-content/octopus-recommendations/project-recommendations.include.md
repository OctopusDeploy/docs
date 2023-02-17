
We built Octopus Deploy with the core concept of consistency across all environments.  The process used to deploy to your development environment is the same process used to deploy to your production environment. You can enable or disable specific steps, but it's the same process, and therefore the same parts, deployed to development or testing environments, that will make it to production.  The production deployment will be a non-event because you've tested the process many times, once for each environment in the lifecycle before production. 

Knowing the underlying concept of Octopus Deploy is consistency; here are our project recommendations.

## Deploy tightly coupled components together

A component is considered tightly coupled when they depend on one another, and any changes made in one impact the others.  For example, consider a web application with a React front-end, a Web API back-end, and PostgreSQL database.  Those components are tightly coupled if adding a column to the database requires changing both the front-end and back-end. Not only that, the front-end and back-end will throw exceptions if the column isn't present in the database.  Tightly coupled components must be deployed in a specific order.

The general rule of thumb to follow is when components are stored in the same source control repo and are built using the same build definition, they should be deployed together.

:::hint
We previously recommended creating a project for each component.  We have found in practice that while it solves a specific problem - you can have a faster deployment when only the front-end or back-end is changed to fix a bug, it generally leads to a higher maintenance overhead of orchestrating multiple projects.  Typically an orchestration project is created because the components must be deployed in a specific order.  We now recommend a single project should be responsible for deploying all the tightly coupled components in an application.
:::

Like any recommendation, we have seen the extreme end of the spectrum, projects with 200+ steps deploying 80+ packages that take over an hour to deploy.  That might be a good candidate to split up into smaller projects.  However, you should ensure components are decoupled before making changes to the deployment process.  Don't change how you deploy the application when components need to be deployed in a specific order, and failure to do so will cause showstopping bugs.  First, focus on decoupling the components, then change how you deploy them.

## Leverage the Project Per Component pattern with decoupled components

We recommend the project per component pattern when those components are decoupled from one another.  Returning to the previous web application example, adding a column to the database can still require changing the back-end and front-end.  However, the back-end and front-end have the appropriate code to continue processing without errors when the column is not present.  And the column isn't required to be populated in the database.

When components are decoupled from one another, they can have different deployment schedules, and do not have to be deployed in a specific order.  That will negate the need for an orchestration project.

:::hint
In practice, it is rare to see the decoupling of all the components in a web application with a front-end, back-end, and database.  It is much more common for functionality, or backend services, to be decoupled.
:::

## Use Lifecycles and Channels to reflect your branching strategies

Most branching strategies follow the "main branch should always be ready to deploy to production" rule.  No changes can be made directly to the main branch.  Instead, work must be done in a branch and merged into main.  Your lifecycles and channels should reflect that rule.

For example, in your Octopus instance you have the following environments.

- Dev
- QA
- Staging
- Production

For most branching strategies, we'd recommend two lifecycles in this example, each with two environments.

- Development Lifecycle
    - Dev
    - QA
- Release Lifecycle
    - Staging
    - Production

The workflow would be as follows:
1. Create a branch, commit some changes.
2. Build is triggered on branch check-in.  It creates a release in Octopus for the Development lifecycle and pushes to Dev.
3. Changes are verified in Dev and are promoted to QA.
4. Full test suite is run in QA.
5. Bugs or changes are found; repeat the previous steps.
6. After a few iterations, the change is ready for Production.
7. Create a pull request and merge into main.
8. Build is triggered on check-in to main.  It creates a release in Octopus for the Release lifecycle and pushes to Staging.
9. Automated tests are run in Staging.
10. Assuming tests pass, promote to Production.  If tests don't pass, then a new branch is created, and this process starts all over.

Octopus Deploy provides the capability for dynamic package / docker image selection.  This allows you to have a different package per environment.  The intended use case is when using a third-party external feed and the feed changes between environments.  The external feed provides the capabilities to "promote" packages ready for deployment.

We don't recommend having a single lifecycle with all environments.  When that happens, we have seen customers create a single release and change the package or package version from QA to Staging.  Such an approach is challenging to audit and track.  

Changes made on feature or short-lived branches are not ready for Production.  They should be deployed to testing environments for verification and testing, but they should never have the chance to make it to Production.  Merging into main should trigger a fresh build because you could be merging multiple changes from different branches for the first time.  The underlying code has changed, and a new build is needed to test and verify.

For the packages / docker containers built from branches, append a pre-release tag to the release version.  Leverage channel version rules to only allow packages / docker containers with a pre-release tag for the Development lifecycle.  At the same time, only allow packages / docker containers **without** a pre-release tag for the release lifecycle.

:::hint
This section is another reason we recommend deploying all tightly coupled components stored in the same source control repository within the same project.  Attempting to coordinate different lifecycles and releases across multiple projects can add aditional overhead, which runs the risk of something needing to be fixed.
:::

## Include everything required to deploy

Imagine you are working on a greenfield application for six months. It only exists in your development and testing environments, now it's time to deploy to staging.  The web admins have set up a web server running IIS for you using a base image.  The DBAs have created an account for the application to use.  What about the configuration?  What should the database name be?  

When you set up a project's processes, work under the assumption the base applications are present (.NET Framework, IIS, SQL Server, WildFly server, Oracle Database, etcs).  With that in mind, also assume that those base applications have never been configured for your application.  Assume SQL Server is there, but the database has never been created.  Assume IIS is there, but the web application has never been configured.

When it is time to deploy a project to an environment for the first time, you should only need to verify the servers are there and hit the deploy button.  The project deployment process will take care of the rest.  As a bonus, if a new server is added, you can deploy to that new server without worrying about the configuration.

## Take advantage of run conditions

Almost everyone is familiar with environment [run conditions](/docs/projects/steps/conditions/index.md).  For instance, run a step in production only.  Alternatively, don't run this step in development or testing.  However, there are other [run conditions](/docs/projects/steps/conditions/index.md#run-condition):

 * Only running when the previous step was successful.
 * Only running on failure.
 * Always running.
 * Only run when the value of a variable equals true.  

Those additional conditions are advantageous.  You can configure a step to send a slack notification when a failure occurs.  You could set a manual intervention only to happen if you are deploying during business hours.  You can also configure steps to run in parallel with one another.

These conditions allow you to have a greater degree of control over your deployments.  

## Automate every component's deployment {#automate-every-components-deployment}

A typical scenario we see is that application deployments are automated, but the database piece is not.  That's still a manual process which means a DBA has to run the scripts on the night of deployment to production.  After they finish, the automated process can be kicked off.  Because this is manual, there's a good chance one or more of the scripts were not included in the deployments to dev, testing or staging.  Without prior testing, the likelihood of success goes down, and the deployment time goes up.

Essentially, this great automated process takes a few minutes to finish, but it depends on a manual process that takes anywhere from ten minutes to an hour to complete.  Every component of the application needs to be automated, even the database.  Octopus Deploy integrates with many [database deployment](/docs/deployments/databases/index.md) tools to help with this sort of automation.

## Conclusion

Just like setting up environments, projects form another critical element in Octopus Deploy. Getting them modeled right is very important in helping your Octopus Deploy instance scale. We've talked to customers who have projects with 200+ steps deploying 80+ packages, and each deployment takes well over an hour. That is very prone to error and doesn't scale all that well. Hopefully, with these suggestions, you can avoid a similar setup!