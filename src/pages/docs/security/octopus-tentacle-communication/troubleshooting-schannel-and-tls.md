---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-11-14
title: Troubleshooting Schannel and TLS
description: Troubleshooting Octopus secure communication issues with Schannel and TLS.
---


# Troubleshooting TLS Communication Between Octopus Server and Tentacle


Octopus Server and Tentacle establish secure communication using **TLS with mutual RSA certificate authentication**. TLS configuration is handled by the underlying operating system - **Schannel** on Windows and **OpenSSL** on Linux.


This guide helps you diagnose and resolve TLS handshake failures between Octopus Server and Tentacle agents.


:::div{.hint}
Before troubleshooting, ensure both systems meet the [minimum TLS requirements](/docs/security/octopus-tentacle-communication/minimum-tls-requirements) for protocol versions, cipher suites, and signature algorithms.
:::


## Common Symptoms


TLS communication failures typically manifest as:


- Connection timeouts or handshake failures in Octopus Server logs and deployment task logs
- Tentacle health checks failing with TLS-related errors
- Event log errors on Windows mentioning Schannel or certificate validation
- OpenSSL handshake errors on Linux systems


## Quick Diagnostic Steps


### 1. Verify Protocol Support


Ensure both the Octopus Server and Tentacle support at least **TLS 1.2**. TLS 1.3 is recommended but optional.


**Windows (GUI):**

