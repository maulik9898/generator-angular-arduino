'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var genUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');
var serialPort = require("serialport");

var AngularFullstackGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.argument('name', { type: String, required: false });
    this.appname = this.name || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.option('app-suffix', {
      desc: 'Allow a custom suffix to be added to the module name',
      type: String,
      required: 'false'
    });
    this.scriptAppName = this.appname + genUtils.appName(this);
    this.appPath = this.env.options.appPath;
    this.pkg = require('../package.json');

    this.filters = {};
  },

  info: function () {
    this.log(this.yeoman);
    this.log('Out of the box I create an AngularJS app with an aWOT server.\n');
  },

  checkForConfig: function() {
    var cb = this.async();

    if(this.config.get('filters')) {
      this.prompt([{
        type: "confirm",
        name: "skipConfig",
        message: "Existing .yo-rc configuration found, would you like to use it?",
        default: true
      }], function (answers) {
        this.skipConfig = answers.skipConfig;
        cb();
      }.bind(this));
    } else {
      cb();
    }
  },

  clientPrompts: function() {
    if(this.skipConfig) return;
    var cb = this.async();

    this.log('# Client\n');

    this.prompt([{
        type: "list",
        name: "script",
        message: "What would you like to write scripts with?",
        choices: [ "JavaScript", "CoffeeScript"],
        filter: function( val ) {
          var filterMap = {
            'JavaScript': 'js',
            'CoffeeScript': 'coffee'
          };

          return filterMap[val];
        }
      }, {
        type: "confirm",
        name: "babel",
        message: "Would you like to use Javascript ES6 in your client by preprocessing it with Babel?",
        when: function (answers) {
          return answers.script === 'js';
        }
      }, {
        type: "list",
        name: "markup",
        message: "What would you like to write markup with?",
        choices: [ "HTML", "Jade"],
        filter: function( val ) { return val.toLowerCase(); }
      }, {
        type: "list",
        name: "stylesheet",
        default: 1,
        message: "What would you like to write stylesheets with?",
        choices: [ "CSS", "Sass", "Stylus", "Less"],
        filter: function( val ) { return val.toLowerCase(); }
      },  {
        type: "list",
        name: "router",
        default: 1,
        message: "What Angular router would you like to use?",
        choices: [ "ngRoute", "uiRouter"],
        filter: function( val ) { return val.toLowerCase(); }
      }, {
        type: "confirm",
        name: "bootstrap",
        message: "Would you like to include Bootstrap?"
      }, {
        type: "confirm",
        name: "uibootstrap",
        message: "Would you like to include UI Bootstrap?",
        when: function (answers) {
          return answers.bootstrap;
        }
      }], function (answers) {
        
        this.filters.babel = !!answers.babel;
        if(this.filters.babel){ this.filters.js = true; }
        this.filters[answers.script] = true;
        this.filters[answers.markup] = true;
        this.filters[answers.stylesheet] = true;
        this.filters[answers.router] = true;
        this.filters.bootstrap = !!answers.bootstrap;
        this.filters.uibootstrap =  !!answers.uibootstrap;
      cb();
      }.bind(this));
  },
  idePath: function() {
    if(this.skipConfig) return;
    var cb = this.async();
    var self = this;

    this.log('\n# Arduino IDE\n');

      self.prompt({
        type: "input",
        name: "idePath",
        message: "Path to Arduino IDE",
        default: "/Applications/Arduino.app/Contents/MacOS/arduino"
      }, function (answer) {
        self.idePath = answer.idePath;
        cb();
      });
  },
  serialPrompt: function() {
    if(this.skipConfig) return;
    var cb = this.async();
    var self = this;

    this.log('\n# Serial port\n');

    serialPort.list(function (err, ports) {
      var portChoices =  ports.map(function(port) {
        return port.comName;
      });

      portChoices.push("custom");

      self.prompt({
        type: "list",
        name: "port",
        message: "Please select serial port",
        choices: portChoices
      }, function (answer) {

        if (answer.port === 'custom'){
          self.prompt({
            type: "input",
            name: "port",
            message: "Port"
          }, function (answer) {
            self.serialPort = answer.port;
            cb();
          });
        } else {
          self.serialPort = answer.port;
          cb();
        }
      });
    });
  },
  platformPrompts: function() {
    if(this.skipConfig) return;
    var cb = this.async();
    var self = this;

    this.log('\n# Target platform\n');

    serialPort.list(function (err, ports) {
      self.prompt({
        type: "list",
        name: "platform",
        default: 4,
        message: "What is your target platform?",
        choices: [ "Uno", "Mega", "Due (Programming Port)", "Teensy3", "ESP8266", "custom"],
        filter: function( val ) { console.log(val); return val.toLowerCase(); }
      }, function (answer) {

        if (answer.platform === 'custom'){
          self.prompt([{
            type: "input",
            name: "package",
            message: "Package",
            default: "arduino"
          }, {
            type: "input",
            name: "arch",
            message: "Architecture",
            default: "avr"
          },{
            type: "input",
            name: "board",
            message: "Board",
            default: "uno"
          },{
            type: "input",
            name: "parameters",
            message: "Comma-separated list of boards specific parameters"
          }], function (answers) {
            self.package = answers.package;
            self.arch = answers.arch;
            self.board = answers.board;
            cb();
          });
        } else {
          if (answer.platform === 'uno'){
            self.package = 'arduino';
            self.arch = 'avr';
            self.board = 'uno';
          } else if (answer.platform === 'mega'){
            self.package = 'arduino';
            self.arch = 'avr';
            self.board = 'mega';
          } else if (answer.platform === 'due'){
            self.package = 'arduino';
            self.arch = 'sam';
            self.board = 'arduino_due_x_dbg';
          } else if (answer.platform === 'teensy3'){
            self.package = 'teensy';
            self.arch = 'avr';
            self.board = 'teensy3';
          } else if (answer.platform === 'esp8266'){
            self.package = 'esp8266';
            self.arch = 'esp8266';
            self.board = 'esp8266';
          }
          cb();
        }
      });
    });
  },

  saveSettings: function() {
    if(this.skipConfig) return;
    this.config.set('insertRoutes', true);
    this.config.set('registerRoutesFile', 'server/server.ino');
    this.config.set('routesNeedle', '// other routers');

    this.config.set('routesBase', '/api/');
    this.config.set('pluralizeRoutes', true);

    this.config.set('filters', this.filters);

    this.config.set('package', this.package);
    this.config.set('arch', this.arch);
    this.config.set('board', this.board);

    this.config.set('serialPort', this.serialPort);

    this.config.set('idePath', this.idePath);

    this.config.forceSave();
  },

  compose: function() {
    if(this.skipConfig) return;
    var appPath = 'client/app/';
    var extensions = [];
    var filters = [];

    if(this.filters.ngroute) filters.push('ngroute');
    if(this.filters.uirouter) filters.push('uirouter');
    if(this.filters.babel) extensions.push('babel');
    if(this.filters.coffee) extensions.push('coffee');
    if(this.filters.js) extensions.push('js');
    if(this.filters.html) extensions.push('html');
    if(this.filters.jade) extensions.push('jade');
    if(this.filters.css) extensions.push('css');
    if(this.filters.stylus) extensions.push('styl');
    if(this.filters.sass) extensions.push('scss');
    if(this.filters.less) extensions.push('less');

    this.composeWith('ng-component', {
      options: {
        'routeDirectory': appPath,
        'directiveDirectory': appPath,
        'filterDirectory': appPath,
        'serviceDirectory': appPath,
        'filters': filters,
        'extensions': extensions,
        'basePath': 'client'
      }
    }, { local: require.resolve('generator-ng-component/app/index.js') });
  },

  ngModules: function() {
    this.filters = this._.defaults(this.config.get('filters'), {
      bootstrap: true,
      uibootstrap: true
    });

    this.package = this.config.get('package');
    this.arch = this.config.get('arch');
    this.board = this.config.get('board');

    this.serialPort = this.config.get('serialPort');

    this.idePath = this.config.get('idePath');

    var angModules = [
      "'ngResource'",
      "'ngSanitize'"
    ];
    if(this.filters.ngroute) angModules.push("'ngRoute'");
    if(this.filters.uirouter) angModules.push("'ui.router'");
    if(this.filters.uibootstrap) angModules.push("'ui.bootstrap'");

    this.angularModules = "\n  " + angModules.join(",\n  ") +"\n";
  },

  generate: function() {
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.processDirectory(this, '.', '.');
  },

  end: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = AngularFullstackGenerator;
