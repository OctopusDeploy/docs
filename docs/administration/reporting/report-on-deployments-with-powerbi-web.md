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
 - Windows Credentials
 - Username and Password
 - Web API by using your API key
 - Organization account, which would likely be your Azure Active Directory account, as long as you had [Azure Active Directory](/docs/security/authentication/azure-ad-authentications) enabled.

4. Once you've decided what authentication to use, you will then be able to establish a connection to your Octopus Reporting endpoint. This may take some time to load particularly when running remotely on an Octopus Server with several years worth of data, and it may also slow Octopus down for other users. 

   ![](images/PowerBI-Step4.png "width=500")
