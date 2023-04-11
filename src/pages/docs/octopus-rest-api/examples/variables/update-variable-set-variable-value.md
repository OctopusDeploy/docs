---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Update variable set variable value
description: An example script that loads variables from a variable set, looks for a match and replaces the variable value.
---

This script demonstrates how to programmatically update a matching variable value stored in a library variable set.

Note: This script does not alter the variable scopes, only the value.

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space to search
- Name of the library variable set to use
- Variable name to search for
- New variable value to replace existing value

## Script

!include <update-variable-set-variable-value-scripts>
