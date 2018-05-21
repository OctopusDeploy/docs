---
title: Release Versioning
description: Select how the next release number is generated when creating a release.
position: 125
---

Under Project settings there's a section for Release Versioning where you can select how the next release number is generated when creating a release.


![release_versioning](release-versioning.png "width=500")

<div>
    <p>You can use variables from the project (un-scoped or scoped only to a channel). In addition, some special variables are provided - example:
    </p>
    `1.2.#{"{"}Octopus.Version.NextPatch{"}"}-pre`
    <p>These special variables take the form:</p>
    `Octopus.Version.(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)`
    <p>If you are using channels, channel-specific special variables are
        also available: </p>
    `Octopus.Version.Channel.(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)`
    <p>Version components from other channels in the project can be
        referenced using the channel name as the index:</p>
    `Octopus.Version.Channel[ChannelName].(Last|Next)(Major|Minor|Patch|Build|Revision|Suffix)`
    <p>The channel name can also be used (generally as part of the
        suffix):</p>
    `Octopus.Release.Channel.Name`
    <p>The version can also include Octopus <em>semantic version mask</em> characters
        `i` and `c` referring to the <strong>i</strong>ncremented
        and <strong>c</strong>urrent values of the version, respectively. For example:
    </p>
    <pre>2.1.c.i</pre>
    <p>Finally, date fields can be also be used, for example: </p>
    <pre>#{"{"}Octopus.Date.Year}.#{"{"}Octopus.Date.Month{"}"}.#{"{"}Octopus.Date.Day{"}"}</pre>
    <p>These take the form:</p>
    `Octopus.Date.(Day|Month|Year|DayOfYear)`<br/>`Octopus.Time.(Hour|Minute|Second)`
</div>