[IISCrypto from Nartac Software](https://www.nartac.com/Products/IISCrypto) can be used to easily view and change Schannel settings on Windows. Changing the Schannel configuration always requires a machine restart.


**Windows (PowerShell):**
```powershell
# Check TLS 1.2 registry settings
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client' -Name Enabled -ErrorAction SilentlyContinue
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server' -Name Enabled -ErrorAction SilentlyContinue


# Check TLS 1.3 registry settings (Windows Server 2022+ / Windows 11+)
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3\Client' -Name Enabled -ErrorAction SilentlyContinue
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3\Server' -Name Enabled -ErrorAction SilentlyContinue
```


**Linux:**
```bash
# Check OpenSSL TLS support
openssl s_client -connect <Octopus-host>:10943 -tls1_2
openssl s_client -connect <Octopus-host>:10943 -tls1_3
```


### 2. Verify Cipher Suite Compatibility


The following cipher suites must be enabled on both systems:


- `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
- `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`
- `TLS_CHACHA20_POLY1305_SHA256`


**Windows (PowerShell):**
```powershell
# List enabled cipher suites
Get-TlsCipherSuite | Select-Object Name | Where-Object { $_.Name -like "*ECDHE*RSA*" }
```


**Linux:**
```bash
# Test cipher suite support
openssl ciphers -v 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384'
```


### 3. Check Event Logs and Service Logs


**Windows Event Viewer:**
- Look for Schannel errors in `Applications and Services Logs > Microsoft > Windows > Schannel > Operational`
- Common error codes:
 - **Event ID 36887**: No compatible cipher suite found
 - **Event ID 36888**: Fatal alert received (handshake failure)
 - **Event ID 36870**: Certificate validation failure


**Octopus Server Logs:**
- Check `C:\Octopus\Logs` for TLS handshake errors
- Look for certificate trust or validation issues


**Tentacle Logs:**
- Check `C:\Octopus\` (Windows) or `/etc/octopus/` (Linux)


### 4. Use TentaclePing as a lightweight tool for testing
We have built a small utility for testing the communications protocol between two servers called [Tentacle Ping](https://github.com/OctopusDeploy/TentaclePing). This tool helps isolate the source of communication problems without needing a full Octopus configuration. It is built as a simple client and server component that emulates the communications protocol used by Octopus Server and Tentacle.

## Common Issues and Solutions


### Issue: TLS 1.3 Handshake Failures


**Symptom:** Connection works with TLS 1.2 but fails with TLS 1.3 enabled.


**Cause:** Many TLS 1.3 hardening templates disable PKCS#1 v1.5 signature padding, which Octopus RSA certificates require.


**Solution:**


Ensure at least one of these RSA signature schemes is enabled:
- `rsa_pkcs1_sha256` (PKCS#1 v1.5)
- `rsa_pss_rsae_sha256` (RSA-PSS)


**Windows (Registry):**
```powershell
# Verify signature algorithms (requires admin rights)
$path = "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\SignatureAlgorithms"
Get-ChildItem $path
```


**Linux (OpenSSL config):**

Check `/etc/ssl/openssl.cnf` for signature algorithm restrictions.


### Issue: No Compatible Cipher Suite


**Symptom:** Event ID 36887 or handshake failure with "no shared cipher" error.


**Cause:** Custom TLS hardening policies have disabled all required cipher suites.


**Solution:**


Re-enable at least one required cipher suite (see [minimum requirements](/docs/security/octopus-tentacle-communication/minimum-tls-requirements)).


**Windows (PowerShell - Admin):**
```powershell
# Enable a required cipher suite
Enable-TlsCipherSuite -Name "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
```


**Linux:**
Update your OpenSSL or system-wide TLS policy to include required suites.


### Issue: Elliptic Curve Mismatch


**Symptom:** ECDHE key exchange failures.


**Cause:** Required elliptic curve `secp256r1` (P-256) has been disabled.


**Solution:**


Ensure `secp256r1` is enabled for ECDHE key exchange.


**Windows (PowerShell - Admin):**
```powershell
# Enable P-256 curve
Enable-TlsEccCurve -Name "NistP256"
```


**Linux:**
Verify curve support:
```bash
openssl ecparam -list_curves | grep "secp256r1"
```


### Issue: SHA-1 Server Certificate Rejection


**Symptom:**
- Tentacles fail to connect to Octopus Server with certificate validation errors
- Linux-based Tentacles (especially on modern distributions) cannot establish connections
- OpenSSL 3.x systems reject the connection with "unsafe legacy renegotiation" or certificate validation errors
- Errors mentioning "SHA-1" or "insecure signature algorithm" in logs


**Cause:**


Octopus Server generates a self-signed X.509 certificate on first installation, which is stored in the database and persists across upgrades. **Very early Octopus installations** (pre-2017) may still be using SHA-1 signed server certificates.


Modern operating systems, especially:
- Linux distributions with OpenSSL 3.x (Ubuntu 22.04+, RHEL 9+, Debian 12+)
- Hardened Windows systems with strict cryptographic policies
- Systems with FIPS mode enabled


...explicitly block SHA-1 certificates as cryptographically insecure and will refuse TLS connections.


:::div{.hint}
Tentacle certificates are less likely to use SHA-1, as they are regenerated locally on the client machine during the installation process. This issue primarily affects long-running Octopus Server instances with certificates that have never been regenerated. [This API Script](https://github.com/OctopusDeploy/OctopusDeploy-Api/blob/master/REST/PowerShell/Targets/FindSHA1Tentacles.ps1) can be used to check if any Tentacles are communicating with a SHA1 certificate.
:::


**Solution:**


**You must regenerate your Octopus Server certificate to use SHA-256.**


:::div{.warning}
**This is critical for security and compatibility.** SHA-1 has been deprecated since 2017 due to collision vulnerabilities. Modern systems will not trust SHA-1 certificates.
:::


1. **Check your Octopus Server certificate signature algorithm:**


  In the Octopus Web Portal, navigate to **Configuration → Thumbprint**. The certificate details page will show the signature algorithm. If it displays **SHA-1**, you must regenerate the certificate.


2. **Regenerate the Octopus Server certificate with SHA-256:**


  Follow the [certificate regeneration documentation](/docs/security/octopus-tentacle-communication/regenerate-certificates-with-octopus-server-and-tentacle) to create a new SHA-256 signed certificate for your Octopus Server.


3. **Update Tentacle trust** after certificate regeneration


**Note:** Certificate regeneration requires re-establishing trust with all Tentacle agents. Plan this maintenance window accordingly, as all Tentacles will need to be updated with the new Server thumbprint.


### Issue: Legacy Protocol Enforcement


**Symptom:** Connection fails after disabling TLS 1.0/1.1.


**Cause:** One system still requires an older protocol version.


**Solution:**


Ensure both Octopus Server and Tentacle are running current versions that support TLS 1.2 or higher. Update any outdated installations.


:::div{.warning}
TLS 1.0 and 1.1 are deprecated and should not be used. Ensure all systems support at least TLS 1.2.
:::


## Advanced Troubleshooting


### Capture and Analyze TLS Handshakes


**Windows - Network Tracing:**


1. Use **Wireshark** or **netsh** to capture traffic between Server and Tentacle:
  ```powershell
  netsh trace start capture=yes tracefile=C:\temp\tls-trace.etl
  # Reproduce the issue
  netsh trace stop
  ```


2. Convert the trace to `.pcap` for analysis in Wireshark
3. Filter for TLS handshake messages to identify failures


**Linux - tcpdump:**
```bash
sudo tcpdump -i any -w /tmp/tls-capture.pcap host <Octopus-ip> and port 10943
```


Analyze the capture for:
- **Client Hello** and **Server Hello** messages
- Cipher suite negotiation
- Certificate exchange and validation
- Alert messages indicating failure reasons


### Test Direct TLS Connection


Use OpenSSL to test raw TLS connectivity:


```bash
# Test from Tentacle to Octopus
openssl s_client -connect <Octopus-host>:10943 -tls1_2 -cipher ECDHE-RSA-AES128-GCM-SHA256


# Check certificate details
openssl s_client -connect <Octopus-host>:10943 -showcerts
```


Look for handshake completion and certificate validation success.


## Validating Your Configuration


After making changes:


1. **Restart services:**
  - Restart Octopus Server service
  - Restart Tentacle service
 
2. **Test connectivity:**
  - Run a health check from the Octopus portal
  - Check task logs for successful connections


## Getting Help


If you continue experiencing issues:


1. Collect diagnostic information:
  - Octopus Server and Tentacle versions
  - Operating system versions
  - Enabled TLS protocols and cipher suites
  - Relevant event log entries and service logs
  - Network trace (if possible)


2. Contact [Octopus Support](https://octopus.com/support) with this information


## See Also


- [Minimum TLS Requirements](/docs/security/octopus-tentacle-communication/minimum-tls-requirements)
- [Octopus-Tentacle Communication](/docs/security/octopus-tentacle-communication)
- [Security and Encryption](/docs/security)