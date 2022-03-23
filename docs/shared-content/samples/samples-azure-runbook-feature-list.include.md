**Octopus Admin**

- Artifactory Sample Management
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1082/operations/runbooks/Runbooks-1081/process/RunbookProcess-Runbooks-1081" target="_blank">Renew and Deploy SSL Certificate</a>: *Runbook which renews and stores LetsEncrypt certificates in the Octopus Certificate library and deploys to the target machine*
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1082/operations/runbooks/Runbooks-1082/process/RunbookProcess-Runbooks-1082" target="_blank">Start Artifactory VM</a>: *Starts the Artifactory VM running in Azure*
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1082/operations/runbooks/Runbooks-1083/process/RunbookProcess-Runbooks-1083" target="_blank">Stop Artifactory VM</a>: *Stops the Artifactory VM running in Azure*
- Azure VM management
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1503/operations/runbooks/Runbooks-1591/process/RunbookProcess-Runbooks-1591" target="_blank">Check for Premium LRS SSDs</a>: *This runbook uses the Azure CLI to check all virtual machines in a subscription for the presence of Premium_LRS on either the OS or Data disk*
- Lets Encrypt Certificate renewal
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-661/operations/runbooks/Runbooks-682/process/RunbookProcess-Runbooks-682" target="_blank">Renew LetsEncrypt Certificates</a>: *Runbook which renews and stores LetsEncrypt certificates in the Octopus Certificate library*
- Maintain Samples build servers
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-930/operations/runbooks/Runbooks-948/process/RunbookProcess-Runbooks-948" target="_blank">Shutdown Samples build server VMs</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-930/operations/runbooks/Runbooks-949/process/RunbookProcess-Runbooks-949" target="_blank">Start Samples build server VMs</a>
- Provision SQL Server
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1170/process/RunbookProcess-Runbooks-1170" target="_blank">Destroy Azure SQL IaaS</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1169/process/RunbookProcess-Runbooks-1169" target="_blank">Destroy Azure SQL PaaS</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1167/process/RunbookProcess-Runbooks-1167" target="_blank">Provision Azure SQL IaaS</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1168/process/RunbookProcess-Runbooks-1168" target="_blank">Provision Azure SQL PaaS</a>
- Windows Server Admin
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-202/operations/runbooks/Runbooks-205/process/RunbookProcess-Runbooks-205" target="_blank">Create hardened Windows Azure VM</a>: *- Create an Azure Windows virtual machine. - Configure that machine as an Octopus tentacle - Run hardening script (Windows Server 2016 Hardening runbook)*
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-202/operations/runbooks/Runbooks-206/process/RunbookProcess-Runbooks-206" target="_blank">Tear down hardened Windows Azure VM</a>: *Remove the Deployment Target from Octopus and then tear down the Resource Group containing the VM from Azure.*
    
**Pattern - IaC**

- PowerShell DSC IIS Server
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1847/operations/runbooks/Runbooks-1889/process/RunbookProcess-Runbooks-1889" target="_blank">Create Infrastructure</a>: *Creates infrastructure for the PowerShell DSC IIS Server project.*
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1847/operations/runbooks/Runbooks-1890/process/RunbookProcess-Runbooks-1890" target="_blank">Destroy Infrastructure</a>: *Tears down infrastructure for the PowerShell DSC IIS Server project.*
- Random Quotes - Azure
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1851/operations/runbooks/Runbooks-1897/process/RunbookProcess-Runbooks-1897" target="_blank">Create and Configure Terraform Infrastructure</a>: *Creates necessary infrastructure in Azure [using Terraform](https://dev.azure.com/octopussamples/_git/Azure-Terraform-RandomQuotes) and configures it for application deployment.*
    
**Pattern - Rolling**

- Azure VMSS
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-682/operations/runbooks/Runbooks-724/process/RunbookProcess-Runbooks-724" target="_blank">Spin Up Azure Resources</a>
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-682/operations/runbooks/Runbooks-741/process/RunbookProcess-Runbooks-741" target="_blank">Tear Down Azure Resources</a>
- PetClinic Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-448/process/RunbookProcess-Runbooks-448" target="_blank">3-Create GCP PetClinic Project Infrastructure</a>: *Runbook that will spin up the Rolling Deploy - Conversion projects infrastructure*
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-586/process/RunbookProcess-Runbooks-586" target="_blank">4-Destroy the GCP Kraken</a>: *Runbook that will tear down ALL the Rolling Deploy - Conversion projects GCP infrastructure, using execution containers for workers*
    
**Pattern - Tenants**

