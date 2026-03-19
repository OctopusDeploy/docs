---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-06
title: Templates
subtitle: Reusable templates for processes and projects in Platform Hub
icon: fa-solid fa-layer-group
navTitle: Overview
navSection: Templates
description: An overview of templates in Platform Hub
navOrder: 140
---

## Overview

Platform Hub provides two types of templates that help you standardize and share your deployment configuration across spaces.

**[Process templates](/docs/platform-hub/templates/process-templates)** are reusable sets of deployment steps. Instead of copying and pasting deployment processes across projects, you define the steps once and share them. Teams can opt into using a process template within their deployment process, and can remove it if it no longer fits their needs.

**[Project templates](/docs/platform-hub/templates/project-templates)** give platform engineering teams a way to define a golden path for how projects are structured. The deployment process is defined by the template and can't be modified in projects based on it. Through parameters exposed by the platform team, project teams can deploy using their own packages, accounts, worker pools, and target tags, while the underlying process stays consistent across every project based on the template. Project templates are currently in Alpha, see the [installation guide](/docs/platform-hub/templates/project-templates/installation-guide) to get started.

Both template types use [parameters](/docs/platform-hub/templates/parameters) to expose configurable inputs, letting you define what a project must supply while keeping the core template consistent across teams and spaces.

## Prerequisites

Before creating any template, you must configure a Git repository in [Platform Hub](/docs/platform-hub). This repository stores your templates as code (OCL files) and is the single source of truth for all template changes.
