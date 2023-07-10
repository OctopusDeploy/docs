---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: License
description:  Import a license key
navOrder: 120
---

Use the license command to import a license key.

**License options**

```text
Usage: octopus.server license [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --licenseBase64=VALUE  Base64 encoded version of the license key XML
      --licenseFile=VALUE    Path to the file containing the license key XML
                               in plain text
      --skipLicenseCheck     Skips the license check when setting the license

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example supplies the license in a Base64 encoded string to use for the Octopus Server instance named `OctopusServer`:

```
octopus.server license --instance="OctopusServer" --licenseBase64="RXhhbXBsZVN0cmluZ1NpbXVsYXRpbmdMaWNlbnNlS2V5QXNCYXNlNjQ="
```

:::div{.warning}
Please note: the value used in the `--licenseBase64` here is not a valid license key for use with Octopus.
:::

This example supplies the license in a file named `octopus-server-licensekey.xml` to use for the Octopus Server instance named `OctopusServer`:

```
octopus.server license --instance="OctopusServer" --licenseFile="C:\temp\octopus-server-licensekey.xml"
```

This example supplies the license in a file named `octopus-server-licensekey.xml` to use for the Octopus Server instance named `OctopusServer`, skipping the license check when setting it:

```
octopus.server license --instance="OctopusServer" --licenseFile="C:\temp\octopus-server-licensekey.xml" --skipLicenseCheck
```
