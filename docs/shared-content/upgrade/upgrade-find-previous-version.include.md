### Find and download previous version of Octopus Deploy

Octopus Deploy stores the installation history in the database.  If you are unsure about which version to download and install run this query on your Octopus Deploy database.

```SQL
SELECT TOP 5 [Version]
  FROM [dbo].[OctopusServerInstallationHistory]
  ORDER BY Installed desc
```

Once you know the version to install, go to the [previous downloads page](https://octopus.com/downloads/previous).  

### Installing the previous version

The key configuration items, such as connection string, files, instance information, etc., are not stored in the install directory of Octopus Deploy.  To install the previous version, first uninstall Octopus Deploy.  This will only delete items from the install directory, or `C:\Program Files\Octopus Deploy\Octopus`.  Then run the MSI to install the previous version.  