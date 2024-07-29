### Update the Instance ID

Cloning an instance includes the unique Installation ID of your original instance. This ID is used to identify the instance by a few integrations and sending telemetry reports.

You can run this SQL Script on your cloned instance database to generate a new unique installation ID.

```sql
DECLARE @config NVARCHAR(1000)
DECLARE @oldguid  NVARCHAR(255)
DECLARE @newguid  NVARCHAR(255)
DECLARE @dryRun BIT = 1 -- set this to 0 to update the Installation Id

SET @newguid = LOWER(CONVERT(NVARCHAR(255), NEWID()))

SELECT @config =[JSON]
FROM dbo.Configuration
WHERE Id = 'upgradeavailability'

SET @oldguid = JSON_VALUE(@config, '$.InstallationId')
SET @config = JSON_MODIFY(@config, '$.InstallationId', @newguid)

PRINT 'The old Installation Id is ' + @oldguid + ' - Save this value'
PRINT 'The new Installation Id will be ' + @newguid

IF @dryRun = 1
	PRINT 'This is a dry run, no update is occurring. Set @dryrun to 0 to update the Installation Id.'
ELSE
	PRINT 'The Installation Id is being updated. Restart your Octopus Server service for this change to take effect.'

UPDATE dbo.Configuration
SET [JSON] = @config
WHERE Id = 'upgradeavailability'
  AND @dryRun = 0
```

:::div{.hint}
The script is set to do a dry run of what will change. Change @dryRun to 0 to make the change on your instance.
:::