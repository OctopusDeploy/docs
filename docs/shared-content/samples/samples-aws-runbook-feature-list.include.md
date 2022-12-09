**Pattern - Blue-Green**

- Random Quotes .NET
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542/operations/runbooks/Runbooks-525/process/RunbookProcess-Runbooks-525" target="_blank">Change Production Group</a>: <i>Changes the blue-green designation.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542/operations/runbooks/Runbooks-523/process/RunbookProcess-Runbooks-523" target="_blank">Create Infrastructure</a>: <i>Creates environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542/operations/runbooks/Runbooks-524/process/RunbookProcess-Runbooks-524" target="_blank">Destroy Infrastructure</a>: <i>Destroys environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542/operations/runbooks/Runbooks-1042/process/RunbookProcess-Runbooks-1042" target="_blank">Destroy the Kraken</a>: <i>Destroys project infrastructure and calls Destroy Infrastructure for each environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542/operations/runbooks/Runbooks-1041/process/RunbookProcess-Runbooks-1041" target="_blank">Unleash the Kraken</a>: <i>Creates project infrastructure and calls Create Infrastructure for each Environment.</i>
- Random Quotes .NET IIS
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-2122/operations/runbooks/Runbooks-2485/process/RunbookProcess-Runbooks-2485" target="_blank">Change Production Group</a>: <i>Changes the blue-green designation.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-2122/operations/runbooks/Runbooks-2484/process/RunbookProcess-Runbooks-2484" target="_blank">Destroy Infrastructure</a>: <i>Destroys environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-2122/operations/runbooks/Runbooks-2482/process/RunbookProcess-Runbooks-2482" target="_blank">Destroy the Kraken</a>: <i>Destroys project infrastructure and calls Destroy Infrastructure for each environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-2122/operations/runbooks/Runbooks-2481/process/RunbookProcess-Runbooks-2481" target="_blank">Unleash the Kraken</a>: <i>Creates project infrastructure and calls Create Infrastructure for each Environment.</i>
- Random Quotes Java
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-402/operations/runbooks/Runbooks-383/process/RunbookProcess-Runbooks-383" target="_blank">Change Production Group</a>: <i>Runbook that will switch traffic to one of the two load-balancer listener options for the Octopus Environment; _Blue_, or _Green_.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-402/operations/runbooks/Runbooks-381/process/RunbookProcess-Runbooks-381" target="_blank">Create Infrastructure</a>: <i>Runbook that will spin up the _Random Quotes Java_ project infrastructure in AWS for an Octopus Environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-402/operations/runbooks/Runbooks-382/process/RunbookProcess-Runbooks-382" target="_blank">Destroy Infrastructure</a>: <i>Runbook that will tear down the _Random Quotes Java_ project infrastructure in AWS for an Octopus Environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-402/operations/runbooks/Runbooks-529/process/RunbookProcess-Runbooks-529" target="_blank">Destroy the Kraken</a>: <i>Runbook that will tear down **all** the _Random Quotes Java_ project infrastructure in AWS.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-402/operations/runbooks/Runbooks-528/process/RunbookProcess-Runbooks-528" target="_blank">Unleash the Kraken</a>: <i>Runbook that will spin up **all** the required _Random Quotes Java_ project infrastructure in AWS.</i>
    
**Pattern - IaC**

- Dynamic worker army
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-68/operations/runbooks/Runbooks-1893/process/RunbookProcess-Runbooks-1893" target="_blank">Create Infrastructure</a>: <i>Spins up the worker army</i>
    
**Pattern - Rolling**

- AWS - Rolling Deploy
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-386/operations/runbooks/Runbooks-371/process/RunbookProcess-Runbooks-371" target="_blank">Spin up Environment Resources</a>
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-386/operations/runbooks/Runbooks-372/process/RunbookProcess-Runbooks-372" target="_blank">Tear Down AWS Infrastructure</a>
    
**Pattern-AutoScaling**

- AWS ASG
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1464/operations/runbooks/Runbooks-1782/process/RunbookProcess-Runbooks-1782" target="_blank">Scale Down ASG</a>
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1464/operations/runbooks/Runbooks-1543/process/RunbookProcess-Runbooks-1543" target="_blank">Scale Up ASG</a>
    
**Secrets Management**

- AWS Secrets Manager
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1702/operations/runbooks/Runbooks-1744/process/RunbookProcess-Runbooks-1744" target="_blank">Retrieve Secrets</a>: <i>This runbook retrieves secrets from AWS Secrets Manager and creates sensitive output variables to use in deployments and runbooks.</i>
    
**Target - Containers**

- AWS ECS
   - <a href="https://samples.octopus.app/app#/Spaces-103/projects/Projects-647/operations/runbooks/Runbooks-664/process/RunbookProcess-Runbooks-664" target="_blank">Deregister task definitions</a>: <i>Removes the task definitions from ECS</i>
    
**Target - Kubernetes**

