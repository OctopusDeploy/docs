If you have a lot of projects using a step template, updating them one by one can be time consuming.  Fortunately,  there is a way to update all of them at once. To do that, navigate to {{Library,Step templates, Name of the Step Template, Usage}}. 

Once you are there you should see a list of steps that are using the step template. The steps that are not on the latest version will have `Update` action next to them. Steps can be updated individually or all at once by using `Update all` action. 

![Step Template Usage](step-templates-usage.png "width=500")

In most cases the steps will be updated automatically but there will be cases when the update process will need some input from you. This is a powerful feature and we want to make sure we are not going break your deployments. When this happens we will do our best to make sure you only have to update manually the steps that need it. All other steps will have an option to be updated automatically.

![Steps that can be updated automatically](step-templates-update-all-auto.png "width=500")

#### Merge conflicts caused by new step template parameters

One of the cases when we will need your assistance is when If you add a new parameter without a default value. There is a reason why a new parameter is added and if we updated steps without having a default value we can break your deployments. This is why we ask you to provide default values that are missing or to confirm that you are ok to use `empty` values as default values.

![Steps that need default values](step-templates-update-all-defaults.png "width=500")

#### Merge conflicts caused by unsafe changes to the step template

When you make a change to a step template that we can't apply automatically we will ask you update each step manually. This should not happen often but when a type of a parameter changes or we don't have the pervious version of the step template we need you to tell us what the correct merge looks like.  

![Steps that need to update manually](step-templates-update-all-manual.png "width=500")

#### Manual merge

The manual merge process shows you the current values of the step properties and what we think the new values should be. The new values are editable and you can change them if they are incorrect. 

![Steps that need to update manually](step-templates-update-all-manual-merge.png "width=500")