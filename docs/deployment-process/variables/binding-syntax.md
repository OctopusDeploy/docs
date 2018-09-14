---
title: Binding Syntax
description: Octopus supports a special binding syntax that can be used to refer to variables.
position: 10
---

As you work with [variables](/docs/deployment-process/variables/index.md) in Octopus, you can using Octopus's special binding syntax to refer to variables. It uses the form:

`#{Name}`

To reference a variable named `Name` from within the value of another variable.

The binding syntax used by Octopus also supports many other constructs, such as loops, conditionals, and filters. You can [learn more in the variable substitution syntax](/docs/deployment-process/variables/variable-substitution-syntax.md) section.

## Binding One Variable to Another {#Bindingsyntax-Bindingonevariabletoanother}

You can reference variables from other variables:

![](/docs/images/3048310/3278295.png "width=500")

## Referencing Variables in Step Definitions {#Bindingsyntax-Referencingvariablesinstepdefinitions}

This binding syntax can also be used to dynamically change the values of deployment step settings. If [variables are scoped](/docs/deployment-process/variables/scoping-variables.md), this makes it really easy to alter a deployment step settings based on the target environment.

Most text fields that support binding to variables will have a variable insert button:

![](/docs/images/3048310/3278296.png)

For settings that support variables but aren't text (such as drop downs or checkboxes), a button is displayed to toggle custom expression modes:

![](/docs/images/3048310/3278297.png)
