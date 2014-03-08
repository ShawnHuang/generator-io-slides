'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var IoSlidesGenerator = module.exports = function IoSlidesGenerator(args, options, config){
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  // for hooks to resolve on mocha by default
  if(!options['test-framework']){
    options['test-framework'] = 'mocha';
  }
  // resolved to mocha by default (could be switched to jasmie for instance)
  this.hookFor('test-framework', { as: 'app' });

  //this.indexFile = this.readFileAsString(path.join(this.sourceRoot(),'index.html'));
  //this.mainJsFile = '';

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.on('end', function(){
    this.installDependencies({ skipInstall: options['skip-install'] });
  })
}

util.inherits(IoSlidesGenerator, yeoman.generators.Base);

IoSlidesGenerator.prototype.askFor = function askFor () {
  var done = this.async();

  //welcom message
  console.log(this.yeoman);
  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];
  this.prompt(prompts, function (answers) {
    var features = answers.features;
    this.someOptions = features;// features.indexOf('') !== -1;

    done();
  }.bind(this));
}

IoSlidesGenerator.prototype.gruntfile = function gruntfile () {
  this.template('Gruntfile.js');
};

IoSlidesGenerator.prototype.packageJSON = function packageJSON () {
  this.template('_package.json', 'package.json');
}

IoSlidesGenerator.prototype.jshint = function jshint () {
  this.copy('jshintrc', '.jshintrc');
}

IoSlidesGenerator.prototype.bower = function bower () {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
}

IoSlidesGenerator.prototype.app = function app () {
    this.mkdir('app');
    this.directory('theme', 'app/theme');
    this.directory('js', 'app/js');
    this.directory('images', 'app/images');
    this.directory('scripts', 'app/scripts');
    this.copy('_template.html', 'app/template.html');
    this.copy('_slide_config.js', 'app/slide_config.js');
    this.copy('_serve.sh', 'app/serve.sh');
}

//var IoSlidesGenerator = yeoman.generators.Base.extend({
//  init: function () {
//    this.pkg = require('../package.json');
//
//    this.on('end', function () {
//      if (!this.options['skip-install']) {
//        this.installDependencies();
//      }
//    });
//  },
//
//  askFor: function () {
//    var done = this.async();
//
//    // have Yeoman greet the user
//    this.log(this.yeoman);
//
//    // replace it with a short and sweet description of your generator
//    this.log(chalk.magenta('You\'re using the fantastic IoSlides generator.'));
//
//    var prompts = [{
//      type: 'confirm',
//      name: 'someOption',
//      message: 'Would you like to enable this option?',
//      default: true
//    }];
//
//    this.prompt(prompts, function (props) {
//      this.someOption = props.someOption;
//
//      done();
//    }.bind(this));
//  },
//
//  app: function () {
//    this.directory('theme', 'theme');
//    this.directory('js', 'js');
//    this.directory('images', 'images');
//    this.directory('scripts', 'scripts');
//    this.copy('_template.html', 'template.html');
//    this.copy('_slide_config.js', 'slide_config.js');
//    this.copy('_serve.sh', 'serve.sh');
//
//    this.copy('_package.json', 'package.json');
//    this.copy('_bower.json', 'bower.json');
//  },
//
//  projectfiles: function () {
//    this.copy('jshintrc', '.jshintrc');
//  }
//});
//
//module.exports = IoSlidesGenerator;
