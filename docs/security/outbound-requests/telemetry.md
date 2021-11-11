---
title: Telemetry
description: Telemetry from Octopus Server and what is included
position: 25
---

Telemetry reporting is enabled by default. We use the data we receive to inform our decisions and to help us make a better product. You can opt-out of sending telemetry by navigating to **{{Configuration,Telemetry}}** in Octopus.

When the "Telemetry Reporting" option is enabled, Octopus will make a HTTPS request, this request includes:

- The current Octopus Deploy version number that you are running.
- A unique installation ID (read more below).
- Telemetry data payload

When the "Telemetry Reporting" option is enabled, we'll send some specific aggregate criteria along with the request. This has evolved a bit over time, so it depends on the version you are running:

| Metrics       | Since   |
| ------------- | ------- |
| The number of environments that you have | <2.6 |
| The number of machines and deployment targets that you have (including Listening Tentacles, Polling Tentacles, Offline package drops, Azure Web Apps, Azure Cloud Services, Kubernetes and SSH connections) | <2.6 |
| The number of projects that you have | <2.6 |
| The number of each of the different types of deployment steps that you have | <2.6 |
| The number of releases and deployments that you have done in the last 90 days | <2.6 |
| The number of users that you have | <2.6 |
| A SHA1 hash of your license key serial number | 2.6 |
| The amount of memory Octopus is using | 2.6 |
| The % of CPU Octopus is using on average | 2.6 |
| The number of channels you are using | 3.2 |
| Usage of multi-tenant features (number of tenants, number of tenant tags) | 3.4 |
| The number of certificates you have | 3.11.2 |
| The time to your first deployment | 3.12 |
| Whether you are using LetsEncrypt | 3.15 |
| Whether you are using the guest account | 3.16.1 |
| The number of each of the different community steps you have | 2018.2.2 |
| The number of Azure accounts and AWS accounts | 2018.2.2 |
| Whether you have a custom account configured for the built-in worker | 2018.2.2 |
| The number of non built-in workers you have | 2018.2.2 |
| Number of projects using release note templates and the date of the last metadata event | 2019.4.0 |
| The number of monthly active users that you have | 2019.5.1 |
| The operating systems of the server and targets | 2019.5.4 |
| The number and type of issue trackers that you use | 2019.4 |
| The number of Runbooks and Runbook runs, snapshots, Triggers that you have | 2019.10 |
| Whether the server is running in a container | 2020.1.21 |
| The usage of step configuration options | 2020.2.5 |
| Aggregated type, result code and duration of database and api calls | 2020.2.14 |
| Counts of specific kinds of events that occur internally, e.g. usage of deprecated code paths, errors | 2020.3.0 |
| Structured Configuration Variable usage across projects including how many steps have Structured Configuration Variables enabled and what file extensions are being used | 2020.4.0 |
| OS Architecture of Deployment Target Tentacles | 2021.1.0 |
| The number of Projects that are version controlled | 2021.2.0 |

The installation ID is a GUID that we generate when Octopus is installed. This GUID is simply a way for us to get a rough idea of the number of installations there are in the wild, and which versions people are using, so we can make decisions about backwards compatibility support.

Together, this information helps us when making decisions about the product. For example, we expected users to only have a handful of machines, but the statistics tell us that some customers have over 900; we now take that into account when designing the user experience.

Be assured that names, descriptions, URI's and so on are _never_ included. You can download a preview of the data that will be sent by clicking on the "Download Preview" button on the **{{Configuration,Telemetry}}** page

Please do consider enabling "Telemetry Reporting". We look at the data every week, and it really does help us to make a better product.
