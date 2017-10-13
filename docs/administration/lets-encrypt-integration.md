---
title: Let's Encrypt integration
description: Octopus can integrate with Let's Encrypt to setup and automatically renew the Octopus Portal SSL certificate.
position: 2300
version: "[3.15,)"
---

Octopus can integrate with [Let's Encrypt](https://g.octopushq.com/LetsEncryptOrg) to setup and manage the SSL certificate for the Octopus Portal. When the certificate nears its expiration date, Octopus will automatically renew the certificate with no intervention required.

!partial <overview>

At this point, we recommend enabling [Force SSL](https://octopus.com/docs/how-to/expose-the-octopus-web-portal-over-https#ForcingHTTPS) and [HSTS](https://octopus.com/docs/how-to/expose-the-octopus-web-portal-over-https#HSTS).

## Troubleshooting

There are a few gotchas involved with Let's Encrypt.

### HTTP challenge failure

If you find that the HTTP challenge fails with a message similar to `The Let's Encrypt HTTP challenge failed with status 'invalid'`, check that the HTTP endpoint is publicly accessible. Find the URL that Let's Encrypt is requesting from the log and ensure its publicly available from the internet.

Be careful if you have previously enabled HSTS - this can cause browser redirects while testing that are hard to spot. The server **must** respond on HTTP, not redirect to HTTPS.

### Server is not accessible on HTTPS

Check that the local firewall allows traffic on the port you selected - usually 443.
