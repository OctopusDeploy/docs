[TeamCity](http://www.jetbrains.com/teamcity/) from JetBrains is a popular continuous integration server that supports a variety of different version control systems and build runners. Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.

When using Octopus Deploy with TeamCity, TeamCity will usually be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating NuGet or Zip packages for deployment.

And Octopus Deploy will be used to take those packages and to push them to development, test, and production environments.

Integration with TeamCity makes it possible to automate the following:

- Packaging your applications.
- Include [metadata](/docs/api-and-integration/metadata/index.md) about the work items that went into your packages.
- Push packages to your Octopus Deploy server.
- Create releases in Octopus.
- Deploy releases in Octopus.
- Promote releases between environments in Octopus.
