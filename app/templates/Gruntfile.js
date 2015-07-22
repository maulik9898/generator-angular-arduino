// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    watch: {
      injectJS: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.js',
          '!<%%= yeoman.client %>/{app,components}/**/*.spec.js',
          '!<%%= yeoman.client %>/{app,components}/**/*.mock.js',
          '!<%%= yeoman.client %>/app/app.js'],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      jsTest: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%%= yeoman.client %>/{app,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },<% if(filters.stylus) { %>
      injectStylus: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.styl'],
        tasks: ['injector:stylus']
      },
      stylus: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.styl'],
        tasks: ['stylus', 'autoprefixer']
      },<% } %><% if(filters.sass) { %>
      injectSass: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },<% } %><% if(filters.less) { %>
      injectLess: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.less'],
        tasks: ['injector:less']
      },
      less: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },<% } %><% if(filters.jade) { %>
      jade: {
        files: [
          '<%%= yeoman.client %>/{app,components}/*',
          '<%%= yeoman.client %>/{app,components}/**/*.jade'],
        tasks: ['jade']
      },<% } %><% if(filters.coffee) { %>
      coffee: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.{coffee,litcoffee,coffee.md}',
          '!<%%= yeoman.client %>/{app,components}/**/*.spec.{coffee,litcoffee,coffee.md}'
        ],
        tasks: ['newer:coffee', 'injector:scripts']
      },
      coffeeTest: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.spec.{coffee,litcoffee,coffee.md}'
        ],
        tasks: ['karma']
      },<% } %><% if(filters.babel) { %>
      babel: {
        files: [
          '<%%= yeoman.client %>/{app,components}/**/*.js',
          '!<%%= yeoman.client %>/{app,components}/**/*.spec.js'
        ],
        tasks: ['babel']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.css',
          '{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.html',
          <% if(filters.babel) { %>
          '.tmp/{app,components}/**/*.js',
          <% } else { %>
          '{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.js',
          <% } %>
          '!{.tmp,<%%= yeoman.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.mock.js',
          '<%%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%%= yeoman.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%%= yeoman.client %>/{app,components}/**/*.js',
        '!<%%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%%= yeoman.client %>/{app,components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%%= yeoman.client %>/{app,components}/**/*.mock.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*',
            '!<%%= yeoman.dist %>/.openshift',
            '!<%%= yeoman.dist %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%%= yeoman.client %>/index.html',
        ignorePath: '<%%= yeoman.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/'<% if(!filters.css) { %>, /bootstrap.css/, /font-awesome.css/ <% } %>]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%%= yeoman.client %>/index.html'],
      options: {
        dest: '<%%= yeoman.dist %>/public'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/public/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/public/{,*/}*.css'],
      js: ['<%%= yeoman.dist %>/public/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%%= yeoman.dist %>/public',
          '<%%= yeoman.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/public/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/public/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: '<%= scriptAppName %>',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%%= yeoman.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.client %>',
          dest: '<%%= yeoman.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            'assets/images/{,*/}*.{webp}',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yeoman.dist %>/public/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%%= yeoman.dist %>',
          src: [
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [<% if(filters.coffee) { %>
        'coffee',<% } %><% if(filters.babel) { %>
        'babel',<% } %><% if(filters.jade) { %>
        'jade',<% } %><% if(filters.stylus) { %>
        'stylus',<% } %><% if(filters.sass) { %>
        'sass',<% } %><% if(filters.less) { %>
        'less',<% } %>
      ],
      test: [<% if(filters.coffee) { %>
        'coffee',<% } %><% if(filters.babel) { %>
        'babel',<% } %><% if(filters.jade) { %>
        'jade',<% } %><% if(filters.stylus) { %>
        'stylus',<% } %><% if(filters.sass) { %>
        'sass',<% } %><% if(filters.less) { %>
        'less',<% } %>
      ],
      dist: [<% if(filters.coffee) { %>
        'coffee',<% } %><% if(filters.babel) { %>
        'babel',<% } %><% if(filters.jade) { %>
        'jade',<% } %><% if(filters.stylus) { %>
        'stylus',<% } %><% if(filters.sass) { %>
        'sass',<% } %><% if(filters.less) { %>
        'less',<% } %>
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },<% if(filters.jade) { %>

    // Compiles Jade to html
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.client %>',
          src: [
            '{app,components}/**/*.jade'
          ],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    },<% } %><% if(filters.coffee) { %>

    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      server: {
        files: [{
          expand: true,
          cwd: 'client',
          src: [
            '{app,components}/**/*.coffee',
            '!{app,components}/**/*.spec.coffee'
          ],
          dest: '.tmp',
          ext: '.js'
        }]
      }
    },<% } %><% if(filters.babel) { %>

    // Compiles ES6 to JavaScript using Babel
    babel: {
      options: { 
        sourceMap: true
      },
      server: {
        files: [{
          expand: true,
          cwd: 'client',
          src: [
            '{app,components}/**/*.js',
            '!{app,components}/**/*.spec.js'
          ],
          dest: '.tmp'
        }]
      }
    },<% } %><% if(filters.stylus) { %>

    // Compiles Stylus to CSS
    stylus: {
      server: {
        options: {
          paths: [
            '<%%= yeoman.client %>/bower_components',
            '<%%= yeoman.client %>/app',
            '<%%= yeoman.client %>/components'
          ],
          "include css": true
        },
        files: {
          '.tmp/app/app.css' : '<%%= yeoman.client %>/app/app.styl'
        }
      }
    },<% } %><% if(filters.sass) { %>

    // Compiles Sass to CSS
    sass: {
      server: {
        options: {
          loadPath: [
            '<%%= yeoman.client %>/bower_components',
            '<%%= yeoman.client %>/app',
            '<%%= yeoman.client %>/components'
          ],
          compass: false
        },
        files: {
          '.tmp/app/app.css' : '<%%= yeoman.client %>/app/app.scss'
        }
      }
    },<% } %><% if(filters.less) { %>

    // Compiles Less to CSS
    less: {
      options: {
        paths: [
          '<%%= yeoman.client %>/bower_components',
          '<%%= yeoman.client %>/app',
          '<%%= yeoman.client %>/components'
        ]
      },
      server: {
        files: {
          '.tmp/app/app.css' : '<%%= yeoman.client %>/app/app.less'
        }
      },
    },<% } %>

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%%= yeoman.client %>/index.html': [
               [
                 <% if(filters.babel) { %>
                 '.tmp/{app,components}/**/*.js',
                 <% } else { %>
                 '{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.js',
                 <% } %>
                 '!{.tmp,<%%= yeoman.client %>}/app/app.js',               
                 '!{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.spec.js',
                 '!{.tmp,<%%= yeoman.client %>}/{app,components}/**/*.mock.js'               
               ]
            ]
        }
      },<% if(filters.stylus) { %>

      // Inject component styl into app.styl
      stylus: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%%= yeoman.client %>/app/app.styl': [
            '<%%= yeoman.client %>/{app,components}/**/*.styl',
            '!<%%= yeoman.client %>/app/app.styl'
          ]
        }
      },<% } %><% if(filters.sass) { %>

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%%= yeoman.client %>/app/app.scss': [
            '<%%= yeoman.client %>/{app,components}/**/*.{scss,sass}',
            '!<%%= yeoman.client %>/app/app.{scss,sass}'
          ]
        }
      },<% } %><% if(filters.less) { %>

      // Inject component less into app.less
      less: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%%= yeoman.client %>/app/app.less': [
            '<%%= yeoman.client %>/{app,components}/**/*.less',
            '!<%%= yeoman.client %>/app/app.less'
          ]
        }
      },<% } %>

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%%= yeoman.client %>/index.html': [
            '<%%= yeoman.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },
    arduino: {
      options: {
        sketch: 'dist/server/server.ino',
        idePath: '<%= idePath %>'
      },
      settings: {
        options: {
          savePrefs: true,
          port: '<%= serialPort %>',
          board: {
            package: '<%= package %>',
            arch: '<%= arch %>',
            board: '<%= board %>'
          }
        }
      },
      verify: {
        options: {
          action: 'verify'
        }
      },
      upload: {
        options: {<% if(board === 'teensy3') { %>
          preserveTempFiles: true,<% } %>
          action: 'upload'
        }
      }
    },
    awot: {
      options: {
        sketch: 'dist/server/server.ino'
      },
      files: {
        expand: true,
        src: '**/*.*',
        cwd: 'dist/public'
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
        livereload: {
          options: {
          open: true,
          middleware: function (connect) {
            return [
            connect.static('.tmp'),
            connect.static('client')
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('test', function(target) {
    return grunt.task.run([
      'clean:server',<% if(filters.stylus) { %>
      'injector:stylus', <% } %><% if(filters.less) { %>
      'injector:less', <% } %><% if(filters.sass) { %>
      'injector:sass', <% } %>
      'concurrent:test',
      'injector',
      'wiredep',
      'autoprefixer',
      'karma'
    ]);
  });


  grunt.registerTask('build', [
    'clean:dist',<% if(filters.stylus) { %>
    'injector:stylus', <% } %><% if(filters.less) { %>
    'injector:less', <% } %><% if(filters.sass) { %>
    'injector:sass', <% } %>
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'usemin',
    'awot'
  ]);

  grunt.registerTask('verify', [
    'arduino:settings',
    'arduino:verify'
  ]);

  grunt.registerTask('upload', [
    'arduino:settings',
    'arduino:upload'
  ]);

  grunt.registerTask('serve', [
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build',
    'upload'
  ]);
};
