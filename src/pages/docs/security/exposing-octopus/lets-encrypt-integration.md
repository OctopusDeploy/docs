---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Let's Encrypt integration
description: Octopus can integrate with Let's Encrypt to setup and automatically renew the Octopus Portal SSL certificate.
navOrder: 2300
---

Octopus can integrate with [Let's Encrypt](https://oc.to/LetsEncryptOrg) to setup and manage the SSL certificate for the Octopus Portal. When the certificate nears its expiration date, Octopus will automatically renew the certificate with no intervention required.

**Octopus 2019.10.3, 2019.9.6 LTS, 2019.6.12 LTS** or newer use ACME v2, which is required after Let's Encrypt [retired the v1 APIs](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430) in November 2019.

Let's Encrypt integration can be found under **{{Configuration,Let's Encrypt}}**.

![](images/letsencrypt.png "width=500")

To enable, click the `Configure` button.

![](images/letsencryptconfig.png "width=500")

Enter the DNS name that you want to have on the new SSL certificate. Do not enter a prefix such as `http://` or `https://`.

:::warning
The DNS name you enter must be publicly accessible from the Internet (specifically the Let's Encrypt servers) over HTTP on port 80, so that Let's Encrypt can validate that you have control of this domain name. If your firewall has the ability, we recommend only allowing paths starting with `http://youroctopusserver.example.com/.well-known/acme-challenge/`.
:::

Once you have accepted the [Let's Encrypt Terms of Service](https://oc.to/LetsEncryptTermsOfService), and entered a registration email address, click the `Register` button.

:::hint
An account key for Let's Encrypt will be created automatically by Octopus, and reused for future requests.
:::

By default, Octopus will bind the new SSL certificate to `0.0.0.0`, which means all IP addresses on the machine. If you are running other sites on this machine, this will remove any other bindings. If this is the case, please enter the specific IP address to which you want the certificate bound.

If the Octopus Server is not currently listening on the binding/port, it will require a server restart to add the binding. This will generally only be required the first time round - when Octopus doesn't know about the HTTPS binding.

Octopus will then register with Let's Encrypt, handle the domain validation, request a new certificate and apply it to the Portal. If need be, the server will be restarted. Once available, you will be able to access your server on the new HTTPS URL.

The **{{Configuration,Let's Encrypt}}** page will now show when the SSL certificate was last renewed, and when it is due to expire. Every 24 hours, Octopus will check the certificate, and will automatically renew if its due to expire in the next 21 days.

At this point, we recommend enabling [Force SSL](/docs/security/exposing-octopus/expose-the-octopus-web-portal-over-https.md#ForcingHTTPS) and [HSTS](/docs/security/exposing-octopus/expose-the-octopus-web-portal-over-https.md#HSTS).

## Let's Encrypt for Containers
The integration for Let's Encrypt was designed for self-hosted Octopus Server installations running on a Windows server. There are currently no plans to support Let's Encrypt when running [Octopus in a container](docs/installation/octopus-server-linux-container/).

In **Octopus 2020.5** and earlier, when attempting to configure the Let's Encrypt integration on an Octopus Server Linux container, it would fail with a message similar to `We received an error 'Unix LocalMachine X509Stores are read-only for all users`.

From **Octopus 2020.6**, when running Octopus in a container, the Let's Encrypt integration will no longer be available in the Octopus Portal or via the API. 

Customers running Octopus in a container that wish to secure the Octopus Portal to be accessible over HTTPS can do so in a number of standard ways, which are discussed in more detail here.

### NGINX proxy {#nginx-proxy}
If you are running Octopus in a Docker container without an orchestration platform like Kubernetes, you can set up an NGINX reverse proxy with TLS termination.

For more information on configuring TLS/SSL termination in NGINX, refer to the [documentation](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/).

### Let's Encrypt and Traefik {#lets-encrypt-traefik}
Another popular and cloud-native HTTP reverse proxy and load balancer is [Traefik](https://traefik.io/traefik/). You can combine this with Let's Encrypt to support TLS/SSL termination with your Octopus container. To find out more, refer to  the [Traefik documentation](https://doc.traefik.io/traefik/v1.7/user-guide/docker-and-lets-encrypt/).

### Kubernetes and Octopus Deploy {#kubernetes-and-octopus}
If you plan to use an orchestrator with your container say, Kubernetes and Docker, an ingress controller can be used to secure the Octopus Portal. You can find an extensive list in the  [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). It includes multiple open-source, popular platforms such as Traefik, HAProxy Ingress, Istio, and many others.


## Availability

### ACME v1 retirement

After Let's Encrypt [retired the v1 APIs](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430) in November 2019, **Octopus 2019.10.3, 2019.9.6 LTS, 2019.6.12 LTS** or newer are required to use this feature.

### High Availability configurations not supported

Let's Encrypt is only supported in single node Octopus Server configurations, due to a few considerations that apply in High Availability contexts:

- The load balancer can handle SSL termination and this is usually preferable, rather than involving all of the Octopus Server nodes.
- Octopus Server needs to restart to switch certificates, which needs to be coordinated in a High Availability context.
- The load balancer complicates connecting to specific Octopus Server nodes to perform domain validation.
- A longer lived SSL certificate is often warranted at this scale.

## Troubleshooting

There are a few gotchas involved with Let's Encrypt.

### HTTP challenge failure

If you find that the HTTP challenge fails with a message similar to `The Let's Encrypt HTTP challenge failed with status 'invalid'`, check that the HTTP endpoint is publicly accessible. Find the URL that Let's Encrypt is requesting from the log and ensure its publicly available from the Internet.

Be careful if you have previously enabled HSTS - this can cause browser redirects while testing that are hard to spot. The server **must** respond on HTTP, not redirect to HTTPS.

### Server is not accessible on HTTPS

Check that the local firewall allows traffic on the port you selected - usually 443.
