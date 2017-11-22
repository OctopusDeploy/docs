1. Go to *Environments* and click **Add deployment target** in the environment where you want to create the cloud region.

2. Select **Cloud Region** from the list of available deployment target types.

![](https://i.octopus.com/blog/201604-2016-04-0715_35_30-cloud_region_target-PEQY.png "width=500")

3. Give the cloud region a name and select the roles for the cloud region.

![](https://i.octopus.com/blog/201604-2016-04-0715_40_07-cloud_region_details-TSJY.png "width=500")

4. Now you can see the cloud regions in the *Environments* page, just like the other deployment targets.

![](https://i.octopus.com/blog/201604-2016-04-0715_48_45-cloud_target_environment-VRKV.png "width=500")

5. To make use of your cloud regions you should scope region-specific variables to them appropriately.

![](https://i.octopus.com/blog/201604-2016-04-0722_48_54-cloud_region_variables-4L36.png "width=500")

6. Now when you deploy your application, the appropriate steps will run once per region.

![](https://i.octopus.com/blog/201604-2016-04-0723_25_07-cloud_region_deploy_log-ZR4J.png "width=500")
