#!/usr/bin/env node

var path = require('path')
var fse = require('fs-extra')
var readLineSync = require("readline-sync")
require('colors')

var CURR_DIR = process.cwd();
var templatesDir = path.join(__dirname, 'template');

var projectName = readLineSync.question('What is the name of your project? ', {
    limit: function (input) { return input.trim().length > 0 },
    limitMessage: 'The project has to have a name, try again'
});

var confirmCreateDirectory = readLineSync.keyInYN("You entered '" + projectName + "', create directory with this name?");

if (!confirmCreateDirectory) {
    console.log('Aborted creating a new template'.red);
} else {
    var source = templatesDir;
    var destination = path.join(CURR_DIR, projectName);
    fse.copy(source, destination)
        .then(function () { console.log(('Successfully created ' + projectName + '').green) })
        .then(function () { console.log('cd ' + projectName) })
        .then(function () { console.log('npm install') })
        .then(function () { console.log('npm start') })
        .catch(function (err) { console.error(err) })
}