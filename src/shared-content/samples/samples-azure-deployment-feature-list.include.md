**Octopus Admin**

- <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-352/deployments/process" target="_blank">AzFuncNotifySlack</a>: <i>Azure Function App that consumes Octopus subscription webhook and send message to Slack</i>
    
**Pattern - Canary**

- <a href="https://samples.octopus.app/app#/Spaces-542/projects/Projects-943/deployments/process" target="_blank">Deploy Web App</a>: <i>A sample project showing canary deployments of RandomQuotes to Azure WebApps.</i>
    
**Pattern - Monolith**

- <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-523/deployments/process" target="_blank">Pitstop</a>: <i>Sample project of a monolithic deployment process.</i>
- <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-873/deployments/process" target="_blank">Pitstop - Customer Management</a>: <i>Project for the Customer Management API of the Pitstop application. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/PitStop_BuildDotnet)</i>
- <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-875/deployments/process" target="_blank">Pitstop - Vehicle Management</a>: <i>Project for the Vehicle Management API for the Pitstop application. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/PitStop_BuildDotnet)</i>
- <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-876/deployments/process" target="_blank">Pitstop - Workshop Management</a>: <i>Project for the Workshop Management API for the Pitstop application. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/PitStop_BuildDotnet)</i>
- <a href="https://samples.octopus.app/app#/Spaces-362/projects/Projects-881/deployments/process" target="_blank">Pitstop - Web</a>: <i>Project for the Web front-end of the Pitstop application. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/PitStop_BuildDotnet)</i>
    
**Pattern - Rolling**

- <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-1504/deployments/process" target="_blank">Private Web App</a>: <i>Sample project for Azure Web App deployments using a [private endpoint](https://docs.microsoft.com/en-us/azure/app-service/networking/private-endpoint).</i>
    
**Pattern - Tenants**

- <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1302/deployments/process" target="_blank">Vet Clinic</a>: <i>A project that deploys the VetClinic application for [multiple customers modeled as tenants](https://octopus.com/docs/tenants/guides/multi-tenant-saas-application).</i>
- <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1341/deployments/process" target="_blank">Car Rental</a>: <i>A sample car rental application utilizing PHP, Linux, and MySQL. [Build definition](https://jenkins.octopussamples.com/job/CarRental/)</i>
- <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1361/deployments/process" target="_blank">OctoPetShop</a>: <i>A project that deploys the OctoPetShop application for [different teams modeled as tenants](https://octopus.com/docs/tenants/guides/multi-tenant-teams).</i>
- <a href="https://samples.octopus.app/app#/Spaces-682/projects/Projects-1581/deployments/process" target="_blank">OctoHR</a>: <i>A sample [version-controlled](https://octopus.com/docs/projects/version-control) project illustrating a single codebase (web app) with multiple separate customer (tenant) databases that users can access. Source code available on [GitHub](https://github.com/OctopusSamples/OctoHR).</i>
    
**Pattern-AutoScaling**

- <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1462/deployments/process" target="_blank">Azure VMSS Orchestration</a>: <i>A sample project showing how to use an orchestration project to deploy child applications with an Azure Virtual Machine scale set (VMSS).</i>
- <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1502/deployments/process" target="_blank">App + VMSS</a>: <i>A sample project showing how to deploy an application when using an Azure Virtual Machine scale set (VMSS).</i>
    
**Secrets Management**

- <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1701/deployments/process" target="_blank">Azure Key Vault</a>: <i>Sample project retrieving secrets from Azure Key Vault using the [Retrieve Secrets](https://library.octopus.com/step-templates/6f59f8aa-b2db-4f7a-b02d-a72c13d386f0/actiontemplate-azure-key-vault-retrieve-secrets) step template.</i>
    
**Target - Hybrid**

- <a href="https://samples.octopus.app/app#/Spaces-342/projects/Projects-445/deployments/process" target="_blank">Octo Pet Shop</a>: <i>Sample project that uses the Deploy to IIS step to deploy to both IIS on a VM and an Azure Web App. [Build definition](https://app.circleci.com/pipelines/github/OctopusSamples/OctoPetShop)</i>
    
**Target - MySQL**

- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-1122/deployments/process" target="_blank">Flyway - Azure PaaS</a>: <i>Demonstrates how to perform automated database updates using Flyway against MySQL. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/Sakila_BuildFlyway)</i>
- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-1123/deployments/process" target="_blank">Liquibase - Azure PaaS</a>: <i>Sample project that creates and deploys the sakila database to a MySQL container hosted in Azure using Liquibase. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/Sakila_BuildLiquibase)</i>
- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-2023/deployments/process" target="_blank">Grate - Azure PaaS</a>: <i>Example project for automated database deployments using grate against an Azure MySQL instance. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/Sakila_Grate)</i>
    
**Target - PaaS**

- <a href="https://samples.octopus.app/app#/Spaces-64/projects/Projects-1381/deployments/process" target="_blank">OctoPetShop</a>: <i>A .NET Core Sample application used by Octopus to sample deployments and Runbooks.  This example deploys OctoPetShop to Azure PaaS. The Product, Shopping Cart and Web App are deployed to Azure Web Apps and the Database to an empty Azure SQL server - [Build](https://octopussamplesext.visualstudio.com/OctoPetShop/)</i>
    
**Target - PostgreSQL**

- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-1084/deployments/process" target="_blank">Flyway - Azure PaaS</a>: <i>Demonstrates how to perform automated database updates using Flyway against PostgreSQL. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/Sakila_BuildFlyway)</i>
- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-1085/deployments/process" target="_blank">Liquibase - Azure PaaS</a>: <i>Sample project that creates and deploys the sakila database to a PostgreSQL container hosted in Azure using Liquibase. [Build definition](https://teamcity.octopussamples.com/buildConfiguration/Sakila_BuildLiquibase)</i>
- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-2144/deployments/process" target="_blank">Grate - Azure PaaS</a>
    
**Target - Serverless**

- <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1824/deployments/process" target="_blank">Azure OctoSubscriber</a>: <i>Azure Functions that accept and process an Octopus Deploy Subscription and notify users via slack when a variable has changed. [Build definition](https://github.com/OctopusSamples/OctoSubscriber/blob/main/.github/workflows/AzureFunctions.yml)</i>
- <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-66/deployments/process" target="_blank">Sample Azure Function</a>: <i>A sample project that deploys an Azure function using the `Deploy to Azure App Service` step.</i>
    
**Target - Tomcat**

- <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-1681/deployments/process" target="_blank">Pet Clinic - Azure Web App</a>: <i>Deploy the Java PetClinic application to Tomcat hosted in an Azure Web App.</i>
- <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-2101/deployments/process" target="_blank">PetClinic - Demo</a>: <i>Deploy the Java PetClinic application to Tomcat hosted in an Azure Web App.</i>
