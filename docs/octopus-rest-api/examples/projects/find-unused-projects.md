---
title: Find unused projects
description: An example script that will find any project that hasn't had a release created in the previous days
---

This script will search for projects who haven't had a release created in the previous set number of days.

Please note, this script will exclude projects:
- Without _any_ releases.
- Projects already disabled.

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Disable Old Projects - indicates if the projects should be set to disabled, default is $false
- Days Since Last Release - the number of days to allow before considering the project is inactive, default is 90

## Script

!include <find-unused-projects>