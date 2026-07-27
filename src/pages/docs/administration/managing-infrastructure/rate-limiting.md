---
layout: src/layouts/Default.astro
pubDate: 2026-07-27
modDate: 2026-07-27
title: Rate Limiting
description: A guide to configuring HTTP Rate Limiting for Octopus Server
navOrder: 55
---

Rate limiting is a technique used to regulate how quickly a system processes incoming requests. It is useful to guard against misbehaving scripts, integrations, or bad actors.

Octopus Server has a rate limiter built in to the system. It can be enabled and configured by users with the `ConfigureServer` permission (usually associated with the **System Manager** role).

## Configuration

Rate limiting is configured using policies, managed in the **Configuration ➜ Settings ➜ Rate Limiting** screen in the Octopus Web Portal.

There are three built-in policies, as follows:

:::figure
![A screenshot of the rate limiting policies list screen. Three policies are shown, with varying configured values.](/docs/img/administration/managing-infrastructure/rate-limiting/policies-list.png)
:::

### Unauthenticated Requests

This policy applies to any HTTP requests not associated with an authenticated user.
The rate limit applies per IP address.

### Authenticated Requests

This policy applies to any HTTP requests associated with an authenticated user.
The rate limit applies per user.

### Authenticated AI Agent Requests

This policy applies to any HTTP requests associated with an authenticated user which authenticate using an [agent API key](/docs/octopus-rest-api/how-to-create-an-api-key#creating-an-agent-api-key)
The rate limit applies per user, counted separately from non-AI requests.

## Enabling or Disabling the Rate Limiter

You can use the configuration screen to enable or disable the rate limiting policies, and alter their configured values.

```bash
*****************************************************
* TODO insert a picture showing the specific Authenticated Request policy configuration screen
*****************************************************
```

Each policy has the following settings you can modify:
- Enabled: This controls whether the policy is applied to incoming HTTP requests. If a policy is disabled then matching requests will not be limited.
- Audit Mode: If enabled, this causes the Server not to reject traffic, but simply generate audit events where requests would have been limited. See "Audit Events" below.
- Rate: The sustained rate of incoming HTTP requests that the limiter will allow. See "Understanding the Rate Limiter".
- Burst Limit: The number of requests that must be consumed before the rate limiter activates and starts rejecting them. See "Understanding the Rate Limiter".

Rate limiting policies can also be enabled and configured using the [Octopus.Server command line's `rate-limiting-policy` command](http://localhost:3000/docs/octopus-rest-api/octopus.server.exe-command-line)

### Default Enabled State

For Octopus Cloud instances created after August 2026, and self-hosted installations of Octopus Server created with version 2026.3 or newer, all rate limiting policies are enabled by default.

For Cloud instances created before August 2026, or self-hosted installations created with 2026.2 or earlier versions, the rate limiting feature is a new addition when they upgrade to 2026.3 or the latest Octopus Cloud version.
When these instances upgrade, the Unauthenticated and Authenticated (non-AI) policies will be left in the disabled state, to avoid breaking pre-existing workflows. The Authenticated AI policy will be enabled.

### Maintaining Service in Octopus Cloud

As above, the rate limiter is not automatically enabled for upgrading Octopus Cloud instances, and it may be disabled for new instances.
However, we reserve the right - according to our [acceptable usage policy](https://octopus.com/legal/acceptable-usage) - to alter an instance configuration and enable it, where our internal monitoring shows the instance is overloaded and the rate limiter may help us restore service.

## Understanding the Rate Limiter

Octopus Server uses the [Token Bucket](https://en.wikipedia.org/wiki/Token_bucket) algorithm.

It has two configurable parameters - **Burst Limit**, and **Requests Per Minute**.

The **Burst Limit** value specifies how many requests can be made (per user or per IP) before the rate limiter starts rejecting requests.

The **Requests Per Minute** value specifies the steady state at which requests are allowed to continue, when the burst capacity is consumed.

**By analogy:** Imagine the rate limiter as a physical bucket of coins.

- Each user has their own bucket.
- Whenever a user makes an HTTP request to the Octopus Server, a coin is removed from the bucket.
- If the bucket is empty and a coin cannot be removed, the request is rejected.
- Burst Limit specifies how many coins the bucket starts with, and how many it can hold before it is full and no more can be added.
- Requests Per Minute specifies how quickly new coins are added to refill the bucket.

### Detail

- All requests are considered equal; they each deduct one token from the bucket regardless of what the request does.
- The bucket refills continuously. If you specified a Requests Per Minute value of 120, then it would behave as though one token is added every half-second.
- Requests made by the Octopus Web Portal are considered the same as requests made via scripts and integrations.
  - If you are concerned that a script or integration might consume a user's rate limit quota and prevent them from accessing the web portal, create a separate service account for that script or integration.
- The Octopus Web Portal makes some requests to diagnostic endpoints for logging and telemetry. These do not count towards a user's rate limit.
- The Octopus Web Portal makes some requests to load static content such as JavaScript and Image files. These do not count towards a user's rate limit.

## Enforcement

When the rate limiter rejects a request, the client will receive an [HTTP 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) error response. The request will not be processed by the server, and any action the request is intended to perform will not occur.

The response may include a `Retry-After` header, with a value specifying the number of seconds to wait to retry again.  
**Note:** The `Retry-After` header is a suggestion; A client is not guaranteed to succeed if it waits that long and tries again, and it may succeed even if it doesn't wait for the specified period.

## Audit Events

When a request is rejected, an Audit Event will be generated. At most one Audit Event will be generated every 15 minutes, per user, per server node.

```bash
*****************************************************
* TODO insert a picture showing an audit event
*****************************************************
```

### Audit Mode

Audit mode is a tool that can help you tune rate limiting configuration for your specific Octopus Server instance, without disrupting existing workloads.

If a policy has the Audit Mode setting enabled, it overrides the default behaviour for that policy. The rate limiting policy remains active and records HTTP requests, however:

- When a client reaches the limit, their requests are not rejected; they act as though the policy is not enabled.
- An audit event indicating that the rate limit was exceeded is still generated.
- The audit event interval is decreased. If a client continues to exceed the rate limit, an audit event is generated every 5 minutes, rather than every 15.

## High Availability

When Octopus Server is configured for High Availability, and multiple nodes are serving HTTP requests, the rate limiting state is **not** shared across nodes. Each counts requests per user independently.

By example, given two server nodes, and a load-balancer which perfectly evenly distributes requests across nodes, a rate limiting configuration of 200 requests per minute would result in as many as 600 requests per minute being accepted.

## Version Notes

:::div{.hint}
HTTP Rate Limiting functionality was added in **Octopus 2026.3**.
:::