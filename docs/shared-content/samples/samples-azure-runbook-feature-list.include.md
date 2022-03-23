**Octopus Admin**

- Artifactory Sample Management
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1082/operations/runbooks/Runbooks-1081/process/RunbookProcess-Runbooks-1081" target="_blank">Renew and Deploy SSL Certificate</a>: <i>Runbook which renews and stores LetsEncrypt certificates in the Octopus Certificate library and deploys to the target machine</i>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1082/operations/runbooks/Runbooks-1082/process/RunbookProcess-Runbooks-1082" target="_blank">Start Artifactory VM</a>: <i>Starts the Artifactory VM running in Azure</i>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1082/operations/runbooks/Runbooks-1083/process/RunbookProcess-Runbooks-1083" target="_blank">Stop Artifactory VM</a>: <i>Stops the Artifactory VM running in Azure</i>
- Azure VM management
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1503/operations/runbooks/Runbooks-1591/process/RunbookProcess-Runbooks-1591" target="_blank">Check for Premium LRS SSDs</a>: <i>This runbook uses the Azure CLI to check all virtual machines in a subscription for the presence of Premium_LRS on either the OS or Data disk</i>
- Instance Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1001/operations/runbooks/Runbooks-1023/process/RunbookProcess-Runbooks-1023" target="_blank">Create Infrastructure</a>: <i>Creates infrastructure such as workers that can be used for the entire instance.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1001/operations/runbooks/Runbooks-1025/process/RunbookProcess-Runbooks-1025" target="_blank">Destroy Infrastructure</a>: <i>Destroys infrastructure that was created for the entire instance.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1001/operations/runbooks/Runbooks-1941/process/RunbookProcess-Runbooks-1941" target="_blank">Pre-load Calamari on worker</a>
- Lets Encrypt Certificate renewal
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-661/operations/runbooks/Runbooks-682/process/RunbookProcess-Runbooks-682" target="_blank">Renew LetsEncrypt Certificates</a>: <i>Runbook which renews and stores LetsEncrypt certificates in the Octopus Certificate library</i>
- Maintain Samples build servers
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-930/operations/runbooks/Runbooks-948/process/RunbookProcess-Runbooks-948" target="_blank">Shutdown Samples build server VMs</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-930/operations/runbooks/Runbooks-949/process/RunbookProcess-Runbooks-949" target="_blank">Start Samples build server VMs</a>
- Provision SQL Server
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1170/process/RunbookProcess-Runbooks-1170" target="_blank">Destroy Azure SQL IaaS</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1169/process/RunbookProcess-Runbooks-1169" target="_blank">Destroy Azure SQL PaaS</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1167/process/RunbookProcess-Runbooks-1167" target="_blank">Provision Azure SQL IaaS</a>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1162/operations/runbooks/Runbooks-1168/process/RunbookProcess-Runbooks-1168" target="_blank">Provision Azure SQL PaaS</a>
- Windows Server Admin
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-202/operations/runbooks/Runbooks-205/process/RunbookProcess-Runbooks-205" target="_blank">Create hardened Windows Azure VM</a>: <i>- Create an Azure Windows virtual machine.
      - Configure that machine as an Octopus tentacle
      - Run hardening script (Windows Server 2016 Hardening runbook)</i>
   - <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-202/operations/runbooks/Runbooks-206/process/RunbookProcess-Runbooks-206" target="_blank">Tear down hardened Windows Azure VM</a>: <i>Remove the Deployment Target from Octopus and then tear down the Resource Group containing the VM from Azure.</i>
    
