---
title: Configuration as Code
description: Projects can be version-controlled as text in a Git repository 
position: 110 
hideInThisSection: true
---

![TODO: Add hero image](todo.png) 

Config as Code in Octopus delivers the full power of Git with the usability of Octopus. We support a rich two-way sync which means your Git repo is the source of truth, and full support to version control and to evolve your configuration variables alongside your deployment process and application code. You get all the benefits of config as code for your application and infrastructure configuration that change as you deploy through your environments. 

When Config as Code is enabled for a project, you can continue to use the Octopus UI, or edit the text files in your favorite editor and command line tools. This gives you the freedom to edit, find and replace and perform bulk changes with regex replacements where you choose. Manage variables where you are most productive, branching, committing to and deploying from branches, as well as pull request workflows to review and approve changes. 

## Why use Config as Code?

### Branch your code and deployments

Branches are Git's superpower, and we expose that power. Using Config as Code you can:

* Switch branches, or create new ones, in the Octopus UI or your favorite Git client
* Commit changes to your deployment process on a branch
* Add (optional) commit messages when you change your deployment process, so others understand why it changed
* Create releases from your branch, and deploy to test your changes, to support many versions of your deployment process
* Evolve your deployments safely without worrying about breaking other teams' deployments
* Roll back to a previous version of your deployment process if things go wrong

### Review, approve, and merge

Review, approve, and merge your branches before you deploy to production. Getting more eyes across changes is always a good thing.
Pull requests, protected branches, and code-owners enable a new set of workflows to improve the quality and safety of your releases. Reduce downtime from bad deployments and improve the quality of your releases.
Audit and traceability

The commit history improves the traceability of changes to a deployment process. Know what changed, when, by who, and most importantly why.
No more searching through audit logs to find out why your configuration changed. Git history and diffs provide clear traceability and tell the complete story. Octopus even records the committer details in the Git history.
Shared Git credentials

Reuse and manage your Git credentials for version-controlled projects from a single view, making it easier to update tokens and see their usage.

## Version control your deployment process and configuration, and evolve them together

![TODO: Order API Create releae screenshot](todo.png)

Release 2022 Q3 introduces support to version control the configuration variables and infrastructure settings that you use throughout your deployments. These are the settings that change as you deploy from dev, to test to production. Common examples of these include database connection details and infrastructure settings like cloud region, resources sizing and more.

This update covers the ability to version control text variables in your Project and also manage references to the following variable types within Git:

* Certificate
* Account
* Worker Pool
* Prompted

You get the same control as the Octopus UI allowing you to scope your variables to environments, roles, specific targets and more without restrictions or adding any specific formatting or syntax. 

![Octopus Deploy branch selector](todo.png)

### Creating safe, reliable and auditable “As Code” deployment pipelines

With version controlled deployment processes and variables, Octopus provides safe, reliable and auditable “As Code” deployment pipelines. This lets your teams work in line with your company's regulatory requirements and compliance policies, making auditing a much smoother process.  

- **Traceable end-to-end CI/CD “As Code” pipelines** - Octopus has built-in plugins for a wide range of CI servers for easy integration. You can pair Octopus with a CI server that supports build definitions as code, giving you complete traceability into changes to your software development process. Changes to your build and deployment pipelines can go through the same pull request review and approval process, improving the stability and reliability of your pipeline.
- **Consistent processes and approvals** - Improve the quality of your code and meet compliance requirements by using pull request workflows to review and approve changes. Consistent processes contribute to quality releases, and you can enforce policies so that unapproved changes don't get merged.
- **Traceable changesets** - Have clear visibility into changesets by using pull request diffs combined with detailed audit logging. Octopus keeps a complete audit trail of everything that happens, with detailed logs and filters. See who changed what and when to help troubleshoot release issues. Capture further details with source control commits and Git diffs showing you the exact changes made to processes and configuration settings.
- **Disaster recovery** - Back-up and recover user pipelines in Git. If you need to, roll-back changes to recover more easily from release breaks.

Octopus also supports the security fundamentals that modern teams expect. Octopus supports: 

- Authentication providers
- Role-based access control (RBAC)
- Segregation of duties

Advanced role-based permissions give you fine-grained control over who can deploy which projects to which environments, and who can view or modify your assets and processes in Octopus.

*Note: This is the first release of our version controlled variables and we don’t currently support secrets, (library) variable sets, or variable templates (i.e. tenant specific variables). These are on our radar for future releases.* 

![TODO: Work where you're most productive](todo.png)