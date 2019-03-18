---
title: Variable Substitutions
description: Variable substitutions are a flexible way to adjust configuration based on your variables and the context of your deployment.
position: 10
---

Variable substitutions are a flexible way to adjust configuration based on your [variables](/docs/deployment-process/variables/index.md) and the context of your [deployment](/docs/deployment-process/index.md). You can often tame the number and complexity of your variables by breaking them down into simple variables and combining them together using expressions.

## Binding Variables

You can using Octopus's special binding syntax to reference a variable from within the value of another variable. In the following example, the `ConnectionString` variable references the variables `{Server}` and `{Database}`.

| Name               | Value                       | Scope |
| ------------------ | --------------------------- | ----------- |
| Server             | SQL | Production, Test  |
| Database           | PDB001 | Production |
| Database           | TDB001 | Test |
| ConnectionString   | Server=#\{Server\}; Database=#\{Database\} |  |

In regular variable declarations, binding to a non-existent value will yield an empty string, so evaluating `ConnectionString` in the *Dev* environment will yield `Server=;` because no `Database` or `Server` are defined for that environment.

If the file undergoing variable replacement includes a string that *shouldn't* be replaced, for example **#{NotToBeReplace}**, you should include an extra hash (#) character to force the replacement to ignore the substitution and remove the extra #.

| Expression            | Value                |
| --------------------- | -------------------- |
| `##{NotToBeReplaced}` | `#{NotToBeReplaced}` |

