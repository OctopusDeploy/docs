---
title: Poll server

---


Configures an Octopus Server that this Tentacle will poll

**Poll server options**

```text
Usage: Tentacle poll-server [<options>]
 

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --server=VALUE         The Octopus server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username=VALUE       If not using API keys, your username
  -p, --password=VALUE       In not using API keys, your password
      --server-comms-port=VALUE
                             The comms port on the Octopus server; the
                               default is 10943
Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```
