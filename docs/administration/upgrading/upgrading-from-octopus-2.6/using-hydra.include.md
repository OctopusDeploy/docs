Hydra is a tool we've built that will help you update your Tentacles to the latest version. It is particularly useful migrating from 2.6 to 3.x as the communication methods have changed.

:::problem
This is the point of no return. When your Tentacles are upgraded to 3.x your 2.6 server will not be able to communicate with them.

We strongly recommend testing Hydra against a small subset of "canary" machines before upgrading the rest of your machines. The best way to do this is:

1. Create a new "canary" machine role and assign it to a few machines.
2. Set the Update Octopus Tentacle step to run on machines with the "canary" role.
3. Once you are confident the Tentacle upgrade works as expected, you can use Hydra to upgrade all of the remaining machines.
:::

#### How does Hydra work?

Hydra consists of two parts:

1. A package that contains the latest Tentacle MSI installers
2. An Octopus 2.6 step template that does the upgrade to your environments

To account for issues with communicating with a Tentacle that has been 'cut off' from its Octopus Server, the Hydra process connects to the Tentacle and creates a scheduled task on the Tentacle Machine. If it is able to schedule the task it considers that install a success. The task runs one minute later.

The scheduled task does the following:

1. Find Tentacle services
2. Stop all Tentacles (if they’re running)
3. Run MSI
4. Update configs for any polling Tentacles
5. Starts any Tentacles that were running when we started

With just one Tentacle service this should be a very quick process, but we cannot estimate how long it may take with many Tentacle services running on the one machine.

#### Common problems using Hydra

The scheduled task is set to run as `SYSTEM` to ensure the MSI installation will succeed. If your Tentacles are running with restricted permissions, they may not be able to create this scheduled task. **The only option is to upgrade your Tentacles manually.**

Hydra performs a Reinstall of each Tentacle. As part of the reinstall, the Service Account is reset to `Local System`. If you need your Tentacles to run under a different account, you will have to make the change after the upgrade completes (after you've re-established a connection from 3.x). You can do this manually, or using the following script:

```powershell
Tentacle.exe service --instance "Tentacle" --reconfigure --username=DOMAIN\ACCOUNT --password=accountpassword --start --console
```
#### Let's upgrade these Tentacles!

To use Hydra, follow these steps:

:::hint
These steps should be executed from your Octopus 2.6 server to your 2.6 Tentacles.
:::

1. Download the latest Hydra NuGet package from [https://octopus.com/downloads](https://octopus.com/downloads)
2. Use the Upload Package feature of the library to upload the OctopusDeploy. Hydra package to the built-in NuGet repository on your Octopus 2.6 server.

![](/docs/images/3048135/3278019.png "width=500")

3. Import the [Hydra step template](http://library.octopusdeploy.com/step-templates/d4fb1945-f0a8-4de4-9045-8441e14057fa/actiontemplate-hydra-update-octopus-tentacle) from the Community Library.

![](/docs/images/3048135/3278018.png "width=500")

4. Create a [new project](/docs/key-concepts/projects/index.md) with a single "Update Octopus Tentacle" step from the step template

 1. Ensure you choose or create a [Lifecycle](/docs/key-concepts/lifecycles.md)that allows you to deploy to all Tentacles.
 2. Ensure you set the Update Octopus Tentacle step to run for all appropriate Tentacles.
 3. Set the `Server Mapping` field:
 
   - If you only use listenting Tentacles you can leave the `Server Mapping` field blank.
   - If you are using any polling Tentacles, add the new Octopus 3.x server address (including the polling TCP port) in the Server Mapping field. See below for examples.
 
:::hint
**Server Mapping for Polling Tentacles**

It is very important you get this value correct. An incorrect value will result in a polling Tentacle that can't be contacted by neither a 2.6 or 3.x server. Several different scenarios are supported:

1. A single Polling Tentacle instance on a machine pointing to a single Octopus Server **the most common case**:
  - Just point to the new server's polling address `https://newserver:newport` like `https://octopus3.mycompany.com:10934`
2. Multiple Polling Tentacle instances on the same machine pointing to a single Octopus Server:
  - Just point to the new server's polling address `https://newserver:newport` like `https://octopus3.mycompany.com:10934` and Hydra will automatically update all Tentacles to point to the new server's address
3. Multiple Polling Tentacle instances on the same machine pointing to different Octopus Servers **a very rare case**:
  - Use this syntax to tell Hydra the mapping from your old Octopus server to your new Octopus server: `https://oldserver:oldport=>https://newserver:newport,https://oldserver2:oldport2/=>https://newserver2:newport2` where each pair is separated by commas. This will match the first case and replace it => with the second case.
  
Click the ![](/docs/images/3048132/3278017.png) help button for more detailed instructions.

![](/docs/images/3048132/3278014.png "width=500")

![](/docs/images/3048132/3278015.png "width=500")
:::

5. Create a release and deploy. The deployment should succeed, and one minute later the Tentacles will be upgraded.
    ![](/docs/images/3048132/3278010.png "width=500")
