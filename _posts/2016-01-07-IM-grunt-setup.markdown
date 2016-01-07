---
layout: post
title:  "IM Grunting"
date:   2016-01-07 09:00:00
categories: grunt
---

###Install Node

https://nodejs.org/en/download/



###Create Grunt file (gruntfile.js):

File paths may need adapting depending on project.

    module.exports = function(grunt) {

        // 1. All configuration goes here 
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            uglify: {
                all: {
                    files: {
                        'js/all.min.js': 'js/*.js'
                    }
                }
            },

            watch: {
                css: {
                    files: ['scss/**/*.scss'],
                    tasks: ['scss', 'autoprefixer'],
                    options: {
                      livereload: true,
                    },
                },
                javascript: {
                    files: 'js/*.js',
                    tasks: ['uglify'],
                    options: {
                      livereload: true,
                    },
                }
            },

            autoprefixer: {
                options: {
                  browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                dist: {
                    files: {
                        'css/styles_prefixed.css': 'css/styles.css',
                    }
                }
            },

            compass: {                  // Task
                dist: {                   // Target
                  options: {              // Target options
                    sassDir: 'scss',
                    cssDir: 'css',
                    environment: 'production'
                  }
                },
                dev: {                    // Another target
                  options: {
                    sassDir: 'scss',
                    cssDir: 'css'
                  }
                }
            },

            sass: {
                dist: {
                    options: {
                        style: 'compressed'
                    },
                    files: {
                        'css/styles.css': 'scss/styles.scss',
                    }
                }
            },

            browserSync: {
                dev: {
                    bsFiles: {
                        src : [
                            'css/*.css',
                            '*.html'
                        ]
                    },
                    options: {
                        watchTask: true,
                        server: {
                            baseDir: "./"
                        }
                    }
                }
            },

            criticalcss: {
                custom: {
                    options: {
                        url: "http://localhost:8888/jigsaw-build",
                        width: 1200,
                        height: 900,
                        outputfile: "css/critical.css",
                        filename: "css/styles.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                        buffer: 800*1024,
                        ignoreConsole: false
                    }
                }
            },

            imagemin: {                          // Task
                dynamic: {
                  options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }]
                  },                       // Another target
                  files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'images/compressed/'                  // Destination path prefix
                  }]
                }
            }

        });

        // 3. Where we tell Grunt we plan to use this plug-in.
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-criticalcss');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-browser-sync');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-contrib-compass');

        // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
        grunt.registerTask('default', ['browserSync', 'compass', 'watch']);

        grunt.registerTask('crit', ['criticalcss']);

        grunt.registerTask('imagemin', ['imagemin']);

    };

###Create Package.json file:

	{
	  "name": "example-project",
	  "version": "0.1.0",
	  "devDependencies": {
	    "grunt": "~0.4.1",
	    "grunt-autoprefixer": "^3.0.3",
	    "grunt-browser-sync": "^2.2.0",
	    "grunt-contrib-compass": "^1.0.4",
	    "grunt-contrib-concat": "^0.5.1",
	    "grunt-contrib-imagemin": "^0.9.4",
	    "grunt-contrib-sass": "^0.9.2",
	    "grunt-contrib-uglify": "^0.9.2",
	    "grunt-contrib-watch": "^0.6.1",
	    "grunt-critical-css": "^0.1.3",
	    "grunt-criticalcss": "^0.6.1"
	  }
	}

### Run cmd from project folder in terminal:

		npm install

### Then run:

		grunt




