---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Renew Let's Encrypt certificates
description: Renew and store TLS certificates issued by Let's Encrypt with a runbook as part of a routine operations task.
navOrder: 130
---

[Let's Encrypt](https://oc.to/LetsEncryptOrg) is a popular nonprofit Certificate Authority that provides TLS certificates. However, creating and managing the renewals of these certificates across a large estate can be time-consuming. With Runbooks, you can automate this process to have your TLS certificates routinely checked for expiration, renewed, and securely stored in the Octopus [certificate library](/docs/deployments/certificates/).

:::hint
If you're looking to secure your Octopus instance with a TLS certificate, take a look at our built-in [Let's Encrypt integration](/docs/security/exposing-octopus/lets-encrypt-integration/).
:::

In the following example, we'll use the [Lets Encrypt - Azure DNS](https://library.octopus.com/step-templates/79e0dd12-6222-4f8a-a8dc-bcbe579ed729/actiontemplate-lets-encrypt-azure-dns) community step template.

## Create the runbook

To create a runbook to renew your Let's Encrypt certificate:

1. From your project's overview page, navigate to **{{Operations, Runbooks}}**, and click **ADD RUNBOOK**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Add a new step template from the community library called **Lets Encrypt - Azure DNS**, and give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. Fill out all the parameters in the step. It is best practice to use [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Certificate Domain | Domain (TLD, CNAME or Wildcard) to create a certificate for. | *.domaintosecure.com|
| PFX Password | Password to use when converting to / from PFX. | Sup3r5ecretPa$$w0rd |
| Replace expiring certificate before N days | Replace the certificate if it expiries within N days. | 30 |
| Azure account | An [Azure Account variable](/docs/projects/variables/azure-account-variables/) that has API access to make DNS changes. | #{Project.Azure.Account} |
| Octopus Deploy API key | An Octopus Deploy API key with access to change Certificates in the Certificate Store. | API-XXXXX |
| Use Lets Encrypt Staging | Generate certificate using Let's Encrypt Staging? | False |
| Contact Email Address | Email address associated with the TLS Certificate. | user@domain.com |

Configure any other settings for the step and click **Save**, and you have a runbook step to create (or renew) a TLS certificate issued by Let's Encrypt, stored securely in the Octopus Certificate library.

## Samples

We have an [Octopus Admin](https://oc.to/OctopusAdminSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example in the `Lets Encrypt Certificate renewal` project.

## Learn More

- [Let's Encrypt Community Step templates](https://library.octopus.com/listing/letsencrypt)
