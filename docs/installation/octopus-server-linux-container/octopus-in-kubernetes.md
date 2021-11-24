---
title: Octopus Server in Kubernetes
description: A fully self-contained SQL Server and Octopus Server provisioned as Linux containers running in Kubernetes
position: 40
---

Octopus can be installed into a Kubernetes cluster using a Helm chart.

Add the helm chart repository with the following commands:

```bash
helm repo add octopus https://octopus-helm-charts.s3.amazonaws.com
helm repo update
```

Then install the chart with the command:

```bash
helm upgrade --install octopus octopus/octopusdeploy --set octopus.acceptEula=Y --set mssql-linux.acceptEula.value=Y --set octopus.image=octopusdeploy/octopusdeploy --set octopus.masterKey=YOUR_GENERATED_KEY
```

The source code for the Helm chart can be found on [GitHub](https://github.com/OctopusSamples/OctopusHelmChart). The [values.yaml](https://github.com/OctopusSamples/OctopusHelmChart/blob/master/values.yaml) contains comments describing the options available.

For more information on how the helm chart works, especially with regards to high availability deployments, see the blog post [Introducing the Octopus Server Linux Docker image](https://octopus.com/blog/introducing-linux-docker-image).