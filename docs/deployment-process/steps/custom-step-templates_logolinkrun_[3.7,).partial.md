### Custom logo {#StepTemplates-Customlogo}

Custom step templates inherit their logo from the template that was used to create them. This means that most of them will share the same logo. Fortunately this can be easily changed and each custom template can have its own unique logo. To do that navigate to the Settings tab and upload a custom logo from there.

![Step template custom log](step-templates-custom-logo.png "width=500")

### Linking custom step templates to community step templates {#StepTemplates-Linkingcustomsteptemplatestocommunitysteptemplates}

Once a day Octopus retrieves the latest step templates from the [Community Library](https://library.octopus.com/). At the end of that process it also tries to link them to the existing custom templates which might have been imported manually in the past. Once the link is established the custom template can receive updates directly from the [Community Library](https://library.octopus.com/). In Octopus 3.7.0 the link is created only when the custom template and the community template are identical. We decided to be strict to make sure we don't cause trouble by linking wrong templates together. Then we learned that the Import process in Octopus doesn't preserve the Version property which means none of the existing custom templates will be linked. In Octopus 3.7.2 we made this process a bit less strict and now the Version property doesn't have to match. We believe that if all other properties (except Version) match then we still are safe to link templates.

If the linking process isn't linking a template that you believe should be linked then more than likely you don't have the very latest version of the template. The easiest way to fix this problem is to manually update the template with the data from the [Community Library](https://library.octopus.com/).

:::hint
Name, all Parameters and Script Body property have to match for the linking process to consider two templates identical.
:::

### Running script based custom step templates {#StepTemplates-Runningscriptbasedcustomsteptemplates}

Octopus 3.7 introduced the ability to run script based custom step templates on a group of machines. This can be very handy to execute script based step templates to test them before starting to use them in your projects as well as performing regular admin or operations functions. This should be familiar to people who have used the script console (link) in the past.

:::hint
It's important to note that you can only run script based custom step templates. It's not currently possible to execute step templates based off other step types.
:::

To run a script based step template, perform the following.

1. Navigate to {{Library,Step templates}} area and click the **Run** button next to the script based custom step template or alternately, select a script template and click the **Run** button from the template editor page
   ![Run step template](step-templates-run.png "width=500")
2. Select a group of targets to run the step on. This can be done by target name or by environments and roles.
   ![Select run targets](step-templates-run-targets.png "width=500")
3. Enter any required parameters
   ![Enter parameter values](step-templates-run-parameters.png "width=500")
4. Click the **Run now** button. This will execute the step as a new task and provide the full script. 
   ![Task summary](step-templates-run-task-summary.png "width=500")
   ![Task log](step-templates-run-task-log.png "width=500")
   ![Task parameters](step-templates-run-task-parameters.png "width=500")

To re-run the script against different deployment targets or modify the input parameters, simply click the **Modify and re-run** button.
