---
title: FIPS and Octopus Deploy
position: 4
---


We take every reasonable effort to make Octopus Server, Tentacle and Calamari FIPS 140 compliant. If something is not FIPS 140 compliant we will take every reasonable effort to fix the problem, or otherwise degrade the feature gracefully.

## What is FIPS?


The 140 series of **Federal Information Processing Standards** ([FIPS](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standard "Federal Information Processing Standard")) are U.S.governmentcomputer securitystandards that specify requirements for cryptography modules. The National Institute of Standards and Technology (NIST) issues the 140 Publication Series to coordinate the requirements and standards for cryptographic modules which include both hardware and software components for use by departments and agencies of the United States federal government.

## How is FIPS enforced?


You can configure a Windows Server to enforce the use of FIPS 140 compliant cryptographic algorithms by configuring the Security Policy for [System cryptography: Use FIPS 140 compliant cryptographic algorithms, including encryption, hashing and signing algorithms](https://technet.microsoft.com/en-us/library/jj852197.aspx) to **Enabled**. The effects of this security policy setting are far reaching, but the most common result you will see in .NET applications is where a **System.InvalidOperationException: This implementation is not part of the Windows Platform FIPS validated cryptographic algorithms** being thrown whenever you attempt to use one of the non-FIPS compliant APIs.

## Known issues


Some of the features in Octopus Deploy depend on third-party libraries to work correctly. The following features are known to be non-FIPS compliant and will fail, or degrade gracefully, when FIPS-compliance is required:

- Parts of the Azure Service Management SDK are non-compliant, affecting:
 - Cloud Service deployments
 - Web App deployments
- Gravatar will be ignored since it relies on MD5-hashed email addresses


### Found something new?


Please contact our [support team](https://octopus.com/support) with details of the error and we will take every reasonable effort to fix the problem, or otherwise degrade the feature gracefully.
