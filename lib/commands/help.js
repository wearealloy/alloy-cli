var colors = require('colors');

var helpText = {
  // Each command is an array of strings
  // To print the command, the array is joined into one string, and a line break is added
  // between each item. Basically, each comma you see becomes a line break.
  'default': [
    'Commands:',
    '  new'.cyan + '       Create a new Alloy project',
    '  watch'.cyan + '     Watch a project\'s files for changes',
    '  build'.cyan + '     Build a project\'s files for production',
    '  help'.cyan + '      Show this screen',
    '  -v'.cyan + '        Display the CLI\'s version',
    '',
    'To learn more about a specific command, type ' + 'alloy help <command>'.cyan
  ],
  'new': [
    'Usage:',
    '  alloy new ',
    '  alloy new ' + '--siteType craft',
    '  alloy new ' + '--siteType basic',
    '',
    'Creates a new Alloy project.',
    'Run the command without any flags to get an interactive setup prompt.',
    'You can also manually supply the project and folder name using the ' + '--siteType'.cyan + ' and ' + '--directory'.cyan + ' flags.'
  ],
  'watch': [
    'Usage:',
    '  alloy watch',
    '',
    'Assembles your app\'s files and watches for any new changes to the files.',
    'Keep this command running while you work on your project.'
  ],
  'build': [
    'Usage:',
    '  alloy build',
    '',
    'Assembles your app\'s files into a production-ready build.'
  ],
  'help': [
    'Okay, don\'t get clever. But seriously:',
    '',
    'Usage:',
    '  alloy help',
    '  alloy help <command>',
    '',
    'Type ' + 'alloy help'.cyan + ' to see a list of every command,',
    'or ' + 'alloy help <command>'.cyan + ' to learn how a specific command works.'
  ]
}

module.exports = function(args, options) {
  var say;
  if (typeof args === 'undefined' || args.length === 0) {
    say = 'default'
  } else {
    say = args[0]
  }
  // A line break is added before and after the help text for good measure
  say = '\n' + helpText[say].join('\n') + '\n\n'

  process.stdout.write(say);
}
