#!/usr/bin/node
let nodemon = require('nodemon');
let chalk = require('chalk');
let fs = require('fs-extra');
let db = require('./db');
console.log(chalk.magenta(`${chalk.yellow(`[Process-Handler]`)} Type \'rs\' to restart.`));
if(fs.existsSync('./errlogs') && fs.readdirSync('./errlogs').length >= 5) fs.emptydirSync('./errlogs');

nodemon({
  script: 'main.js',
  ext: 'js'
});

nodemon.on('start', function () {
  console.log(chalk.green(`${chalk.yellow(`[Process-Handler]`)} Moonlight is starting.`));
}).on('quit', function () {
  console.log(chalk.red(`${chalk.yellow(`[Process-Handler]`)} Moonlight is quitting.`));
  //db.save();
  process.exit();
});

setInterval(() => {
  db.save();
}, 6000000);