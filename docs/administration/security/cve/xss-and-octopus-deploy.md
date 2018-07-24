---
title: Cross-Site Scripting (XSS) and Octopus Deploy
description: Octopus Server actively prevents Cross-Site Scripting (XSS) using a number of preventative measures.
position: 1
---

We take every reasonable effort to make Octopus Deploy secure against well-known vulnerabilities. One such vulnerability is Cross-Site Scripting (XSS) in web browsers.

## What is XSS?

Using an XSS attack a malicious actor could potentially trick a user's web browser into executing unintended code. For more information about XSS refer to the following:

- [Cross-Site Scripting according to OWASP](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))
- [Cross-Site Scripting Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)

## Does Octopus Deploy prevent XSS attacks?

Yes. The Octopus Server, its HTTP API, and browser-based user interface are designed to actively prevent a wide variety of XSS attacks, including stored XSS, reflected XSS, and DOM based XSS.

The responsibility for protecting against XSS attacks is shared between us as the software vendor, and you as the customer.

### What is Octopus Deploy responsible for?

We take responsibility to provide commercially reasonable protection against XSS attacks. If you [find and report](https://octopus.com/security/disclosure) a specific XSS vulnerability, we will follow our practice of [responsible disclosure](https://octopus.com/security/disclosure).

### What is the customer responsible for?

As the customer, you are responsible for granting access to people you trust, and ensuring the security of your own network and operating systems.

XSS is a browser-based vulnerability. The Octopus Server and its browser application work on your behalf to actively prevent XSS attacks, and the browser itself can also help in the prevention of XSS attacks. To this end Octopus Server 4.0 (and newer) has increased its minimum supported browser requirements to further improve the security of your Octopus installation.

Learn about [supported web browsers](/docs/installation/requirements.md#supported-browsers).

## How Octopus Deploy prevents XSS attacks {#prevention}

The only perfect way to prevent every possible XSS attack would be if Octopus Deploy didn't use a web browser. We have taken great care to design Octopus Deploy to strike a balance between enabling our customers to do what Octopus Deploy was designed to do, and preventing harm via XSS.

At the time of writing, Octopus Deploy actively follows these XSS prevention rules from the [OWASP XSS (Cross Site Scripting) Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet):

- RULE #0 - Never Insert Untrusted Data Except in Allowed Locations
- RULE #1 - HTML Escape Before Inserting Untrusted Data into HTML Element Content
- RULE #2 - Attribute Escape Before Inserting Untrusted Data into HTML Common Attributes
- RULE #3 - JavaScript Escape Before Inserting Untrusted Data into JavaScript Data Values
  - RULE #3.1 - HTML escape JSON values in an HTML context and read the data with JSON.parse
- RULE #4 - CSS Escape And Strictly Validate Before Inserting Untrusted Data into HTML Style Property Values
- RULE #5 - URL Escape Before Inserting Untrusted Data into HTML URL Parameter Values
- RULE #6 - Sanitize HTML Markup with a Library Designed for the Job
- RULE #7 - Prevent DOM-based XSS
- Bonus Rule #1: Use `HTTPOnly` cookie flag
- Bonus Rule #2: Implement Content Security Policy
- Bonus Rule #3: Use an Auto-Escaping Template System
- Bonus Rule #4: Use the X-XSS-Protection Response Header

### Content is sanitized by default

The Octopus Deploy web user interface is built using modern web frameworks, where the default behavior is to sanitize data before it is added to the DOM.

- Octopus Deploy 2.0 to 3.17 is built using [AngularJS](https://angularjs.org/) which employs [strict contextual escaping by default](https://docs.angularjs.org/api/ng/service/$sce).
- Octopus Deploy 4.0+ is built using [React](https://reactjs.org/) which employs a similar technique.

This doesn't make our web user interface perfect, but it is easier for our developers be safe-by-defult. If we really want to render unsanitized content to the browser DOM, we have to explicitly opt-out of the safe-by-default behavior, and mitigate the security risks via other means.

### Markdown is preferred over HTML

Some places in Octopus Deploy allow a user to add rich content, like descriptions for most things. In these cases the supported format is [markdown](http://commonmark.org/) instead of HTML.

### Session cookie is protected from malicious scripts

When you sign in to the Octopus Deploy web user interface, the server will send back an encrypted cookie called `OctopusIdentificationToken` in the response header with the `HttpOnly=true` cookie flag set. Even if an attacker could successfully execute a malicious script, the browser will prevent that script from accessing the session cookie.

In the worst case where an attacker could steal the session cookie, Octopus Deploy actively prevents against [Cross-Site Request Forgery](csrf-and-octopus-deploy.md).

### A strict Content Security Policy (CSP) is configured

By default, your Octopus Server implements a strict Content Security Policy (CSP). This policy is configured to limit exposure to XSS when using a browser which supports CSP.

You can see the `Content-Security-Policy` of your Octopus Server by inspecting any of the HTTP responses sent to your browser.

Learn about [HTTP security headers used by Octopus Deploy](/docs/administration/security/http-security-headers.md).

### Built-in XSS filters are enforced in modern browsers

The Octopus Server forces modern browsers to enable their built-in XSS filters, even if these filters were disabled by the user, by adding the `X-XSS-Protection` header to every HTTP response.

Learn about [HTTP security headers used by Octopus Deploy](/docs/administration/security/http-security-headers.md).

## Frequently asked questions {#faq}

These are some questions we get asked frequently by security conscious customers.

### Why isn't the content of API responses HTML encoded?

Octopus Deploy is built "API-first". The web browser is not the only client of the Octopus Server. People frequently use command-line tools or scripts to automated the Octopus Server's HTTP API: it doesn't make sense to HTML-encode API responses when the client is not an HTML client.

The Octopus Server performs content-negotiation, and will encode the response appropriately for the content-type supported by the client:

- If the response is sent as `text/html` the data in the response will be HTML-encoded.
- If the response is sent as `text/json` and the data will not be HTML-encoded.

### Which web browsers are supported by Octopus Deploy?

The quick answer is "all modern browsers". Learn more about [supported browsers](/docs/installation/requirements.md).
