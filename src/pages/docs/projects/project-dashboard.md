--- 
title: Project dashboard
description: Understanding the different project dashboard views. 
position: 20 <!-- position of the document relative to the other documents in the same section --> 
hideInThisSection: true  <!-- Optional. Hides the automatic "In this section" section that lists child documents in the same section. Leave out if not needed. --> 
hideInThisSectionHeader: true <!-- Optional. Only hides the header for the "In this section" section --> 
---

The project dashboard gives you an at-a-glance view of your project. You’ll see a cherry-picked selection of your releases. You’ll also see where and when they were deployed in your environments, tenants, and channels. 

You’ll see one of the following dashboard views:
- Default view
- Channels view
- Tenants view

The view you see depends on whether you’ve added channels to your project and whether you allow tenanted deployments in your project. All views allow you to filter and group your deployments to suit your needs.

## Default view
This view is shown if:
- You haven’t added channels to your project 
- Your project settings don’t allow tenanted deployments 

You’ll see a selection of releases and how they are deployed into environments in your project’s lifecycle. 

From this view you can deploy releases, create releases, and filter by environments.

:::figure
![Project dashboard default view](/docs/projects/project-dashboard-default.png)
:::

### Which releases are shown?
- For each environment:
   - Your most recently deployed release (whether or not the deployment was successful)
   - Your next most recently deployed and successful release
- In addition to the above:
   - Up to three of your most recent undeployed releases (but only if they were created after you last deployed a new release)

## Channels view
This view is shown if: 
- You’ve added a channel to your project 
- Your project settings don’t allow tenanted deployments

You’ll see a selection of releases for each channel and how they are deployed into environments in each channel’s lifecycle. 

From this view you can deploy releases in your channels, create releases, and filter by environments. 

:::figure
![Project dashboard channels view](/docs/projects/project-dashboard-channels.png)
:::

### Which releases are shown?
- For each environment:
   - Your most recently deployed release, whether or not the deployment was successful
   - Your next most recently deployed and successful release
- For each channel:
   - Up to three of your most recent releases (this count includes any already shown releases)

## Tenants view
This view is shown if:
- Your project settings allow tenanted deployments

You’ll see all of your tenants in your project and a selection of releases deployed to them. 

From this view you can filter by release and then deploy the selected release into each tenant’s environments. 

:::figure
![Project dashboard tenants view](/docs/projects/project-dashboard-tenants.png)
:::

### Which releases are shown?
- For each tenant and environment combination:
   - The most recently deployed release is shown.
- If untenanted deployments are allowed:
   - For each environment:
   - The most recently deployed, untenanted release is shown.

### Alternative views
- Grouping:
   - When no grouping is selected:
      - The environments shown are from your project’s lifecycle. 
   - When grouping by channel is selected:
      - Each channel’s environments are from that channel’s lifecycle.
- Project settings for tenanted and untenanted deployments:
   - Both tenantanted and untenanted deployments are allowed: 
      - All untenanted deployments are summarised in the first row, labeled ‘untenanted’. 
   - Only tenanted deployments are allowed:
      - No untenanted deployments are shown on the dashboard.
