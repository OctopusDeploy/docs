---
title: Runbook Variables 
description: How to use variables in runbooks 
position: 24 
---

!include <variables>

## Variables in runbooks

A project's variables are available to both runbooks and the deployment process, and the process for consuming variables is the same (see [an example](/docs/projects/variables/index.md#examples)). 

### Variables specific to a runbook 

There are scenarios where a variable may be specific to a runbook, and you don't want it to be available to other runbooks or the project's deployment process (this situation is common for [prompted variables](#prompted-variables)).  

![Scoping a variable to a process](process-scoped-variable.png "width=500")

Variables can be scoped to specific runbooks, or to the deployment process, by navigating to {{Project, Variables}}, adding a new variable, and defining the scope.  On the scope dialog, there is a _Processes_ field, which when populated restricts the variable availability to only the selected runbooks or deployment process.

## Prompted variables in runbooks {#prompted-variables}

[Prompted variables](/docs/projects/variables/prompted-variables.md) can be defined for runbooks. By default, prompted variables will prompt for the value when deploying or when running a runbook.  By [scoping prompted variables](#Variables-specific-to-a-runbook) to one or more processes, they can be restricted to only prompt when deploying or for specific runbooks. 