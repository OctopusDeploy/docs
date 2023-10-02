### Finding and backing up your Master Key

When connecting an existing Octopus database to a "new" Octopus instance, either due to migration or for testing, you will need the Master Key to gain access to the database during the Octopus instance setup process.

To obtain your existing Master Key from your source Octopus instance, you can simply open Octopus Manager then select "View master key" as shown below:


:::figure
![](/docs/upgrade/images/view-master-key.png)
:::

Alternatively, you may also use the `show-master-key` command via the `Octopus.Server.exe` command-line tool. [You can find more information on this here](https://octopus.com/docs/octopus-rest-api/octopus.server.exe-command-line/show-master-key).
