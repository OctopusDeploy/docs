---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Install NGINX
description: With Octopus Deploy you can install NGINX with a runbook as part of a routine operations task.
navOrder: 100
---

[NGINX](https://www.nginx.com/) is a popular web server technology used for a number of different scenarios like a standard web server, a reverse proxy, and even load balancing.  Configuration for those examples varies, but with a runbook, you can automate the installation of NGINX as a routine operational task.

## Create the runbook

To create a runbook to install NGINX on an Ubuntu machine:

1. From your project's overview page, navigate to **{{Operations, Runbooks}}**, and click **ADD RUNBOOK**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code:

```bash Ubuntu
# Update repositories
sudo apt-get update

# Install NGINX
sudo apt-get install nginx -y

# Configure firewall
# Uncomment out the line that meets your needs
sudo ufw allow 'Nginx Full' # both ports 80 and 443
# sudo ufw allow 'Nginx HTTP' # port 80 only
# sudo ufw allow 'Nginx HTTPS' # port 443 only

# Uncomment to disable default virtual host
#unlink /etc/nginx/sites-enabled/default
```
```bash CentOS
# Update repositories
sudo yum check-update

# Install NGINX
sudo yum install nginx -y

# Configure firewall
# Uncomment out the line that meets your needs
sudo firewall-cmd --permanent --zone=public --add-service=http --add-service=https # both ports 80 and 443
# sudo firewall-cmd --permanent --zone=public --add-service=http # port 80 only
# sudo firewall-cmd --permanent --zone-public --add-service=https  # port 443 only
sudo firewall-cmd --reload

# Start the service
sudo systemctl start nginx
```

With a small script, you can include the installation of NGINX with your infrastructure provisioning.