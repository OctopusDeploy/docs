1. On the communication style screen, select **Listening Tentacle** and click **Next**.
1. In the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Workers** and click **{{ADD WORKER,WINDOWS}}**, and select **Listening Tentacle**.
1. Copy the **Thumbprint** (the long alphanumerical string).
1. Back on the Tentacle server, accept the default listening port **10933** and paste the **Thumbprint** into the **Octopus Thumbprint** field and click **Next**.
1. Click **INSTALL**, and after the installation has finished click **Finish**.
1. Back in the **Octopus Web Portal**, enter the hostname or IP address of the machine the Tentacle is installed on, i.e., `example.com` or `10.0.1.23`, and click **NEXT**.
1. Add a display name for the Worker (the server where you just installed the Listening Tentacle).
1. Select which [worker pools](/docs/infrastructure/workers/worker-pools.md) the Worker will be assigned to and click **SAVE**.
