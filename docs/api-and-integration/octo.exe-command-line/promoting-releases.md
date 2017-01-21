---
title: Promoting releases
position: 8
---


[Octo.exe](http://docs.octopusdeploy.com/pages/viewpage.action?pageId=360596) can be used to promote a release from one environment to another.

```text
octo promote-release [<options>]
```


Where `[&lt;options&gt;]` is any of:

**Promote release options**

```text
Project creation: 

      --project=VALUE        Name of the project
      --from=VALUE           Name of the environment to get the current 
                             deployment from, e.g., Staging
      --to, --deployto=VALUE Environment to deploy to, e.g., Production

Deployment: 

      --progress             [Optional] Show progress of the deployment
      --forcepackagedownload [Optional] Whether to force downloading of 
                             already installed packages (flag, default false).
      --waitfordeployment    [Optional] Whether to wait synchronously for 
                             deployment to finish.
      --deploymenttimeout=VALUE
                             [Optional] Specifies maximum time (timespan 
                             format) that the console session will wait for 
                             the deployment to finish(default 00:10:00). This 
                             will not stop the deployment. Requires --
                             waitfordeployment parameter set.
      --cancelontimeout      [Optional] Whether to cancel the deployment if 
                             the deployment timeout is reached (flag, default 
                             false).
      --deploymentchecksleepcycle=VALUE
                             [Optional] Specifies how much time (timespan 
                             format) should elapse between deployment status 
                             checks (default 00:00:10)
      --guidedfailure=VALUE  [Optional] Whether to use Guided Failure mode. 
                             (True or False. If not specified, will use 
                             default setting from environment)
      --specificmachines=VALUE
                             [Optional] A comma-separated list of machines 
                             names to target in the deployed environment. If 
                             not specified all machines in the environment 
                             will be considered.
      --force                [Optional] If a project is configured to skip 
                             packages with already-installed versions, 
                             override this setting to force re-deployment 
                             (flag, default false).
      --skip=VALUE           [Optional] Skip a step by name
      --norawlog             [Optional] Don't print the raw log of failed 
                             tasks
      --rawlogfile=VALUE     [Optional] Redirect the raw log of failed tasks 
                             to a file
  -v, --variable=VALUE       [Optional] Values for any prompted variables in 
                             the format Label:Value
      --deployat=VALUE       [Optional] Time at which deployment should start 
                             (scheduled deployment), specified as any valid 
                             DateTimeOffset format, and assuming the time 
                             zone is the current local time zone.
	  --tenant=VALUE		 [Optional] A tenant the deployment will be performed for; 
                             specify this argument multiple times to add multiple tenants or 
                             use  `*` wildcard to deploy to tenants able to deploy.
	  --tenanttag=VALUE		 [Optional] A tenant tag used to match tenants that the deployment will 
							 be performed for; specify this argument multiple times to 
						     add multiple tenant tags

Common options: 

      --server=VALUE         The base URL for your Octopus server - e.g., 
                             http://your-octopus/
      --apiKey=VALUE         Your API key. Get this from the user profile 
                             page.
      --user=VALUE           [Optional] Username to use when authenticating 
                             with the server.
      --pass=VALUE           [Optional] Password to use when authenticating 
                             with the server.
      --configFile=VALUE     [Optional] Text file of default values, with one 
                             'key = value' per line.
      --debug                [Optional] Enable debug logging
      --ignoreSslErrors      [Optional] Set this flag if your Octopus server 
                             uses HTTPS but the certificate is not trusted on 
                             this machine. Any certificate errors will be 
                             ignored. WARNING: this option may create a 
                             security vulnerability.
      --enableServiceMessages
                             [Optional] Enable TeamCity service messages when 
                             logging.
```

### Basic example


The following command will promote the latest release of the*Web* projectdeployed to *Development*to the environment *Staging.*

```text
Octo promote-release --project Web --from Development --to Staging -progress --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line.md), and [creating API keys](/docs/how-to/how-to-create-an-api-key.md).
:::
