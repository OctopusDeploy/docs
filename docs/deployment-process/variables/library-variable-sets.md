---
title: Library Variable Sets
description: Library variable sets allow you to define and share common variables between your Octopus projects.
position: 20
---

Octopus [variables](/docs/deployment-process/variables/index.md) can be added to library variables sets, which make it possible to define variables for use with multiple [projects](/docs/deployment-process/projects/index.md).

This can be useful if you have the same variables that are used across multiple projects. Instead of defining the variables for each project, you can define a set of variables in the Library Variable Set and then access them from every project that needs them.

## Creating a Library Variable Set

1. Navigate to **{{Library,Variable Sets}}** and click **ADD NEW VARIABLE SET**.
2. Give the variable set a name, a description, and click **SAVE**.
3. Define the variables. As with project variables, library variables can be [scoped](/docs/deployment-process/variables/index.md#scoping-variables) to environment, deployment target, or target roles.
4. Save the variable set by clicking **SAVE**.

## Adding the Library Variable Set to a Project

1. Navigate to your project by selecting the **Project** from the navigation menu and then clicking your project.
2. Click **{{Variables,Library Sets}}**.
3. Click **INCLUDE LIBRARY VARIABLE SETS**.
4. Search for the Library Variable Set you'd like to include, click the checkbox and **SAVE**.

## Viewing the Library Variable Set

If you want to review the Library Variable Set you've created, from the Project Overview page you can navigate to **{{Variables,Library Sets}}**.

If you want to review the Project variables and the Library Variable Set, from the Project Overview you can navigate to **{{Variables,All}}**.

## Rename a Library Variable Set

1. Navigate to **{{Library,Variable Sets}}**.
2. Select the variable set.
3. Click settings, and expand the **Name** section.
4. Enter the new name and click **SAVE**.

## View the Variable Audit Trail

Viewing the audit trail for a Variable Set will show you what changes have been made to the variable, when the changes were made, and which user made the changes.  

1. Navigate to **{{Library,Variable Sets}}**.
2. Select the variable set. Click the overflow menu and select **Audit Trail**.
3. Click **SHOW DETAILS** on an event to see what changed

To filter the audit trail by **date**, click the date range. Select a predefined date range or enter a custom date range.

You can use the following advanced filters to refine the result of the audit trail:

- Event groups.
- Event categories.
- Document types.
- Users.
- Projects.
- Environments.
