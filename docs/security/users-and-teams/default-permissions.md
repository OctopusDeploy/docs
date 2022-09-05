---
title: Default permissions for built-in user roles
description: A listing of the default permissions for each of the built-in user roles.
---

## Build Server {#DefaultPermissions-BuildServer}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| BuiltInFeedAdminister       | Replace or delete packages in the built-in package repository |
| BuiltInFeedDownload         | Retrieve the contents of packages in the built-in package repository |
| BuiltInFeedPush             | Push new packages to the built-in package repository |
| DeploymentCreate            | Deploy releases to target environments |
| DeploymentView              | View deployments |
| EnvironmentView             | View environments |
| FeedView                    | View package feeds and the packages in them |
| LibraryVariableSetView      | View library variable sets |
| LifecycleView               | View lifecycles |
| BuildInformationPush        | Create/update build information |
| BuildInformationAdminister  | Replace or delete build information |
| ProcessView                 | View the deployment process and channels associated with a project |
| ProjectView                 | View the details of projects |
| ReleaseCreate               | Create a release for a project |
| ReleaseView                 | View a release of a project |
| TaskView                    | View summary-level information associated with a task |
| TenantView                  | View tenants |
| RunbookView                 | View runbooks |
| RunbookEdit                 | Edit runbooks |
| RunbookRunView              | View runbook runs |
| RunbookRunCreate            | Create runbook runs |

## Certificate Manager {#DefaultPermissions-CertificateManager}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| CertificateView             | View certificates |
| CertificateCreate           | Create certificates |
| CertificateEdit             | Edit certificates |
| CertificateDelete           | Delete certificates |
| CertificateExportPrivateKey | Export certificate private-keys |
| EnvironmentView             | View environments |
| TenantView                  | View tenants |

## Deployment Creator {#DefaultPermissions-DeploymentCreator}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| DeploymentCreate            | Deploy releases to target environments |
| DeploymentView              | View deployments |
| EnvironmentView             | View environments |
| LifecycleView               | View lifecycles |
| ProcessView                 | View the deployment process and channels associated with a project |
| ProjectView                 | View the details of projects |
| ReleaseView                 | View a release of a project |
| TaskView                    | View summary-level information associated with a task |
| TenantView                  | View tenants |
| LibraryVariableSetView      | View library variable sets |
| RunbookView                 | View runbooks |
| RunbookRunView              | View runbook runs |
| RunbookRunCreate            | Create runbook runs |

## Environment Manager {#DefaultPermissions-EnvironmentManager}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| EnvironmentCreate           | Create environments |
| EnvironmentEdit             | Edit environments |
| EnvironmentDelete           | Delete environments |
| MachineCreate               | Create machines |
| MachineEdit                 | Edit machines |
| MachineDelete               | Delete machines |
| TaskCreate                  | Explicitly create (run) server tasks |
| TaskCancel                  | Cancel server tasks |
| AccountCreate               | Create accounts |
| AccountEdit                 | Edit accounts |
| AccountDelete               | Delete accounts |
| ProxyCreate                 | Create proxies |
| ProxyEdit                   | Edit proxies |
| ProxyDelete                 | Delete proxies |
| MachinePolicyCreate         | Create health check policies |
| MachinePolicyEdit           | Edit health check policies |
| MachinePolicyDelete         | Delete health check policies |
| WorkerEdit                  | Edit workers and worker pools |
| EnvironmentView             | View environments |
| MachineView                 | View machines |
| TaskView                    | View summary-level information associated with a task |
| TeamView                    | View teams |
| AccountView                 | View accounts |
| MachinePolicyView           | View health check policies |
| CertificateView             | View certificates |
| ProxyView                   | View proxies |
| WorkerView                  | View the workers in worker pools |

## Environment Viewer {#DefaultPermissions-EnvironmentViewer}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| EnvironmentView             | View environments |
| MachineView                 | View machines |
| TaskView                    | View summary-level information associated with a task |
| TeamView                    | View teams |
| AccountView                 | View accounts |
| MachinePolicyView           | View health check policies |
| CertificateView             | View certificates |
| ProxyView                   | View proxies |
| WorkerView                  | View the workers in worker pools |

## Package Publisher {#DefaultPermissions-PackagePublisher}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| BuiltInFeedAdminister       | Replace or delete packages in the built-in package repository |
| BuiltInFeedDownload         | Retrieve the contents of packages in the built-in package repository |
| BuiltInFeedPush             | Push new packages to the built-in package repository |
| FeedView                    | View package feeds and the packages in them |
| BuildInformationPush        | Create/update build information |
| BuildInformationAdminister  | Replace or delete build information |

