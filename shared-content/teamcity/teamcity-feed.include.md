TeamCity 7 and above can act as a NuGet repository. You can enable this by navigating to **{{Administration,NuGet Settings}}** and enabling the inbuilt NuGet server. Any build artifacts ending with `.nupkg` will automatically be served as NuGet packages, which Octopus can consume.

## Connect Octopus to your TeamCity Server

1. In the Octopus Web Portal navigate to **{{Library,External Feeds}}**.
1. Click **ADD FEED**.
1. Leave the feed type as **NuGet Feed**.
1. Enter a name for the feed.
1. Enter the authenticated feed URL.
1. Click **SAVE**.

Once added, the TeamCity feed will appear in the NuGet feed list.

You can use the *Test* link to make sure that the NuGet package is available before creating your Octopus project.

:::success
**Tip: delayed package publishing**
NuGet packages created from your build **won't appear in the TeamCity NuGet feed until after the build fully completes**. If you plan to trigger a deployment during a build, this creates a problem: the package won't be in the feed until the build is published, so you won't be able to deploy it.

The solution is to configure a secondary build configuration, and use a snapshot dependency and build trigger in TeamCity to run the deployment build configuration after the first build configuration completes.
:::
