---
title: Moving version control
description: Changing the location of your configuration repository. 
position: 60
---

Version-control is configured per project and is accessed via the **{{ Settings, Version Control }}** link in the project navigation menu. This page will walk you through moving an existing config as code repository to a new location.

## Moving configuration as code files

Enabling config as code is a one-way journey, but that doesn't mean you can't change where the configuration is stored later.

You may need to move files from the root of the `.octopus` folder into a sub-folder because you want to divide the application into smaller components. Alternatively, you might be changing your version control strategy and want to move the configuration from the application repository to a stand-alone deployment repository (or vice-versa).

Both of these scenarios are covered below.

Moving the configuration location will cause a break in the version control history. When you review the history of the files after the move, you will only see the history since the moving date. For older changes, you would need to search for the deleted files to see previous changes.

You will also need to pause changes to the deployment process during the move. You will have two copies of the deployment configuration for a short time.

The migration process takes a few minutes to complete.

The basic process for a move is:

- Create a copy of the configuration in the new location
- Update the version control settings
- Remove the old configuration files

## Moving config files into a folder

Before starting the move, make sure you have the latest version of the config files.

Create the new folder under the `.octopus` directory and copy the `*.ocl` files into the new folder. Then commit and push your changes.

You can then update the version control settings by following the steps below:

- Open the project in Octopus Deploy
- Open **{{ Settings, Version Control }}**
- Expand the **Git File Storage Directory** setting and update the folder name
- Click **SAVE** to store the changes
- Check your process in **{{ Deployments, Process}}**

You can now delete the files from the old location.

:::hint
If you receive the error `Branch has not been initialized` it is likely you haven't copied the configuration files to the new location, didn't publish your changes, or have mistyped the directory name.
:::

## Moving config files to a new repository

You can move your configuration to a brand new or existing repository. Before starting the move, make sure you have the latest version of the config files.

Create an `.octopus` folder in the root of your repository if it doesn't already exist, and decide whether you will add a sub-folder for the configuration files.

Copy the latest version of the `*.ocl` files into the new location. Then commit and push your changes.

- Open the project in Octopus Deploy
- Open **{{ Settings, Version Control }}**
- Expand **Git Repository** and enter the new **URL**
- Adjust the **Default Branch Name** if the new repository has a different main branch
- Expand **Authentication**
- - add a **Username**
- - Enter a personal access token in the **Password** field
- Click **TEST** to check your connection to the repository
- Click **SAVE** to store the changes
- Check your process in **{{ Deployments, Process}}**

You can now delete the files from the old location.

:::hint
When you use the **TEST** button to check your connection, the most common issues will be an incorrect username or using your password instead of a personal access token.
:::