- Car Rental
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1341/operations/runbooks/Runbooks-1361/process/RunbookProcess-Runbooks-1361" target="_blank">Create Azure Web Apps</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1341/operations/runbooks/Runbooks-1362/process/RunbookProcess-Runbooks-1362" target="_blank">Destroy Azure Web Apps</a>
- OctoHR
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/operations/runbooks/Runbooks-1661/process/RunbookProcess-Runbooks-1661" target="_blank">Create Infrastructure</a>: *Create environment-specific infrastructure.*
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/operations/runbooks/Runbooks-1663/process/RunbookProcess-Runbooks-1663" target="_blank">Destroy Infrastructure</a>: *Destroy environment-specific infrastructure.*
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/operations/runbooks/Runbooks-1682/process/RunbookProcess-Runbooks-1682" target="_blank">Test enable app_offline</a>
- OctoPetShop
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/operations/runbooks/Runbooks-1381/process/RunbookProcess-Runbooks-1381" target="_blank">Create Azure Web Apps</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/operations/runbooks/Runbooks-1385/process/RunbookProcess-Runbooks-1385" target="_blank">Destroy Azure Database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/operations/runbooks/Runbooks-1382/process/RunbookProcess-Runbooks-1382" target="_blank">Destroy Azure Web Apps</a>
- Vet Clinic - Tenanted
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1302/operations/runbooks/Runbooks-1321/process/RunbookProcess-Runbooks-1321" target="_blank">Create Azure Web Apps</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1302/operations/runbooks/Runbooks-1343/process/RunbookProcess-Runbooks-1343" target="_blank">Destroy Azure Web Apps</a>
    
**Pattern-AutoScaling**

- Azure VMSS Orchestration
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1544/process/RunbookProcess-Runbooks-1544" target="_blank">Reconcile VMSS Provisioning</a>: *Runbook that will ensure Octopus Deploy and the VMSS VMs are in sync.*
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1562/process/RunbookProcess-Runbooks-1562" target="_blank">Scale Down VMSS</a>: *Step template to scale down the VMSS to be used on a schedule*
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1561/process/RunbookProcess-Runbooks-1561" target="_blank">Scale VMSS</a>: *Runbook to scale a VMSS*
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1541/process/RunbookProcess-Runbooks-1541" target="_blank">Spin Up VMSS</a>: *Runbook to create a new VMSS*
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1542/process/RunbookProcess-Runbooks-1542" target="_blank">Tear Down VMSS</a>: *Runbook to delete the VMSS*
    
**Secrets Management**

- Azure Key Vault
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1701/operations/runbooks/Runbooks-1746/process/RunbookProcess-Runbooks-1746" target="_blank">Create Azure Key Vault</a>: *This runbook creates the infrastructure required for retrieving secrets from Azure Key Vault.*
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1701/operations/runbooks/Runbooks-1745/process/RunbookProcess-Runbooks-1745" target="_blank">Retrieve Secrets</a>: *This runbook retrieves secrets from Azure Key Vault and creates sensitive output variables to use in deployments and runbooks.*
- HashiCorp Vault
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1704/operations/runbooks/Runbooks-1747/process/RunbookProcess-Runbooks-1747" target="_blank">Create HashiCorp Vault Server</a>: *This runbook creates the infrastructure required to retrieve secrets from a HashiCorp Vault server.*
    
**Target - Kubernetes**

- Multi-Cloud PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1762/process/RunbookProcess-Runbooks-1762" target="_blank">Create AKS Cluster</a>: *Create an Azure Kubernetes Service cluster.*
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1765/process/RunbookProcess-Runbooks-1765" target="_blank">Destroy AKS Cluster</a>: *Destroy the Azure Kubernetes Service cluster and resource group.*
- MySQL Helm Chart
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-322/operations/runbooks/Runbooks-304/process/RunbookProcess-Runbooks-304" target="_blank">Create Infrastructure</a>: *Runbook to Spin Up a K8s Cluster*
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-322/operations/runbooks/Runbooks-305/process/RunbookProcess-Runbooks-305" target="_blank">Destroy Infrastructure</a>: *Runbook to Destroy the K8s Cluster*
- Octo Pet Shop - Raw YAML
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-302/operations/runbooks/Runbooks-284/process/RunbookProcess-Runbooks-284" target="_blank">Create Octo Pet Shop Azure K8s Cluster</a>: *Runbook to Spin Up a K8s Cluster*
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-302/operations/runbooks/Runbooks-286/process/RunbookProcess-Runbooks-286" target="_blank">Destroy Octo Pet Shop Azure K8s Cluster</a>: *Runbook to Destroy the K8s Cluster*
    
**Target - Payara**

- PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-642/projects/Projects-1141/operations/runbooks/Runbooks-1164/process/RunbookProcess-Runbooks-1164" target="_blank">Create Infrastructure</a>: *Create project specific infrastructure.*
   - <a href="https://samples.octopus.app/app#/Spaces-642/projects/Projects-1141/operations/runbooks/Runbooks-1165/process/RunbookProcess-Runbooks-1165" target="_blank">Destroy Infrastructure</a>: *Destroys project specific infrastructure.*
    
**Target - Serverless**

