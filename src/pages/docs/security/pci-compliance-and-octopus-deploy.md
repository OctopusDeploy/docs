---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: PCI compliance and Octopus Deploy
description: Using Octopus Deploy in PCI compliant environments.
navOrder: 90
---

We have a lot of customers running Octopus Deploy in their PCI compliant environments. We don't claim to be experts in PCI compliance, especially since every situation is slightly different. What we can do is offer some recommendations primarily focused on your use of Octopus Deploy and different models you can achieve with it.

## Try not to give up too much automation

Pessimistic approaches to PCI compliance controls will, at first glance, make it more difficult to automate certain activities. One of the main benefits to using Octopus Deploy is end-to-end automation and we recommend not giving that up without spending time to understand why the automation is considered "harmful". Quite often our customers find that leveraging end-to-end automation in Octopus Deploy makes implementing compliance controls and auditing easier. It's often a case of working with your auditor and their concerns on a case-by-case basis.

## How Octopus Deploy can help with PCI compliance {#PCIComplianceandOctopusDeploy-HowOctopusDeploycanhelpwithPCICompliance}

PCI Compliance is primarily concerned with implementing "controls" or "practices" which help ensure the safety and security of sensitive information, and the ability to audit that those practices are being enforced and followed. In many ways, full end-to-end automation helps with that since the interaction with your secure systems is tightly controlled: everything is scripted!

- In Octopus Deploy, everything is scripted which leaves less room for human error or uncontrolled activities.
- Octopus Deploy supports authentication with Active Directory and other external identity providers which can be used to enforce multi-factor authentication. Learn about [authentication providers](/docs/security/authentication).
- You can implement strict, fine-grained, environment-aware security permissions. Learn about [managing users and teams](/docs/security/users-and-teams).
- Every activity is carefully audited. Learn more about [auditing](/docs/security/users-and-teams/auditing).
- You can control how long you retain data and packages. Learn about [Retention Policies](/docs/administration/retention-policies).
- You can use any kind of transparent networking security techniques like IPSec tunnels or VPN between your network zones.
- If you are using our Tentacle agent, you can decide whether you want to allow network traffic inbound to your PCI zone from your Octopus Server, or outbound from your PCI zone to your Octopus Server. Learn about [Tentacle communication modes](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication).
- You can insert an HTTP proxy server between Octopus Server and any Tentacles or SSH endpoints. This is helpful when you want to have DMZs in your network with controlled entry/exit points. Learn about [proxy support](/docs/infrastructure/deployment-targets/proxy-support).
- If you really cannot use Tentacle or SSH, you can use offline package drops for fully disconnected deployment automation. Learn about the [offline package drop](/docs/infrastructure/deployment-targets/offline-package-drop) deployment target.
- If you require isolated instance of Octopus Server our licensing model is quite flexible. Each license of Octopus Deploy grants you the right to install and configure up to three (3) separate instances of Octopus Server. Learn about managing [Isolated Octopus Servers](/docs/installation/isolated-octopus-deploy-servers).

## Security considerations {#PCIComplianceandOctopusDeploy-Securityconsiderations}

- Learn about [Octopus - Tentacle communication](/docs/security/octopus-tentacle-communication) to understand how automation instructions are transmitted securely to maintain trust.
  - We recommend using the latest version of Octopus Deploy whenever possible.
- Learn about [security and encryption](/docs/security/data-encryption) of sensitive information in Octopus Deploy.
- Learn about how Octopus Deploy handles [sensitive variables](/docs/projects/variables/sensitive-variables).

:::div{.success}
We conduct independent security analysis and penetration testing for Octopus Deploy. Contact our support team for a copy of the most recent report.
:::

### Network security considerations

Octopus supports a wide range of networking features to help fit into your PCI compliant network design.

- You can use a VPN between your network security zones. A VPN is a transparent network tunnel between two zones, and you can happily use our Tentacle or SSH connections through a VPN tunnel in the same way you can use them on a local network.
- You can use a networking proxy for Tentacle or SSH communication, where the proxy controls and monitors access from your Octopus Server to your workers and deployment targets. [Learn about proxy support](/docs/infrastructure/deployment-targets/proxy-support)
- If you are using our Tentacle agent, you can configure it in listening mode (`Octopus Server -> Tentacle`) or polling mode (`Tentacle -> Octopus Server`) which changes the direction traffic flows through your firewalls. [Learn about Tentacle communication modes](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication).

Your security and networking team should be able to help you make these decisions based on how you have decided to design your network for PCI compliance.
