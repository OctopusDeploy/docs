---
layout: src/layouts/Default.astro
pubDate: 2023-10-27
modDate: 2023-11-24
title: Username and password account variables
description: Create a Username and password account variable to use in any deployment step
navOrder: 90
---

[Username and password accounts](/docs/infrastructure/accounts/username-and-password/) can be referenced in a project through a project [variable](/docs/projects/variables) of the type **UsernamePassword account**. Before you create a Username and Password account Variable, you need to create a Username and Password account in Octopus:

:::figure
![Username Password account variable](/docs/projects/variables/images/username-password-account-variable.png)
:::

The **Add Variable** window is then displayed and lists all the Username and Password accounts.

Select the Username and Password account you want to access from the project to assign it to the variable:

:::figure
![Username Password account variable selection](/docs/projects/variables/images/username-password-account-variable-selection.png)
:::


## Username and password account variable properties

The Username and Password account variable also exposes the following properties that you can reference in a PowerShell script:

| Name and description                                                   | Example     |
|------------------------------------------------------------------------|-------------|
| **`Username`** <br/> The username of the Username and password account | BobSmith_85 | 
| **`Password`** <br/> The password of the Username and password account | Sup3rSecr3tPassword1! | 

### Accessing the properties in a script

Each of the above properties can be referenced in any of the supported scripting languages such as PowerShell and Bash.

:::div{.hint}
Although it's possible to reference the `Password` of the Username and password account in a script, writing them out to stdout will result in Octopus masking the values as they are considered sensitive.
:::

<details data-group="project-variables-username-password-account-variables">
<summary>PowerShell</summary>

```powershell
# For an account with a variable name of 'username password account'

# Using $OctopusParameters
Write-Host 'UsernamePasswordAccount.Id=' $OctopusParameters["username password account"]
Write-Host 'UsernamePassword.Username=' $OctopusParameters["username password account.Username"]
$PasswordValue = $OctopusParameters["username password account.Password"]

# Directly as a variable
Write-Host 'UsernamePassword.Id=' #{username password account}
Write-Host 'UsernamePassword.Username=' #{username password account.Username}
$PasswordValue = "#{username password account.Password}"
```

</details>
<details data-group="project-variables-username-password-account-variables">
<summary>Bash</summary>

```bash
# For an account with a variable name of 'username password account'

id=$(get_octopusvariable "username password account")
username=$(get_octopusvariable "username password.Username")
password=$(get_octopusvariable "username password.Password")
echo "Username Password Account Id is: $id"
echo "Username Password Account Username is: $username"
```

</details>

## Add a Username and Password account to Octopus

For instructions to set up a Username and Password account in Octopus, see [Username and password accounts](/docs/infrastructure/accounts/username-and-password).

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
- How to create [Username and password accounts](/docs/infrastructure/accounts/username-and-password)
