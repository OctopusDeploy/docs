---
title: Reporting
position: 10
---


Octopus 3.1 adds a reporting feature that makes it easy to produce reports over your deployment history, using your preferred reporting tools.


Currently Octopus doesn't display this reporting data in the user interface anywhere, but we do expose raw data that you can query or consume in your favourite reporting tools. Hopefully, you'll be able to import this data, combine it with data from other sources, and slice and dice it in ways that make the most sense to you.


Raw data is provided in two ways:

- An an XML feed, which can be consumed by tools like Microsoft Excel or PowerBI (preferred), or programmatically
- As a table in the Octopus SQL database



The data allows you to report on questions like:

- How many deployments have we done, over what period? For which projects or environments?
- How many deployments were successful? How many failed?
- How long do deployments take on average?



To help you get started, we provide a sample Excel spreadsheet that you can connect to your own Octopus server.


![](/docs/images/3048643/3278354.png?effects=drop-shadow "width=500")

## Getting started {#Reporting-Gettingstarted}


The fastest way to get started is to use our Excel spreadsheet template. The spreadsheet uses Pivot Tables and Pivot Charts to summarise the data. You can use it as a starting point, and then modify or adapt it to suit your needs.


First, **[download the template](/docs/attachments/download the template)** and open it in Excel. The template fetches data from our public [Demo Octopus Server](https://demo.octopusdeploy.com).

:::hint
Please make sure you [unblock the file](https://www.google.com.au/search?q=windows%20unblock%20file) after downloading it, otherwise you may get a misleading error message like: `The file is corrupt and cannot be opened`
:::


To change the source of the data:

1. Go to the **DATA** ribbon tab in Excel, then click **Connections**:

![](/docs/images/3048643/3278356.png "width=500")
2. Select the **Octopus Deployment history** connection, then click **Properties...**
![](/docs/images/3048643/3278357.png "width=500")
3. Go to the **Definition** tab, then click **Browse...**

![](/docs/images/3048643/3278358.png "width=500")
4. In the Select Data Source menu, instead of selecting a file, enter your reporting URL, then Open. To get your reporting URL, see the section below on **Using the XML Feed**. 

![](/docs/images/3048643/3278360.png "width=500")


## Refreshing the data {#Reporting-Refreshingthedata}


Once you have set up your connection, you can refresh the data from the source whenever you like. If you make your own customizations to the spreadsheet, you can save them, and simply refresh the data in the sheet whenever you like.


![](/docs/images/3048643/3278361.png "width=500")

## Using the XML Feed {#Reporting-UsingtheXMLFeed}


The best way to consume reporting data from Octopus is using the XML feed. The feed is always available at:


`http://&lt;OCTOPUS-SERVER&gt;/api/reporting/deployments/xml?apikey=&lt;API-KEY&gt;`


Where:

- `&lt;OCTOPUS-SERVER&gt;` is the hostname of your Octopus server
- `&lt;API-KEY&gt;` is one of [your API keys](/docs/how-to/how-to-create-an-api-key.md)



For example:


`https://demo.octopusdeploy.com/api/reporting/deployments/xml?apikey=API-GUEST`*(that one really works!)*`https://myoctopus/api/reporting/deployments/xml?apikey=API-1234567891234567891234567`


The XML feed can be consumed programatically, or via Excel or [Microsoft PowerBI](https://powerbi.microsoft.com/).


Since a user-specific API key is used to consume the data, only data that the user can see will appear in the report.

:::hint
If you encounter the following error when using your own Octopus Server


`Unhandled exception from web server: The parameter is incorrect`
`System.Net.HttpListenerException (0x80004005): The parameter is incorrect`
`at System.Net.HttpResponseStream.Dispose(Boolean disposing)`
`at System.IO.Stream.Close()`
`at Octopus.Server.Web.OctopusNancyHost.OutputWithDefaultTransferEncoding(Response nancyResponse, HttpListenerResponse response) in Y:\work\refs\tags\3.2.0\source\Octopus.Server\Web\OctopusNancyHost.cs:line 353`
`at Octopus.Server.Web.OctopusNancyHost.ConvertNancyResponseToResponse(NancyContext nancyRequest, Response nancyResponse, HttpListenerResponse response) in Y:\work\refs\tags\3.2.0\source\Octopus.Server\Web\OctopusNancyHost.cs:line 339`
`at Octopus.Server.Web.OctopusNancyHost.Process(HttpListenerContext ctx) in Y:\work\refs\tags\3.2.0\source\Octopus.Server\Web\OctopusNancyHost.cs:line 447`


This is due to that the revocation information for the certificate is not retrievable, to get around it, do the following

1. Click "New Source..."
2. "Data Feed"
3. Fill in your URL in the "Link or File:" field
4. Click "Browse...".
5. This should give you a Security Alert "Revocation information for the security certificate for this site is not available. Do you want to proceed?"
6. Click "Yes"
7. Cancel the File Open dialog
8. Cancel the Data Connection Wizard
9. Paste the URL in the File Name field
:::




## Direct table access {#Reporting-Directtableaccess}


If your reporting tool of choice can't consume the XML feed, you can query the SQL table directly. Octopus maintains a **DeploymentHistory** table, with the exact same information that the XML Feed exposes. This may work better for tools like **SQL Server Reporting Services**.


![](/docs/images/3048643/3278362.png "width=500")


A few notes about accessing the table directly:

- We may add additional columns in the future
- We'll try not to change existing columns, but just in case, you may wish to set up your own View in SQL server to provide an abstraction layer.
- Since you're accessing the data directly, be aware that Octopus team permissions won't apply
- Don't join with any other tables - these are much more likely to change in future, so you're on your own if you do!



The table is completely denormalized, and should have any information that you might need to report on.

## How often is the data updated? {#Reporting-Howoftenisthedataupdated?}


The data in the table (and exposed by the feed) updates every 30 seconds to add deployments that have recently completed.


Since the data is denormalized, changing the name of a project or environment, or changing the version number of a release, may result in stale data. Octopus corrects this every 24 hours on a schedule.


Also note that the data:

- Isn't deleted by retention policies, so you can report on historical deployments even if retention policies clean them up
- Isn't deleted when a project/environment is deleted


## What about information on concurrent users, web front-end performance, etc.? {#Reporting-Whataboutinformationonconcurrentusers,webfront-endperformance,etc.?}


You may want to look at [enabling HTTP logging](/docs/how-to/enable-web-request-logging.md).
