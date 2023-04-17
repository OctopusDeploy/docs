---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Change AWS load balancer target group
description: Modify an existing AWS Elastic load-balancer listener to forward traffic to a different target group with a runbook
navOrder: 20
---

AWS [Elastic Load Balancing (ELB)](https://aws.amazon.com/elasticloadbalancing/) offers the ability to load balance traffic across AWS and on-premises resources using the same load balancer.  Using a runbook, Octopus makes it easy to provide an automated method for modifying an AWS Elastic load balancer. This is particularly useful if you are deploying using the [blue-green](/docs/deployments/patterns/blue-green-deployments/) deployment pattern, as you can change the load balancer automatically to direct traffic to a different set of servers when you switch to your new active environment.

In this example, we'll swap out servers that are being used in an AWS Elastic load-balancer by modifying the configured listener to forward traffic to a new target group.

## Create the runbook

:::hint
This example assumes that you already have an ELB configured with a [listener](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html), and at least one [target group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html). These resources will be needed for the runbook.
:::

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Run an AWS CLI script** step, and give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. Choose whether to use the bundled **AWS Tools**, or the ones pre-installed on the worker.
1. Choose the **AWS Account** to use.
1. In the **Amazon Web Services Account** section select the variable that references the **AWS Account** or choose to execute using a service role assigned to the EC2 instance. If you don't have an **AWS Account Variable** yet, check our [documentation on how to create one](/docs/projects/variables/aws-account-variables/).

![AWS Account](/docs/runbooks/runbook-examples/aws/images/step-aws-account.png "width=500")

The supplied account can optionally be used to assume a different AWS service role. This can be used to run the AWS commands with a role that limits the services that can be affected.

![AWS Role](/docs/runbooks/runbook-examples/aws/images/step-aws-role.png "width=500")

:::hint
If you select **Yes** to **Execute using the AWS service  role for an EC2 instance**, you do not need an AWS account or account variable. Instead the AWS service role for the EC2 instance executing the deployment will be used. See the [AWS documentation](https://oc.to/AwsDocsRolesTermsAndConcepts) for more information on service roles.
:::
  
9. In the **Inline source code** section, add the following code as a **PowerShell** script:

```powershell
$listenerArn = $OctopusParameters["Project.AWS.ALB.ListenerArn"]
$targetGroup = $OctopusParameters["Project.AWS.ALB.TargetArn"]

Write-Host "Modifying AWS ELB listener: $listenerArn to forward to targetGroup: $targetGroup"

aws elbv2 modify-listener --listener-arn $listenerArn --default-actions Type=forward,TargetGroupArn=$targetGroup
```

The script will modify the ELB listener specified in the `Project.AWS.ALB.ListenerArn` variable to forward traffic to the target group specified in the `Project.AWS.ALB.TargetArn` variable.

Configure any other settings for the step and click **Save**, and in just a few steps, we've created a runbook to automate the modification of an AWS Elastic load balancer to change its target group.

## Samples

We have a [Pattern - Blue-Green](https://oc.to/PatternBlueGreenSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this runbook example named `Change Production Group` in the `Random Quotes Java` project.