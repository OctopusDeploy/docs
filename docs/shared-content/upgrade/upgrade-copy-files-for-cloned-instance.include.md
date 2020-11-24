### Copy all the files from the main instance

After the instance has been created, copy all the contents from the following folders.

- Artifacts -> the default is `C:\Octopus\Artifacts`
- Packages -> the default is `C:\Octopus\Packages`
- Tasklogs -> the default is `C:\Octopus\Tasklogs`

Failure to copy over files will result in:
- Empty deployment screens
- Missing packages on the internal package feed
- Missing project or tenant images
- And more