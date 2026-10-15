---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-10-08
title: Default permissions for built-in user roles
description: A listing of the default permissions for each of the built-in user roles.
---

:::div{.success}
For more information regarding the *system or space level*, please see [system and space permissions](/docs/security/users-and-teams/system-and-space-permissions).
:::

## Build Server {#DefaultPermissions-BuildServer}

| Space Permission           | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| BuildInformationAdminister | Replace or delete build information                                  |
| BuildInformationPush       | Create/update build information                                      |
| BuiltInFeedAdminister      | Replace or delete packages in the built-in package repository        |
| BuiltInFeedDownload        | Retrieve the contents of packages in the built-in package repository |
| BuiltInFeedPush            | Push new packages to the built-in package repository                 |
| DeploymentCreate           | Deploy releases to target environments                               |
| DeploymentView             | View deployments                                                     |
| EnvironmentView            | View environments                                                    |
| FeedView                   | View package feeds and the packages in them                          |
| InsightsReportView         | View Insights reports                                                |
| LibraryVariableSetView     | View library variable sets                                           |
| LifecycleView              | View lifecycles                                                      |
| ProcessView                | View the deployment process and channels associated with a project   |
| ProjectView                | View the details of projects                                         |
| ReleaseCreate              | Create a release for a project                                       |
| ReleaseView                | View a release of a project                                          |
| RunbookRunCreate           | Create runbook runs                                                  |
| RunbookRunView             | View runbook runs                                                    |
| RunbookSnapshotCreate      | Create runbook snapshots                                             |
| RunbookView                | View runbooks                                                        |
| TargetTagView              | View deployment target tags                                          |
| TaskPrioritize             | Create deployments that are prioritized                              |
| TaskView                   | View summary-level information associated with a task                |
| TenantView                 | View tenants                                                         |

## Certificate Manager {#DefaultPermissions-CertificateManager}

| Space Permission            | Description                     |
| --------------------------- | ------------------------------- |
| CertificateCreate           | Create certificates             |
| CertificateDelete           | Delete certificates             |
| CertificateEdit             | Edit certificates               |
| CertificateExportPrivateKey | Export certificate private-keys |
| CertificateView             | View certificates               |
| EnvironmentView             | View environments               |
| TenantView                  | View tenants                    |

## Deployment Creator {#DefaultPermissions-DeploymentCreator}

| Space Permission       | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| DeploymentCreate       | Deploy releases to target environments                             |
| DeploymentView         | View deployments                                                   |
| EnvironmentView        | View environments                                                  |
| InsightsReportView     | View Insights reports                                              |
| LibraryVariableSetView | View library variable sets                                         |
| LifecycleView          | View lifecycles                                                    |
| ProcessView            | View the deployment process and channels associated with a project |
| ProjectView            | View the details of projects                                       |
| ReleaseView            | View a release of a project                                        |
| RunbookRunCreate       | Create runbook runs                                                |
| RunbookRunView         | View runbook runs                                                  |
| RunbookView            | View runbooks                                                      |
| TargetTagView          | View deployment target tags                                        |
| TaskView               | View summary-level information associated with a task              |
| TenantView             | View tenants                                                       |

## Environment Manager {#DefaultPermissions-EnvironmentManager}

| System Permission | Description |
| ----------------- | ----------- |
| TeamView          | View teams  |

| Space Permission       | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| AccountCreate          | Create accounts                                       |
| AccountDelete          | Delete accounts                                       |
| AccountEdit            | Edit accounts                                         |
| AccountView            | View accounts                                         |
| ApprovalRuleAdminister | Create, edit, delete Approval Rules                   |
| CertificateView        | View certificates                                     |
| EnvironmentCreate      | Create environments                                   |
| EnvironmentDelete      | Delete environments                                   |
| EnvironmentEdit        | Edit environments                                     |
| EnvironmentView        | View environments                                     |
| MachineCreate          | Create machines                                       |
| MachineDelete          | Delete machines                                       |
| MachineEdit            | Edit machines                                         |
| MachinePolicyCreate    | Create health check policies                          |
| MachinePolicyDelete    | Delete health check policies                          |
| MachinePolicyEdit      | Edit health check policies                            |
| MachinePolicyView      | View health check policies                            |
| MachineView            | View machines                                         |
| ProxyCreate            | Create proxies                                        |
| ProxyDelete            | Delete proxies                                        |
| ProxyEdit              | Edit proxies                                          |
| ProxyView              | View proxies                                          |
| TargetTagAdminister    | Create, edit, delete deployment target tags           |
| TargetTagView          | View deployment target tags                           |
| TaskCancel             | Cancel server tasks                                   |
| TaskCreate             | Explicitly create (run) server tasks                  |
| TaskView               | View summary-level information associated with a task |
| TeamView               | View teams                                            |
| WorkerEdit             | Edit workers and worker pools                         |
| WorkerView             | View the workers in worker pools                      |

## Environment Viewer {#DefaultPermissions-EnvironmentViewer}

| System Permission | Description |
| ----------------- | ----------- |
| TeamView          | View teams  |

| Space Permission  | Description                                           |
| ----------------- | ----------------------------------------------------- |
| AccountView       | View accounts                                         |
| CertificateView   | View certificates                                     |
| EnvironmentView   | View environments                                     |
| MachinePolicyView | View health check policies                            |
| MachineView       | View machines                                         |
| ProxyView         | View proxies                                          |
| TargetTagView     | View deployment target tags                           |
| TaskView          | View summary-level information associated with a task |
| TeamView          | View teams                                            |
| WorkerView        | View the workers in worker pools                      |

