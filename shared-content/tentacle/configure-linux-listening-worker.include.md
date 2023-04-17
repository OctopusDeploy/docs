1. In the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Workers** and click **{{ADD WORKER,LINUX}}**, and select **Listening Tentacle**.
1. Make a note of the **Thumbprint** (the long alphanumerical string).
1. On the Linux Tentacle Server, run `/opt/octopus/tentacle/configure-tentacle.sh` in a terminal window to configure the Tentacle.
1. Give the Tentacle instance a name (default `Tentacle`) and press **Enter**.
1. Choose **1) Listening** for the **kind of Tentacle** to configure, and press **Enter**.
1. Configure the folder to store log files and press **Enter**.
1. Configure the folder to store applications and press **Enter**.
1. Enter the default listening port **10933** to use and press **Enter**.
1. Enter the **Thumbprint** from the Octopus Web Portal and press **Enter**.
1. Review the configuration commands to be run that are displayed, and press **Enter** to install the Tentacle.
1. Back in the **Octopus Web Portal**, enter the hostname or IP address of the machine the Tentacle is installed on, i.e., `example.com` or `10.0.1.23`, and click **NEXT**.
1. Add a display name for the Worker (the server where you just installed the Listening Tentacle).
1. Select which [worker pools](/docs/infrastructure/workers/worker-pools) the Worker will be assigned to and click **SAVE**.
