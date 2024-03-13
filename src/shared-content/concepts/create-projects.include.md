[Getting Started - Add Projects And Project Groups](https://www.youtube.com/watch?v=gfaRUIlQybA)

Projects are used to collect all the assets that make up your deployment processes. To deploy our simple hello world script, we first need a project. 

:::figure
![The projects page in the Octopus Web Portal](/docs/shared-content/concepts/images/projects.png)
:::

1. Navigate to the **Projects** tab, and click **ADD PROJECT**.
1. Give the project a name, for instance, *Hello, world*, and click **Save**.

**Optional**

By default, Octopus Deploy will store the deployment process, runbook process, and variables in the back-end SQL Server.  From **Octopus 2022.1**, you have the option to store the *deployment process* in a git repository.  

:::div{.hint}
The ability to store runbook processes and variables will be added in future versions.
:::

To configure the project to use version control:

1. Select the option **Use Version Control for this project**
1. Click **Save and Configure VCS**
1. Enter the git repository URL and credentials.
1. Click **Test** to verify the connection.
1. Click **Save** to save the VCS information.

Learn more about [config as code](/docs/projects/version-control).
