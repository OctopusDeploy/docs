---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: NuGet feeds
description: Configuring NuGet repositories as Octopus Feeds
navOrder: 50
---

If you're using an external NuGet feed, you can register it with Octopus and use them as part of your deployments. Go to **Library ➜ External feeds**.

You can add NuGet feeds by clicking the **Add feed** button.

In the URL field, enter the HTTP/HTTPS URL to the feed, or the file share or local directory path. Then click **Save and test**.

![](/docs/packaging-applications/package-repositories/images/add-external-feed.png "width=500")

On the test page, you can check whether the feed is working by searching for packages:

![](/docs/packaging-applications/package-repositories/images/external-feed-search.png "width=500")

Learn more about [hosting your own NuGet Feeds](https://docs.nuget.org/create/hosting-your-own-nuget-feeds)

## NuGet.Server performance {#Packagerepositories-NuGet.Serverperformance}

A popular external NuGet hosting option is **NuGet.Server**. However, be aware that it suffers from performance problems when dealing with large packages or large numbers of smaller packages. Users may report high CPU usage, timeouts when displaying package details, or memory issues. A great alternative that we recommend is [NuGet.Lucene](https://github.com/themotleyfool/NuGet.Lucene).

The built-in NuGet server in Octopus stores metadata in SQL Server, and doesn't suffer from these performance issues.

## Troubleshooting NuGet feeds

- For network file shares, keep in mind that Octopus and Tentacle run under system accounts by default, which may not have access to the file share.
- NuGet.Server only allows 30MB packages [by default](https://help.octopus.com/t/30mb-default-maximum-nuget-package-size/3498).

A good first step for diagnosing NuGet feed issues is to ensure that the NuGet command line executable can access the same feed from the Octopus Server or target machine if the `Each Tentacle will download the package directly from the remote server` option is selected. The following steps can be used to troubleshoot NuGet feeds.

Run the command:

```
nuget list -Source http://example.com/MyFeed/nuget/v3/index.json
```

replacing `http://example.com/MyFeed/nuget/v3/index.json` with the path to the NuGet V3 URL. The expected output of this command is a list of the packages in the repository.

If this command prompts for credentials, then the feed is most likely private, and Octopus will need to be configured with the same credentials.

If the repository can not be accessed, you will see an error like:

```
Unable to load the service index for source http://example.com/MyFeed/nuget/v3/index.json.
```

along with additional details that can look like:

* Response status code does not indicate success: 404 (Not Found).
* An error occurred while sending the request. The remote name could not be resolved: 'hostname'.

These errors give you an indication as to why NuGet could not access the requested server.