- Azure OctoSubscriber
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1824/operations/runbooks/Runbooks-1863/process/RunbookProcess-Runbooks-1863" target="_blank">Create Infrastructure</a>: *Creates infrastructure specific to this project.*
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1824/operations/runbooks/Runbooks-1882/process/RunbookProcess-Runbooks-1882" target="_blank">Test</a>
    
**Target - SQL Server**

- DACPAC - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-164/operations/runbooks/Runbooks-202/process/RunbookProcess-Runbooks-202" target="_blank">Spin up OctoFX-DACPAC Azure database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-164/operations/runbooks/Runbooks-203/process/RunbookProcess-Runbooks-203" target="_blank">Teardown OctoFX-DACPAC Azure database</a>
- DBUp - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-162/operations/runbooks/Runbooks-102/process/RunbookProcess-Runbooks-102" target="_blank">Delete Azure SQL Server Database</a>: *Runbook to tear down the database in Azure*
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-162/operations/runbooks/Runbooks-221/process/RunbookProcess-Runbooks-221" target="_blank">Export Azure SQL Server Database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-162/operations/runbooks/Runbooks-101/process/RunbookProcess-Runbooks-101" target="_blank">Spin Up Azure SQL Server Database</a>: *Runbook to spin up a database in Azure*
- Flyway - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-864/operations/runbooks/Runbooks-1062/process/RunbookProcess-Runbooks-1062" target="_blank">Destroy Infrastructure</a>: *Drops database for the environment.*
- Flyway - Azure SQL Execution Containers
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-1224/operations/runbooks/Runbooks-1227/process/RunbookProcess-Runbooks-1227" target="_blank">Destroy Infrastructure</a>: *Drops database for the environment.*
- Liquibase - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-865/operations/runbooks/Runbooks-1063/process/RunbookProcess-Runbooks-1063" target="_blank">Destroy Infrastructure</a>: *Destroys liquibase database for environment.*
- Redgate - Real World Example
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-261/operations/runbooks/Runbooks-223/process/RunbookProcess-Runbooks-223" target="_blank">Delete Redgate SQL Server Database</a>: *Runbook to tear down the database in Azure for Redgate sample*
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-261/operations/runbooks/Runbooks-1201/process/RunbookProcess-Runbooks-1201" target="_blank">Delete Resource Group deployment</a>: *Deletes deployments to the resource group so we don't go over quota.*
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-261/operations/runbooks/Runbooks-222/process/RunbookProcess-Runbooks-222" target="_blank">Spin Up Redgate SQL Server Database</a>: *Runbook to spin up a database in Azure for the Redgate Sample*
- RoundhousE - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-863/operations/runbooks/Runbooks-1064/process/RunbookProcess-Runbooks-1064" target="_blank">Destroy Infrastructure</a>: *Destroys the RoundhousE database for the environment.*
    
**Target - Tomcat**

- Pet Clinic - Azure Web App
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1681/operations/runbooks/Runbooks-1721/process/RunbookProcess-Runbooks-1721" target="_blank">Create Infrastructure</a>: *Creates project-specific infrastructure.*
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1681/operations/runbooks/Runbooks-1724/process/RunbookProcess-Runbooks-1724" target="_blank">Destroy Infrastructure</a>: *Destroys project-specific infrastructure*
    
**Target - WebSphere**

- PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-662/projects/Projects-1206/operations/runbooks/Runbooks-1223/process/RunbookProcess-Runbooks-1223" target="_blank">Create Infrastructure</a>: *Creates project specific infrastructure.*
   - <a href="https://samples.octopus.app/app#/Spaces-662/projects/Projects-1206/operations/runbooks/Runbooks-1224/process/RunbookProcess-Runbooks-1224" target="_blank">Destroy Infrastructure</a>: *Destroys environment specific infrastructure.*
    
**Target - Windows**

- OctoFX
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-274/process/RunbookProcess-Runbooks-274" target="_blank">Manual Failover to Primary</a>: *This is a Runbook designed to failover back from Disaster Recovery in UK South to Western Europe. Please check all resources are healthy before running this Runbook. * Must be run in the context of Production for URL testing to work successfully.*
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-273/process/RunbookProcess-Runbooks-273" target="_blank">Monitor Primary Website & Failover to DR if offline</a>: *This is to be run in the context of Disaster Recovery so it can spin up the correct machines and then failover. * Checks Production URL * Starts DR SQL & Web * Switches DNS over. 60s TTL*
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-255/process/RunbookProcess-Runbooks-255" target="_blank">Start Environment</a>: *Starts the Web and SQL Server for specified environments. This is the template for the scheduled triggers turning on Infrastructure*
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-262/process/RunbookProcess-Runbooks-262" target="_blank">Stop Environment</a>: *Stops the Web and SQL Server for specified environments. This is the template for the scheduled triggers turning off Infrastructure*
