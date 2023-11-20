---
layout: src/layouts/Default.astro
pubDate: 2023-11-09
modDate: 2023-11-09
title: Finding drift
description: Learn how to scan downstream CaC repos for drift
navOrder: 8
---

When upstream and downstream projects are [configured with CaC and backed by forked repositories](forking-git-repos) it becomes possible to track drift.

The `Octopus - Find CaC Updates` steps detect drift by:

1. Scanning the workspaces in the Terraform state created when deploying downstream projects
2. Finding any CaC enabled projects
3. Cloning the downstream Git repo
4. Checking to see if there are changes to merge from the upstream repo into the downstream repo, and if any merges introduce conflicts

Each `Octopus - Find CaC Updates` step is configured with a specific Terraform backend. For example, the `Octopus - Find CaC Updates (S3 Backend)` step is configured to read Terraform state persisted in an S3 bucket.

The `Octopus - Find CaC Updates` steps are typically defined in a runbook attached to the upstream project:

1. Create a runbook called `__ Find CaC Updates` attached to the upstream project.
2. Add one of the `Octopus - Find CaC Updates` steps.
   1. Run the step on a worker with a recent version of Terraform installed or set the container image to a Docker image with Terraform installed like `octopuslabs/terraform-workertools`.
   2. Set the `Git Username` field to the Git repository username. GitHub users with access tokens set this field to `x-access-token`.
   3. Set the `Git Password` field to the Git repository password or access token.
   4. Set the `Git Protocol` field to either `HTTP` or `HTTPS`. All publicly hosted Git platforms use `HTTPS`.
   5. Set the `Git Hostname` field to the Git repository host name e.g. `github.com`, `gitlab.com`, `bitbucket.com`.
   6. Set the `Git Organization` field to the Git repository owner or organization.
   7. Set the `Git Template Repo` field to the Git repository hosting the upstream project.
   8. Each `Octopus - Find CaC Updates` step then defines additional fields related to the specific Terraform backend. For example, the `Octopus - Find CaC Updates (S3 Backend)` step has fields for AWS credentials, region, bucket, and key.

Executing the runbook will display a list of downstream projects and indicate if they are:

* Up to date with the upstream repository
* Can merge upstream changes automatically
* Must resolve a merge conflict to merge upstream changes