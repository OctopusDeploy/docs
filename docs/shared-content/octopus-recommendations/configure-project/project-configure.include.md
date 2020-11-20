
## Setting Up the Project

Let's configure a project using our recommended principles.  We are going to be deploying a sample application called **OctoFX**.  It is a small ASP.NET application with a database and a user interface.  When we've completed this setup, we will have three projects:

* One project will deploy the UI
* Another project will deploy the database
* An orchestrator project will coordinate those deployments.

First, let's get the project scaffolding in place.  Start by creating a project group called **OctoFx**.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-projectgroupcreation.png)

:::hint
Project groups are a great way to organize your deployment projects.  They have many uses; not only do they visually separate the projects, but you can also configure the dashboard to hide/show specific project groups and configure permissions to restrict access to them.
:::

That group looks a little empty.  Let's add in the three projects we discussed earlier.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-projectgrouppopulated.png)

:::hint
Adding an image to your project is a useful way to set them apart from other projects visually.  In addition to supporting .jpg and .png files, we also support .gif files; this means you can have an animated icon to add a little flair to your Octopus Deploy instance!
:::

### Sharing Variables Between Projects

We have the three projects set up, but we need to share some common variables between them.  The SQL Server that we are deploying or connecting to, the database name and the application name are variables that come to mind right away.  To accomplish this, we are going to create a library set for this specific application.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-projectlibraryset.png)

:::hint
A project can reference 0 to N number of library sets.  Variable naming is significant.  A good practice is to use a NameSpace style syntax on naming, `[LibrarySetName].[ComponentName].[SubName]`.  Project variables can then be called `[Project].[ComponentName].[SubName]`.  Detailed variable names give you the ability to distinguish in the project steps, and task logs those from a library set and those from the project.
:::

It is also good to have a couple of other library variable sets to handle some non-project specific values.  For example, a global library set that stores any infrastructure as code, or IaC, variables.  The same naming convention applies as the project-specific variable set, for example, replacing **OctoFx** with **Global**.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-globalvariables.png)

### OctoFX-Database Project

The first project we are going to configure is the **OctoFX-Database** project.  If we follow the recommendations from earlier in this guide, we will assume that the SQL Server is running, but this database and the required user do not exist.  We will have steps to check to see if the database and the user for the environment exist.  If they don't exist, then we will need to create them.  Also, we want to build some trust in the process; we can do this by having a manual intervention for a DBA to approve.

Before adding steps to the process, we need to add a reference to the library variable sets we created earlier.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-databasevariablesets.png)

Next, we are going to add the manual intervention step for the DBAs to approve.  If you are configuring a fresh instance of Octopus Deploy, you may not have had the chance to configure a DBA team yet; that is okay. For now, just put in Octopus Administrators or a team that already exists.  We will configure teams in a later chapter.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-dbaapprovaldatabase.png)

:::hint
This project deploys a database package using DBUp, a free database deployment tool.  Some tools provide the ability to generate a difference report before deployments, Octopus can store this report as an artifact, and a DBA can download and review.  In that case, it makes more sense to have the manual intervention occur after that report has been generated.
:::

Many community step templates have been created to help with some of this database scaffolding.  We will use the **SQL - Create Database If Not Exists** step template to create the database if it doesn't exist.  We are going to use variables from the library sets we brought in previously.  For now, we are going to execute this script on a Tentacle with the role `OctoFX-DB.`  Later in this guide, we will convert this to use workers.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-createdatabaseifnotexists.png)

There are few more maintenance tasks to add, such as creating the SQL Login if it doesn't exist, assigning that user to the database, and assigning them to a role.  Keep in mind, all of the steps being added are occurring before an actual deployment happens.  Without even doing a deployment, we have added in five steps to deploy the database.  Imagine if this project also deploys a website, a Windows Service, and other components.  The project would become very hard to manage.  

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-databaseprojectbeforedeployment.png)

Now we are ready to configure the database deployment.  As you most likely learned, when creating a PoC or other deployment projects, you need to package up the database into either a NuGet or a Zip file.  So far, in this guide, we haven't configured anything to push the packages to Octopus Deploy's internal package feed for it to deploy.  However, the deploy a package step requires us to specify a package.  The way we will short-circuit this chicken/egg scenario is by using variables.  In a later chapter, we will worry about getting the packages uploaded, but we just want to set a variable for now.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-dbprojectvariablepackage.png)

:::hint
Using a variable to reference a package also makes it easier to clone this project to use with another application.
:::

Now that we have our package referenced as a variable, we can add the step to deploy the package and run the scripts on the database.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-referencepackageasvariable.png)

Finally, the database deployment process is complete.  The process is relatively simple; there might be some more approvals or additional steps you want to add.  Again, the idea is to keep all the database deployment work in this specific project.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-finaldatabaseprocess.png)

Don't spend too much time on the actual steps in the process.  The major takeaways from this are that the database project is responsible for everything required to create, configure, and deploy a database.  You might be using a different tool (like Redgate or RoundhousE) to do your deployments, which include some additional features.

