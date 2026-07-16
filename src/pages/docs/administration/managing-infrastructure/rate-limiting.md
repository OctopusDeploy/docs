---
layout: src/layouts/Default.astro
pubDate: 2026-07-16
modDate: 2026-07-16
title: Rate Limiting
description: A guide to configuring HTTP Rate Limiting for Octopus Server
navOrder: 55
---

:::div{.hint}
HTTP Rate Limiting functionality was added in **Octopus 2026.3**.
:::

Rate limiting is a technique used to regulate how quickly a system processes incoming requests. It is useful to guard against misbehaving scripts, integrations, or bad actors.

Octopus Server has a rate limiter built in to the system. It can be enabled and configured by users with the `ConfigureServer` permission (usually associated with the **System Manager** role).

## Configuration

Rate limiting is configured using policies, managed in the **Configuration ➜ Settings ➜ Rate Limiting** screen in the Octopus Web Portal.

There are three built-in policies, as follows:

```bash
*****************************************************
* TODO insert a picture showing the rate limiting configuration screen with all 3 policies
*****************************************************
```

### Unauthenticated Requests

This policy applies to any HTTP requests not associated with an authenticated user.
The rate limit applies per IP address.

### Authenticated Requests

This policy applies to any HTTP requests associated with an authenticated user.
The rate limit applies per user.

### Authenticated AI Agent Requests

This policy applies to any HTTP requests associated with an authenticated user which authenticate using an [agent API key](/docs/octopus-rest-api/how-to-create-an-api-key#creating-an-agent-api-key)
The rate limit applies per user, measured separately from non-AI requests.

### Enabling the Rate Limiter

For existing self-hosted installations of Octopus Server, the Unauthenticated and Authenticated rate limiting policies are not enabled by default.

For existing Octopus Cloud instances created before `TODO cutover date`, the Unauthenticated and Authenticated rate limiting policies are not enabled by default.
For Cloud instances created after this date, the policies are enabled by default.

The Authenticated AI rate limiting policy is enabled by default for all instances of Octopus Server that contain Rate Limiting functionality.

You can use the configuration screen to enable or disable the policies, and alter their configured values.

```bash
*****************************************************
* TODO insert a picture showing the specific Authenticated Request policy configuration screen
*****************************************************
```

Rate limiting policies can also be enabled and configured using the [Octopus.Server command line's `rate-limiting-policy` command](http://localhost:3000/docs/octopus-rest-api/octopus.server.exe-command-line/rate-limiting-policy)

**Note:** We do not enable the rate limiter on existing Octopus Cloud instances because they may have configured scripts or integrations which
are not prepared to handle an HTTP 429 error correctly. However, we reserve the right, according to our [acceptable usage policy](https://octopus.com/legal/acceptable-usage),
to enable it on instances where our internal monitoring shows the instance is overloaded or degraded and we believe the rate limiter may help us restore service.

## Understanding the Rate Limiter

Octopus Server uses the [Token Bucket](https://en.wikipedia.org/wiki/Token_bucket) algorithm.

It has two configurable parameters - **Burst Limit**, and **Requests Per Hour**.

The Burst Limit value specifies how many requests can be made (per user or per IP) before the rate limiter starts rejecting requests.

The Requests Per Hour value specifies the steady state at which requests are allowed to continue, when the burst capacity is consumed.

**By analogy:** Imagine the rate limiter as a physical bucket of coins.

- Each user has their own bucket.
- Whenever a user makes an HTTP request to the Octopus Server, a coin is removed from the bucket.
- If the bucket is empty and a coin cannot be removed, the request is rejected.
- Burst Limit specifies how many coins the bucket starts with, and how many it can hold before it is full and no more can be added.
- Requests Per Hour specifies how quickly new coins are added to refill the bucket.

**Note:** The bucket refills continuously. If you specified a Requests Per Hour value of 7,200, then it would behave as though one "coin" is added every half-second.

### Detail

- All requests are considered equal; they each deduct one token from the bucket regardless of what the request does.
- Requests made by the Octopus Web Portal are considered the same as requests made via scripts and integrations.
  - If you are concerned that a script or integration might consume a user's rate limit quota and prevent them from accessing the web portal, create a separate service account for that script or integration.
- The Octopus Web Portal makes some requests to diagnostic endpoints for logging and telemetry. These do not count towards a user's rate limit.
- The Octopus Web Portal makes some requests to load static content such as JavaScript and Image files. These do not count towards a user's rate limit.

## Enforcement

When a rate limiting policy is enabled, and rejects a request, the client will receive an [HTTP 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) error response.

The response may include a `Retry-After` header, with a value specifying the number of seconds to wait to retry again.  
**Note:** The `Retry-After` header is an estimate; A client is not guaranteed to succeed if it waits that long and tries again.

When a request is rejected, an Audit Event will be generated. At most one Audit Event will be generated every 15 minutes, per user, per server node.

```bash
*****************************************************
* TODO insert a picture showing an audit event
*****************************************************
```

## High Availability

When Octopus Server is configured for High Availability, and multiple nodes are serving HTTP requests, the rate limiting state is **not** shared across nodes. Each counts requests per user independently.

By example, given two server nodes, and a load-balancer which perfectly evenly distributes requests across nodes, a rate limiting configuration of 3,000 requests per hour would result in as many as 9,000 requests per hour being accepted.
