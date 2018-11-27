---
title: Octopus Cloud
position: 10
description: How to work with Octopus Cloud.
---
**Octopus Cloud** is the hosted version of Octopus Deploy and it has been publicly available since February 2018. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, automatically upgrading the service, and maintaining and monitoring the underlying systems, and for security reasons some of the configuration and diagnostic functionality has been limited. <!-- do we have specifics? -->

You can sign up for Octopus Cloud at [octopus.com/account/register](https://octopus.com/account/register), check out the [Octopus Cloud FAQ](https://octopus.com/blog/octopus-cloud-faq) blog post or the [pricing page](https://octopus.com/cloud).


# Octopus Managers

On your cloud instance there are a few select permissions that relate to the hosting of Octopus itself, and not so much the configuration/usability of your instance (e.g. server configuration logs), so we've introduced a new built-in team called "Octopus Managers", think of it as a "cloud-instance admin". The "Octopus Administrators" team is still present, but it's only used by our octoadmin account, and if you ask us to log in to your instance for support.

If you find there is something you think you ought to have access to as an "Octopus Manager", but don't, [let us know](mailto:support@octopus.com) and we can review the permissions.
