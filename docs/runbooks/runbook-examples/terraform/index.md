---
title: Terraform
description: Octopus Deploy can help you automate the provisioning of infrastructure with Terraform using runbooks.
position: 10
---

Terraform is a popular, platform agnostic implementation of Infrastructure as Code (IaC).  Terraform is designed to ensure that the resources it creates are kept within the desired state, this is known as Desired State Configuration (DSC).

Out of the box, Octopus Deploy comes with a built-in step templates using Terraform
- Apply a Terraform template
- Destroy Terraform resources
- Plan to apply a Terraform tempalte
- Plan a Terraform destroy

With runbooks, you can use Terraform to create your infrastructure resources.