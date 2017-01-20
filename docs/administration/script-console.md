---
title: Script Console
position: 6
---


Octopus is designed to make deployment a repeatable process, avoiding the human error that is introduced when software is configured by hand, or in an ad-hoc fashion. Projects, deployment processes, releases, and deployments are all important concepts for realizing this aim.


When managing a large environment of machines, however, it is occasionally necessary to perform one-off management tasks.

- Run-away processes need to be terminated
- Machines need to be rebooted
- Information needs to be collected



For these situations, the Octopus **Script Console** can be used.


Using the Script Console


The Script Console can be found under the Tasks area, and is only available to Octopus administrators:


![](/docs/images/3048122/3277924.png)


Inside the Script Console, you can choose whether to run your script on a specific server, or a number of servers by role/environment.


![](/docs/images/3048122/5865617.png)


When you run the script, you'll be taken to the task output page which shows the progress and any output from the script:


![](/docs/images/3048122/3277922.png)


The **Script Body** tab can be used to see the contents of the script, and you can use the green **Modify and re-run** button to change or run the script again.


![](/docs/images/3048122/3277921.png)

## Collecting artifacts


Sometimes you might like to collect files from each of the machines as part of your script. To do this, see the section on [artifacts](/docs/home/deploying-applications/artifacts.md).

## Audit records


Besides making it easy to run a script on many servers, the other advantage of using the Script Console is auditing. Ad-hoc scripts run via the Script Console will appear in the [Audit](/docs/home/administration/auditing.md) tab in the Configuration area.


![](/docs/images/3048122/3277919.png)
