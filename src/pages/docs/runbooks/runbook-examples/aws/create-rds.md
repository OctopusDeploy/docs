---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Provision an AWS RDS instance
description: Provision an AWS RDS using a runbook
navOrder: 10
---

AWS Relational Database Service (RDS) is a managed database server in the cloud. RDS provides a cost-efficient, relational database and manages common database administration tasks.  Using a runbook, Octopus makes it easy to provide an automated method for creating RDS instances.

In this example, we'll use the built-in steps of Octopus Deploy to create an AWS PostgreSQL RDS instance.

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Run an AWS CLI script** step.

:::info
This example assumes that you already have a Virtual Private Cloud (VPC), subnets, and security groups created.  The ID's of these resources will be needed for our RDS instance.
:::

5. Paste in the following example code, this will find the VPC, subnet, and security group ID values and assign them to output variables to be used later:

```powershell
# Get reference to VPC
$vpcList = $(aws ec2 describe-vpcs --filter Name=tag:Name,Values=#{AWS.CloudFormation.VPC.Name}) | ConvertFrom-Json

# Check to see if anything was returned
if (($null -eq $vpcList))
{
	Write-Error "Failed retrieving vpc list." 
}

# Get VPC Id
$vpcId = $vpcList.Vpcs[0].VpcId

Write-Output "Found VPC: $vpcId ..."

# Get Subnets reference
$subnetList = $(aws ec2 describe-subnets --filter Name=vpc-id,Values=$vpcId) | ConvertFrom-Json

# Get the subnet ids
$subnet1Id = $subnetList.Subnets[0].SubnetId
$subnet2Id = $subnetList.Subnets[1].SubnetId

Write-Output "Found Subnet1: $subnet1Id and Subnet2: $subnet2Id ..."

# Get reference to security group
$securityGroupList = $(aws ec2 describe-security-groups --filter Name=vpc-id,Values=$vpcId,Name=tag:Name,Values=#{AWS.CloudFormation.SecurityGroup.Name}) | ConvertFrom-Json

# Get the security group id
$securityGroupId = $securityGroupList.SecurityGroups[0].GroupId

Write-Output "Found Security Group: $securityGroupId ..."

# Create output variables
Set-OctopusVariable -name "AWS.VPC.Id" -value $vpcId
Set-OctopusVariable -name "AWS.Subnet1.Id" -value $subnet1Id
Set-OctopusVariable -name "AWS.Subnet2.Id" -value $subnet2Id
Set-OctopusVariable -name "AWS.SecurityGroup.Id" -value $securityGroupId
```
6. Add a **Deploy an AWS CloudFormation template** step.
7. Fill in the parameters for the step:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| AWS Account | The AWS account to use | This will be a variable defined in either Project variables or a Library Variable Seet |
| Region | The region your resources will be located in | us-west-1 |
| CloudFormation stack name | Name of the stack you're creating | MySuperStack |
| Role ARN | The Amazon Resource Name (ARN) of an AWS Identity and Access Management (IAM) role that AWS CloudFormation assumes when executing any operations. This role will be used for any future operations on the stack. | MyARN |
| Select IAM Capability | Capability of IAM | Use dropdown to select capability |
| Disable rollback | Whether or not you want to automatically rollback if the create failed | Checked |

8. Paste in the following template code:
:::info
Note the use of Octostache variables, you will need to make sure you create these for this example to work.  You will also see use of the output variables created in the previous step.
:::
```yaml
AWSTemplateFormatVersion: 2010-09-09
Resources:
  DatabaseSubnetGroup:
    Type: 'AWS::RDS::DBSubnetGroup'
    Properties:
      DBSubnetGroupDescription: 'Subnet group for database instance'
      SubnetIds:
        - #{Octopus.Action[ResourceIds].Output.AWS.Subnet1.Id}
        - #{Octopus.Action[ResourceIds].Output.AWS.Subnet2.Id}

  Database:
    Type: 'AWS::RDS::DBInstance'
    Properties:
      DBInstanceIdentifier: #{AWS.CloudFormation.RDS.Identifier}
      AllocatedStorage: #{AWS.CloudFormation.Database.AllocatedStorage}
      DBInstanceClass: #{AWS.CloudFormation.Database.Instance.Class}
      Engine: #{AWS.CloudFormation.Database.Engine}
      EngineVersion: #{AWS.CloudFormation.Database.Engine.Version}
      MasterUsername: #{AWS.CloudFormation.Database.Admin.User.Name}
      MasterUserPassword: #{AWS.CloudFormation.Database.Admin.User.Password}
      DBSubnetGroupName: !Ref DatabaseSubnetGroup
      PubliclyAccessible: true
      VPCSecurityGroups:
        - #{Octopus.Action[ResourceIds].Output.AWS.SecurityGroup.Id}
      Port: #{AWS.CloudFormation.PostgreSQL.Port}
      BackupRetentionPeriod: 0

Outputs:
  Endpoint:
    Description: Generated endpoint address for database connection
    Value: !GetAtt Database.Endpoint.Address
```

In just a few steps, we've automated the creation of a PostgreSQL RDS instance.

## Samples

We have a [Target - PostgreSQL](https://oc.to/TargetPostgreSQLSampleSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `Space Infrastructure` project.