:::info
Also read about [common mistakes for variables](/docs/deployment-process/variables/sensitive-variables.md#Sensitivevariables-Avoidingcommonmistakes) for more information
:::

## Using Variables in Step Definitions {#Bindingsyntax-Referencingvariablesinstepdefinitions}

Binding syntax can be used to dynamically change the values of deployment step settings. If [variables are scoped](/docs/deployment-process/variables/index.md#scoping-variables), this makes it really easy to alter a deployment step settings based on the target environment.

Most text fields that support binding to variables will have a variable insert button:

![](/docs/images/3048310/3278296.png)

For settings that support variables but aren't text (such as drop downs or checkboxes), a button is displayed to toggle custom expression modes:

![](/docs/images/3048310/3278297.png)

## Extended Syntax {#VariableSubstitutionSyntax-ExtendedSyntax}

Octopus supports an extended variable substitution syntax with capabilities similar to text templating languages.  It's worth noting that this is now available everywhere whereas previously it was limited to certain scenarios.

The capabilities of the extended syntax are:

- Index Replacement
- Conditionals - `if`, `if-else` and `unless`
- Repetition - `each`
- Filters - `HtmlEscape`, `Markdown` etc.
- Differences from regular variable bindings
- JSON Parsing

:::hint
[Octostache](https://github.com/OctopusDeploy/Octostache) is the open source component that powers this feature.
:::

### Index Replacement {#VariableSubstitutionSyntax-IndexReplacement}

Variable substitution inside an index was added in **Octopus 3.3.23**.  This makes it easy to dynamically retrieve variables within arrays/dictionaries.

Given the variables:

| Name                | Value       | Scope |
| ------------------- | ----------- | ----- |
| `MyPassword[Rob]`   | `passwordX` |       |
| `MyPassword[Steve]` | `passwordY` |       |
| `MyPassword[Mary]`  | `passwordZ` |       |
| `UserName`          | `Mary`      |       |

`#{MyPassword[#{UserName}]}` would evaluate to `passwordZ`.

### Conditionals {#VariableSubstitutionSyntax-Conditionalsconditionals}

Two conditional statements are supported in Octopus prior to version 3.5 - `if` and `unless`; these have identical syntax, but `if` evaluates only if the variable is *truthy*, while `unless` evaluates if the variable is *falsy*.  `if` and `unless` syntax is as follows:

`#{if VariableName}conditional statements#{/if}`

`#{unless VariableName}conditional statements#{/unless}`

Let's look at an example.  Given the variables:

| Name           | Value   | Scope      |
| -------------- | ------- | ---------- |
| `DebugEnabled` | `True`  | Dev        |
| `DebugEnabled` | `False` | Production |

Then the following template:

```powershell
<compilation #{if DebugEnabled}debug="true"#{/if}>
```

The resulting text in the *Dev* environment will be:

```xml
<compilation debug="true">
```

And in *Production* it will be:

```xml
<compilation >
```

You could achieve a similar result, with a different default/fallback behavior, using the unless syntax:

```powershell
<compilation #{unless DebugDisabled}debug="true"#{/unless}>
```

#### *Truthy* and *Falsy* Values {#VariableSubstitutionSyntax-TruthyandFalsyvalues}

The `if`, `if-else` and `unless` statements consider a value to be *falsy* if it is undefined, empty, `False` or `0`. All other values are considered to be *truthy*.

### Complex Syntax
Additional conditional statements are supported in **Octopus 3.5** and onwards, including `==` and `!=`.

Using complex syntax you can have expressions like `#{if Octopus.Environment.Name == "Production"}...#{/if}` and `#{if Octopus.Environment.Name != "Production"}...#{/if}`, or:

```
#{if ATruthyVariable}
  Do this if ATruthyVariable evaluates to true
#{else}
  Do this if ATruthyVariable evaluates to false
#{/if}
```

### Run Conditions
Conditions can be used to control whether a given step in a deployment process actually runs.  In this scenario the conditional statement should return true/false, depending on your requirements.

Some examples are:

`#{if Octopus.Environment.Name == "Production"}true#{/if}` would run the step only in Production.

`#{if Octopus.Environment.Name != "Production"}true#{/if}` would run the step in all environments other than Production.

`#{unless Octopus.Action[StepName].Output.HasRun == "True"}true#{/unless}` would run the step unless it has run before. This would be useful for preventing something like an email step from executing every time an auto deploy executed for new machines in an environment.  It would be used in conjunction with the step calling `Set-OctopusVariable -name "HasRun" -value "True"` when it does run.

### Repetition {#VariableSubstitutionSyntax-Repetition}

The `each` statement supports repetition over a set of variables, or over the individual values in a variable separated with commas.

#### Iterating Over Sets of Values {#VariableSubstitutionSyntax-Iteratingoversetsofvalues}

More complex sets of related values are handled using multiple variables:

| Name                      | Value                  | Scope |
| ------------------------- | ---------------------- | ----- |
| `Endpoint[A].Address`     | `http://a.example.com` |       |
| `Endpoint[A].Description` | `Master`               |       |
| `Endpoint[B].Address`     | `http://b.example.com` |       |
| `Endpoint[B].Description` | `Slave`                |       |

Given the template:

```powershell
Listening on:
#{each endpoint in Endpoint}
 - Endpoint #{endpoint} at #{endpoint.Address} is #{endpoint.Description}
#{/each}
```

The result will be:

```powershell
Listening on:
 - Endpoint A at http://a.example.com is Master
 - Endpoint B at http://b.example.com is Slave
```

#### Iterating Over Comma-separated Values {#VariableSubstitutionSyntax-Iteratingovercomma-separatedvalues}

Give the variable:

| Name        | Value                                    | Scope |
| ----------- | ---------------------------------------- | ----- |
| `Endpoints` | `http://a.example.com,http://b.example.com` |       |

And the template:

```powershell
Listening on:
#{each endpoint in Endpoints}
 - #{endpoint}
#{/each}
```

The resulting text will be:

```powershell
Listening on:
 - http://a.example.com
 - http://b.example.com
```

#### Special Variables {#VariableSubstitutionSyntax-SpecialVariables}

Within the context of an iteration template, some special variables are available.

| Name                          | Description                              |
| ----------------------------- | ---------------------------------------- |
| `Octopus.Template.Each.Index` | Zero-based index of the iteration count  |
| `Octopus.Template.Each.First` | `"True" if the element is the first in the collection`, otherwise "False" |
| `Octopus.Template.Each.Last`  | "True" if the element is the last in the collection, otherwise "False" |
