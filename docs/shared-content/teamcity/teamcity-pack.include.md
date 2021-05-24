## Create packages with TeamCity

Octopus supports multiple [package formats](/docs/packaging-applications/index.md#supported-formats) for deploying your software. TeamCity can be configured to monitor your source control and package your applications when changes are made.

You configure TeamCity to package your applications by creating a [build configuration](https://www.jetbrains.com/help/teamcity/build-configuration.html), and adding a step to the configuration of runner type, **Octopus Deploy: Pack**.

1. Give the step a name.
2. Enter the [package ID](/docs/packaging-applications/index.md#package-id).
3. Select the type of **package format** you want to create, NuGet(default) or Zip.
4. Enter the **package version**. The package version cannot be a single number (learn about [version numbers in Octopus](/docs/packaging-applications/index.md##version-numbers)). Make sure this evaluates to a multi-part number, for instance, **1.1.3.**, or **1.0.%build.counter%** to include the build
5. Enter the **source path**.
6. Enter the **output path**.

With these options selected, your packages will automatically be created using the version number of the current build. OctoPack will ensure these packages appear in the artifacts tab of TeamCity:

![](images/3278194.png "width=500")
