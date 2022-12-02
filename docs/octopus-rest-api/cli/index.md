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
- **[octopus account](octopus_account.md)**:  Manage accounts.
- **[octopus account aws](octopus_account_aws.md)**:  Manage AWS accounts.
- **[octopus account aws create](octopus_account_aws_create.md)**:  Create an AWS account.
- **[octopus account aws list](octopus_account_aws_list.md)**:  List AWS accounts.
- **[octopus account azure](octopus_account_azure.md)**:  Manage Azure subscription accounts.
- **[octopus account azure create](octopus_account_azure_create.md)**:  Create an Azure subscription account.
- **[octopus account azure list](octopus_account_azure_list.md)**:  List Azure subscription accounts.
- **[octopus account create](octopus_account_create.md)**:  Create an account.
- **[octopus account delete](octopus_account_delete.md)**:  Delete an account.
- **[octopus account gcp](octopus_account_gcp.md)**:  Manage Google Cloud accounts.
- **[octopus account gcp create](octopus_account_gcp_create.md)**:  Create a Google Cloud account.
- **[octopus account gcp list](octopus_account_gcp_list.md)**:  List Google Cloud accounts.
- **[octopus account list](octopus_account_list.md)**:  List accounts.
- **[octopus account ssh](octopus_account_ssh.md)**:  Manage SSH Key Pair accounts.
- **[octopus account ssh create](octopus_account_ssh_create.md)**:  Create a SSH Key Pair account.
- **[octopus account ssh list](octopus_account_ssh_list.md)**:  List SSH Key Pair accounts.
- **[octopus account token](octopus_account_token.md)**:  Manage Token accounts.
- **[octopus account token create](octopus_account_token_create.md)**:  Create a Token account.
- **[octopus account token list](octopus_account_token_list.md)**:  List Token accounts.
- **[octopus account username](octopus_account_username.md)**:  Manage Username/Password accounts.
- **[octopus account username create](octopus_account_username_create.md)**:  Create a Username/Password account.
- **[octopus account username list](octopus_account_username_list.md)**:  List Username/Password accounts.
- **[octopus config](octopus_config.md)**:  Manage CLI configuration.
- **[octopus config get](octopus_config_get.md)**:  Gets the value of config key for Octopus CLI.
- **[octopus config list](octopus_config_list.md)**:  List values from config file.
- **[octopus config set](octopus_config_set.md)**:  Set will write the value for given key to Octopus CLI config file.
- **[octopus deployment-target](octopus_deployment-target.md)**:  Manage deployment targets.
- **[octopus deployment-target azure-web-app](octopus_deployment-target_azure-web-app.md)**:  Manage Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app create](octopus_deployment-target_azure-web-app_create.md)**:  Create an Azure Web App deployment target.
- **[octopus deployment-target azure-web-app list](octopus_deployment-target_azure-web-app_list.md)**:  List Azure Web App deployment targets.
- **[octopus deployment-target azure-web-app view](octopus_deployment-target_azure-web-app_view.md)**:  View an Azure Web App deployment target.
- **[octopus deployment-target cloud-region](octopus_deployment-target_cloud-region.md)**:  Manage Cloud Region deployment targets.
- **[octopus deployment-target cloud-region create](octopus_deployment-target_cloud-region_create.md)**:  Create a Cloud Region deployment target.
- **[octopus deployment-target cloud-region list](octopus_deployment-target_cloud-region_list.md)**:  List Cloud Region deployment targets.
- **[octopus deployment-target cloud-region view](octopus_deployment-target_cloud-region_view.md)**:  View a Cloud Region deployment target.
- **[octopus deployment-target delete](octopus_deployment-target_delete.md)**:  Delete a deployment target.
- **[octopus deployment-target delete](octopus_deployment-target_delete.md)**:  Delete a deployment target.
- **[octopus deployment-target list](octopus_deployment-target_list.md)**:  List deployment targets.
- **[octopus deployment-target listening-tentacle](octopus_deployment-target_listening-tentacle.md)**:  Manage Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle create](octopus_deployment-target_listening-tentacle_create.md)**:  Create a Listening Tentacle deployment target.
- **[octopus deployment-target listening-tentacle list](octopus_deployment-target_listening-tentacle_list.md)**:  List Listening Tentacle deployment targets.
- **[octopus deployment-target listening-tentacle view](octopus_deployment-target_listening-tentacle_view.md)**:  View a Listening Tentacle deployment target.
- **[octopus deployment-target polling-tentacle](octopus_deployment-target_polling-tentacle.md)**:  Manage Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle list](octopus_deployment-target_polling-tentacle_list.md)**:  List Polling Tentacle deployment targets.
- **[octopus deployment-target polling-tentacle view](octopus_deployment-target_polling-tentacle_view.md)**:  View a Polling Tentacle deployment target.
- **[octopus deployment-target ssh](octopus_deployment-target_ssh.md)**:  Manage SSH deployment targets.
- **[octopus deployment-target ssh create](octopus_deployment-target_ssh_create.md)**:  Create a SSH deployment target.
- **[octopus deployment-target ssh list](octopus_deployment-target_ssh_list.md)**:  List SSH deployment targets.
- **[octopus deployment-target ssh view](octopus_deployment-target_ssh_view.md)**:  View a SSH deployment target.
- **[octopus deployment-target view](octopus_deployment-target_view.md)**:  View a deployment target.
- **[octopus environment](octopus_environment.md)**:  Manage environments.
- **[octopus environment delete](octopus_environment_delete.md)**:  Delete an environment.
- **[octopus environment list](octopus_environment_list.md)**:  List environments.
- **[octopus package](octopus_package.md)**:  Manage packages.
- **[octopus package list](octopus_package_list.md)**:  List packages.
- **[octopus package upload](octopus_package_upload.md)**:  upload one or more packages to Octopus Deploy.
- **[octopus package versions](octopus_package_versions.md)**:  List versions of a package.
- **[octopus project](octopus_project.md)**:  Manage projects.
- **[octopus project connect](octopus_project_connect.md)**:  Connect a tenant to a project.
- **[octopus project create](octopus_project_create.md)**:  Create a project.
- **[octopus project delete](octopus_project_delete.md)**:  Delete a project.
- **[octopus project disconnect](octopus_project_disconnect.md)**:  Disconnect a tenant from a project.
- **[octopus project list](octopus_project_list.md)**:  List projects.
- **[octopus project view](octopus_project_view.md)**:  View a project.
- **[octopus project-group](octopus_project-group.md)**:  Manage project groups.
- **[octopus project-group create](octopus_project-group_create.md)**:  Create a project group.
- **[octopus project-group delete](octopus_project-group_delete.md)**:  Delete a project group.
- **[octopus project-group list](octopus_project-group_list.md)**:  List project groups.
- **[octopus project-group view](octopus_project-group_view.md)**:  View a project group.
- **[octopus release](octopus_release.md)**:  Manage releases.
- **[octopus release create](octopus_release_create.md)**:  Create a release.
- **[octopus release delete](octopus_release_delete.md)**:  Delete a release.
- **[octopus release deploy](octopus_release_deploy.md)**:  Deploy releases.
- **[octopus release list](octopus_release_list.md)**:  List releases.
- **[octopus runbook](octopus_runbook.md)**:  Manage runbooks.
- **[octopus runbook list](octopus_runbook_list.md)**:  List runbooks.
- **[octopus runbook run](octopus_runbook_run.md)**:  Run runbooks in Octopus Deploy.
- **[octopus space](octopus_space.md)**:  Manage spaces.
- **[octopus space create](octopus_space_create.md)**:  Create a space.
- **[octopus space delete](octopus_space_delete.md)**:  Delete a space.
- **[octopus space list](octopus_space_list.md)**:  List spaces.
- **[octopus space view](octopus_space_view.md)**:  View a space.
- **[octopus task](octopus_task.md)**:  Manage tasks.
- **[octopus task wait](octopus_task_wait.md)**:  Wait for task(s) to finish.
- **[octopus tenant](octopus_tenant.md)**:  Manage tenants.
- **[octopus tenant connect](octopus_tenant_connect.md)**:  Connect a tenant to a project.
- **[octopus tenant create](octopus_tenant_create.md)**:  Create a tenant.
- **[octopus tenant delete](octopus_tenant_delete.md)**:  Delete a tenant.
- **[octopus tenant disconnect](octopus_tenant_disconnect.md)**:  Disconnect a tenant from a project.
- **[octopus tenant list](octopus_tenant_list.md)**:  List tenants.
- **[octopus tenant tag](octopus_tenant_tag.md)**:  Override tags for a tenant.
- **[octopus tenant view](octopus_tenant_view.md)**:  View a tenant.
- **[octopus worker](octopus_worker.md)**:  Manage workers.
- **[octopus worker delete](octopus_worker_delete.md)**:  Delete a worker.
- **[octopus worker list](octopus_worker_list.md)**:  List workers.
- **[octopus worker listening-tentacle](octopus_worker_listening-tentacle.md)**:  Manage Listening Tentacle workers.
- **[octopus worker listening-tentacle create](octopus_worker_listening-tentacle_create.md)**:  Create a listening tentacle worker.
- **[octopus worker listening-tentacle list](octopus_worker_listening-tentacle_list.md)**:  List Listening Tentacle workers.
- **[octopus worker listening-tentacle view](octopus_worker_listening-tentacle_view.md)**:  View a Listening Tentacle worker.
- **[octopus worker polling-tentacle](octopus_worker_polling-tentacle.md)**:  Manage Polling Tentacle workers.
- **[octopus worker polling-tentacle list](octopus_worker_polling-tentacle_list.md)**:  List Polling Tentacle workers.
- **[octopus worker polling-tentacle view](octopus_worker_polling-tentacle_view.md)**:  View a Polling Tentacle worker.
- **[octopus worker ssh](octopus_worker_ssh.md)**:  Manage SSH workers.
- **[octopus worker ssh create](octopus_worker_ssh_create.md)**:  Create a SSH worker.
- **[octopus worker ssh list](octopus_worker_ssh_list.md)**:  List SSH workers.
- **[octopus worker ssh view](octopus_worker_ssh_view.md)**:  View a SSH worker.
- **[octopus worker view](octopus_worker_view.md)**:  View a worker.
- **[octopus worker-pool](octopus_worker-pool.md)**:  Manage worker pools.
- **[octopus worker-pool dynamic](octopus_worker-pool_dynamic.md)**:  Manage dynamic worker pools.
- **[octopus worker-pool dynamic view](octopus_worker-pool_dynamic_view.md)**:  View a dynamic worker pool.
- **[octopus worker-pool list](octopus_worker-pool_list.md)**:  List worker pools.
- **[octopus worker-pool static](octopus_worker-pool_static.md)**:  Manage static worker pools.
- **[octopus worker-pool static view](octopus_worker-pool_static_view.md)**:  View a static worker pool.
- **[octopus worker-pool view](octopus_worker-pool_view.md)**:  View a worker pool.