import { test, expect } from '@playwright/test';
const baseUrl = 'http://[::1]:3000';

test('Check bookmarks', async ({ page }) => {
  for (let bookmark of bookmarks) {
    const url = new URL(bookmark, baseUrl);

    await page.goto(url.href);

    await expect(page.locator(url.hash)).toBeVisible()
  }

});

const bookmarks = [
  '/docs/deployments/kubernetes/kustomize#kustomization-file-directory',
  '/docs/deployments/kubernetes/deploy-raw-yaml#glob-patterns-and-multiple-paths',
  '/docs/deprecations#reporting-deployments-by-week',
  '/docs/deployments/aws/cloudformation#aws-login-error-0005',
  '/docs/deployments/aws/cloudformation#aws-login-error-0006',

/*
https://octopus.com/docs/infrastructure/deployment-targets/kubernetes-target#vendor-authentication-p...
https://octopus.com/docs/insights/space-level-insights#settings
https://octopus.com/docs/insights/metrics#mean-time-to-recovery
https://octopus.com/docs/insights/metrics#deployment-failure-rate
https://octopus.com/docs/insights/metrics#deployment-frequency
https://octopus.com/docs/insights/metrics#deployment-lead-time
http://octopus.com/docs/deployments/aws/ecs#ecs-update-validation-error
http://octopus.com/docs/projects/variables/variable-filters#VariableSubstitutionSyntax-JSONParsingjs...
http://octopus.com/docs/octopus-rest-api/octopus.client/getting-started#using-octopus.client-from-in...
http://octopus.com/docs/projects/export-import#packages
http://octopus.com/docs/projects/version-control/creating-and-deploying-releases-version-controlled-...
http://octopus.com/docs/deployments/aws/ecs#ecs-deployment-deploy-failed
http://octopus.com/docs/installation/requirements#sql-server-database
http://octopus.com/docs/infrastructure/workers/dynamic-worker-pools#installing-software-on-dynamic-w...
http://octopus.com/docs/security/users-and-teams#Managingusersandteams-Invitingusers
http://octopus.com/docs/deployment-process/configuration-features/structured-configuration-variables...
http://octopus.com/docs/infrastructure/deployment-targets#accounts
http://octopus.com/docs/runbooks#Publishing
http://octopus.com/docs/infrastructure/workers/dynamic-worker-pools#deprecation
http://octopus.com/docs/deployment-process/execution-containers-for-workers#which-image
http://octopus.com/docs/octopus-cloud/#OctopusCloud-Invitingusers
http://octopus.com/docs/installation/requirements#supported-browsers
http://octopus.com/docs/deployments/nginx/configure-target-machine#ConfigureTargetMachine-EnableSudo...
http://octopus.com/docs/deployment-process/steps/email-notifications#smtp-configuration
http://octopus.com/docs/packaging-applications#version-numbers
http://octopus.com/docs/deployments/custom-scripts/script-modules#ScriptModules-PowerShell
http://octopus.com/docs/administration/spaces#modify-a-space
http://octopus.com/docs/administration/spaces#default-space
http://octopus.com/docs/packaging-applications/octo.exe#create-zip-packages
http://octopus.com/docs/packaging-applications#supported-formats
https://octopus.com/docs/administration/managing-licenses/community#restricted-permissions
http://octopus.com/docs/infrastructure/deployment-targets/kubernetes-target#aws-accounts
http://octopus.com/docs/packaging-applications#package-id
http://octopus.com/docs/infrastructure/deployment-targets#target-roles
http://octopus.com/docs/packaging-applications/octo.exe#packaging-a.net-core-application
http://octopus.com/docs/packaging-applications/create-packages/octopus-cli#packaging-a.net-core-appl...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#deployment-name
http://octopus.com/docs/projects/coordinating-multiple-projects/deploy-release-step#variables
http://octopus.com/docs/deployments/custom-scripts/run-a-script-step#package-reference-fields-name
http://octopus.com/docs/infrastructure/environments#dynamic-targets-in-an-environment
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#bluegreen-deploy...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#backoff-limit
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#replicas
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#ttl-limit-second...
http://octopus.com/docs/packaging-applications/build-servers#build-information
http://octopus.com/docs/deployments/aws/s3#single-file-selection
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#recreate-deploym...
http://octopus.com/docs/deployments/kubernetes/helm-update#known-limitations
http://octopus.com/docs/deployments/aws/s3#individual-files-from-the-package
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#revision-history...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#rolling-update-d...
http://octopus.com/docs/releases/deployment-notes#templates
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#completions
http://octopus.com/docs/deployments/patterns/multi-tenant-deployments/multi-tenant-deployment-guide/...
http://octopus.com/docs/infrastructure/deployment-targets/windows-targets/proxy-support#ProxySupport...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#progression-dead...
http://octopus.com/docs/infrastructure/deployment-targets/kubernetes-target#kubectl
http://octopus.com/docs/deployments/custom-scripts/run-a-script-step#accessing-package-references-fr...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#pod-termination-...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#parallelism
http://octopus.com/docs/infrastructure/workers#built-in-worker
http://octopus.com/docs/projects/project-triggers/scheduled-deployment-trigger#cron-expression
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#active-deadline-...
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#add-label
http://octopus.com/docs/releases/release-notes#Release-Notes-Templates
http://octopus.com/docs/deployments/custom-scripts/run-a-script-step#referencing-packages
http://octopus.com/docs/deployments/kubernetes/helm-update#helm-client-tool
http://octopus.com/docs/deployment-examples/kubernetes-deployments/deploy-container#volumes
http://octopus.com/docs/infrastructure/accounts/azure#resource-permissions
http://octopus.com/docs/infrastructure/accounts/azure#azure-service-principal
http://octopus.com/docs/projects/variables/variable-substitutions#VariableSubstitutionSyntax-Extende...
http://octopus.com/docs/infrastructure/deployment-targets/linux/requirements#self-contained-calamari
http://octopus.com/docs/projects/variables/variable-substitutions#VariableSubstitutionSyntax-Extende...
http://octopus.com/docs/infrastructure/deployment-targets/linux/requirements#self-contained-calamari-limitations
http://octopus.com/docs/deployments/certificates#configure-subscriptions-for-expiry-notifications
http://octopus.com/docs/administration/managing-infrastructure/diagnostics#system-integrity-check
http://octopus.com/docs/deployments/windows/iis-websites-and-application-pools#how-to-take-your-webs...
http://octopus.com/docs/releases/channels#Channels-ManuallyCreatingReleases
http://octopus.com/docs/packaging-applications/octo.exe#create-zip-packages
https://octopus.com/docs/releases/lifecycles#no-progression:~:text=simply%20create%20a-,single%2Dphase,-that%20has%20Required
http://octopus.com/docs/infrastructure/environments/machine-policies#MachinePolicies-Customhealthche...
http://octopus.com/docs/deployment-process/performance#task-logs
http://octopus.com/docs/packaging-applications#package-id
http://octopus.com/docs/security/exposing-octopus/expose-the-octopus-web-portal-over-https#HSTS
http://octopus.com/docs/deployment-process/configuration-files#Configurationfiles-ConfigurationVaria...
http://octopus.com/docs/packaging-applications/package-repositories/built-in-repository#built-in-rep...
http://octopus.com/docs/packaging-applications#version-numbers
http://octopus.com/docs/infrastructure/environments/machine-policies#MachinePolicies-TentacleUpdateA...
http://octopus.com/docs/packaging-applications#version-numbers
http://octopus.com/docs/deployments/patterns/multi-tenant-deployments/multi-tenant-deployments-faq#Multi-tenantdeploymentsFAQ-CanIrequireatenantforalldeploymentsofaproject?
http://octopus.com/docs/deployments/patterns/multi-tenant-deployments/multi-tenant-deployments-faq#Multi-tenantdeploymentsFAQ-CanIrequireatenantforalldeploymentsofaproject?
http://octopus.com/docs/releases/channels#Channels-VersionRange
http://octopus.com/docs/deployments/patterns/multi-tenant-deployments/multi-tenant-deployment-guide/...
http://octopus.com/docs/infrastructure/environments/elastic-and-transient-environments/keeping-deplo...
http://octopus.com/docs/packaging-applications#supported-formats
http://octopus.com/docs/releases/channels#Channels-VersionRange
http://octopus.com/docs/releases/channels#Channels-VersionRange
http://octopus.com/docs/infrastructure/deployment-targets/windows-targets#configure-a-listening-tent...
http://octopus.com/docs/infrastructure/deployment-targets/windows-targets#configure-a-polling-tentac...
*/

];


