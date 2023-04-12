1. On the communication style screen, select **Polling Tentacle** and click **Next**.
1. If you are using a proxy see [Proxy Support](/docs/infrastructure/deployment-targets/proxy-support/), or click **Next**.
1. Add the Octopus credentials the Tentacle will use to connect to the Octopus Server:
    a. The Octopus URL: the hostname or IP address.
    b. Select the authentication mode and enter the details:
        i. The username and password you use to log into Octopus, or:
        i. Your Octopus API key, see [How to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key/).
    
    :::hint
    The Octopus credentials specified here are only used once to configure the Tentacle. All future communication is performed over a [secure TLS connection using certificates](/docs/security/octopus-tentacle-communication/index.md#Octopus-Tentaclecommunication-Scenario:PollingTentacles). 
    :::
1. Click **Verify credentials**, and then next.
1. Give the machine a meaningful name and select which [environments](/docs/infrastructure/environments/) the deployment target will be assigned to.
1. Choose or create at least one [target role](/docs/infrastructure/deployment-targets/index.md#target-roles) for the deployment target.
1. Leave **Tenants** and **Tenant tags** blank unless you are already using Octopus to deploy applications to multiple end users. If you are using Octopus for multiple tenants, enter the **Tenants** and **Tenant Tags**. Learn more about [Multi-tenant Deployments](/docs/tenants/).
1. Click **Install**, and when the script has finished, click **Finish**.
