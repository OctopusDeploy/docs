---
title: Octopus versioning scheme
description: Details of the versioning scheme used by Docker feeds
position: 4
---

Docker image tags are used to define version information. However, aside from the convention that the `latest` tag indicates the default image available, Docker tags do not inherently define any relationship between "versions".

It is common practice to assign meaningful versions to Docker tags, and when a Docker image is used in the context of an Octopus deployment, these versions are used to select the latest available image, and restrict images using version ranges.

Starting with 2020.6, Octopus introduced a new, permissive versioning scheme for parsing Docker tags that allows almost any string to be interpreted as a comparable version. 

:::hint
Prior to 2020.6, Octopus only recognized Docker image tags that complied with the Semantic Versioning standard.
:::

The following [regular expression](https://oc.to/OctopusVersionRegex/) defines how docker tags are parsed into version components:

```
^(?:(?<prefix>v|V)?(?<major>\d+)(?:\.(?<minor>\d+))?(?:\.(?<patch>\d+))?(?:\.(?<revision>\d+))?)?(?:[.\-_])?(?<prerelease>(?<prereleaseprefix>[^+.\-_\s]*?)([.\-_](?<prereleasecounter>[^+\s]*?)?)?)?(?:\+(?<buildmetadata>[^\s]*?))?$
```

The version string can start with an optional "v" or "V".

The four optional leading integers define the version major, minor, patch and release. These integers are separated by a dot.

The prerelease label captures all characters, excluding the plus symbol, after an optional dot, dash or underscore separator.

The metadata field captures any characters after a plus symbol. Note however that [Docker tags can not include the plus character](https://oc.to/DockerTags), and so can not define a metadata component. The metadata field has been defined for future use.

This versioning scheme allows for traditional labels like `1.0` or `V1.2.3.4`. A string with no integer components, like `myversion`, is captured in the prerelease label, and assumed to have a major, minor, patch and revision of `0.0.0.0`.

## Examples

| Label   | Major  | Minor | Patch | Revision | Prerelease | Note |
|---|---|---|---|---|---|---|
| 1.0   | 1  | 0 | 0 | 0 |  |  |
| v1.0   | 1  | 0 | 0 | 0 |  |  |
| V1.0   | 1  | 0 | 0 | 0 |  |  |
| 1.0-myfeature   | 1  | 0 | 0 | 0 | myfeature | |
| 1.0myfeature   | 1  | 0 | 0 | 0 | myfeature | The separator between the last integer version component and the prerelease label is optional. |
| myfeature   | 0  | 0 | 0 | 0 | myfeature | Integer version components are optional. |
| latest | 0 | 0 | 0 | 0 | latest | The latest tag is considered to be a zero version with `latest` as the prerelease. |

## Version rules

Docker image tags can be matched by a channel version rule. The NuGet version range syntax is applied to a Docker image, with the following caveats:

* Any leading periods in the Docker tag prerelease label are treated as dashes.
* The leading "v" is ignored.
* Versions with no major, minor, patch or revision components are treated as version `0.0.0.0` (while retaining the prerelease label).

| Version   | Range  | Notes |
|---|---|---|
| v1.0 | [1.0,2.0] | The leading "v" is ignored in the range. |
| v1.0-.myfeature | [1.0--myfeature,2.0] | The leading dot in the prerelease field is represented as a dash in the range. |
| myfeature | (,1.0) | The version `myfeature` is considered to be equivalent to `0.0.0.0-myfeature`. |

Pre-release tag regular expressions can be used to limit the tags that are made available when creating a new release. A common use case is to exclude the `latest` tag, which can be achieved with a regular expression like `^(?!latest\b).+$|^$`.

![](channel-rule.png "width=500")
