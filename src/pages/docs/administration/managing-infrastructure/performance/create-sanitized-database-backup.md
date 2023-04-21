---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create sanitized database backup
description: How to create a sanitized database backup to send up to Octopus Support.
navOrder: 38
---

When you contact Octopus Deploy support, sometimes we cannot reproduce the performance issue you're experiencing. That can be due to specific circumstances in your instance, which we cannot reproduce. We may ask you to send us a database backup, which will allow us to reproduce the issue and aid in resolving it accurately. We do realize not everyone is comfortable uploading a database backup without getting a chance to sanitize it first.  This guide will walk you through how to create a sanitized database backup.

1. Create the database backup.

The easiest way to do this is to use SQL Server Management Studio, right-click on the database, select **{{Tasks, Backup}}** and follow the wizard to create a full backup.  

You can also run this script to create the backup.

```sql
BACKUP DATABASE [OctopusDeploy]
  TO DISK = '\\SomeServer\SomeDrive\OctopusDeploy.bak'
      WITH FORMAT;
```

2. Restore the backup to a different server.

That new database is the database we are going to sanitize.  The easiest way to do this is to use SQL Server Management Studio, right-click on **Databases**, select **Restore Database** and follow the wizard.  We recommend naming it `OctopusDeploy_Sanitized` to make it clear as to the intention.

You can also run this script to restore the database.

```sql
USE [master]
RESTORE DATABASE [OctopusDeploy_Sanitized] 
    FROM  DISK = N'\\SomeServer\SomeDrive\OctopusDeploy.bak' WITH  FILE = 2,  
        MOVE N'OctopusDeploy' TO  N'YOUR_DATA_DIRECTORY\OctopusDeploy_Sanitized.mdf',  
        MOVE N'OctopusDeploy_log' TO N'YOUR_DATA_DIRECTORY\OctopusDeploy_Sanitized_log.ldf',  
    NOUNLOAD,  
    STATS = 5
GO
```

3. Disable deployment targets, project triggers, workers, and more.

Run the following T-SQL script to disable as much as possible on that database.  In the next step, you'll create an Octopus Deploy instance.  This script will prevent anything from running in the background that could potentially deploy or change anything in production.

```sql
Use [OctopusDeploy_Sanitized]
go
DELETE FROM OctopusServerNode
IF EXISTS (SELECT null FROM sys.tables WHERE name = 'OctopusServerNodeStatus')
    DELETE FROM OctopusServerNodeStatus
UPDATE Subscription SET IsDisabled = 1
UPDATE ProjectTrigger SET IsDisabled = 1
UPDATE Machine SET IsDisabled = 1
IF EXISTS (SELECT null FROM sys.tables WHERE name = 'Worker')
    UPDATE Worker SET IsDisabled = 1
DELETE FROM ExtensionConfiguration WHERE Id in ('authentication-octopusid', 'jira-integration')
```

4. On a new server, install Octopus Deploy.

The installed version of Octopus Deploy should be the same version of Octopus Deploy you are running in production.  After installing Octopus Deploy, the Octopus Manager will appear.  You can close that and instead run these scripts to create the Octopus Deploy instance.

:::div{.hint}
Remember to run these scripts as **Administrator**.
:::

```powershell
Set-Location "C:\Program Files\Octopus Deploy\Octopus"

.\Octopus.Server.exe create-instance --instance "Octopus" --config "C:\Octopus\OctopusServer.config" --serverNodeName "Sanitized"
.\Octopus.Server.exe database --instance "Octopus" --connectionString "Data Source=YOURSERVER;Initial Catalog=OctopusDeploy_Sanitized;Integrated Security=False;User ID=YOURUSER;Password=YOURPASSWORD"
```

:::div{.hint}
When you run the above commands, you will get a warning about being unable to decrypt the database.  You can ignore that.
:::

5. Sanitize the database.

This command will clean out all sensitive variables and PII data and generate a new master key on the database.  

:::div{.warning}
**DO NOT** run this on the database of your production instance.  Restoring any data lost after this command has finished executing is only possible using a full database backup along with the associated Master Key.
:::

```powershell
Set-Location "C:\Program Files\Octopus Deploy\Octopus"

.\Octopus.Server.exe lost-master-key --instance "Octopus" --iReallyWantToResetAllMySensitiveData --upgradeDatabase --scrubPii --iHaveBackedUpMyDatabase
```

6. Create a new database backup.

Create a new backup for the `OctopusDeploy_Sanitized` database.  This is the backup you will upload to Octopus.

```sql
BACKUP DATABASE [OctopusDeploy_Sanitized]
  TO DISK = '\\SomeServer\SomeDrive\OctopusDeploy.bak'
      WITH FORMAT;
```

7. Upload your database backup.

In your email or forum thread with Octopus support, we will provide you with a secure and private link to upload your database backup. Only we have access to view and download files uploaded to this location, and we will only allow upload access to you. We will also ensure your forum thread is marked as private if it hasn't already been to ensure only you and our team can see the link.
