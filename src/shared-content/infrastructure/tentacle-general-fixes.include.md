## Check the IP address

Your Octopus Server or Tentacle Server may have multiple IP addresses that they listen on. For example, in Amazon EC2 machines in a VPN might have both an internal IP address and an external addresses using NAT. Octopus Server and Tentacle Server may not listen on all addresses; you can check which addresses are configured on the server by running `ipconfig /all` from the command line and looking for the IPv4 addresses.

## Schannel and TLS configuration mismatches

Octopus uses `Schannel` for secure communications and will attempt to use the best available protocol available to both servers.  If you are seeing error messages like below, try [Troubleshooting Schannel and TLS](/docs/security/octopus-tentacle-communication/troubleshooting-schannel-and-tls):

Client-side:`System.Security.Authentication.AuthenticationException: A call to SSPI failed, see inner exception. ---> System.ComponentModel.Win32Exception: One or more of the parameters passed to the function was invalid`

Server-side:`System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host.`

## Other error messages

**Halibut.Transport.Protocol.ConnectionInitializationFailedException: Unable to process remote identity; unknown identity 'HTTP/1.0'**

If a Tentacle health-check fails with an error message containing this error message, then there is network infrastructure inserting a web page into the communication.  The most common components to do this are firewalls and proxy servers so it's recommend to check your network setup to verify connectivity between the two servers using the information above and then update your infrastructure appropriately.

**Halibut.HalibutClientException: An error occurred when sending a request to 'https://my-tentacle:10933', before the request could begin: Attempted to read past the end of the stream.**

If your Octopus server certificate was [generated with SHA1](/docs/security/cve/shattered-and-octopus-deploy) then you might get this error when connecting to modern Linux distributions, as the default security configuration now rejects communication using SHA1. To regenerate your Octopus server certificate, follow the documentation [How to regenerate certificates with Octopus Server and Tentacle](/docs/security/octopus-tentacle-communication/regenerate-certificates-with-octopus-server-and-tentacle).
