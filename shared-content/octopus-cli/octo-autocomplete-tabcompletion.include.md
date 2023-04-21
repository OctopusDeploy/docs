## Tab completion for commands and options {#OctopusCLI-TabCompletion}
Tab completion is available for the following shell environments: `powershell`, `pwsh` (PowerShell Core), `bash` & `zsh`. This feature requires that `octo` or `Octo` is available from your $PATH, which is the default state if installed via a package manager or Chocolatey. If you've manually installed the CLI, please ensure your $PATH is also updated if you wish to use this feature. This is an optional feature that requires additional [installation steps](#OctopusCLI-TabCompletionInstallation) on a per user basis, since this feature relies on built-in shell auto completion facilities.

### Additional installation steps for tab completion. {#OctopusCLI-TabCompletionInstallation}

1. Check that `octo` is available on your path:

```bash
which octo
```
This should return a valid location on your path like `/usr/bin/octo`.

2. Install tab completion scripts into your profile, choosing from `powershell`, `pwsh`, `bash` or `zsh`:

```bash
octo install-autocomplete --shell zsh
```

:::div{.hint}
**Tips:**
- If you're using PowerShell on Windows use `powershell`. If you're using PowerShell Core on Windows, Mac or Linux, use `pwsh`.
- You can review changes to your profile without writing to disk by using the `--dryRun` option:

```powershell
octo install-autocomplete --shell powershell --dryRun
```
:::

3. Either restart your shell environment or 'dot source' your profile:

```bash Bash
. ~/.bashrc
```
```bash Zsh
. ~/.zshrc
```
```powershell PowerShell
. $PROFILE
```

4. You can now discover sub-commands by typing `octo [searchterm]` and hitting the [tab] key. If you don't provide a search term, the full list of available sub-commands will be shown.

![animation showing the tab completion feature in Zsh to list all environments in the default space](/docs/shared-content/images/autocomplete.gif "width=500")
