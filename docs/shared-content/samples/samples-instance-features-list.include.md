### 

****
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
  - []()
### IIS

**Pattern - Blue-Green**
  - [Random Quotes .NET](https://samples.octopus.app/app#/Spaces-302/projects/Projects-542): *Deploys the .NET version of Random Quotes using the Blue/Green*<span class='collapse' id='more-iis-spaces-302-projects-542'> *environment pattern. [Build definition](https://bamboosample.octopus.com/browse/RAN-NET)*</span>
<span>
<a href='#more-iis-spaces-302-projects-542' data-toggle='collapse'> ...</a>
</span>

**Pattern - IaC**
  - [Random Quotes - Azure](https://samples.octopus.app/app#/Spaces-48/projects/Projects-1851): *Uses runbooks to create Azure virtual machines [using Terraform code](https://dev.azure.com/octopussamples/Terraform%20-%20RandomQuotes%20Azure/_git/Terraform%20-%20RandomQuotes%20Azure)*<span class='collapse' id='more-iis-spaces-48-projects-1851'> *for hosting an application and backing database, then deploys the Random Quotes database and application to those machines.*</span>
<span>
<a href='#more-iis-spaces-48-projects-1851' data-toggle='collapse'> ...</a>
</span>
  - [Random Quotes AWS](https://samples.octopus.app/app#/Spaces-48/projects/Projects-1861): *This is a sample project that showcases the use of*<span class='collapse' id='more-iis-spaces-48-projects-1861'> *Terraform with runbooks to create the infrastructure that is needed for a projects deployments. The runbooks in this project spin up two EC2 instances within AWS that are then used to deploy the Random Quotes web application and database to.*</span>
<span>
<a href='#more-iis-spaces-48-projects-1861' data-toggle='collapse'> ...</a>
</span>

**Pattern - Rollbacks**
  - [01 OctoFx - Original](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1603)
  - [02 OctoFX - Simple Rollback](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1604)
  - [03 OctoFX - Complex Rollback](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1602)

**Pattern-AutoScaling**
  - [App + VMSS](https://samples.octopus.app/app#/Spaces-742/projects/Projects-1502)
  - [To Do Web Application](https://samples.octopus.app/app#/Spaces-742/projects/Projects-1466)

**Target - Hybrid**
  - [Octo Pet Shop](https://samples.octopus.app/app#/Spaces-342/projects/Projects-445): *Sample project that uses the Deploy to IIS step to*<span class='collapse' id='more-iis-spaces-342-projects-445'> *deploy to both IIS on a VM and an Azure Web App. [Build definition](https://app.circleci.com/pipelines/github/OctopusSamples/OctoPetShop)*</span>
<span>
<a href='#more-iis-spaces-342-projects-445' data-toggle='collapse'> ...</a>
</span>

**Target - Windows**
  - [Computer Provisioning](https://samples.octopus.app/app#/Spaces-202/projects/Projects-761)
  - [eShopOnWeb](https://samples.octopus.app/app#/Spaces-202/projects/Projects-1481): *Microsoft ASP.NET Core 5.0 Reference Application*
                    
  - [OctoFX](https://samples.octopus.app/app#/Spaces-202/projects/Projects-282): *Build Server: [Azure DevOps](https://dev.azure.com/octopussamples/octofx) Webinar: [YouTube](https://youtu.be/mLgeQRUlcl0)*
                    
### Java

**Artifactory API**
  - [Octopus Pet Shop](https://samples.octopus.app/app#/Spaces-622/projects/Projects-1061)

**Pattern - Blue-Green**
  - [Random Quotes - Tenanted](https://samples.octopus.app/app#/Spaces-302/projects/Projects-562): *Deploys the Java version of Random Quotes to Tomcat using*<span class='collapse' id='more-java-spaces-302-projects-562'> *the Blue/Green tenant pattern.*</span>
<span>
<a href='#more-java-spaces-302-projects-562' data-toggle='collapse'> ...</a>
</span>
  - [Random Quotes Java](https://samples.octopus.app/app#/Spaces-302/projects/Projects-402): *Deploys the Java version of Random Quotes to Tomcat using*<span class='collapse' id='more-java-spaces-302-projects-402'> *the Blue/Green environment pattern. [Build definition](https://bamboosample.octopus.com/browse/RAN-JAVA)*</span>
<span>
<a href='#more-java-spaces-302-projects-402' data-toggle='collapse'> ...</a>
</span>

**Pattern - Rollbacks**
  - [01 PetClinic - Original](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1624): *PetClinic Java Springboot application deploying to MySQL, Wildfly, and Tomcat*
                    
  - [02 PetClinic - SimpleRollback](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1625): *PetClinic Java Springboot application deploying to MySQL, Wildfly, and Tomcat*
                    
  - [03 PetClinic - ComplexRollback](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1626): *PetClinic Java Springboot application deploying to MySQL, Wildfly, and Tomcat*
                    

**Pattern - Rolling**
  - [PetClinic - no rolling deploy](https://samples.octopus.app/app#/Spaces-45/projects/Projects-383): *A project showing a deployment process which doesn't use the*<span class='collapse' id='more-java-spaces-45-projects-383'> *rolling deployments pattern*</span>
<span>
<a href='#more-java-spaces-45-projects-383' data-toggle='collapse'> ...</a>
</span>

**Target - Tomcat**
  - [Pet Clinic AWS](https://samples.octopus.app/app#/Spaces-203/projects/Projects-371): *Deploy Java PetClinic to AWS Linux [Build definition](https://dev.azure.com/octopussamples/PetClinic/_build?definitionId=25)*
                    

**Target - Wildfly**
  - [PetClinic](https://samples.octopus.app/app#/Spaces-85/projects/Projects-141)
### Kubernetes

**Pattern - Rollbacks**
  - [01 Kubernetes Original](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1641)
  - [02 Kubernetes - Simple Rollback](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1642)
  - [03 Kubernetes - Complex Rollback](https://samples.octopus.app/app#/Spaces-762/projects/Projects-1643)

**Pattern - Tenants**
  - [Space Infrastructure](https://samples.octopus.app/app#/Spaces-682/projects/Projects-1301)

**Target - Kubernetes**
  - [Database](https://samples.octopus.app/app#/Spaces-105/projects/Projects-201)
  - [Migrations](https://samples.octopus.app/app#/Spaces-105/projects/Projects-241)
  - [Multi-Cloud PetClinic](https://samples.octopus.app/app#/Spaces-105/projects/Projects-1707): *Setup AWS EKS, GCP GKE, and Azure AKS Clusters and*<span class='collapse' id='more-kubernetes-spaces-105-projects-1707'> *targets within Octopus*</span>
<span>
<a href='#more-kubernetes-spaces-105-projects-1707' data-toggle='collapse'> ...</a>
</span>
  - [MySQL Helm Chart](https://samples.octopus.app/app#/Spaces-105/projects/Projects-322): *Sample showing how to deploy the MySQL Helm Chart.*
                    
  - [nginx+httpd](https://samples.octopus.app/app#/Spaces-105/projects/Projects-964)
  - [Octo Pet Shop - Raw YAML](https://samples.octopus.app/app#/Spaces-105/projects/Projects-302)
  - [Octopus HA in GKE](https://samples.octopus.app/app#/Spaces-105/projects/Projects-1822): *This project shows how you can deploy Octopus High Availability*<span class='collapse' id='more-kubernetes-spaces-105-projects-1822'> *into Google Kubernetes Engine (GKE).*</span>
<span>
<a href='#more-kubernetes-spaces-105-projects-1822' data-toggle='collapse'> ...</a>
</span>
  - [OctopusDeploy](https://samples.octopus.app/app#/Spaces-105/projects/Projects-1241): *Setup an AWS EKS Cluster and target within Octopus Resources:*<span class='collapse' id='more-kubernetes-spaces-105-projects-1241'> *[AWS EKS Configuration](https://github.com/OctopusSamples/IaC/blob/master/aws/Kubernetes/cluster.yaml)  [eksctrl](https://github.com/weaveworks/eksctl)*</span>
<span>
<a href='#more-kubernetes-spaces-105-projects-1241' data-toggle='collapse'> ...</a>
</span>
  - [PetClinic](https://samples.octopus.app/app#/Spaces-105/projects/Projects-861): *Setup an AWS EKS Cluster and target within Octopus Resources:*<span class='collapse' id='more-kubernetes-spaces-105-projects-861'> *[AWS EKS Configuration](https://github.com/OctopusSamples/IaC/blob/master/aws/Kubernetes/cluster.yaml)  [eksctrl](https://github.com/weaveworks/eksctl)*</span>
<span>
<a href='#more-kubernetes-spaces-105-projects-861' data-toggle='collapse'> ...</a>
</span>
  - [Product API](https://samples.octopus.app/app#/Spaces-105/projects/Projects-203)
  - [Rancher](https://samples.octopus.app/app#/Spaces-105/projects/Projects-1032)
  - [Shopping Cart API](https://samples.octopus.app/app#/Spaces-105/projects/Projects-204)
  - [Web App](https://samples.octopus.app/app#/Spaces-105/projects/Projects-205)