## Project Contributor {#DefaultPermissions-ProjectContributor}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |
| UserView                    | View users |
| UserRoleView                | View other user's roles |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ArtifactCreate              | Manually create artifacts |
| ActionTemplateView          | View step templates |
| ActionTemplateCreate        | Create step templates |
| ActionTemplateEdit          | Edit step templates |
| ActionTemplateDelete        | Delete step templates |
| ProcessEdit                 | Edit the deployment process and channels associated with a project |
| ProjectEdit                 | Edit project details |
| FeedView                    | View package feeds and the packages in them |
| LibraryVariableSetCreate    | Create library variable sets |
| LibraryVariableSetEdit      | Edit library variable sets |
| LibraryVariableSetDelete    | Delete library variable sets |
| TaskCreate                  | Explicitly create (run) server tasks |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| MachineView                 | View machines |
| DefectReport                | Block a release from progressing to the next lifecycle phase |
| DefectResolve               | Unblock a release so it can progress to the next phase |
| VariableView                | View variables belonging to a project or library variable set |
| VariableEdit                | Edit variables belonging to a project |
| TriggerCreate               | Create triggers |
| TriggerDelete               | Delete triggers |
| TriggerEdit                 | Edit triggers |
| RunbookView                 | View runbooks |
| RunbookEdit                 | Edit runbooks |
| ReleaseView                 | View a release of a project |
| ProjectView                 | View the details of projects |
| DeploymentView              | View deployments |
| ProcessView                 | View the deployment process and channels associated with a project |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| LifecycleView               | View lifecycles |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| RunbookRunView              | View runbook runs |

## Project Deployer {#DefaultPermissions-ProjectDeployer}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |
| UserView                    | View users |
| UserRoleView                | View other user's roles |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| DeploymentCreate            | Deploy releases to target environments |
| InterruptionSubmit          | Take responsibility for and submit interruptions generated during deployments |
| TaskCancel                  | Cancel server tasks |
| RunbookRunCreate            | Create runbook runs |
| ArtifactCreate              | Manually create artifacts |
| ActionTemplateView          | View step templates |
| ActionTemplateCreate        | Create step templates |
| ActionTemplateEdit          | Edit step templates |
| ActionTemplateDelete        | Delete step templates |
| ProcessEdit                 | Edit the deployment process and channels associated with a project |
| ProjectEdit                 | Edit project details |
| FeedView                    | View package feeds and the packages in them |
| LibraryVariableSetCreate    | Create library variable sets |
| LibraryVariableSetEdit      | Edit library variable sets |
| LibraryVariableSetDelete    | Delete library variable sets |
| TaskCreate                  | Explicitly create (run) server tasks |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| MachineView                 | View machines |
| DefectReport                | Block a release from progressing to the next lifecycle phase |
| DefectResolve               | Unblock a release so it can progress to the next phase |
| VariableView                | View variables belonging to a project or library variable set |
| VariableEdit                | Edit variables belonging to a project |
| TriggerCreate               | Create triggers |
| TriggerDelete               | Delete triggers |
| TriggerEdit                 | Edit triggers |
| RunbookView                 | View runbooks |
| RunbookEdit                 | Edit runbooks |
| ReleaseView                 | View a release of a project |
| ProjectView                 | View the details of projects |
| DeploymentView              | View deployments |
| ProcessView                 | View the deployment process and channels associated with a project |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| LifecycleView               | View lifecycles |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| RunbookRunView              | View runbook runs |

## Project Initiator {#DefaultPermissions-ProjectInitiator}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |
| UserView                    | View users |
| UserRoleView                | View other user's roles |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ProjectCreate               | Create projects |
| ProjectEdit                 | Edit project details |
| ProjectDelete               | Delete projects |
| DefectReport                | Block a release from progressing to the next lifecycle phase |
| DefectResolve               | Unblock a release so it can progress to the next phase |
| ReleaseView                 | View a release of a project |
| ProjectView                 | View the details of projects |
| DeploymentView              | View deployments |
| ProcessView                 | View the deployment process and channels associated with a project |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| LifecycleView               | View lifecycles |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| RunbookView                 | View runbooks |
| RunbookRunView              | View runbook runs |

