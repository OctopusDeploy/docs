---
layout: src/layouts/Default.astro
pubDate: 2023-11-09
modDate: 2023-11-09
title: Merging repos
description: Learn how to merge changes to downstream repos
navOrder: 9
---

When upstream and downstream projects are [configured with CaC and backed by forked repositories](forking-git-repos) it becomes possible to merge changes from upstream to downstream repositories.

The `Octopus - Merge CaC Updates` steps merges changes by:

1. Scanning the workspaces in the Terraform state created when deploying downstream projects
2. Finding any CaC enabled projects
3. Cloning the downstream Git repository
4. Adding the upstream repo as a remote repository
5. Merging changes from the upstream repo to the downstream repository

Each `Octopus - Merge CaC Updates` step is configured with a specific Terraform backend. For example, the `Octopus - Merge CaC Updates (S3 Backend)` step is configured to read Terraform state persisted in an S3 bucket.

The `Octopus - Merge CaC Updates` steps are typically defined in a runbook attached to the upstream project:

1. Create a runbook called `__ Merge CaC Updates` attached to the upstream project.
2. Add one of the `Octopus - Merge CaC Updates` steps.
   1. Run the step on a worker with a recent version of Terraform installed or set the container image to a Docker image with Terraform installed like `octopuslabs/terraform-workertools`.
   2. Set the `Octopus Spaces` field to a newline-separated list of downstream space names containing projects to update. Leave the field blank to process all downstream spaces. The default value of `#{Octopus.Deployment.Tenant.Name}` assumes the step is run against a tenant and the tenant name matches the space name.
   3. Set the `Octopus Projects` field to a newline-separated list of downstream project names to process. Leave the field blank to process all downstream projects.
   4. Set the `Git Username` field to the Git repository username. GitHub users with access tokens set this field to `x-access-token`.
   5. Set the `Git Password` field to the Git repository password or access token.
   6. Set the `Git Protocol` field to either `HTTP` or `HTTPS`. All publicly hosted Git platforms use `HTTPS`.
   7. Set the `Git Hostname` field to the Git repository host name e.g. `github.com`, `gitlab.com`, `bitbucket.com`.
   8. Set the `Git Organization` field to the Git repository owner or organization.
   9. Set the `Git Template Repo` field to the Git repository hosting the upstream project.
   10. Each `Octopus - Merge CaC Updates` step then defines additional fields related to the specific Terraform backend. For example, the `Octopus - Merge CaC Updates (S3 Backend)` step has fields for AWS credentials, region, bucket, and key.

Executing the runbook will merge upstream changes into downstream repositories or print instructions on manually resolving merge conflicts in the verbose logs.