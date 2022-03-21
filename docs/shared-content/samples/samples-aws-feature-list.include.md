**Octopus Admin**
            
- <a href="https://samples.octopus.app/app#/Spaces-142/projects/Projects-1001" target="_blank">Instance Infrastructure</a>: *Creates infrastructure that is used instance wide such as workers that can be used in all Spaces.*

**Pattern - Blue-Green**

- <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542" target="_blank">Random Quotes .NET</a>: *Deploys the .NET version of Random Quotes using the Blue/Green environment pattern. [Build definition](https://bamboosample.octopus.com/browse/RAN-NET)*
- <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-402" target="_blank">Random Quotes Java</a>: *Deploys the Java version of Random Quotes to Tomcat using the Blue/Green environment pattern. [Build definition](https://bamboosample.octopus.com/browse/RAN-JAVA)*

**Pattern - Rolling**

- <a href="https://samples.octopus.app/app#/Spaces-45/projects/Projects-386" target="_blank">AWS - Rolling Deploy</a>: *A project deploying the [RandomQuotes-Java](https://bitbucket.org/octopussamples/randomquotes-java/src/master/) application with zero downtime*

**Pattern-AutoScaling**

- <a href="https://samples.octopus.app/app#/Spaces-742/projects/Projects-1464" target="_blank">AWS ASG</a>: *A sample project showing how to check the provisioning status of an AWS Auto Scaling Group (ASG).*

**Secrets Management**

- <a href="https://samples.octopus.app/app#/Spaces-822/projects/Projects-1702" target="_blank">AWS Secrets Manager</a>: *Sample project retrieving secrets from AWS Secrets Manager using the [Retrieve Secrets](https://library.octopus.com/step-templates/5d5bd3ae-09a0-41ac-9a45-42a96ee6206a/actiontemplate-aws-secrets-manager-retrieve-secrets) step template.*

**Target - Containers**

- <a href="https://samples.octopus.app/app#/Spaces-103/projects/Projects-647" target="_blank">AWS ECS</a>: *Deploys the OctoPetShop application to AWS ECS Fargate using AWS ECR. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/OctoPetShop_OctoPetShopDockerEcr)*
- <a href="https://samples.octopus.app/app#/Spaces-103/projects/Projects-1848" target="_blank">AWS ECS 2</a>: *Deploys the OctoPetShop application to AWS ECS Fargate using AWS ECR. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/OctoPetShop_OctoPetShopDockerEcr)*
- <a href="https://samples.octopus.app/app#/Spaces-103/projects/Projects-945" target="_blank">Space Infrastructure</a>: *Creates and destroys Infrastructure for this space.*

**Target - Kubernetes**

- <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707" target="_blank">Multi-Cloud PetClinic</a>: *Setup AWS EKS, GCP GKE, and Azure AKS Clusters and targets within Octopus*
- <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-1241" target="_blank">OctopusDeploy</a>: *Setup an AWS EKS Cluster and target within Octopus Resources: [AWS EKS Configuration](https://github.com/OctopusSamples/IaC/blob/master/aws/Kubernetes/cluster.yaml)  [eksctrl](https://github.com/weaveworks/eksctl)*
- <a href="https://samples.octopus.app/app#/Spaces-105/projects/Projects-861" target="_blank">PetClinic</a>: *Setup an AWS EKS Cluster and target within Octopus Resources: [AWS EKS Configuration](https://github.com/OctopusSamples/IaC/blob/master/aws/Kubernetes/cluster.yaml)  [eksctrl](https://github.com/weaveworks/eksctl)*

**Target - MariaDB**

- <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-363" target="_blank">DBUp - AWS RDS</a>: *Example project for automated database deployments using Dbup against an AWS RDS MariaDB instance. [Build definition](https://jenkinssample.octopus.com/job/PetClinic%20-%20Target%20-%20MariaDB%20-%20Dbup/)*
- <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-369" target="_blank">Flyway - AWS RDS</a>: *Example project for automated database deployments using Flyway against an AWS RDS MariaDB instance. [Build defintion](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildFlyway)*
- <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-703" target="_blank">Liquibase - AWS RDS</a>: *Sample project that creates and deploys the sakila database to an AWS RDS MariaDB instance using Liquibase. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildLiquibase)*
- <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-424" target="_blank">RoundhousE - AWS RDS</a>: *Example project for automated database deployments using RoundhousE against an AWS RDS MariaDB instance. [Build defintion](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildRoundhouse)*
- <a href="https://samples.octopus.app/app#/Spaces-262/projects/Projects-350" target="_blank">Space Infrastructure</a>: *Creates and destroys Infrastructure for this space.*

**Target - MySQL**

- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-353" target="_blank">Dbup - AWS RDS</a>: *Example project for automated database deployments using Dbup against an AWS RDS MySQL instance.  [Build defintion](https://teamcitysample.octopus.com/buildConfiguration/Target_MySQL_AWS_Dbup)*
- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-361" target="_blank">Flyway - AWS RDS</a>: *Example project for automated database deployments using Flyway against an AWS RDS MySQL instance. [Build defintion](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildFlyway)*
- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-869" target="_blank">Liquibase - AWS RDS</a>: *Sample project that creates and deploys the sakila database to an AWS RDS MySQL instance using Liquibase. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildLiquibase)*
- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-387" target="_blank">RoundhousE - AWS RDS</a>: *Example project for automated database deployments using RoundhousE against an AWS RDS MySQL instance. [Build defintion](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildRoundhouse)*
- <a href="https://samples.octopus.app/app#/Spaces-242/projects/Projects-324" target="_blank">Space Infrastructure</a>: *Creates and destroys Infrastructure for this space.*

**Target - Oracle**

- <a href="https://samples.octopus.app/app#/Spaces-422/projects/Projects-883" target="_blank">DBUp RDS</a>: *Sample project that creates and deploys the Sakila database to an Oracle database server in AWS using DBUp.  [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildDBUp)*
- <a href="https://samples.octopus.app/app#/Spaces-422/projects/Projects-663" target="_blank">Flyway RDS</a>: *Sample project that deploys the sakila database to an AWS RDS Oracle instance using Flyway. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildLiquibase)*
- <a href="https://samples.octopus.app/app#/Spaces-422/projects/Projects-701" target="_blank">Liquibase RDS</a>: *Sample project that deploys the sakila database to an AWS RDS Oracle instance using Liquibase. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildLiquibase)*
- <a href="https://samples.octopus.app/app#/Spaces-422/projects/Projects-662" target="_blank">Space Infrastructure</a>: *Creates and destroys Infrastructure for this space.*

