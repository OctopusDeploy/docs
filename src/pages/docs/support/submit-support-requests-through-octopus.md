---
layout: src/layouts/Default.astro
pubDate: 2025-10-20
modDate: 2025-10-20
title: Submit support requests through Octopus
description: How to submit a request to Octopus Support through the application.
navOrder: 1
---

From [ADD VERSION], you can now submit support requests directly from within the Octopus application. This works the same way as emailing our support team and ensures your request is handled promptly.


## Accessing the support form

To submit a support request:

1. Open the Help Sidebar by clicking the `Help` button in the top right corner of the Octopus interface.
2. Select `Support` from the resources at the bottom of the sidebar.
3. A support request form will appear in a pop up window.

## Completing the support form

The support form includes the following fields:

- **Name and Email:** These fields are automatically pre filled with your logged in user details, but you can update them if needed.
- **Include other users**: Select other users who should be CCed and receive updates on your support request.
- **Subject**: Provide a brief summary of your issue or question.
- **Describe the problem**: Describe your issue in detail. Include any error messages, steps to reproduce the problem, and what you expected to happen versus what actually occurred.
- **Upload supporting documents (optional)**: Upload any relevant screenshots, logs, or other files that will help the support team understand your issue.
- **Send System Diagnostics Report**: Check this option to automatically attach an Octopus generated system diagnostic report with your request.

## Submitting your request

When you submit the form, Octopus creates a system background task to process and send your support request. You can monitor the status of this task in your task queue. If the submission fails for any reason, you can retry the task to attempt sending the support request again.

Your support request will be received by our support team and handled in the same manner as email based requests.