## Feature Toggle Editor {#DefaultPermissions-FeatureToggleEditor}

| Space Permission  | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| EnvironmentView   | View environments                                                  |
| FeatureToggleEdit | Create, edit, delete feature toggles                               |
| ProcessView       | View the deployment process and channels associated with a project |
| ProjectGroupView  | View project groups                                                |
| ProjectView       | View the details of projects                                       |
| TenantView        | View tenants                                                       |

## Insights Report Manager {#DefaultPermissions-InsightsReportManager}

| Space Permission     | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| EnvironmentView      | View environments                                                  |
| InsightsReportCreate | Create Insights reports                                            |
| InsightsReportDelete | Delete Insights reports                                            |
| InsightsReportEdit   | Edit Insights reports                                              |
| InsightsReportView   | View Insights reports                                              |
| ProcessView          | View the deployment process and channels associated with a project |
| ProjectGroupView     | View project groups                                                |
| ProjectView          | View the details of projects                                       |
| TargetTagView        | View deployment target tags                                        |
| TenantView           | View tenants                                                       |

## Package Publisher {#DefaultPermissions-PackagePublisher}

| Space Permission           | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| BuildInformationAdminister | Replace or delete build information                                  |
| BuildInformationPush       | Create/update build information                                      |
| BuiltInFeedAdminister      | Replace or delete packages in the built-in package repository        |
| BuiltInFeedDownload        | Retrieve the contents of packages in the built-in package repository |
| BuiltInFeedPush            | Push new packages to the built-in package repository                 |
| FeedView                   | View package feeds and the packages in them                          |

## Project Contributor {#DefaultPermissions-ProjectContributor}

| System Permission | Description             |
| ----------------- | ----------------------- |
| SshKnownHostsView | View SSH known hosts    |
| TeamView          | View teams              |
| UserRoleView      | View other user's roles |
| UserView          | View users              |

| Space Permission                  | Description                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AccountView                       | View accounts                                                                                                                   |
| ActionTemplateCreate              | Create step templates                                                                                                           |
| ActionTemplateDelete              | Delete step templates                                                                                                           |
| ActionTemplateEdit                | Edit step templates                                                                                                             |
| ActionTemplateView                | View step templates                                                                                                             |
| ArtifactCreate                    | Manually create artifacts                                                                                                       |
| ArtifactView                      | View the artifacts created manually and during deployment                                                                       |
| CertificateView                   | View certificates                                                                                                               |
| DefectReport                      | Block a release from progressing to the next lifecycle phase                                                                    |
| DefectResolve                     | Unblock a release so it can progress to the next phase                                                                          |
| DeployedResourceAdminister        | Administer deployed resources managed by Octopus                                                                                |
| DeploymentView                    | View deployments                                                                                                                |
| EnvironmentView                   | View environments                                                                                                               |
| EventView                         | View Events, including access to the Audit screen                                                                               |
| FeatureToggleEdit                 | Create, edit, delete feature toggles                                                                                            |
| FeedView                          | View package feeds and the packages in them                                                                                     |
| GitCredentialView                 | View Git credentials                                                                                                            |
| InsightsReportEdit                | Edit Insights reports                                                                                                           |
| InsightsReportView                | View Insights reports                                                                                                           |
| InterruptionView                  | View interruptions generated during deployments                                                                                 |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| LibraryVariableSetCreate          | Create library variable sets                                                                                                    |
| LibraryVariableSetDelete          | Delete library variable sets                                                                                                    |
| LibraryVariableSetEdit            | Edit library variable sets                                                                                                      |
| LibraryVariableSetView            | View library variable sets                                                                                                      |
| LifecycleView                     | View lifecycles                                                                                                                 |
| MachinePolicyView                 | View health check policies                                                                                                      |
| MachineView                       | View machines                                                                                                                   |
| ProcessEdit                       | Edit the deployment process and channels associated with a project                                                              |
| ProcessView                       | View the deployment process and channels associated with a project                                                              |
| ProjectEdit                       | Edit project details                                                                                                            |
| ProjectGroupView                  | View project groups                                                                                                             |
| ProjectView                       | View the details of projects                                                                                                    |
| ReleaseView                       | View a release of a project                                                                                                     |
| RunbookEdit                       | Edit runbooks                                                                                                                   |
| RunbookRunView                    | View runbook runs                                                                                                               |
| RunbookSnapshotCreate             | Create runbook snapshots                                                                                                        |
| RunbookView                       | View runbooks                                                                                                                   |
| TargetTagAdminister               | Create, edit, delete deployment target tags                                                                                     |
| TargetTagView                     | View deployment target tags                                                                                                     |
| TaskCreate                        | Explicitly create (run) server tasks                                                                                            |
| TaskView                          | View summary-level information associated with a task                                                                           |
| TeamView                          | View teams                                                                                                                      |
| TenantView                        | View tenants                                                                                                                    |
| TriggerCreate                     | Create triggers                                                                                                                 |
| TriggerDelete                     | Delete triggers                                                                                                                 |
| TriggerEdit                       | Edit triggers                                                                                                                   |
| TriggerView                       | View triggers                                                                                                                   |
| VariableEdit                      | Edit variables belonging to a project                                                                                           |
| VariableView                      | View variables belonging to a project or library variable set                                                                   |

## Project Deployer {#DefaultPermissions-ProjectDeployer}

| System Permission | Description             |
| ----------------- | ----------------------- |
| SshKnownHostsView | View SSH known hosts    |
| TeamView          | View teams              |
| UserRoleView      | View other user's roles |
| UserView          | View users              |

