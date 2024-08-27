## A Hello world deployment process

To define a simple deployment process in Octopus that executes a hello world script on the Octopus Server, complete the following steps:

1. Navigate to **Projects**.
2. Select **Add Project**.
3. Name the project, for instance, `Hello world`, and click **Save**.
4. Click **Create Process**.
5. Choose the type of step you'd like to add to filter the available steps: **Script**.
6. Find the **Run a Script** step and click **Add Step**.
7. In the process editor, give the step a name, for instance, `Run Hello world script`.
8. In the **Execution Location** section, select **Run on the Octopus Server**.
9. Paste the following PowerShell script into the **Inline Source Code** editor:
```
Write-Host "Hello, World!"
```
1.  Click **Save**.

You now have a simple hello world deployment process. 

:::div{.info}
If you're using Octopus Cloud you can't run scripts directly on the Octopus Server. Instead, you can select **Run once on a worker** which will run the script on a [dynamically provisioned worker](/docs/infrastructure/workers/dynamic-worker-pools).
:::