## Project Lead {#DefaultPermissions-ProjectLead}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |
| UserView                    | View users |
| UserRoleView                | View other user's roles |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ReleaseCreate               | Create a release for a project |
| ReleaseEdit                 | Edit a release of a project |
| ReleaseDelete               | Delete a release of a project |
| ArtifactEdit                | Edit the details describing artifacts |
| ArtifactDelete              | Delete artifacts |
| ArtifactCreate              | Manually create artifacts |
| ActionTemplateView          | View step templates |
| ActionTemplateCreate        | Create step templates |
| ActionTemplateEdit          | Edit step templates |
| ActionTemplateDelete        | Delete step templates |
| ProcessEdit                 | Edit the deployment process and channels associated with a project |
| ProjectEdit                 | Edit project details |
| FeedView                    | View package feeds and the packages in them |
| LibraryVariableSetCreate    | Create library variable sets |
| LibraryVariableSetEdit      | Edit library variable sets |
| LibraryVariableSetDelete    | Delete library variable sets |
| TaskCreate                  | Explicitly create (run) server tasks |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| MachineView                 | View machines |
| DefectReport                | Block a release from progressing to the next lifecycle phase |
| DefectResolve               | Unblock a release so it can progress to the next phase |
| VariableView                | View variables belonging to a project or library variable set |
| VariableEdit                | Edit variables belonging to a project |
| TriggerCreate               | Create triggers |
| TriggerDelete               | Delete triggers |
| TriggerEdit                 | Edit triggers |
| RunbookView                 | View runbooks |
| RunbookEdit                 | Edit runbooks |
| ReleaseView                 | View a release of a project |
| ProjectView                 | View the details of projects |
| DeploymentView              | View deployments |
| ProcessView                 | View the deployment process and channels associated with a project |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| LifecycleView               | View lifecycles |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| RunbookRunView              | View runbook runs |

## Project Viewer {#DefaultPermissions-ProjectViewer}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |
| UserView                    | View users |
| UserRoleView                | View other user's roles |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ReleaseView                 | View a release of a project |
| ProjectView                 | View the details of projects |
| DeploymentView              | View deployments |
| ProcessView                 | View the deployment process and channels associated with a project |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| LifecycleView               | View lifecycles |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| RunbookView                 | View runbooks |
| RunbookRunView              | View runbook runs |

## Release Creator {#DefaultPermissions-ReleaseCreator}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| EnvironmentView             | View environments |
| FeedView                    | View package feeds and the packages in them |
| ProcessView                 | View the deployment process and channels associated with a project |
| ProjectView                 | View the details of projects |
| ReleaseCreate               | Create a release for a project |
| ReleaseView                 | View a release of a project |
| RunbookView                 | View runbooks |
| RunbookEdit                 | Edit runbooks |

## Runbook Consumer {#DefaultPermissions-RunbookConsumer}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ProjectView                 | View the details of projects |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| FeedView                    | View package feeds and the packages in them |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| MachineView                 | View machines |
| RunbookView                 | View runbooks |
| RunbookRunView              | View runbook runs |
| RunbookRunCreate            | Create runbook runs |

## Runbook Producer {#DefaultPermissions-RunbookProducer}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ProjectCreate               | Create projects |
| ProjectEdit                 | Edit project details |
| ProjectDelete               | Delete projects |
| LifecycleView               | View lifecycles |
| ActionTemplateView          | View step templates |
| ActionTemplateCreate        | Create step templates |
| ActionTemplateEdit          | Edit step templates |
| ActionTemplateDelete        | Delete step templates |
| LibraryVariableSetCreate    | Create library variable sets |
| LibraryVariableSetEdit      | Edit library variable sets |
| LibraryVariableSetDelete    | Delete library variable sets |
| TaskCreate                  | Explicitly create (run) server tasks |
| TaskCancel                  | Cancel server tasks |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| VariableView                | View variables belonging to a project or library variable set |
| VariableEdit                | Edit variables belonging to a project |
| TriggerCreate               | Create triggers |
| TriggerDelete               | Delete triggers |
| TriggerEdit                 | Edit triggers |
| RunbookEdit                 | Edit runbooks |
| RunbookRunDelete            | Delete runbook runs |
| ArtifactCreate              | Manually create artifacts |
| ArtifactEdit                | Edit the details describing artifacts |
| ArtifactDelete              | Delete artifacts |
| InterruptionSubmit          | Take responsibility for and submit interruptions generated during deployments |
| ProjectView                 | View the details of projects |
| EnvironmentView             | View environments |
| ArtifactView                | View the artifacts created manually and during deployment |
| EventView                   | View Events, including access to the Audit screen |
| ProjectGroupView            | View project groups |
| LibraryVariableSetView      | View library variable sets |
| TeamView                    | View teams |
| FeedView                    | View package feeds and the packages in them |
| TaskView                    | View summary-level information associated with a task |
| InterruptionView            | View interruptions generated during deployments |
| MachinePolicyView           | View health check policies |
| TenantView                  | View tenants |
| TriggerView                 | View triggers |
| CertificateView             | View certificates |
| MachineView                 | View machines |
| RunbookView                 | View runbooks |
| RunbookRunView              | View runbook runs |
| RunbookRunCreate            | Create runbook runs |

