'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var IoSlidesGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic IoSlides generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.directory('theme', 'theme');
    this.directory('js', 'js');
    this.directory('images', 'images');
    this.directory('scripts', 'scripts');
    this.copy('_template.html', 'template.html');
    this.copy('_slide_config.js', 'slide_config.js');
    this.copy('_serve.sh', 'serve.sh');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = IoSlidesGenerator;
