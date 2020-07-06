## A Hello world deployment process

To define a simple deployment process in the Octopus Web Portal that execute a hello world script on the Octopus Server, complete the following steps:

1. Navigate to the **{{ Projects }}** tab.
1. Select **ADD PROJECT**.
1. Name the project, for instance, `Hello world`, and click **SAVE**.
1. Click **DEFINE YOUR DEPLOYMENT PROCESS**, and click **ADD STEP**.
1. Choose the type of step you'd like to add to filter the available steps: **Script**.
1. Click the **Run a Script** tile.
1. In the process editor, give the step a name, for instance, `Run Hello world script`.
1. In the **execution location** section, click **Run on the Octopus Server**.
1. In the **script section**, paste the following PowerShell script into the **Inline Source Code** editor:

```PowerShell
Write-Host "Hello, World!"
​```

1. Click **SAVE**.

You now have a simple hello world deployment process. 