## Space Manager {#DefaultPermissions-SpaceManager}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| TeamView                    | View teams |
| UserView                    | View users |
| UserRoleView                | View other user's roles |

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| ProjectEdit                 | Edit project details |
| ProjectView                 | View the details of projects |
| ProjectCreate               | Create projects |
| ProjectDelete               | Delete projects |
| ProcessView                 | View the deployment process and channels associated with a project |
| ProcessEdit                 | Edit the deployment process and channels associated with a project |
| VariableEdit                | Edit variables belonging to a project |
| VariableEditUnscoped        | Edit non-environment scoped variables belonging to a project or library variable set |
| VariableView                | View variables belonging to a project or library variable set |
| VariableViewUnscoped        | View non-environment scoped variables belonging to a project or library variable set |
| ReleaseCreate               | Create a release for a project |
| ReleaseView                 | View a release of a project |
| ReleaseEdit                 | Edit a release of a project |
| ReleaseDelete               | Delete a release of a project |
| DefectReport                | Block a release from progressing to the next lifecycle phase |
| DefectResolve               | Unblock a release so it can progress to the next phase |
| DeploymentCreate            | Deploy releases to target environments |
| DeploymentDelete            | Delete deployments |
| DeploymentView              | View deployments |
| EnvironmentView             | View environments |
| EnvironmentCreate           | Create environments |
| EnvironmentEdit             | Edit environments |
| EnvironmentDelete           | Delete environments |
| MachineCreate               | Create machines |
| MachineEdit                 | Edit machines |
| MachineView                 | View machines |
| MachineDelete               | Delete machines |
| ArtifactView                | View the artifacts created manually and during deployment |
| ArtifactCreate              | Manually create artifacts |
| ArtifactEdit                | Edit the details describing artifacts |
| ArtifactDelete              | Delete artifacts |
| FeedView                    | View package feeds and the packages in them |
| FeedEdit                    | Edit feeds |
| GitCredentialView           | View Git credentials |
| GitCredentialEdit           | Edit Git credentials |
| EventView                   | View Events, including access to the Audit screen |
| LibraryVariableSetView      | View library variable sets |
| LibraryVariableSetCreate    | Create library variable sets |
| LibraryVariableSetEdit      | Edit library variable sets |
| LibraryVariableSetDelete    | Delete library variable sets |
| ProjectGroupView            | View project groups |
| ProjectGroupCreate          | Create project groups |
| ProjectGroupEdit            | Edit project groups |
| ProjectGroupDelete          | Delete project groups |
| TeamCreate                  | Create teams |
| TeamView                    | View teams |
| TeamEdit                    | Edit teams |
| TeamDelete                  | Delete teams |
| TaskView                    | View summary-level information associated with a task |
| TaskCreate                  | Explicitly create (run) server tasks |
| TaskCancel                  | Cancel server tasks |
| TaskEdit                    | Edit server tasks |
| InterruptionView            | View interruptions generated during deployments |
| InterruptionSubmit          | Take responsibility for and submit interruptions generated during deployments |
| InterruptionViewSubmitResponsible | Take responsibility for and submit interruptions generated during deployments when the user is in a designated responsible team |
| BuiltInFeedPush             | Push new packages to the built-in package repository |
| BuiltInFeedAdminister       | Replace or delete packages in the built-in package repository |
| BuiltInFeedDownload         | Retrieve the contents of packages in the built-in package repository |
| ActionTemplateView          | View step templates |
| ActionTemplateCreate        | Create step templates |
| ActionTemplateEdit          | Edit step templates |
| ActionTemplateDelete        | Delete step templates |
| LifecycleCreate             | Create lifecycles |
| LifecycleView               | View lifecycles |
| LifecycleEdit               | Edit lifecycles |
| LifecycleDelete             | Delete lifecycles |
| AccountView                 | View accounts |
| AccountEdit                 | Edit accounts |
| AccountCreate               | Create accounts |
| AccountDelete               | Delete accounts |
| TenantCreate                | Create tenants |
| TenantEdit                  | Edit tenants |
| TenantView                  | View tenants |
| TenantDelete                | Delete tenants |
| TagSetCreate                | Create tag sets |
| TagSetEdit                  | Edit tag sets |
| TagSetDelete                | Delete tag sets |
| MachinePolicyCreate         | Create health check policies |
| MachinePolicyView           | View health check policies |
| MachinePolicyEdit           | Edit health check policies |
| MachinePolicyDelete         | Delete health check policies |
| ProxyCreate                 | Create proxies |
| ProxyView                   | View proxies |
| ProxyEdit                   | Edit proxies |
| ProxyDelete                 | Delete proxies |
| SubscriptionCreate          | Create subscriptions |
| SubscriptionView            | View subscriptions |
| SubscriptionEdit            | Edit subscriptions |
| SubscriptionDelete          | Delete subscriptions |
| TriggerCreate               | Create triggers |
| TriggerView                 | View triggers |
| TriggerEdit                 | Edit triggers |
| TriggerDelete               | Delete triggers |
| CertificateView             | View certificates |
| CertificateCreate           | Create certificates |
| CertificateEdit             | Edit certificates |
| CertificateDelete           | Delete certificates |
| CertificateExportPrivateKey | Export certificate private-keys |
| WorkerView                  | View the workers in worker pools |
| WorkerEdit                  | Edit workers and worker pools |
| BuildInformationPush        | Create/update build information |
| BuildInformationAdminister  | Replace or delete build information |
| RunbookView                 | View runbooks |
| RunbookEdit                 | Edit runbooks |
| RunbookRunView              | View runbook runs |
| RunbookRunDelete            | Delete runbook runs |
| RunbookRunCreate            | Create runbook runs |

