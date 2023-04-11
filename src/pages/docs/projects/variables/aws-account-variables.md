---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: AWS account variables
description: Create an AWS account to use it in AWS-related deployment steps
navOrder: 80
---

[AWS accounts](/docs/infrastructure/accounts/aws/index.md) are included in a project through a project [variable](/docs/projects/variables/index.md) of the type **Amazon Web Services Account**. Before you create an **AWS account Variable**, you need to [create an AWS account](/docs/infrastructure/accounts/aws/index.md) in Octopus:

![AWS account variable](images/aws-account-variable.png "width=500")

The **Add Variable** window is then displayed and lists all the AWS accounts.

Select the AWS account you want to access from the project to assign it to the variable:

![AWS account variable selection](images/aws-account-variable-selection.png "width=500")


## AWS account variable properties

The AWS account variable also exposes the following properties that you can reference in a PowerShell script:

| Name and description |
| -------------------- |
| **`AccessKey`** <br/> The Access Key for the AWS account|
| **`SecretKey`** <br/> The Secret Key for the AWS account|

### Accessing the properties in a script

Each of the above properties can be referenced in PowerShell.

```powershell
# For an account with a variable name of 'aws account'

# Using $OctopusParameters
Write-Host 'AwsAccount.Id=' $OctopusParameters["aws account"]
Write-Host 'AwsAccount.AccessKey=' $OctopusParameters["aws account.AccessKey"]

# Directly as a variable
Write-Host 'AwsAccount.Id=' #{aws account}
Write-Host 'AwsAccount.AccessKey=' #{aws account.AccessKey}
```

:::hint
**Parameter naming convention**
The name of the Octopus Parameter will be mapped to the name of the variable that was defined. As shown in the PowerShell example, one of the parameters is named `aws account` because the variable defined above was also named `aws account`. If the variable were named `test account information`, the PowerShell example would need to be changed to `test account information`.
:::

## Add an AWS account to Octopus

For instructions to set up an AWS account in Octopus, see [AWS accounts](/docs/infrastructure/accounts/aws/index.md).

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
