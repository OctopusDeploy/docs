---
title: Release Versioning
description: Select how the next release number is generated when creating a release.
position: 125
---
You can define how the next release number will be generate when creating a release.

Navigate to the **Project** tab, select the project and click **{{Settings,Release Versioning}}**:

![Release Versioning](images/release-versioning.png)

You can use variables from the project (un-scoped or scoped only to a channel). In addition, some special variables are provided - example:

```text
1.2.#{"{"}Octopus.Version.NextPatch{"}"}-pre
```

These special variables take the form:

```text
Octopus.Version.(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)
```

If you are using channels, channel-specific special variables are also available:

```text
Octopus.Version.Channel.(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)
```

Version components from other channels in the project can be referenced using the channel name as the index:

```text
Octopus.Version.Channel[ChannelName].(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)
```

The channel name can also be used (generally as part of the suffix):

```text
Octopus.Release.Channel.Name
```

The version can also include Octopus *semantic version mask* characters i and c referring to the **incremented** and **current** values of the version, respectively. For example:

```text
2.1.c.i
```

Finally, date fields can be also be used, for example:

```text
#{"{"}Octopus.Date.Year}.#{"{"}Octopus.Date.Month{"}"}.#{"{"}Octopus.Date.Day{"}"}
```

These take the form:

```text
Octopus.Date.(Day|Month|Year|DayOfYear)
Octopus.Time.(Hour|Minute|Second)
```
</div>
