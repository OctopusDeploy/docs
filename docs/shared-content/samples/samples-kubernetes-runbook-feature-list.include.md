**Pattern - Tenants**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1301/operations/runbooks/Runbooks-1341/process/RunbookProcess-Runbooks-1341" target="_blank">Create Region Workers</a>: <i>Creates workers for all of the specified regions.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1301/operations/runbooks/Runbooks-1942/process/RunbookProcess-Runbooks-1942" target="_blank">Test listening worker NodePort</a>
    
**Target - Kubernetes**

- nginx+httpd
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-964/operations/runbooks/Runbooks-988/process/RunbookProcess-Runbooks-988" target="_blank">Create httpd+nginx infrastructure</a>
- Octopus HA in GKE
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1822/operations/runbooks/Runbooks-1862/process/RunbookProcess-Runbooks-1862" target="_blank">Deploy Octopus HA to GKE</a>: <i>This deploys Octopus High Availability into Google Kubernetes Engine (GKE) with:
      - Two nodes, exposed individually (for polling tentacles)
      - A Load balancer for the Octopus Web Portal on port 80
      - An MS-SQL Express database container to a single pod.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1822/operations/runbooks/Runbooks-1961/process/RunbookProcess-Runbooks-1961" target="_blank">Deploy Octopus HA to GKE using Helm</a>
- OctopusDeploy
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1241/operations/runbooks/Runbooks-1241/process/RunbookProcess-Runbooks-1241" target="_blank">Check config map</a>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1241/operations/runbooks/Runbooks-1244/process/RunbookProcess-Runbooks-1244" target="_blank">Describe Cluster</a>
- PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-861/operations/runbooks/Runbooks-1084/process/RunbookProcess-Runbooks-1084" target="_blank">Check config map</a>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-861/operations/runbooks/Runbooks-904/process/RunbookProcess-Runbooks-904" target="_blank">Describe Cluster</a>
