---
title: HTTP Security Headers
description: Describes the security related browser headers that Octopus supports
position: 1
---

# Octopus Web Portal

The Octopus Web Portal supports a number of security related browser headers, designed to limit the attack surface area by locking down what browsers are able to do. This page describes what headers are available, whether they are configurable, how to configure them, and when they were first available.

## Server

The `Server` browser header is set to `Octopus Deploy/ Microsoft-HTTPAPI/2.0`. This setting is not configurable.

First available: `2.6.5`

## Access-Control-Allow-* (CORS)

The Cross Origin Resource Security (CORS) headers are used to instruct browsers to allow/disallow requests from other websites to access the Octopus portal. By default, it is disabled, preventing any access. To modify this setting, you can use the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

First available: `2.6.5`

## Cache-Control

The `Cache-Control` header configures how responses are cached both by intermediate proxies and by the user's browser.

The Octopus portal does not send the `Cache-Control` header on the application (`/app`) endpoint as there is no sensitive data contained in, nor transferred through this mechanmism. However, all API requests (the `/api` endpoint) do send the header with a value of `no-cache, no-store`, requesting that the response is never stored or written to disk.

The dashboard has in-memory only caching (to increase performance), which can be disabled in {{Configuration,Features,Browser Caching}}. The header itself is not configurable on either `/app` or `/api` endpoints.

First available: `3.13.0` (in its current incarnation)

## X-XSS-Protection

This header instructs browsers to enable their inbuilt Cross Site Scripting (XSS) filters. These are not foolproof filters, but can help prevent some forms of XSS attacks.

The Octopus Server sets this header to `1; block`, enabling the filters and instructing the browser to block (rather than sanitize) any detected attack. This setting is not user configurable.

First available: `3.13.13`

## X-Frame-Options

Instructs browsers whether to allow the Octopus portal to be hosted in a frame. This is set to `DENY` by default, but can be configured via the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

First available: `3.2.23`

## X-Content-Type-Options

This header is used to disable the MIME type "sniffing" capability which can allow non-executable MIME types to be interpreted as executable MIME types. This is set to `nosniff`, and is not user configurable.

First available: `3.12.7`

## Strict-Transport-Security (HSTS)

The `Strict-Transport-Security` header is used to instruct browsers that all future requests (for a specified amount of time) are sent over HTTPS, even if the user types `http://` into the browser address bar. This is not enabled by default, but as it can cause issues if implemented incorrectly, please read [our HSTS documentation](/docs/how-to/expose-the-octopus-web-portal-over-https.md#HSTS) before implementing.

First available: `3.13.0`

## Referrer-Policy

This header instructs browsers on how much information to share, and with whom, when navigating between pages. This is enabled by default, and set to `no-referrer`. The value of this header can be modified using the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

First available: `3.13.1`

## Content-Security-Policy (CSP)

The `Content-Security-Policy` header defines the list of browser features required by the Octopus portal and the whitelist of domains which Octopus uses. This is used to limit the attack surface area for XSS and data injection attacks.

This is enabled by default, and set to the tightest policy that allows full functionality. This can be disabled via the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

First available: `3.13.6`

## Public-Key-Pins (PKP)

This header is used to define the allowed certificate fingerprints used for the TLS certificates for the site.

The Octopus portal does not support the `Public-Key-Pins` header.

## Expect_CT

The `Expect_CT` header is used to instruct browsers to only accept connections with valid Signed Certificate Timestamps.

The Octopus portal does not support this header.

# Octopus Server Communications Port

The Octopus Server listens on a port (usually 10943) for connections from polling Tentacles. It uses a [custom communications protocol](octopus-tentacle-communication/index.md) with self signed certificates, and shows a diagnostics page when accessed via a web browser. 

While there is limited scope for attack on this page, as some security scanning tools can report errors on this page, the following headers are supported on this port since version `3.17.13`:

## Content-Security-Policy (CSP)

The `Content-Security-Policy` header defines the list of browser features required by the Octopus portal and the whitelist of domains which Octopus uses. This is used to limit the attack surface area for XSS and data injection attacks.

This is enabled by default, and set to the tightest policy that allows full functionality. This can be disabled via the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

## Referrer-Policy

This header instructs browsers on how much information to share, and with whom, when navigating between pages. This is enabled by default, and set to `no-referrer`. The value of this header can be modified using the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

## X-Content-Type-Options

This header is used to disable the MIME type "sniffing" capability which can allow non-executable MIME types to be interpreted as executable MIME types. This is set to `nosniff`, and is not user configurable.

## X-Frame-Options

Instructs browsers whether to allow the Octopus portal to be hosted in a frame. This is set to `DENY` by default, but can be configured via the Octopus Server [configure](/docs/api-and-integration/octopus.server.exe-command-line/configure.md) command.

## X-XSS-Protection

This header instructs browsers to enable their inbuilt Cross Site Scripting (XSS) filters. These are not foolproof filters, but can help prevent some forms of XSS attacks.

The Octopus Server sets this header to `1; block`, enabling the filters and instructing the browser to block (rather than sanitize) any detected attack. This setting is not user configurable.

# Octopus Tentacle Communications Port

The Octopus Tentacle listens on a port (usually 10933) for connections from the Octopus Server. It uses a [custom communications protocol](octopus-tentacle-communication/index.md) with self signed certificates, and shows a diagnostics page when accessed via a web browser. 

While there is limited scope for attack on this page, as some security scanning tools can report errors on this page, the following headers are supported on this port since Tentacle version `3.16.1`:

## Content-Security-Policy (CSP)

The `Content-Security-Policy` header defines the list of browser features required by the page. This is used to limit the attack surface area for XSS and data injection attacks.

This is set to the tightest policy that allows full functionality. This is not user configurable.

## Referrer-Policy

This header instructs browsers on how much information to share, and with whom, when navigating between pages. This is enabled by default, and set to `no-referrer`, and is not user configurable.

## X-Content-Type-Options

This header is used to disable the MIME type "sniffing" capability which can allow non-executable MIME types to be interpreted as executable MIME types. This is set to `nosniff`, and is not user configurable.

## X-Frame-Options

Instructs browsers whether to allow the diagnostics page to be hosted in a frame. This is set to `DENY` by default, and is not user configurable.

## X-XSS-Protection

This header instructs browsers to enable their inbuilt Cross Site Scripting (XSS) filters. These are not foolproof filters, but can help prevent some forms of XSS attacks.

The Octopus Server sets this header to `1; block`, enabling the filters and instructing the browser to block (rather than sanitize) any detected attack. This setting is not user configurable.
