---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Installing Apache
description: With Octopus Deploy you can install Apache with a runbook as part of a routine operations task.
navOrder: 80
---

[Apache](http://httpd.apache.org/) is one of the worlds most used web server.  Using a runbook, you can automate the installation and initial configuration of the Apache HTTP server.

## Create the runbook

1. From your project's overview page, navigate to **{{Operations, Runbooks}}**, and click **ADD RUNBOOK**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select the appropriate language and add the following code:

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

# Configure firewall
# Uncomment out the line that meets your needs
sudo firewall-cmd --permanent --zone=public --add-service=http --add-service=https # both ports 80 and 443
# sudo firewall-cmd --permanent --zone=public --add-service=http # port 80 only
# sudo firewall-cmd --permanent --zone-public --add-service=https  # port 443 only
sudo firewall-cmd --reload

```
```powershell Windows
# Check for chocolatey
try{
    choco config get cacheLocation
}catch{
    # Install chocolatey
    Write-Output "Chocolatey not detected, trying to install now"
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Use chocolatey to install Apache HTTP
choco install apache-httpd -y --params '"/installLocation:C:\apache /port:80"'

# Add firewall rules
New-NetFirewallRule -DisplayName "Apache-HTTP" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 80
#New-NetFirewallRule -DisplayName "Apache-HTTPS" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 443
```

This will add a basic installation of the Apache HTTP web server.

