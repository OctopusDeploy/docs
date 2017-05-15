---
title: Replicating your Octopus instance in a test environment
description: Walkthrough outlining how to replicate your Octopus instance.
position: 500
---
You may want to set up a duplicate Octopus Instance in a test environment to test things like upgrade procedures, rollback plans, etc. The steps outlined in our page - [Move the database and server]() - can be followed to accomplish the move to a different server. In the case of replicating your Octopus instance in a test environment, you will keep your production server live during the process. There are key differences that distinguish the setup of a test environment scenario from moving your production instance.

Tentacle thumbprints are stored in the database. Using a duplicate database means two identical thumbprints exist in two locations for individual Tentacles. Deployments can be interrupted when either Server connects to the Tentacle, and the other Server subsequently connects to the same Tentacle. The connection essentially gets stolen. To avoid this, all Tentacle communication ability would need to be removed. Here are two options:

Write a SQL script to delete all Tentacles from the database.
Setup your test instance that has no internet access so it can’t reach out to Tentacles.

That will limit what you can test to anything besides deployments. For deployment testing, consider setting up test Tentacle(s) in your test environment that don’t exist in your production instance.

:::Warning
Maintenance Mode does not prevent Tentacle connections. Health checks and other background tasks will still be performed while in Maintenance Mode.
:::

This cannot be done simultaneously with Disaster Recovery scenarios. That would require a separate instance. DR requires connection to the same database and keeping the instance offline. Refer to our guide on Disaster Recovery <link when available>
