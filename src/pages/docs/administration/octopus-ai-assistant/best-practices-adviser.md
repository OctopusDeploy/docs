---
layout: src/layouts/Default.astro
pubDate: 2025-07-02
modDate: 2025-07-02
title: Best Practices Adviser
description: The Best Practices Adviser is a capability of the Octopus AI Assistant designed to analyze your deployment configurations and provide actionable recommendations to enhance reliability, maintainability, and compliance.
navOrder: 5
---

The Best Practices Adviser in Octopus AI Assistant helps you identify optimization opportunities and maintain healthy configurations across your Octopus Deploy instance. It analyzes your instance based on the prompt you provide to surface actionable recommendations for improving scalability, reducing technical debt, and ensuring you're following established best practices.

The suggested prompts in the Octopus AI Assistant will surface examples to use the Best Practices Adviser. Suggested prompts will also change based on the context of the page you have open in Octopus Deploy.

For example, if you open a project and launch Octopus AI Assistant, you will see these suggested prompts:

![Best Practices Adviser Screenshot](/docs/administration/octopus-ai-assistant/best-practices-adviser.png)

`Find unused variables to help improve the maintainability of the project` is a suggested prompt that will use the best practices advisor. In the screenshot (above), it is run in the context of a project called "k8s deployment", and the Best Practices Adviser found three unused variables. It then links to documentation to provide more information about the finding, and actionable remediation steps.

Some example prompts you can use to surface recommendations are (not limited to):

- Find duplicate project variables
- Find unused variables
- Help me find project variable values that look like plaintext passwords.
- Suggest tenant tags to make tenants more manageable.
- Find unused tenants
- Find unused targets
- Find unused projects
