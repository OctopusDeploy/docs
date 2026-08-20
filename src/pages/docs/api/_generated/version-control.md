---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Version Control
---

## Clear the local Git cache

:endpoint{method="POST" path="/api/configuration/versioncontrol/clear-cache"}

**Response**

`200` — Confirmation that the Git Cache was cleared

:::api-example{label="Response"}
```json
{}
```
:::

## Clear the local Git cache

:endpoint{method="POST" path="/api/configuration/versioncontrol/clear-cache/v1"}

**Response**

`200` — Confirmation that the Git Cache was cleared

:::api-example{label="Response"}
```json
{}
```
:::
