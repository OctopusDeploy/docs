:::div{.warning}
Due to how Octopus stores the paths to various BLOB data (task logs, artifacts, packages, imports, event exports etc.), you cannot run a mix of both Windows Servers, and Octopus Linux containers connected to the same Octopus Deploy instance.  A single instance should only be hosted using one method.
:::

:::div{.hint}
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::