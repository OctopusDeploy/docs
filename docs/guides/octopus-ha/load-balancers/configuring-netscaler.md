---
title: Configuring Netscaler
---

```bash
#Servers
add server octopus-node1_SVR 192.168.0.1
add server octopus-node2_SVR 192.168.0.2

#Service Group
add serviceGroup octopusdeploy_GRP HTTP
bind serviceGroup octopusdeploy_GRP octopus-node1_SVR 80
bind serviceGroup octopusdeploy_GRP octopus-node2_SVR 80
bind serviceGroup octopusdeploy_GRP -monitorName ping

#LB
add lb vserver octopusdeploy_LB HTTP 0.0.0.0 0
bind lb vserver octopusdeploy_LB octopusdeploy_GRP

#HTTP CS
add cs vserver octopusdeploy_CS_HTTP HTTP 10.0.0.1 80 -cltTimeout 180 -Listenpolicy None
bind cs vserver octopusdeploy_CS_HTTP -lbvserver ssl-only-redirect_LB

#HTTP CS
add cs vserver octopusdeploy_CS_HTTPS SSL 10.0.0.1 443 -cltTimeout 180 -Listenpolicy None
bind cs vserver octopusdeploy_CS_HTTPS -lbvserver octopusdeploy_LB

#Cipher and Cert Bindings
bind ssl vserver octopusdeploy_CS_HTTPS -cipherName DEFAULT_HA_CIPHERS
bind ssl vserver octopusdeploy_CS_HTTPS -certkeyName mydomain.com
```
