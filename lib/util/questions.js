var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  var questions = [];

  questions.push({
    type: 'list',
    name: 'projectType',
    message: 'What are you building today?',
    default: 'craft',
    choices: [{
      name: 'A website using Craft CMS',
      value: 'craft'
    }, {
      name: 'A simple (usually static) website',
      value: 'basic'
    }],
    when: function () {
      if (!options.projectType || !options.projectType.match(/^(craft|basic)s?$/i))
        return true;
    }
  });
  
  questions.push({
    type: 'input',
    name: 'directory',
    message: 'What\'s the project called? (no spaces)',
    validate: function(input) {
      var folder = path.join(process.cwd(), input);
      if (fs.existsSync(folder)) {
        return 'There\'s already a folder with that name in this directory.';
      }
      if (input.indexOf(" ") != -1) {
        return "The project name should not contain any spaces.";
      }
      return true;
    },
    when: function () {
      if (!options.directory)
        return true;
    }
  });
  // console.log('question: ', questions);
  return questions;
}
