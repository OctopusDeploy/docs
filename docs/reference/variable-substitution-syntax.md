---
title: Variable Substitution Syntax
description: Variable substitutions are a flexible way to adjust configuration based on your variables and the context of your deployment.
position: 1
---

Variable substitutions are a flexible way to adjust configuration based on your variables and the context of your deployment. You can often tame the number and complexity of your variables by breaking them down into simple variables and combining them together using expressions.

## Basic Syntax {#VariableSubstitutionSyntax-BasicSyntax}

Octopus [variables](/docsvariables/index.md) support substitution throughout: a variable may be bound to an expression that incorporates the values of other variables:

| Name               | Value                       | Scope      |
| ------------------ | --------------------------- | ---------- |
| `DatabaseServer`   | `PDB001`                    | Production |
| `DatabaseServer`   | `TDB001`                    | Test       |
| `ConnectionString` | `Server=#{DatabaseServer};` |            |

The syntax `#{VarName}` will insert the value of the `VarName` variable in-place. For example the `ConnectionString`variable will have the value `Server=PDB001;` when evaluated in the *Production* environment. The use of one or more variables in the declaration of another is called a *binding.*

In regular variable declarations, binding to a non-existent value will yield an empty string, so evaluating `ConnectionString` in the *Dev* environment will yield `Server=;` because no `DatabaseServer` is defined in that environment.

If the file undergoing variable replacement includes a string that *shouldn't* be getting replaced, for example **#{NotToBeReplace}**, you should include an extra hash (#) character to force the replacement to ignore the substitution and remove the extra #.

| Expression            | Value                |
| --------------------- | -------------------- |
| `##{NotToBeReplaced}` | `#{NotToBeReplaced}` |

## Extended Syntax {#VariableSubstitutionSyntax-ExtendedSyntax}

Octopus supports an extended variable substitution syntax with capabilities similar to text templating languages.  It's worth noting that this is now available everywhere whereas previously it was limited to certain scenarios.

The capabilities of the extended syntax are:

- Index Replacement
- Conditionals - `if` and `unless`
- Repetition - `each`
- Filters - `HtmlEscape`, `Markdown` etc.
- Differences from regular variable bindings
- JSON Parsing

