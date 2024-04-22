---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-04-22
title: Automatically tracking third party helm charts
description: External feed triggers allow you to automatically create a new release as a result of new container images or helm charts being pushed to their respective repositories.
navOrder: 12
---

With a growing number of applications being provided with Helm charts as a primary method of installation, often all that needs to be done is a `helm install` against your cluster and you're up and running!

However managing updates can be a more involved process. Not only do you need to know when a new release is available, but you also need to have someone with credentials to run the `helm upgrade` against your cluster. Meaning you'll either need to share important credentials among everyone performing updates or have only a few people busy performing these updates.

Octopus Deploy provides a full workflow to manage updates, either hands on or fully hands off.

### Setting up the project

A Helm chart deployment like this is simple with Octopus Deploy.

1. Start with the **Deploy a Helm chart** step
2. Link it to the required Kubernetes clusters via target tags
3. Reference the desired Helm chart
4. Configure the namespace and any values required for your application

:::figure
![Helm chart deployment process](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-deployment-process.png)
:::

Sample OCL for version controlled projects:

```ocl
step "deploy-ingress-nginx-helm-chart" {
    name = "Deploy Ingress Nginx Helm Chart"
    properties = {
        Octopus.Action.TargetRoles = "kind"
    }

    action {
        action_type = "Octopus.HelmChartUpgrade"
        properties = {
            Octopus.Action.Helm.ClientVersion = "V3"
            Octopus.Action.Helm.Namespace = "nginx-local"
            Octopus.Action.Helm.ReleaseName = "ingress-nginx"
            Octopus.Action.Helm.ResetValues = "True"
            Octopus.Action.Package.DownloadOnTentacle = "False"
            Octopus.Action.Package.FeedId = "ingress-nginx"
            Octopus.Action.Package.PackageId = "ingress-nginx"
        }

        packages {
            acquisition_location = "Server"
            feed = "ingress-nginx"
            package_id = "ingress-nginx"
            properties = {
                SelectionMode = "immediate"
            }
        }
    }
}
```

### Helpful settings

By default, Octopus will start versioning releases from `0.0.1` and count up patch versions from there. That's not particularly useful when we already have a meaningful version number attached to the Helm chart.

Let's change our releases to track the Helm chart version by heading to the project settings and changing the release versioning rule to use the version number from our deployment step.

:::figure
![Change release versioning](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-versioning-rule.png)
:::

Sample OCL for version controlled projects:

```ocl
versioning_strategy {
    donor_package {
        step = "deploy-ingress-nginx-helm-chart"
    }
}
```

### Creating the trigger

Triggers can be created directly from the deployment process by clicking the **Create a trigger** link, or by navigating to the **Triggers** page and clicking **Add Trigger**.

Enter a name and a select which images you'd like to watch for updates.
In our case our Default channel has a lifecycle that will automatically deploy to our Development environment for testing, but we'll touch more on that later.

:::figure
![Helm chart create trigger](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-create-trigger.png)
:::

Once the trigger is created, we can now watch the triggers execution history. Within a couple of minutes you'll see your very first release created!

:::figure
![Helm chart trigger history](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-trigger-history.png)
:::

### Automatic deployment strategies

Heading back to the project dashboard, we can see our release is not only created but successfully deployed to our cluster as well.

:::figure
![Helm chart deployed release](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-deployed-release.png)
:::

But what if we only had a production environment? We might be a bit more careful with deploying updates the moment they are released. We can control this with channels and lifecycles.

First we'll need a new lifecycle, which we'll call Production.

:::figure
![Helm chart production lifecycle](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-production-lifecycle.png)
:::

And then we'll need to create a channel in our project that uses this lifecycle.

:::figure
![Helm chart production channel](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-production-channel.png)
:::

Finally, back in our trigger, we can change the channel to be Production instead.

:::figure
![Helm chart trigger production channel](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-trigger-production-channel.png)
:::

Now new releases will remain undeployed until someone has time to manually review the changes and click **Deploy**.

:::figure
![Helm chart undeployed release](/docs/projects/project-triggers/external-feed-triggers/use-cases/helm-chart-undeployed-release.png)
:::

These are two simple cases, check out our [environment recommendations](/docs/infrastructure/environments/environment-recommendations) for more information on what's possible.

#### Getting notified about new releases

It's all well and good to have a list of releases created and waiting to be deployed, but not very useful if no one knows about it.

Octopus deploy offers a quick and easy notification service through [subscriptions](/docs/administration/managing-infrastructure/subscriptions) that allow you to send the right people an email or message whenever a release is created in a particular project.
