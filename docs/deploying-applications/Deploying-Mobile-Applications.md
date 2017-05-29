---
title: Deploying Mobile Applications
description: Useful information on deploying mobile applications to iOS/Android using Octopus Deploy.
position: 20
---

## Deploying mobile applications to iOS/Android.

We often get asked how you can use Octopus to deploy your iOS/Android applications. While we do not currently have `Out Of Box` support for iOS/Android apps, we can provide some pointers and recommendations that we have heard from our customers. Generally, its recommended to deploy iOS/Android apps to Apple/Google for review and deploy any supporting web services/databases/infrastructure at the same time. This co-ordination is the key value of using Octopus to version your releases and deploy your mobile app.


## Using HockeyApp to deploy your apps for testing/distribution.

On our community library, we have a step template [HockeyApp - Upload Mobile App](https://library.octopusdeploy.com/step-templates/5667710e-60b8-4067-bfa5-87196faafdda/actiontemplate-hockeyapp-upload-mobile-app), which is designed to help you automate your deployment to HockeyApp.
>This script uploads a new version of an existing app package to the HockeyApp services.

This template will let you push your app to the HockeyApp service and define the required HockeyApp parameters.


## Using fastlane to deploy your apps for testing/distribution 

The next option we can suggest looking into is Fastlane. This solution involves packaging and pushing your mobile apps to Octopus and then using fastlane to submit/deploy them to Apple/Google. You can read more about this at https://fastlane.tools/

Using fastlane to submit iOS/Android apps will require adding an SSH account to connect to `macOS` or `Linux with Ruby 2.0.0 or above`, you will then need to write a bash script to execute fastlane. For more information on using fastlane, you can check out their [Documentation](https://docs.fastlane.tools/)

:::hint
These are the two best current methods we know of for deploying iOS/Android apps. However, Octopus is capable of orchestrating your deployment via [Custom Scripts](https://octopus.com/docs/deploying-applications/custom-scripts) and the deployment/transfer of packages. So even if there are no templates available, as long as your application can be manually deployed/configured via script, you can use Octopus to deploy it.
:::