| Space Permission                  | Description                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AccountView                       | View accounts                                                                                                                   |
| ActionTemplateCreate              | Create step templates                                                                                                           |
| ActionTemplateDelete              | Delete step templates                                                                                                           |
| ActionTemplateEdit                | Edit step templates                                                                                                             |
| ActionTemplateView                | View step templates                                                                                                             |
| ArtifactCreate                    | Manually create artifacts                                                                                                       |
| ArtifactView                      | View the artifacts created manually and during deployment                                                                       |
| CertificateView                   | View certificates                                                                                                               |
| DefectReport                      | Block a release from progressing to the next lifecycle phase                                                                    |
| DefectResolve                     | Unblock a release so it can progress to the next phase                                                                          |
| DeployedResourceAdminister        | Administer deployed resources managed by Octopus                                                                                |
| DeploymentCreate                  | Deploy releases to target environments                                                                                          |
| DeploymentView                    | View deployments                                                                                                                |
| EnvironmentView                   | View environments                                                                                                               |
| EventView                         | View Events, including access to the Audit screen                                                                               |
| FeatureToggleEdit                 | Create, edit, delete feature toggles                                                                                            |
| FeedView                          | View package feeds and the packages in them                                                                                     |
| GitCredentialView                 | View Git credentials                                                                                                            |
| InsightsReportEdit                | Edit Insights reports                                                                                                           |
| InsightsReportView                | View Insights reports                                                                                                           |
| InterruptionSubmit                | Take responsibility for and submit interruptions generated during deployments                                                   |
| InterruptionView                  | View interruptions generated during deployments                                                                                 |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| LibraryVariableSetCreate          | Create library variable sets                                                                                                    |
| LibraryVariableSetDelete          | Delete library variable sets                                                                                                    |
| LibraryVariableSetEdit            | Edit library variable sets                                                                                                      |
| LibraryVariableSetView            | View library variable sets                                                                                                      |
| LifecycleView                     | View lifecycles                                                                                                                 |
| MachinePolicyView                 | View health check policies                                                                                                      |
| MachineView                       | View machines                                                                                                                   |
| ProcessEdit                       | Edit the deployment process and channels associated with a project                                                              |
| ProcessView                       | View the deployment process and channels associated with a project                                                              |
| ProjectEdit                       | Edit project details                                                                                                            |
| ProjectGroupView                  | View project groups                                                                                                             |
| ProjectView                       | View the details of projects                                                                                                    |
| ReleaseView                       | View a release of a project                                                                                                     |
| RunbookEdit                       | Edit runbooks                                                                                                                   |
| RunbookRunCreate                  | Create runbook runs                                                                                                             |
| RunbookRunView                    | View runbook runs                                                                                                               |
| RunbookSnapshotCreate             | Create runbook snapshots                                                                                                        |
| RunbookView                       | View runbooks                                                                                                                   |
| TargetTagAdminister               | Create, edit, delete deployment target tags                                                                                     |
| TargetTagView                     | View deployment target tags                                                                                                     |
| TaskCancel                        | Cancel server tasks                                                                                                             |
| TaskCreate                        | Explicitly create (run) server tasks                                                                                            |
| TaskView                          | View summary-level information associated with a task                                                                           |
| TeamView                          | View teams                                                                                                                      |
| TenantView                        | View tenants                                                                                                                    |
| TriggerCreate                     | Create triggers                                                                                                                 |
| TriggerDelete                     | Delete triggers                                                                                                                 |
| TriggerEdit                       | Edit triggers                                                                                                                   |
| TriggerView                       | View triggers                                                                                                                   |
| VariableEdit                      | Edit variables belonging to a project                                                                                           |
| VariableView                      | View variables belonging to a project or library variable set                                                                   |

## Project Initiator {#DefaultPermissions-ProjectInitiator}

| System Permission | Description             |
| ----------------- | ----------------------- |
| SshKnownHostsView | View SSH known hosts    |
| TeamView          | View teams              |
| UserRoleView      | View other user's roles |
| UserView          | View users              |

| Space Permission       | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| AccountView            | View accounts                                                      |
| ActionTemplateView     | View step templates                                                |
| ArtifactView           | View the artifacts created manually and during deployment          |
| CertificateView        | View certificates                                                  |
| DefectReport           | Block a release from progressing to the next lifecycle phase       |
| DefectResolve          | Unblock a release so it can progress to the next phase             |
| DeploymentView         | View deployments                                                   |
| EnvironmentView        | View environments                                                  |
| EventView              | View Events, including access to the Audit screen                  |
| FeedView               | View package feeds and the packages in them                        |
| GitCredentialView      | View Git credentials                                               |
| InsightsReportCreate   | Create Insights reports                                            |
| InsightsReportDelete   | Delete Insights reports                                            |
| InsightsReportEdit     | Edit Insights reports                                              |
| InsightsReportView     | View Insights reports                                              |
| InterruptionView       | View interruptions generated during deployments                    |
| LibraryVariableSetView | View library variable sets                                         |
| LifecycleView          | View lifecycles                                                    |
| MachinePolicyView      | View health check policies                                         |
| ProcessView            | View the deployment process and channels associated with a project |
| ProjectCreate          | Create projects                                                    |
| ProjectDelete          | Delete projects                                                    |
| ProjectEdit            | Edit project details                                               |
| ProjectGroupView       | View project groups                                                |
| ProjectView            | View the details of projects                                       |
| ReleaseView            | View a release of a project                                        |
| RunbookRunView         | View runbook runs                                                  |
| RunbookView            | View runbooks                                                      |
| TargetTagView          | View deployment target tags                                        |
| TaskView               | View summary-level information associated with a task              |
| TeamView               | View teams                                                         |
| TenantView             | View tenants                                                       |
| TriggerView            | View triggers                                                      |

