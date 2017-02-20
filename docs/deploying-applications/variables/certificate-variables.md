---
title: Certificate Variables 
position: 8
---

In the variable-editor, selecting *Certificate* as the variable type allows you to create a variable with a certificate managed by Octopus as the value.

![](/docs/images/certificates/certificate-variable-select.png "width=500")

Certificate variables can be [scoped](scoping-variables.md), similar to regular text variables.

![](/docs/images/certificates/certificate-variables-scoped.png "width=500")

### Expanded Properties

At deploy-time, Certificate variables are expanded. For example, a variable _MyCertificate_ becomes:

| Variable                        | Description                                            | Example value |
| ----------------------          | ------------------                                     | ------------- |
| MyCertificate                   | The certificate ID                                     | Certificates-1 | 
| MyCertificate.Type              | The variable type                                      | Certificate 
| MyCertificate.Name              | The user-provided name                                 | My Development Certificate 
| MyCertificate.Thumbprint        | Thumbprint                                             | A163E39F59560E6FE33A0299D19124B242D9B37E
| MyCertificate.Pfx               | The base64 encoded certificate in PKCS#12 format, including the private-key if present.  | 
| MyCertificate.Certificate       | The base64 encoded DER ASN.1 certificate.              | 
| MyCertificate.PrivateKey        | The base64 encoded DER ASN.1 private key.              | 
| MyCertificate.CertificatePem    | The PEM representation of the certificate (i.e. the PublicKey with header\footer).  | 
| MyCertificate.PrivateKeyPem     | The PEM representation of the private key (i.e. the PrivateKey with header\footer).  | 
| MyCertificate.Subject           | The X.500 distinguished name of the subject            | 
| MyCertificate.Issuer            | The X.500 distinguished name of the issuer             | 
| MyCertificate.NotBefore         | NotBefore date | 2016-06-15T13:45:30.0000000-07:00
| MyCertificate.NotBefore         | NotAfter date | 2019-06-15T13:45:30.0000000-07:00

#### Private-Key Variables

The variables which contain the private-key (if present) will be stored and transmitted as [sensitive-variables](/docs/deploying-applications/variables/sensitive-variables.md).  
