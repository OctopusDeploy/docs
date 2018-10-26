---
title: ssl-certificate
description: Binds the SSL/TLS certificate used by the portal to the specified address/port.
---

Binds the SSL/TLS certificate used by the portal to the specified address/port.

**ssl-certificate options**

```text
Usage: octopus.server ssl-certificate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --ip-address=VALUE     The ip address to which the SSL certificate
                               should be bound. Defaults to 0.0.0.0.
      --port=VALUE           The port on which the SSL certificate should be
                               bound. Defaults to 443.
      --thumbprint=VALUE     The thumbprint of the SSL certificate.
      --certificate-store=VALUE
                             The name of the LocalMachine certificate store
                               in which the certificate can be found. Only My
                               and WebHosting are supported. Defaults to My.

Or one of the common options:

      --help                 Show detailed help for this command


```
