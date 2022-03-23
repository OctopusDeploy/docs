**Pattern - Blue-Green**

- Random Quotes .NET
   - <a href="https://samples.octopus.app/app#/Spaces-302/projects/Projects-542/operations/runbooks/Runbooks-523/process/RunbookProcess-Runbooks-523" target="_blank">Create Infrastructure</a>: <i>Creates environment-specific infrastructure.</i>
    
**Target - Windows**

- Computer Provisioning
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-761/operations/runbooks/Runbooks-801/process/RunbookProcess-Runbooks-801" target="_blank">Install Developer Machine Dependencies</a>
- OctoFX
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-270/process/RunbookProcess-Runbooks-270" target="_blank">Backup & Restore SQL Backup from Production to Environment</a>: <i>Back up Production Database and Restore to Environment picked during running. 

      - If you select Production, it will overwrite Production (Only to be used for Restoring backups to Production)
      - If you select Test, it will restore to Test
      - If you select Development, it will restore to Development
      - If you select Disaster Recovery, it will restore to Disaster Recovery</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-250/process/RunbookProcess-Runbooks-250" target="_blank">Install Dependencies</a>: <i>Installs Dependencies for the application to run. It installs the following: 
      - Chocolatey
      - Chocolatey VSCode Install
      - Chocolatey .NET 4.7.2
      - Chocolatey .NET 4.8
      - Installs IIS & Dependencies
      - Checks for Pending Restarts and Restarts if required.</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-601/process/RunbookProcess-Runbooks-601" target="_blank">Restart IIS AppPool</a>: <i>Restarts an IIS AppPool in required environment</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-568/process/RunbookProcess-Runbooks-568" target="_blank">Restart IIS Website</a>: <i>Runbook that restarts a named IIS Website</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-254/process/RunbookProcess-Runbooks-254" target="_blank">Start IIS AppPool</a>: <i>Starts IIS App Pool on Web Servers</i>
   - <a href="https://samples.octopus.app/app#/Spaces-202/projects/Projects-282/operations/runbooks/Runbooks-253/process/RunbookProcess-Runbooks-253" target="_blank">Stop IIS AppPool</a>: <i>Stops an IIS AppPool in required environment</i>
