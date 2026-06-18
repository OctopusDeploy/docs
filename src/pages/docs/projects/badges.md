---
layout: src/layouts/Default.astro
pubDate: 2026-06-18
title: Project badges
description: How to add deployment status badges to your Git repositories and other external tools.
navOrder: 12
---

Project badges let you display the deployment status of your projects in external tools like Git repository READMEs, wikis, or dashboards. Each badge shows the latest release version for a specific environment, so your team can see deployment status at a glance without opening Octopus.

## Enable badges for a project

Badges are turned off by default. To turn them on:

1. Navigate to your project and click **Settings**.
2. Toggle **Badges** on.
3. Click **Save**.

<img height="136" alt="image" src="https://github.com/user-attachments/assets/d2ceb98b-d0db-4168-895c-30d21837398a" />

:::div{.warning}
Turning on badges lets anyone with the badge URL view the latest release version and deployment status for the selected environment. No authentication is required, and no other project data is exposed.
:::

## Build a badge with the badge builder

After you turn on badges, a **Badge Builder** button appears on the project settings page. The badge builder gives you a visual interface to configure and preview your badge before copying the code.

1. Click **Badge Builder** on the project settings page.
2. Select the **environment** you want the badge to show status for.
3. Choose a **label** for the left side of the badge:
   - **Environment** (default) — shows the environment name
   - **Project** — shows the project name
   - **Release** — shows the text "Release"
4. Optionally, expand the **Advanced** section to:
   - Turn on **Include failed releases** to show the latest release even if it failed, rather than only showing successful releases.
   - Choose a **badge style** — flat (default) or flat-square.
5. Copy the generated code from one of the available formats:
   - **Markdown** — for Git repository READMEs and wikis
   - **HTML** — for web pages
   - **URL** — direct link to the badge image

The preview updates as you change options, so you can see what the badge looks like before you copy it.

<img height="614" alt="image" src="https://github.com/user-attachments/assets/fa650b69-aef7-45e0-9fa8-c0345acf8da4" />


## Badge colors

The right side of the badge is automatically colored based on the deployment status:

| Color | Status                                    |
| ----- | ----------------------------------------- |
| Green | Successful deployment                     |
| Red   | Failed, canceled, or timed-out deployment |
| Blue  | Deployment in progress or other states    |
| Gray  | No deployment found                       |

## API endpoints

You can also build badge URLs manually. Both endpoints are anonymous and don't require authentication. They return a 404 if badges aren't turned on for the project.

### Image endpoint

Returns an SVG image you can embed directly:

```text
GET /api/{spaceId}/projects/{projectSlug}/badge/{environmentSlug}/latest_release
```

### JSON endpoint

Returns badge data as JSON. You can use this endpoint to externalize badge rendering through third-party services like [shields.io](https://shields.io), which offloads requests from your Octopus Server.

```text
GET /api/{spaceId}/projects/{projectSlug}/badge/{environmentSlug}/latest_release.json
```

### Query parameters

| Parameter       | Default       | Description                                                       |
| --------------- | ------------- | ----------------------------------------------------------------- |
| `label`         | `environment` | The text on the left side: `environment`, `project`, or `release` |
| `style`         | `flat`        | The badge style: `flat` or `flat-square`                          |
| `includeFailed` | `false`       | Include failed, canceled, or timed-out releases                   |
| `tenantId`      |               | Filter by a specific tenant for multi-tenant deployments          |

## Caching

Badge responses include HTTP caching headers to reduce load on your Octopus Server. This means badge updates may not appear instantly after a deployment completes.
