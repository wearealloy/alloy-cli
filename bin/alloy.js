#!/usr/bin/env node

var nopt       = require('nopt');
var pkg        = require('../package.json');
var alloy = require('../lib'); //***cambiar

// Options that can be passed to commands
var options = {
  "projectType": String,
  "directory": String
}

// Shorthands for the above commands
var shorthands = {
  "v": "--version",
  "t": "--projectType",
  "d": "--directory"
}

var parsed = nopt(options, shorthands);

// cmd.args contains basic commands like "new" and "help"
// cmd.opts contains options, like --libsass and --version
var cmd = {
  args: parsed.argv.remain,
  opts: parsed
}

// No other arguments given
if (typeof cmd.args[0] === 'undefined') {
  // If -v or --version was passed, show the version of the CLI
  if (typeof cmd.opts.version !== 'undefined') {
    process.stdout.write("Alloy CLI version " + require('../package.json').version + '\n');
  }
  // Otherwise, just show the help screen
  else {
    alloy.help(); //***cambiar
  }
}

// Arguments given
else {
  // If the command typed in doesn't exist, show the help screen
  if (typeof alloy[cmd.args[0]] == 'undefined') {
    alloy.help(); //***cambiar
  }
  // Otherwise, just run it already!
  else {
    // Every command function is passed secondary commands, and options
    // So if the user types "alloy new myApp --edge", "myApp" is a secondary command, and "--edge" is an option
    alloy[cmd.args[0]](cmd.args.slice(1), cmd.opts); //***cambiar
  }
}