- Multi-Cloud PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1763/process/RunbookProcess-Runbooks-1763" target="_blank">Create EKS Cluster</a>: <i>Create an Elastic Kubernetes Service cluster on AWS.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1766/process/RunbookProcess-Runbooks-1766" target="_blank">Destroy EKS Cluster</a>: <i>Destroy the AWS Elastic Kubernetes Service cluster.</i>
- OctopusDeploy
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1241/operations/runbooks/Runbooks-1242/process/RunbookProcess-Runbooks-1242" target="_blank">Create Cluster</a>: <i>Creating a two node Kubernetes cluster in AWS using [eksctl](https://github.com/weaveworks/eksctl). Rather than the default configuration eksctl will use [this](https://github.com/OctopusSamples/IaC/blob/master/aws/Kubernetes/cluster.yaml) cluster config.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1241/operations/runbooks/Runbooks-1243/process/RunbookProcess-Runbooks-1243" target="_blank">Delete Cluster</a>: <i>Delete Kubernetes cluster and node groups from AWS</i>
- PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-861/operations/runbooks/Runbooks-901/process/RunbookProcess-Runbooks-901" target="_blank">Create Cluster</a>: <i>Creating a two node Kubernetes cluster in AWS using [eksctl](https://github.com/weaveworks/eksctl). Rather than the default configuration eksctl will use [this](https://github.com/OctopusSamples/IaC/blob/master/aws/Kubernetes/cluster.yaml) cluster config.

This creates a single cluster in the Production environment, and then copies it as a target to all environments</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-861/operations/runbooks/Runbooks-902/process/RunbookProcess-Runbooks-902" target="_blank">Delete Cluster</a>: <i>Delete Kubernetes cluster and node groups from AWS</i>
    
**Target - Oracle**

- DBUp RDS
   - <a href="https://samples.octopus.app/app#/Spaces-422/projects/Projects-883/operations/runbooks/Runbooks-2364/process/RunbookProcess-Runbooks-2364" target="_blank">Temp</a>
- Flyway RDS
   - <a href="https://samples.octopus.app/app#/Spaces-422/projects/Projects-663/operations/runbooks/Runbooks-2344/process/RunbookProcess-Runbooks-2344" target="_blank">Test</a>
    
**Target - Serverless**

- AWS OctoSubscriber
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-2363/process/RunbookProcess-Runbooks-2363" target="_blank">Delete S3 bucket</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-1806/process/RunbookProcess-Runbooks-1806" target="_blank">Get Canonical ID</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-2381/process/RunbookProcess-Runbooks-2381" target="_blank">Get role arn</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-1805/process/RunbookProcess-Runbooks-1805" target="_blank">Spin Up Subscriber Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-1807/process/RunbookProcess-Runbooks-1807" target="_blank">Tear Down AWS Subscriber Infrastructure</a>
- AWS Subscriber S3
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1781/operations/runbooks/Runbooks-1822/process/RunbookProcess-Runbooks-1822" target="_blank">Get Canonical ID</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1781/operations/runbooks/Runbooks-1821/process/RunbookProcess-Runbooks-1821" target="_blank">Spin Up Subscriber Infrastructure</a>
    
**Target - SQL Server**

- AWS Backup and Restore S3
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-649/operations/runbooks/Runbooks-666/process/RunbookProcess-Runbooks-666" target="_blank">Backup Database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-649/operations/runbooks/Runbooks-667/process/RunbookProcess-Runbooks-667" target="_blank">Restore Database</a>
- Redgate - Feature Branch Example
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374/operations/runbooks/Runbooks-365/process/RunbookProcess-Runbooks-365" target="_blank">Create AWS Redgate Masked Database Backup</a>: <i>Runbook that will create a masked copy of production so developers and testing can use it.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374/operations/runbooks/Runbooks-367/process/RunbookProcess-Runbooks-367" target="_blank">Delete AWS Redgate Feature Branch Database</a>: <i>Runbook that will backup and then delete the feature branch database.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374/operations/runbooks/Runbooks-914/process/RunbookProcess-Runbooks-914" target="_blank">Delete AWS Redgate RDS Snapshots</a>: <i>Runbook to delete old rds snapshots, as the max allowed is 100</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374/operations/runbooks/Runbooks-366/process/RunbookProcess-Runbooks-366" target="_blank">Restore AWS Redgate Masked Backup for Feature Branches</a>: <i>Runbook that will create a feature branch database on test using the masked production database backup stored in s3</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374/operations/runbooks/Runbooks-354/process/RunbookProcess-Runbooks-354" target="_blank">Spin Up AWS Redgate SQL Server RDS Server</a>: <i>Runbook to spin up a database in AWS for the Redgate Sample</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374/operations/runbooks/Runbooks-355/process/RunbookProcess-Runbooks-355" target="_blank">Tear Down AWS Redgate SQL Server RDS Server</a>: <i>Runbook to tear down the database in AWS for Redgate sample</i>
    
**Target - Tomcat**

- Pet Clinic AWS
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-371/operations/runbooks/Runbooks-348/process/RunbookProcess-Runbooks-348" target="_blank">Create Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-371/operations/runbooks/Runbooks-353/process/RunbookProcess-Runbooks-353" target="_blank">Destroy Infrastructure</a>