## Project Lead {#DefaultPermissions-ProjectLead}

| System Permission | Description             |
| ----------------- | ----------------------- |
| SshKnownHostsView | View SSH known hosts    |
| TeamView          | View teams              |
| UserRoleView      | View other user's roles |
| UserView          | View users              |

| Space Permission                  | Description                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AccountView                       | View accounts                                                                                                                   |
| ActionTemplateCreate              | Create step templates                                                                                                           |
| ActionTemplateDelete              | Delete step templates                                                                                                           |
| ActionTemplateEdit                | Edit step templates                                                                                                             |
| ActionTemplateView                | View step templates                                                                                                             |
| ArtifactCreate                    | Manually create artifacts                                                                                                       |
| ArtifactDelete                    | Delete artifacts                                                                                                                |
| ArtifactEdit                      | Edit the details describing artifacts                                                                                           |
| ArtifactView                      | View the artifacts created manually and during deployment                                                                       |
| CertificateView                   | View certificates                                                                                                               |
| DefectReport                      | Block a release from progressing to the next lifecycle phase                                                                    |
| DefectResolve                     | Unblock a release so it can progress to the next phase                                                                          |
| DeployedResourceAdminister        | Administer deployed resources managed by Octopus                                                                                |
| DeploymentView                    | View deployments                                                                                                                |
| EnvironmentView                   | View environments                                                                                                               |
| EventView                         | View Events, including access to the Audit screen                                                                               |
| FeatureToggleEdit                 | Create, edit, delete feature toggles                                                                                            |
| FeedView                          | View package feeds and the packages in them                                                                                     |
| GitCredentialView                 | View Git credentials                                                                                                            |
| InsightsReportEdit                | Edit Insights reports                                                                                                           |
| InsightsReportView                | View Insights reports                                                                                                           |
| InterruptionView                  | View interruptions generated during deployments                                                                                 |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| LibraryVariableSetCreate          | Create library variable sets                                                                                                    |
| LibraryVariableSetDelete          | Delete library variable sets                                                                                                    |
| LibraryVariableSetEdit            | Edit library variable sets                                                                                                      |
| LibraryVariableSetView            | View library variable sets                                                                                                      |
| LifecycleView                     | View lifecycles                                                                                                                 |
| MachinePolicyView                 | View health check policies                                                                                                      |
| MachineView                       | View machines                                                                                                                   |
| ProcessEdit                       | Edit the deployment process and channels associated with a project                                                              |
| ProcessView                       | View the deployment process and channels associated with a project                                                              |
| ProjectEdit                       | Edit project details                                                                                                            |
| ProjectGroupView                  | View project groups                                                                                                             |
| ProjectView                       | View the details of projects                                                                                                    |
| ReleaseCreate                     | Create a release for a project                                                                                                  |
| ReleaseDelete                     | Delete a release of a project                                                                                                   |
| ReleaseEdit                       | Edit a release of a project                                                                                                     |
| ReleaseView                       | View a release of a project                                                                                                     |
| RunbookEdit                       | Edit runbooks                                                                                                                   |
| RunbookRunView                    | View runbook runs                                                                                                               |
| RunbookSnapshotCreate             | Create runbook snapshots                                                                                                        |
| RunbookView                       | View runbooks                                                                                                                   |
| TargetTagAdminister               | Create, edit, delete deployment target tags                                                                                     |
| TargetTagView                     | View deployment target tags                                                                                                     |
| TaskCreate                        | Explicitly create (run) server tasks                                                                                            |
| TaskView                          | View summary-level information associated with a task                                                                           |
| TeamView                          | View teams                                                                                                                      |
| TenantView                        | View tenants                                                                                                                    |
| TriggerCreate                     | Create triggers                                                                                                                 |
| TriggerDelete                     | Delete triggers                                                                                                                 |
| TriggerEdit                       | Edit triggers                                                                                                                   |
| TriggerView                       | View triggers                                                                                                                   |
| VariableEdit                      | Edit variables belonging to a project                                                                                           |
| VariableView                      | View variables belonging to a project or library variable set                                                                   |

## Project Viewer {#DefaultPermissions-ProjectViewer}

| System Permission | Description             |
| ----------------- | ----------------------- |
| TeamView          | View teams              |
| UserRoleView      | View other user's roles |
| UserView          | View users              |

| Space Permission       | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| AccountView            | View accounts                                                      |
| ActionTemplateView     | View step templates                                                |
| ArtifactView           | View the artifacts created manually and during deployment          |
| CertificateView        | View certificates                                                  |
| DeploymentView         | View deployments                                                   |
| EnvironmentView        | View environments                                                  |
| EventView              | View Events, including access to the Audit screen                  |
| FeedView               | View package feeds and the packages in them                        |
| InsightsReportView     | View Insights reports                                              |
| InterruptionView       | View interruptions generated during deployments                    |
| LibraryVariableSetView | View library variable sets                                         |
| LifecycleView          | View lifecycles                                                    |
| MachinePolicyView      | View health check policies                                         |
| ProcessView            | View the deployment process and channels associated with a project |
| ProjectGroupView       | View project groups                                                |
| ProjectView            | View the details of projects                                       |
| ReleaseView            | View a release of a project                                        |
| RunbookRunView         | View runbook runs                                                  |
| RunbookView            | View runbooks                                                      |
| TargetTagView          | View deployment target tags                                        |
| TaskView               | View summary-level information associated with a task              |
| TeamView               | View teams                                                         |
| TenantView             | View tenants                                                       |
| TriggerView            | View triggers                                                      |

