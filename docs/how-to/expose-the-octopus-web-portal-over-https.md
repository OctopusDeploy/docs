---
title: Expose the Octopus web portal over HTTPS
position: 6
---

The Octopus web portal is the main interface that your team will use to interact with the Octopus Deploy server. During installation, you'll choose a port number for the server to listen on, and it uses HTTP by default. However, Octopus can also be configured to run on HTTPS.

## Changing your web portal bindings {#ExposetheOctopuswebportaloverHTTPS-Changingyourwebportalbindings}

The following steps will show how to configure Octopus to listen on HTTPS.

1. Open the **Octopus Manager** application on the Octopus Deploy server. You'll find this in the start menu. 
![](/docs/images/3048148/3278103.png)
2. From Octopus Manager, you can launch a wizard to modify the bindings that are associated with the Octopus web portal:
![](/docs/images/3048148/3278102.png "width=500")
3. In the Web Bindings wizard, click **Add...** to add a new binding, and choose the HTTPS scheme. Other options such as the port can also be configured here. 
![](/docs/images/3048148/3278452.png "width=500")

Since HTTPS requires an SSL certificate, you can either choose to generate a new, self-signed (untrusted) certificate, or to select an existing certificate. Self-signed certificates are useful for testing or to achieve encryption without trust, but for production use we recommend using a trusted SSL certificate.
4. Follow the rest of the Wizard steps to add the binding and reconfigure the Octopus server.

## Importing your SSL certificate {#ExposetheOctopuswebportaloverHTTPS-ImportingyourSSLcertificate}

When you choose to select an existing certificate when configuring your HTTPS binding, the available certificates will be shown. If the certificate you intend to use doesn't exist in the Windows certificate store, you'll need to import it. The following steps will show you how to import your certificate:

1. Launch an empty Microsoft Management Console shell by running **mmc.exe** from the start menu, command line or Win+R run dialog
2. From the File menu, click Add/Remove Snap-in...
![](/docs/images/3048148/3278110.png "width=500")
3. Add the Certificates snap-in, and when prompted, choose the Computer account scope:
![](/docs/images/3048148/3278101.png "width=500")
4. On the "Select Computer" page of the Wizard, select the **Local computer**, then click **Finish**. Click **OK** to close the Add/Remove Snap-ins dialog.
5. You can either import the certificate to the **Personal** store, or the **Web Hosting** store (this store may or may not exist on your server). Expand to the Certificates directory, then open the import wizard:
![](/docs/images/3048148/3278100.png "width=500")
6. Follow the steps in the wizard to import your certificate. Your certificate will normally be in a .**PFX** file, and it should include both the public X.509 certificate, and the private key for the certificate.
7. Once the certificate is imported, double click the certificate to bring up the properties. You should see an icon indicating that the private key has also been imported:
![](/docs/images/3048148/3278099.png)
8. If all these requirements have been met (**private key** imported, either the **Web Hosting** or **Personal** stores, in the **Local Computer** scope), the certificate should appear when you select to use an existing certificate when adding your HTTPS binding:
![](/docs/images/3048148/3278454.png "width=500")
