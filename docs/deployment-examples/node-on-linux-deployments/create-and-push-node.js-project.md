---
title: Create and Push a Node.js Project
description: This guide describes how to package and publish a Node.js application to Octopus from your development workstation.
position: 1
---

The sample project for this guide is a simple Node.js app that hosts the [expressjs](http://expressjs.com/) web server to serve some static content as well as return config variables that will be used by the client. There are several npm modules that you can use in a Node.js process to package your project and push it to an Octopus Deploy instance.

- [@octopusdeploy/octopackjs](https://github.com/OctopusDeploy/octopackjs) - A module that packages up resources into a number of package formats that can be saved to disk or returned as a stream.
- [@octopusdeploy/gulp-octo](https://github.com/OctopusDeploy/gulp-octo) - A gulp wrapper for octojs to integrate into Gulp based tasks.
- [@octopusdeploy/grunt-octo](https://github.com/OctopusDeploy/grunt-octo) - A grunt wrapper for octojs to integrate into Grunt based tasks.

This page will take you through creating and updating a simple Node.js project on your development workstation. For the following tasks it is assumed you have [Node.js](https://nodejs.org) and [Git](https://git-scm.com/) installed on your development machine with an Octopus Deploy Server instance available.

:::warning
**npm scoped packages**
To avoid confusion with the myriad of other "octo" themed npm packages and to provide guidance on those supported directly by Octopus Deploy, we have decided to publish these as [scoped packages](https://docs.npmjs.com/misc/scope). The scoped package concept is relatively new to npm and so will require npm version greater then 2.7.0 to use them. Checkout out the npm [getting started guide](https://docs.npmjs.com/getting-started/scoped-packages) for more info.

To find out what version you're currently running, simply call

```bash
npm -v
```
:::

## Download and Run the Template {#Create&amp;PushNode.jsProject-Download&amp;Runthetemplate}

Download the sample project from the public GitHub repo and checkout the gulp branch:

```bash
git clone https://github.com/OctopusDeploy/octofxjs.git
cd octofxjs/
git checkout gulp
npm install
```

Build and start the process to ensure the site runs correctly:

```bash
npm run build
npm start
```

Navigating to http://localhost:8081 you should see a page with words that appear to be missing. These will be populated in the config files during the deployment to the appropriate environment.

![](/docs/images/3049551/3278578.png)

## Configure Publish Task {#Create&amp;PushNode.jsProject-ConfigurePublishTask}

Using the task runner of your choice, pick one of the following steps that you are most comfortable with.

### Option 1 - Gulp Publish Task {#Create&amp;PushNode.jsProject-Option1-Gulppublishtask}

Ensuring that you have checked out the **gulp** branch with the initial build tasks already configured, install the **gulp-octojs** package that will do all the packaging and pushing work for you. We will also include the external **[gulp-bump](https://github.com/stevelacy/gulp-bump)** library to increase the patch version number before each publish. That way the server will retain previous builds and we can easily manage and deploy each version in Octopus Deploy independently.

```bash
git checkout gulp
npm install
npm install --save-dev gulp-bump @octopusdeploy/gulp-octo
```

In your IDE of choice, modify the **gulpfile.js** file to add the following gulp tasks, substituting the correct **host** address of your Octopus Server and **apiKey** you generated for this purpose in the user profile section in Octopus Deploy.

```js
var bump = require('gulp-bump');
var octo = require('@octopusdeploy/gulp-octo');

 ...

gulp.task('bump', function(){
  return gulp.src('./package.json')
      .pipe(bump({type: 'patch'}))
      .pipe(gulp.dest('./'));
});

gulp.task('publish', ['bump', 'build'], function () {
  return gulp.src(['**/*', '!bin{,/**}', '!src{,/**}', '!gulpfile.js'])
      .pipe(octo.pack())
      .pipe(octo.push({apiKey: 'API-FZOIZFX6AXFVLJNAWQEDLG09SVU', host: 'http://10.0.0.134'}));
});
```

:::hint
**What should I include in the package?**
Notice that we're just packaging up resources that will be needed to run the application, ignoring source and build files but including the **node\_modules** directory. While some might exclude this, often large, directory and simply run *npm install*again on the server once deployed, this violates the *Build once, deploy many* mantra that we recommend at Octopus Deploy. As expanded in [this great article about "the npm Debacle"](http://www.letscodejavascript.com/v3/blog/2014/03/the_npm_debacle), you shouldn't really rely on these external repositories returning the same packages (or anything at all) during deployment as when you ran them during development.
:::

To make life easier add the gulp publish script to your **package.json** scripts section like so

```json
"scripts": {
    ...
    "publish": "node ./node_modules/gulp/bin/gulp.js publish"
  },
```

You can then execute the publish command directly through npm without having to worry about if the task runner or arguments change.

### Option 2 - Grunt Publish Task {#Create&amp;PushNode.jsProject-Option2-Gruntpublishtask}

Ensuring that you have checked out the **grunt** branch with the initial build tasks already configured, install the **grunt-octojs** package that will do all the packaging and pushing work for you. We will also include the external [grunt-bump](https://github.com/vojtajina/grunt-bump) library to increase the patch version number before each publish. That way the server will retain previous builds and we can easily manage and deploy each version in Octopus Deploy independently. We will also include the [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) library to clean the build output directory to avoid pushing the same packages on each publish

```bash
git checkout grunt
npm install
npm install --save-dev grunt-bump grunt-contrib-clean @octopusdeploy/grunt-octo
```

In your IDE of choice, modify the **gruntfile.js** file to add the following grunt tasks, substituting the correct **host** address of your Octopus Server and **apiKey** you generated for this purpose in the user profile section in Octopus Deploy.

```js
grunt.initConfig({
	...
	"octo-push": {
		options: { host: 'http://10.0.0.134', apiKey: 'API-FZOIZFX6AXFVLJNAWQEDLG09SVU'	},
		src: ['./bin/**/*']
	},
	"octo-pack": {
		prod: {
			options: { dst: './bin' },
			src: ['**/*', '!bin{,/**}', '!src{,/**}', '!gruntfile.js']
		}
	},
	bump: {
		options: { files: ['package.json'], commit: false, createTag: false, push: false }
	},
	clean: { pkg: ['./bin/**/*'] }
});

grunt.loadNpmTasks('@octopusdeploy/grunt-octo');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-bump');
grunt.registerTask('publish',  ['bump', 'build', 'clean:pkg',  'octo-pack:prod', 'octo-push']);

...
```

Finally add the npm publish script using the grunt task runner.

```json
"scripts": {
    ...
    "publish": "node ./node_modules/grunt-cli/bin/grunt publish"
  },
```

You can then execute the publish command directly through npm without having to worry about if the task runner or arguments change.

### Option 3 - Bespoke {#Create&amp;PushNode.jsProject-Option3-Bespoke}

Using the [octopackjs](https://github.com/OctopusDeploy/octopackjs) npm module you can write your own Node.js scripts to package and push your projects to the Octopus Server (Under the hood both the Gulp and Grunt tasks leverage this module). Alternately package your files into the [format of your choice](/docs/packaging-applications/supported-packages.md) and push to the API over a HTTP call using whatever framework or language that best suits you.

## Publish Package {#Create&amp;PushNode.jsProject-PublishPackage}

With the previous work done, publishing the project package to Octopus is a simple one line command which can be run as many times as you like. On each invocation the minor version will be bumped up and a new package will be ready to be deployed.

```bash
npm run publish
```

The package should now show up in the built-in package feed in your Octopus Deploy instance.

:::success
While this guide executes the publish task from your local machine, you will likely set up your CI process to run with tests etc via some build tool such as Team City or Jenkins.
:::
