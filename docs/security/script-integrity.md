---
title: Script integrity in Octopus Deploy
description: Script integrity is an interesting topic, especially in security sensitive situations. This page describes how scripting works in Octopus Deploy, interaction with PowerShell Execution Policies, and how to make Octopus work in restrictive environments.
position: 1
---

Octopus supports a wide variety of scripting languages and runtimes. Octopus executes your scripts as provided using the language and runtime best suited to the script in the host operating environment. The content of these scripts can come from a wide variety of sources, including:

- Built-in steps provided by Octopus.
- [Step templates contributed by the community and curated by Octopus](/docs/projects/community-step-templates.md).
- Your own [custom scripts](/docs/deployments/custom-scripts/index.md).
- Your own [custom script modules](/docs/deployments/custom-scripts/script-modules.md).
- Your own [custom step templates](/docs/projects/custom-step-templates.md).

Octopus lets you tailor these scripts to your needs at runtime using features like [dynamically substituting variables into your script files](/docs/projects/steps/configuration-features/substitute-variables-in-templates.md).

Once this is done Octopus will inject your script into a "bootstrapper" enabling friction free interaction with important Octopus features like [variables](/docs/projects/variables/index.md), [output variables](/docs/projects/variables/output-variables.md), and [artifacts](docs/projects/deployment-process/artifacts.md).

## Script integrity in Octopus

Octopus does not actively enforce script integrity.

- PowerShell is the only common scripting language which supports script integrity verification, but your scripts are [executed using -ExecutionPolicy Unrestricted](https://github.com/OctopusDeploy/Calamari/blob/b23ea09bd17a49fd2b0c9bae588ef1012db4f8c2/source/Calamari.Shared/Integration/Scripting/WindowsPowerShell/PowerShellBootstrapper.cs#L71).
- PowerShell Execution Policies alone are not a foolproof security solution, and can be thwarted quite simply: PowerShell will happily execute a script with malicious content as long as it meets the requirements of the Execution Policy.
- Octopus provides a lot of value to you by modifying your scripts on your behalf, which invalidates the signature of the original script.
- Octopus could dynamically re-sign the resulting script after modification, but this introduces extra complexity and additional security concerns for very little gain: the signed script has a very short life span.

### More on PowerShell execution policies and Octopus

Customers who use PowerShell will typically become aware of [Execution Policies](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies) early on. One question we are asked from time is how to make Octopus work in environments where the PowerShell Execution Policy is forced to `Restricted`, `AllSigned`, or `RemoteSigned`.

The short answer is: you cannot.

Requiring PowerShell scripts to be signed means:

1. Your server needs to trust the code-signing certificate used to sign the script.
2. The script can only be executed if it remains unchanged after it was signed.

When it comes to a trusted certificate chain this is a solvable problem. Think back to the different sources your scripts can come from:

- We could sign all our built-in scripts with our own code-signing certificate, and offer you a link to download the public certificate.
- We could sign any scripts we curate into the community library in a similar way.
- You could force your team to sign any custom scripts they author using your own trusted code-signing certificate.

Let's consider the next step: to provide value Octopus will modify the original script which invalidates the original signature... but what if Octopus could dynamically re-sign the modified script with a trusted certificate. We could make this work, but it does introduce additional complexity and security concerns:

1. You could provide Octopus with the public and private key pair for a code-signing certificate which is trusted by your servers.
2. Octopus would push that code-signing certificate onto the server where the script will be modified and executed, which introduces a security concern: anyone with access to that server could sign a script containing malicious content.

At this point we do not see the genuine value proposition in supporting a feature like this.

## Recommendations

Set your PowerShell Execution Policy for general user accounts to one of the more restrictive options, but allow the Octopus user account to use the `Unrestricted` security policy.

If this approach doesn't feel like it will work, and script integrity is a real problem for you please [get in touch with us](https://octopus.com/support). We would be very happy to help find an acceptable solution for your specific situation.

In case you want to read further and consider other options for securing your Octopus installation:

- Octopus provides a robust and detailed security model allowing you to control who has access to certain projects, environments, tenants, and ultimately which people can author the scripts which are executed by Octopus on your behalf. Learn about [managing users and teams](/docs/security/users-and-teams/index.md).
- Most Octopus customers use source control systems to track changes to all their scripts, using a trusted chain of authority to embed those scripts into the packages which are used by Octopus.
- Octopus provides detailed auditing enabling post-emptive analysis of a person's activity including custom scripts authored as part of your deployment process. Learn about [auditing](/docs/security/users-and-teams/auditing/index.md).
