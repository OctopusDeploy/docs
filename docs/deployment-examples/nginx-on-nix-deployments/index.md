---
title: NGINX Web Server deployments
description: This guide covers everything you need to configure NGINX on *NIX for your web applications
position: 110
---

In our continuing journey to expand Octopus Deploys capabilities beyond the Microsoft world, it's now easier to configure [NGINX](https://www.nginx.com/) as a web server on Linux based targets to proxy requests to your web application or serve static content from the file system.

In this guide we will go through the process of packaging up an ASP.NET Core Web API backend with a static HTML and JavaScript front-end and deploying to a Linux based target over a SSH connection and configuring an NGINX web server to serve traffic to both applications. Any part of this guide can be attempted on its own in conjunction with other project or target types, however this aims to provide an end-to-end example of one particular set up. Please note that these pages are not intended as an "ultimate guide to Linux" and are only an introductory guide to show how you can quickly get started today with a simple deployment scenario.