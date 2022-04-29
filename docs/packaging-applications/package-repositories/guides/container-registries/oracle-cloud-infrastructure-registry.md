---
title: Oracle Cloud Infrastructure Container Registry  
description: How to add an Oracle Cloud Infrastructure Container Registry as an Octopus feed 
position: 90
---

Oracle Cloud Infrastructure (OCI) provides a container registry that can be used as an external feed for Octopus Deploy.

## Create an OCI container registry
Once you've logged into OCI, search for `Container Registry` and select the **Container Registry** link located under `Services`.

![](images/oracle-cloud-infrastructure-container-registry-search.png)

Click on **Create repository**

![](images/oracle-cloud-infrastructure-create-registry.png)

Fill in the following:
- Compartment - select which compartment to place the repository in
- Repoistory name - give the repository a name
- Access - select whether this will be an `Public` or `Private` repository

Click **Create repository**

Take note of which region you created the repository in, this will be needed to determine the correct URL for the repository.  Use [https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm) to translate the region name to the shortened code.  In this example, the repository was created in `US West (San Jose)` which has the code of `sjc`.

![](images/oracle-cloud-infrastructure-region.png)

## Adding an Nexus Docker repository as an Octopus External Feed
Create a new Octopus Feed by navigating to **{{Library, External Feeds}}** and select the `Docker Container Registry` Feed type. 

Give the feed a name, in the URL field, paste the URL to your OCI region repository. It should look similar to this format:

`https://[region code].ocir.io`

![OCI Docker Registry feed](images/oracle-cloud-infrastructure-external-feed.png)

Optionally add Credentials if they are required. 