## Read Only {#DefaultPermissions-ReadOnly}

| System Permission  | Description                                           |
| ------------------ | ----------------------------------------------------- |
| EventRetentionView | View/list archived event files                        |
| EventView          | View Events, including access to the Audit screen     |
| PlatformHubView    | View Platform Hub configuration and resources         |
| SpaceView          | View spaces                                           |
| SshKnownHostsView  | View SSH known hosts                                  |
| TaskView           | View summary-level information associated with a task |
| TeamView           | View teams                                            |
| TelemetryView      | View telemetry data                                   |
| UserRoleView       | View other user's roles                               |
| UserView           | View users                                            |

| Space Permission       | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| AccountView            | View accounts                                                                        |
| ActionTemplateView     | View step templates                                                                  |
| ArtifactView           | View the artifacts created manually and during deployment                            |
| CertificateView        | View certificates                                                                    |
| DeploymentView         | View deployments                                                                     |
| EnvironmentView        | View environments                                                                    |
| EventView              | View Events, including access to the Audit screen                                    |
| FeedView               | View package feeds and the packages in them                                          |
| GitCredentialView      | View Git credentials                                                                 |
| InsightsReportView     | View Insights reports                                                                |
| InterruptionView       | View interruptions generated during deployments                                      |
| LibraryVariableSetView | View library variable sets                                                           |
| LifecycleView          | View lifecycles                                                                      |
| MachinePolicyView      | View health check policies                                                           |
| MachineView            | View machines                                                                        |
| ProcessView            | View the deployment process and channels associated with a project                   |
| ProjectGroupView       | View project groups                                                                  |
| ProjectView            | View the details of projects                                                         |
| ProxyView              | View proxies                                                                         |
| ReleaseView            | View a release of a project                                                          |
| RunbookRunView         | View runbook runs                                                                    |
| RunbookView            | View runbooks                                                                        |
| SubscriptionView       | View subscriptions                                                                   |
| TargetTagView          | View deployment target tags                                                          |
| TaskView               | View summary-level information associated with a task                                |
| TeamView               | View teams                                                                           |
| TenantView             | View tenants                                                                         |
| TriggerView            | View triggers                                                                        |
| VariableView           | View variables belonging to a project or library variable set                        |
| VariableViewUnscoped   | View non-environment scoped variables belonging to a project or library variable set |
| WorkerView             | View the workers in worker pools                                                     |

## Release Creator {#DefaultPermissions-ReleaseCreator}

| Space Permission      | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| EnvironmentView       | View environments                                                  |
| FeedView              | View package feeds and the packages in them                        |
| InsightsReportView    | View Insights reports                                              |
| ProcessView           | View the deployment process and channels associated with a project |
| ProjectView           | View the details of projects                                       |
| ReleaseCreate         | Create a release for a project                                     |
| ReleaseView           | View a release of a project                                        |
| RunbookEdit           | Edit runbooks                                                      |
| RunbookSnapshotCreate | Create runbook snapshots                                           |
| RunbookView           | View runbooks                                                      |
| TargetTagView         | View deployment target tags                                        |

## Runbook Consumer {#DefaultPermissions-RunbookConsumer}

| Space Permission       | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| ActionTemplateView     | View step templates                                           |
| ArtifactView           | View the artifacts created manually and during deployment     |
| CertificateView        | View certificates                                             |
| EnvironmentView        | View environments                                             |
| EventView              | View Events, including access to the Audit screen             |
| FeedView               | View package feeds and the packages in them                   |
| InterruptionView       | View interruptions generated during deployments               |
| LibraryVariableSetView | View library variable sets                                    |
| MachinePolicyView      | View health check policies                                    |
| MachineView            | View machines                                                 |
| ProjectGroupView       | View project groups                                           |
| ProjectView            | View the details of projects                                  |
| RunbookRunCreate       | Create runbook runs                                           |
| RunbookRunView         | View runbook runs                                             |
| RunbookView            | View runbooks                                                 |
| TargetTagView          | View deployment target tags                                   |
| TaskView               | View summary-level information associated with a task         |
| TeamView               | View teams                                                    |
| TenantView             | View tenants                                                  |
| TriggerView            | View triggers                                                 |
| VariableView           | View variables belonging to a project or library variable set |

## Runbook Producer {#DefaultPermissions-RunbookProducer}

