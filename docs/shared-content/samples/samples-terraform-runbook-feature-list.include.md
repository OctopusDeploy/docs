**Pattern - IaC**

- Dynamic worker army
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-68/operations/runbooks/Runbooks-1893/process/RunbookProcess-Runbooks-1893" target="_blank">Create Infrastructure</a>: *Spins up the worker army*
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-68/operations/runbooks/Runbooks-1894/process/RunbookProcess-Runbooks-1894" target="_blank">Destroy Infrastructure</a>: *Tears down the worker army.*
- Random Quotes - Azure
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1851/operations/runbooks/Runbooks-1897/process/RunbookProcess-Runbooks-1897" target="_blank">Create and Configure Terraform Infrastructure</a>: *Creates necessary infrastructure in Azure [using Terraform](https://dev.azure.com/octopussamples/_git/Azure-Terraform-RandomQuotes) and configures it for application deployment.*
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1851/operations/runbooks/Runbooks-1898/process/RunbookProcess-Runbooks-1898" target="_blank">Destroy Terraform Resources and Delete Deployment Targets</a>: *Destroys created Terraform resources and removes registered deployment targets.*
- Random Quotes AWS
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1861/operations/runbooks/Runbooks-1923/process/RunbookProcess-Runbooks-1923" target="_blank">Create Infrastructure</a>: *Creates EC2 instances using Terraform, registers them as deployment targets with Octopus, and then provisions them with the necessary tooling for application deployment.*
   - <a href="https://samples.octopus.app/app#/Spaces-48/projects/Projects-1861/operations/runbooks/Runbooks-1924/process/RunbookProcess-Runbooks-1924" target="_blank">Destroy Infrastructure</a>: *Destroys created EC2 instances and all supporting resources created through Terraform along with deregistering them as targets within Octopus.*
    
**Target - Serverless**

- AWS OctoSubscriber
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-1805/process/RunbookProcess-Runbooks-1805" target="_blank">Spin Up Subscriber Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742/operations/runbooks/Runbooks-1807/process/RunbookProcess-Runbooks-1807" target="_blank">Tear Down AWS Subscriber Infrastructure</a>
- AWS Subscriber S3
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1781/operations/runbooks/Runbooks-1821/process/RunbookProcess-Runbooks-1821" target="_blank">Spin Up Subscriber Infrastructure</a>
   - <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1781/operations/runbooks/Runbooks-1823/process/RunbookProcess-Runbooks-1823" target="_blank">Tear Down AWS Subscriber Infrastructure</a>
    
**Target - Windows**

- eShopOnWeb
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-1481/operations/runbooks/Runbooks-1901/process/RunbookProcess-Runbooks-1901" target="_blank">Create Infrastructure</a>: *Stands up an Azure VM with IIS and SQL Server Express using Terraform for eShopOnWeb to be deployed on to.*
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-1481/operations/runbooks/Runbooks-1902/process/RunbookProcess-Runbooks-1902" target="_blank">Destroy Infrastructure</a>: *Destroys the Azure VM and infrastructure created for this project.*
    
**Tenants - Regions**

- To Do - Linux
   - <a href="https://samples.octopus.app/app#/Spaces-102/projects/Projects-148/operations/runbooks/Runbooks-1283/process/RunbookProcess-Runbooks-1283" target="_blank">Runbook With Packages</a>