**Pattern - Canary**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-542/projects/Projects-942/operations/runbooks/Runbooks-962/process/RunbookProcess-Runbooks-962" target="_blank">Create Infrastructure</a>: <i>Creates infrastructure for the specific environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-542/projects/Projects-942/operations/runbooks/Runbooks-964/process/RunbookProcess-Runbooks-964" target="_blank">Destroy Infrastructure</a>: <i>Deletes the resource group and everything it holds. This is a destructive action.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-542/projects/Projects-942/operations/runbooks/Runbooks-1182/process/RunbookProcess-Runbooks-1182" target="_blank">Destroy the Kraken</a>: <i>Destroys space wide infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-542/projects/Projects-942/operations/runbooks/Runbooks-963/process/RunbookProcess-Runbooks-963" target="_blank">Remove from Backend Pool</a>: <i>Removes an item from the Front Door backend pool. This can be used to recover from a failed deployment. This is destructive and can result in downtime if the wrong index is entered.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-542/projects/Projects-942/operations/runbooks/Runbooks-1044/process/RunbookProcess-Runbooks-1044" target="_blank">Unleash the Kraken</a>: <i>Creates space wide infrastructure and calls Create Infrastructure for each environment.</i>
    
**Pattern - IaC**

- PowerShell DSC IIS Server
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1847/operations/runbooks/Runbooks-1889/process/RunbookProcess-Runbooks-1889" target="_blank">Create Infrastructure</a>: <i>Creates infrastructure for the PowerShell DSC IIS Server project.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1847/operations/runbooks/Runbooks-1890/process/RunbookProcess-Runbooks-1890" target="_blank">Destroy Infrastructure</a>: <i>Tears down infrastructure for the PowerShell DSC IIS Server project.</i>
- Random Quotes - Azure
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1851/operations/runbooks/Runbooks-1897/process/RunbookProcess-Runbooks-1897" target="_blank">Create and Configure Terraform Infrastructure</a>: <i>Creates necessary infrastructure in Azure [using Terraform](https://dev.azure.com/octopussamples/_git/Azure-Terraform-RandomQuotes) and configures it for application deployment.</i>
    
**Pattern - Monolith**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-584/operations/runbooks/Runbooks-906/process/RunbookProcess-Runbooks-906" target="_blank">Create infrastructure</a>: <i>Create environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-584/operations/runbooks/Runbooks-908/process/RunbookProcess-Runbooks-908" target="_blank">Destroy infrastructure</a>: <i>Destroy environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-584/operations/runbooks/Runbooks-931/process/RunbookProcess-Runbooks-931" target="_blank">Destroy the Kraken</a>: <i>Destroy space-wide environment infrastructure as well as call Destroy Infrastructure for each environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-584/operations/runbooks/Runbooks-907/process/RunbookProcess-Runbooks-907" target="_blank">Unleash the Kraken</a>: <i>Creates space-wide infrastructure and calls the environment-specific runbooks.</i>
    
**Pattern - Rolling**

- Azure VMSS
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-682/operations/runbooks/Runbooks-724/process/RunbookProcess-Runbooks-724" target="_blank">Spin Up Azure Resources</a>
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-682/operations/runbooks/Runbooks-741/process/RunbookProcess-Runbooks-741" target="_blank">Tear Down Azure Resources</a>
- PetClinic Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-448/process/RunbookProcess-Runbooks-448" target="_blank">3-Create GCP PetClinic Project Infrastructure</a>: <i>Runbook that will spin up the Rolling Deploy - Conversion projects infrastructure</i>
   - <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-441/operations/runbooks/Runbooks-586/process/RunbookProcess-Runbooks-586" target="_blank">4-Destroy the GCP Kraken</a>: <i>Runbook that will tear down ALL the Rolling Deploy - Conversion projects GCP infrastructure, using execution containers for workers</i>
    
**Pattern - Tenants**

