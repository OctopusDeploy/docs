---
title: Using a Managed Service Account (MSA)
description: Run Octopus using a Managed Service Account.
position: 5
---
You can run the Octopus Server using a Managed Service Account (MSA):

1. Install the Octopus Server and make sure it is running correctly using one of the built-in Windows Service accounts or a Custom Account.
1. Reconfigure the Octopus Server Windows Service to use the MSA, either manually using the Service snap-in, or using `sc.exe config "OctopusDeploy" obj= Domain\Username$`.
1. Restart the Octopus Server Windows Service.

Learn about [using Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd548356(v=ws.10).aspx).
