[TeamCity](http://www.jetbrains.com/teamcity/) from JetBrains is a popular continuous integration server that supports a variety of different version control systems and build runners. Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.

When using Octopus Deploy with TeamCity, TeamCity will usually be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating NuGet or Zip packages for deployment.

Octopus Deploy will take those packages and to push them to development, test, and production environments.