- Car Rental
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1341/operations/runbooks/Runbooks-1361/process/RunbookProcess-Runbooks-1361" target="_blank">Create Azure Web Apps</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1341/operations/runbooks/Runbooks-1362/process/RunbookProcess-Runbooks-1362" target="_blank">Destroy Azure Web Apps</a>
- OctoHR
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/operations/runbooks/Runbooks-1661/process/RunbookProcess-Runbooks-1661" target="_blank">Create Infrastructure</a>: <i>Create environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/operations/runbooks/Runbooks-1663/process/RunbookProcess-Runbooks-1663" target="_blank">Destroy Infrastructure</a>: <i>Destroy environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/operations/runbooks/Runbooks-1682/process/RunbookProcess-Runbooks-1682" target="_blank">Test enable app_offline</a>
- OctoPetShop
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/operations/runbooks/Runbooks-1381/process/RunbookProcess-Runbooks-1381" target="_blank">Create Azure Web Apps</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/operations/runbooks/Runbooks-1385/process/RunbookProcess-Runbooks-1385" target="_blank">Destroy Azure Database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/operations/runbooks/Runbooks-1382/process/RunbookProcess-Runbooks-1382" target="_blank">Destroy Azure Web Apps</a>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1301/operations/runbooks/Runbooks-1303/process/RunbookProcess-Runbooks-1303" target="_blank">Create Region Resources</a>: <i>Creates resources for the region.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1301/operations/runbooks/Runbooks-1304/process/RunbookProcess-Runbooks-1304" target="_blank">Destroy Region Resources</a>: <i>Destroys resources for regions.</i>
- Vet Clinic - Tenanted
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1302/operations/runbooks/Runbooks-1321/process/RunbookProcess-Runbooks-1321" target="_blank">Create Azure Web Apps</a>
   - <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1302/operations/runbooks/Runbooks-1343/process/RunbookProcess-Runbooks-1343" target="_blank">Destroy Azure Web Apps</a>
    
**Pattern-AutoScaling**

- Azure VMSS Orchestration
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1544/process/RunbookProcess-Runbooks-1544" target="_blank">Reconcile VMSS Provisioning</a>: <i>Runbook that will ensure Octopus Deploy and the VMSS VMs are in sync.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1562/process/RunbookProcess-Runbooks-1562" target="_blank">Scale Down VMSS</a>: <i>Step template to scale down the VMSS to be used on a schedule</i>
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1561/process/RunbookProcess-Runbooks-1561" target="_blank">Scale VMSS</a>: <i>Runbook to scale a VMSS</i>
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1541/process/RunbookProcess-Runbooks-1541" target="_blank">Spin Up VMSS</a>: <i>Runbook to create a new VMSS</i>
   - <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/operations/runbooks/Runbooks-1542/process/RunbookProcess-Runbooks-1542" target="_blank">Tear Down VMSS</a>: <i>Runbook to delete the VMSS</i>
    
**Secrets Management**

- Azure Key Vault
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1701/operations/runbooks/Runbooks-1746/process/RunbookProcess-Runbooks-1746" target="_blank">Create Azure Key Vault</a>: <i>This runbook creates the infrastructure required for retrieving secrets from Azure Key Vault.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1701/operations/runbooks/Runbooks-1745/process/RunbookProcess-Runbooks-1745" target="_blank">Retrieve Secrets</a>: <i>This runbook retrieves secrets from Azure Key Vault and creates sensitive output variables to use in deployments and runbooks.</i>
- HashiCorp Vault
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1704/operations/runbooks/Runbooks-1747/process/RunbookProcess-Runbooks-1747" target="_blank">Create HashiCorp Vault Server</a>: <i>This runbook creates the infrastructure required to retrieve secrets from a HashiCorp Vault server.</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1705/operations/runbooks/Runbooks-1742/process/RunbookProcess-Runbooks-1742" target="_blank">Destroy the Kraken</a>: <i>Destroys space-wide infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1705/operations/runbooks/Runbooks-1741/process/RunbookProcess-Runbooks-1741" target="_blank">Unleash the Kraken</a>: <i>Creates space-wide infrastructure and where necessary, calls environment-specific infrastructure runbooks.</i>
    
