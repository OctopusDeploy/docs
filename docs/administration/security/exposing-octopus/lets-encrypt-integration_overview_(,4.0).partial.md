Let's Encrypt integration can be found under {{Configuration,Certificates}}.

![](lets-encrypt.png "width=758")

To enable, click the `Configure` button under the **Octopus Portal Let's Encrypt Integration** heading.

![](lets-encrypt-dialog.png "width=614")

From the list of bindings that Octopus currently listens on, choose the one that you want to have the new SSL certificate. If you choose a HTTP binding, you will need to enter the port number that you wish to use for HTTPS.

:::warning
Whichever binding you choose must be publicly accessible from the internet (specifically the Let's Encrypt servers) as HTTP on port 80, so that Let's Encrypt can validate that you have control of this domain name. If your firewall can do it, we recommend only allowing paths starting with `http://youroctopusserver.example.com/.well-known/acme-challenge/`.
:::

Once you have accepted the [Let's Encrypt Terms of Service](https://g.octopushq.com/LetsEncryptTermsOfService), and entered a registration email address, click the `Register` button.

:::hint
You do not have to create an account with Let's Encrypt to enable this integration. In fact, Let's Encrypt has no notion of user accounts.
:::

If the Octopus Server is not currently listening on the binding/port, it will require a server restart to add the binding. This will generally only be required the first time round - when Octopus doesn't know about the HTTPS binding.

Octopus will then register with Let's Encrypt, handle the domain validation, request a new certificate and apply it to the Portal. If need be, the server will be restarted. Once available, you will be able to access your server on the new HTTPS URL.

The {{Configuration,Certificates}} will now show when the SSL certificate was last renewed, and when it is due to expire. Every 24 hours, Octopus will check the certificate, and will automatically renew if its due to expire in the next 21 days.
