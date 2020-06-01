---
title: Report on deployments using Excel & XML
description: How to report on deployments using Excel & XML
position: 11
---

:::hint
This works with Octopus Cloud and Octopus Server and is our recommended approach. 
::::

1. Go to the **Home** ribbon tab in PowerBI, then click **Get Data** and then select **Web**:

   ![](images/PowerBI-Step1.png "width=500")

2. The best way to consume reporting data from Octopus is using the XML feed. The feed is always available at:

`http://<OCTOPUS-SERVER>/api/reporting/deployments/xml?apikey=<API-KEY>`

Where:

- `<OCTOPUS-SERVER>` is the hostname of your Octopus Server
- `<API-KEY>` is one of [your API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)

For example:


`https://myoctopusserverurl.com/api/reporting/deployments/xml?apikey=API-1234567891234567891234567`

   ![](images/PowerBI-Step2.png "width=500")

3. You can use any of the following options to authenticate to your Octopus server.

 - Anonymous Authentication using Guest Access and you'll need to specify this by appending `apikey=API-GUEST` to the end of your Octopus URL. For example `https://demo.octopus.com/api/reporting/deployments/xml?apikey=API-GUEST`

   ![](images/3278358.png "width=500")

4. In the Select Data Source menu, instead of selecting a file, enter your reporting URL, then Open. To get your reporting URL, see the section below on **Using the XML Feed**.

   ![](images/3278360.png "width=500")

## Refreshing the data {#Reporting-Refreshingthedata}

Once you have set up your connection, you can refresh the data from the source whenever you like. If you make your own customizations to the spreadsheet, you can save them, and simply refresh the data in the sheet whenever you like.

![](images/3278361.png "width=500")