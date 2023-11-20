---
layout: src/layouts/Default.astro
pubDate: 2023-11-09
modDate: 2023-11-09
title: Validating CaC PRs
description: Learn how to automatically validate pull requests in a CaC Git repository
navOrder: 10
---

One of the challenges when implementing the [shared responsibility (or eventual consistency) model](levels-of-responsibility) is the potential for complex conflicts to be introduced to the downstream repositories. Without any controls on what changes can be made to a downstream project, it may become impractical to continue to push changes downstream.

One way to constrain the changes introduced to downstream CaC Git repositories is to automatically validate changes during a pull request (PR). This allows the platform team to introduce minimum requirements that all downstream CaC projects must adhere to while also allowing internal customers to customize their projects.

## Parsing OCL

CaC projects persist their configuration in the [Octopus Configuration Language (OCL)](/docs/projects/version-control/ocl-file-format). This format is parsed by the [`@octopusdeploy/ocl`](https://github.com/OctopusDeploy/ocl.ts) JavaScript library.

The `@octopusdeploy/ocl` library offers a low level parser that exposes individual OCL tokens. In addition, the library exposes a wrapper that allows the OCL data structure to be accessed via a read-only JavaScript object. This wrapped object can then be passed to any JavaScript library used to compare values or validate objects.

## Validating PRs with GitHub Actions

The workflow shown below is an example that combines the `@octopusdeploy/ocl` and `expect` libraries to verify that the merge result of a CaC Git repository meets certain minimum requirements:

```yaml
on: pull_request_target

jobs:
  validate-ocl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20.x'
      - run: npm install @octopusdeploy/ocl
      - run: npm install expect
      - uses: actions/github-script@v7
        with:
          script: |
            const {parseOclWrapper} = require("@octopusdeploy/ocl")
            const fs = require("fs")
            const path =require("path")
            const {expect} = require("expect");
            
            /**
            * This function performs the validation of the Octopus CaC OCL file
            * @param ocl The OCL file to parse
            */
            function checkPr(ocl) {
              // Read the file
              const fileContents = fs.readFileSync(ocl, 'utf-8')
              // Parse the file
              const deploymentProcess = parseOclWrapper(fileContents)
              
              // Verify the contents
              expect(deploymentProcess.step).not.toHaveLength(0)
              expect(deploymentProcess.step[0].name).toBe("Manual Intervention")
              expect(deploymentProcess.step[0].action[0].action_type).toBe("Octopus.Manual")
            }
            
            try {
              checkPr('./deployment_process.ocl')
            } catch (error) {
              console.log(error.matcherResult.message)
              process.exit(1)
            }
```

Let's break this workflow down.

The workflow is triggered on the `pull_request_target` event. This event runs workflows from the target branch, typically the `main` branch, meaning the pull request is validated according to the rules in the mainline branch. This prevents pull requests from bypassing checks by modifying the workflow file:

```yaml
on: pull_request_target
```

We start by checking out the Git repository contents:

```yaml
      - uses: actions/checkout@v3
```

The workflow requires Node.js to be installed:

```yaml
      - uses: actions/setup-node@v3
        with:
          node-version: '20.x'
```

The required libraries are installed via `npm`:

```yaml
      - run: npm install @octopusdeploy/ocl
      - run: npm install expect
```

The verification script is executed with the `actions/github-script` action:

```yaml
      - uses: actions/github-script@v7
        with:
          script: |
```

The libraries are exposed to the script with `require` statements:

```javascript
            const {parseOclWrapper} = require("@octopusdeploy/ocl")
            const fs = require("fs")
            const path =require("path")
            const {expect} = require("expect");
```

The verification logic is defined in the function called `checkPr` whose parameter is the name of the OCL file to parse:

```javascript
            /**
            * This function performs the validation of the Octopus CaC OCL file
            * @param ocl The OCL file to parse
            */
            function checkPr(ocl) {
```

The file contents are read to a string and passed to the `parseOclWrapper` function:

```javascript
              // Read the file
              const fileContents = fs.readFileSync(ocl, 'utf-8')
              // Parse the file
              const deploymentProcess = parseOclWrapper(fileContents)
```

The `deploymentProcess` variable references a read-only object that allows the data stored in the OCL file to be accessed with standard dot notation. Here we use the [`expect`](https://jestjs.io/docs/expect) library, often used with unit tests, to verify the properties of the OCL file:  

```javascript
              // Verify the contents
              expect(deploymentProcess.step).not.toHaveLength(0)
              expect(deploymentProcess.step[0].name).toBe("Manual Intervention")
              expect(deploymentProcess.step[0].action[0].action_type).toBe("Octopus.Manual")
            }
```

The final step is to call the `checkPr` function, catch any exceptions, and print them to the console:

```javascript
            try {
              checkPr('./deployment_process.ocl')
            } catch (error) {
              console.log(error.matcherResult.message)
              process.exit(1)
            }
```

## Diagnosing validation errors

The output of your validation script depends on the libraries used. The `expect` library is nice because it provides detailed differences between the expected and actual values. The end result of a failed validation looks something like this, where the JSON representation of the OCL data is presented as a diff showing which properties differed between the expected and input objects:

![GitHub Actions failure screenshot](/docs/platform-engineering/github-action-failure-example.png "width=500")

## Tips and tricks

Because the validation process is plain JavaScript code you are free to implement any libraries and logic you need.

The example below embeds a step OCL snippet as a string, parses the string, and uses the `toEqual` function to perform a deep comparison of the input OCL to the expected step:

```javascript
            const {parseOclWrapper} = require("@octopusdeploy/ocl")
            const fs = require("fs")
            const path =require("path")
            const {expect} = require("expect");
            
            const LastStep = `
              step "display-rest-api-id" {
              name = "Display REST API ID"
              
              action {
              action_type = "Octopus.Script"
              notes = "Displays the API Gateway ID created by the CloudFormation template."
              properties = {
                Octopus.Action.Script.ScriptBody = "echo \\"REST API ID: #{Octopus.Action[Create API Gateway].Output.AwsOutputs[RestApi]}\\""
                  Octopus.Action.Script.ScriptSource = "Inline"
                  Octopus.Action.Script.Syntax = "Bash"
                }
                  worker_pool = "hosted-ubuntu"
                }
            }`
            
            /**
            * This function performs the validation of the Octopus CaC OCL file
            * @param ocl The OCL file to parse
            */
            function checkPr(ocl) {
              // Read the file
              const fileContents = fs.readFileSync(ocl, 'utf-8')
              // Parse the file
              const deploymentProcess = parseOclWrapper(fileContents)
              
              // Parse the fixed step defined above
              const requiredStep = parseOclWrapper(LastStep)
              
              // Verify the contents
              expect(deploymentProcess.step[deploymentProcess.step.length - 1]).toEqual(requiredStep.step[0])
            }
            
            try {
              checkPr('./deployment_process.ocl')
            } catch (error) {
              console.log(error.matcherResult.message)
              process.exit(1)
            }
```

This example uses the [`lodash`](https://lodash.com/) library to clone the wrapper (because the wrapper is a read-only object) and remove the `name` property from both the template and actual OCL wrappers. This has the effect of comparing two OCL steps, but disregarding any changes to the step name:

```javascript
            const _ = require("lodash");
            const {parseOclWrapper} = require("@octopusdeploy/ocl")
            const fs = require("fs")
            const path =require("path")
            const {expect} = require("expect");
            
            const LastStep = `
              step "display-rest-api-id" {
              name = "Display REST API ID"
              
              action {
              action_type = "Octopus.Script"
              notes = "Displays the API Gateway ID created by the CloudFormation template."
              properties = {
                Octopus.Action.Script.ScriptBody = "echo \\"REST API ID: #{Octopus.Action[Create API Gateway].Output.AwsOutputs[RestApi]}\\""
                  Octopus.Action.Script.ScriptSource = "Inline"
                  Octopus.Action.Script.Syntax = "Bash"
                }
                  worker_pool = "hosted-ubuntu"
                }
            }`
            
            /**
            * This function performs the validation of the Octopus CaC OCL file
            * @param ocl The OCL file to parse
            */
            function checkPr(ocl) {
              // Read the file
              const fileContents = fs.readFileSync(ocl, 'utf-8')
              // Parse the file
              const deploymentProcess = parseOclWrapper(fileContents)
              
              // Parse the fixed step defined above
              const requiredStep = parseOclWrapper(LastStep)
              
              // Verify the contents
              const expectedWithoutName = _.cloneDeep(_.omit(requiredStep.step[0], ['name']))
              const sourceWithoutName = _.cloneDeep(_.omit(deploymentProcess.step[deploymentProcess.step.length - 1], ['name']))
              expect(sourceWithoutName).toEqual(expectedWithoutName)
            }
            
            try {
              checkPr('./deployment_process.ocl')
            } catch (error) {
              console.log(error.matcherResult.message)
              process.exit(1)
            }
```