---
title: Troubleshooting
position: 4
---


If your upgrade from 2.6 to 3.x doesn't go smoothly, this page will help you find a solution. If this page doesn't help, contact support.

:::hint
Always ensure you have tried to upgrade with the latest version of the Hydra Nuget package.
:::

# Rolling Back


The 2.6 to 3.x upgrade is lossless, meaning you shouldn't lose any data as a result of installing the new MSI. Your Raven database and configuration settings are not deleted.


If your number one priority is to get up and running again, you can simply run the Octopus 2.6 MSI again, and the previous version will install over the top of 3.x, allowing you to diagnose the issue at your leisure.

# Hydra Log Files


Hydra writes to two log files during its deployment.


The first is located in the folder that the Hydra package is unpacked to on deployment. It's named `upgradelog.log` and will write details about what Hydra is doing during an upgrade.


The second log is also in the Hydra package directory. It has a random filename and is used purely as an output for the MSI installation process. Hydra will delete this file if it detects a successful install. If the file is present, this means the installation has probably failed.


You can also refer to the Windows Event Log as well as Scheduled Tasks for more information on the installation process. Note that the Scheduled Task will expire after 5min, and the results may no longer be available.

# Common Issues


This section describes some common upgrade issues and ways to resolve them.

## Tentacle does not upgrade properly

### Symptoms #1


The Octopus 3.x server cannot communicate with one or more Tentacles.


You may see an error similar to the following in the Server logs:

```powershell
Halibut.Transport.Protocol.ConnectionInitializationFailedException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host. ---> System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host. ---> System.Net.Sockets.SocketException: An existing connection was forcibly closed by the remote host
   at System.Net.Sockets.NetworkStream.Read(Byte[] buffer, Int32 offset, Int32 size)
   --- End of inner exception stack trace ---
   at System.Net.Sockets.NetworkStream.Read(Byte[] buffer, Int32 offset, Int32 size)
   at System.Net.FixedSizeReader.ReadPacket(Byte[] buffer, Int32 offset, Int32 count)
   at System.Net.Security._SslStream.StartFrameBody(Int32 readBytes, Byte[] buffer, Int32 offset, Int32 count, AsyncProtocolRequest asyncRequest)
   at System.Net.Security._SslStream.StartFrameHeader(Byte[] buffer, Int32 offset, Int32 count, AsyncProtocolRequest asyncRequest)
   at System.Net.Security._SslStream.StartReading(Byte[] buffer, Int32 offset, Int32 count, AsyncProtocolRequest asyncRequest)
   at System.Net.Security._SslStream.ProcessRead(Byte[] buffer, Int32 offset, Int32 count, AsyncProtocolRequest asyncRequest)
   at System.Net.Security.SslStream.Read(Byte[] buffer, Int32 offset, Int32 count)
   at System.IO.StreamReader.ReadBuffer()
   at System.IO.StreamReader.ReadLine()
   at Halibut.Transport.Protocol.MessageExchangeStream.ReadRemoteIdentity() in y:\work\7ab39c94136bc5c6\source\Halibut\Transport\Protocol\MessageExchangeStream.cs:line 124
   at Halibut.Transport.Protocol.MessageExchangeStream.ExpectServerIdentity() in y:\work\7ab39c94136bc5c6\source\Halibut\Transport\Protocol\MessageExchangeStream.cs:line 187
   at Halibut.Transport.Protocol.MessageExchangeProtocol.PrepareExchangeAsClient() in y:\work\7ab39c94136bc5c6\source\Halibut\Transport\Protocol\MessageExchangeProtocol.cs:line 41
   --- End of inner exception stack trace ---
   at Halibut.Transport.Protocol.MessageExchangeProtocol.PrepareExchangeAsClient() in y:\work\7ab39c94136bc5c6\source\Halibut\Transport\Protocol\MessageExchangeProtocol.cs:line 51
   at Halibut.HalibutRuntime.<>c__DisplayClass6.<SendOutgoingHttpsRequest>b__5(MessageExchangeProtocol protocol) in y:\work\7ab39c94136bc5c6\source\Halibut\HalibutRuntime.cs:line 115
   at Halibut.Transport.SecureClient.ExecuteTransaction(Action`1 protocolHandler) in y:\work\7ab39c94136bc5c6\source\Halibut\Transport\SecureClient.cs:line 60
```


And an error such as the following in the Tentacle logs:

```powershell
2015-07-20 12:04:52.2324      7 ERROR  Invalid request
System.Net.ProtocolViolationException: Request line should have three parts
   at Pipefish.Transport.SecureTcp.ProtocolParser.ParseRequest(Stream clientStream, Method& method, Uri& uri, RequestHeaders& headers, String& protocol) in y:\work\3cbe05672d69a231\source\Pipefish.Transport.SecureTcp\ProtocolParser.cs:line 50
   at Pipefish.Transport.SecureTcp.Server.SecureTcpServer.ApplyProtocol(AuthorizationResult authorizationResult, EndPoint clientEndPoint, String clientThumbprint, Stream clientStream) in y:\work\3cbe05672d69a231\source\Pipefish.Transport.SecureTcp\Server\SecureTcpServer.cs:line 141
```

### Solution #1


If you see a reference to `Halibut` in the server log and `Pipefish` in the client log, that's an indication that the Tentacle is still using 2.x binaries.


The easiest way to fix this is to RDP into the Tentacle machine and click the Reinstall button. This will reset the Tentacle service to make sure it points to the new binaries. Be aware that this will reset the Tentacle service account to run as Local System. If you are using a custom service account, you will have to reconfigure it.


![](/docs/images/3048204/3278286.png)

### Symptoms #2


The Octopus 3.x Server cannot communicate with the Tentacle. When investigated, the Windows Service for the Tentacle is pointing at a 2.6 instance of the Octopus Tentacle.

### Solution #2


There are a few potential reasons for this:

- The MSI upgrade failed. If this is the case, you will be able to find a log file with a random filename in the Hydra package directory on the tentacle server. It should show reasons for the MSI failure.
- The MSI upgraded the Tentacle, but the Windows Service is pointing at an old version.



If an upgrade succeeded but the Windows Service is still running the 2.6 instance, you will have to click the Reinstall link as per the Solution #1 above.


If the upgrade itself failed, this can be due to a previous installation of a 2.0 version of the Octopus Tentacle (which was fixed in 2.1). Originally, the MSI installed itself on a per-user basis rather than per-machine. This means that Hydra is unable to uninstall the previous version prior to installing the 3.x Tentacle.


In this case, you will have to **log onto your Tentacle machine as the user who first installed the 2.0 version of the Tentacle**. You can then either run `Hydra.exe` directly, or manually uninstall the previous Tentacle and install the 3.x Tentacle.

## I've lost all my NuGet packages

### Symptoms


After migration, none of the NuGet packages that were present in the internal feed are available.

### Solution


Nuget packages are not included in the Raven database backup, so will not be automatically moved to your new server and to the correct location.


To move your NuGet packages, follow the [instructions in the Upgrade documentation](http://docs.octopusdeploy.com/display/OD/Upgrade+with+a+new+3.0+server+instance#Upgradewithanew3.0serverinstance-3.Migrateyourdatafrom2.6to3.0). After moving the files and restarting the service, your packages should be reindexed and available.
