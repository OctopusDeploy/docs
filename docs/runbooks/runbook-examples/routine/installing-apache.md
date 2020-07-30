---
title: Insalling Apache
description: With Octopus Deploy you can install Apache with a runbook as part of a routine operations task.
position: 80
---

[Apache](http://httpd.apache.org/) is one of the worlds most used web server.  Using a runbook, you can automate the installation and initial configuration of the Apache HTTP server.

## Create the runbook

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select the appropiate language and add the following code:

```bash Ubuntu
# Update repos
sudo apt-get update

# Install Apache HTTP
sudo apt-get install apache2 -y

# Enable service to start on automatically
sudo systemctl enable apache2

# Start the service
sudo systemctl start apache2
```
```bash CentOS
# Update repos
sudo yum check-update

# Install Apache HTTP
sudo yum -y install httpd

# Enable service to start automatically
sudo systemctl enable httpd

# Start the service
sudo systemctl start httpd

# Add firwall rule

```
```PowerShell Windows
# Check for chocolatey
try{
    choco config get cacheLocation
}catch{
    # Install chocolatey
    Write-Output "Chocolatey not detected, trying to install now"
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Use chocolatey to install Apache HTTP
choco install apache-httpd
```
