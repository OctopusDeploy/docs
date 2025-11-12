---
layout: src/layouts/Default.astro
pubDate: 2025-08-01
modDate: 2025-08-01
title: Getting started
description: 
navOrder: 3
---

## Prerequisites

- An Octopus instance (cloud or on-premises with [public accessibility](#using-with-on-premises-instances))
- A Chromium-based browser (Chrome, Brave, Edge, etc.) that supports Chrome Web Store extensions

## Installation

1. Install the [Octopus AI Assistant Chrome extension](https://oc.to/install-ai-assistant)
2. Navigate to your Octopus Deploy instance. You will see a new icon in the bottom right corner of your Chrome browser
3. Click the AI Assistant icon in your browser to start using the assistant

## Using with on-premises instances

For on-premises Octopus instances, ensure your server accepts HTTPS requests from IP address `51.8.40.170` to enable AI Assistant functionality.  The DNS entry of your Octopus Server will also need to be resolvable over the Internet for the IP address to be able to communicate with it.

:::div{.warning}
It is not possible to integrate Octopus AI Assistant with an on-premises Octopus instance that cannot accept HTTP requests from this public IP address.
:::
