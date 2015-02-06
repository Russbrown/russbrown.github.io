---
layout: post
title:  "Quickly setting grunt up to compile sass and js"
date:   2015-02-06 09:00:00
categories: grunt
---

###Standard Grunt file:

		module.exports = function(grunt) {

		    // 1. All configuration goes here 
		    grunt.initConfig({
		        pkg: grunt.file.readJSON('package.json'),

		        concat: {   
		            dist: {
		                src: [
		                    'js/*.js', // All JS in the libs folder
		                ],
		                dest: 'js/build/production.js',
		            }
		        },

		        uglify: {
		            build: {
		                src: 'js/build/production.js',
		                dest: 'js/build/production.min.js'
		            }
		        },

		        imagemin: {
		            dynamic: {
		                files: [{
		                    expand: true,
		                    cwd: 'images/',
		                    src: ['**/*.{png,jpg,gif}'],
		                    dest: 'images/build/'
		                }]
		            }
		        },

		        watch: {
		            scripts: {
		                files: ['js/*.js'],
		                tasks: ['concat', 'uglify'],
		                options: {
		                    spawn: false,
		                },
		            },
		            css: {
		                files: ['css/**/*.scss'],
		                tasks: ['sass'],
		                options: {
		                    spawn: false,
		                }
		            }
		        },

		        sass: {
		            dist: {
		                options: {
		                    style: 'compressed'
		                },
		                files: {
		                    '_site/css/main.css': 'css/main.scss'
		                }
		            } 
		        }

		    });

		    // 3. Where we tell Grunt we plan to use this plug-in.
		    grunt.loadNpmTasks('grunt-contrib-concat');
		    grunt.loadNpmTasks('grunt-contrib-uglify');
		    grunt.loadNpmTasks('grunt-contrib-imagemin');
		    grunt.loadNpmTasks('grunt-contrib-watch');
		    grunt.loadNpmTasks('grunt-contrib-sass');

		    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
		    grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);

		};

###Standard Package.json file:

		{
		  "name": "example-project",
		  "version": "0.1.0",
		  "devDependencies": {
		    "grunt": "~0.4.1",
		    "grunt-contrib-concat": "^0.5.0",
		    "grunt-contrib-imagemin": "^0.9.2",
		    "grunt-contrib-sass": "^0.9.1",
		    "grunt-contrib-uglify": "^0.7.0",
		    "grunt-contrib-watch": "^0.6.1"
		  }
		}

### Run cmds from project folder:

		sudo npm install grunt-contrib-watch --save-dev

		sudo npm install grunt-contrib-sass --save-dev

		sudo npm install grunt-contrib-imagemin --save-dev

		sudo npm install grunt-contrib-uglify --save-dev

		sudo npm install grunt-contrib-concat --save-dev

### Then run:

		grunt watch




