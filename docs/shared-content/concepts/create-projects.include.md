<iframe width="560" height="315" src="https://www.youtube.com/embed/gfaRUIlQybA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Projects are used to collect all the assets that make up your deployment processes. To deploy our simple hello world script, we first need a project. 

![The projects page in the Octopus Web Portal](/docs/shared-content/concepts/images/projects.png "width=500")

1. Navigate to the **Projects** tab, and click **ADD PROJECT**.
1. Give the project a name, for instance, *Hello, world*, and click **Save**.

**Optional**

By default, Octopus Deploy will store the deployment process, runbook process, and variables in the back-end SQL Server.  Starting with **Octopus 2022.1**, you have the option to store that information in a git repository.  

To store that information in source control:

1. Select the option **Use Version Control for this project**
1. Click **Save and Configure VCS**
1. Enter the git repository URL and credentials.
1. Click **Test** to verify the connection.
1. Click **Save** to save the VCS information.

Learn more about [config as code](/docs/projects/version-control/index.md).

:::hint
**Please note:** **Octopus 2022.1** added the ability to store the deployment process in a git repo.  The ability to store runbook processes and variables will be added in future versions.
:::
