---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: CLI
description: The all-new Octopus CLI
navOrder: 100
hideInThisSection: true
---

The Octopus CLI is a command line tool that builds on top of the [Octopus Deploy REST API](/docs/octopus-rest-api/). With the Octopus CLI you can push your application packages for deployment as either Zip or NuGet packages, and manage your environments, deployments, projects, and workers.

The Octopus CLI can be used on Windows, Mac, Linux and Docker. For installation options and direct downloads, visit the [CLI Readme](https://github.com/OctopusDeploy/cli/blob/main/README/).

:::hint
The Octopus CLI is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the Octopus CLI project on GitHub](https://github.com/OctopusDeploy/cli), which leans heavily on the [go-octopusdeploy library](https://github.com/OctopusDeploy/go-octopusdeploy).
:::

## Commands {#octopusCommandLine-Commands}


`octopus` supports the following commands:


- **[octopus](octopus/)**:  Octopus Deploy CLI.
- **[octopus account](octopus-account/)**:  Manage accounts.
- **[octopus account aws](octopus-account-aws/)**:  Manage AWS accounts.
- **[octopus account aws create](octopus-account-aws-create/)**:  Create an AWS account.
- **[octopus account aws list](octopus-account-aws-list/)**:  List AWS accounts.
- **[octopus account azure](octopus-account-azure/)**:  Manage Azure subscription accounts.
- **[octopus account azure create](octopus-account-azure-create/)**:  Create an Azure subscription account.
- **[octopus account azure list](octopus-account-azure-list/)**:  List Azure subscription accounts.
- **[octopus account create](octopus-account-create/)**:  Create an account.
- **[octopus account delete](octopus-account-delete/)**:  Delete an account.
- **[octopus account gcp](octopus-account-gcp/)**:  Manage Google Cloud accounts.
- **[octopus account gcp create](octopus-account-gcp-create/)**:  Create a Google Cloud account.
- **[octopus account gcp list](octopus-account-gcp-list/)**:  List Google Cloud accounts.
- **[octopus account list](octopus-account-list/)**:  List accounts.
- **[octopus account ssh](octopus-account-ssh/)**:  Manage SSH Key Pair accounts.
- **[octopus account ssh create](octopus-account-ssh-create/)**:  Create a SSH Key Pair account.
- **[octopus account ssh list](octopus-account-ssh-list/)**:  List SSH Key Pair accounts.
- **[octopus account token](octopus-account-token/)**:  Manage Token accounts.
- **[octopus account token create](octopus-account-token-create/)**:  Create a Token account.
- **[octopus account token list](octopus-account-token-list/)**:  List Token accounts.
- **[octopus account username](octopus-account-username/)**:  Manage Username/Password accounts.
- **[octopus account username create](octopus-account-username-create/)**:  Create a Username/Password account.
- **[octopus account username list](octopus-account-username-list/)**:  List Username/Password accounts.
- **[octopus config](octopus-config/)**:  Manage CLI configuration.
- **[octopus config get](octopus-config-get/)**:  Gets the value of config key for Octopus CLI.
- **[octopus config list](octopus-config-list/)**:  List values from config file.
- **[octopus config set](octopus-config-set/)**:  Set will write the value for given key to Octopus CLI config file.
- **[octopus deployment-target](octopus-deployment-target/)**:  Manage deployment targets.
- **[octopus deployment-target azure-web-app](octopus-deployment-target-azure-web-app/)**:  Manage Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app create](octopus-deployment-target-azure-web-app-create/)**:  Create an Azure Web App deployment target.
- **[octopus deployment-target azure-web-app list](octopus-deployment-target-azure-web-app-list/)**:  List Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app view](octopus-deployment-target-azure-web-app-view/)**:  View an Azure Web App deployment target.
- **[octopus deployment-target cloud-region](octopus-deployment-target-cloud-region/)**:  Manage Cloud Region deployment targets.
- **[octopus deployment-target cloud-region create](octopus-deployment-target-cloud-region-create/)**:  Create a Cloud Region deployment target.
- **[octopus deployment-target cloud-region list](octopus-deployment-target-cloud-region-list/)**:  List Cloud Region deployment targets.
- **[octopus deployment-target cloud-region view](octopus-deployment-target-cloud-region-view/)**:  View a Cloud Region deployment target.
- **[octopus deployment-target delete](octopus-deployment-target-delete/)**:  Delete a deployment target.
- **[octopus deployment-target kubernetes](octopus-deployment-target-kubernetes/)**:  Manage Kubernetes deployment targets.
- **[octopus deployment-target kubernetes create](octopus-deployment-target-kubernetes-create/)**:  Create a Kubernetes deployment target.
- **[octopus deployment-target kubernetes list](octopus-deployment-target-kubernetes-list/)**:  List Kubernetes deployment targets.
- **[octopus deployment-target kubernetes view](octopus-deployment-target-kubernetes-view/)**:  View a Kubernetes deployment target.
- **[octopus deployment-target list](octopus-deployment-target-list/)**:  List deployment targets.
- **[octopus deployment-target listening-tentacle](octopus-deployment-target-listening-tentacle/)**:  Manage Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle create](octopus-deployment-target-listening-tentacle-create/)**:  Create a Listening Tentacle deployment target.
- **[octopus deployment-target listening-tentacle list](octopus-deployment-target-listening-tentacle-list/)**:  List Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle view](octopus-deployment-target-listening-tentacle-view/)**:  View a Listening Tentacle deployment target.
- **[octopus deployment-target polling-tentacle](octopus-deployment-target-polling-tentacle/)**:  Manage Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle list](octopus-deployment-target-polling-tentacle-list/)**:  List Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle view](octopus-deployment-target-polling-tentacle-view/)**:  View a Polling Tentacle deployment target.
- **[octopus deployment-target ssh](octopus-deployment-target-ssh/)**:  Manage SSH deployment targets.
- **[octopus deployment-target ssh create](octopus-deployment-target-ssh-create/)**:  Create a SSH deployment target.
- **[octopus deployment-target ssh list](octopus-deployment-target-ssh-list/)**:  List SSH deployment targets.
- **[octopus deployment-target ssh view](octopus-deployment-target-ssh-view/)**:  View a SSH deployment target.
- **[octopus deployment-target view](octopus-deployment-target-view/)**:  View a deployment target.
- **[octopus environment](octopus-environment/)**:  Manage environments.
- **[octopus environment delete](octopus-environment-delete/)**:  Delete an environment.
- **[octopus environment list](octopus-environment-list/)**:  List environments.
- **[octopus package](octopus-package/)**:  Manage packages.
- **[octopus package list](octopus-package-list/)**:  List packages.
- **[octopus package nuget](octopus-package-nuget/)**:  Package as NuPkg.
- **[octopus package nuget create](octopus-package-nuget-create/)**:  Create nuget.
- **[octopus package upload](octopus-package-upload/)**:  upload one or more packages to Octopus Deploy.
- **[octopus package versions](octopus-package-versions/)**:  List versions of a package.
- **[octopus package zip](octopus-package-zip/)**:  Package as zip.
- **[octopus package zip create](octopus-package-zip-create/)**:  Create zip.
- **[octopus project](octopus-project/)**:  Manage projects.
- **[octopus project connect](octopus-project-connect/)**:  Connect a tenant to a project.
- **[octopus project convert](octopus-project-convert/)**:  Convert a project to use Config As Code.
- **[octopus project create](octopus-project-create/)**:  Create a project.
- **[octopus project delete](octopus-project-delete/)**:  Delete a project.
- **[octopus project disconnect](octopus-project-disconnect/)**:  Disconnect a tenant from a project.
- **[octopus project list](octopus-project-list/)**:  List projects.
- **[octopus project variables](octopus-project-variables/)**:  Manage project variables.
- **[octopus project variables create](octopus-project-variables-create/)**:  Create a variable for a project.
- **[octopus project variables delete](octopus-project-variables-delete/)**:  Delete a project variable.
- **[octopus project variables exclude](octopus-project-variables-exclude/)**:  Exclude a variable set from a project.
- **[octopus project variables include](octopus-project-variables-include/)**:  Include a variable set in a project.
- **[octopus project variables list](octopus-project-variables-list/)**:  List project variables.
- **[octopus project variables update](octopus-project-variables-update/)**:  Update the value of a project variable.
- **[octopus project variables view](octopus-project-variables-view/)**:  View all values of a project variable.
- **[octopus project view](octopus-project-view/)**:  View a project.
- **[octopus project-group](octopus-project-group/)**:  Manage project groups.
- **[octopus project-group create](octopus-project-group-create/)**:  Create a project group.
- **[octopus project-group delete](octopus-project-group-delete/)**:  Delete a project group.
- **[octopus project-group list](octopus-project-group-list/)**:  List project groups.
- **[octopus project-group view](octopus-project-group-view/)**:  View a project group.
- **[octopus release](octopus-release/)**:  Manage releases.
- **[octopus release create](octopus-release-create/)**:  Create a release.
- **[octopus release delete](octopus-release-delete/)**:  Delete a release.
- **[octopus release deploy](octopus-release-deploy/)**:  Deploy releases.
- **[octopus release list](octopus-release-list/)**:  List releases.
- **[octopus runbook](octopus-runbook/)**:  Manage runbooks.
- **[octopus runbook list](octopus-runbook-list/)**:  List runbooks.
- **[octopus runbook run](octopus-runbook-run/)**:  Run runbooks in Octopus Deploy.
- **[octopus space](octopus-space/)**:  Manage spaces.
- **[octopus space create](octopus-space-create/)**:  Create a space.
- **[octopus space delete](octopus-space-delete/)**:  Delete a space.
- **[octopus space list](octopus-space-list/)**:  List spaces.
- **[octopus space view](octopus-space-view/)**:  View a space.
- **[octopus task](octopus-task/)**:  Manage tasks.
- **[octopus task wait](octopus-task-wait/)**:  Wait for task(s) to finish.
- **[octopus tenant](octopus-tenant/)**:  Manage tenants.
- **[octopus tenant clone](octopus-tenant-clone/)**:  Clone a tenant.
- **[octopus tenant connect](octopus-tenant-connect/)**:  Connect a tenant to a project.
- **[octopus tenant create](octopus-tenant-create/)**:  Create a tenant.
- **[octopus tenant delete](octopus-tenant-delete/)**:  Delete a tenant.
- **[octopus tenant disconnect](octopus-tenant-disconnect/)**:  Disconnect a tenant from a project.
- **[octopus tenant list](octopus-tenant-list/)**:  List tenants.
- **[octopus tenant tag](octopus-tenant-tag/)**:  Override tags for a tenant.
- **[octopus tenant view](octopus-tenant-view/)**:  View a tenant.
- **[octopus user](octopus-user/)**:  Manage users.
- **[octopus user delete](octopus-user-delete/)**:  Delete a user.
- **[octopus user list](octopus-user-list/)**:  List users.
- **[octopus worker](octopus-worker/)**:  Manage workers.
- **[octopus worker delete](octopus-worker-delete/)**:  Delete a worker.
- **[octopus worker list](octopus-worker-list/)**:  List workers.
- **[octopus worker listening-tentacle](octopus-worker-listening-tentacle/)**:  Manage Listening Tentacle workers.
- **[octopus worker listening-tentacle create](octopus-worker-listening-tentacle-create/)**:  Create a listening tentacle worker.
- **[octopus worker listening-tentacle list](octopus-worker-listening-tentacle-list/)**:  List Listening Tentacle workers.
- **[octopus worker listening-tentacle view](octopus-worker-listening-tentacle-view/)**:  View a Listening Tentacle worker.
- **[octopus worker polling-tentacle](octopus-worker-polling-tentacle/)**:  Manage Polling Tentacle workers.
- **[octopus worker polling-tentacle list](octopus-worker-polling-tentacle-list/)**:  List Polling Tentacle workers.
- **[octopus worker polling-tentacle view](octopus-worker-polling-tentacle-view/)**:  View a Polling Tentacle worker.
- **[octopus worker ssh](octopus-worker-ssh/)**:  Manage SSH workers.
- **[octopus worker ssh create](octopus-worker-ssh-create/)**:  Create a SSH worker.
- **[octopus worker ssh list](octopus-worker-ssh-list/)**:  List SSH workers.
- **[octopus worker ssh view](octopus-worker-ssh-view/)**:  View a SSH worker.
- **[octopus worker view](octopus-worker-view/)**:  View a worker.
- **[octopus worker-pool](octopus-worker-pool/)**:  Manage worker pools.
- **[octopus worker-pool delete](octopus-worker-pool-delete/)**:  Delete a worker pool.
- **[octopus worker-pool dynamic](octopus-worker-pool-dynamic/)**:  Manage dynamic worker pools.
- **[octopus worker-pool dynamic create](octopus-worker-pool-dynamic-create/)**:  Create a dynamic worker pool.
- **[octopus worker-pool dynamic view](octopus-worker-pool-dynamic-view/)**:  View a dynamic worker pool.
- **[octopus worker-pool list](octopus-worker-pool-list/)**:  List worker pools.
- **[octopus worker-pool static](octopus-worker-pool-static/)**:  Manage static worker pools.
- **[octopus worker-pool static create](octopus-worker-pool-static-create/)**:  Create a static worker pool.
- **[octopus worker-pool static view](octopus-worker-pool-static-view/)**:  View a static worker pool.
- **[octopus worker-pool view](octopus-worker-pool-view/)**:  View a worker pool.