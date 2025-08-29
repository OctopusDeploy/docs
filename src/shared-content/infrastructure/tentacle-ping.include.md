We have built a small utility for testing the communications protocol between two servers called [Tentacle Ping](https://github.com/OctopusDeploy/TentaclePing). This tool helps isolate the source of communication problems without needing a full Octopus configuration. It is built as a simple client and server component that emulates the communications protocol used by Octopus Server and Tentacle.

In **Octopus 3.0** you will need **TentaclePing** and **TentaclePong**, you cannot test directly to Octopus Server nor Tentacle:

:::div{.hint}
Tentacle Ping is currently a Windows only application
:::