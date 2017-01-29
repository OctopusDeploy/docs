---
title: Troubleshooting Node Limits Exceeded Error
---

- Node License Limits Exceeded
- Instructions to remove unwanted nodes

## Node License Limits Exceeded {#TroubleshootingNodeLimitsExceededError-NodeLicenseLimitsExceeded}

If you see the following licensing error, it means you have exceeded the number of active nodes:

*"Unfortunately your license limits have been exceeded, and you will no longer be able to create or deploy releases. Your Octopus Deploy license only allows X active nodes. You currently have Y active nodes."*

You can still login to your Octopus instance. You are only restricted from creating or deploying releases.

This may unintentionally occur if you have copied or moved your Octopus folders on your servers and you have multiple instances pointing to the same Octopus database.

### Instructions to remove unwanted nodes {#TroubleshootingNodeLimitsExceededError-Instructionstoremoveunwantednodes}

If you go to your nodes screen (*Configuration > Nodes menu*), you can delete the node(s) that are no longer applicable.

![](/docs/images/5671853/5866111.png "width=500")
