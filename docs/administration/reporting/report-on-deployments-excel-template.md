---
title: Octopus reporting with an excel template
description: Octopus reporting with an excel template
position: 100
---

To help you get started, we provide a sample Excel spreadsheet that you can connect to your own Octopus Server.

![](images/3278354.png "width=500")

## Getting started {#Reporting-Gettingstarted}

The fastest way to get started is to use our Excel spreadsheet template. The spreadsheet uses Pivot Tables and Pivot Charts to summarize the data. You can use it as a starting point, and then modify or adapt it to suit your needs.

First, **[download the template](/docs/attachments/octopusreport.xlsx)** and open it in Excel. The template fetches data from our public [Demo Octopus Server](https://demo.octopus.app).

:::hint
Please make sure you [unblock the file](https://www.google.com.au/search?q=windows%20unblock%20file) after downloading it, otherwise you may get a misleading error message like: `The file is corrupt and cannot be opened`
:::

To change the source of the data:

1. Go to the **DATA** ribbon tab in Excel, then click **Queries & Connections**:

   ![](images/3278356.png "width=500")

2. Select the **Octopus Deployment history** connection, then click **Properties...**

   ![](images/3278357.png "width=500")

3. Go to the **Definition** tab, then click **Browse...**

   ![](images/3278358.png "width=500")

4. In the Select Data Source menu, instead of selecting a file, enter your reporting URL, then Open. To get your reporting URL, see the section below on **Using the XML Feed**.

   ![](images/3278360.png "width=500")

## Refreshing the data {#Reporting-Refreshingthedata}

Once you have set up your connection, you can refresh the data from the source whenever you like. If you make your own customizations to the spreadsheet, you can save them, and simply refresh the data in the sheet whenever you like.

![](images/3278361.png "width=500")

## Using the XML feed {#Reporting-UsingtheXMLFeed}

The best way to consume reporting data from Octopus is using the XML feed. The feed is always available at:

`http://<OCTOPUS-SERVER>/api/reporting/deployments/xml?apikey=<API-KEY>`

Where:

- `<OCTOPUS-SERVER>` is the hostname of your Octopus Server
- `<API-KEY>` is one of [your API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)

For example:

`https://demo.octopus.app/api/reporting/deployments/xml?apikey=API-GUEST`
`https://your.octopus.app/api/reporting/deployments/xml?apikey=API-1234567891234567891234567`

The XML feed can be consumed programmatically, or via Excel or [Microsoft PowerBI](https://powerbi.microsoft.com/). We have a blog on how to do this using [PowerBI](https://octopus.com/blog/powerbi-report-for-octopus-deploy)

Since a user-specific API key is used to consume the data, only data that the user can see will appear in the report.

:::hint
If you encounter the following error when using your own Octopus Server

```text
Unhandled exception from web server: The parameter is incorrect
System.Net.HttpListenerException (0x80004005): The parameter is incorrect
at System.Net.HttpResponseStream.Dispose(Boolean disposing)
at System.IO.Stream.Close()
at Octopus.Server.Web.OctopusNancyHost.OutputWithDefaultTransferEncoding(Response nancyResponse, HttpListenerResponse response) in Y:\work\refs\tags\3.2.0\source\Octopus.Server\Web\OctopusNancyHost.cs:line 353
at Octopus.Server.Web.OctopusNancyHost.ConvertNancyResponseToResponse(NancyContext nancyRequest, Response nancyResponse, HttpListenerResponse response) in Y:\work\refs\tags\3.2.0\source\Octopus.Server\Web\OctopusNancyHost.cs:line 339
at Octopus.Server.Web.OctopusNancyHost.Process(HttpListenerContext ctx) in Y:\work\refs\tags\3.2.0\source\Octopus.Server\Web\OctopusNancyHost.cs:line 447
```

This is due to that the revocation information for the certificate is not retrievable, to get around it, do the following

1. Click **New Source...**.
2. **Data Feed**.
3. Fill in your URL in the **Link or File:** field.
4. Click **Browse...**.
5. This should give you a Security Alert "Revocation information for the security certificate for this site is not available. Do you want to proceed?"
6. Click **Yes**.
7. Cancel the File Open dialog.
8. Cancel the Data Connection Wizard.
9. Paste the URL in the File Name field.
:::

## Learn more

- [Reporting blog posts](https://octopus.com/blog/tag/reporting).