**Target - Cassandra**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-842/projects/Projects-1721/operations/runbooks/Runbooks-1783/process/RunbookProcess-Runbooks-1783" target="_blank">Create Infrastructure</a>: <i>Create environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-842/projects/Projects-1721/operations/runbooks/Runbooks-1784/process/RunbookProcess-Runbooks-1784" target="_blank">Destroy Infrastructure</a>: <i>Destroy environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-842/projects/Projects-1721/operations/runbooks/Runbooks-1785/process/RunbookProcess-Runbooks-1785" target="_blank">Destroy the Kraken</a>: <i>Destroy space-wide environment infrastructure as well as call Destroy Infrastructure for each environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-842/projects/Projects-1721/operations/runbooks/Runbooks-1786/process/RunbookProcess-Runbooks-1786" target="_blank">Unleash the Kraken</a>: <i>Create space-wide environment infrastructure as well as call Create Infrastructure for each environment.</i>
    
**Target - Hybrid**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-446/operations/runbooks/Runbooks-455/process/RunbookProcess-Runbooks-455" target="_blank">Create Azure IIS Virtual Machine</a>
   - <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-446/operations/runbooks/Runbooks-478/process/RunbookProcess-Runbooks-478" target="_blank">Create Azure ProductService</a>
   - <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-446/operations/runbooks/Runbooks-479/process/RunbookProcess-Runbooks-479" target="_blank">Create Azure ShoppingCartService</a>
   - <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-446/operations/runbooks/Runbooks-477/process/RunbookProcess-Runbooks-477" target="_blank">Create Azure Web Application</a>
   - <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-446/operations/runbooks/Runbooks-471/process/RunbookProcess-Runbooks-471" target="_blank">Destroy the Kraken</a>
   - <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-446/operations/runbooks/Runbooks-454/process/RunbookProcess-Runbooks-454" target="_blank">Unleash the Kraken</a>
    
**Target - Kubernetes**

- Multi-Cloud PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1762/process/RunbookProcess-Runbooks-1762" target="_blank">Create AKS Cluster</a>: <i>Create an Azure Kubernetes Service cluster.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707/operations/runbooks/Runbooks-1765/process/RunbookProcess-Runbooks-1765" target="_blank">Destroy AKS Cluster</a>: <i>Destroy the Azure Kubernetes Service cluster and resource group.</i>
- MySQL Helm Chart
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-322/operations/runbooks/Runbooks-304/process/RunbookProcess-Runbooks-304" target="_blank">Create Infrastructure</a>: <i>Runbook to Spin Up a K8s Cluster</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-322/operations/runbooks/Runbooks-305/process/RunbookProcess-Runbooks-305" target="_blank">Destroy Infrastructure</a>: <i>Runbook to Destroy the K8s Cluster</i>
- Octo Pet Shop - Raw YAML
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-302/operations/runbooks/Runbooks-284/process/RunbookProcess-Runbooks-284" target="_blank">Create Octo Pet Shop Azure K8s Cluster</a>: <i>Runbook to Spin Up a K8s Cluster</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-302/operations/runbooks/Runbooks-286/process/RunbookProcess-Runbooks-286" target="_blank">Destroy Octo Pet Shop Azure K8s Cluster</a>: <i>Runbook to Destroy the K8s Cluster</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-290/operations/runbooks/Runbooks-306/process/RunbookProcess-Runbooks-306" target="_blank">Create Azure Windows Worker</a>: <i>Run book that will spin up the space's permanent Azure Windows Worker</i>
   - <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-290/operations/runbooks/Runbooks-307/process/RunbookProcess-Runbooks-307" target="_blank">Destroy Azure Windows Worker</a>: <i>Runbook that will destroy the Azure Windows Worker</i>
    
**Target - MariaDB**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-350/operations/runbooks/Runbooks-326/process/RunbookProcess-Runbooks-326" target="_blank">Create Infrastructure</a>: <i>Create environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-350/operations/runbooks/Runbooks-327/process/RunbookProcess-Runbooks-327" target="_blank">Destroy Infrastructure</a>: <i>Destroy environment-specific infrastructure.</i>
    
