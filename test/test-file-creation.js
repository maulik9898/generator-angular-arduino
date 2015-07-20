/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs-extra');
var exec = require('child_process').exec;

describe('angular-arduino generator', function () {
  var gen, defaultOptions = {
    script: 'js',
    markup: 'html',
    stylesheet: 'sass',
    router: 'uirouter',
    bootstrap: true,
    uibootstrap: true,
    package: 'esp8266',
    arch: 'esp8266',
    board: 'esp8266',
    serialPort: 'MOCK_PORT'
  }, dependenciesInstalled = false;

  function generatorTest(generatorType, name, mockPrompt, callback) {
    gen.run({}, function () {
      var afGenerator;
      var deps = [path.join('../..', generatorType)];
      afGenerator = helpers.createGenerator('angular-arduino:' + generatorType, deps, [name]);

      helpers.mockPrompt(afGenerator, mockPrompt);
      afGenerator.run([], function () {
        callback();
      });
    });
  }

  beforeEach(function (done) {
    this.timeout(10000);
    var deps = [
      '../../app',
      [
        helpers.createDummyGenerator(),
        'ng-component:app'
      ]
    ];

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      gen = helpers.createGenerator('angular-arduino:app', deps);
      gen.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  describe('running app', function() {

    beforeEach(function() {
      this.timeout(20000);
      fs.mkdirSync(__dirname + '/temp/client');
      fs.symlinkSync(__dirname + '/fixtures/node_modules', __dirname + '/temp/node_modules');
      fs.symlinkSync(__dirname +'/fixtures/bower_components', __dirname +'/temp/client/bower_components');
    });

    describe('with default options', function() {
      beforeEach(function() {
        helpers.mockPrompt(gen, defaultOptions);
      });

      it('should run tests successfully', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt test', function (error, stdout, stderr) {
            expect(stdout, 'Client tests failed \n' + stdout ).to.contain('Executed 1 of 1 SUCCESS');
            done();
          });
        });
      });

      it('should pass jshint', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt jshint', function (error, stdout, stderr) {
            expect(stdout).to.contain('Done, without errors.');
            done();
          });
        });
      });

      it('should use existing config if available', function(done) {
        this.timeout(60000);
        fs.copySync(__dirname + '/fixtures/.yo-rc.json', __dirname + '/temp/.yo-rc.json');
        var gen = helpers.createGenerator('angular-arduino:app', [
          '../../app',
          [
            helpers.createDummyGenerator(),
            'ng-component:app'
          ]
        ]);
        gen.options['skip-install'] = true;
        helpers.mockPrompt(gen, {
          skipConfig: true
        });
        gen.run({}, function () {
          helpers.assertFile([
            'client/app/main/main.less',
            'client/app/main/main.coffee'
          ]);
          done();
        });
      });
    });

    describe('with Babel ES6 preprocessor', function() {
      beforeEach(function() {
        helpers.mockPrompt(gen, {
          script: 'js',
          babel: true,
          markup: 'jade',
          stylesheet: 'less',
          router: 'uirouter'
        });
      });

      it('should run tests successfully', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt test', function (error, stdout, stderr) {
            expect(stdout, 'Client tests failed \n' + stdout ).to.contain('Executed 1 of 1 SUCCESS');
            done();
          });
        });
      });

      it('should pass jshint', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt jshint', function (error, stdout, stderr) {
            expect(stdout).to.contain('Done, without errors.');
            done();
          });
        });
      });
    });



    describe('with other preprocessors and no server options', function() {
      beforeEach(function(done) {
        helpers.mockPrompt(gen, {
          script: 'coffee',
          markup: 'jade',
          stylesheet: 'stylus',
          router: 'ngroute'
        });
        done();
      });

      it('should run tests successfully', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt test', function (error, stdout, stderr) {
            expect(stdout, 'Client tests failed \n' + stdout ).to.contain('Executed 1 of 1 SUCCESS');
            done();
          });
        });
      });

      it('should pass jshint', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt jshint', function (error, stdout, stderr) {
            expect(stdout).to.contain('Done, without errors.');
            done();
          });
        });
      });
    });

    describe('with no preprocessors and no server options', function() {
      beforeEach(function(done) {
        helpers.mockPrompt(gen, {
          script: 'js',
          markup: 'html',
          stylesheet: 'css',
          router: 'ngroute'
        });
        done();
      });

      it('should run client tests successfully', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt test', function (error, stdout, stderr) {
            expect(stdout, 'Client tests failed \n' + stdout ).to.contain('Executed 1 of 1 SUCCESS');
            done();
          });
        });
      });

      it('should pass jshint', function(done) {
        this.timeout(60000);
        gen.run({}, function () {
          exec('grunt jshint', function (error, stdout, stderr) {
            expect(stdout).to.contain('Done, without errors.');
            done();
          });
        });
      });

      it('should generate expected files', function (done) {
        helpers.mockPrompt(gen, defaultOptions);

        gen.run({}, function () {
          helpers.assertFile([
            'client/favicon.ico',
            'client/robots.txt',
            'client/app/main/main.scss',
            'client/app/main/main.html',
            'client/index.html',
            'client/.jshintrc',
            'client/assets/images/yeoman.jpg',
            '.bowerrc',
            '.editorconfig',
            '.gitignore',
            'Gruntfile.js',
            'package.json',
            'bower.json',
            'server/server.ino',
            'server/thing.controller.ino',
            'server/thing.router.ino']);
          done();
        });
      });
    });
  });
});
