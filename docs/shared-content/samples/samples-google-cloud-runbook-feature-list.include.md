**Pattern - Rolling**

- PetClinic Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-445/process/RunbookProcess-Runbooks-445" target="_blank">1-Create GCP Ubuntu 20.04 Worker</a>: *Runbook that will spin up the Rolling Deploy - Conversion projects GCP worker.*
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-480/process/RunbookProcess-Runbooks-480" target="_blank">2-Configure GCP NLB Target Pools</a>: *Runbook that will configure a Network Load Balancer with target pools for the PetClinic project*
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-448/process/RunbookProcess-Runbooks-448" target="_blank">3-Create GCP PetClinic Project Infrastructure</a>: *Runbook that will spin up the Rolling Deploy - Conversion projects infrastructure*
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-586/process/RunbookProcess-Runbooks-586" target="_blank">4-Destroy the GCP Kraken</a>: *Runbook that will tear down ALL the Rolling Deploy - Conversion projects GCP infrastructure, using execution containers for workers*
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-588/process/RunbookProcess-Runbooks-588" target="_blank">5-Destroy GCP Ubuntu 20.04 Worker</a>: *Unregister the worker from Octopus and delete the machine.*
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-449/process/RunbookProcess-Runbooks-449" target="_blank">Create GCP Cloud MySQL instance</a>: *A Runbook that will spin up a MySQL instance for use with PetClinic projects. This can be as a one-off.*
    
**Secrets Management**

- GCP Secret Manager
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1703/operations/runbooks/Runbooks-1743/process/RunbookProcess-Runbooks-1743" target="_blank">Retrieve Secrets</a>: *This runbook retrieves secrets from Google Cloud Secret Manager and creates sensitive output variables to use in deployments and runbooks.*
    
**Target - Kubernetes**

- Multi-Cloud PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1764/process/RunbookProcess-Runbooks-1764" target="_blank">Create GKE Cluster</a>: *Create a Google Kubernetes Engine cluster.*
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1767/process/RunbookProcess-Runbooks-1767" target="_blank">Destroy GKE Cluster</a>: *Destroy the Google Kubernetes Engine cluster.*
- Rancher
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1032/operations/runbooks/Runbooks-1027/process/RunbookProcess-Runbooks-1027" target="_blank">Create Infrastructure</a>: *Creates VM in GCP that runs Rancher.*
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1032/operations/runbooks/Runbooks-1123/process/RunbookProcess-Runbooks-1123" target="_blank">Destroy Infrastructure</a>: *Tears down VM hosting Rancher and removes clusters from Deployment Targets.*
