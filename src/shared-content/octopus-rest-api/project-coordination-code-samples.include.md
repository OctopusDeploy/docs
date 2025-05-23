These samples show how to perform various tasks related to project coordination.

See the [OctopusDeploy-Api](https://github.com/OctopusDeploy/OctopusDeploy-Api) repository for further API documentation and examples using the [raw REST API](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/REST/PowerShell) or Octopus.Client in [C#](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client/Csharp), [PowerShell](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client/PowerShell) or [LINQPad](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client/LINQPad). 

:::div{.success}
These examples use the [Octopus.Client](/docs/octopus-rest-api/octopus.client/) library, see the [Loading in an Octopus Step](/docs/octopus-rest-api/octopus.client/using-client-in-octopus/) section of the [Octopus.Client](/docs/octopus-rest-api/octopus.client) documentation for details on how to load the library from inside Octopus using PowerShell or C# Script steps.
:::

## Querying the current state

The best way to get the current state for one or more projects is to use the Dashboard API, which is also used by the dashboards in the WebUI:

**Octopus.Client**

```csharp
var globalDashboard = repository.Dashboards.GetDashboard().Items;
var projectDashboard = repository.Dashboards.GetDynamicDashboard(projects, environments).Items
```

**PowerShell**

```powershell
$repository.Dashboards.GetDashboard().Items
```

**Http**

```js
 http://localhost/api/dashboard
```

## Viewing recent deployments

The following code returns the deployments started in the last 7 days:

```csharp
var projects = repository.Projects.FindAll().Select(p => p.Id).ToArray();
var environments = repository.Environments.FindAll().Select(e => e.Id).ToArray();
List<DeploymentResource> recentDeployments = new List<DeploymentResource>();
var after = DateTimeOffset.Now.AddDays(-7);
repository.Deployments.Paginate(projects, environments,
	page =>
	 	{
			recentDeployments.AddRange(page.Items.Where(d => d.Created >= after));
			// Deployments are returned most recent first
			return page.Items.All(i => i.Created >= after);
	 	}
 );
```

## Promoting a group of projects

This example finds all the releases that are in UAT but not Production. It then queues them for deployment to Production and waits for them to complete.

```csharp
var environments = repository.Environments.GetAll();
var testEnvId = environments.First(e => e.Name == "UAT").Id;
var prodEnvId = environments.First(e => e.Name == "Prod").Id;
var current = repository.Dashboards.GetDashboard().Items;
var toBePromoted = from d in current
				   where d.EnvironmentId == testEnvId && d.State == TaskState.Success
				   let prod = current.FirstOrDefault(p => p.EnvironmentId == prodEnvId && p.ProjectId == d.ProjectId && p.TenantId == d.TenantId)
				   where prod == null || prod.ReleaseId != d.ReleaseId
				   select new DeploymentResource
				   {
					   ProjectId = d.ProjectId,
					   ReleaseId = d.ReleaseId,
					   ChannelId = d.ChannelId,
					   TenantId = d.TenantId,
					   EnvironmentId = prodEnvId
				   };
var tasks = toBePromoted
						.Select(d => repository.Deployments.Create(d))
						.Select(d => repository.Tasks.Get(d.TaskId))
						.ToArray();
repository.Tasks.WaitForCompletion(tasks, timeoutAfterMinutes: 0);
var completed = repository.Tasks.Get(tasks.Select(t => t.Id).ToArray());
if(completed.Any(c => c.State != TaskState.Success))
	throw new Exception("One or more projects did not complete successfully");
```

## Queuing a project to run later

This example re-queues the currently executing project at 3am the next day.

```csharp
var releaseId = OctopusParameters["Octopus.Web.ReleaseLink"].Split('/').Last();
var tomorrow3amServerTime = new DateTimeOffset(DateTimeOffset.Now.Date, DateTimeOffset.Now.Offset).AddDays(1).AddHours(3);
repository.Deployments.Create(
    new DeploymentResource()
    {
        ReleaseId = releaseId,
    	ProjectId = OctopusParameters["Octopus.Project.Id"],
    	ChannelId = OctopusParameters["Octopus.Release.Channel.Id"],
    	EnvironmentId = OctopusParameters["Octopus.Environment.Id"],
    	QueueTime = tomorrow3amServerTime
    }
);
Console.WriteLine($"Queued for {tomorrow3amServerTime}");
```

## Failing a deployment if another deployment is running

This example uses the dynamic dashboard API to check whether a different project is currently deploying to the same environment. Note that Octopus [restricts](/docs/administration/managing-infrastructure/run-multiple-processes-on-a-target-simultaneously) what can run at the same time already.

```csharp
var otherProject = repository.Projects.FindByName("Other Project");
var environmentId = OctopusParameters["Octopus.Environment.Id"];
var dash = repository.Dashboards.GetDynamicDashboard(new[] { otherProject.Id }, new[] { environmentId });
if (dash.Items.Any(i => i.State == TaskState.Queued || i.State == TaskState.Executing))
	throw new Exception($"{otherProject.Name} is currently queued or executing");
```

## Failing a deployment if a dependency is not deployed

This example retrieves the last release to the same environment of a different project and fails if it is not the expected release version.

```csharp
var requiredVersion = OctopusParameters["OtherProjectRequiredVersion"];
var otherProject = repository.Projects.FindByName("Other Project");
var environmentId = OctopusParameters["Octopus.Environment.Id"];
var dash = repository.Dashboards.GetDynamicDashboard(new[] { otherProject.Id }, new[] { environmentId });
var last = dash.Items.SingleOrDefault(i => i.IsCurrent);
if (last == null || last.ReleaseVersion != requiredVersion)
	throw new Exception($"This project requires version {requiredVersion} of {otherProject.Name} to be deployed to the same environment");
```

## Triggering and waiting for another project

This example finds the latest release for a different project and deploys it if it is not currently deployed to the environment.

```csharp
var environmentId = OctopusParameters["Octopus.Environment.Id"];
var otherProject = repository.Projects.FindByName("Other Project");
var latestRelease = repository.Projects.GetReleases(otherProject).Items.FirstOrDefault();
var dash = repository.Dashboards.GetDynamicDashboard(new[] { otherProject.Id }, new[] { environmentId });
var last = dash.Items.Single(i => i.IsCurrent);
if (latestRelease != null && last.ReleaseId != latestRelease.Id)
{
	var deployment = repository.Deployments.Create(
		new DeploymentResource()
		{
			ReleaseId = latestRelease.Id,
			ProjectId = latestRelease.ProjectId,
			ChannelId = latestRelease.ChannelId,
			EnvironmentId = environmentId,
		}
	);
	var task = repository.Tasks.Get(deployment.TaskId);
	repository.Tasks.WaitForCompletion(task);
}
```

## Waiting for another project to reach a certain stage

This example builds on the previous, by waiting until a particular step is complete instead of the whole task.

```csharp
// instead of the line repository.Tasks.WaitForCompletion(task);
ActivityStatus step1Status = ActivityStatus.Pending;
do
{
	Thread.Sleep(1000);
	var details = repository.Tasks.GetDetails(task);
	var log = details.ActivityLogs.Single();
	if (log.Status != ActivityStatus.Pending)
		step1Status = log.Children.Single(c => c.Name.StartsWith("Step 1:")).Status;
	step1Status.Dump();
} while (step1Status == ActivityStatus.Pending || step1Status == ActivityStatus.Running);
task = repository.Tasks.Refresh(task);
```