| Space Permission                  | Description                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ActionTemplateCreate              | Create step templates                                                                                                           |
| ActionTemplateDelete              | Delete step templates                                                                                                           |
| ActionTemplateEdit                | Edit step templates                                                                                                             |
| ActionTemplateView                | View step templates                                                                                                             |
| ArtifactCreate                    | Manually create artifacts                                                                                                       |
| ArtifactDelete                    | Delete artifacts                                                                                                                |
| ArtifactEdit                      | Edit the details describing artifacts                                                                                           |
| ArtifactView                      | View the artifacts created manually and during deployment                                                                       |
| CertificateView                   | View certificates                                                                                                               |
| EnvironmentView                   | View environments                                                                                                               |
| EventView                         | View Events, including access to the Audit screen                                                                               |
| FeedView                          | View package feeds and the packages in them                                                                                     |
| InterruptionSubmit                | Take responsibility for and submit interruptions generated during deployments                                                   |
| InterruptionView                  | View interruptions generated during deployments                                                                                 |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| LibraryVariableSetCreate          | Create library variable sets                                                                                                    |
| LibraryVariableSetDelete          | Delete library variable sets                                                                                                    |
| LibraryVariableSetEdit            | Edit library variable sets                                                                                                      |
| LibraryVariableSetView            | View library variable sets                                                                                                      |
| LifecycleView                     | View lifecycles                                                                                                                 |
| MachinePolicyView                 | View health check policies                                                                                                      |
| MachineView                       | View machines                                                                                                                   |
| ProjectCreate                     | Create projects                                                                                                                 |
| ProjectDelete                     | Delete projects                                                                                                                 |
| ProjectEdit                       | Edit project details                                                                                                            |
| ProjectGroupView                  | View project groups                                                                                                             |
| ProjectView                       | View the details of projects                                                                                                    |
| RunbookEdit                       | Edit runbooks                                                                                                                   |
| RunbookRunCreate                  | Create runbook runs                                                                                                             |
| RunbookRunDelete                  | Delete runbook runs                                                                                                             |
| RunbookRunView                    | View runbook runs                                                                                                               |
| RunbookSnapshotCreate             | Create runbook snapshots                                                                                                        |
| RunbookView                       | View runbooks                                                                                                                   |
| TargetTagView                     | View deployment target tags                                                                                                     |
| TaskCancel                        | Cancel server tasks                                                                                                             |
| TaskCreate                        | Explicitly create (run) server tasks                                                                                            |
| TaskView                          | View summary-level information associated with a task                                                                           |
| TeamView                          | View teams                                                                                                                      |
| TenantView                        | View tenants                                                                                                                    |
| TriggerCreate                     | Create triggers                                                                                                                 |
| TriggerDelete                     | Delete triggers                                                                                                                 |
| TriggerEdit                       | Edit triggers                                                                                                                   |
| TriggerView                       | View triggers                                                                                                                   |
| VariableEdit                      | Edit variables belonging to a project                                                                                           |
| VariableView                      | View variables belonging to a project or library variable set                                                                   |

## Space Manager {#DefaultPermissions-SpaceManager}

| System Permission          | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| DeploymentFreezeAdminister | Create, edit, delete and override deployment freezes |
| SshKnownHostsAdminister    | Add, edit, and remove SSH known hosts                |
| SshKnownHostsView          | View SSH known hosts                                 |
| TeamView                   | View teams                                           |
| UserRoleView               | View other user's roles                              |
| UserView                   | View users                                           |

