---
title: Community edition
description: Server and Cloud community edition limits
position: 10
hideInThisSection: true
---

The Community edition of Octopus is for individuals making personal projects or open source software. It's free to self-host using Octopus Server, and we have a low-cost Cloud Community plan that is `$10 USD` per month. 

This page outlines the limits for the Community edition of Octopus, and how to switch to a community license via the [Octopus Control Center](https://octopus.com/control-center/).

## Server Community

With Octopus Server Community, you host it on your own infrastructure, for free. The license is available 12-months from when you register. This period can be extended by 12-months **at no cost at any time**.

### Server Community limits

Octopus Server Community has limits that apply: 

!include <octopus-server-community-limits>

### How to switch to Community Server

From the [Octopus Control Center](https://octopus.com/control-center/) dashboard, navigate to **{{Server Licenses, View}}**, select your Server license and on the **Overview** pane under the serial select **Change license**.

![](images/octopus-server-change-license.png "width=500")

This will take you to the **Manage your licenses** page. Here you can switch to a Community Server license by clicking on **Change to Community**.

![](images/octopus-server-community.png "width=500")

Lastly, you'll be shown a preview screen where you can review the changes. Once you're happy, click the **Agree, change license** button to complete your switch to the Community edition.

![](images/octopus-server-agree.png "width=500")

## Cloud Community

With Octopus Cloud, we host Octopus on your behalf. Our team takes care of managing the service, ensuring it is backed up and has the latest patches and features. We have a low-cost Cloud Community plan that is `$10 USD` per month.

### Cloud Community limits

The Octopus Cloud Community plan has limits that apply.

**Instance limits:**

!include <octopus-cloud-community-plan-instance-limits>

**Storage limits:**

!include <octopus-cloud-community-plan-storage-limits>

### How to switch to Community Cloud

From the [Octopus Control Center](https://octopus.com/control-center/) dashboard, navigate to **{{Cloud Instances, View}}**, select your instance and click on the **Finance** pane. Once there, click on the **Change Plan** button, and you'll be presented with an option at the bottom of the page. To complete the switch to Community Cloud, click on the **Switch to community plan** link.

![](images/octopus-cloud-community.png "width=500")

## Restricted permissions

The community edition of Octopus runs in a restricted permissions mode. This means that all users within the instance are granted system-wide administrator-level permissions. While Users and Teams can still be configured, any changes to these settings will be ignored.