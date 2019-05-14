---
title: The Delivery Pipeline
description: This section will provide guidance for integrating Octopus to complete your delivery pipeline.
position: 0
---

You already have a source control system and a build server. Octopus doesn't replace these, we turbocharge them.
            Let the build server focus on what it does best: compiling code and running tests. Octopus takes care
            of deploying and promoting releases
            between environments.

We designed Octopus Deploy for teams that follow agile delivery practices. A typical workflow could be:

1. **Commit Code to Your Existing Source Control System.**

   You might be using Git, Team Foundation Server, Subversion, or Mercurial. The choice is yours.

1. **Your CI/Build Server Compiles the Code and Runs Unit Tests.**

   You might be using TeamCity, Jenkins, Bamboo, Team Foundation Server, or CruiseControl.NET. Again, the choice is yours.

1. **Package Your Application.**

   When the build is ready, your CI/build server takes all the files your software needs to run and bundles them up ready for deployment.

1. **Octopus Deploy Deploys Your Software to Your Infrastructure.**

   Octopus deploys your software to the infrastructure you've configured, whether this is on-premises servers or cloud services. Because you likely want to deploy your software into a testing environment before deploying into production, Octopus promotes releases of your software through your environments, for instance, to dev, testing, staging, and production, and because each environment has slightly different configurations, Octopus manages those for you too.

**Will need to get the diagram working
![](/docs/getting-started/delivery-pipeline.png)