### OctoFX-WebUI Project

Now it is time to move onto deploying the UI.  Unlike the previous section, we will not walk through all the necessary steps you need to configure your project.  We will follow the same rules as before; the project will do all the work required to deploy the web application as if it were for the first time.  

That being said, do not forget to reference the variable sets in this particular project, just like you did with the database deployment project.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-weblibrarysets.png)

Below is the process we put together to deploy the web application.  First, it gets approval from the web admins to do the deployment; then, it will do a rolling deploy across all the machines.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-webapplicationprocess.png)

The rolling deployment is set by by clicking on "CONFIGURE A ROLLING DEPLOYMENT"

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-rollingdeployments1.png)

You will then see the **Rolling Deployment** section, where you can set the window size for the rolling deployment.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-rollingdeployments2.png)

:::hint 
Take a look at our documentation on how to [configure a rolling deployment](/docs/deployment-patterns/rolling-deployments.md).
:::

Just like with the database project, do not get too hung up on the steps.  We are not saying you need to do these steps to deploy a web application.  We just wanted to show you how we would configure a simple IIS web application deployment.  The most important thing to take away from this section is the **WebUI** project is only concerned with deploying the **WebUI**, and it will work if it is the first time, the 10th time, or the 1000th time deploying to a machine.  

### OctoFX-TrafficCop Project

The traffic cop project is the coordinator.  It knows the order to invoke the **OctoFX-Database** and **OctoFX-WebUI** projects.  This project is useful for times when the entire **OctoFX** application needs to be deployed.  This way, you can still have a single project to schedule and deploy later.

We have added manual interventions to the Database and **OctoFX-WebUI** projects.  It makes sense to have them if you are deploying the database or you are just deploying the UI.  It doesn't make a whole lot of sense to get approval for a web UI deployment after the database has been deployed.  In an ideal world, those approvals would come before the deployments even started, which we will do.  

First, we need to add a couple of variables to the **OctoFX-Database** project. 

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-deployareleasedatabaseprojectvariables.png)

Next, we want to set the run condition on the manual intervention to look at the `Project.Approval.ManualInterventionRequired` variable.  If it is set to `true`, that step will run, and if it is set to `false`, it will skip that step.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-deployareleasedatabasemanualintervention.png)

Let's repeat the same thing for the **OctoFX-WebUI**  project; add the project variables `Project.Approval.ExternalApprover` and `Project.Approval.ManualInterventionRequired`, and the run condition on the manual intervention step.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-deployareleasemanualinterventionweb.png)

Now we can configure the traffic cop project.  First, add in the same library sets as the other two projects.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-trafficcopvariableset.png)

Next, we need to add in the manual interventions.  If you look closely at the screenshot, you will see this new icon appear in the process.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-deployareleasemanualintervention.png)

That new icon appears because the start trigger has been configured to be parallel to the previous step.  This means you won't have to wait for a DBA to approve before the web admin approves it.  The web admin can authorize the deployment, and then the DBA.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-manualinterventionparallel.png)

Now we can add in a deploy a release step for the **OctoFX-Database** project.  Make a note of the variable being sent in.  In this case, it is set to false.  That means the manual intervention on the database project will be skipped (because it has already been approved by the time it gets here).

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-deploydatabaserelease.png)

Now we can repeat the same thing for the **OctoFX-WebUI** project.

![]/docs/shared-content/octopus-recommendations/configure-project/images/configurationproject-deployareleaseweb.png)

The final process for this example will look like this.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-trafficcopprocess.png)

In a typical CI/CD setup, the database and web UI projects will automatically be deployed to the development environment by the build server.  When should the traffic cop project come into the mix?  Not every database and web UI release will be promoted to a test environment.  Moreover, you won't be deploying both projects all the time, only some of the time.  If the application were using something like Entity Framework without any stored procedures, then it could be entirely possible to have web UI changes, even for a major release.  

Because of that, a unique lifecycle should be created for the traffic cop projects.  This lifecycle will skip the **Development** environment and start at **Test**.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-trafficcoplifecycle.png)

To change the default lifecycle for the project, you go to the process screen and click the `Change` button next to the lifecycle.  

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-changetrafficcoplifecycle.png)

Now the default lifecycle for the project will be the **Traffic Cop Lifecycle**.

![]/docs/shared-content/octopus-recommendations/configure-project/images/projectconfiguration-trafficcopnewprocess.png)

This section's important takeaway is not necessarily the individual steps, but rather, some of the core concepts.  We have a project which can coordinate the releases of other projects.  Also, the approvals are before the first deployment occurs.  Finally, we can have multiple approvals occur at the same time.  

## Conclusion

We had to cover quite a bit with this chapter; it was only about setting up projects!  Just like setting up environments, projects form another critical element in Octopus Deploy.  Getting them started on the right foot is very important in helping your Octopus Deploy instance scale.  We have talked to customers who have projects with 200+ steps deploying 80+ packages, and each deployment takes well over an hour.  That is very prone to error and doesn't scale all that well.  Hopefully, with these suggestions, you can avoid a similar setup!