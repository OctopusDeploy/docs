:::hint
You can use [variable filters](https://octopus.com/docs/projects/variables/variable-filters) to help create complex run conditions and conditional variable evaluations. However, these filters must be applied using a project variable rather than evaluating them inline as a run condition.

For example, if you wanted to run a step when the release had a prerelease tag matching `mybranch`, you would set a project variable (for this example, we'll call it `PreReleaseBranch`) with the value `#{Octopus.Release.Number | VersionPreReleasePrefix}`. Then, you would use that evaluated variable in your run condition as `#{if PreReleaseBranch == "mybranch"}True#{/if}`.
:::