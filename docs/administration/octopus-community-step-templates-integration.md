---
title: Octopus community step templates integration
position: 22
---


Octopus 3.7 introduced integration with the [Octopus Library](http://library.octopus.com/) and community contributed [step templates](/docs/home/deploying-applications/step-templates.md) are now synchronised with the Octopus server. This makes it a quick and easy process to use community step templates in your project's deployment process.





Feature toggle


![](/docs/images/5671696/5866121.png)


This feature is enabled by default however it can be disabled in the **Features** tab in the **Configuration** area.  The synchronization process is executed as a standard Octopus task and you can view its execution details from the **Tasks** area.  The Octopus server synchronizes with the Octopus Library on startup and then every 24 hours over the Internet thus it requires Internet access.  If there are any updates or changes, the sync process then retrieves all the step templates and stores the relevant community step templates in the Octopus database.  Whilst the step templates are persisted locally, they cannot be used in a deployment process until they are explicitly installed.


NOTE: The relevant permissions to install and manage step templates are ActionTemplateCreate, ActionTemplateEdit, ActionTemplateView and ActionTemplateDelete.

:::hint
The community step template synchronization process works great with proxy servers.  For more information, see [Proxy support](/docs/home/installation/installing-tentacles/proxy-support.md).
:::

## Community step template linking


Coming soon

## Troubleshooting


If the Octopus community step templates feature toggle is enabled but you don't see any community steps, navigate to the **Features** tab in the **Configuration** area.  Click on the last sync period (i.e. 5 minutes ago or 10 hours ago) to view the most recent sync task and review it's log.  If there are any errors, compare them with the list below.





*The Octopus server failed to connect to our community library.*

- This means the Octopus server sync task could not connect to the Octopus Library over the internet.  It attempts to connect to [http://library.octopus.com/](http://library.octopus.com/) over http (port 80) therefore the appropriate ports need to be open.
- If problems persist, it's recommended that you review your firewall and network configuration.  Verify outbound traffic is enabled on port 80.
