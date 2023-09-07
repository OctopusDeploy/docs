---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Security Self Assessment Questionnaire (CAIQ - Lite)
description: Read about our security posture in real terms
navOrder: 101
---

We use the Consensus Assessments Initiative Questionnaire Lite (CAIQ-Lite) from the [Cloud Security Alliance](https://cloudsecurityalliance.org/star/caiq-lite/) as a baseline mechanism to express our security posture in real terms and to provide security control transparency.

We've made this publicly available to help customers assess our security posture for their own vendor management initiatives. Please reach out to our security people over at [security@octopus.com](mailto:security@octopus.com) if you have any queries.

## Application & Interface Security

### Application Security

CAIQ ID: **AIS-01.2**

> Do you use an automated source code analysis tool to detect security defects in code prior to production?

Yes. We automate the detection & update of vulnerable dependencies. Anything that cannot be automatically merged is remediated by our engineering teams as a priority.

CAIQ ID: **AIS-01.5**

> (SaaS only) Do you review your applications for security vulnerabilities and address any issues prior to deployment to production?

Yes. All security defects found during review or testing are remediated prior to deployment to production. Internally, we treat these as an 'automatic' top priority.

### Customer Access Requirements

CAIQ ID: **AIS-02.1**

> Are all identified security, contractual, and regulatory requirements for customer access contractually addressed and remediated prior to granting customers access to data, assets, and information systems?

Yes. We provide full details of this via our customer agreement and privacy policy on our website.

### Data Integrity

CAIQ ID: **AIS-03.1**

> Does your data management policies and procedures require audits to verify data input and output integrity routines?

Yes. Our software is built to check the validity of data input prior to ingestion and to sanitize API outputs. This is checked and audited via extensive end-to-end tests, human review, and penetration testing. All storage is backed up to ensure minimal data loss in the event of an integrity error. Data schema migrations are tightly controlled using source controlled database change scripts.

## Audit Assurance & Compliance

### Independent Audits

CAIQ ID: **AAC-02.1**

> Do you allow tenants to view your SOC2/ISO 27001 or similar third-party audit or certification reports?

Yes. We have SOC II and ISO 27001:2013 and we make as much detail about our audits public as is safe & reasonable. Our compliance certificates can be found in our [trust center](https://octopus.com/company/trust) and our penetration test results on our [security page](https://octopus.com/docs/security).

CAIQ ID: **AAC-02.2**

> Do you conduct network penetration tests of your cloud service infrastructure at least annually?

Yes. We provide details of this on our [security page](https://octopus.com/docs/security).
 
CAIQ ID: **AAC-02.3**
 
> Do you conduct application penetration tests of your cloud infrastructure regularly as prescribed by industry best practices and guidance?
 
Yes. We provide details of this on our [security page](https://octopus.com/docs/security).
 
### Information System Regulatory Mapping

CAIQ ID: **AAC-03.1**

> Do you have a program in place that includes the ability to monitor changes to the regulatory requirements in relevant jurisdictions, adjust your security program for changes to legal requirements, and ensure compliance with relevant regulatory requirements?

Yes. We review the regulatory landscape on a quarterly basis and make changes to our internal policies & documentation as a result.

## Business Continuity Management & Operational Resilience

### Business Continuity Testing

CAIQ ID: **BCR-02.1**

> Are business continuity plans subject to testing at planned intervals or upon significant organizational or environmental changes to ensure continuing effectiveness?

Yes. We review our business continuity plan on an annual basis (or upon significant organizational and environmental change) and make changes to our internal policies & documentation as a result.

### Policy

CAIQ ID: **BCR-10.1**

> Are policies and procedures established and made available for all personnel to adequately support services operations' roles?

Yes. We continuously update our customer documentation, our internal documentation & staff training material. We use source control systems to store and publish these to ensure there is change tracking. Our engineers rotate into support roles on a regular basis to ensure that everybody is clear on how to support our customers and services.

### Retention Policy

CAIQ ID: **BCR-11.1**

> Do you have technical capabilities to enforce tenant data retention policies?

Yes. We're able to set this in back-end application logic as well as via our cloud infrastructure as required.

CAIQ ID: **BCR-11.3**

> Have you implemented backup or recovery mechanisms to ensure compliance with regulatory, statutory, contractual or business requirements?

Yes.

CAIQ ID: **BCR-11.7**

> Do you test your backup or redundancy mechanisms at least annually?

Yes

## Change Control & Configuration Management

### Unauthorized Software Installations

CAIQ ID: **CCC-04.1**

> Do you have controls in place to restrict and monitor the installation of unauthorized software onto your systems?

Yes. We automate the provisioning of infrastructure we use to deliver our services. Customers are not able to install software on their Octopus instances, however they are able to install software on dynamic workers that we provide for the purposes of running scripts and other automations. These systems are reserved per tenant, are short lived and periodically re-provisioned. We run real time antivirus protection on these dynamic workers.

## Data Security & Information Lifecycle Management

### E-commerce Transactions

CAIQ ID: **DSI-03.1**

> Do you provide standardized (e.g. ISO/IEC) non-proprietary encryption algorithms (3DES, AES, etc.) to tenants in order for them to protect their data if it is required to move through public networks (e.g., the Internet)?

Yes

CAIQ ID: **DSI-03.2**

> Do you utilize open encryption methodologies any time your infrastructure components need to communicate with each other via public networks (e.g., Internet-based replication of data from one environment to another)?

Yes

### Nonproduction Data

CAIQ ID: **DSI-05.1**

> Do you have procedures in place to ensure production data shall not be replicated or used in non-production environments?

Yes

### Secure Disposal

CAIQ ID: **DSI-07.1**

> Do you support the secure deletion (e.g., degaussing/cryptographic wiping) of archived and backed-up data?

Not Applicable. Data is stored on Azure, we are able to request secure deletion from that service if required. For more information please refer to the [Azure customer data protection documentation](https://docs.microsoft.com/en-us/azure/security/fundamentals/protection-customer-data).

CAIQ ID: **DSI-07.2**

> Can you provide a published procedure for exiting the service arrangement, including assurance to sanitize all computing resources of tenant data once a customer has exited your environment or has vacated a resource?

Yes. If customers would like to stop using our product, our website makes it easy to cancel or deactivate their instance. By default deactivated instances will be archived for 90 days from the deactivation date, to allow convenient reactivation if required. Customers are able to request deletion of their data at any time by contacting support. See our documentation for more details.

## Datacenter Security

### Asset Management

CAIQ ID: **DCS-01.2**

> Do you maintain a complete inventory of all of your critical assets located at all sites/ or geographical locations and their assigned ownership?

Yes. We don't have a datacentre or any physical critical assets.  Digitally critical assets and their ownership are listed in our business continuity plan.

### Controlled Access Points

CAIQ ID: **DCS-02.1**

> Are physical security perimeters (e.g., fences, walls, barriers, guards, gates, electronic surveillance, physical authentication mechanisms, reception desks, and security patrols) implemented for all areas housing sensitive data and information systems?

Not Applicable. We are a remote first company, while we do have a HQ facility, it doesn't house a data center or any other sensitive data or information systems.

### User Access

CAIQ ID: **DCS-09.1**

> Do you restrict physical access to information assets and functions by users and support personnel?

Not Applicable.

## Encryption & Key Management

### Key Generation

CAIQ ID: **EKM-02.1**

> Do you have a capability to allow creation of unique encryption keys per tenant?

Yes. Each tenant's sensitive data within an Octopus database is encrypted with its own unique Master Key. Our cloud provider provides encryption at rest for all other storage. For more information please refer to the [Azure customer data protection documentation](https://docs.microsoft.com/en-us/azure/security/fundamentals/protection-customer-data).

### Encryption

CAIQ ID: **EKM-03.1**

> Do you encrypt tenant data at rest (on disk/storage) within your environment?

Yes. This feature is provided by our cloud provider.

## Governance and Risk Management

### Baseline Requirements

CAIQ ID: **GRM-01.1**

> Do you have documented information security baselines for every component of your infrastructure (e.g., hypervisors, operating systems, routers, DNS servers, etc.)?

Yes. All of our infrastructure provisioning is automated. Changes to these templates must undergo code review.

### Policy

CAIQ ID: **GRM-06.1**

> Are your information security policies and procedures made available to all impacted personnel and business partners, authorized by accountable business role/function and supported by the information security management program as per industry best practices (e.g. ISO 27001, SOC 2)?

Yes

### Policy Enforcement

CAIQ ID: **GRM-07.1**

> Is a formal disciplinary or sanction policy established for employees who have violated security policies and procedures?

Yes. These actions are enforced by our employment contracts and defined in our policies.

### Policy Reviews

CAIQ ID: **GRM-09.1**

> Do you notify your tenant's when you make material changes to your information security and/or privacy policies?

Yes.

CAIQ ID: **GRM-09.2**

> Do you perform, at minimum, annual reviews to your privacy and security policies?

Yes.

## Human Resources

### Asset Returns

CAIQ ID: **HRS-01.1**

> Upon termination of contract or business relationship, are employees and business partners adequately informed of their obligations for returning organizationally-owned assets?

Yes.

### Background Screening

CAIQ ID: **HRS-02.1**

> Pursuant to local laws, regulations, ethics, and contractual constraints, are all employment candidates, contractors, and involved third parties subject to background verification?

Yes.


### Employment Agreements

CAIQ ID: **HRS-03.1**

> Do your employment agreements incorporate provisions and/or terms in adherence to established information governance and security policies?

Yes


### Employment Termination

CAIQ ID: **HRS-04.1**

> Are documented policies, procedures, and guidelines in place to govern change in employment and/or termination?

Yes.

### Training / Awareness

CAIQ ID: **HRS-09.5**

> Are personnel trained and provided with awareness programs at least once a year?

Yes. Our new hires are inducted with a security awareness program. Beyond that our people are coached on an as needed basis. We have an internal 'School of Security' that brings together people from all of our teams, to ensure we can discuss and disseminate timely advice.  We are looking to improve this, this year, by introducing a learning management program and an annual refresher video course & questionnaire.

## Identity & Access Management

## Audit Tools Access

CAIQ ID: **IAM-01.1**

> Do you restrict, log, and monitor access to your information security management systems (e.g., hypervisors, firewalls, vulnerability scanners, network sniffers, APIs, etc.)?

Yes

Our cloud vendors provide alerts and logging of unusual login behavior which are actioned by operations and security team members. Only authorized engineers are granted access to our information security systems.

CAIQ ID: **IAM-01.2**

> Do you monitor and log privileged access (e.g., administrator level) to information security management systems?

Yes. Our ISM systems are provided by cloud products and we're able to log administrator level access via their tooling.

### User Access Policy

CAIQ ID: **IAM-02.1**

> Do you have controls in place ensuring timely removal of systems access that is no longer required for business purposes?

Yes. We have an offboarding plan for staff that leave Octopus, only authorized engineers are able to access the production environment.

### Policies and Procedures

CAIQ ID: **IAM-04.1**

> Do you manage and store the identity of all personnel who have access to the IT infrastructure, including their level of access?

Yes.

### Source Code Access Restriction

CAIQ ID: **IAM-06.1**

> Are controls in place to prevent unauthorized access to your application, program, or object source code, and assure it is restricted to authorized personnel only?

Yes. All of our source code is stored on cloud based source control providers, and the majority of it is open source. Only approved staff members are granted access to private repositories and MFA is required for authentication. We have automated alerts to detect anomalous access rights events.

CAIQ ID: **IAM-06.2**

> Are controls in place to prevent unauthorized access to tenant application, program, or object source code, and assure it is restricted to authorized personnel only?

Yes. Tenant source code is held in per tenant databases and is only accessible by users invited by the tenant owner. Only authorized Octopus Deploy engineers, in compliance with internal policies and procedures are granted temporary access to tenant data if requested by the tenant for the purposes of diagnostics and troubleshooting. Any customer data that was shared with us by customers for support and diagnostics is automatically removed from our upload system within 7 days.

### User Access Restriction / Authorization

CAIQ ID: **IAM-08.1**

> Do you document how you grant, approve and enforce access restrictions to tenant/customer credentials following the rules of least privilege?

Yes. We do not grant access to customer credentials. In support scenarios we have automated processes that grant authorized engineers access to a tenant. In these cases access is stricly audited and visible to our customer.

### User Access Reviews

CAIQ ID: **IAM-10.1**

> Do you require a periodical authorization and validation (e.g. at least annually) of the entitlements for all system users and administrators (exclusive of users maintained by your tenants), based on the rule of least privilege, by business leadership or other accountable business role or function?

Yes.

### User Access Revocation

CAIQ ID: **IAM-11.1**

> Is timely deprovisioning, revocation, or modification of user access to the organizations systems, information assets, and data implemented upon any change in status of employees, contractors, customers, business partners, or involved third parties?

Yes

## Infrastructure & Virtualization Security

### Audit Logging / Intrusion Detection

CAIQ ID: **IVS-01.1**

> Are file integrity (host) and network intrusion detection (IDS) tools implemented to help facilitate timely detection, investigation by root cause analysis, and response to incidents?

Not Applicable. The majority of our cloud infrastructure is provided by PaaS applications so this doesn't apply. Our dynamic workers are built on IaaS which will alert us to anomalous network or egress traffic behavior. Our website is protected by a web application firewall.

CAIQ ID: **IVS-01.2**

> Is physical and logical user access to audit logs restricted to authorized personnel?

Yes

CAIQ ID: **IVS-01.5**

> Are audit logs reviewed on a regular basis for security events (e.g., with automated tools)?

Yes. The cloud services we use provide alerting for anomalous access & failed access attempts, these are human reviewed as required. Application error and uptime notifications are also reviewed as needed.

### Clock Synchronization

CAIQ ID: **IVS-03.1**

> Do you use a synchronized time-service protocol (e.g., NTP) to ensure all systems have a common time reference?

Not Applicable. The majority of our cloud infrastructure are Azure PaaS resources.

### OS Hardening and Base Controls

CAIQ ID: **IVS-07.1**

> Are operating systems hardened to provide only the necessary ports, protocols, and services to meet business needs using technical controls (e.g., antivirus, file integrity monitoring, and logging) as part of their baseline build standard or template?

Yes.

### Production / Non-Production Environments

CAIQ ID: **IVS-08.1**

> For your SaaS or PaaS offering, do you provide tenants with separate environments for production and test processes?

Yes. Customers are able to start multiple, separate  Octopus instances for testing and production, or they can use our internal environment modeling features.

CAIQ ID: **IVS-08.3**

> Do you logically and physically segregate production and non-production environments?

Yes

### Segmentation

CAIQ ID: **IVS-09.1**

> Are system and network environments protected by a firewall or virtual firewall to ensure business and customer security requirements?

Yes. Our public facing websites are protected with a WAF service.

### VMM Security - Hypervisor Hardening

CAIQ ID: **IVS-11.1**

> Do you restrict personnel access to all hypervisor management functions or administrative consoles for systems hosting virtualized systems based on the principle of least privilege and supported through technical controls (e.g., two-factor authentication, audit trails, IP address filtering, firewalls and TLS-encapsulated communications to the administrative consoles)?

Yes. Access to infrastructure virtualization portals is restricted to authorized engineers only using IAM, MFA and TLS. Login anomaly detection is alerted and actioned by operations or security team members. 

### Wireless Security

CAIQ ID: **IVS-12.1**

> Are policies and procedures established and mechanisms configured and implemented to protect the wireless network environment perimeter and to restrict unauthorized wireless traffic?

Yes. Most of the time our staff work remotely, however our HQ does offer authorized devices wifi access to allow internet access which is used on an occasional  basis. There is no data or critical infrastructure stored at our HQ. Wifi access is granted according to our wifi policy.

CAIQ ID: **IVS-12.2**

> Are policies and procedures established and mechanisms implemented to ensure wireless security settings are enabled with strong encryption for authentication and transmission, replacing vendor default settings (e.g., encryption keys, passwords, SNMP community strings)?

Yes.

CAIQ ID: **IVS-12.3**

> Are policies and procedures established and mechanisms implemented to protect wireless network environments and detect the presence of unauthorized (rogue) network devices for a timely disconnect from the network?

Not Applicable. Being a remote first company, we don't own wireless networks to provide or support our products, there is no 'corporate intranet' or in house data center. All access to our production environments requires authentication using two factor authentication over HTTPS connections.

## Interoperability & Portability

### APIs

CAIQ ID: **IPY-01.1**

> Do you publish a list of all APIs available in the service and indicate which are standard and which are customized?

Yes. Our product is built 'API first' We provide usage examples on GitHub and have extensive user documentation on our website. We have .NET based client libraries available for interoprating with our API.

## Mobile Security

### Approved Applications

CAIQ ID: **MOS-03.1**

> Do you have a policy enforcement capability (e.g., XACML) to ensure that only approved applications and those from approved application stores can be loaded onto a mobile device?

No. We haven't implemented an MDM solution, for a few reasons: our size, the fact that we discourage our employees from using their mobile devices for work and that most of our systems require a full size screen in order to be useful. However this is an area that we're looking to make improvements on. We'll review the status of this at our next security compliance review.

## Security Incident Management, E-Discovery, & Cloud Forensics

### Incident Management

CAIQ ID: **SEF-02.1**

> Do you have a documented security incident response plan?

Yes.

CAIQ ID: **SEF-02.4**

> Have you tested your security incident response plans in the last year?

Yes.

### Incident Reporting

CAIQ ID: **SEF-03.1**

> Are workforce personnel and external business relationships adequately informed of their responsibility, and, if required, consent and/or contractually required to report all information security events in a timely manner?

Yes.

Our employees are trained in how to communicate incidents internally and our customers are kept informed of incidents that affect their service via our status page. In cases that affect a small subset of our customers we may reach out directly to those affected customers.

CAIQ ID: **SEF-03.2**

> Do you have predefined communication channels for workforce personnel and external business partners to report incidents in a timely manner adhering to applicable legal, statutory, or regulatory compliance obligations?

Yes.

### Incident Response Legal Preparation

CAIQ ID: **SEF-04.4**

> Do you enforce and attest to tenant data separation when producing data in response to legal subpoenas?

Yes.

## Supply Chain Management, Transparency, and Accountability

### Incident Reporting

CAIQ ID: **STA-02.1**

> Do you make security incident information available to all affected customers and providers periodically through electronic methods (e.g., portals)?

Yes.

### Network / Infrastructure Services

CAIQ ID: **STA-03.1**

> Do you collect capacity and use data for all relevant components of your cloud service offering?

Yes

### Third Party Agreements

CAIQ ID: **STA-05.4**

> Do third-party agreements include provision for the security and protection of information and assets?

No. All new third party agreements will be reviewed for such provisions, and we're in the process of reviewing existing contracts. We will review the status of this at our next security compliance review.

CAIQ ID: **STA-05.5**

> Do you have the capability to recover data for a specific customer in the case of a failure or data loss?

Yes.

### Supply Chain Metrics

CAIQ ID: **STA-07.4**

> Do you provide tenants with ongoing visibility and reporting of your operational Service Level Agreement (SLA) performance?

Not Applicable | Octopus Deploy doesn't offer an SLA or SLA Performance monitoring, however we do communicate service disruptions to our status page.

### Third Party Audits

CAIQ ID: **STA-09.1**

> Do you mandate annual information security reviews and audits of your third party providers to ensure that all agreed upon security requirements are met?

No. All new third party agreements will be reviewed for such commitments, and we're in the process of reviewing existing contracts. We will review the status of this at our next security compliance review.

## Threat and Vulnerability Management

### Antivirus / Malicious Software

CAIQ ID: **TVM-01.1**

> Do you have anti-malware programs that support or connect to your cloud service offerings installed on all of your IT infrastructure network and systems components?

No. A large majority of our system components are provisioned using PaaS services, whose infrastructure we don't own. Threat & vulnerability management for those applications is tackled via automated tools that review our source code, and ultimately human review. The production components that do use IaaS use real time anti-virus. Employees are required to use default operating system anti-virus applications running when using company provisioned hardware.

### Vulnerability / Patch Management

CAIQ ID: **TVM-02.5**

> Do you have a capability to patch vulnerabilities across all of your computing devices, applications, and systems?

Yes. Employees are required to use automatic updates on their company provisioned hardware. We don't issue employees with mobile technology such as mobile phones or tablets. Our applications are automatically patched and deployed where compatible libraries exist, and this is done manually otherwise.

### Mobile Code

CAIQ ID: **TVM-03.1**

> Is mobile code authorized before its installation and use, and the code configuration checked, to ensure that the authorized mobile code operates according to a clearly defined security policy?

Not Applicable. We don't issue employees with mobile technology such as mobile phones or tablets.
