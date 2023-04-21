---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Release versioning
description: Select how the next release number is generated when creating a release.
navOrder: 125
---
You can define how the next release number will be generated when creating a release.

Navigate to the **Project** tab, select the project and click **Deployments ➜ Settings ➜ Release Versioning**:

![Release Versioning](/docs/releases/images/release-versioning.png "width=500")

You can use variables from the project (un-scoped or scoped only to a channel). In addition, some special variables are provided - example:

```
1.2.#{Octopus.Version.NextPatch}-pre
```

These special variables take the form:

```
Octopus.Version.(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)
```

If you are using channels, channel-specific special variables are also available:

```
Octopus.Version.Channel.(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)
```

Version components from other channels in the project can be referenced using the channel name as the index:

```
Octopus.Version.Channel[ChannelName].(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)
```

The channel name can also be used (generally as part of the suffix):

```
Octopus.Release.Channel.Name
```

The version can also include Octopus *semantic version mask* characters i and c referring to the **incremented** and **current** values of the version, respectively. For example:

```
2.1.c.i
```

Finally, date fields can be also be used, for example:

```
#{Octopus.Date.Year}.#{Octopus.Date.Month}.#{Octopus.Date.Day}
```

These take the form:

```
Octopus.Date.(Day|Month|Year|DayOfYear)
Octopus.Time.(Hour|Minute|Second)
```

## Complex Expressions

The full power of the [Octopus variable syntax](/docs/projects/variables/variable-substitutions/#complex-syntax) (powered by [Octostache](https://github.com/OctopusDeploy/Octostache)) is available in version templates.  In particular, [conditional expressions](/docs/projects/variables/variable-substitutions/#VariableSubstitutionSyntax-Conditionalsconditionals) can be used to model some complex scenarios. 

### Example: Date with incrementing revision

A relatively common versioning scheme is: 

```
YEAR.MONTH.DAY.REVISION
```

where `REVISION` starts at 0 each day and increments with each release. i.e. The releases on one day might be `2020.10.2.0`, `2020.10.2.1`, `2020.10.2.2` ... and the following day may be: `2020.10.3.0`, `2020.10.3.1` etc.   

This can be achieved using the following expression:

```
#{Octopus.Date.Year}.#{Octopus.Date.Month}.#{Octopus.Date.Day}.
#{if Octopus.Date.Day==Octopus.Version.LastPatch}
#{Octopus.Version.NextRevision}
#{else}
#{if Octopus.Version.LastRevision!=0}
0
#{else}
#{Octopus.Version.NextRevision}
#{/if}#{/if}
```

The expression above is equivalent to:

```
#{Octopus.Date.Year}.#{Octopus.Date.Month}.#{Octopus.Date.Day}.i
```

The difference is that the `i` is not replaced until the release is saved where the complex expression will show the next increment number before it is saved.
