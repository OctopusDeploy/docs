---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Provision AWS resources with Terraform
description: With runbooks, you can use Terraform to create resources in AWS.
navOrder: 20
---

AWS CloudFormation is a great tool to use to provisions resources, however, it doesn't keep track of state.  With runbooks, you can use Terraform to provision resources on AWS as well as keep them in the desired state.

The following example will use Terraform to dynamically create worker machines based on auto-scaling rules.  Instead of defining the Terraform template directly in the step template, this example will make use of a package.  The package will consist of the following files:
- autoscaling.tf
- autoscalingpolicy.tf
- backend.tf
- installTentacle.sh
- provider.tf
- securitygroup.tf
- vars.tf
- vpc.tf

The different AWS resources types have been separated into their respective files to make it easier to maintain.

## autoscaling.tf

This file contains the definitions for creating the auto-scaling configuration in AWS:

<details>
<summary>autoscaling.tf</summary>
<p>

```
resource "aws_launch_configuration" "dynamic-linux-worker-launchconfig" {
    name_prefix = "dynamic-linux-worker-launchconfig"
    image_id = "${var.LINUX_AMIS}"
    instance_type = "t2.micro"
    
    security_groups = ["${aws_security_group.allow-octopusserver.id}"]
  
    # script to run when created
user_data = "${file("installTentacle.sh")}"

}

resource "aws_launch_configuration" "dynamic-windows-worker-launchconfig" {
    name_prefix = "dynamic-windows-worker-launchconfig"
    image_id = "${var.WINDOWS_AMIS}"
    instance_type = "t2.micro"
    
    security_groups = ["${aws_security_group.allow-octopusserver.id}"]

    user_data = <<-EOT
<script>
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"            

choco install octopusdeploy.tentacle -y

@"C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe" create-instance --config "c:\octopus\home"

@"C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe" new-certificate --if-blank

@"C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe" configure --noListen True --reset-trust --app "c:\octopus\applications"

@"C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe" register-worker --server "#{Project.Octopus.Server.Url}" --apiKey "#{Project.Octopus.Server.ApiKey}"  --comms-style "TentacleActive" --server-comms-port "#{Project.Octopus.Server.PollingPort}" --workerPool "#{Project.Octopus.Server.WorkerPool}" --policy "#{Project.Octopus.Server.MachinePolicy}" --space "#{Project.Octopus.Server.Space}"

@"C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe" service --install

@"C:\Program Files\Octopus Deploy\Tentacle\Tentacle.exe" service --start


</script>

  EOT
}

resource "aws_autoscaling_group" "dynamic-linux-worker-autoscaling" {
    name = "dynamic-linux-worker-autoscaling"
    vpc_zone_identifier = ["${aws_subnet.worker-public-1.id}", "${aws_subnet.worker-public-2.id}", "${aws_subnet.worker-public-3.id}"]
    launch_configuration = "${aws_launch_configuration.dynamic-linux-worker-launchconfig.name}"
    min_size = 2
    max_size = 3
    health_check_grace_period = 300
    health_check_type = "EC2"
    force_delete = true

    tag {
        key = "Name"
        value = "Octopus Deploy Linux Worker"
        propagate_at_launch = true
    }
}

resource "aws_autoscaling_group" "dynamic-windows-worker-autoscaling" {
    name = "dynamic-windows-worker-autoscaling"
    vpc_zone_identifier = ["${aws_subnet.worker-public-1.id}", "${aws_subnet.worker-public-2.id}", "${aws_subnet.worker-public-3.id}"]
    launch_configuration = "${aws_launch_configuration.dynamic-windows-worker-launchconfig.name}"
    min_size = 2
    max_size = 3
    health_check_grace_period = 300
    health_check_type = "EC2"
    force_delete = true

    tag {
        key = "Name"
        value = "Octopus Deploy Windows Worker"
        propagate_at_launch = true
    }
}
```
</p>
</details>

## autoscalingpolicy.tf

This file contains the policy definition that goes with the auto-scaling definition:

<details>
<summary>autoscalingpolicy.tf</summary>
<p>

