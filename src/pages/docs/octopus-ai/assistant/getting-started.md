---
layout: src/layouts/Default.astro
pubDate: 2025-08-01
modDate: 2025-08-01
title: Getting started
description: 
navOrder: 3
---

## Prerequisites

- An Octopus instance (cloud or on-premises with [public accessibility](#using-with-on-premises-instances-or-cloud-instance-allow-lists))
- A Chromium-based browser (Chrome, Brave, Edge, etc.) that supports Chrome Web Store extensions

## Installation

1. Install the [Octopus AI Assistant Chrome extension](https://oc.to/install-ai-assistant)
2. Navigate to your Octopus Deploy instance. You will see a new icon in the bottom right corner of your Chrome browser
3. Click the AI Assistant icon in your browser to start using the assistant

## Using with on-premises instances or cloud instance allow lists

For on-premises Octopus instances, ensure your server accepts HTTPS requests from IP address `51.8.40.170` to enable AI Assistant functionality.  The DNS entry of your Octopus Server will also need to be resolvable over the Internet for the IP address to be able to communicate with it.

Cloud instances with the `IP address allow list` feature activated will need to add `51.8.40.170` to the allow list to enable AI Assistant functionality:

![Control Centre](/docs/img/octopus-ai/assistant/cloud-portal.png)

:::div{.warning}
It is not possible to integrate Octopus AI Assistant with an on-premises Octopus instance that cannot accept HTTP requests from this public IP address.
:::

## Restricting all outbound network access

A subset of features provided by the Chrome Extension, such as some community dashboards, can operate without any external network access.

To prevent the Chrome Extension from making any outbound requests, set the `Site access` option to `On specific sites` and add the address of your Octopus instance:

![Chrome extension settings](/docs/img/octopus-ai/assistant/restrict-access.png)

:::div{.warning}
Restricting network access will prevent most features of the AI Assistant from working correctly. This setting is intended to be used for organizations that wish to use community dashboards and must prevent external network access.
:::
