---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-06-25
title: Report on deployments using Excel and XML
description: How to report on deployments using Excel and XML
navOrder: 10
---

Ever wonder how many deployments you did this month? We'll help you answer this question by walking you through how to export your deployments to Excel, and how to view them in a pivot table.

At a high-level, the steps are:

1. Export all deployments to an XML file.
2. Import the XML file in Excel.
3. Report on the data using a pivot table.

:::figure
![](/docs/administration/reporting/images/3278122.png)
:::

## Export all deployments to an XML file

Before we can report on the data using Excel, we need to export it in a format that Excel can import. The easiest way to do this is using an XML file.

As of 2.5.10, the Octopus CLI can be used to export deployments to an XML file. The command looks like this:

```bash
octo dump-deployments --server https://your-octopus-url --apiKey API-YOUR-KEY --filePath=Deployments.xml
```

:::div{.success}
Learn more about [how to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key/), and [how to use the Octopus CLI](/docs/octopus-rest-api/octopus-cli)
:::

The output will appear as follows:

```powershell
octo dump-deployments --server https://samples.octopus.app --apiKey API-GUEST --filepath C:\Development\Deployments.xml
Octopus Deploy Command Line Tool, version 7.3.2

Detected automation environment: "NoneOrUnknown"
Space name unspecified, process will run in the default space context
Handshaking with Octopus Server: https://samples.octopus.app
Handshake successful. Octopus version: 2020.2.9; API version: 3.0.0
Authenticated as: Guest
Listing projects, project groups and environments
Dumping deployments...
Wrote 30 of 72 deployments...
Wrote 60 of 72 deployments...
Wrote 72 of 72 deployments...
```

The command will produce an XML file with contents similar to the following:

```xml
<Deployments>
  <Deployment>
    <Environment>Production</Environment>
    <Project>Web App</Project>
    <ProjectGroup>Deployment - Orchestration</ProjectGroup>
    <Created>2020-05-15T17:07:47</Created>
    <Name>Deploy to Production</Name>
    <Id>Deployments-4992</Id>
  </Deployment>
  <Deployment>
    <Environment>Production</Environment>
    <Project>All OctoPetShop</Project>
    <ProjectGroup>Deployment - Orchestration</ProjectGroup>
    <Created>2020-05-15T17:07:23</Created>
    <Name>Deploy to Production</Name>
    <Id>Deployments-4991</Id>
  </Deployment>
  .....
```

This file is now ready to be imported into Excel.

## Import the XML file in Excel

Now that we have an XML file containing our deployments, we can import it into Microsoft Excel. In this example we are using Excel 2013.

1. Open Microsoft Excel, and create a new, blank workbook.
2. On the **Data** ribbon tab, click **From Other Sources**, then choose **From XML Data Import**. 

   ![](/docs/administration/reporting/images/3278132.png)
3. Excel will prompt you that the XML file does not refer to a schema, and that one will be created. Click **OK**.
4. Excel will ask you where to create a table. Choose the location in your workbook to put the new table, or just click **OK**.
5. You should now have a table that lists each of the deployments you have performed with Octopus, along with the name of the environment, project and the date of the deployment. 

   ![](/docs/administration/reporting/images/3278131.png)

## Report on the data using a pivot table

It's easy to turn the table of deployments into a pivot table for reporting.

1. Select any cell in the table, then from the **Insert** ribbon tab, click **PivotTable**. 

   ![](/docs/administration/reporting/images/3278130.png)

2. Excel will prompt you to ask where to place the new pivot table. Click **OK** to add it to a new worksheet in your workbook.
3. You can now build the pivot table by dragging fields into the **Rows** or **Columns** of the pivot table.

For example, here's a breakdown of deployments by environment. Note that the **Id** field was dragged to the **Values** area, and **Environment** was dragged to **Rows**.

:::figure
![](/docs/administration/reporting/images/3278129.png)
:::

Here's another example, this time using **Environment** as a column, and **Project** as the rows:

:::figure
![](/docs/administration/reporting/images/3278128.png)
:::

You can also group the results by month or other measures of time. First, drag the **Created** field as as row.

:::figure
![](/docs/administration/reporting/images/3278127.png)
:::

Now, right click any of the date values, and click **Group**.

:::figure
![](/docs/administration/reporting/images/3278126.png)
:::

Choose the level of granularity that you want to group by, then click **OK**. In this example we chose Months.

:::figure
![](/docs/administration/reporting/images/3278125.png)
:::

And the results will now be grouped by month:

:::figure
![](/docs/administration/reporting/images/3278124.png)
:::

If you aren't happy with the order that environments or other items are shown in, you can right click and move them:

:::figure
![](/docs/administration/reporting/images/3278123.png)
:::

Finally, don't forget to add pretty graphs!

:::figure
![](/docs/administration/reporting/images/3278122.png)
:::

:::div{.hint}
**Limitations**
There are two major limits to this approach to be aware of:

1. As you have seen, only a small amount of data is available for use for reporting.
2. If you use [retention policies](/docs/administration/retention-policies), releases and deployments that have been deleted by the retention policy will also not be available for reporting.
:::

## Learn more

- [Reporting blog posts](https://octopus.com/blog/tag/reporting).