**Target - MongoDB**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-562/projects/Projects-965/operations/runbooks/Runbooks-994/process/RunbookProcess-Runbooks-994" target="_blank">Create Azure Worker</a>: <i>Create a dedicated worker for this space.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-562/projects/Projects-965/operations/runbooks/Runbooks-990/process/RunbookProcess-Runbooks-990" target="_blank">Create Infrastructure</a>: <i>Create environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-562/projects/Projects-965/operations/runbooks/Runbooks-995/process/RunbookProcess-Runbooks-995" target="_blank">Destroy Azure Worker</a>: <i>Destroy dedicated worker for space.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-562/projects/Projects-965/operations/runbooks/Runbooks-991/process/RunbookProcess-Runbooks-991" target="_blank">Destroy Infrastructure</a>: <i>Destroy environment-specific infrastructure.</i>
    
**Target - MySQL**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-1122/process/RunbookProcess-Runbooks-1122" target="_blank">Create Azure MySQL PaaS</a>: <i>Creates a PaaS instance of MySQL on Azure for this Space.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-404/process/RunbookProcess-Runbooks-404" target="_blank">Create Azure Worker</a>: <i>Create a dedicated worker for this space.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-308/process/RunbookProcess-Runbooks-308" target="_blank">Create Environment Infrastructure</a>: <i>Create infrastructure for this environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-2104/process/RunbookProcess-Runbooks-2104" target="_blank">Delete Databases</a>: <i>Deletes all space-related databases created on the Azure MySQL server.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-405/process/RunbookProcess-Runbooks-405" target="_blank">Destroy Azure Worker</a>: <i>Destroy dedicated worker for space.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-309/process/RunbookProcess-Runbooks-309" target="_blank">Destroy Environment Infrastructure</a>: <i>Tear down resources created for the environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-311/process/RunbookProcess-Runbooks-311" target="_blank">Destroy the Kraken</a>: <i>Destroy space-wide environment infrastructure as well as call Destroy Infrastructure and Destroy AWS RDS for each environment.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324/operations/runbooks/Runbooks-310/process/RunbookProcess-Runbooks-310" target="_blank">Unleash the Kraken</a>: <i>Create space-wide environment infrastructure as well as call Create Infrastructure and Create AWS RDS for each environment.</i>
    
**Target - NGINX**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-981/process/RunbookProcess-Runbooks-981" target="_blank">Create Infrastructure</a>: <i>Create infrastructure for the NGINX (nodejs) samples</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-1261/process/RunbookProcess-Runbooks-1261" target="_blank">Create PHP Infrastructure</a>: <i>Creates infrastructure for the PHP samples.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-1281/process/RunbookProcess-Runbooks-1281" target="_blank">Create Ruby Infrastructure</a>: <i>Creates infrastructure for applications running Ruby.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-2105/process/RunbookProcess-Runbooks-2105" target="_blank">Delete MySQL Databases</a>: <i>Deletes databases created by project deployments on the shared MySQL instance.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-982/process/RunbookProcess-Runbooks-982" target="_blank">Destroy Infrastructure</a>: <i>Tear down resources created for the NGINX (nodejs) samples</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-1262/process/RunbookProcess-Runbooks-1262" target="_blank">Destroy PHP Infrastructure</a>: <i>Destroys infrastructure for PHP projects.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-1282/process/RunbookProcess-Runbooks-1282" target="_blank">Destroy Ruby Infrastructure</a>: <i>Destroys infrastructure for Ruby projects.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-984/process/RunbookProcess-Runbooks-984" target="_blank">Destroy the Kraken</a>: <i>Destroy space-wide environment infrastructure as well as call Destroy Infrastructure</i>
   - <a href="https://samples.octopus.app/app#/Spaces-104/projects/Projects-962/operations/runbooks/Runbooks-983/process/RunbookProcess-Runbooks-983" target="_blank">Unleash the Kraken</a>: <i>Create space-wide environment infrastructure as well as call Create Infrastructure</i>
    
