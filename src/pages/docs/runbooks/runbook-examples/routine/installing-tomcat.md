---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Installing Tomcat on Ubuntu
description: With Octopus Deploy you can install Tomcat on Ubuntu with a runbook as part of a routine operations task.
navOrder: 110
---

[Tomcat](https://tomcat.apache.org/) is a popular web server for running Java applications. With Runbooks, you can create a runbook as part of a routine operations task to install Tomcat on your [deployment targets](/docs/infrastructure/deployment-targets/tentacle/linux/).

## Create the runbook

To create a runbook to install Tomcat on an Ubuntu machine:

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code:

```bash
#!/bin/bash

TOMCAT_INSTALL_STARTUP=/opt/tomcat/latest/bin/startup.sh
if [[ -f $TOMCAT_INSTALL_STARTUP ]]; then
  echo "Tomcat already installed."
else

TOMCAT_USER=#{Runbook.InstallTomcat.Tomcat.User}
TOMCAT_GROUP=#{Runbook.InstallTomcat.Tomcat.Group}

TOMCAT_ADMIN_USER=#{Runbook.InstallTomcat.Tomcat.AdminUser}
TOMCAT_ADMIN_PASSWORD=#{Runbook.InstallTomcat.Tomcat.AdminPassword}

sudo apt-get update
echo "Installing Java..."
sudo apt install default-jdk -y

echo "Installing jq..."
sudo apt install jq -y

LATEST_TOMCAT=$(curl -s 'https://api.github.com/repos/apache/tomcat/tags' | jq -r .[].name | grep -v '-' | head -1)

echo "Creating tomcat group ..."
sudo groupadd $TOMCAT_GROUP -r

if [[ ! -d /opt/tomcat ]]; then
echo "Making tomcat folder"
sudo mkdir /opt/tomcat
fi

echo "Creating tomcat Linux user ..."
sudo useradd -r -m -d /opt/tomcat -s /bin/false -g $TOMCAT_GROUP $TOMCAT_USER

echo "Downloading Tomcat version $LATEST_TOMCAT..."
wget http://www.apache.org/dist/tomcat/tomcat-9/v$LATEST_TOMCAT/bin/apache-tomcat-$LATEST_TOMCAT.tar.gz -P /tmp

echo "Extracting Tomcat..."
sudo tar xf /tmp/apache-tomcat-$LATEST_TOMCAT.tar.gz -C /opt/tomcat

echo "Creating symbolic link..."
sudo ln -s /opt/tomcat/apache-tomcat-$LATEST_TOMCAT /opt/tomcat/latest
sudo chown -RH $TOMCAT_USER: /opt/tomcat/latest
sudo sh -c 'chmod +x /opt/tomcat/latest/bin/*.sh'

echo "Creating Tomcat service file..."
cat >> tomcat.service <<EOL
[Unit]
Description=Tomcat 9 servlet container
After=network.target

[Service]
Type=forking

User=${TOMCAT_USER}
Group=${TOMCAT_GROUP}

Environment="JAVA_HOME=/usr/lib/jvm/default-java"
Environment="JAVA_OPTS=-Djava.security.egd=file:///dev/urandom -Djava.awt.headless=true"

Environment="CATALINA_BASE=/opt/tomcat/latest"
Environment="CATALINA_HOME=/opt/tomcat/latest"
Environment="CATALINA_PID=/opt/tomcat/latest/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"

ExecStart=/opt/tomcat/latest/bin/startup.sh
ExecStop=/opt/tomcat/latest/bin/shutdown.sh

[Install]
WantedBy=multi-user.target

EOL
sudo mv tomcat.service /etc/systemd/system/tomcat.service
echo "Adding management user to tomcat-users.xml..."

# Add management user
sudo cat > /opt/tomcat/latest/conf/tomcat-users.xml <<EOF
<tomcat-users xmlns="http://tomcat.apache.org/xml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
  version="1.0">
<role rolename="manager-script"/>
<role rolename="manager-gui"/>
<user username="${TOMCAT_ADMIN_USER}" password="${TOMCAT_ADMIN_PASSWORD}" roles="tomcat,manager-script,manager-gui"/>
</tomcat-users>
EOF

echo "Starting Tomcat..."
sudo systemctl daemon-reload
sudo systemctl start tomcat
sudo systemctl enable tomcat

echo "Altering firewall rules..."
sudo ufw allow 8080/tcp

fi

echo "Process complete"
```

The script checks to see if Tomcat is already installed by looking to see if the Tomcat `startup.sh` script exists. If the file is present it will skip the install. If it isn’t installed, then the script will:

- Install Java.
- Create a local user to run tomcat.
- Download and install the latest version of Apache Tomcat.
- Create a Tomcat `systemd` service file.
- Add a Tomcat management user.
- Start the Tomcat service.
- Open port 8080 on the firewall.

### Add the variables

The script expects the following variables to be created:


| Variable Name | Variable Type | Description | Example |
| ------------- | ------------- | ------------- | ------------- |
| Runbook.InstallTomcat.Tomcat.User | Text | User to run Tomcat service | tomcat |
| Runbook.InstallTomcat.Tomcat.Group | Text | Tomcat group | tomcat |
| Runbook.InstallTomcat.Tomcat.AdminUser | Text | Tomcat admin user | tomcatadmin |
| Runbook.InstallTomcat.Tomcat.AdminPassword | Sensitive | Tomcat admin user password | SuperSecretPa$$word |

The variables can be created by navigating to **{{Project,Variables}}** and adding them there.

## Samples

We have a [Pattern - Rolling](https://oc.to/PatternRollingSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more Runbooks in the `PetClinic Infrastructure` project.

## Learn more

- Generate an Octopus guide for [Java, Tomcat, and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?application=Java&destination=Tomcat).
- [Java blog posts](https://octopus.com/blog/tag/java).
- [Webinar: Octopus 101: Deploy Your First Java Application](https://www.youtube.com/watch?v=AM6GyYr2n4Y)
- [Java application deployment example](/docs/deployments/java/deploying-java-applications/).
