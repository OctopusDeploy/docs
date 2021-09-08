---
title: Rollbacks
description: Rolling back to a previous version of code is entirely possible, but there is quite a bit to consider.  This guide will walk you through the patterns and pitfalls for a successful rollback.
position: 10
hideInThisSectionHeader: true
---

- Intro
    - Why rollback code
    - When not to rollback your code
- Code only rollbacks
    - Previous known state
        - More than just re-run last deployment
    - Scenarios
        - UI changes
        - Service changes with no contract changes
    - Each scenario and use case is different
        - Be aware of coupled changes
    - Carefully review change logs to determine what to rollback
    - Checklist of can rollback?
- Staging changes has highest chance of success
    - Can test prior to "go live"
    - Leverage load balancer / reverse proxy after testing is complete
    - Very similar to blue/green or canary deployments
- Decoupling database changes
    - Restoring a database backup is a last resort
    - Dropping tables or columns will result in lost data