**Target - PaaS**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-64/projects/Projects-981/operations/runbooks/Runbooks-1005/process/RunbookProcess-Runbooks-1005" target="_blank">Create Azure Worker</a>: <i>Creates a dedicated space worker.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-64/projects/Projects-981/operations/runbooks/Runbooks-1003/process/RunbookProcess-Runbooks-1003" target="_blank">Create Infrastructure</a>: <i>Create environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-64/projects/Projects-981/operations/runbooks/Runbooks-1006/process/RunbookProcess-Runbooks-1006" target="_blank">Destroy Azure Worker</a>: <i>Destroys dedicated space worker.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-64/projects/Projects-981/operations/runbooks/Runbooks-1004/process/RunbookProcess-Runbooks-1004" target="_blank">Destroy Infrastructure</a>: <i>Destroy environment-specific infrastructure.</i>
    
**Target - Payara**

- PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-642/projects/Projects-1141/operations/runbooks/Runbooks-1164/process/RunbookProcess-Runbooks-1164" target="_blank">Create Infrastructure</a>: <i>Create project specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-642/projects/Projects-1141/operations/runbooks/Runbooks-1165/process/RunbookProcess-Runbooks-1165" target="_blank">Destroy Infrastructure</a>: <i>Destroys project specific infrastructure.</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-642/projects/Projects-1161/operations/runbooks/Runbooks-1163/process/RunbookProcess-Runbooks-1163" target="_blank">Destroy the Kraken</a>: <i>Destroys space-wide and project infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-642/projects/Projects-1161/operations/runbooks/Runbooks-1162/process/RunbookProcess-Runbooks-1162" target="_blank">Unleash the Kraken</a>: <i>Creates space-wide infrastructure and calls project runbooks.</i>
    
**Target - PostgreSQL**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341/operations/runbooks/Runbooks-1086/process/RunbookProcess-Runbooks-1086" target="_blank">Create Azure PostgreSQL Server</a>: <i>Creates a hosted PostgreSQL Server on Azure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341/operations/runbooks/Runbooks-384/process/RunbookProcess-Runbooks-384" target="_blank">Create Azure Worker</a>
   - <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341/operations/runbooks/Runbooks-321/process/RunbookProcess-Runbooks-321" target="_blank">Create Environment Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341/operations/runbooks/Runbooks-385/process/RunbookProcess-Runbooks-385" target="_blank">Destroy Azure Worker</a>
   - <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341/operations/runbooks/Runbooks-322/process/RunbookProcess-Runbooks-322" target="_blank">Destroy Environment Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341/operations/runbooks/Runbooks-323/process/RunbookProcess-Runbooks-323" target="_blank">Unleash the Kraken</a>
    
**Target - Serverless**

- Azure OctoSubscriber
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1824/operations/runbooks/Runbooks-1863/process/RunbookProcess-Runbooks-1863" target="_blank">Create Infrastructure</a>: <i>Creates infrastructure specific to this project.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1824/operations/runbooks/Runbooks-1882/process/RunbookProcess-Runbooks-1882" target="_blank">Test</a>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-568/operations/runbooks/Runbooks-589/process/RunbookProcess-Runbooks-589" target="_blank">Destroy Linux Worker</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-568/operations/runbooks/Runbooks-1425/process/RunbookProcess-Runbooks-1425" target="_blank">Destroy the Kraken</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-568/operations/runbooks/Runbooks-1424/process/RunbookProcess-Runbooks-1424" target="_blank">Unleash the Kraken</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-568/operations/runbooks/Runbooks-1441/process/RunbookProcess-Runbooks-1441" target="_blank">VMSS</a>
    
**Target - SQL Server**

