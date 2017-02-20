---
title: Machine Roles
description: Machine roles allow you to “tag” machines with a specific keyword which can be used in your deployments.
position: 5
---

Machine roles allow you to “tag” machines with a specific keyword which you can later on use to scope deployment steps and/or variables.

## Creating a role and assigning it to a Tentacle {#MachineRoles-CreatingaroleandassigningittoaTentacle}

Roles are created and saved in the database the moment you assign them to a Tentacle. To do so, just:

1) Register a Tentacle or click on an already registered Tentacle and go to **Settings.**

2) On the **Roles** field, type in a single word without spaces and hit enter. This word will be the role name.

3) Save the Tentacle settings.

Once this is done, the role will not only be assigned to that Tentacle, but it will also be available to be added to all the other Tentacles.

On the screenshot below we've created a role called **WebServer** and assigned it to our Tentacle **Server02.**

**![](/docs/images/3048101/3277812.png "width=500")**

You can check all the roles assigned to your machines from the **Environments**screen

![](/docs/images/3048101/3277811.png "width=500")

## Using roles on deployment steps {#MachineRoles-Usingrolesondeploymentsteps}

Almost all the steps that run on a Tentacle can be scoped to one or more roles. This means that the step will only execute on Tentacles with at least one of those roles.

To scope a step to a specific role, all you have to do is type in the role name on the **Machine Roles** field.

**![](/docs/images/3048101/3277810.png "width=500")**

After you save the step, all the roles you’ve scoped it for can be viewed from the Deployment Process screen:

![](/docs/images/3048101/3277809.png "width=500")

According to the screenshot above, our deployment process will do the following:

- Deploy NuGet package OctoFX.Database to deployment targets with the role **app-server**
- Deploy NuGet package OctoFX.RateService to deployment targets with the role **web-server**

## Using roles with variables {#MachineRoles-Usingroleswithvariables}

Variables can also be [scoped to specific roles](/docs/deploying-applications/variables/index.md). This means that the variable will take the specified value only when it is used on a deployment step that runs on a Tentacle with the specified role. This feature can be really handy when you want to use the same variable name multiple times and have their values changed depending on the Tentacle they are running on.

Let’s say you have the following Tentacles with their respective roles:

| Tentacle   | Role       |
| ---------- | ---------- |
| Tentacle 1 | app-server |
| Tentacle 2 | web-server |

You want to deploy the same package on each server but the deployment path will be different between servers. In this case you can set the same variables (we’ll call it *DeployPath*) with a different value for each machine role:

![](/docs/images/3048101/3277808.png "width=500")

Then, on your deployment step, you can set the **[Custom Install Directory](/docs/deploying-applications/custom-installation-directory.md)**to *#{DeployPath}*on each of the 3 steps (one for each package Id & Role).

![](/docs/images/3048101/3277807.png "width=500")

:::warning
**Being smart with Machine Roles**
By definition, a role is "the function assumed by a thing in a particular situation". Roles are not **Environments** or **OS versions**. Try to use roles to tag servers by their utility and watch out if you find yourself putting more than 3 roles on the same server.
:::
