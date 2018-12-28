var colors       = require('colors')
var multiline    = require('multiline');
var paint        = require('paint-by-number');
var stringLength = require('string-length');

var family = {};
var colors = {};
var palette = {
  0: 'grey',
  1: 'cyan',
  2: 'magenta',
  3: 'yellow',
  4: 'white'
}

module.exports = mascot;

// This function takes an array of text messages and places them next to the ASCII mascot
function mascot(mascot, text) {
  if (!mascot.match(/^(craft|basic)$/)) {
    mascot = 'craft';
  }
  if (typeof text === 'string') {
    text = text.split('\n');
  }

  var colorScheme = colors[mascot].split('\n');

  // The mascot image is split into an array of lines, and colored
  var nova = family[mascot];
  nova = nova.split('\n');
  nova = paint(nova, colorScheme, palette);

  // Distance between the mascot and the text
  var baseTextOffset = 5;
  // Number of lines in the mascot image
  var novaHeight  = nova.length - 1;
  // Number of lines in the message
  var textHeight  = text.length;
  // Vertical offset for message
  var textOffset  = Math.floor((novaHeight - textHeight) / 2);
  // Longest line length in the mascot image
  var longestLine = getLongestLine(nova);

  // Prepend a newline to each line of the mascot image
  for (var i in nova) {
    nova[i] = '\n ' + nova[i];
  }

  // Append each line of the text message to the mascot image
  for (var i = 0; i < text.length; i++) {
    var offset = textOffset + i;
    var newLine = i > 0 ? '\n' : '';
    var spaceCount = longestLine - stringLength(nova[offset]) + baseTextOffset;

    nova[offset] = nova[offset] + repeatChar(' ', spaceCount) + text[i];
  }

  return nova.join('') + '\n';
}

// Find the longest line in an array of strings
function getLongestLine(nova) {
  var highest = 0;
  for (var i = 0; i < nova.length; i++) {
    var len = stringLength(nova[i]);
    if (len > highest) highest = len;
  }
  return highest;
}

// Thank you: http://stackoverflow.com/a/5450113/492553
function repeatChar(pattern, count) {
  if (count < 1) return '';
  var result = '';
  while (count > 1) {
    if (count & 1) result += pattern;
    count >>= 1, pattern += pattern;
  }
  return result + pattern;
}

// Mascots!

family.craft = multiline(function() {/*
  .-"-.
 /|6 6|\
{/(_0_)\}
 _/ ^ \_
(/ /^\ \)-'
 ""' '""
*/});

colors.craft = multiline(function() {/*
  04040
 046 640
004404400
 04 0 40
04 404 4000
 444 444             
*/});

family.basic = multiline(function() {/*
 /^ ^\
/ 0 0 \
V\ Y /V
 / - \
 |    \
 || (__V
*/});

colors.basic = multiline(function() {/*
 

 
 0 0 0
 0    0
 00 0000      
*/});

