---
title: Jenkins
position: 5
---


[Jenkins](http://jenkins-ci.org/) is an extendable, open-source continuous integration server. You can use Jenkins to compile and test your code, and then have it trigger deployments in Octopus Deploy. This page will guide you through making these tools work together.


On this page:


- Prerequisites
- Creating a release
- Deploying releases

## Prerequisites


Plugins are central to Jenkins, and a number of plugins will be required to follow the steps on this page. Before you can start, you'll need to ensure the following plugins are enabled:

- [MSBuild Plugin](http://wiki.jenkins-ci.org/display/JENKINS/MSBuild+Plugin) - required to compile your Visual Studio solution
- [Mask Passwords Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Mask+Passwords+Plugin) - required to store your Octopus API keys and keep them out of the console



Build job


During our Jenkins job, we will:

1. Compile the code, run unit tests, and so on - typical CI tasks
2. Have OctoPack create NuGet packages
3. Publish these NuGet packages to the Octopus Deploy server
4. Create a release in Octopus, ready to be deployed



Jenkins uses the MSBuild plugin to compile Visual Studio solutions. [Once OctoPack has been installed](/docs/home/packaging-applications/nuget-packages/using-octopack.md) on your C#/VB projects, you can configure Jenkin's MSBuild task to pass the appropriate parameters to MSBuild to have OctoPack run:


![](/docs/images/3048162/3278145.png?effects=border-simple,blur-border)


There are a number of parameters that you will want to define. For this page, we are using:

```bash
/p:RunOctoPack=true /p:OctoPackPackageVersion=1.1.${BUILD_NUMBER} /p:OctoPackPublishPackageToHttp=http://localhost/nuget/packages /p:OctoPackPublishApiKey=${OctopusApiKey}
```


The settings are:

- **RunOctoPack**: specifies that OctoPack should create packages during the build
- **OctoPackPackageVersion**: version number that should be given to packages created by OctoPack. Since Jenkins build numbers are integers like "12", we combine it with "1.1." to produce package versions such as "1.0.12".
- **OctoPackPublishPackageToHttp**: tells OctoPack to push the package to the Octopus Deploy server. Read more about the [built-in NuGet repository in Octopus](/docs/home/packaging-applications/package-repositories.md). You'll find the URL to your repository on the **Library > Packages** tab in Octopus
- **OctoPackPublishApiKey**: your Octopus Deploy API key


:::success
**OctoPack arguments**
Learn more about the available [OctoPack parameters](/docs/home/packaging-applications/nuget-packages/using-octopack.md).
:::





Notice that we use `${OctopusApiKey}` to access an API key that we will use to authenticate with Octopus. You define this using the fields provided by the **Mask Passwords plugin** on your job.


![](/docs/images/3048162/3278146.png?effects=border-simple,blur-border)

:::success
**Creating API keys**
Learn about [how to create an API key](/docs/home/how-to/how-to-create-an-api-key.md).
:::


After running this job, and assuming OctoPack is correctly installed, your code should compile, and packages should be published to the Octopus Deploy server. You can go to **Library** > **Packages** in Octopus to check that the packages have been published.

## Creating a release


Jenkins is compiling our code and publishing packages to Octopus Deploy. If we wish, we can also have Jenkins automatically create (and optionally, deploy) a release in Octopus.


To do this, we'll be using the [Octo.exe command line tool](/docs/home/api-and-integration/octo.exe-command-line.md). [Download Octo.exe](https://octopus.com/downloads), and extract it to a folder on your Jenkins server, such as `C:\Tools\Octo\Octo.exe`


We can call Octo.exe easily using the Jenkins **Execute Windows batch** **command** task.


![](/docs/images/3048162/3278144.png?effects=border-simple,blur-border)


In the command, we are calling:

```bash
"C:\Tools\Octo\Octo.exe" create-release --project OctoFX --version 1.1.%BUILD_NUMBER% --packageversion 1.1.%BUILD_NUMBER% --server http://localhost/ --apiKey %OctopusApiKey% --releaseNotes "Jenkins build [%BUILD_NUMBER%](http://localhost:8054/job/OctoFX/%BUILD_NUMBER%)/"

```


Importantly:

- The `--project` specifies the name of the Octopus Deploy project that we want to create a release for.
- The `--version` specifies the version number of the release in Octopus. We want this to contain the Jenkins build number.
- The `--packageversion` tells Octo.exe to ensure that the release references the right version of the NuGet packages that we published using OctoPack.
- The `--releaseNotes` will appear in Octopus, and link back to the build in Jenkins. Of course, change the URL to the address of your Jenkins server


:::success
**Octo.exe arguments**
Learn more about [Octo.exe](/docs/home/api-and-integration/octo.exe-command-line.md) and the arguments it accepts.
:::


With this job runs, Jenkins will now not only build and publish packages, but it should also create a release in Octopus Deploy.

## Deploying releases


You might like to configure Jenkins to not only create a release, but deploy it to a test environment. This can easily be done by adding some extra parameters to the `create-release` command:

```bash
"C:\Tools\Octo\Octo.exe" create-release ....(same as before)... --deployto=Development --progress
```


The extra arguments being:

- The `--deployTo` setting specifies the environment in Octopus that we are deploying to.
- The `--progress` flag tells Octo.exe to write the deployment log from Octopus to the log in Jenkins. This flag was added in 2.5; in previous versions of Octo.exe you can use `--waitfordeployment` instead. You can also remove this flag if you want the Jenkins job to complete immediately without waiting for the deployment in Octopus to complete.


:::success
**Octo.exe arguments**
Again, see the [arguments to Octo.exe](/docs/home/api-and-integration/octo.exe-command-line.md) to see other parameters that you can specify. If your deployment is likely to take longer than 10 minutes, for example, consider passing `--deploymenttimeout=00:20:00` to make it 20 minutes.
:::


With these settings, Jenkins should trigger a deployment as soon as a job completes.

**Give us feedback**

We're Octopus Deploy experts, not Jenkins experts, so we're always looking for ways to improve this page. If you think this can be improved, or if you get stuck, [get in touch on our support site](https://octopus.com/support)!
