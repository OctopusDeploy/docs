---
title: Step Templates
description: Octopus step templates are reusable steps based on the built-in steps with your own specific parameters and instructions. 
position: 15
---

Octopus step templates are reusable steps based on the built-in steps with your own specific parameters and instructions.  Octopus supports two types of step templates.  Custom step templates and community step templates.

- Custom step templates are templates created within Octopus to encapsulate common steps/scenarios with a team or company.  Often they're built to encapsulate everything required to accomplish a task working with a specific framework or technology
- Community step templates are custom step templates that have shared for others to take advantage of

This page describes everything you need to know about step templates.

## Community step templates {#StepTemplates-Communitysteptemplates}

Community step templates are publically available step templates that are contributed and updated by the community. There is a growing number (over 200 at the time of writing this) of templates that can help you automate your deployment without writing any scripts yourself. The community step templates are third party code which is licensed under apache.

### The Community Library {#StepTemplates-TheCommunityLibrary}

Is there something Octopus doesn't support out-of-the-box? Take a look at the [Community Library](https://library.octopusdeploy.com/) which is full of step templates that have been contributed and are maintained by the Octopus community.

:::hint
Octopus 3.7 introduced integration with the Community Library and community contributed step templates are now synchronized with the Octopus server. This change makes it a quick and easy process to install and add community step templates. The import and export process is still available for older versions of Octopus.
:::

![](/docs/images/5671696/5866126.png "width=500")

Installing a community step template into Octopus is quick and easy.

