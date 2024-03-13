---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Updating Linux
description: With Octopus Deploy you can update and patch Linux machines with a runbook as part of a routine operations task.
navOrder: 50
---
Like all other operating systems, Linux needs updates and patches to keep it up-to-date and secure.  With Runbooks, you could automate the process of performing routine maintenance such as installing updates.  Going one step further, you could also schedule this activity using a [scheduled runbook trigger](/docs/runbooks/scheduled-runbook-trigger).

## Create the runbook

To create a runbook to perform updates on your Linux machines:

1. From your project's overview page, navigate to **Operations ➜ Runbooks**, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code that matches your Linux distro:

    ```bash Ubuntu
    # Run update command
    sudo apt-get update 2>&1

    # Check for error
    if [[ $? -ne 0 ]]
    then
        fail_step "apt-get update failed!"
    fi

    # List upgradable packages
    apt list --upgradable 2>&1

    # Check for error
    if [[ $? -ne 0 ]]
    then
        fail_step "List update failed!"
    fi
    ```

    ```bash CentOS/RHEL
    # Run update command
    sudo yum check-update 2>&1

    # Check for error
    if [[ $? -ne 0 && $? -ne 100 ]]
    then
        fail_step "yum check update failed!"
    fi
    ```

    This step will download a list of available updates then display them.  This step is split out from the actual update process so that you can place any gates such as approvals between listing what is available for update and actually performing the update.

8.  Repeat steps 3-7 above, adding the following code to perform the update in the **Inline source code** section that matches your Linux distro:

    ```bash Ubuntu
    # Perform upgrade
    sudo apt-get upgrade -y 2>&1

    # Check for error
    if [[ $? -ne 0 ]]
    then
        fail_step "apt-get upgrade failed!"
    fi
    ```

    ```bash CentOS/RHEL
    # Perform upgrade
    sudo yum update -y 2>&1

    # Check for error
    if [[ $? -ne 0 ]]
    then
        fail_step "yum update failed!"
    fi
    ```

:::div{.info}

You'll note the use of `2>&1` which redirects the stderr stream to stdout.  Bash writes diagnostic messages to stderr which Octopus interprets as an error so your runbook will show a success with warnings message.  The `if` statement checks to see if an error was actually encountered and will fail the step if it errored.
:::

## Samples

We have a [Target - Wildfly](https://oc.to/TargetWildflySamplePetClinic) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `PetClinic` project.
