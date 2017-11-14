1. Go to {{Infrastructure,Deployment Targets}} and click **Add deployment target** in the environment where you want to create the cloud region.

2. Select **Cloud Region** from the list of available deployment target types.

![](images/adding-new-cloud-region.png "width=500")

3. Give the cloud region a name and select the roles for the cloud region.

![](images/adding-new-cloud-region-part2.png "width=500")

4. Now you can see the cloud regions in the {{Infrastructure,Deployment Targets}} page, just like the other deployment targets.

![](images/cloud-region-list.png "width=500")

5. To make use of your cloud regions you should scope region-specific variables to them appropriately.

![](images/project-with-cloud-region-scoped-variables.png "width=500")

6. Now when you deploy your application, the appropriate steps will run once per region.

![](images/cloud-region-deployment-complete.png "width=500")