---
title: Registering HA Polling Tentacles
description: Step-by-step guided setup for Octopus High-availability
position: 50
---

## Configuring high availability Polling Tentacles

Listening Tentacles require no special configuration for High Availability.  Polling Tentacles, however, poll a server at regular intervals to check if there are any tasks waiting for the Tentacle to perform. In a High Availability scenario Polling Tentacles must poll all of the Octopus Servers in your configuration. You could poll a load balancer but there is a risk, depending on your load balancer configuration, that the Tentacle will not poll all servers in a timely manner.  You could also configure the Tentacle to poll each server by registering it with one of your Octopus Servers and then adding each Octopus Server to the Tentacle.config file. There are two options to add Octopus Servers, via the command line or via editing the Tentacle.config file directly:

**Tentacle.config**

Configuring the Tentacle via the command line is the preferred option with the command executed once per server; an example command using the default instance can be seen below:

```
C:\Program Files\Octopus Deploy\Tentacle>Tentacle poll-server --server=http://my.Octopus.server --apikey=API-77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6
```

For more information on this command please refer to the [Tentacle Poll Server options document](/docs/octopus-rest-api/tentacle.exe-command-line/poll-server.md)

Alternatively you can edit Tentacle.config directly to add each Octopus Server (this is interpreted as a JSON array of servers). This method is not recommended as the Octopus service for each server will need to be restarted to accept incoming connections via this method.

```xml
<set key="Tentacle.Communication.TrustedOctopusServers">
[
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.160:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"},
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.161:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"},
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.162:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"}
]
</set>
```

Notice there is an address entry for each Octopus Server in the High Availability configuration.
