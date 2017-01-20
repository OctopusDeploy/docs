---
title: Cleaning environments
position: 9
---


[Octo.exe](http://docs.octopusdeploy.com/pages/viewpage.action?pageId=360596) can be used to delete/remove machines with a particular status from environments on your Octopus instance.

:::hint
This command was added in Octo.exe 3.3.4.
:::

:::success
This is most useful when your environments can have temporary/ephemeral machines. The best example of this is in virtualized or cloud environments where new machines are created and destroyed frequently.
:::

:::success
**Using Octopus 3.4 or newer?**
We added first-class support for automatically [cleaning up environments](/docs/home/guides/elastic-and-transient-environments/cleaning-up-environments.md).
:::

```text
octo clean-environment [<options>]
```


Where `[&lt;options&gt;]` is any of:

**create-environment options**

```text
Usage: Octo clean-environment [<options>]
Where [<options>] is any of: 
Cleanup: 
      --environment=VALUE    Name of an environment to clean up.
      --status=VALUE         Status of Machines to clean up (Online, Offline, 
                             NeedsUpgrade, CalamariNeedsUpgrade, Disabled).
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


The following command will clean any *offline* machines from the *production* environment.

```text
Octo clean-environment --environment Production --status Offline --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/home/api-and-integration/octo.exe-command-line.md), and [creating API keys](/docs/home/how-to/how-to-create-an-api-key.md).
:::
