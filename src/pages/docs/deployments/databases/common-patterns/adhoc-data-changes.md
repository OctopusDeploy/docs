---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Ad-hoc data change scripts
description: Recommendations on configuring a pipeline to handle ad-hoc data change scripts.
navOrder: 20
---

Sometimes an application causes data to get into an odd state, but the bug can be hard to reproduce and the priority to fix the bug might be low. However, the data still needs to be fixed. It might only be one record in one environment in one database, and it doesn't make sense to send a script to fix the data through the standard automated database deployment pipeline.

The majority of the time, the fix is a manual process and varies from company to company.  It could be as simple as emailing the script to a DBA to as complicated as submitting a lengthly request form.  

Just like database deployments, it is possible to automate this. Automation has multiple advantages over a manual process.

1. A consistent set of business rules can be applied.  For example, no schema changes, and only insert or update statements are allowed.
2. The script can run through an auto-approval script.  The auto-approval ensures the rules are followed.  It can also run the script in a transaction and roll it back.  If the script changes more than a set number of rows, for instance 10, then a DBA must look at it.
3. An automated process is faster, and it frees up the people running those scripts to do more meaningful work.
4. The process can also send out notifications with an audit trail that is easier to search through than email.

## Leveraging runbooks for ad-hoc data change scripts

[Runbooks](/docs/runbooks/) were added to Octopus Deploy in version: **2019.11**.

Runbooks provide an excellent way to run ad-hoc data change scripts.  Runbooks don't require a release to be created, but they still have the same functionality as a typical Octopus Deployment, such as prompted variables and auditing. Typically we find this process is a good starting point:

1. The runbook run is created, and the script to run and the database information is provided via [prompted variables](/docs/projects/variables/prompted-variables/).
2. The script to run is analyzed for any schema change commands, and it is run and immediately rolled back in a transaction.  
    1. If no schema change commands are found, the script ran successfully, and it updated less than X number of rows then a DBA Approval Required [output variable](/docs/projects/variables/output-variables/) is set to `False`.
    2. If any of those conditions fail, then the DBA Approval Required [output variable](/docs/projects/variables/output-variables/) is set to `True`.
3. Notify the approvers when that DBA Approval Required [output variable](/docs/projects/variables/output-variables/) is `True` using [run conditions](/docs/projects/steps/conditions/#run-condition).
4. Pause for a [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals.md) when that DBA Approval Required [output variable](/docs/projects/variables/output-variables/) is `True` using [run conditions](/docs/projects/steps/conditions/#run-condition).
5. Run the script on the desired database.
6. Notify the DBAs and the person who submitted the script that the script has finished running.

![A sample ad-hoc script process](images/adhoc_scripts_process.png "width=500")

For the example process, only the database name and script are prompted variables.  The prompted variables allow a person to enter values prior to running the runbook.  In this example, a `create table` command is also included in the data changes:

![The prompted variables for the ad-hoc script process](images/adhoc_scripts_submit.png "width=500")

The auto-approval script leverages the [write highlight](/docs/deployments/custom-scripts/logging-messages-in-scripts/) command so important messages are shown on the task summary screen.  The `create table` command was detected, requiring a DBA to approve the script.  The DBA has a choice to accept the script or reject it.  There are some cases when a create table is necessary, for example, creating a temporary table:

![Ad hoc script requires approval](images/adhoc_approval_required.png "width=500")

In another example, the same script, without the `create table` command is submitted.  This time it passes the auto-approval and is immediately executed:

![Task progress for the ad-hoc script](images/adhoc_auto_approval.png "width=500")

You can view this example on our [samples instance](https://samples.octopus.app/app#/Spaces-106/projects/ad-hoc-data-change-scripts/operations/runbooks/Runbooks-225/overview).