- DACPAC - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-164/operations/runbooks/Runbooks-202/process/RunbookProcess-Runbooks-202" target="_blank">Spin up OctoFX-DACPAC Azure database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-164/operations/runbooks/Runbooks-203/process/RunbookProcess-Runbooks-203" target="_blank">Teardown OctoFX-DACPAC Azure database</a>
- DBUp - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-162/operations/runbooks/Runbooks-102/process/RunbookProcess-Runbooks-102" target="_blank">Delete Azure SQL Server Database</a>: <i>Runbook to tear down the database in Azure</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-162/operations/runbooks/Runbooks-221/process/RunbookProcess-Runbooks-221" target="_blank">Export Azure SQL Server Database</a>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-162/operations/runbooks/Runbooks-101/process/RunbookProcess-Runbooks-101" target="_blank">Spin Up Azure SQL Server Database</a>: <i>Runbook to spin up a database in Azure</i>
- Flyway - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-864/operations/runbooks/Runbooks-1062/process/RunbookProcess-Runbooks-1062" target="_blank">Destroy Infrastructure</a>: <i>Drops database for the environment.</i>
- Flyway - Azure SQL Execution Containers
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-1224/operations/runbooks/Runbooks-1227/process/RunbookProcess-Runbooks-1227" target="_blank">Destroy Infrastructure</a>: <i>Drops database for the environment.</i>
- Liquibase - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-865/operations/runbooks/Runbooks-1063/process/RunbookProcess-Runbooks-1063" target="_blank">Destroy Infrastructure</a>: <i>Destroys liquibase database for environment.</i>
- Redgate - Real World Example
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-261/operations/runbooks/Runbooks-223/process/RunbookProcess-Runbooks-223" target="_blank">Delete Redgate SQL Server Database</a>: <i>Runbook to tear down the database in Azure for Redgate sample</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-261/operations/runbooks/Runbooks-1201/process/RunbookProcess-Runbooks-1201" target="_blank">Delete Resource Group deployment</a>: <i>Deletes deployments to the resource group so we don't go over quota.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-261/operations/runbooks/Runbooks-222/process/RunbookProcess-Runbooks-222" target="_blank">Spin Up Redgate SQL Server Database</a>: <i>Runbook to spin up a database in Azure for the Redgate Sample</i>
- RoundhousE - Azure SQL
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-863/operations/runbooks/Runbooks-1064/process/RunbookProcess-Runbooks-1064" target="_blank">Destroy Infrastructure</a>: <i>Destroys the RoundhousE database for the environment.</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-123/process/RunbookProcess-Runbooks-123" target="_blank">Destroy the Kraken</a>: <i>Runbook to tear down all the all the Azure Infrastructure followed by any Windows Workers in an orderly manner</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-356/process/RunbookProcess-Runbooks-356" target="_blank">Spin up AWS Windows Worker</a>: <i>Runbook to spin up an AWS Windows Worker in the Oregon Region</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-264/process/RunbookProcess-Runbooks-264" target="_blank">Spin Up Azure Linux Container Worker</a>: <i>Runbook to spin up a container worker in Azure</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-88/process/RunbookProcess-Runbooks-88" target="_blank">Spin Up Azure Windows Workers</a>: <i>Runbook to spin up Windows Workers in Azure using ARM templates</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-357/process/RunbookProcess-Runbooks-357" target="_blank">Tear Down AWS Windows Worker</a>: <i>Runbook to tear down the AWS Windows Worker in the California Region</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-267/process/RunbookProcess-Runbooks-267" target="_blank">Tear Down Azure Linux Container Worker</a>: <i>Runbook to tear down the Azure Linux Containers Workers</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-89/process/RunbookProcess-Runbooks-89" target="_blank">Tear Down Azure Windows Worker</a>: <i>Runbook to tear down an Azure Windows Worker and remove it from the environment</i>
   - <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153/operations/runbooks/Runbooks-122/process/RunbookProcess-Runbooks-122" target="_blank">Unleash the Kraken</a>: <i>Runbook to kick off the spinning up of all Azure Windows Workers, along with any other infrastructure which depends on those workers in an orderly manner.</i>
    
**Target - Tomcat**

