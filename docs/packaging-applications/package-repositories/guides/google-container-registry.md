---
title: Google Cloud Container Registry (GCR) 
description: How to add a Google Cloud Container Registry (GCR) as an Octopus feed
position: 60
---

Google Cloud provides a [container registry](https://cloud.google.com/container-registry). Google Container Registry can be configured in Octopus as a Docker Container Registry Feed.  

## Adding a Google Container Registry to Octopus 

1. To enable Octopus to communicate with Google Cloud registries, the [Cloud Resource Manager API](https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/overview) must be enabled. 
2. Create a [JSON key file Google Cloud service account](https://cloud.google.com/container-registry/docs/advanced-authentication#json-key) 
3. In Octopus go to {{ Library, External Feeds }} and add a new feed with the following properties
    - **Feed Type:** Docker Container Registry
    - **Name:** _{{This one's up to you}}_
    - **URL:** https://gcr.io
    - **Registry Path:** *leave blank*
    - **Username:** _json_key
    - **Password:** _{{The contents of your JSON keyfile}}_

![](images/google-container-registry.png "width=500")
