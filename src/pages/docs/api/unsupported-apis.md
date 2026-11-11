---
layout: src/layouts/Default.astro
pubDate: 2026-10-12
modDate: 2026-10-12
title: Supported and unsupported APIs
sidebarLabel: Unsupported APIs
navTitle: Unsupported APIs
navOrder: 50
description: Which Octopus REST API endpoints are supported for scripts and integrations, and which can change or be removed without notice.
subject: REST API, unsupported APIs, experimental APIs, backend-for-frontend, BFF, API stability
type: concept
audience: [devops-eng, platform-eng, power-user]
image:
imageAlt:
---

Octopus is built API-first, so you can script almost anything the Octopus Web Portal can do. Not every endpoint Octopus Server exposes is meant for external use, though. This page explains which APIs are supported, which aren't, and how to tell them apart before you build a script or integration on one.

## Supported APIs

Supported APIs are the endpoints listed in the [Octopus REST API documentation](/docs/api). Building on them gives your scripts and integrations a stable foundation that won't break without warning.

Supported APIs meet a high bar for quality and stability. We aim not to break or remove them, and when we do need to, we take them through our [deprecation lifecycle](/docs/deprecations) first.

The [Octopus REST API documentation](/docs/api) is the source of truth for what's supported. If an endpoint is listed there, it's supported for external use. If it isn't listed, treat it as unsupported, even if you can see it in your browser's network traffic or call it successfully.

## Unsupported APIs

Unsupported APIs are endpoints Octopus Server exposes for its own use rather than for external scripts and tools. Knowing which endpoints are unsupported lets you avoid building on something that could break your automation in a future release.

We can change, make breaking changes to, or remove an unsupported API at any time, without notice. Don't use unsupported APIs in scripts, tools, or integrations.

An endpoint is unsupported for one of three reasons.

### Backend-for-frontend (BFF) APIs

BFF APIs are designed for the Octopus Web Portal. The portal often needs data in a different shape from general API use, so we sometimes build special-purpose endpoints that fit how the portal loads data. These endpoints may never meet the stability bar of a supported API.

BFF API URLs start with `/bff`. For example:

```text
https://<your-octopus-url>/bff/Spaces-1/{resource}
```

If you want to do something the portal does through a BFF API, look for a supported alternative in the [Octopus REST API documentation](/docs/api). If you can't find one, [contact our support team](https://octopus.com/support).

### Experimental APIs

Experimental APIs usually ship with new features. Keeping a new API experimental for a while lets the team make breaking changes in response to customer feedback before committing to it long term.

When we add new experimental endpoints, we will include the term `experimental` in the route:

```text
https://<your-octopus-url>/api/Spaces-1/experimental/{resource}
```

Earlier ones don't, so a route without `experimental` doesn't mean an endpoint is supported.

### Private APIs

Private APIs are endpoints we build for Octopus's own internal use. They aren't intended for external use and may never be.

When we add new private endpoints, we will include the term `private` in the route:

```text
https://<your-octopus-url>/api/Spaces-1/private/{resource}
```

Earlier ones don't, so a route without `private` doesn't mean an endpoint is supported.

### Identifying unsupported APIs

A `bff`, `experimental`, or `private` segment in a URL tells you an endpoint is unsupported. A URL without one of these segments doesn't tell you an endpoint is supported, because not all experimental and private APIs follow this pattern. Always check the [Octopus REST API documentation](/docs/api) before you use an endpoint.

:::div{.hint}
If an endpoint isn't in the [public documentation](/docs/api), treat it as unsupported.
:::

## Endpoint support at a glance

| Endpoint | Supported |
| --- | --- |
| Listed in the [Octopus REST API documentation](/docs/api) | Yes |
| Listed in your instance's Swagger UI (`/swaggerui/`) | Yes |
| URL starts with `/bff` | No |
| URL includes `experimental` | No |
| URL includes `private` | No |
| Not listed in the Octopus REST API documentation | No |
