A test instance is a subset of your production instance.  For example, if you have 50 projects all deploying to Kubernetes, the test instance will have one to three projects deploying to Kubernetes.  It should represent your production instance without being a full clone.  This will allow you to test all the integrations, deployments and other important functionality without impacting production.

:::hint
Your license allows you to have up to three unique instances of Octopus Deploy.  We determine uniqueness based on the database the instance connects to.  If you need more than three reach out to advice@octopus.com for a temporary license.  
:::