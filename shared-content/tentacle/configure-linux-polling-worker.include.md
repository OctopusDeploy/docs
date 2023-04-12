1. On the Linux Tentacle Server, run `/opt/octopus/tentacle/configure-tentacle.sh` in a terminal window to configure the Tentacle.
1. Give the Tentacle instance a name (default `Tentacle`) and press **Enter**.
1. Choose **2) Polling** for the **kind of Tentacle** to configure, and press **Enter**.
1. Configure the folder to store log files and press **Enter**.
1. Configure the folder to store applications and press **Enter**.
1. Enter the **Octopus Server URL** (e.g. https://samples.octopus.app) and press **Enter**.
1. Enter the authentication details the Tentacle will use to connect to the Octopus Server:
    i. Select **1)** if using an Octopus API key, see [How to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key/) or:
    ii. Select **2)** to provide a username and password you use to log into Octopus
1. Select **2) Worker** for the type of Tentacle to setup and press **Enter**.
1. Give the **Space** you wish to register the Tentacle in and press **Enter**.
1. Provide a name for the Tentacle and press **Enter**.
1. Add which [worker pools](/docs/infrastructure/workers/worker-pools/) the Worker will be assigned to (comma separated) and press **Enter**.
1. Review the configuration commands to be run that are displayed, and press **Enter** to install the Tentacle.
