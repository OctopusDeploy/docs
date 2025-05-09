import { test, expect } from '@playwright/test';
const baseUrl = 'http://[::1]:3000';

/**
 * IMPORTANT NOTE! If these tests fail, it's because short.io links must be updated
 * to reflect a moved documentation page. Don't edit these tests before updating
 * the short.io link. Please tag #website-requests if in doubt!
 * 
 */

const bookmarks = [
  '/docs/administration/managing-infrastructure/diagnostics#system-integrity-check',
  '/docs/administration/spaces#default-space',
  '/docs/administration/spaces#modify-a-space',
  '/docs/kubernetes/steps/kubernetes-resources#active-deadline-seconds',
  '/docs/kubernetes/steps/kubernetes-resources#add-label',
  '/docs/kubernetes/steps/kubernetes-resources#backoff-limit',
  '/docs/kubernetes/steps/kubernetes-resources#blue-green-deployment-strategy',
  '/docs/kubernetes/steps/kubernetes-resources#completions',
  '/docs/kubernetes/steps/kubernetes-resources#deployment-name',
  '/docs/kubernetes/steps/kubernetes-resources#parallelism',
  '/docs/kubernetes/steps/kubernetes-resources#pod-termination-grace-period',
  '/docs/kubernetes/steps/kubernetes-resources#progression-deadline',
  '/docs/kubernetes/steps/kubernetes-resources#recreate-deployment-strategy',
  '/docs/kubernetes/steps/kubernetes-resources#replicas',
  '/docs/kubernetes/steps/kubernetes-resources#revision-history-limit',
  '/docs/kubernetes/steps/kubernetes-resources#rolling-update-deployment-strategy',
  '/docs/kubernetes/steps/kubernetes-resources#volumes',
  '/docs/projects/steps/configuration-features/structured-configuration-variables-feature#variable-replacement',
  '/docs/projects/deployment-process/performance#task-logs',
  '/docs/projects/built-in-step-templates/email-notifications#smtp-configuration',
  '/docs/deployments/aws/cloudformation#aws-login-error-0005',
  '/docs/deployments/aws/cloudformation#aws-login-error-0006',
  '/docs/deployments/aws/ecs#ecs-deployment-deploy-failed',
  '/docs/deployments/aws/s3#individual-files-from-the-package',
  '/docs/deployments/aws/s3#single-file-selection',
  '/docs/deployments/custom-scripts/run-a-script-step#package-reference-fields-name',
  '/docs/deployments/custom-scripts/run-a-script-step#referencing-packages',
  '/docs/deployments/custom-scripts/script-modules#powershell',
  '/docs/kubernetes/steps/yaml#glob-patterns-and-multiple-paths',
  '/docs/kubernetes/steps/helm#helm-client-tool',
  '/docs/kubernetes/steps/helm#known-limitations',
  '/docs/kubernetes/steps/kustomize#kustomization-file-directory',
  '/docs/deployments/nginx/configure-target-machine#enable-sudo-without-password',
  '/docs/tenants/tenant-deployment-faq#always-require-tenant',
  '/docs/deployments/windows/iis-websites-and-application-pools#how-to-take-your-website-offline-during-deployment',
  '/docs/deprecations#project-level-runbooks-all-api-endpoint',
  '/docs/deprecations#reporting-deployments-by-week',
  '/docs/infrastructure/accounts/azure#azure-service-principal',
  '/docs/infrastructure/accounts/azure#resource-permissions',
  '/docs/infrastructure/accounts/openid-connect#subject-keys',
  '/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api#add-a-kubernetes-target',
  '/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api#vendor-authentication-plugins',
  '/docs/infrastructure/deployment-targets/tentacle/windows#configure-a-polling-tentacle',
  '/docs/infrastructure/deployment-targets/machine-policies#custom-health-check-scripts',
  '/docs/infrastructure/deployment-targets/machine-policies#tentacle-update-account',
  '/docs/infrastructure/workers#built-in-worker',
  '/docs/infrastructure/workers#registering-linux-listening-worker',
  '/docs/infrastructure/workers#registering-ssh-connection-worker',
  '/docs/infrastructure/workers#registering-windows-listening-worker',
  '/docs/infrastructure/workers/dynamic-worker-pools#deprecation',
  '/docs/infrastructure/workers/dynamic-worker-pools#installing-software-on-dynamic-workers',
  '/docs/insights/metrics#deployment-failure-rate',
  '/docs/insights/metrics#deployment-frequency',
  '/docs/insights/metrics#deployment-lead-time',
  '/docs/insights/metrics#mean-time-to-recovery',
  '/docs/insights/space-level-insights#settings',
  '/docs/installation/requirements#supported-browsers',
  '/docs/octopus-cloud/getting-started-with-cloud#inviting-octopus-cloud-users',
  '/docs/packaging-applications#package-id',
  '/docs/packaging-applications#supported-formats',
  '/docs/packaging-applications#version-numbers',
  '/docs/packaging-applications/create-packages/octopus-cli#create-zip-packages',
  '/docs/packaging-applications/create-packages/octopus-cli#packaging-a-net-core-application',
  '/docs/packaging-applications/package-repositories/built-in-repository#built-in-repository-reindexing',
  '/docs/projects/coordinating-multiple-projects/deploy-release-step#variables',
  '/docs/projects/export-import#packages',
  '/docs/projects/project-triggers/scheduled-deployment-trigger#cron-expression',
  '/docs/projects/steps/execution-containers-for-workers#which-image',
  '/docs/projects/variables/variable-filters#json-parsing',
  '/docs/projects/variables/variable-substitutions#extended-syntax',
  '/docs/projects/version-control/version-control-reference#authentication',
  '/docs/releases/channels#manually-create-release',
  '/docs/releases/channels#version-rules',
  '/docs/releases/deployment-changes#templates',
  '/docs/releases/release-notes#templates',
  '/docs/security/exposing-octopus/expose-the-octopus-web-portal-over-https#hsts',
  '/docs/security/users-and-teams#inviting-users',
  '/docs/security/users-and-teams/auditing#accessing-archived-logs',
];

for (let bookmark of bookmarks) {
  const url = new URL(bookmark, baseUrl);
  
  test(`Check bookmark for ${bookmark}`, async ({ page }) => {
    await page.goto(url.href);

    await expect(page.locator(url.hash)).toBeVisible()
  });
}