```
# scale up alarm

resource "aws_autoscaling_policy" "linux-worker-cpu-policy" {
  name                   = "linux-worker-cpu-policy"
  autoscaling_group_name = "${aws_autoscaling_group.dynamic-linux-worker-autoscaling.name}"
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = "1"
  cooldown               = "300"
  policy_type            = "SimpleScaling"
}

resource "aws_cloudwatch_metric_alarm" "linux-worker-cpu-alarm" {
  alarm_name          = "linux-worker-cpu-alarm"
  alarm_description   = "linux-worker-cpu-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "30"

  dimensions = {
    "AutoScalingGroupName" = "${aws_autoscaling_group.dynamic-linux-worker-autoscaling.name}"
  }

  actions_enabled = true
  alarm_actions   = ["${aws_autoscaling_policy.linux-worker-cpu-policy.arn}"]
}

# scale down alarm
resource "aws_autoscaling_policy" "linux-worker-cpu-policy-scaledown" {
  name                   = "linux-worker-cpu-policy-scaledown"
  autoscaling_group_name = "${aws_autoscaling_group.dynamic-linux-worker-autoscaling.name}"
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = "-1"
  cooldown               = "300"
  policy_type            = "SimpleScaling"
}

resource "aws_cloudwatch_metric_alarm" "linux-worker-cpu-alarm-scaledown" {
  alarm_name          = "linux-worker-cpu-alarm-scaledown"
  alarm_description   = "linux-worker-cpu-alarm-scaledown"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "5"

  dimensions = {
    "AutoScalingGroupName" = "${aws_autoscaling_group.dynamic-linux-worker-autoscaling.name}"
  }

  actions_enabled = true
  alarm_actions   = ["${aws_autoscaling_policy.linux-worker-cpu-policy-scaledown.arn}"]
}

resource "aws_autoscaling_policy" "windows-worker-cpu-policy" {
  name                   = "windows-worker-cpu-policy"
  autoscaling_group_name = "${aws_autoscaling_group.dynamic-windows-worker-autoscaling.name}"
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = "1"
  cooldown               = "300"
  policy_type            = "SimpleScaling"
}

resource "aws_cloudwatch_metric_alarm" "windows-worker-cpu-alarm" {
  alarm_name          = "windows-worker-cpu-alarm"
  alarm_description   = "windows-worker-cpu-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "30"

  dimensions = {
    "AutoScalingGroupName" = "${aws_autoscaling_group.dynamic-windows-worker-autoscaling.name}"
  }

  actions_enabled = true
  alarm_actions   = ["${aws_autoscaling_policy.windows-worker-cpu-policy.arn}"]
}

# scale down alarm
resource "aws_autoscaling_policy" "windows-worker-cpu-policy-scaledown" {
  name                   = "windows-worker-cpu-policy-scaledown"
  autoscaling_group_name = "${aws_autoscaling_group.dynamic-windows-worker-autoscaling.name}"
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = "-1"
  cooldown               = "300"
  policy_type            = "SimpleScaling"
}

resource "aws_cloudwatch_metric_alarm" "windows-worker-cpu-alarm-scaledown" {
  alarm_name          = "windows-worker-cpu-alarm-scaledown"
  alarm_description   = "windows-worker-cpu-alarm-scaledown"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "5"

  dimensions = {
    "AutoScalingGroupName" = "${aws_autoscaling_group.dynamic-windows-worker-autoscaling.name}"
  }

  actions_enabled = true
  alarm_actions   = ["${aws_autoscaling_policy.windows-worker-cpu-policy-scaledown.arn}"]
}
```
</p>
</details>

## backend.tf

It is important to note that due to retention policy settings, the folder in which the package is extracted and run may not persist.  For this reason, we recommend you store the state information in another location such as AWS S3:

<details>
<summary>backend.tf</summary>
<p>

```
terraform {
    backend "s3" {
        bucket = "#{Project.AWS.S3.Bucket}"
        key = "#{Project.AWS.S3.Key}"
        region = "#{Project.AWS.Region}"
    }
}
```
</p>
</details>

## installTentacle.sh

This contains a bash script to automatically install the Octopus Deploy Tentacle on the Linux EC2 instance being created:

<details>
<summary>installTentacle.sh</summary>
<p>

```bash
#!/bin/bash
serverUrl="#{Project.Octopus.Server.Url}"
serverCommsPort="#{Project.Octopus.Server.PollingPort}"
apiKey="#{Project.Octopus.Server.ApiKey}"
name=$HOSTNAME
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"
workerPool="#{Project.Octopus.Server.WorkerPool}"
machinePolicy="#{Project.Octopus.Server.MachinePolicy}"
space="#{Project.Octopus.Server.Space}"

sudo apt-key adv --fetch-keys "https://apt.octopus.com/public.key"
sudo add-apt-repository "deb https://apt.octopus.com/ stretch main"
sudo apt-get update
sudo apt-get install tentacle

sudo /opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath" --instance "$name"
sudo /opt/octopus/tentacle/Tentacle new-certificate --if-blank
sudo /opt/octopus/tentacle/Tentacle configure --noListen True --reset-trust --app "$applicationPath"
echo "Registering the worker $name with server $serverUrl"
sudo /opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name"  --comms-style "TentacleActive" --server-comms-port $serverCommsPort --workerPool "$workerPool" --policy "$machinePolicy" --space "$space"
sudo /opt/octopus/tentacle/Tentacle service --install --start
```
</p>
</details>

