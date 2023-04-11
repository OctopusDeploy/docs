### Disabling All Targets/Workers/Triggers/Subscriptions - Optional

Cloning an instance includes cloning all certificates.  Assuming you are not using polling Tentacles, all the deployments will "just work."  That is by design if the VM hosting Octopus Deploy is lost and you have to restore Octopus Deploy from a backup.  

Just working does have a downside, as you might have triggers, auto release creation, and other items configured.  These items could potentially perform deployments.  You can run this SQL Script on your cloned instance to disable everything.

```sql
Use [OctopusDeploy]
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
:::hint
Remember to replace `OctopusDeploy` with the name of your database.
:::