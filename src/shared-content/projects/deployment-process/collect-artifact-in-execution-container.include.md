The source file for the artifact must be saved and collected from the **fully qualified path** of one of the directories (or sub-directories) mapped into the execution container as a volume.

The recommended volume to use is the temporary directory created within the `<Tentacle Home>/Work` workspace, for example, `/etc/octopus/Tentacle/Work/20221128114036-119427-56`. 

Once the artifact has been collected, the directory and its contents will be removed once the step has been executed. Its value can be found in the `PWD` environment variable.

The following script would collect an artifact called `foo.txt` from the temporary working directory using the `$PWD` environment variable:

<details data-group="collect-artifact-in-execution-container">
<summary>Bash</summary>

```bash Bash
echo "Hello" > $PWD/foo.txt
new_octopusartifact $PWD/foo.txt
```

</details>
<details data-group="collect-artifact-in-execution-container">
<summary>PowerShell</summary>

```powershell PowerShell
"Hello" > "$($PWD)/foo.txt"
New-OctopusArtifact "$($PWD)/foo.txt"
```

</details>
