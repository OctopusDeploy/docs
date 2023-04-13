1. On the communication style screen, select **Polling Tentacle** and click **Next**.
1. If you are using a proxy see [Proxy Support](/docs/infrastructure/deployment-targets/proxy-support/), or click **Next**.
1. Add the Octopus credentials the Tentacle will use to connect to the Octopus Server:
    a. The Octopus URL: the hostname or IP address.
    b. Select the authentication mode and enter the details:
        i. The username and password you use to log into Octopus, or:
        i. Your Octopus API key, see [How to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key/).
    
    :::hint
    The Octopus credentials specified here are only used once to configure the Tentacle. All future communication is performed over a [secure TLS connection using certificates](/docs/security/octopus-tentacle-communication/#Octopus-Tentaclecommunication-Scenario:PollingTentacles). 
    :::
1. Click **Verify credentials**, and then next.
1. On the machine type screen, select **Worker** and click **Next**.
1. Choose the [Space](/docs/administration/spaces/) the Worker will be registered in.
1. Give the machine a meaningful name and select which [worker pool](/docs/infrastructure/workers/worker-pools/) the Worker will be assigned to and click **Next**.
1. Click **Install**, and when the script has finished, click **Finish**.
