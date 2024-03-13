---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-02-23
title: Octopus Command Line (CLI)
description: The all-new Octopus CLI
navOrder: 30
hideInThisSection: true
---

The Octopus CLI is a command line tool that builds on top of the [Octopus Deploy REST API](/docs/octopus-rest-api). With the Octopus CLI you can push your application packages for deployment as either Zip or NuGet packages, and manage your environments, deployments, projects, and workers.

The Octopus CLI can be used on Windows, Mac, Linux and Docker. For installation options and direct downloads, visit the [CLI Readme](https://github.com/OctopusDeploy/cli/blob/main/README.md).

:::div{.hint}
The Octopus CLI is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the Octopus CLI project on GitHub](https://github.com/OctopusDeploy/cli), which leans heavily on the [go-octopusdeploy library](https://github.com/OctopusDeploy/go-octopusdeploy).
:::

## Commands {#octopusCommandLine-Commands}


`octopus` supports the following commands:


- **[octopus](/docs/octopus-rest-api/cli/octopus)**:  Octopus Deploy CLI.
- **[octopus account](/docs/octopus-rest-api/cli/octopus-account)**:  Manage accounts.
- **[octopus account aws](/docs/octopus-rest-api/cli/octopus-account-aws)**:  Manage AWS accounts.
- **[octopus account aws create](/docs/octopus-rest-api/cli/octopus-account-aws-create)**:  Create an AWS account.
- **[octopus account aws list](/docs/octopus-rest-api/cli/octopus-account-aws-list)**:  List AWS accounts.
- **[octopus account azure](/docs/octopus-rest-api/cli/octopus-account-azure)**:  Manage Azure subscription accounts.
- **[octopus account azure create](/docs/octopus-rest-api/cli/octopus-account-azure-create)**:  Create an Azure subscription account.
- **[octopus account azure list](/docs/octopus-rest-api/cli/octopus-account-azure-list)**:  List Azure subscription accounts.
- **[octopus account azure-oidc](/docs/octopus-rest-api/cli/octopus-account-azure-oidc)**:  Manage Azure OpenID Connect accounts.
- **[octopus account azure-oidc create](/docs/octopus-rest-api/cli/octopus-account-azure-oidc-create)**:  Create an Azure OpenID Connect account.
- **[octopus account azure-oidc list](/docs/octopus-rest-api/cli/octopus-account-azure-oidc-list)**:  List Azure OpenID Connect accounts.
- **[octopus account create](/docs/octopus-rest-api/cli/octopus-account-create)**:  Create an account.
- **[octopus account delete](/docs/octopus-rest-api/cli/octopus-account-delete)**:  Delete an account.
- **[octopus account gcp](/docs/octopus-rest-api/cli/octopus-account-gcp)**:  Manage Google Cloud accounts.
- **[octopus account gcp create](/docs/octopus-rest-api/cli/octopus-account-gcp-create)**:  Create a Google Cloud account.
- **[octopus account gcp list](/docs/octopus-rest-api/cli/octopus-account-gcp-list)**:  List Google Cloud accounts.
- **[octopus account list](/docs/octopus-rest-api/cli/octopus-account-list)**:  List accounts.
- **[octopus account ssh](/docs/octopus-rest-api/cli/octopus-account-ssh)**:  Manage SSH Key Pair accounts.
- **[octopus account ssh create](/docs/octopus-rest-api/cli/octopus-account-ssh-create)**:  Create a SSH Key Pair account.
- **[octopus account ssh list](/docs/octopus-rest-api/cli/octopus-account-ssh-list)**:  List SSH Key Pair accounts.
- **[octopus account token](/docs/octopus-rest-api/cli/octopus-account-token)**:  Manage Token accounts.
- **[octopus account token create](/docs/octopus-rest-api/cli/octopus-account-token-create)**:  Create a Token account.
- **[octopus account token list](/docs/octopus-rest-api/cli/octopus-account-token-list)**:  List Token accounts.
- **[octopus account username](/docs/octopus-rest-api/cli/octopus-account-username)**:  Manage Username/Password accounts.
- **[octopus account username create](/docs/octopus-rest-api/cli/octopus-account-username-create)**:  Create a Username/Password account.
- **[octopus account username list](/docs/octopus-rest-api/cli/octopus-account-username-list)**:  List Username/Password accounts.
- **[octopus config](/docs/octopus-rest-api/cli/octopus-config)**:  Manage CLI configuration.
- **[octopus config get](/docs/octopus-rest-api/cli/octopus-config-get)**:  Gets the value of config key for Octopus CLI.
- **[octopus config list](/docs/octopus-rest-api/cli/octopus-config-list)**:  List values from config file.
- **[octopus config set](/docs/octopus-rest-api/cli/octopus-config-set)**:  Set will write the value for given key to Octopus CLI config file.
- **[octopus deployment-target](/docs/octopus-rest-api/cli/octopus-deployment-target)**:  Manage deployment targets.
- **[octopus deployment-target azure-web-app](/docs/octopus-rest-api/cli/octopus-deployment-target-azure-web-app)**:  Manage Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app create](/docs/octopus-rest-api/cli/octopus-deployment-target-azure-web-app-create)**:  Create an Azure Web App deployment target.
- **[octopus deployment-target azure-web-app list](/docs/octopus-rest-api/cli/octopus-deployment-target-azure-web-app-list)**:  List Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app view](/docs/octopus-rest-api/cli/octopus-deployment-target-azure-web-app-view)**:  View an Azure Web App deployment target.
- **[octopus deployment-target cloud-region](/docs/octopus-rest-api/cli/octopus-deployment-target-cloud-region)**:  Manage Cloud Region deployment targets.
- **[octopus deployment-target cloud-region create](/docs/octopus-rest-api/cli/octopus-deployment-target-cloud-region-create)**:  Create a Cloud Region deployment target.
- **[octopus deployment-target cloud-region list](/docs/octopus-rest-api/cli/octopus-deployment-target-cloud-region-list)**:  List Cloud Region deployment targets.
- **[octopus deployment-target cloud-region view](/docs/octopus-rest-api/cli/octopus-deployment-target-cloud-region-view)**:  View a Cloud Region deployment target.
- **[octopus deployment-target delete](/docs/octopus-rest-api/cli/octopus-deployment-target-delete)**:  Delete a deployment target.
- **[octopus deployment-target kubernetes](/docs/octopus-rest-api/cli/octopus-deployment-target-kubernetes)**:  Manage Kubernetes deployment targets.
- **[octopus deployment-target kubernetes create](/docs/octopus-rest-api/cli/octopus-deployment-target-kubernetes-create)**:  Create a Kubernetes deployment target.
- **[octopus deployment-target kubernetes list](/docs/octopus-rest-api/cli/octopus-deployment-target-kubernetes-list)**:  List Kubernetes deployment targets.
- **[octopus deployment-target kubernetes view](/docs/octopus-rest-api/cli/octopus-deployment-target-kubernetes-view)**:  View a Kubernetes deployment target.
- **[octopus deployment-target list](/docs/octopus-rest-api/cli/octopus-deployment-target-list)**:  List deployment targets.
- **[octopus deployment-target listening-tentacle](/docs/octopus-rest-api/cli/octopus-deployment-target-listening-tentacle)**:  Manage Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle create](/docs/octopus-rest-api/cli/octopus-deployment-target-listening-tentacle-create)**:  Create a Listening Tentacle deployment target.
- **[octopus deployment-target listening-tentacle list](/docs/octopus-rest-api/cli/octopus-deployment-target-listening-tentacle-list)**:  List Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle view](/docs/octopus-rest-api/cli/octopus-deployment-target-listening-tentacle-view)**:  View a Listening Tentacle deployment target.
- **[octopus deployment-target polling-tentacle](/docs/octopus-rest-api/cli/octopus-deployment-target-polling-tentacle)**:  Manage Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle list](/docs/octopus-rest-api/cli/octopus-deployment-target-polling-tentacle-list)**:  List Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle view](/docs/octopus-rest-api/cli/octopus-deployment-target-polling-tentacle-view)**:  View a Polling Tentacle deployment target.
- **[octopus deployment-target ssh](/docs/octopus-rest-api/cli/octopus-deployment-target-ssh)**:  Manage SSH deployment targets.
- **[octopus deployment-target ssh create](/docs/octopus-rest-api/cli/octopus-deployment-target-ssh-create)**:  Create a SSH deployment target.
- **[octopus deployment-target ssh list](/docs/octopus-rest-api/cli/octopus-deployment-target-ssh-list)**:  List SSH deployment targets.
- **[octopus deployment-target ssh view](/docs/octopus-rest-api/cli/octopus-deployment-target-ssh-view)**:  View a SSH deployment target.
- **[octopus deployment-target view](/docs/octopus-rest-api/cli/octopus-deployment-target-view)**:  View a deployment target.
- **[octopus environment](/docs/octopus-rest-api/cli/octopus-environment)**:  Manage environments.
- **[octopus environment delete](/docs/octopus-rest-api/cli/octopus-environment-delete)**:  Delete an environment.
- **[octopus environment list](/docs/octopus-rest-api/cli/octopus-environment-list)**:  List environments.
- **[octopus login](/docs/octopus-rest-api/cli/octopus-login)**:  Login to Octopus.
- **[octopus logout](/docs/octopus-rest-api/cli/octopus-logout)**:  Logout of Octopus.
- **[octopus package](/docs/octopus-rest-api/cli/octopus-package)**:  Manage packages.
- **[octopus package list](/docs/octopus-rest-api/cli/octopus-package-list)**:  List packages.
- **[octopus package nuget](/docs/octopus-rest-api/cli/octopus-package-nuget)**:  Package as NuPkg.
- **[octopus package nuget create](/docs/octopus-rest-api/cli/octopus-package-nuget-create)**:  Create nuget.
- **[octopus package upload](/docs/octopus-rest-api/cli/octopus-package-upload)**:  upload one or more packages to Octopus Deploy.
- **[octopus package versions](/docs/octopus-rest-api/cli/octopus-package-versions)**:  List versions of a package.
- **[octopus package zip](/docs/octopus-rest-api/cli/octopus-package-zip)**:  Package as zip.
- **[octopus package zip create](/docs/octopus-rest-api/cli/octopus-package-zip-create)**:  Create zip.
- **[octopus project](/docs/octopus-rest-api/cli/octopus-project)**:  Manage projects.
- **[octopus project branch](/docs/octopus-rest-api/cli/octopus-project-branch)**:  Manage project branches.
- **[octopus project branch create](/docs/octopus-rest-api/cli/octopus-project-branch-create)**:  Create a Git branch for a project.
- **[octopus project branch list](/docs/octopus-rest-api/cli/octopus-project-branch-list)**:  List project branches.
- **[octopus project clone](/docs/octopus-rest-api/cli/octopus-project-clone)**:  Clone a project.
- **[octopus project connect](/docs/octopus-rest-api/cli/octopus-project-connect)**:  Connect a tenant to a project.
- **[octopus project convert](/docs/octopus-rest-api/cli/octopus-project-convert)**:  Convert a project to use Config As Code.
- **[octopus project create](/docs/octopus-rest-api/cli/octopus-project-create)**:  Create a project.
- **[octopus project delete](/docs/octopus-rest-api/cli/octopus-project-delete)**:  Delete a project.
- **[octopus project disconnect](/docs/octopus-rest-api/cli/octopus-project-disconnect)**:  Disconnect a tenant from a project.
- **[octopus project list](/docs/octopus-rest-api/cli/octopus-project-list)**:  List projects.
- **[octopus project variables](/docs/octopus-rest-api/cli/octopus-project-variables)**:  Manage project variables.
- **[octopus project variables create](/docs/octopus-rest-api/cli/octopus-project-variables-create)**:  Create a variable for a project.
- **[octopus project variables delete](/docs/octopus-rest-api/cli/octopus-project-variables-delete)**:  Delete a project variable.
- **[octopus project variables exclude](/docs/octopus-rest-api/cli/octopus-project-variables-exclude)**:  Exclude a variable set from a project.
- **[octopus project variables include](/docs/octopus-rest-api/cli/octopus-project-variables-include)**:  Include a variable set in a project.
- **[octopus project variables list](/docs/octopus-rest-api/cli/octopus-project-variables-list)**:  List project variables.
- **[octopus project variables update](/docs/octopus-rest-api/cli/octopus-project-variables-update)**:  Update the value of a project variable.
- **[octopus project variables view](/docs/octopus-rest-api/cli/octopus-project-variables-view)**:  View all values of a project variable.
- **[octopus project view](/docs/octopus-rest-api/cli/octopus-project-view)**:  View a project.
- **[octopus project-group](/docs/octopus-rest-api/cli/octopus-project-group)**:  Manage project groups.
- **[octopus project-group create](/docs/octopus-rest-api/cli/octopus-project-group-create)**:  Create a project group.
- **[octopus project-group delete](/docs/octopus-rest-api/cli/octopus-project-group-delete)**:  Delete a project group.
- **[octopus project-group list](/docs/octopus-rest-api/cli/octopus-project-group-list)**:  List project groups.
- **[octopus project-group view](/docs/octopus-rest-api/cli/octopus-project-group-view)**:  View a project group.
- **[octopus release](/docs/octopus-rest-api/cli/octopus-release)**:  Manage releases.
- **[octopus release create](/docs/octopus-rest-api/cli/octopus-release-create)**:  Create a release.
- **[octopus release delete](/docs/octopus-rest-api/cli/octopus-release-delete)**:  Delete a release.
- **[octopus release deploy](/docs/octopus-rest-api/cli/octopus-release-deploy)**:  Deploy releases.
- **[octopus release list](/docs/octopus-rest-api/cli/octopus-release-list)**:  List releases.
- **[octopus runbook](/docs/octopus-rest-api/cli/octopus-runbook)**:  Manage runbooks.
- **[octopus runbook list](/docs/octopus-rest-api/cli/octopus-runbook-list)**:  List runbooks.
- **[octopus runbook run](/docs/octopus-rest-api/cli/octopus-runbook-run)**:  Run runbooks in Octopus Deploy.
- **[octopus space](/docs/octopus-rest-api/cli/octopus-space)**:  Manage spaces.
- **[octopus space create](/docs/octopus-rest-api/cli/octopus-space-create)**:  Create a space.
- **[octopus space delete](/docs/octopus-rest-api/cli/octopus-space-delete)**:  Delete a space.
- **[octopus space list](/docs/octopus-rest-api/cli/octopus-space-list)**:  List spaces.
- **[octopus space view](/docs/octopus-rest-api/cli/octopus-space-view)**:  View a space.
- **[octopus task](/docs/octopus-rest-api/cli/octopus-task)**:  Manage tasks.
- **[octopus task wait](/docs/octopus-rest-api/cli/octopus-task-wait)**:  Wait for task(s) to finish.
- **[octopus tenant](/docs/octopus-rest-api/cli/octopus-tenant)**:  Manage tenants.
- **[octopus tenant clone](/docs/octopus-rest-api/cli/octopus-tenant-clone)**:  Clone a tenant.
- **[octopus tenant connect](/docs/octopus-rest-api/cli/octopus-tenant-connect)**:  Connect a tenant to a project.
- **[octopus tenant create](/docs/octopus-rest-api/cli/octopus-tenant-create)**:  Create a tenant.
- **[octopus tenant delete](/docs/octopus-rest-api/cli/octopus-tenant-delete)**:  Delete a tenant.
- **[octopus tenant disconnect](/docs/octopus-rest-api/cli/octopus-tenant-disconnect)**:  Disconnect a tenant from a project.
- **[octopus tenant list](/docs/octopus-rest-api/cli/octopus-tenant-list)**:  List tenants.
- **[octopus tenant tag](/docs/octopus-rest-api/cli/octopus-tenant-tag)**:  Override tags for a tenant.
- **[octopus tenant variables](/docs/octopus-rest-api/cli/octopus-tenant-variables)**:  Manage tenant variables.
- **[octopus tenant variables list](/docs/octopus-rest-api/cli/octopus-tenant-variables-list)**:  List tenant variables.
- **[octopus tenant variables update](/docs/octopus-rest-api/cli/octopus-tenant-variables-update)**:  Update the value of a tenant variable.
- **[octopus tenant view](/docs/octopus-rest-api/cli/octopus-tenant-view)**:  View a tenant.
- **[octopus user](/docs/octopus-rest-api/cli/octopus-user)**:  Manage users.
- **[octopus user delete](/docs/octopus-rest-api/cli/octopus-user-delete)**:  Delete a user.
- **[octopus user list](/docs/octopus-rest-api/cli/octopus-user-list)**:  List users.
- **[octopus worker](/docs/octopus-rest-api/cli/octopus-worker)**:  Manage workers.
- **[octopus worker delete](/docs/octopus-rest-api/cli/octopus-worker-delete)**:  Delete a worker.
- **[octopus worker list](/docs/octopus-rest-api/cli/octopus-worker-list)**:  List workers.
- **[octopus worker listening-tentacle](/docs/octopus-rest-api/cli/octopus-worker-listening-tentacle)**:  Manage Listening Tentacle workers.
- **[octopus worker listening-tentacle create](/docs/octopus-rest-api/cli/octopus-worker-listening-tentacle-create)**:  Create a listening tentacle worker.
- **[octopus worker listening-tentacle list](/docs/octopus-rest-api/cli/octopus-worker-listening-tentacle-list)**:  List Listening Tentacle workers.
- **[octopus worker listening-tentacle view](/docs/octopus-rest-api/cli/octopus-worker-listening-tentacle-view)**:  View a Listening Tentacle worker.
- **[octopus worker polling-tentacle](/docs/octopus-rest-api/cli/octopus-worker-polling-tentacle)**:  Manage Polling Tentacle workers.
- **[octopus worker polling-tentacle list](/docs/octopus-rest-api/cli/octopus-worker-polling-tentacle-list)**:  List Polling Tentacle workers.
- **[octopus worker polling-tentacle view](/docs/octopus-rest-api/cli/octopus-worker-polling-tentacle-view)**:  View a Polling Tentacle worker.
- **[octopus worker ssh](/docs/octopus-rest-api/cli/octopus-worker-ssh)**:  Manage SSH workers.
- **[octopus worker ssh create](/docs/octopus-rest-api/cli/octopus-worker-ssh-create)**:  Create a SSH worker.
- **[octopus worker ssh list](/docs/octopus-rest-api/cli/octopus-worker-ssh-list)**:  List SSH workers.
- **[octopus worker ssh view](/docs/octopus-rest-api/cli/octopus-worker-ssh-view)**:  View a SSH worker.
- **[octopus worker view](/docs/octopus-rest-api/cli/octopus-worker-view)**:  View a worker.
- **[octopus worker-pool](/docs/octopus-rest-api/cli/octopus-worker-pool)**:  Manage worker pools.
- **[octopus worker-pool delete](/docs/octopus-rest-api/cli/octopus-worker-pool-delete)**:  Delete a worker pool.
- **[octopus worker-pool dynamic](/docs/octopus-rest-api/cli/octopus-worker-pool-dynamic)**:  Manage dynamic worker pools.
- **[octopus worker-pool dynamic create](/docs/octopus-rest-api/cli/octopus-worker-pool-dynamic-create)**:  Create a dynamic worker pool.
- **[octopus worker-pool dynamic view](/docs/octopus-rest-api/cli/octopus-worker-pool-dynamic-view)**:  View a dynamic worker pool.
- **[octopus worker-pool list](/docs/octopus-rest-api/cli/octopus-worker-pool-list)**:  List worker pools.
- **[octopus worker-pool static](/docs/octopus-rest-api/cli/octopus-worker-pool-static)**:  Manage static worker pools.
- **[octopus worker-pool static create](/docs/octopus-rest-api/cli/octopus-worker-pool-static-create)**:  Create a static worker pool.
- **[octopus worker-pool static view](/docs/octopus-rest-api/cli/octopus-worker-pool-static-view)**:  View a static worker pool.
- **[octopus worker-pool view](/docs/octopus-rest-api/cli/octopus-worker-pool-view)**:  View a worker pool.