- Pet Clinic - Azure Web App
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1681/operations/runbooks/Runbooks-1721/process/RunbookProcess-Runbooks-1721" target="_blank">Create Infrastructure</a>: <i>Creates project-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1681/operations/runbooks/Runbooks-1724/process/RunbookProcess-Runbooks-1724" target="_blank">Destroy Infrastructure</a>: <i>Destroys project-specific infrastructure</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1682/operations/runbooks/Runbooks-1723/process/RunbookProcess-Runbooks-1723" target="_blank">Destroy the Kraken</a>: <i>Destroys all infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1682/operations/runbooks/Runbooks-1722/process/RunbookProcess-Runbooks-1722" target="_blank">Unleash the Kraken</a>: <i>Creates space-wise infrastructure.</i>
    
**Target - WebSphere**

- PetClinic
   - <a href="https://samples.octopus.app/app#/Spaces-662/projects/Projects-1206/operations/runbooks/Runbooks-1223/process/RunbookProcess-Runbooks-1223" target="_blank">Create Infrastructure</a>: <i>Creates project specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-662/projects/Projects-1206/operations/runbooks/Runbooks-1224/process/RunbookProcess-Runbooks-1224" target="_blank">Destroy Infrastructure</a>: <i>Destroys environment specific infrastructure.</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-662/projects/Projects-1205/operations/runbooks/Runbooks-1222/process/RunbookProcess-Runbooks-1222" target="_blank">Destroy the Kraken</a>: <i>Tears down space-wide infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-662/projects/Projects-1205/operations/runbooks/Runbooks-1221/process/RunbookProcess-Runbooks-1221" target="_blank">Unleash the Kraken</a>: <i>Creates space-wide infrastructure.</i>
    
**Target - Wildfly**

- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-85/projects/Projects-931/operations/runbooks/Runbooks-965/process/RunbookProcess-Runbooks-965" target="_blank">Create Azure Worker</a>
   - <a href="https://samples.octopus.app/app#/Spaces-85/projects/Projects-931/operations/runbooks/Runbooks-952/process/RunbookProcess-Runbooks-952" target="_blank">Create Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-85/projects/Projects-931/operations/runbooks/Runbooks-966/process/RunbookProcess-Runbooks-966" target="_blank">Destroy Azure Worker</a>
   - <a href="https://samples.octopus.app/app#/Spaces-85/projects/Projects-931/operations/runbooks/Runbooks-953/process/RunbookProcess-Runbooks-953" target="_blank">Destroy Infrastructure</a>
    
**Target - Windows**

- OctoFX
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-274/process/RunbookProcess-Runbooks-274" target="_blank">Manual Failover to Primary</a>: <i>This is a Runbook designed to failover back from Disaster Recovery in UK South to Western Europe. Please check all resources are healthy before running this Runbook.

* Must be run in the context of Production for URL testing to work successfully.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-273/process/RunbookProcess-Runbooks-273" target="_blank">Monitor Primary Website & Failover to DR if offline</a>: <i>This is to be run in the context of Disaster Recovery so it can spin up the correct machines and then failover. 
* Checks Production URL
* Starts DR SQL & Web
* Switches DNS over. 60s TTL</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-255/process/RunbookProcess-Runbooks-255" target="_blank">Start Environment</a>: <i>Starts the Web and SQL Server for specified environments. This is the template for the scheduled triggers turning on Infrastructure</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-262/process/RunbookProcess-Runbooks-262" target="_blank">Stop Environment</a>: <i>Stops the Web and SQL Server for specified environments. This is the template for the scheduled triggers turning off Infrastructure</i>
- Space Infrastructure
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-1846/operations/runbooks/Runbooks-1921/process/RunbookProcess-Runbooks-1921" target="_blank">Create Infrastructure</a>: <i>Creates environment-specific infrastructure.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-1846/operations/runbooks/Runbooks-1922/process/RunbookProcess-Runbooks-1922" target="_blank">Destroy Infrastructure</a>: <i>Destroys environment-specific infrastructure.</i>
