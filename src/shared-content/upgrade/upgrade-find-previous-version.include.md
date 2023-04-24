### Find and download the previous version of Octopus Deploy

Octopus Deploy stores the installation history in the database. Run this query on your Octopus Deploy database if unsure as to which version to download:

```sql
SELECT TOP 5 [Version]
  FROM [dbo].[OctopusServerInstallationHistory]
  ORDER BY Installed desc
```

When you know the version to install, go to the [previous downloads page](https://octopus.com/downloads/previous).  

### Installing the previous version

The key configuration items, such as connection string, files, instance information, etc., are not stored in the install directory of Octopus Deploy.  To install the previous version, first, uninstall Octopus Deploy.  Uninstalling will only delete items from the install directory, or `C:\Program Files\Octopus Deploy\Octopus`.  Then run the MSI to install the previous version.  