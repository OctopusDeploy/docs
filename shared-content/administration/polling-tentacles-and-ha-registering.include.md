There are two options to add Octopus Servers to a Polling Tentacle, via the command-line or via editing the Tentacle.config file directly.

**Command line:**

Configuring a Polling Tentacle via the command-line is the preferred option with the command executed once per server; an example command using the default instance can be seen below:

```
C:\Program Files\Octopus Deploy\Tentacle>Tentacle poll-server --server=http://my.Octopus.server --apikey=API-77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6
```

For more information on this command please refer to the [Tentacle Poll Server command line options](/docs/octopus-rest-api/tentacle.exe-command-line/poll-server.md).

**Tentacle.config:**

Alternatively you can edit Tentacle.config directly to add each Octopus Server (this is interpreted as a JSON array of servers). This method is not recommended as the Tentacle service for each server will need to be restarted to accept incoming connections via this method.

```xml
<set key="Tentacle.Communication.TrustedOctopusServers">
[
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.160:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"},
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.161:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"},
  {"Thumbprint":"77751F90F9EEDCEE0C0CD84F7A3CC726AD123FA6","CommunicationStyle":2,"Address":"https://10.0.255.162:10943","Squid":null,"SubscriptionId":"poll://g3662re9njtelsyfhm7t/"}
]
</set>
```

:::hint
Notice there is an address entry for **each** Octopus Server in the High Availability configuration.
:::