| Space Permission                  | Description                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AccountCreate                     | Create accounts                                                                                                                 |
| AccountDelete                     | Delete accounts                                                                                                                 |
| AccountEdit                       | Edit accounts                                                                                                                   |
| AccountView                       | View accounts                                                                                                                   |
| ActionTemplateCreate              | Create step templates                                                                                                           |
| ActionTemplateDelete              | Delete step templates                                                                                                           |
| ActionTemplateEdit                | Edit step templates                                                                                                             |
| ActionTemplateView                | View step templates                                                                                                             |
| AiAgentTranscriptView             | View AI agent transcripts                                                                                                       |
| ApprovalRuleAdminister            | Create, edit, delete Approval Rules                                                                                             |
| ArtifactCreate                    | Manually create artifacts                                                                                                       |
| ArtifactDelete                    | Delete artifacts                                                                                                                |
| ArtifactEdit                      | Edit the details describing artifacts                                                                                           |
| ArtifactView                      | View the artifacts created manually and during deployment                                                                       |
| BuildInformationAdminister        | Replace or delete build information                                                                                             |
| BuildInformationPush              | Create/update build information                                                                                                 |
| BuiltInFeedAdminister             | Replace or delete packages in the built-in package repository                                                                   |
| BuiltInFeedDownload               | Retrieve the contents of packages in the built-in package repository                                                            |
| BuiltInFeedPush                   | Push new packages to the built-in package repository                                                                            |
| CertificateCreate                 | Create certificates                                                                                                             |
| CertificateDelete                 | Delete certificates                                                                                                             |
| CertificateEdit                   | Edit certificates                                                                                                               |
| CertificateExportPrivateKey       | Export certificate private-keys                                                                                                 |
| CertificateView                   | View certificates                                                                                                               |
| DefectReport                      | Block a release from progressing to the next lifecycle phase                                                                    |
| DefectResolve                     | Unblock a release so it can progress to the next phase                                                                          |
| DeployedResourceAdminister        | Administer deployed resources managed by Octopus                                                                                |
| DeploymentCreate                  | Deploy releases to target environments                                                                                          |
| DeploymentDelete                  | Delete deployments                                                                                                              |
| DeploymentView                    | View deployments                                                                                                                |
| EnvironmentCreate                 | Create environments                                                                                                             |
| EnvironmentDelete                 | Delete environments                                                                                                             |
| EnvironmentEdit                   | Edit environments                                                                                                               |
| EnvironmentView                   | View environments                                                                                                               |
| EventView                         | View Events, including access to the Audit screen                                                                               |
| FeatureToggleEdit                 | Create, edit, delete feature toggles                                                                                            |
| FeedEdit                          | Edit feeds                                                                                                                      |
| FeedView                          | View package feeds and the packages in them                                                                                     |
| GitCredentialEdit                 | Edit Git credentials                                                                                                            |
| GitCredentialView                 | View Git credentials                                                                                                            |
| InsightsReportCreate              | Create Insights reports                                                                                                         |
| InsightsReportDelete              | Delete Insights reports                                                                                                         |
| InsightsReportEdit                | Edit Insights reports                                                                                                           |
| InsightsReportView                | View Insights reports                                                                                                           |
| InterruptionSubmit                | Take responsibility for and submit interruptions generated during deployments                                                   |
| InterruptionView                  | View interruptions generated during deployments                                                                                 |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| LibraryVariableSetCreate          | Create library variable sets                                                                                                    |
| LibraryVariableSetDelete          | Delete library variable sets                                                                                                    |
| LibraryVariableSetEdit            | Edit library variable sets                                                                                                      |
| LibraryVariableSetView            | View library variable sets                                                                                                      |
| LifecycleCreate                   | Create lifecycles                                                                                                               |
| LifecycleDelete                   | Delete lifecycles                                                                                                               |
| LifecycleEdit                     | Edit lifecycles                                                                                                                 |
| LifecycleView                     | View lifecycles                                                                                                                 |
| MachineCreate                     | Create machines                                                                                                                 |
| MachineDelete                     | Delete machines                                                                                                                 |
| MachineEdit                       | Edit machines                                                                                                                   |
| MachinePolicyCreate               | Create health check policies                                                                                                    |
| MachinePolicyDelete               | Delete health check policies                                                                                                    |
| MachinePolicyEdit                 | Edit health check policies                                                                                                      |
| MachinePolicyView                 | View health check policies                                                                                                      |
| MachineView                       | View machines                                                                                                                   |
| ProcessEdit                       | Edit the deployment process and channels associated with a project                                                              |
| ProcessView                       | View the deployment process and channels associated with a project                                                              |
| ProjectCreate                     | Create projects                                                                                                                 |
| ProjectDelete                     | Delete projects                                                                                                                 |
| ProjectEdit                       | Edit project details                                                                                                            |
| ProjectGroupCreate                | Create project groups                                                                                                           |
| ProjectGroupDelete                | Delete project groups                                                                                                           |
| ProjectGroupEdit                  | Edit project groups                                                                                                             |
| ProjectGroupView                  | View project groups                                                                                                             |
| ProjectView                       | View the details of projects                                                                                                    |
| ProxyCreate                       | Create proxies                                                                                                                  |
| ProxyDelete                       | Delete proxies                                                                                                                  |
| ProxyEdit                         | Edit proxies                                                                                                                    |
| ProxyView                         | View proxies                                                                                                                    |
| ReleaseCreate                     | Create a release for a project                                                                                                  |
| ReleaseDelete                     | Delete a release of a project                                                                                                   |
| ReleaseEdit                       | Edit a release of a project                                                                                                     |
| ReleaseView                       | View a release of a project                                                                                                     |
| RetentionAdminister               | Administer retention policies                                                                                                   |
| RunbookEdit                       | Edit runbooks                                                                                                                   |
| RunbookRunCreate                  | Create runbook runs                                                                                                             |
| RunbookRunDelete                  | Delete runbook runs                                                                                                             |
| RunbookRunView                    | View runbook runs                                                                                                               |
| RunbookSnapshotCreate             | Create runbook snapshots                                                                                                        |
| RunbookView                       | View runbooks                                                                                                                   |
| SubscriptionCreate                | Create subscriptions                                                                                                            |
| SubscriptionDelete                | Delete subscriptions                                                                                                            |
| SubscriptionEdit                  | Edit subscriptions                                                                                                              |
| SubscriptionView                  | View subscriptions                                                                                                              |
| TagSetCreate                      | Create tag sets                                                                                                                 |
| TagSetDelete                      | Delete tag sets                                                                                                                 |
| TagSetEdit                        | Edit tag sets                                                                                                                   |
| TargetTagAdminister               | Create, edit, delete deployment target tags                                                                                     |
| TargetTagView                     | View deployment target tags                                                                                                     |
| TaskCancel                        | Cancel server tasks                                                                                                             |
| TaskCreate                        | Explicitly create (run) server tasks                                                                                            |
| TaskEdit                          | Edit server tasks                                                                                                               |
| TaskPrioritize                    | Create deployments that are prioritized                                                                                         |
| TaskView                          | View summary-level information associated with a task                                                                           |
| TeamCreate                        | Create teams                                                                                                                    |
| TeamDelete                        | Delete teams                                                                                                                    |
| TeamEdit                          | Edit teams                                                                                                                      |
| TeamView                          | View teams                                                                                                                      |
| TenantCreate                      | Create tenants                                                                                                                  |
| TenantDelete                      | Delete tenants                                                                                                                  |
| TenantEdit                        | Edit tenants                                                                                                                    |
| TenantView                        | View tenants                                                                                                                    |
| TriggerCreate                     | Create triggers                                                                                                                 |
| TriggerDelete                     | Delete triggers                                                                                                                 |
| TriggerEdit                       | Edit triggers                                                                                                                   |
| TriggerView                       | View triggers                                                                                                                   |
| VariableEdit                      | Edit variables belonging to a project                                                                                           |
| VariableEditUnscoped              | Edit non-environment scoped variables belonging to a project or library variable set                                            |
| VariableView                      | View variables belonging to a project or library variable set                                                                   |
| VariableViewUnscoped              | View non-environment scoped variables belonging to a project or library variable set                                            |
| WorkerEdit                        | Edit workers and worker pools                                                                                                   |
| WorkerView                        | View the workers in worker pools                                                                                                |

## Space Viewer {#DefaultPermissions-SpaceViewer}

| System Permission | Description             |
| ----------------- | ----------------------- |
| SshKnownHostsView | View SSH known hosts    |
| TeamView          | View teams              |
| UserRoleView      | View other user's roles |
| UserView          | View users              |

