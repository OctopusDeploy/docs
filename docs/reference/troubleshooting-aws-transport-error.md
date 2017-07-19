---
title: Troubleshooting AWS Transport Level Error
description: A guide for troubleshooting AWS Transport Errors.
position: 7
---
:::warning
**Information subject to change**
The information on this page is to be considered incomplete and relies heavily on external links that are subject to change. We will endeavor as much as possible to keep these links and issues up to date.
:::

When Octopus is hosted on an AWS instance it can appear that some requests are coming in on non-standard ports even if custom bindings have not been set. You may see reports like the below appearing on your WAF firewall:

```bash
Unhandled error on request: http://my.octopus.com:8080/api/progression/Projects-1 123456789fe145449dc66ef65f1386cd by ...
```

This issue has been reported as resolved previously by disabling [TCP offloading](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/pvdrivers-troubleshooting.html#citrix-tcp-offloading).

