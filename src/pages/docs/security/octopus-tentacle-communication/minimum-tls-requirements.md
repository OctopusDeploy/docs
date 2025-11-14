---
layout: src/layouts/Default.astro
pubDate: 2025-11-14
modDate: 2025-11-14
title: Minimum TLS Requirements
description: Minimum requirements for TLS communications between Octopus and Tentacles.
navOrder: 3
---

# Minimum TLS Requirements

Octopus Server and Tentacle use **RSA-based X.509 certificates** to establish mutual trust. 

TLS configuration, cipher selection, and protocol enforcement are handled by the underlying operating system \- **Schannel** on Windows and **OpenSSL** on Linux.

If your environment enforces custom cipher or TLS hardening policies, it must still meet the **minimum requirements** below to ensure connectivity between the Octopus Server and Tentacle agents. As TLS negotiation depends on both peers, each host must support at least one compatible protocol, cipher suite, and signature algorithm to complete the handshake.

:::div{.note}  
This document defines the *minimum configuration required* for Octopus to communicate securely. You may apply any additional TLS 1.2 / 1.3 hardening, cipher ordering, or protocol restrictions that meet your organization’s security standards, provided the required items below remain enabled. Octopus does **not** prescribe a complete enterprise security baseline \- only the interoperability boundary required for successful Server \<-\> Tentacle trust.  
:::

## Protocols

* TLS 1.2 \- Minimum recommended  
* TLS 1.3 \- Optional


:::div{.warning}  
While self-hosted Octopus Server instances are compatible with TLS 1.0 and TLS 1.1 (if configured), these protocols are generally considered insecure and are **not recommended** for use.  
:::

## Cipher Suites

| Function | Windows / Schannel name | OpenSSL name |
| :---- | :---- | :---- |
| ECDHE with RSA, AES-128, GCM, SHA-256 | TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256 | ECDHE-RSA-AES128-GCM-SHA256 |
| ECDHE with RSA, AES-256, GCM, SHA-384 | TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384 | ECDHE-RSA-AES256-GCM-SHA384 |
| ECDHE with RSA, ChaCha20-Poly1305, SHA-256 | TLS\_CHACHA20\_POLY1305\_SHA256 | TLS\_CHACHA20\_POLY1305\_SHA256 |

These suites provide forward secrecy (**ECDHE**) and authenticated encryption (**AES-GCM**) for Octopus’s RSA certificates. 

## Signatures and Hashes

* `SHA-256`  
* For **TLS 1.3**, ensure your configuration supports at least one of the following RSA signature schemes:  
  * `rsa_pkcs1_sha256`  
  * `rsa_pss_rsae_sha256`

Many off-the-shelf TLS 1.3 hardening templates disable **PKCS\#1 v1.5** padding entirely. Octopus uses an RSA certificate signed with PKCS\#1 v1.5, and removing this support will break TLS 1.3 handshakes. Ensure that either **RSA-PSS** or **RSA-PKCS\#1 v1.5** remains available.

## Key Exchanges and Curves

* `ECDHE`  
* `secp256r1 (P-256)`

Octopus communication uses **ECDHE** key exchange for forward secrecy. Ensure that at least one elliptic curve remains enabled \- we recommend keeping `secp256r1` (NIST P-256).