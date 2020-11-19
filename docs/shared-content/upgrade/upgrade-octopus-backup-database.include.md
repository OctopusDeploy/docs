### Maintenance Mode

Maintenance mode prevents non-Octopus Administrators from doing deployments or making changes.  To enable maintenance mode go to **{{Configuration, Maintenance}}** and click the button `Enable Maintenance Mode`.  To disable maintenance mode, go back to the same page and click on `Disable Maintenance Mode`. 

### Backup the SQL Server database

Always back up the database before upgrading Octopus Deploy.  The most straightforward backup possible is a full database backup.  Execute the below T-SQL command to save a backup to a NAS or file share.

```
BACKUP DATABASE [OctopusDeploy]
          TO DISK = '\\SomeServer\SomeDrive\OctopusDeploy.bak'
             WITH FORMAT;
```

The `BACKUP DATABASE` T-SQL command has dozens of various options.  Please refer to [Microsoft's Documentation](https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/create-a-full-database-backup-sql-server?view=sql-server-ver15) or consult a DBA as to which options you should use.