---
layout: src/layouts/Default.astro
pubDate: 2026-04-16
modDate: 2026-04-16
title: Running a runbook
description: Learn how to run a runbook in Octopus Deploy
navOrder: 15
---

## How to run a runbook in Octopus Deploy

1. Navigate to your project and select **Runbooks**.
1. Select the runbook you want to run.
1. Click **RUN...**.
   :::figure
   ![run runbook basic options](/docs/img/getting-started/first-runbook-run/images/run-runbook-basic-options.png)
   :::
1. Select one more more environments for the execution.
1. Click **RUN** to run now, or select **Show advanced** to display advanced configuration options.

### Schedule a runbook run

1. After expanding the advanced options on your runbook run, expand the **WHEN** section and select **later**.
1. Specify the time and date you would like the runbook to run.
1. Click **RUN**.

### Exclude steps from runbook runs

1. After expanding the advanced options on your runbook run, expand the **Excluded steps** section and use the check-box to select steps to exclude from the runbook run.
1. Click **RUN**.

### Modify the guided failure mode

Guided failure mode asks for users to intervene when a runbook encounters an error. Learn more about [guided failures](/docs/releases/guided-failures).

1. After expanding the advanced options on your runbook run, expand the **Failure mode** section, and select the mode you want to use.
1. Click **RUN**.

### Run on a specific subset of deployment targets

You can run a runbook on a specific subset of deployment targets.

1. After expanding the advanced options on your runbook run, expand the **Preview and customize** section.
1. Expand the **Deployment Targets** section.
1. Select your target selection method:
   - **Include all applicable deployment targets** (default)
   - **Include specific deployment targets**: Choose individual targets to include
   - **Exclude specific deployment targets**: Choose individual targets to exclude
   - **Include specific target tags**: Include targets with selected tags
   - **Exclude specific target tags**: Exclude targets with selected tags
1. Click **RUN**.

## Further reading

- [Runbooks vs Deployments](/docs/runbooks/runbooks-vs-deployments) - Understand the key differences
- [Runbook Variables](/docs/runbooks/runbook-variables) - Learn about variable management
- [Runbook Permissions](/docs/runbooks/runbook-permissions) - Configure access control
- [Tag Sets](/docs/tenants/tag-sets) - Learn about creating and managing tags