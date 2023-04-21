## A Hello world deployment process

To define a simple deployment process in the Octopus Web Portal that executes a hello world script on the Octopus Server, complete the following steps:

1. Navigate to the **Projects** tab.
2. Select **ADD PROJECT**.
3. Name the project, for instance, `Hello world`, and click **SAVE**.
4. Click **DEFINE YOUR DEPLOYMENT PROCESS**, and click **ADD STEP**.
5. Choose the type of step you'd like to add to filter the available steps: **Script**.
6. Click the **Run a Script** tile.
7. In the process editor, give the step a name, for instance, `Run Hello world script`.
8. In the **execution location** section, click **Run on the Octopus Server**.
9. In the **script section**, paste the following PowerShell script into the **Inline Source Code** editor:


```
Write-Host "Hello, World!"
```
​

10. Click **SAVE**.

You now have a simple hello world deployment process. 
