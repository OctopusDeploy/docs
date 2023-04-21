---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Hardening Apache
description: With Octopus Deploy you can harden Apache with a runbook as part of a routine operations task.
navOrder: 90
---

It is an unfortunate fact that web servers are under near constant attack.  Whether it's IIS, NGINX, Tomcat, Apache, etc... hackers will do what they can to exploit any vulnerabilities.  As a web server administrator, it's your job to make sure that attack surface is as small as possible and guard yourself against the known attacks as best you can.  Using an Octopus Deploy runbook, you can operationalize the hardening of your Apache web server.

!include <security-disclaimer>

## Create the runbook

To create a runbook to harden your Apache web server:

1. From your project's overview page, navigate to **Operations ➜ Runbooks**, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code:

:::div{.warning}
The following script is only an example of what can be done.  Please review the script carefully if you intend to implement.
:::

```bash
#!/bin/bash
#
# ============================================
#  Basic Hardening Of Apache Server
# ============================================
# 


echo '============================================'
echo '  Basic Hardening Of Apache Server'
echo '============================================'
echo ''

CONFIG='/etc/httpd/conf/httpd.conf'


# Updating Apache to latest version

echo -n '> Updating Apache to latest version... '

yum -y update httpd >/dev/null 2>&1 &

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Backing Up Original Configuration

echo -n '> Backing Up Original Configuration... '
cp $CONFIG "$CONFIG.bk" &

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Protection Against Fingerprinting

echo -n '> Enabling Protection Against Fingerprinting... '

sed -i -e 's/ServerSignature On/ServerSignature Off/' $CONFIG
sed -i -e 's/ServerTokens OS/ServerTokens Prod/' $CONFIG

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Disabling Directory Listing 

echo -n '> Disabling Directory Listing... '

sed -r -i -e 's|^([[:space:]]*)</Directory>|\n\n\1\t# Hardening Related Configurations ===============\n\1</Directory>|g' $CONFIG
sed -r -i -e 's|^([[:space:]]*)</Directory>|\1\tOptions -Indexes\n\1</Directory>|g' $CONFIG

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Disable Server Side Includes and Symbolic Links

echo -n '> Disable SSI and SymLinks... '

sed -r -i -e 's|^([[:space:]]*)</Directory>|\1\tOptions -Includes\n\1\tOptions -FollowSymLinks\n\1</Directory>|g' $CONFIG

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Install mod_security and mod_evasive 

echo -n '> Install mod_security and mod_evasive... '

yum -y install mod_security mod_evasive >/dev/null 2>&1 &

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Limit Request Size To Prevent DOS

echo -n '> imit Request Size... '

sed -r -i -e 's|^([[:space:]]*)</Directory>|\1\tLimitRequestBody 512000\n\1\tOptions -FollowSymLinks\n\1</Directory>|g' $CONFIG 

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Disable Risky HTTP Methods

echo -n '> Disable Risky HTTP Methods... '

sed -r -i -e 's|^([[:space:]]*)</Directory>|\n\1\t<LimitExcept GET POST HEAD>\n\1\t\tdeny from all\n\1\t</LimitExcept>\n\n</Directory>|g' $CONFIG

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Enable XSS Protection For Modern Browsers

echo -n '> Enable XSS Protection For Modern Browsers... '

echo '' >> $CONFIG 
echo '<IfModule mod_headers.c>' >> $CONFIG 
echo 'Header set X-XSS-Protection 0' >> $CONFIG 
echo '</IfModule>' >> $CONFIG 

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Protect Apache Binary Files

echo -n '> Protect Apache Binary Files... '

chown -R root:root /etc/httpd/conf /etc/httpd/bin >/dev/null 2>&1 &
chmod -R 750 /etc/httpd/conf /etc/httpd/bin >/dev/null 2>&1 &

SUCCESS=$?

if [ $SUCCESS -eq 0 ]; then
    echo "[OK]"
else
    echo "[ERROR]"
fi


# Restart Apache Server

echo '> Restart Apache Server:'

service httpd restart &
```

This will provide basic hardening of an Apache installation at the click of a button.

## Samples

We have an [Octopus Admin](https://oc.to/OctopusAdminSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at these examples and more runbooks in the `Deployment Target Management` project.
