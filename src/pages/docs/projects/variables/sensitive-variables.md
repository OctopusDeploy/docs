---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Sensitive variables
description: Sensitive variables allow you to define secret values used in your applications that can be securely stored in Octopus, or retrieved from a Secret Manager/Key Vault using one of our community step templates.
navOrder: 50
---

As you work with [variables](/docs/projects/variables/) in Octopus, there will be times when you work with applications that require configuration values that are considered sensitive information. These should be kept secret, but used as clear-text during deployment. That could be a password or an API Key to an external resource. Octopus provides support for this scenario with **Sensitive variables**.

Sensitive variables can be sourced from either:

- A Secret Manager/Key Vault using one of our Community step templates.
- Octopus itself, with values stored securely using **AES128 encryption**.

## Values from a Secret Manager/Key Vault {#Sensitivevariables-in-keyvaults}

Storing sensitive values in Octopus solves many problems, but it's [not a two-way key vault](#Sensitivevariables-HowOctopushandlesyoursensitivevariables). 
For this, there are a number of Secret Manager and Key Vault tools available. They also offer additional functionality such as automatic secret rotation and versioning.

Octopus supports the retrieval of sensitive values from a number of Secret Manager/Key Vaults through the use of [Community step templates](/docs/projects/community-step-templates/) that extend the functionality of Octopus to integrate with them.

![Aure Key Vault Retrieve Secrets step template](/docs/projects/variables/images/azure-keyvault-retrieve-secrets-step-in-process.png "width=500")

