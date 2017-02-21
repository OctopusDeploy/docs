---
title: Certificates - Supported File Formats 
position: 2
version: "3.11"
---

The following certificate formats are supported in Octopus Deploy:

- **[PKCS#12](https://en.wikipedia.org/wiki/PKCS_12)**: .pfx files. May include a private-key.  
- **[PEM](https://en.wikipedia.org/wiki/Privacy-enhanced_Electronic_Mail)**: Base64-encoded [ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One). Usually has .pem file extension (though sometimes .cer or .crt on Windows). May include a private-key. 
- **[DER](https://en.wikipedia.org/wiki/X.690#DER_encoding)**: Binary-encoded ASN.1. Generally stored with file extensions .crt, .cer, or .der. Does not include private-key. 