:::hint
[Octostache](https://github.com/OctopusDeploy/Octostache) is the open source component that powers this feature.
:::

### Index Replacement {#VariableSubstitutionSyntax-IndexReplacement}

Variable substitution inside an index was added in Octopus 3.3.23.  This makes it easy to dynamically retrieve variables within arrays/dictionaries.

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

#### *Truthy* and *Falsy* values {#VariableSubstitutionSyntax-TruthyandFalsyvalues}

The `if` and `unless` statements consider a value to be *falsy* if it is undefined, empty, `False` or `0`. All other values are considered to be *truthy*.

### Complex syntax
Additional conditional statements are supported in Octopus 3.5 and onwards, including == and !=.

Using complex syntax you can have expressions like `#{if Octopus.Environment.Name == "Production"}...#{/if}` and `#{if Octopus.Environment.Name != "Production"}...#{/if}`

### Run conditions
Conditions can be used to control whether a given step in a deployment process actually runs.  In this scenario the conditional statement should return true/false, depending on your requirements.

Some examples would be,

`#{if Octopus.Environment.Name == "Production"}true#{/if}` would run the step only in Production.

`#{if Octopus.Environment.Name != "Production"}true#{/if}` would run the step in all environments other than Production.

`#{unless Octopus.Action[StepName].Output.HasRun == "True"}true#{/unless}` would run the step unless it has run before. This would be useful for preventing something like an email step from executing every time an auto deploy executed for new machines in an environment.  It would be used in conjunction with the step calling `Set-OctopusVariable -name "HasRun" -value "True"` when it does run.

### Repetition {#VariableSubstitutionSyntax-Repetition}

The `each` statement supports repetition over a set of variables, or over the individual values in a variable separated with commas.

#### Iterating over sets of values {#VariableSubstitutionSyntax-Iteratingoversetsofvalues}

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
 - Endpont B at http://b.example.com is Slave
```

#### Iterating over comma-separated values {#VariableSubstitutionSyntax-Iteratingovercomma-separatedvalues}

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

### 
Filters {#VariableSubstitutionSyntax-Filters}

By default, bindings are inserted into the output as-is; no consideration is given as to whether the target variable or file is XML, HTML, JSON etc. That is, the target file type is always treated as plain text.

Octopus variable substitutions support *filters* to correctly encode values for a variety of target file types. These are invoked using the `|` (pipe) operator.

Given the variable:

| Name          | Value         | Scope |
| ------------- | ------------- | ----- |
| `ProjectName` | `You & I` |       |

An the template:

```powershell
<h3>#{ProjectName | HtmlEscape}</h3>
```

The result will be:

```powershell
<h3>You &amp; I</h3>
```

That is, the ampersand has been encoded correctly for use in an HTML document.

:::problem
The filters provided by Octopus are for use with trusted input; don't rely on them to santize data from potentially malicious sources.
:::

#### Provided filters {#VariableSubstitutionSyntax-Providedfilters}

Octopus provides the following filters:

| Name         | Purpose                                  | Example Input        | Example Output             |
| ------------ | ---------------------------------------- | -------------------- | -------------------------- |
| `HtmlEscape` | Escapes entities for use in HTML content | 1 < 2                | 1 &lt; 2                   |
| `JsonEscape` | Escapes data for use in JSON strings     | He said "Hello!"     | He said \"Hello!\"         |
| `Markdown`   | Converts Markdown to HTML                | This \_rocks\_       | <p>This <em>rocks</em></p> |
| `ToLower`    | Forces values to lowercase               | Automated Deployment | automated deployment       |
| `ToUpper`    | Forces values to uppercase               | Automated Deployment | AUTOMATED DEPLOYMENT       |
| `XmlEscape`  | Escapes entities for use in XML content  | 1 < 2                | 1 &lt; 2                   |

The *NowDate* and *NowDateUtc* filters take no variable input but can take an additional optional right-hand-side argument the define the string format (Defaults to ISO-8601 [Round-trip format](https://msdn.microsoft.com/en-us/library/az4se3k1#Roundtrip)).

| MyFormat Variable | Filter Expression | Output                      |
| ----------------- | ----------------- | --------------------------- |
|                   | `#{ | NowDate }`                   | `2016-11-03T08:53:11.0946448` |
|                   | `#{ | NowDateUtc}`                 | `2016-11-02T23:01:46.9441479Z` |
|                   | `#{ | NowDate \"HH dd-MMM-yyyy\"}` | `09 03-Nov-2016` |
|                   | `#{ | NowDateUtc zz}`              | `+00` |
| dd-MM-yyyy        | `#{ | NowDate #{MyFormat}}`        | `03-Nov-2016` |

The *Format* filter available from Octopus Deploy version 3.5 allows for converting of input based on an additionally provided argument that is passed to the *`.ToString()`* method.

| MyVar Value           | Example Input                     | Output     |
| --------------------- | --------------------------------- | ---------- |
| 4.3                   | `#{ MyVar | Format C}`            | $4.30      |
| `2030/05/22 09:05:00` | `#{ MyVar | Format yyyy}`         | 2030       |
|                       | `#{ | NowDate | Format Date MMM}` | Nov        |

:::hint
Filters were introduced in Octopus Deploy version 3.5
:::

### Differences from regular variable bindings {#VariableSubstitutionSyntax-Differencesfromregularvariablebindings}

Because of the flexibility provided by the extended syntax, variables that are not defined will result in the source text, e.g. `#{UndefinedVar}` being echoed rather than an empty string, so that evaluation problems are easier to spot and debug. The `if` construct can be used to selectively bind to a variable only when it is defined, e.g. to obtain identical "empty" variable functionality as shown in the first example:

```powershell
Server=#{if DatabaseServer}#{DatabaseServer}#{/if};
```

### JSON Parsing {#VariableSubstitutionSyntax-JSONParsingjson}

Octostache 2.x (bundled with Octopus 3.5) includes an update to support parsing JSON formatted variables natively, and using their contained properties for variable substitution.

Given the variable:

| Name                        | Value                                    | Scope |
| --------------------------- | ---------------------------------------- | ----- |
| `Custom.MyJson`             | `{Name: "t-shirt", Description: "I am a shirt", Sizes: [{size: "small", price: 15.00}, {size: "large", price: 20.00}]}` |       |
| `Custom.MyJson.Description` | `Shirts are not shorts.`                 |       |

And the template:

```powershell
<h1>#{Custom.MyJson[Name]}</h1>
#{Custom.MyJson.Name} - #{Custom.MyJson.Description}
From: #{Custom.MyJson.Sizes[0].price | Format C}
Sizes: #{Custom.MyJson.Sizes}
```

The result will be:

```powershell
<h1>t-shirt</h1>
t-shirt - Shirts are not shorts
From: $15.00
Sizes: [{size: "small", price: 15.00}, {size: "large", price: 20.00}]
```

There are a few things to note here.

- The *Name* property is extracted from the JSON using either dot-notation or indexing.
- Providing an explicit project variable overrides one obtained by walking through the JSON
- Arrays can be accessed using standard numerical index notation
- Variables can map to a sub-section of the JSON variable.

#### Repetition over JSON {#VariableSubstitutionSyntax-RepetitionoverJSON}

Give the variables:

| Name      | Value                                    |
| --------- | ---------------------------------------- |
| MyNumbers | `[5,2,4]`                                |
| MyObjects | `{Cat: {Price: 11.5, Description: "Meow"}, Dog: {Price: 17.5, Description: "Woof"}}` |

And the template:

```powershell
Numbers:
#{each number in MyNumbers}
 - #{number}
#{/each}

Objects:
#{each item in MyObjects}
	#{item.Key}: #{item.Value.Price}
#{/each} 
```

The resulting text will be:

```powershell
Numbers:
 - 5
 - 2
 - 4
 
Objects:
Cat: 11.5
Dog: 17.5
```
