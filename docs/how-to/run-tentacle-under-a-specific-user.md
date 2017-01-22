---
title: Run Tentacle under a specific user
position: 9
---


There are times when you might like to run Tentacle under a specific user. This might be required for scenarios where you need to:

- Run a script that needs to be executed by a user with higher permissions
- Run a process that talks to a SQL database, and you want to use integrated authentication.


:::hint
Please note that this means that everything that Tentacle does will run as this user, so the permissions need to account for this.
:::


The first step will be to log on to your server where the Tentacle is hosted. You then need to find the Tentacle service.


![](/docs/images/3048151/3278121.png "width=500")


From here you can find the Tentacle service and choose Properties.


![](/docs/images/3048151/3278120.png "width=500")


Under Log On you can set the user to be a specific user.


![](/docs/images/3048151/3278119.png "width=300")
