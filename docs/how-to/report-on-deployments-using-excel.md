---
title: Report on deployments using Excel
position: 11
---


:::hint
**Reporting in Octopus 3.1+**
Also take a look at the [Reporting features we shipped as part of Octopus 3.1](/docs/home/administration/reporting.md) which provides reporting optimized views of the live deployment data, no longer requiring an XML export.
:::


Ever wonder how many deployments you did this month? In this page, we'll help you to answer this question by walking you through how to export your deployments to Excel, and then to view them in a pivot table.


At a high-level, the steps are:

1. Export all deployments to an XML file
2. Import the XML file in Excel
3. Report on the data using a pivot table



![](/docs/images/3048153/3278122.png?effects=border-simple,blur-border,tape)

## Export all deployments to an XML file


Before we can report on the data using Excel, we need to export it in a format that Excel can import. The easiest way to do this is using an XML file.


As of 2.5.10, Octo.exe can be used to export deployments to an XML file. The command looks like this:

```bash
octo.exe dump-deployments --server http://your-octopus --apiKey API-YOURAPIKEY1234 --filePath=Deployments.xml
```

:::success
Learn more about [how to create an API key](/docs/home/how-to/how-to-create-an-api-key.md), and [how to use Octo.exe](/docs/home/api-and-integration/octo.exe-command-line.md)
:::


The output will appear as follows:

```powershell
Handshaking with Octopus server: https://demo.octopusdeploy.com
Handshake successful. Octopus version: 2.5.9.554; API version: 3.0.0
Listing projects
Listing project groups
Listing environments
Dumping deployments...
Wrote 30 of 112 deployments...
Wrote 60 of 112 deployments...
Wrote 90 of 112 deployments...
Wrote 112 of 112 deployments...
```


The command will produce an XML file with contents similar to the following:

```xml
<Deployments>
  <Deployment>
    <Environment>Acceptance</Environment>
    <Project>OctoFX Trading Website</Project>
    <ProjectGroup>OctoFX</ProjectGroup>
    <Created>2014-10-08T14:10:25</Created>
    <Name>Deploy to Acceptance</Name>
    <Id>deployments-18046</Id>
  </Deployment>
  <Deployment>
    <Environment>Test</Environment>
    <Project>OctoFX Trading Website</Project>
    <ProjectGroup>OctoFX</ProjectGroup>
    <Created>2014-10-03T13:06:29</Created>
    <Name>Deploy to Test</Name>
    <Id>deployments-18044</Id>
  </Deployment>
  .....
```


This file is now ready to be imported into Excel.

## Import the XML file in Excel


Now that we have an XML file containing our deployments, we can import it into Microsoft Excel. In this example we are using Excel 2013.

1. Open Microsoft Excel, and create a new, blank workbook
2. On the **Data** ribbon tab, click **From Other Sources**, then choose **From XML Data Import**. 
![](/docs/images/3048153/3278132.png)
3. Excel will prompt you that the XML file does not refer to a schema, and that one will be created. Click **OK**.
4. Excel will ask you where to create a table. Choose the location in your workbook to put the new table, or just click **OK**.
5. You should now have a table that lists each of the deployments you have performed with Octopus, along with the name of the environment, project and the date of the deployment. 
![](/docs/images/3048153/3278131.png)


## Report on the data using a pivot table


It's easy to turn the table of deployments into a pivot table for reporting.

1. Select any cell in the table, then from the **Insert** ribbon tab, click **PivotTable**. 
![](/docs/images/3048153/3278130.png)
2. Excel will prompt you to ask where to place the new pivot table. Click **OK** to add it to a new worksheet in your workbook.
3. You can now build the pivot table by dragging fields into the **Rows** or **Columns** of the pivot table.



For example, here's a breakdown of deployments by environment. Note that the **Id** field was dragged to the **Values** area, and **Environment** was dragged to **Rows**.


![](/docs/images/3048153/3278129.png)


Here's another example, this time using **Environment** as a column, and **Project** as the rows:


![](/docs/images/3048153/3278128.png)


You can also group the results by month or other measures of time. First, drag the **Created** field as as row.


![](/docs/images/3048153/3278127.png)


Now, right click any of the date values, and click **Group**.


![](/docs/images/3048153/3278126.png)


Choose the level of granularity that you want to group by, then click **OK**. In this example we chose Months.


![](/docs/images/3048153/3278125.png)


And the results will now be grouped by month:


![](/docs/images/3048153/3278124.png)


If you aren't happy with the order that environments or other items are shown in, you can right click and move them:


![](/docs/images/3048153/3278123.png)


Finally, don't forget to add pretty graphs!


![](/docs/images/3048153/3278122.png)

:::hint
**Limitations**
There are two major limits to this approach to be aware of:

1. As you have seen, only a small amount of data is available for use for reporting
2. If you use [retention policies](/docs/home/administration/retention-policies.md), releases and deployments that have been deleted by the retention policy will also not be available for reporting



We're working on a more integrated reporting solution, and making more data available, as part of Octopus 3.0.
:::
