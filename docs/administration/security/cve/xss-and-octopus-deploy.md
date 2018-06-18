---
title: Cross-Site Scripting (XSS) and Octopus Deploy
description: Octopus Server actively prevents Cross-Site Scripting (XSS) using a number of preventative measures.
position: 1
---

We take every reasonable effort to make Octopus Deploy secure against known vulnerabilities, mainly related to browser vulnerabilities. One such browser vulnerability is Cross-Site Scripting (XSS).

## What is XSS?

Using an XSS attack a malicious actor could potentially trick a user's browser into executing unintended code. For more information about XSS refer to the following:

- [Cross-Site Scripting according to OWASP](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))

## Does Octopus Deploy prevent XSS attacks?

Yes.