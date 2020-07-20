---
title: Updating Ubuntu
description: With Octopus Deploy you can update Ubuntu with a runbook as part of a routine operations task.
position: 50
---
One of the more popular distributions of Linux is [Ubuntu](https://ubuntu.com/).  Like all other operating systems, Ubuntu needs updates and patches to keep it up-to-date and secure.  with Runbooks, you could automate the process of performing routine mainenance such as installing updates.  Going one step further, you could schedule this activity using a Runbook scheduled trigger.

## Create the runbook

To create a runbook to perform updates on an Ubuntu machine:

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code:

```bash
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
This step will download a list of available updates then display them.  This step is split out from the actual update process so that you can place any gates such as approvals between listing what is available for update and actually performing the update.

8.  Repeat steps 3-7 and add the following to perform the update:

```bash
# Perform upgrade
sudo apt-get upgrade -y 2>&1

# Check for error
if [[ $? -ne 0 ]]
then
    fail_step "apt-get upgrade failed!"
fi
```

:::info
You'll note the use of `2>&1` which redirects the stderr  stream to stdout.  Bash writes diagnostic messages to stderr which Octopus interprets as an error so your Runbook will show a success with warnings message.  The `if` statement checks to see if an error was actually encountered and will fail the step if it was.
:::