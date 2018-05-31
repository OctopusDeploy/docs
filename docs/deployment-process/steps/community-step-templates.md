---
title: Community Step Templates
description: How to take advantage of step templates contributed by the Octopus community
position: 1
---

Community step templates are publicly available step templates that are contributed and updated by the community. These are incredibly useful. If you can't find a built-in step template that includes the actions you need, check the community step template. There is a large number and variety of step templates (and it's growing all the time) that can help you automate your deployment without writing any scripts yourself. The community step templates are third party code which is licensed under [the Apache 2.0 license](https://github.com/OctopusDeploy/Library/blob/master/LICENSE.txt).

Octopus community step templates integration was introduced in Octopus 3.7 and is enabled by default.

## Enable/Disable Community Step Templates Integration

1. Navigate to **{{Configuration,Features}}**.
2. Expand the **Octopus Community Step Template** section by clicking on it.
3. Toggle the selection to either **Enabled** or **Disabled**, and click **SAVE**.




## Adding a community contributed step templates {#Addingsteps-Addingacommunitycontributedsteptemplates}

The add step page also displays community contributed step templates available to install and add.  You can search for a specific template or you can browse through the categories.  Installing a community step template is easy.  Hover over a step and select Install and add step.  This will display a pop-up dialog where you can confirm to install and add the step.  This will take you to the configuration page for the step template.

![](install-community-step.png "width=300")

![](install-community-step-popup.png "width=500")

If you select view details, this will take you to the community step details page which shows you the complete details of the step include the source code.  You can install the step or go back to the list of steps.

![](install-community-step-details.png "width=500")

## Installing a step template from the Community Library {#StepTemplates-InstallingasteptemplatefromtheCommunityLibrary}

To install a step template from the Community Library, perform the following.

1. Navigate to {{Library, Step templates}} area and select **Install** from the community step templates section

![Install community step template](step-templates-install.png "width=500")

2. Search for a specific step template or browse the categories to find the template you want to use

![Search for community step template](step-templates-search-community.png "width=500")

3. Select **Install** or view the details of the step

![Install community step template](step-templates-install-community-template.png "width=500")

4. To confirm, select **install**

![Confirm installation](step-templates-confirm-installation.png "width=500")

5. Now you can add this new kind of step to your deployment process

![Step template installed](step-templates-community-template-installed.png "width=500")

## Importing a step template from the Community Library {#StepTemplates-ImportingasteptemplatefromtheCommunityLibrary}

If the Community Library feature has been disabled, you can still use community step templates by manually importing the JSON from the [Community Library](http://library.octopus.com/) into the step template library within Octopus.

1. Navigate to the [Community Library](http://library.octopus.com/) website, find the template you want to use and click on the **Copy to clipboard** button. *Step Templates are transported as a JSON document containing all of the information required by Octopus.*

![Import from community library](step-templates-import-from-community-library.png "width=500")

2. Navigate to {{Library,Step templates}} area within the Octopus web portal and select **Import** from the custom step templates section.
3. Paste in the JSON document for the Step Template and click the **Import** button.

![Content](step-templates-import-content.png "width=500")

4. Now you can add this new kind of step to your deployment process.

![Import confirmation](step-templates--step-template-import-confirmed.png "width=500")


## Adding an updated version of a community step template {#Addingsteps-Addinganupdatedversionofacommunitysteptemplate}

Sometimes updates are available for step templates.  In this case, you will notice the step template has an option to update the step.  If you select update, this will take you to the community step details with the option to update the latest version of the step template.  Community step templates can also be updated in the library as needed.

![](update-community-step.png)

![](update-community-step-details.png "width=500")
