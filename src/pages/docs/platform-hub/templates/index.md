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

**[Project templates](/docs/platform-hub/templates/project-templates)** give platform engineering teams a way to define a golden path for how projects are structured. The deployment process is set by the template and cannot be modified. Teams provide values for the parameters the platform team has exposed, such as packages, accounts, worker pools, target tags, and more, but the underlying process cannot be edited and remains consistent across every project created from the template.

Both template types use [parameters](/docs/platform-hub/templates/parameters) to expose configurable inputs, letting you define what a project must supply while keeping the core template consistent across teams and spaces.

## Prerequisites

Before creating any template, you must configure a Git repository in [Platform Hub](/docs/platform-hub). This repository stores your templates as code (OCL files) and is the single source of truth for all template changes.
