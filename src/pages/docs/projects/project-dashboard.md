---
layout: src/layouts/Default.astro
title: Project dashboard
icon: fa-solid fa-shapes
description: Understanding the different project dashboard views.
position: 20
hideInThisSection: true
hideInThisSectionHeader: true
pubDate: 2025-04-17
---

The project dashboard gives you an at-a-glance view of your project. You’ll see a cherry-picked **selection of your releases**. You’ll also see where and when they were deployed in your [environments](/docs/infrastructure/environments), [tenants](/docs/tenants/), and [channels](/docs/releases/channels).

You’ll see one of the following **dashboard views**:

- [Default view](#default-view)
- [Channels view](#channels-view)
- [Tenants view](#tenants-view)

The view you see depends on whether you’ve **added channels** to your project and whether you **allow tenanted deployments** in your project. All views allow you to filter and group your deployments to suit your needs.

## Default view

This view is shown if:

- You **haven’t** added channels to your project
- Your project settings **don’t** allow tenanted deployments

You’ll see a selection of releases and how they are deployed into environments in your **project’s lifecycle**.

From this view you can deploy releases, create releases, and filter by environments.

:::figure
![Project dashboard default view](/docs/projects/dashboard/project-dashboard-default.jpeg)
:::

### Which releases are shown in the default view?

- For each **environment**:
  - Your most recently deployed release (whether or not the deployment was successful)
  - Your next most recently deployed and successful release
- In **addition** to the above:
  - Up to three of your most recent undeployed releases (but only if they were created after you last deployed a new release)

## Channels view

This view is shown if:

- You’ve **added a channel** to your project
- Your project settings **don’t** allow tenanted deployments

You’ll see a selection of releases for each channel and how they are deployed into environments in each **channel’s lifecycle**.

From this view you can deploy releases in your channels, create releases, and filter by environments.

:::figure
![Project dashboard channels view](/docs/projects/dashboard/project-dashboard-channels.jpeg)
:::

### Which releases are shown in the channels view?

- For each **environment**:
  - Your most recently deployed release, whether or not the deployment was successful
  - Your next most recently deployed and successful release
- For each **channel**:
  - Up to three of your most recent releases (this count includes any already shown releases)

## Tenants view

This view is shown if:

- Your project settings **allow** tenanted deployments

You’ll see **all** of your tenants in your project and a selection of releases deployed to them.

From this view you can filter by release and then deploy the selected release into each tenant’s environments.

:::figure
![Project dashboard tenants view](/docs/projects/dashboard/project-dashboard-tenants.jpeg)
:::

### Which releases are shown in the tenants view?

- For each **tenant and environment combination**:
  - The most recently deployed release is shown.
- If untenanted deployments are allowed:
  - For each **environment**:
  - The most recently deployed, untenanted release is shown.

### Alternative tenants views

- Grouping:
  - When **no grouping** is selected:
    - The environments shown are from your **project’s lifecycle**.
  - When **grouping by channel** is selected:
    - Each channel’s environments are from that **channel’s lifecycle**.
- Project settings for tenanted and untenanted deployments:
  - **Both tenanted and untenanted** deployments are allowed:
    - All untenanted deployments are summarized in the first row, labeled ‘Untenanted’.
  - **Only tenanted** deployments are allowed:
    - No untenanted deployments are shown on the dashboard.
