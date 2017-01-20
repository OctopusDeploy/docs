---
title: Creating channels
position: 11
---


[Octo.exe](http://docs.octopusdeploy.com/pages/viewpage.action?pageId=360596) can be used to create channels on your Octopus instance.

:::hint
Channels were introduced in Octopus 3.2.
:::

```text
octo create-channel [<options>]
```


Where `[&lt;options&gt;]` is any of:

**create-environment options**

```text
Create: 

      --project=VALUE        The name of the project in which to create the 
                             channel
      --channel=VALUE        The name of the channel to create
      --description=VALUE    [Optional] A description of the channel
      --lifecycle=VALUE      [Optional] if specified, the name of the 
                             lifecycle to use for promoting releases through 
                             this channel, otherwise this channel will 
                             inherit the project lifecycle
      --make-default-channel [Optional, Flag] if specified, set the new 
                             channel to be the default channel replacing any 
                             existing default channel
      --update-existing      [Optional, Flag] if specified, updates the 
                             matching channel if it already exists, otherwise 
                             this command will fail if a matching channel 
                             already exists

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
                             [Optional] Enable TeamCity or Team Foundation 
                             Build service messages when logging.
```

### Basic example


The following command will create a channel in *MyProject* called *Experimental* using the *Test Only* lifecycle instead

```text
Octo create-channel --project MyProject --name Experimental --lifecycle "Test Only" --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/home/api-and-integration/octo.exe-command-line.md), and [creating API keys](/docs/home/how-to/how-to-create-an-api-key.md).
:::