Each of the community step templates work by retrieving secrets from the Secret Manager/Key Vault and create [sensitive output variables](/docs/projects/variables/output-variables/#sensitive-output-variables) for use in your executing deployments and runbooks.

Octopus has the following community step templates for integrating with Secret Manager/Key Vault tools:

- [AWS Secret Manager](https://octopus.com/blog/using-aws-secrets-manager-with-octopus)
- [Azure Key Vault](https://octopus.com/blog/using-azure-key-vault-with-octopus)
- [CyberArk Conjur](https://library.octopus.com/step-templates/522c7010-7189-4b2e-a3c8-36cb1759422a/actiontemplate-cyberark-conjur-retrieve-secrets)
- [GCP Secret Manager](https://octopus.com/blog/using-google-cloud-secret-manager-with-octopus)
- [HashiCorp Vault](https://octopus.com/blog/using-hashicorp-vault-with-octopus-deploy)

:::success
View working examples of all of our Secrets Management community step templates in our [samples instance](https://samples.octopus.app/app#/Spaces-822) of Octopus. You can sign in as `Guest` to view them.
:::

**Note:** If you choose to use one of the community step templates, it's important to consider who has permission to edit a project deployment or runbook process, and manage step templates to prevent unauthorized access to sensitive values stored in your Secret Manager/Key Vault.

## Sensitive variables stored in Octopus {#Sensitivevariables-in-octopus}

Variables, such as passwords or API keys can be marked as **sensitive**. 

Just like non-sensitive variables they can [reference other variables](/docs/projects/variables/#Bindingsyntax-Referencingvariablesinstepdefinitions) but be careful with any part of your sensitive variable that could [unintentionally be interpreted](/docs/projects/variables/sensitive-variables/#Sensitivevariables-Avoidingcommonmistakes-SubstituionSyntax) as an attempted substitution. See also, other [common mistakes](#Sensitivevariables-Avoidingcommonmistakes).

### Configuring sensitive variables {#Sensitivevariables-Configuringsensitivevariables}

To make a variable a **sensitive variable**, either select **Change Type** when entering the value and select **Sensitive**, or enter the variable editor when you are creating or editing the variable. 

If using the variable editor, on any of the variable fields, click **OPEN EDITOR**:

![Open Variable Editor](/docs/projects/variables/images/open-variable-editor.png "width=500")

For variable type, select **Sensitive**.

![Variable editor](/docs/projects/variables/images/variable-editor.png "width=500")

### How Octopus handles your sensitive variables {#Sensitivevariables-HowOctopushandlesyoursensitivevariables}

:::hint
Learn more about [security and encryption](/docs/security/data-encryption/) in Octopus Deploy.
:::

When dealing with sensitive variables, Octopus encrypts these values using **AES128 encryption** any time they are in transmission, or "at rest" like when they are stored in the Octopus database or staged on a deployment target as part of a deployment. You can use these sensitive values in your deployment process just like normal [variables](/docs/projects/variables/), with two notable exceptions:

- Once the variable is saved, Octopus will **never allow you to retrieve the value** via the [REST API](/docs/octopus-rest-api/) or the Octopus Web Portal; and
- Whenever possible, Octopus will **mask these sensitive values in logs**.

### Choosing which variables should be sensitive

Any value you want can be treated as a secret by Octopus. It is up to you to choose the most appropriate balance of secrecy and usability. As a rule of thumb, any individual value which should be encrypted, or masked in logs, should be made sensitive in Octopus.

The most straightforward example is a password or key. Make the password or key sensitive and it will be encrypted into the database and masked in the Octopus task logs.

Another common example is building a *composite* value using the [variable substitution syntax](/docs/projects/variables/variable-substitutions/), like a database connection string. Imagine a variable called `DB.ConnectionString` with the value:

`Server=#{DB.Server};Database=#{DB.Database};User=#{DB.Username};Password#{DB.Password};`

In this case you should at least make the `DB.Password` variable sensitive so it will be encrypted in the database and masked from any Octopus task log messages like this:

`Server=db01.mycompany.com;Database=mydatabase;User=myuser;Password=*****`. 

You could also make `DB.Username` or any of the other components of this template sensitive.

### Avoiding common mistakes {#Sensitivevariables-Avoidingcommonmistakes}

Here are some common pitfalls to avoid:

- **Avoid logging your sensitive values**: you won't really get any benefit from logging your sensitive variables since they will be masked by Octopus. The masking is in provided in case a downstream system logs the sensitive value inadvertently logging it to the Octopus deployment logs.
- **Avoid short values:** only sensitive variables with length **greater than 3** characters will be masked. This is done to prevent false positives causing excessive obfuscation of the logs. Consider 8-30 characters depending on the requirements of your deployment.
- **Avoid common language**: see the example below of "broke", use a password generator with high entropy [like this one](https://www.passwordsgenerators.net/).
- **Avoid sequences that are interpreted by your scripting language of choice**: For example, certain escape sequences like `$^` will be misinterpreted by PowerShell potentially logging out your sensitive variable in clear-text.
- **Sensitivity is not transitive/infectious**: For example, imagine you have a sensitive variable called `DB.Password` and another variable called `DB.ConnectionString` with the value `Server=#{DB.Server};...;Password=#{DB.Password}`; the `DB.ConnectionString` does not become sensitive just because `DB.Password` is sensitive. However, if you happen to write the database connection string to the task log, the password component will be masked like this `Server=db01.mycompany.com;...;Password=*****` which is probably the desired outcome.
- **Avoid mixing binding expressions and sensitivity**: For example, if you have a variable called `Service.Credential` with the value `Password=#{Service.Password}` and make that variable sensitive, Octopus treats the **literal** value `Password=#{Service.Password}` as sensitive instead of treating the **evaluated** value as sensitive, which might be different to what you would expect. Instead, you should make the variable called `Service.Password` sensitive so the password itself will be encrypted in the database, and subsequently masked in any logs like this `Password=*****`.
- **Avoid treating entire files as sensitive**: Imagine you're consuming a YAML file from a variable, and that YAML file contains a secret. Rather than treating the whole YAML file as sensitive, you should create two variables: one sensitive variable containing just the secret, and one non-sensitive variable for the YAML file which uses [variable substitution](/docs/projects/variables/variable-substitutions/) to substitute in the sensitive variable. This gives Octopus a much tighter scope when looking for sensitive variables to mask.
- **Avoid sequences that are part of the variable substitution syntax** {#Sensitivevariables-Avoidingcommonmistakes-SubstituionSyntax}: For example, the sequence `##{` will be replaced by `#{` by logic that's part of [referencing variables](/docs/projects/variables/#Bindingsyntax-Referencingvariablesinstepdefinitions) so you would need to escape it by modifying it to be `###{` which will result in `##{`, see also [variable substitution syntax](/docs/projects/variables/variable-substitutions/).
- **Octopus is not a 2-way key vault**: use a [Secret Manager/Key Vault](#Sensitivevariables-in-keyvaults) instead.

## Logging {#Sensitivevariables-LoggingLogging}

:::warning
Avoid logging sensitive values! Whilst Octopus will attempt to mask sensitive values, it is better there is no value to mask in the first place!
:::

Octopus/Tentacle will do its best to prevent sensitive values from inadvertently appearing in any logs. For example, if a custom PowerShell script accidentally did this:

```powershell
Write-Output "Hello, the password is $Password"
```

Octopus would mask the value from the deployment log, leaving:

```
Hello, the password is *****
```

Note that this method isn't 100% foolproof. Here are a couple of scenarios that you should be extra-careful about if logging sensitive variables:

### Common language in secrets
If your top secret password is "broke", and someone happened to deploy with a PowerShell script with:

```powershell
Write-Output "Or watch the things you gave your life to, broken"
```

Then the password might be given away when Octopus prints:

```powershell
Or watch the things you gave your life to, *******en
```

The obvious solution is, don't use passwords that are likely to occur in normal logging/language, and avoid writing the values of your secure variables to logs anyway.

### `echo` on Unix-based systems
It's very easy to [unintentionally modify a variable when using `echo`](https://stackoverflow.com/q/29378566/16866455), particularly if the variable contains new-lines or other escape characters.

In particular, you should [always use double-quotes](https://stackoverflow.com/a/29378567/16866455) around what you `echo`, to prevent unintended processing of variable contents.

For example, you should prefer this:

```bash
echo "$(get_octopusvariable 'SecretVariable')"
```

over this:

```bash
echo $(get_octopusvariable 'SecretVariable')
```

The second approach could trigger evaluation or stripping of special characters within the variable, and result in a log message sufficiently different to the sensitive variable's value that we are unable to match and mask it.

Of course, the best protection is not to `echo` potentially sensitive variables at all.

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
