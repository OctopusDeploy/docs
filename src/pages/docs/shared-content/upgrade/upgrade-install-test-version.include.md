### Installing Octopus Deploy

Run the MSI you downloaded to install Octopus Deploy.  After you install Octopus Deploy, the Octopus Manager will automatically launch.  Follow the wizard.  A few notes:

1. You can reuse your same license key on up to three unique instances of Octopus Deploy.  We determine uniqueness based on the database it connects to.  If you are going to exceed the three instance limit, please [contact us](https://octopus.com/support) to discuss your options.
1. Create a new database for this test instance.  Restoring a backup will cause Octopus to treat this as a cloned instance, with the same targets, certificates, and keys.  
1. Run the test instance database on the same version of SQL Server as the main instance.  Only deviate when you plan on upgrading SQL Server.