## provider.tf
Contains the provider information for Terraform:

```
provider "aws" {
  region     = "${var.AWS_REGION}"
}
```

## securitygroup.tf
This contains the security group information for AWS:

<details>
<summary>securitygroup.tf</summary>
<p>

```
resource "aws_security_group" "allow-octopusserver" {
  vpc_id      = "${aws_vpc.worker_vpc.id}"
  name        = "allow-octopusserver"
  description = "Security group that allows traffic to the worker from the Octpus Server"
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 10933
    to_port     = 10933
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 3389
    to_port = 3389
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow-octopusserver"
  }
}
```
</p>
</details>

## vars.tf
This contains the variables that are referenced in other files.  Note there are Octostache (Octopus variable syntax) to make use of Octopus variables:

<details>
<summary>vars.tf</summary>
<p>

```


variable "AWS_REGION" {
  default = "#{Project.AWS.Region}"
}

variable "LINUX_AMIS" {
  default =  "ami-084a6c14d8630bb68"
}

variable "WINDOWS_AMIS"{
  default = "ami-087ee25b86edaf4b1"
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}

variable "INSTANCE_USERNAME" {
  default = "ubuntu"
}
```
</p>
</details>

## vpc.tf
This contains the definition of the VPC and other network resources that other AWS resources will use:

<details>
<summary>vpc.tf</summary>
<p>

```
# Internet VPC
resource "aws_vpc" "worker_vpc" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  enable_classiclink   = "false"
  tags = {
    Name = "worker_vpc"
  }
}

# Subnets
resource "aws_subnet" "worker-public-1" {
  vpc_id                  = "${aws_vpc.worker_vpc.id}"
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "${var.AWS_REGION}a"

  tags = {
    Name = "worker-public-1"
  }
}

resource "aws_subnet" "worker-public-2" {
  vpc_id                  = "${aws_vpc.worker_vpc.id}"
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "${var.AWS_REGION}b"

  tags = {
    Name = "worker-public-2"
  }
}

resource "aws_subnet" "worker-public-3" {
  vpc_id                  = "${aws_vpc.worker_vpc.id}"
  cidr_block              = "10.0.3.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "${var.AWS_REGION}c"

  tags = {
    Name = "worker-public-3"
  }
}

resource "aws_subnet" "worker-private-1" {
  vpc_id                  = "${aws_vpc.worker_vpc.id}"
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "${var.AWS_REGION}a"

  tags = {
    Name = "worker-private-1"
  }
}

resource "aws_subnet" "worker-private-2" {
  vpc_id                  = "${aws_vpc.worker_vpc.id}"
  cidr_block              = "10.0.5.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "${var.AWS_REGION}b"

  tags = {
    Name = "worker-private-2"
  }
}

resource "aws_subnet" "worker-private-3" {
  vpc_id                  = "${aws_vpc.worker_vpc.id}"
  cidr_block              = "10.0.6.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "${var.AWS_REGION}c"

  tags = {
    Name = "worker-private-3"
  }
}

# Internet GW
resource "aws_internet_gateway" "worker-gw" {
  vpc_id = "${aws_vpc.worker_vpc.id}"

  tags = {
    Name = "worker"
  }
}

# route tables
resource "aws_route_table" "worker-public" {
  vpc_id = "${aws_vpc.worker_vpc.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.worker-gw.id}"
  }

  tags = {
    Name = "worker-public-1"
  }
}

# route associations public
resource "aws_route_table_association" "worker-public-1-a" {
  subnet_id      = "${aws_subnet.worker-public-1.id}"
  route_table_id = "${aws_route_table.worker-public.id}"
}

resource "aws_route_table_association" "worker-public-2-a" {
  subnet_id      = "${aws_subnet.worker-public-2.id}"
  route_table_id = "${aws_route_table.worker-public.id}"
}

resource "aws_route_table_association" "worker-public-3-a" {
  subnet_id      = "${aws_subnet.worker-public-3.id}"
  route_table_id = "${aws_route_table.worker-public.id}"
}

```
</p>
</details>

## Create the runbook

1. To create a runbook, navigate to **Project ➜ Operations ➜ Runbooks ➜ Add Runbook**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Apply a Terraform template** step.
1. Fill in the template properties
- Template Source: File inside a package
- Package: Choose the package which contains the files above

With a single step in a runbook, you can create all the resources you need with Terraform.
