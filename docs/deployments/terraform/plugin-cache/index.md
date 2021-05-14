---
title: Terraform plugin cache
description: Using plugin caches with Terraform
---

Terraform allows plugins to be cached to improve performance and remove the need to download plugins with each Terraform operation. However, there are some considerations to take into account when configuring Terraform against a plugin cache directory.

The Terraform steps in Octopus expose a **Terraform plugin cache directory** field. When specified, the steps will copy the contents of the directory into the Calamari working directory, and then set the `TF_PLUGIN_CACHE_DIR` environment variable to point to the copied directory. Copying the directory allows multiple Octopus workers to reuse plugins while avoiding the [concurrency issue](https://github.com/hashicorp/terraform/issues/25849) in Terraform.

The downside to referencing a copied directory is that any newly download plugins will not be retained.

To retain complete control over how Terraform accesses a plugin cache directory, leave the **Terraform plugin cache directory** field blank, and define the environment variables to be passed to Terraform directly on the step. This allows the `TF_PLUGIN_CACHE_DIR` environment variable (or any others) to be set to any value. However, when configuring these values manually, it is the responsibility of the end user to account for the [concurrency limitations](https://github.com/hashicorp/terraform/issues/25849) in Terraform.