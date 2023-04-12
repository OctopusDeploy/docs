It's possible to use [variable filters](/docs/projects/variables/variable-filters/) to help create both complex run conditions and variable expressions, but there are limitations to be aware of.

:::warning
Using variable filters *inline* in the two [conditional statements](/docs/projects/variables/variable-substitutions.md#VariableSubstitutionSyntax-Conditionalsconditionals) `if` and `unless` are **not supported**.
:::

If you wanted to include a variable run condition to run a step *only* when the release had a prerelease tag matching `mybranch`, you might be tempted to use the `VersionPreReleasePrefix` [extraction filter](/docs/projects/variables/variable-filters.md#VariableSubstitutionSyntax-ExtractionFilters) to write a condition like this:

```
#{if Octopus.Release.Number | VersionPreReleasePrefix == "mybranch"}true#{/if}
```
However, the evaluation of the statement would always return `False` as the syntax is not supported.

Instead you need to create a variable that includes the variable filter you want to use. For this example, lets assume it's named `PreReleaseBranch` with the value:

```
#{Octopus.Release.Number | VersionPreReleasePrefix}
```

Once you have created your variable, you can use it in your run condition like this:

```
#{if PreReleaseBranch == "mybranch"}True#{/if}
```