---
layout: src/layouts/Default.astro
pubDate: 2024-11-08
modDate: 2024-11-08
title: Octopus Cloud Frequently Asked Questions
navTitle: Octopus Cloud FAQ
navOrder: 70
description: Common questions about Octopus Cloud, with answers and links to more detail.
---
This page answers the most common questions about Octopus Cloud. 

If you have an unanswered question, please use the "Send Feedback" button at the foot of this page or [contact our Sales team](https://octopus.com/company/contact).

## Getting started

### What is Octopus Cloud?
Octopus Cloud is the easiest way to start with Octopus Deploy; we take care of everything for you. Octopus Cloud has the same functionality as Octopus Server, delivered as a highly available, scalable, secure SaaS application hosted for you. 

### Where do I begin?
Many customers begin with our [getting started](/docs/getting-started) guide, which covers the key concepts and terminology we use. When you’re ready, [start a free trial](https://octopus.com/start) to explore Octopus Cloud.

### How is Octopus Cloud built? 
Our [Octopus Cloud architecture](https://octopus.com/blog/octopus-cloud-architecture) overview describes how Octopus Cloud is delivered. 

## Training & Setup

### What training is available?
Our [Resource Center](https://octopus.com/resource-center) provides high-quality webinars, blog posts, white papers, and free tools. We also offer [books with free PDF versions](https://octopus.com/publications) covering Octopus and broader DevOps topics. We pride ourselves on the quality of our [developer documentation](/docs) and provide free [training video tutorials](https://www.youtube.com/playlist?list=PLAGskdGvlaw268i2ZTPC1ZrxwFjjKIdKH). We support a [community Slack channel](https://octopususergroup.slack.com/join/shared_invite/zt-170c1xzfl-J_pWvCeNZ4H_LmGVE4XNtw#/shared-invite/email) where our staff regularly assist with customer inquiries.

Professional and Enterprise tier customers receive access to our Support team and expert-guided onboarding. Enterprise tier customers can add on Technical Account Management services. Enterprise tier customers with over USD $50,000 licenses are assigned a Customer Success Manager. 

### Can we get support for our initial setup?
Professional and Enterprise tier customers receive our expert-guided onboarding Support. Our [Sales and Support teams](https://octopus.com/company/contact) are highly responsive and available to every customer. 


## Purchasing

### How do I purchase Octopus Cloud?
We recommend new customers [start a free trial](https://octopus.com/pricing/overview) to get 30 days of access to Octopus Cloud Professional. A credit card is not required. [Contact Sales](https://octopus.com/company/contact) during the trial period to convert to an annual subscription with no data loss. 

### How can I trial Enterprise tier?
Please [contact Sales](https://octopus.com/company/contact) to trial Octopus Cloud Enterprise tier. Enterprise provides more projects, tenants, machines, and a higher task cap.

### What does Octopus Cloud cost?
We license Octopus Cloud in tiers. Our Starter tier costs USD $360 per year, and it allows ten projects, ten tenants, ten machines, and a task cap of five. There are no additional platform fees.

Our Professional and Enterprise tiers are [annual licenses priced per project](https://octopus.com/pricing/overview), with tenants and machines sold as add-ons to suit your requirements. Additionally, we charge Professional and Enterprise tier customers a [flat annual platform fee](https://octopus.com/pricing/faq#what-is-the-pricing-for-octopus-cloud) based on the task cap selected, which defines the number of concurrent deployments/runbook runs your instance can perform. 

### Do you support monthly billing?
No. Annual billing is the only option for Octopus Cloud subscriptions.

### How do I get a quote?
Our Sales team can [provide a quote](https://octopus.com/company/contact) that meets your requirements. 

### How do I use a purchase order?
For customers purchasing or renewing on Starter, simply enter a Customer Reference in the online form. This value will appear on the quote or invoice PDF that we generate. 
For customers on Professional or Enterprise, please provide our Sales team with your purchase order, which will be included in your quote or invoice.

### Where can I learn more about pricing?
Please refer to our dedicated [Octopus pricing](https://octopus.com/pricing/overview) overview and our [Octopus Cloud pricing FAQ](https://octopus.com/pricing/faq#octopus-cloud-section). Alternatively, please [contact our Sales team](https://octopus.com/company/contact) who can answer any other questions you may have.

## Data Centers

### Where is Octopus Cloud hosted? 
We [host Octopus Cloud](/docs/octopus-cloud#octopus-cloud-hosting-locations) in the following Azure regions:
* West US 2
* West Europe
* Australia East
  
Each customer's Octopus Cloud is wholly located within a single Azure region.

### Where are the data centers located? 
Each customer's Octopus Cloud is wholly located within a single Azure region. Microsoft publishes [data center information](https://datacenters.microsoft.com/) for each Azure region. 

### Can we choose another Azure region?
Please [contact our sales team](https://octopus.com/company/contact) to discuss this.

### Can I move my Octopus Cloud to another region?
Yes. [Contact Support]((https://octopus.com/company/contact)) to arrange the relocation.

## Security

### How does Octopus Cloud approach security?
We pride ourselves on making Octopus Deploy a [secure product](/docs/security#octopus-cloud). In addition, Octopus Cloud instances are [secure and compliant](/docs/octopus-cloud#secure-and-compliant-out-of-the-box) out of the box. 

### Is Octopus Cloud compliant with GDPR?
Octopus complies with the European Union's General Data Protection Regulation ([GDPR](https://octopus.com/legal/gdpr)). 

### Is Octopus Cloud compliant with SOC 2?
We are regularly audited and maintain a SOC 2 Type II certification. You can request access to our confirmation from our [Trust Center](https://octopus.com/company/trust).

### Is Octopus Cloud compliant with ISO 27001?
Our information security management system has been assessed and found to conform with ISO 27001:2013. You can view our certificate via our [Trust Center](https://octopus.com/company/trust).

### Is Octopus Cloud compliant with HIPAA?
Octopus Deploy is not a covered entity under HIPAA. We do not process personally identifiable health data directly or on behalf of our customers. Octopus Cloud has global healthcare industry customers operating on our platform. 

### Where can I learn more about Octopus Deploy compliance?
The security and privacy of our customers' personal, company, and intellectual property data are top priorities at Octopus. We're dedicated to maintaining and continuously improving our security and compliance programs, which we publish on our [Trust Center](https://octopus.com/company/trust).

### Which authentication providers are supported?
Octopus Cloud supports the most common [authentication providers](/docs/security/authentication/auth-provider-compatibility#login-support) out of the box.

### What level of encryption is used between an Octopus Server and a Tentacle?
All communication between the Tentacle and Octopus is performed over a secure TLS connection. We recommend TLS1.2+. We configure the [trust relationship](/docs/security/octopus-tentacle-communication) between Octopus Server and a Tentacle using public-key cryptography. The server and Tentacle establish the trust relationship using [X.509 self-signed certificates](/docs/security/octopus-tentacle-communication#Octopus-Tentaclecommunication-Octopuscertificates) generated upon installation and using 2048-bit private keys.

### How secure is Tentacle communication?
Octopus Cloud communicates with Tentacles you deploy on your targets via SSL-encrypted data transmitted over a TCP connection. You can set up [Tentacle communication](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication) modes as listening (acting as the TCP server) or polling (acting as the TCP client). Many customers prefer polling for greater security of the Tentacle host.

### Can a Tentacle access customer data?
Every process within a Tentacle is executed by the user account configured on its service. Tentacles can be configured to run under a [specific user account](/docs/infrastructure/deployment-targets/tentacle/windows/running-tentacle-under-a-specific-user-account) if elevated or alternative permissions are required. The user account configured constrains the Tentacle's access to data.

### Does Octopus Cloud have any security vulnerabilities? 
We make a list of all [our security advisories](https://advisories.octopus.com/) public, including any current vulnerabilities. We practice responsible disclosure as detailed in our [security disclosure policy](https://octopus.com/security/disclosure).

### Has Octopus Cloud had any vulnerabilities in the past?
Yes. We pride ourselves on making Octopus Deploy a secure product, but no software is ever bug-free, and occasionally, there have been security issues. We have published [all of our historical advisories](https://advisories.octopus.com/) since 2021. 

## Migration

### How do I migrate from self-hosted Octopus Server to Octopus Cloud? 
We have a [step-by-step](/docs/octopus-cloud/migrations) guide. 
The benefits of migrating from self-hosted to Octopus Cloud include:
* Likely lower total cost of hosting - taking into account the saving of having your people focused on your mission, not maintenance
* Cloud customers get access to the latest features and functionality.
* Lower risk - Once a CVE or bug is found, we issue a patch and automatically apply it. 
* We perform maintenance that many customers do not (rebuild indexes, backup files and databases, have a recovery plan)
* Monitoring and uptime - We monitor every instance to ensure it is online. When it goes offline, we attempt to automatically recover it, and failing that, we start paging our support teams.

### Can we trial Octopus Cloud while we decide on migration? 
Yes. We can arrange temporary licenses to ensure you are not being double-billed during the trial. [Contact our Sales team](https://octopus.com/company/contact) to arrange.

### How can I determine my current Octopus Server usage? 
We have diagnostic scripts we can share with you that make gathering metrics about your configuration and usage easy. [Contact our Support team](https://octopus.com/company/contact) to request access.

## Updates

### How often is Octopus Cloud updated?
Octopus Cloud is a modern SaaS application that receives frequent updates. New features become available in Octopus Cloud before they become available to our self-host customers. We release bug fixes and improvements regularly and, when necessary, apply these during your [maintenance window](/docs/octopus-cloud/maintenance-window), typically once or twice weekly. 

### When are updates performed?
Regular maintenance and product updates are applied during your [maintenance window](/docs/octopus-cloud/maintenance-window), typically once or twice weekly. We may need to apply critical security patches outside of this schedule, and our Support team contacts customers in advance if such a patch is required.

### How do I know what was upgraded?
We publish our [release updates](https://octopus.com/whatsnew) and provide a [release comparison tool](https://octopus.com/downloads/compare). Our [product roadmap](https://roadmap.octopus.com) is public and shows the [features released recently](https://roadmap.octopus.com/tabs/3-released).

## Availability

### What is Octopus Cloud’s uptime SLO?
Octopus Cloud's monthly [uptime SLO](/docs/octopus-cloud/uptime-slo) is 99.5%, measured for the 95% percentile of Cloud instances. This target includes all downtime, including scheduled maintenance.

### How is uptime monitored?
Our Cloud Platform team observes uptime and planned downtime durations as part of frequent health checks. We use a third-party vendor to assess availability every minute of the day.

### How can we check Octopus Cloud's status?
We publish Octopus Cloud's [operational status](https://status.octopus.com/). You can subscribe to status change emails from our [operational status page](https://status.octopus.com/).

## Logs & Data

### How do we access deployment and audit logs? 
Deployment and access logs can be viewed and downloaded from Octopus Cloud. Enterprise-tier customers can [stream audit logs](/docs/security/users-and-teams/auditing/audit-stream) to their SIEM system.

### What is the data backup and retention policy?  
Our [retention policies](/docs/administration/retention-policies) allow you to control how Octopus decides which releases, packages, and files are kept. The retention policy is set to 30 days by default. [Backups](/docs/administration/data/backup-and-restore) are subject to [storage thresholds](/docs/octopus-cloud#octopus-cloud-storage-limits), 1TB by default. You can arrange more via our Sales team if required. 

### What access do Octopus staff have to our data?
All access is protected by Multi-Factor Authentication (MFA), Role-Based Access Control (RBAC), and the Principle of Least Privilege (PLP).
In case of issues related to your data or the availability of your Cloud instance, Support Users can be granted temporary access to your Cloud instance, and queries can be run against your Cloud instance database. Only competent, trained, background-checked, and authorized engineers can gain such access. These activities are tightly controlled and have automatic revocation of access mechanisms.

Microsoft Azure may have infrastructure access and, as such, would also have access, as controlled by our service agreements with them.

Also, Octopus Cloud publishes [limited telemetry](/docs/security/outbound-requests/telemetry), which we use to track quality of service.

### Is access to our data logged? 
We log all access to Octopus Cloud instance databases and file storage.

### Is data access actively monitored? 
Our SecOps team has monitoring and alerting in place based on patterns of suspicious activity. Monitoring focuses on Support Users being granted temporary access to a Cloud instance and queries being run by our staff against Cloud instance databases. Both of these activities are tightly controlled and logged, and access mechanisms are automatically revoked.
Only authorized, skilled, and trained engineers who are employed by Octopus Deploy may be granted temporary access. 

Microsoft Azure may have infrastructure access and, as such, would also have access, as controlled by our service agreements with them.

### How is data storage redundancy provided?
All data storage is redundant. We use [Azure Storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy), allowing us to have geo-redundant backups of your Octopus Cloud database and zone-redundant backups of your Octopus Cloud file share. 

### What is your disaster recovery process?
Octopus Cloud has a well-defined [disaster recovery](/docs/octopus-cloud/disaster-recovery) process.

### How often are backups performed? 
We take Octopus Cloud database backups using Azure’s [automated backup](https://learn.microsoft.com/en-us/azure/azure-sql/database/automated-backups-overview?view=azuresql&tabs=single-database#backup-frequency) process. Full backups are performed weekly, differential backups every 12 or 24 hours, and transaction log backups approximately every 10 minutes.

