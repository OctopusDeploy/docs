---
title: Runbook Variables 
description: How to use variables in runbooks 
position: 24 
---

!include <variables>

## Variables in Runbooks

Runbooks and deployment processes both have access to a project's variables, and the process for both is the same (see [an example](/docs/projects/variables/index.md#examples)). 

### Variables specific to a runbook

There are scenarios where a variable may be specific to a runbook, and you don't want it to be available to other runbooks or the project's deployment process.  

![Scoping a variable to a process](process-scoped-variable.png "width=500")

Variables can be scoped to specific runbooks, or to the deployment process, by navigating to {{Project, Variables}}, adding a new variable, and defining the scope.  On the scope dialog, there is a _Processes_ field, which when populated restricts the variable availability to only the selected runbooks or deployment process.

## Prompted variables in runbooks