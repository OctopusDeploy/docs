---
title: Variable Filters
description: Octopus variable substitutions support *filters* to correctly encode values for a variety of target file types.
position: 18
---

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
The filters provided by Octopus are for use with trusted input; don't rely on them to sanitize data from potentially malicious sources.
:::

#### Provided Filters {#VariableSubstitutionSyntax-Providedfilters}

Octopus provides the following filters:

| Name         | Purpose                                  | Example Input        | Example Output             |
| ------------ | ---------------------------------------- | -------------------- | -------------------------- |
| `HtmlEscape` | Escapes entities for use in HTML content | 1 < 2                | 1 \&lt; 2                   |
| `JsonEscape` | Escapes data for use in JSON strings     | He said "Hello!"     | He said \\"Hello!\\"         |
| `Markdown`   | Converts Markdown to HTML                | This \_rocks\_       | \<p>This \<em>rocks\</em>\</p> |
| `ToBase64`   | Converts values to Base64 (using UTF encoding)   | Bar          | QmF6                       |
| `ToLower`    | Forces values to lowercase               | Automated Deployment | automated deployment       |
| `ToUpper`    | Forces values to uppercase               | Automated Deployment | AUTOMATED DEPLOYMENT       |
| `XmlEscape`  | Escapes entities for use in XML content  | 1 < 2                | 1 \&lt; 2                   |

The *NowDate* and *NowDateUtc* filters take no variable input but can take an additional optional right-hand-side argument the define the string format (Defaults to ISO-8601 [Round-trip format](https://msdn.microsoft.com/en-us/library/az4se3k1#Roundtrip)).

| MyFormat Variable | Filter Expression | Output                      |
| ----------------- | ----------------- | --------------------------- |
|                   | `#{ | NowDate }`                   | `2016-11-03T08:53:11.0946448` |
|                   | `#{ | NowDateUtc}`                 | `2016-11-02T23:01:46.9441479Z` |
|                   | `#{ | NowDate \"HH dd-MMM-yyyy\"}` | `09 03-Nov-2016` |
|                   | `#{ | NowDateUtc zz}`              | `+00` |
| dd-MM-yyyy        | `#{ | NowDate #{MyFormat}}`        | `03-Nov-2016` |

The *Format* filter introduced in **Octopus 3.5** allows for converting of input based on an additionally provided argument that is passed to the *`.ToString()`* method.

| MyVar Value           | Example Input                     | Output     |
| --------------------- | --------------------------------- | ---------- |
| 4.3                   | `#{ MyVar | Format C}`            | $4.30      |
| `2030/05/22 09:05:00` | `#{ MyVar | Format yyyy}`         | 2030       |
|                       | `#{ | NowDate | Format Date MMM}` | Nov        |

The *Replace* filter introduced in **Octopus 2018.8.4** performs a regular expression replace function on the variable. The regular expression should be provided in the [.NET Framework format](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference). Double quotes need to be used around any expressions that contain whitespace or special characters. Expressions containing double quotes can not be expressed inline, but can be done via nested variables. If both the search and replace expressions are variables, ensure there is no space between the expressions.

| MyVar Value   | Example Input                           | Output                  |
| ------------- | --------------------------------------- | ----------------------- |
| `abc`         | `#{ MyVar | Replace b}`                 | `ac`                    |
| `abc`         | `#{ MyVar | Replace b X}`               | `aXc`                   |
| `a b c`       | `#{ MyVar | Replace "a b" X}`           | `X c`                   |
| `ab12c3`      | `#{ MyVar | Replace "[0-9]+" X}`        | `abXcX`                 |
| `abc`         | `#{ MyVar | Replace "(.)b(.)" "$2X$1" }`| `cXa`                   |
| `abc`         | `#{ MyVar | Replace #{match}#{replace}}`| `a_c` when `match=b`,`replace=_` |
| `abc`         | `#{ MyVar | Replace #{match} _}`        | `a_c` when `match=b`    |

:::hint
Filters were introduced in **Octopus 3.5**.
:::

### Differences From Regular Variable Bindings {#VariableSubstitutionSyntax-Differencesfromregularvariablebindings}

Because of the flexibility provided by the extended syntax, variables that are not defined will result in the source text, e.g. `#{UndefinedVar}` being echoed rather than an empty string, so that evaluation problems are easier to spot and debug. The `if` construct can be used to selectively bind to a variable only when it is defined, e.g. to obtain identical "empty" variable functionality as shown in the first example:

```powershell
Server=#{if DatabaseServer}#{DatabaseServer}#{/if};
```

### JSON Parsing {#VariableSubstitutionSyntax-JSONParsingjson}

Octostache 2.x (bundled with **Octopus 3.5**) includes an update to support parsing JSON formatted variables natively, and using their contained properties for variable substitution.

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

There are a few things to note here:

- The *Name* property is extracted from the JSON using either dot-notation or indexing.
- Providing an explicit project variable overrides one obtained by walking through the JSON.
- Arrays can be accessed using standard numerical index notation.
- Variables can map to a sub-section of the JSON variable.

#### Repetition Over JSON {#VariableSubstitutionSyntax-RepetitionoverJSON}

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
