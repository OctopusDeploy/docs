### .NET

SSH targets can specify which version of Calamari they should use, depending on whether Mono is installed on the target server:

- [Calamari built against the full .NET framework, which requires Mono to be installed on the target server](mono-calamari.md) 
- [Self-contained Calamari built against .NET Core](self-contained-calamari.md)

:::hint
Self-contained Calamari support was added in Octopus 3.16.
Prior to this, Mono was required on SSH targets
:::