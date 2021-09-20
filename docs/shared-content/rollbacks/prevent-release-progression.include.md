Blocking Release Progression is an optional step to add to your rollback process.  [The Block Release Progression](https://library.octopus.com/step-templates/78a182b3-5369-4e13-9292-b7f991295ad1/actiontemplate-block-release-progression) step template uses the API to [prevent the rolled back release from progressing](/docs/releases/prevent-release-progression.md).

This step will only run on a rollback; set the run condition for this step to:

```
#{Octopus.Action[Calculate Deployment Mode].Output.RunOnRollback}
```

To unblock that release, go to the release page and click the **UNBLOCK** button.