### Copy all the files from the main instance

After the instance has been created, copy all the contents from the following folders.

- _Artifacts_, the default is `C:\Octopus\Artifacts`
- _Packages_, the default is `C:\Octopus\Packages`
- _Tasklogs_, the default is `C:\Octopus\Tasklogs`
- _EventExports_, the default is `C:\Octopus\EventExports`

:::div{.hint}
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::

Failure to copy over files will result in:
- Empty deployment screens
- Missing packages on the internal package feed
- Missing project or tenant images
- Missing archived events
- And more
