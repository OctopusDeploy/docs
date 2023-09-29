### Installing Octopus Deploy

Run the MSI you downloaded to install Octopus Deploy.  Once the MSI is finished, the **Octopus Manager** will automatically launch.  Follow the wizard, and on the section where you configure the database, select the preexisting database.

:::figure
![](/docs/shared-content/upgrade/images/select-existing-database.png)
:::

Selecting an existing database will ask you to enter the Master Key.

:::figure
![](/docs/shared-content/upgrade/images/enter-master-key.png)
:::

Enter the Master Key you backed up earlier, and the manager will verify the connection works.  

Finish the wizard, keep an eye on each setting to ensure you match your main instance.  For example, if your main instance uses Active Directory, your cloned instance should also be configured to use Active Directory.  After the wizard is finished and the instance is configured, log in to the cloned instance to ensure your credentials still work.