var async    = require('async');
var colors   = require('colors');
var exec     = require('child_process').exec;
var fs       = require('fs');
var inquirer = require('inquirer');
var isRoot   = require('is-root');
var npm      = require('npm');
var path     = require('path');
var rimraf   = require('rimraf');
var which    = require('which');
var util     = require('../util');
var EventEmitter = require("events").EventEmitter;
var format   = require('util').format;

var repositories = {
  projectType: {
    basic: 'https://github.com/wearealloy/alloy-basic-template.git',
    craft: 'https://github.com/wearealloy/alloy-craft-template.git'
  }
}

module.exports = function(args, options, callback, ee) {
  var projectName, projectFolder, projectType, messages, directory;
  var tasks = [
    preflight, prompt, gitClone, folderSetup, npmInstall
  ];

  // Each function below is executed in order
  async.series(tasks, finish);

  // 1. Check that the process isn't root, and that Git is installed
  function preflight(cb) {
    console.log('in preflight');
    if (isRoot()) {
      console.log(util.mascot('craft', util.messages.noRoot));
      process.exit(1);
    }

    which('git', function(er) {
      if (er) {
        console.log(util.messages.gitNotInstalled);
        process.exit(69);
      }
      cb();
    });
  }

  // 2. Find out what the user wants to do
  function prompt(cb) {
    inquirer.prompt(util.questions(options), function(answers) {
      // The variables we need either came from the prompts, or the console arguments
      projectName = answers.directory || options.directory;
      projectType = answers.projectType || options.projectType;
      projectFolder = path.join(process.cwd(), projectName);
      messages = util.messages(projectName,projectType);

      cb();
    });
  }

  // 3. Clone the framework's template project
  function gitClone(cb) {
    console.log('in gitClone');
    var repo = projectType === 'craft'
      ? repositories.projectType.craft
      : repositories.projectType.basic;

    console.log('repo', repo);

    var cmd = format('git clone %s %s', repo, projectName);
    var hello = formatHello(messages.helloNova, projectType);

    console.log(util.mascot(projectType, hello));
    process.stdout.write(messages.downloadingTemplate);

    // [TODO] Change to spawn and check for errors on stderr
    if (repositories.projectType === undefined) {
	console.log("error!".red + "\nProject Type " + projectType.cyan + " unknown.");
	process.exit(1);
    }

    exec(cmd, function(err) {
      if (err instanceof Error) {
        console.log(messages.gitCloneError);
        process.exit(1);
      }

      process.chdir(projectFolder);

      cb();
    });

    if (typeof(ee) !== 'undefined') {
      ee.emit("cloneSuccess", projectName);
    }
  }

  // 4. Remove the Git folder and change the version number if applicable
  function folderSetup(cb) {
    rimraf('.git', function() {});
    console.log(messages.installingDependencies);
    cb();

    // if (options.edge) {
    //   util.changeVersion(directory, 'foundation-'+framework, 'master', cb);
    // }
    // else if (options.version) {
    //   util.changeVersion(directory, 'foundation-'+framework, options.version, cb);
    // }
    // else {
    //   cb();
    // }
  }

  // 5. Install Node dependencies
  function npmInstall(cb) {
    npm.load({ prefix: projectFolder, loglevel: 'error', loaded: false }, function(err) {
      npm.commands.install([], function(err, data) {
        if (options.debug && err) console.log(err);
        var success = err === null;
        if(success && typeof(ee) !== 'undefined') ee.emit("npmInstallSuccess", projectName);
        else if(typeof(ee) !== 'undefined') ee.emit("npmInstallFailure", projectName);
        cb(null, success);
      });
    });
  }

  // 7. Finish the process with a status report
  function finish(err, results) {
    // Indexes 4  of results are the npm status
    // All the rest should be undefined
    var allGood = results.indexOf(false) === -1;

    if (allGood)
      console.log(messages.installSuccess);
    else
      console.log(messages.installFail);

    console.log(messages.gitCloneSuccess);

    if (results[4])
      console.log(messages.npmSuccess);
    else
      console.log(messages.npmFail);

    if (allGood)
      console.log(messages.installSuccessFinal);
    else
      console.log(messages.installFailFinal);

    if (typeof(callback)!=='undefined') callback();
  }
}

function formatHello(str, projectType) {
  projectType = projectType.charAt(0).toUpperCase() + projectType.slice(1)
  str = str.join('\n');
  str = str.replace('%s', projectType);
  return str.split('\n');
}
