---
title: Project recommendations
description: Projects form a critical element in Octopus Deploy.  Here, we cover some recommendations for projects; getting started on the right foot is vital in helping your Octopus Deploy instance scale.
position: 10
---

We built Octopus Deploy with the core concept of consistency across all environments.  The process used to deploy to your development environment is the same process used to deploy to your production environment. You can disable and enable specific steps, but it is the same process, and therefore the same parts, deployed to development or testing environments, that will make it to production.  The production deployment will be a non-event because you've tested the process many times, once for each environment in the lifecycle before production. 

Knowing the underlying concept of Octopus Deploy is consistency; here are our recommendations.

## Keep Your Projects Simple

One of our favorite programming maxims is the single responsibility principle.  A class/function/method should do one thing, and it should do it well.  The same is true for projects.  Projects should be straightforward and should deploy a component of an application.  

For example, say your project has a Windows Service, a UI, and a database.  The temptation is to create a single project to deploy all three components at the same time.  The project wouldn't be very complicated;   four or five steps if you include a manual intervention.  However, consider this: How often do you deploy a UI change that doesn't require a database change?  What if you could make a small UI fix without having to worry about deploying your database and Windows Service?  What if you could add an index into your database and push that to production without having to worry about deploying your UI or Windows Service?   Think about how much faster you could respond to customer feedback.  

Each component should have its own project.  Unique projects will give you the flexibility to deploy the pieces of your application only when a change has occurred.

## Orchestrating Your Projects

Octopus Deploy provides a mechanism for a [project to call other projects](/docs/projects/coordinating-multiple-projects/index.md).  That feature will allow you to set up an orchestrator to deploy your projects in a specific order.

:::hint
Orchestration will also allow you to isolate your code in your source control repository or have separate builds for each component.  This way, your CI/CD pipeline only has to build and deploy something which changed rather than the entire application.  An added benefit is reducing the build and deployment times.  
:::

## Projects should set up everything required by the steps

Imagine you are working on a greenfield application for six months.  It only exists in your development and testing environments.  Now it is time to deploy to staging.  The web admins have set up a web server running IIS for you using a base image.  The DBAs have created an account for the application to use.  What about the configuration?  What should the database name be?  

When you set up a project's processes, you should work under the assumption the base applications are present (.NET Framework, IIS, SQL Server, WildFly server, Oracle Database, and others).  With that in mind, also assume that those base applications have never been configured for your application.  Assume SQL Server is there, but the database has never been created.  Assume IIS is there, but the web application has never been configured.

When it is time to deploy a project to an environment for the first time, you should only need to verify the servers are there and hit the deploy button.  The project deployment process will take care of the rest.  As a bonus, if a new server is added, you can deploy to that new server without worrying about the configuration.  

## Take Advantage of the Run Conditions

Almost everyone is familiar with the environment [run conditions](/docs/deployment-process/conditions/index.md).  For instance, run a step in production only.  Alternatively, don't run this step in development or testing.  However, there are other [run conditions](/docs/deployment-process/conditions/index.md#run-condition):

 - Only running when the previous step was successful.
 - Only running on failure.
 - Always running.
 - Only run when the value of a variable equals true.  

Those additional conditions are advantageous.  You can configure a step to send a slack notification when a failure occurs.  You could set a manual intervention only to happen if you are deploying during business hours.  You can also configure steps to run in parallel with one another.

These conditions allow you to have a degree of control over your deployments.  

## Every Component's Deployment Should Be Automated

A typical scenario we see is that application deployments are automated, but the database piece is not.  That is still a manual process, which means that a DBA has to run the scripts on the night of deployment to production.  After they finish, the automated process can be kicked off.  Because this is manual, there is a good chance one or more of the scripts were not included in the deployments to dev or testing or staging.  Without prior testing, the likelihood of success goes down, and the deployment time goes up.

Essentially, this great automated process takes a few minutes to finish, but it depends on a manual process that takes anywhere from ten minutes to an hour to complete.  Every component of the application needs to be automated, even the database.  Octopus Deploy integrates with many [database deployment](/docs/deployment-examples/database-deployments/index.md) tools to help with this sort of automation.

## Conclusion

Just like setting up environments, projects form another critical element in Octopus Deploy. Getting them modeled right is very important in helping your Octopus Deploy instance scale. We have talked to customers who have projects with 200+ steps deploying 80+ packages, and each deployment takes well over an hour. That is very prone to error and doesn't scale all that well. Hopefully, with these suggestions, you can avoid a similar setup!