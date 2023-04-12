---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: NGINX Web Server
description: Configuring NGINX as a web server or reverse proxy
navOrder: 90
---

The NGINX feature is one of the [configuration features](/docs/projects/steps/configuration-features/index.md) you can enable as you define the [steps](/docs/projects/steps/index/) in your [deployment process](/docs/projects/deployment-process/).

![NGINX Web Server screenshot](images/nginx-web-server.png "width=500")

The **NGINX web server** feature is available on **deploy a package** steps, however, there is also a **Deploy to NGINX** step which you can use to configure NGINX during deployment. See [NGINX on Linux deployment](/docs/deployments/nginx/) for more details.

## Reverse proxy

When configuring a `location` as a reverse proxy, you need to add the following `headers` and `directives` by default:

### Headers
- `Upgrade $http_upgrade`,
- `Connection keep-alive`,
- `Host $host`,
- `X-Forwarded-For $proxy_add_x_forwarded_for`,
- `X-Forwarded-Proto $scheme`

### Directives
- `proxy_http_version 1.1`,
- `proxy_cache_bypass $http_upgrade`

## Limitations

### Supported operating systems

Currently the **NGINX Web Server** feature only supports Linux based operating systems. See [NGINX supported distributions](https://docs.nginx.com/nginx/technical-specs/#supported-distributions) for more details.
