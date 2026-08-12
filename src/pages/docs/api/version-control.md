---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Version Control
---

## Clears the local Git cache

`POST` `/api/configuration/versioncontrol/clear-cache`

**Response**

`200` — Confirmation that the Git Cache was cleared

`ClearGitCacheResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Clears the local Git cache

`POST` `/api/configuration/versioncontrol/clear-cache/v1`

**Response**

`200` — Confirmation that the Git Cache was cleared

`ClearGitCacheResponse`.

<div data-example="Response">

```json
{}
```
</div>