- [Install and add a community step template directly from your project's deployment process](/docs/deploying-applications/adding-steps.md#Addingsteps-Addingacommunitycontributedsteptemplates)
- [Install a step template from the **Step templates** tab within the **Library** area](/docs/deploying-applications/step-templates.md#StepTemplates-InstallingasteptemplatefromtheCommunityLibrary)
- [Manually import a step template from the **Step templates** tab within the **Library** area](/docs/deploying-applications/step-templates.md#StepTemplates-ImportingasteptemplatefromtheCommunityLibrary)

It's also possible to create your own step templates.

### Installing a step template from the Community Library {#StepTemplates-InstallingasteptemplatefromtheCommunityLibrary}

To install a step template from the Community Library, perform the following.

1. Navigate to the **Step templates** tab in the **Library** area and select **Install** from the community step templates section  
    ![](/docs/images/5671696/5866132.png "width=500")
2. Search for a specific step template or browse the categories to find the template you want to use  
![](/docs/images/5671696/5866128.png "width=500")
3. Select **Install** or view the details of the step  
![](/docs/images/5671696/5866130.png "width=500")
4. To confirm, select **install**  
![](/docs/images/5671696/5866131.png "width=500")
5. Now you can add this new kind of step to your deployment process  
![](/docs/images/5671696/5866133.png "width=500")

### Importing a step template from the Community Library {#StepTemplates-ImportingasteptemplatefromtheCommunityLibrary}

If you don't have the Community Library feature turned on you can still use community step templates by manually importing the JSON from the [Community Library](http://library.octopusdeploy.com/) into the step template library within Octopus.

1. Navigate to the [Community Library](http://library.octopusdeploy.com/) website and find the template you want to use  
![](/docs/images/5671696/5866126.png "width=500")
2. Click on the **Copy to clipboard** button. *Step Templates are transported as a JSON document containing all of the information required by Octopus.*  
*![](/docs/images/5671696/5866135.png "width=500")*
3. Navigate to the **Step templates** tab in the **Library** area within the Octopus web portal and select **Import** from the custom step templates section  
![](/docs/images/5671696/5866134.png "width=500")
4. Paste in the JSON document for the Step Template and click the **Import** button  
![](/docs/images/3048081/5865525.png "width=500")
5. Now you can add this new kind of step to your deployment process  
![](/docs/images/5671696/5866151.png "width=500")

## Custom step step templates {#StepTemplates-Customstepsteptemplates}

Custom step templates can be based on a built-in or an installed community step template. These step templates can be reused in projects and managed in the step template library.

### Creating custom step templates {#StepTemplates-Creatingcustomsteptemplates}

Sometimes there isn't a step template for your situation available in the [Community Library](https://library.octopusdeploy.com/). Or perhaps several of your projects have similar or identical steps. You can create your own custom step templates to share with the community, or to reuse across your projects.

To create your own step template, perform the following.

1. Navigate to the **Step templates** tab in the **Library** area and click the **Add** button  
![](/docs/images/5671696/5866134.png "width=500")
2. Select a built-in step to base your custom step template on.  
![](/docs/images/5671696/5866153.png "width=500")
3. Populate the step template.   
![](/docs/images/5671696/5866154.png "width=500")

:::success
You can create Step Templates for any of the built-in step types provided by Octopus.
:::

There are three parts to any step template: step details, additional parameters, and settings.

#### Step {#StepTemplates-Step}

The Step tab is where you fill out the details of what the step will do. This tab gives you exactly the same fields as you would see if you added the step type directly to your project, so it will be the most familiar.

Any details that need to be specified at the project level can be handled using Parameters. Any parameters specified in the Parameters tab will be exposed to you as [variables](/docs/deploying-applications/variables/index.md) and can be used in the same way.

#### Parameters {#StepTemplates-Parameters}

The Parameters tab allows you to specify fields that will be filled out by the users of this step.

![](/docs/images/3048081/3277659.png "width=500")

You're required to give the parameter a variable name and label to use, as well as some optional help text and a default value.

Finally, you can choose the way the field will appear to a user with the **Control type** field. There are a number of options available, however keep in mind the end result will be a variable with a string value.

![](/docs/images/3048081/3277658.png "width=500")

Any variables you configure as Parameters will be available as variables that can be used in the Step tab of the step template.

#### Settings {#StepTemplates-Settings}

The Settings tab allows you to give your step a name and optional description.

#### Usage {#StepTemplates-Usage}

After saving your step, you'll notice another tab called Usage. This tab shows where the step is being used and whether the version being used is current or a previous version.

You'll also see a handy counter next to the Usage tab so you can see at a glance how many projects are out-of-date.

![](/docs/images/5671696/5866155.png "width=500")

### Custom logo {#StepTemplates-Customlogo}

:::hint
Custom logos are available in Octopus 3.7.0 or newer.
:::

Custom step templates inherit their logo from the template that was used to create them. This means that most of them will share the same logo. Fortunately this can be easily changed and each custom template can have its own unique logo. To do that navigate to the Settings tab and upload a custom logo from there.

![](/docs/images/5671696/5866188.png "width=500")

### Linking custom step templates to community step templates {#StepTemplates-Linkingcustomsteptemplatestocommunitysteptemplates}

:::hint
Custom logos are available in Octopus 3.7.0 or newer.
:::

Once a day Octopus retrieves the latest step templates from the [Community Library](https://library.octopus.com/). At the end of that process it also tries to link them to the existing custom templates which might have been imported manually in the past. Once the link is established the custom template can receive updates directly from the [Community Library](https://library.octopus.com/). In Octopus 3.7.0 the link is created only when the custom template and the community template are identical. We decided to be strict to make sure we don't cause trouble by linking wrong templates together. Then we learned that the Import process in Octopus doesn't preserve the Version property which means none of the existing custom templates will be linked. In Octopus 3.7.2 we made this process a bit less strict and now the Version property doesn't have to match. We believe that if all other properties (except Version) match then we still are safe to link templates.

If the linking process is not linking a template that you believe should be linked then more than likely you don't have the very latest version of the template. The easiest way to fix this problem is to manually update the template with the data from the [Community Library](https://library.octopus.com/).

:::hint
Name, all Parameters and Script Body property have to match for the linking process to consider two templates identical.
:::

### Running script based custom step templates {#StepTemplates-Runningscriptbasedcustomsteptemplates}

Octopus 3.7 introduced the ability to run script based custom step templates on a group of machines. This can be very handy to execute script based step templates to test them before starting to use them in your projects as well as performing regular admin or operations functions. This should be familiar to people who have used the script console (link) in the past.

:::hint
It's important to note that you can only run script based custom step templates. It's not currently possible to execute step templates based off other step types.
:::

To run a script based step template, perform the following.

1. Navigate to the **Step templates** tab in the **Library** area and click the **Run** button next to the script based custom step template or alternately, select a script template and click the **Run** button from the template editor page  
![](/docs/images/5671696/5866142.png "width=500")
2. Select a group of targets to run the step on. This can be done by target name or by environments and roles.  
![](/docs/images/5671696/5866143.png "width=500")
3. Enter any required parameters  
![](/docs/images/5671696/5866144.png "width=500")
4. Click the **Run now** button. This will execute the step as a new task and provide the full script.   
![](/docs/images/5671696/5866145.png "width=500")
![](/docs/images/5671696/5866146.png "width=500")
![](/docs/images/5671696/5866147.png "width=500")

To re-run the script against different deployment targets or modify the input parameters, simply click the **Modify and re-run** button.

## Other {#StepTemplates-Other}

### Updating step templates {#StepTemplates-Updatingsteptemplates}

:::warning
Step Templates are effectively copied to projects using them. That means if you update a step template, you'll need to update the step in the project using it for your changes to have an effect.
:::

If your project is using an out-of-date step template, you will see a warning when editing that step in the deployment process of your project. You can click the **Update** button to start using the latest version.

![](/docs/images/5671696/5866156.png "width=500")

:::success
If you have a lot of projects using Step Templates, updating them can be time consuming. We are planning to make this much easier, but until then you should consider the [BlueFin Chrome extension for Octopus](http://bluefin.teapotcoder.com/) which allows you to update a Step Template across all of your projects.
:::

### Exporting step templates {#StepTemplates-Exportingsteptemplates}

If you want to transport, backup, or share your Step Templates with the community, you can export a template by finding your template in Library > Step templates, and clicking the **Export** link.

![](/docs/images/5671696/5866157.png "width=500")

Now you can take that exported template document and commit it to source control, or share it on the [Community Library](https://library.octopusdeploy.com/).

:::success
Take a look at the [contributing guide](https://github.com/OctopusDeploy/Library/blob/master/CONTRIBUTING.md) for the Community Library and submit your step template as a [pull request](https://github.com/OctopusDeploy/Library/pulls).
:::