## System Administrator {#DefaultPermissions-SystemAdministrator}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| AdministerSystem            | Perform system-level functions like configuring HTTP web hosting, the public URL, server nodes, maintenance mode, and server diagnostics |
| ConfigureServer             | Configure server settings like Authentication, SMTP, and HTTP Security Headers |
| EventRetentionDelete        | Delete archived event files |
| EventRetentionView          | View/list archived event files |
| EventView                   | View Events, including access to the Audit screen |
| TeamCreate                  | Create teams |
| TeamView                    | View teams |
| TeamEdit                    | Edit teams |
| TeamDelete                  | Delete teams |
| TaskView                    | View summary-level information associated with a task |
| TaskCreate                  | Explicitly create (run) server tasks |
| TaskCancel                  | Cancel server tasks |
| TaskEdit                    | Edit server tasks |
| SpaceView                   | View spaces |
| SpaceEdit                   | Edit spaces |
| SpaceCreate                 | Create spaces |
| SpaceDelete                 | Delete spaces |
| UserView                    | View users |
| UserInvite                  | Invite users to register accounts |
| UserRoleView                | View other user's roles |
| UserRoleEdit                | Edit user role definitions |
| UserEdit                    | Edit users |

## System Manager {#DefaultPermissions-SystemManager}

| System Permission           | Description                              |
| --------------------------- | ---------------------------------------- |
| ConfigureServer             | Configure server settings like Authentication, SMTP, and HTTP Security Headers |
| EventRetentionDelete        | Delete archived event files |
| EventRetentionView          | View/list archived event files |
| EventView                   | View Events, including access to the Audit screen |
| TeamCreate                  | Create teams |
| TeamView                    | View teams |
| TeamEdit                    | Edit teams |
| TeamDelete                  | Delete teams |
| TaskView                    | View summary-level information associated with a task |
| TaskCreate                  | Explicitly create (run) server tasks |
| TaskCancel                  | Cancel server tasks |
| TaskEdit                    | Edit server tasks |
| SpaceView                   | View spaces |
| SpaceEdit                   | Edit spaces |
| SpaceCreate                 | Create spaces |
| SpaceDelete                 | Delete spaces |
| UserView                    | View users |
| UserInvite                  | Invite users to register accounts |
| UserRoleView                | View other user's roles |
| UserRoleEdit                | Edit user role definitions |
| UserEdit                    | Edit users |

## Tenant Manager {#DefaultPermissions-TenantManager}

| Space Permission            | Description                              |
| --------------------------- | ---------------------------------------- |
| TenantCreate                | Create tenants |
| TenantEdit                  | Edit tenants |
| TenantDelete                | Delete tenants |
| TenantView                  | View tenants |
