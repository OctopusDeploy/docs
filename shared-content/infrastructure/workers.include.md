Workers are machines that can execute tasks that don't need to be run on the Octopus Server or individual deployment targets.

You can manage your workers by navigating to **Infrastructure ➜ Worker Pools** in the Octopus Web Portal:

![The Worker Pools area of Octopus Deploy](/docs/shared-content/concepts/images/worker-pools.png "width=500")

Workers are useful for the following scenarios:

- Publishing to Azure websites.
- Deploying AWS CloudFormation templates.
- Deploying to AWS Elastic Beanstalk.
- Uploading files to Amazon S3.
- Backing up databases.
- Performing database schema migrations
- Configuring load balancers.

![Workers diagram](/docs/shared-content/concepts/images/workers-diagram-img.png "width=1000")
