---
title: Deploying to Azure via a Firewall
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
position: 29
---

All the Azure steps in Octopus are executed from the VM where the Octopus Server is running. So to able to successfully deploy to the Microsoft cloud, you need to make sure your Octopus Server can reach it through the network.

If you need to add firewall exclusions to a whitelist, here are a few things to take into consideration:

- Figure out which Azure Data Centers you will be targeting
- Figure out which Azure services you will be targeting in those Data Centers
- Configure a whitelist from the Octopus Server to the appropriate IP Address Ranges

Download the latest list of IP Address Ranges from the [Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=41653) (updated weekly).