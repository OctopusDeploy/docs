---
title: How to turn on variable logging and export the task log
description: How to turn on variable logging and export the task log to help the Octopus team resolve deployment issues.
position: 27
---

When you contact Octopus Deploy support, we may ask you to provide a variable evaluation log to help us troubleshoot your issue. This page outlines how to create and download the full verbose log.

Since so many variables are used in the deployment process (with their values changing through your deployment), Octopus doesn't log all of that information by default. It would increase the size of the task logs, and would slow down your deployments. However, sometimes it's very helpful to log this information.

## Step-by-step Guide {#Howtoturnonvariableloggingandexportthetasklog-Step-by-stepguide}

Write the variables to the deployment log

1. Open the **{{Project,Variables}}** page.
2. Add the following two variables and set them to **True**:

   ![](images/variables.png "width=500")
3. **Create a new release** of your project for the variables to take effect.
4. Deploy the new release.
5. Open the deployment/task details, and go to the **Task log** tab. Click on the **Raw** link. You can also select the **Download** option if you want to look at this locally. You can download this and attach the log file to your support query.

   ![](images/rawlogs.png "width=500")

6. If you wish to troubleshoot this locally the raw log text file containing the entire deployment log will load in Octopus.

   ![](images/raw.png "width=500")

:::hint
Remember to remove these variables after you get the full log. These variables are designed for debugging purposes only.

You might want to open the file in a text editor, and redact any sensitive information like hostnames or company information, before sending the log to us.
:::
