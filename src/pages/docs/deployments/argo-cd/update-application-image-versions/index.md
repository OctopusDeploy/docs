---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Generate Argo CD Application Manifests
description: (Re)Generate Argo CD Application manifests using Octopus variables
---
Octopus supports generating an Argo Application's Yaml by reading templates from a package or git repository, populating 
them with Octopus Variables, and writing the resulting Yaml to the application's git repository.
Octopus supports creating a new S3 bucket through the `Create an Amazon S3 Bucket` step.