**Target - PostgreSQL**

- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-372" target="_blank">DBUp - AWS RDS</a>: *Example project for automated database deployments using Dbup against an AWS RDS PostgreSQL instance. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildDBUp)*
- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-373" target="_blank">Flyway - AWS RDS</a>: *Example project for automated database deployments using Flyway against an AWS RDS PostgreSQL instance. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildFlyway)*
- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-867" target="_blank">Liquibase - AWS RDS</a>: *Sample project that creates and deploys the sakila database to Postgres using Liquibase. [Build definition](https://teamcitysample.octopus.com/buildConfiguration/Sakila_BuildLiquibase)*
- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-442" target="_blank">RoundhousE - AWS RDS</a>: *Example project for automated database deployments using RoundhousE against an AWS RDS PosgreSQL instance. [Build defintion](https://bitbucket.org/octopussamples/sakila/src/posgres/)*
- <a href="https://samples.octopus.app/app#/Spaces-243/projects/Projects-341" target="_blank">Space Infrastructure</a>: *Creates and destroys Infrastructure for this space.*

**Target - Serverless**

- <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1742" target="_blank">AWS OctoSubscriber</a>: *A Lambda Function that accepts and processes Octopus Deploy Subscription Guided Failure or Manual Intervention Events. [Build definition](https://github.com/OctopusSamples/OctoSubscriber/blob/main/.github/workflows/AWSLambdas.yml)*
- <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1465" target="_blank">AWS SAM</a>: *AWS SAM deployment based on the [blog post](https://octopus.com/blog/aws-sam-and-octopus) using code in the [AWSSamExample](https://github.com/OctopusSamples/AWSSamExample) repo.*
- <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-1781" target="_blank">AWS Subscriber S3</a>: *A Lambda Function that accepts and processes Octopus Deploy Subscription Events*
- <a href="https://samples.octopus.app/app#/Spaces-1/projects/Projects-511" target="_blank">Sample AWS Lambda</a>

**Target - SQL Server**

- <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-649" target="_blank">AWS Backup and Restore S3</a>: *Backup a SQL RDS Database to S3 and Restore*
- <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-374" target="_blank">Redgate - Feature Branch Example</a>: *Sample project for deploying a database using Redgate SQL Change Automation with feature branches*
- <a href="https://samples.octopus.app/app#/Spaces-106/projects/Projects-153" target="_blank">Space Infrastructure</a>: *Contains runbooks to spin up and down infrastructure for this space*

**Target - Tomcat**

- <a href="https://samples.octopus.app/app#/Spaces-203/projects/Projects-371" target="_blank">Pet Clinic AWS</a>: *Deploy Java PetClinic to AWS Linux [Build definition](https://dev.azure.com/octopussamples/PetClinic/_build?definitionId=25)*

**Target - Windows**

- <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-1846" target="_blank">Space Infrastructure</a>: *Creates and destroys Infrastructure for this space.*

**Tenants - Regions**

- <a href="https://samples.octopus.app/app#/Spaces-102/projects/Projects-152" target="_blank">Core IaC</a>: *This project will spin up the workers required for deployments using Runbooks. This project also contains runbooks to spin up and tear down all infrastructure for this space.*
- <a href="https://samples.octopus.app/app#/Spaces-102/projects/Projects-148" target="_blank">To Do - Linux</a>: *This project will deploy this .NET Core application to Ubuntu EC2 instances in AWS. The EC2 instances are located in US West 1, US West 2 and US East 2.*
