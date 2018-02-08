---
title: Workers
description: Worker setup and configuration.
position: 1400
---

When your deployment process runs a script or extracts a package without involving a Tentacle or SSH target, the process is performed by a worker (see [where steps run](#where-steps-run) below). To do this, Octopus Server spawns a new process from it's process under it's security context.

## Where steps run
The following step types and configurations run on a worker
- Any step that runs a script (usually user supplied) or has a package that has an execution plan of `Octopus Server` or `Octopus Server on behalf of roles`
- Any step that runs on a target other than a Tentacle, SSH or Offline Drop (eg Cloud Region, Azure Target)
- All AWS and Azure steps

The following steps always run inside the Octopus Server process (and do not run user-supplied code)
- Health Check
- Email
- Manual Intervention
- Import Certificate