| Space Permission       | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| AccountView            | View accounts                                                                        |
| ActionTemplateView     | View step templates                                                                  |
| ArtifactView           | View the artifacts created manually and during deployment                            |
| CertificateView        | View certificates                                                                    |
| DeploymentView         | View deployments                                                                     |
| EnvironmentView        | View environments                                                                    |
| EventView              | View Events, including access to the Audit screen                                    |
| FeedView               | View package feeds and the packages in them                                          |
| GitCredentialView      | View Git credentials                                                                 |
| InsightsReportView     | View Insights reports                                                                |
| InterruptionView       | View interruptions generated during deployments                                      |
| LibraryVariableSetView | View library variable sets                                                           |
| LifecycleView          | View lifecycles                                                                      |
| MachinePolicyView      | View health check policies                                                           |
| MachineView            | View machines                                                                        |
| ProcessView            | View the deployment process and channels associated with a project                   |
| ProjectGroupView       | View project groups                                                                  |
| ProjectView            | View the details of projects                                                         |
| ProxyView              | View proxies                                                                         |
| ReleaseView            | View a release of a project                                                          |
| RunbookRunView         | View runbook runs                                                                    |
| RunbookView            | View runbooks                                                                        |
| SubscriptionView       | View subscriptions                                                                   |
| TargetTagView          | View deployment target tags                                                          |
| TaskView               | View summary-level information associated with a task                                |
| TeamView               | View teams                                                                           |
| TenantView             | View tenants                                                                         |
| TriggerView            | View triggers                                                                        |
| VariableView           | View variables belonging to a project or library variable set                        |
| VariableViewUnscoped   | View non-environment scoped variables belonging to a project or library variable set |
| WorkerView             | View the workers in worker pools                                                     |

## System Administrator {#DefaultPermissions-SystemAdministrator}

| System Permission          | Description                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| AdministerSystem           | Perform system-level functions like configuring HTTP web hosting, the public URL, server nodes, maintenance mode, and server diagnostics |
| ConfigureServer            | Configure server settings like Authentication, SMTP, and HTTP Security Headers                                                           |
| DeploymentFreezeAdminister | Create, edit, delete and override deployment freezes                                                                                     |
| EventRetentionDelete       | Delete archived event files                                                                                                              |
| EventRetentionView         | View/list archived event files                                                                                                           |
| EventView                  | View Events, including access to the Audit screen                                                                                        |
| PlatformHubEdit            | Edit Platform Hub configuration and resources                                                                                            |
| PlatformHubView            | View Platform Hub configuration and resources                                                                                            |
| SpaceCreate                | Create spaces                                                                                                                            |
| SpaceDelete                | Delete spaces                                                                                                                            |
| SpaceEdit                  | Edit spaces                                                                                                                              |
| SpaceView                  | View spaces                                                                                                                              |
| SshKnownHostsAdminister    | Add, edit, and remove SSH known hosts                                                                                                    |
| SshKnownHostsView          | View SSH known hosts                                                                                                                     |
| TaskCancel                 | Cancel server tasks                                                                                                                      |
| TaskCreate                 | Explicitly create (run) server tasks                                                                                                     |
| TaskEdit                   | Edit server tasks                                                                                                                        |
| TaskView                   | View summary-level information associated with a task                                                                                    |
| TeamCreate                 | Create teams                                                                                                                             |
| TeamDelete                 | Delete teams                                                                                                                             |
| TeamEdit                   | Edit teams                                                                                                                               |
| TeamView                   | View teams                                                                                                                               |
| TelemetryView              | View telemetry data                                                                                                                      |
| UserEdit                   | Edit users                                                                                                                               |
| UserInvite                 | Invite users to register accounts                                                                                                        |
| UserRoleEdit               | Edit user role definitions                                                                                                               |
| UserRoleView               | View other user's roles                                                                                                                  |
| UserView                   | View users                                                                                                                               |

## System Manager {#DefaultPermissions-SystemManager}

| System Permission          | Description                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| ConfigureServer            | Configure server settings like Authentication, SMTP, and HTTP Security Headers |
| DeploymentFreezeAdminister | Create, edit, delete and override deployment freezes                           |
| EventRetentionDelete       | Delete archived event files                                                    |
| EventRetentionView         | View/list archived event files                                                 |
| EventView                  | View Events, including access to the Audit screen                              |
| PlatformHubEdit            | Edit Platform Hub configuration and resources                                  |
| PlatformHubView            | View Platform Hub configuration and resources                                  |
| SpaceCreate                | Create spaces                                                                  |
| SpaceDelete                | Delete spaces                                                                  |
| SpaceEdit                  | Edit spaces                                                                    |
| SpaceView                  | View spaces                                                                    |
| SshKnownHostsAdminister    | Add, edit, and remove SSH known hosts                                          |
| SshKnownHostsView          | View SSH known hosts                                                           |
| TaskCancel                 | Cancel server tasks                                                            |
| TaskCreate                 | Explicitly create (run) server tasks                                           |
| TaskEdit                   | Edit server tasks                                                              |
| TaskView                   | View summary-level information associated with a task                          |
| TeamCreate                 | Create teams                                                                   |
| TeamDelete                 | Delete teams                                                                   |
| TeamEdit                   | Edit teams                                                                     |
| TeamView                   | View teams                                                                     |
| TelemetryView              | View telemetry data                                                            |
| UserEdit                   | Edit users                                                                     |
| UserInvite                 | Invite users to register accounts                                              |
| UserRoleEdit               | Edit user role definitions                                                     |
| UserRoleView               | View other user's roles                                                        |
| UserView                   | View users                                                                     |

## Tenant Manager {#DefaultPermissions-TenantManager}

| Space Permission | Description    |
| ---------------- | -------------- |
| TenantCreate     | Create tenants |
| TenantDelete     | Delete tenants |
| TenantEdit       | Edit tenants   |
| TenantView       | View tenants   |

## Version notes

- The `DeployedResourceAdminister` permission is available from Octopus Server 2026.3.13597.
