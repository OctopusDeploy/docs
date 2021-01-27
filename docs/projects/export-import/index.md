---
title: Exporting and Importing Projects 
description: Projects can be exported, and imported into another space 
position: 40
---

The `Export/Import Projects` feature can export one or more projects into a zip file, which can then be imported into other spaces. 

## Scenarios
The intended scenarios are:
- Moving projects between spaces. This includes moving from a self-hosted instance to an Octopus Cloud instance (or vice-versa). 
- Using a project as a template to create projects in other spaces.

Scenarios this feature was _not_ designed for include:
- Backup/restore.  See our [recommended approach](/docs/administration/data/backup-and-restore.md) to disaster-recovery for your Octopus instance.    
- Cloning projects _within_ a space. There is an [easier way to achieve this](/docs/projects/index.md#clone-a-project).  
- Promoting changes between environments on different Octopus instances. See below. 

### Promoting changes between Octopus instances
There are scenarios where it is desirable to create releases and deploy them to test environments on a development Octopus instance before promoting the changes to another instance.  This can be due to reasons including:
- security requirements (e.g. air-gapped environments) 
- multi-tenancy (deploying Octopus to customer infrastructure)
- maintaining strict control over the changes made to the production Octopus instance 

** TODO: call out this may be addressed in a future release **

