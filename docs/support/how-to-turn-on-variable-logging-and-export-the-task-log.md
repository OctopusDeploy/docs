---
title: How to turn on variable logging and export the task log
description: How to turn on variable logging and export the task log to help the Octopus team resolve deployment issues.
position: 27
---

When you contact Octopus Deploy support, we may ask you to provide a variable evaluation log to help us troubleshoot your issue. This page outlines how to create and download the full verbose log.

Since so many variables are used in the deployment process (with their values changing through your deployment), Octopus doesn't log all of that information by default. It would increase the size of the task logs, and would slow down your deployments. However, sometimes it's very helpful to log this information.

## Step-by-step guide {#Howtoturnonvariableloggingandexportthetasklog-Step-by-stepguide}

Write the variables to the deployment log

1. Open the {{Project,Variables}} page
2. Add the following two variables and set them to **True**:

   | Name                           | Value |
   | ------------------------------ | ----- |
   | OctopusPrintVariables          | True  |
   | OctopusPrintEvaluatedVariables | True  |
3. **Create a new release** of your project for the variables to take effect
4. Deploy the new release
5. Open the deployment/task details, and go to the **Task log** tab. Click on the **Raw** link.

   ![](/docs/images/5672459/5866222.png "width=500")
   
6. At the top of the raw log page, there is a **Download** button. Click the button to download a text file containing the entire deployment log.

   ![](/docs/images/5672459/5866223.png "width=500")
   
   You can then attach this log file to your support query.

:::hint
Remember to remove these variables after you get the full log. These variables are designed for debugging purposes only.

You might want to open the file in a text editor, and redact any sensitive information like hostnames or company information, before sending the log to us.
:::
