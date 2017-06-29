---
title: Let's Encrypt integration
description: Octopus can integrate with Let's Encrypt to setup and automatically renew the Octopus Portal SSL certificate.
position: 2300
---

Octopus can integrate with [Let's Encrypt](https://g.octopushq.com/LetsEncryptOrg) to setup and manage the SSL certificate for the Octopus Portal. When the certificate nears its expiration date, Octopus will automatically renew the certificate with no intervention required.

Let's Encrypt ingration can be found under {{ Configuration, Certificates }}.

![](/docs/images/lets-encrypt-integration/configure-lets-encrypt.png "width=758")

To enable under **Octopus Portal Let's Encrypt Integration** heading click the the `Configure` button.

![](/docs/images/lets-encrypt-integration/configure-lets-encrypt-dialog.png "width=614")

From the list of bindings that Octopus currently listens on, choose the one that you want to have the new SSL certificate. If you choose a HTTP binding, you will need to enter the port number that you wish to use for HTTPS.

:::warn
Whichever binding you choose must be publically accessible from the internet (specifically the Let's Encrypt servers) as HTTP on port 80, so that Let's Encrypt can validate that you have control of this domain name. If your firewall can do it, we recommend only allowing paths starting with `http://youroctopusserver.example.com/.well-known/acme-challenge/`.
:::

Once you have accepted the [Let's Encrypt Terms of Service](https://g.octopushq.com/LetsEncryptTermsOfService), and entered a registration email address, click the `Register` button.

:::note
You do not have to create an account with Let's Encrypt to enable this integration. In fact, Let's Encrypt has no notion of user accounts.
:::

If the Octopus Server is not currently listening on the binding/port, it will require a server restart to add the binding. This will generally only be required the first time round - when Octopus doesn't know about the HTTPS binding.

Octopus will then register with Let's Encrypt, handle the domain validation, request a new certificate and apply it to the Portal. If need be the server will be restarted. Once available, you will be able to access your server on the new HTTPS url.

The {{ Configuration, Certificates }} will now show when the SSL certificate was last renewed, and when it is due to expire. Every 24 hours, Octopus will check the certificate, and will automaticall renew if its due to expire in the next 21 days.

At this point, we recommend enabling [Force SSL](https://octopus.com/docs/how-to/expose-the-octopus-web-portal-over-https#ForcingHTTPS) and [HSTS](https://octopus.com/docs/how-to/expose-the-octopus-web-portal-over-https#HSTS).

## Troubleshooting

There are a few gotchas involved with Let's Encrypt.

### HTTP challenge failure

If you find that the HTTP challenge fails with a message similar to `The Let's Encrypt HTTP challenge failed with status 'invalid'`, check that the HTTP endpoint is publicly accessible. Find the URL that Let's Encrypt is requesting from the log and ensure its publicly available from the internet.

Be careful if you have previously enabled HSTS - this can cause browser redirects while testing that are hard to spot. The server **must** respond on HTTP, not redirect to HTTPS.

### Server is not accessible on HTTPS

Check that the local firewall allows traffic on the port you selected - usually 443.
