---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Troubleshooting Access Denied Starting Http Listener
description: A guide for troubleshooting start up error "Access Denied starting HTTP Listener"
navOrder: 9
---

Octopus requires certain permissions to launch the HTTP Listener - the web server that serves up the Octopus Portal.

When the user that launches Octopus does not have these permissions, you will receive an error:

```
An Access Denied error was received trying to start the HttpListener.
```

## Linux

On Linux (and other *nix variants), elevated privileges are required to listen on ports lower than 1024. To resolve this issue, you have several options:

1. Reconfigure your Octopus Server to use a higher number port. Ports higher than 1024 are not considered privileged, so can be used by userland processes. You can combine this with a reverse proxy (such as Nginx, HAProxy or even `iptables`) to expose your desired port.
1. This [superuser.com article](https://superuser.com/questions/710253/allow-non-root-process-to-bind-to-port-80-and-443) has many suggestions, including
    1. Use `CAP_NET_BIND_SERVICE` to grant low-numbered port access to a process
    1. Use `authbind` to grant one-time access to allow access to a specific user
1. Finally, though not recommended, you can launch Octopus Server as the `root` user (for example, using `sudo`).

## Windows

On Windows, users who are not part of the local Administrators group cannot listen on any port, unless a [URL reservation](https://docs.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh-http#add-urlacl) is made.

This can be done via the following command:

```
netsh http add urlacl url=<URL> user=<USER>
```

For example:
```
netsh http add urlacl url=http://localhost:80/ user=DOMAIN\user
```

Running `netsh` requires administrative rights.

While not recommended, you can also run your Octopus Server as a user who is part of the local Administrators group.
