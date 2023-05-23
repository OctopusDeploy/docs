---
title: CLI
description: The all-new Octopus CLI
position: 100
hideInThisSection: true
---

The Octopus CLI is a command line tool that builds on top of the [Octopus Deploy REST API](/docs/octopus-rest-api/index.md). With the Octopus CLI you can push your application packages for deployment as either Zip or NuGet packages, and manage your environments, deployments, projects, and workers.

The Octopus CLI can be used on Windows, Mac, Linux and Docker. For installation options and direct downloads, visit the [CLI Readme](https://github.com/OctopusDeploy/cli/blob/main/README.md).

:::hint
The Octopus CLI is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the Octopus CLI project on GitHub](https://github.com/OctopusDeploy/cli), which leans heavily on the [go-octopusdeploy library](https://github.com/OctopusDeploy/go-octopusdeploy).
:::

## Commands {#octopusCommandLine-Commands}


`octopus` supports the following commands:


- **[octopus](octopus.md)**:  Octopus Deploy CLI.
- **[octopus account](octopus-account.md)**:  Manage accounts.
- **[octopus account aws](octopus-account-aws.md)**:  Manage AWS accounts.
- **[octopus account aws create](octopus-account-aws-create.md)**:  Create an AWS account.
- **[octopus account aws list](octopus-account-aws-list.md)**:  List AWS accounts.
- **[octopus account azure](octopus-account-azure.md)**:  Manage Azure subscription accounts.
- **[octopus account azure create](octopus-account-azure-create.md)**:  Create an Azure subscription account.
- **[octopus account azure list](octopus-account-azure-list.md)**:  List Azure subscription accounts.
- **[octopus account create](octopus-account-create.md)**:  Create an account.
- **[octopus account delete](octopus-account-delete.md)**:  Delete an account.
- **[octopus account gcp](octopus-account-gcp.md)**:  Manage Google Cloud accounts.
- **[octopus account gcp create](octopus-account-gcp-create.md)**:  Create a Google Cloud account.
- **[octopus account gcp list](octopus-account-gcp-list.md)**:  List Google Cloud accounts.
- **[octopus account list](octopus-account-list.md)**:  List accounts.
- **[octopus account ssh](octopus-account-ssh.md)**:  Manage SSH Key Pair accounts.
- **[octopus account ssh create](octopus-account-ssh-create.md)**:  Create a SSH Key Pair account.
- **[octopus account ssh list](octopus-account-ssh-list.md)**:  List SSH Key Pair accounts.
- **[octopus account token](octopus-account-token.md)**:  Manage Token accounts.
- **[octopus account token create](octopus-account-token-create.md)**:  Create a Token account.
- **[octopus account token list](octopus-account-token-list.md)**:  List Token accounts.
- **[octopus account username](octopus-account-username.md)**:  Manage Username/Password accounts.
- **[octopus account username create](octopus-account-username-create.md)**:  Create a Username/Password account.
- **[octopus account username list](octopus-account-username-list.md)**:  List Username/Password accounts.
- **[octopus config](octopus-config.md)**:  Manage CLI configuration.
- **[octopus config get](octopus-config-get.md)**:  Gets the value of config key for Octopus CLI.
- **[octopus config list](octopus-config-list.md)**:  List values from config file.
- **[octopus config set](octopus-config-set.md)**:  Set will write the value for given key to Octopus CLI config file.
- **[octopus deployment-target](octopus-deployment-target.md)**:  Manage deployment targets.
- **[octopus deployment-target azure-web-app](octopus-deployment-target-azure-web-app.md)**:  Manage Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app create](octopus-deployment-target-azure-web-app-create.md)**:  Create an Azure Web App deployment target.
- **[octopus deployment-target azure-web-app list](octopus-deployment-target-azure-web-app-list.md)**:  List Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app view](octopus-deployment-target-azure-web-app-view.md)**:  View an Azure Web App deployment target.
- **[octopus deployment-target cloud-region](octopus-deployment-target-cloud-region.md)**:  Manage Cloud Region deployment targets.
- **[octopus deployment-target cloud-region create](octopus-deployment-target-cloud-region-create.md)**:  Create a Cloud Region deployment target.
- **[octopus deployment-target cloud-region list](octopus-deployment-target-cloud-region-list.md)**:  List Cloud Region deployment targets.
- **[octopus deployment-target cloud-region view](octopus-deployment-target-cloud-region-view.md)**:  View a Cloud Region deployment target.
- **[octopus deployment-target delete](octopus-deployment-target-delete.md)**:  Delete a deployment target.
- **[octopus deployment-target kubernetes](octopus-deployment-target-kubernetes.md)**:  Manage Kubernetes deployment targets.
- **[octopus deployment-target kubernetes create](octopus-deployment-target-kubernetes-create.md)**:  Create a Kubernetes deployment target.
- **[octopus deployment-target kubernetes list](octopus-deployment-target-kubernetes-list.md)**:  List Kubernetes deployment targets.
- **[octopus deployment-target kubernetes view](octopus-deployment-target-kubernetes-view.md)**:  View a Kubernetes deployment target.
- **[octopus deployment-target list](octopus-deployment-target-list.md)**:  List deployment targets.
- **[octopus deployment-target listening-tentacle](octopus-deployment-target-listening-tentacle.md)**:  Manage Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle create](octopus-deployment-target-listening-tentacle-create.md)**:  Create a Listening Tentacle deployment target.
- **[octopus deployment-target listening-tentacle list](octopus-deployment-target-listening-tentacle-list.md)**:  List Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle view](octopus-deployment-target-listening-tentacle-view.md)**:  View a Listening Tentacle deployment target.
- **[octopus deployment-target polling-tentacle](octopus-deployment-target-polling-tentacle.md)**:  Manage Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle list](octopus-deployment-target-polling-tentacle-list.md)**:  List Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle view](octopus-deployment-target-polling-tentacle-view.md)**:  View a Polling Tentacle deployment target.
- **[octopus deployment-target ssh](octopus-deployment-target-ssh.md)**:  Manage SSH deployment targets.
- **[octopus deployment-target ssh create](octopus-deployment-target-ssh-create.md)**:  Create a SSH deployment target.
- **[octopus deployment-target ssh list](octopus-deployment-target-ssh-list.md)**:  List SSH deployment targets.
- **[octopus deployment-target ssh view](octopus-deployment-target-ssh-view.md)**:  View a SSH deployment target.
- **[octopus deployment-target view](octopus-deployment-target-view.md)**:  View a deployment target.
- **[octopus environment](octopus-environment.md)**:  Manage environments.
- **[octopus environment delete](octopus-environment-delete.md)**:  Delete an environment.
- **[octopus environment list](octopus-environment-list.md)**:  List environments.
- **[octopus package](octopus-package.md)**:  Manage packages.
- **[octopus package list](octopus-package-list.md)**:  List packages.
- **[octopus package nuget](octopus-package-nuget.md)**:  Package as NuPkg.
- **[octopus package nuget create](octopus-package-nuget-create.md)**:  Create nuget.
- **[octopus package upload](octopus-package-upload.md)**:  upload one or more packages to Octopus Deploy.
- **[octopus package versions](octopus-package-versions.md)**:  List versions of a package.
- **[octopus package zip](octopus-package-zip.md)**:  Package as zip.
- **[octopus package zip create](octopus-package-zip-create.md)**:  Create zip.
- **[octopus project](octopus-project.md)**:  Manage projects.
- **[octopus project connect](octopus-project-connect.md)**:  Connect a tenant to a project.
- **[octopus project convert](octopus-project-convert.md)**:  Convert a project to use Config As Code.
- **[octopus project create](octopus-project-create.md)**:  Create a project.
- **[octopus project delete](octopus-project-delete.md)**:  Delete a project.
- **[octopus project disconnect](octopus-project-disconnect.md)**:  Disconnect a tenant from a project.
- **[octopus project list](octopus-project-list.md)**:  List projects.
- **[octopus project variables](octopus-project-variables.md)**:  Manage project variables.
- **[octopus project variables create](octopus-project-variables-create.md)**:  Create a variable for a project.
- **[octopus project variables delete](octopus-project-variables-delete.md)**:  Delete a project variable.
- **[octopus project variables exclude](octopus-project-variables-exclude.md)**:  Exclude a variable set from a project.
- **[octopus project variables include](octopus-project-variables-include.md)**:  Include a variable set in a project.
- **[octopus project variables list](octopus-project-variables-list.md)**:  List project variables.
- **[octopus project variables update](octopus-project-variables-update.md)**:  Update the value of a project variable.
- **[octopus project variables view](octopus-project-variables-view.md)**:  View all values of a project variable.
- **[octopus project view](octopus-project-view.md)**:  View a project.
- **[octopus project-group](octopus-project-group.md)**:  Manage project groups.
- **[octopus project-group create](octopus-project-group-create.md)**:  Create a project group.
- **[octopus project-group delete](octopus-project-group-delete.md)**:  Delete a project group.
- **[octopus project-group list](octopus-project-group-list.md)**:  List project groups.
- **[octopus project-group view](octopus-project-group-view.md)**:  View a project group.
- **[octopus release](octopus-release.md)**:  Manage releases.
- **[octopus release create](octopus-release-create.md)**:  Create a release.
- **[octopus release delete](octopus-release-delete.md)**:  Delete a release.
- **[octopus release deploy](octopus-release-deploy.md)**:  Deploy releases.
- **[octopus release list](octopus-release-list.md)**:  List releases.
- **[octopus runbook](octopus-runbook.md)**:  Manage runbooks.
- **[octopus runbook list](octopus-runbook-list.md)**:  List runbooks.
- **[octopus runbook run](octopus-runbook-run.md)**:  Run runbooks in Octopus Deploy.
- **[octopus space](octopus-space.md)**:  Manage spaces.
- **[octopus space create](octopus-space-create.md)**:  Create a space.
- **[octopus space delete](octopus-space-delete.md)**:  Delete a space.
- **[octopus space list](octopus-space-list.md)**:  List spaces.
- **[octopus space view](octopus-space-view.md)**:  View a space.
- **[octopus task](octopus-task.md)**:  Manage tasks.
- **[octopus task wait](octopus-task-wait.md)**:  Wait for task(s) to finish.
- **[octopus tenant](octopus-tenant.md)**:  Manage tenants.
- **[octopus tenant clone](octopus-tenant-clone.md)**:  Clone a tenant.
- **[octopus tenant connect](octopus-tenant-connect.md)**:  Connect a tenant to a project.
- **[octopus tenant create](octopus-tenant-create.md)**:  Create a tenant.
- **[octopus tenant delete](octopus-tenant-delete.md)**:  Delete a tenant.
- **[octopus tenant disconnect](octopus-tenant-disconnect.md)**:  Disconnect a tenant from a project.
- **[octopus tenant list](octopus-tenant-list.md)**:  List tenants.
- **[octopus tenant tag](octopus-tenant-tag.md)**:  Override tags for a tenant.
- **[octopus tenant variables](octopus-tenant-variables.md)**:  Manage tenant variables.
- **[octopus tenant variables list](octopus-tenant-variables-list.md)**:  List tenant variables.
- **[octopus tenant variables update](octopus-tenant-variables-update.md)**:  Update the value of a tenant variable.
- **[octopus tenant view](octopus-tenant-view.md)**:  View a tenant.
- **[octopus user](octopus-user.md)**:  Manage users.
- **[octopus user delete](octopus-user-delete.md)**:  Delete a user.
- **[octopus user list](octopus-user-list.md)**:  List users.
- **[octopus worker](octopus-worker.md)**:  Manage workers.
- **[octopus worker delete](octopus-worker-delete.md)**:  Delete a worker.
- **[octopus worker list](octopus-worker-list.md)**:  List workers.
- **[octopus worker listening-tentacle](octopus-worker-listening-tentacle.md)**:  Manage Listening Tentacle workers.
- **[octopus worker listening-tentacle create](octopus-worker-listening-tentacle-create.md)**:  Create a listening tentacle worker.
- **[octopus worker listening-tentacle list](octopus-worker-listening-tentacle-list.md)**:  List Listening Tentacle workers.
- **[octopus worker listening-tentacle view](octopus-worker-listening-tentacle-view.md)**:  View a Listening Tentacle worker.
- **[octopus worker polling-tentacle](octopus-worker-polling-tentacle.md)**:  Manage Polling Tentacle workers.
- **[octopus worker polling-tentacle list](octopus-worker-polling-tentacle-list.md)**:  List Polling Tentacle workers.
- **[octopus worker polling-tentacle view](octopus-worker-polling-tentacle-view.md)**:  View a Polling Tentacle worker.
- **[octopus worker ssh](octopus-worker-ssh.md)**:  Manage SSH workers.
- **[octopus worker ssh create](octopus-worker-ssh-create.md)**:  Create a SSH worker.
- **[octopus worker ssh list](octopus-worker-ssh-list.md)**:  List SSH workers.
- **[octopus worker ssh view](octopus-worker-ssh-view.md)**:  View a SSH worker.
- **[octopus worker view](octopus-worker-view.md)**:  View a worker.
- **[octopus worker-pool](octopus-worker-pool.md)**:  Manage worker pools.
- **[octopus worker-pool delete](octopus-worker-pool-delete.md)**:  Delete a worker pool.
- **[octopus worker-pool dynamic](octopus-worker-pool-dynamic.md)**:  Manage dynamic worker pools.
- **[octopus worker-pool dynamic create](octopus-worker-pool-dynamic-create.md)**:  Create a dynamic worker pool.
- **[octopus worker-pool dynamic view](octopus-worker-pool-dynamic-view.md)**:  View a dynamic worker pool.
- **[octopus worker-pool list](octopus-worker-pool-list.md)**:  List worker pools.
- **[octopus worker-pool static](octopus-worker-pool-static.md)**:  Manage static worker pools.
- **[octopus worker-pool static create](octopus-worker-pool-static-create.md)**:  Create a static worker pool.
- **[octopus worker-pool static view](octopus-worker-pool-static-view.md)**:  View a static worker pool.
- **[octopus worker-pool view](octopus-worker-pool-view.md)**:  View a worker pool.