module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        riot: {
            options: {
                concat: true
            },
            compile: {
                src: 'src/tags/**/*.tag',
                dest: 'src/js/tags.js'
            },
        },   
        sass_globbing: {
            your_target: {
                files: {
                    'src/sass/_tags.scss': 'src/tags/**/*.scss'
                },
                options: {
                    useSingleQuotes: false
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['src/**/*.js','!src/js/bootstrap.js','!src/js/bootstrap/**/*.js','!src/js/jquery-3.1.0.js'],
                dest: '.tmp/js/<%= pkg.name %>.js'
            },
            dist: {
                src: ['src/**/*.js','!src/js/bootstrap.js','!src/js/bootstrap/**/*.js','!src/js/jquery-3.1.0.js'],
                dest: '.tmp/js/<%= pkg.name %>.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    '.tmp/js/compiled.js': '<%= concat.build.dest %>'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                files: {
                    'dev/js/site.min.js': ['.tmp/js/compiled.js']
                }
            },
            dist: {
                files: {
                    'dist/js/site.min.js': ['.tmp/js/compiled.js']
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            build: {
                files: {
                    '.tmp/css/styles.css': 'src/sass/styles.scss'
                }
            },            
            dist: {
                files: {
                    '.tmp/css/styles.css': 'src/sass/styles.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                //map: {
                //    inline: false, // save all sourcemaps as separate files...
                //    annotation: 'dist/css/maps/' // ...to the specified directory
                //},

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            build: {
                src: '.tmp/css/styles.css',
                dest: 'dev/css/styles.css'
            },
            dist: {
                src: '.tmp/css/styles.css',
                dest: 'dist/css/styles.css'
            }
        },

        htmlmin: { // Task
            build: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dev/index.html': 'src/index.html' // 'destination': 'source'
                }
            },            
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'src/index.html' // 'destination': 'source'
                }
            },
        },
        copy: {
          dist: {
            files:[
              {expand: true, cwd:'src', src: ['fonts/*/**','img/*/**','video/*/**'],dest: 'dist/'},
              {expand: true, cwd:'src', src: ['js/bootstrap.js'],dest: 'dist/'},
              {expand: true, cwd:'src', src: ['js/jquery-3.1.0.js'],dest: 'dist/'},
            ]
          },
          build: {
            files:[
              {expand: true, cwd:'src', src: ['fonts/*/**','img/*/**','video/*/**'],dest: 'dev/'},
              {expand: true, cwd:'src', src: ['js/bootstrap.js'],dest: 'dev/'},
              {expand: true, cwd:'src', src: ['js/jquery-3.1.0.js'],dest: 'dev/'},
            ]
          }
        },
        watch: {
            options: {
                livereload: true
            },
            scss: {
                files: 'src/**/*.scss',
                tasks: ['sass:build', 'postcss']
            },
            js: {
                files: 'src/**/*.js',
                tasks: ['concat:build','babel', 'uglify:build']
            },
            riottags: {
                files: ['src/tags/**/*.tag'],
                tasks: ['riot', 'uglify'],
                options: {}
            },            
            html: {
                files: ['src/index.html', 'src/**/*.html'],
                tasks: ['htmlmin']
            },


        },
        connect: {
            server: {
                options: {
                    port: 3232,
                    hostname: '*',
                    base: 'dev/',
                    livereload: true,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-riot');
    grunt.loadNpmTasks('grunt-sass-globbing');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');
    

    grunt.registerTask('dev', ['sass_globbing','riot','copy:build','concat:build','babel', 'sass:build', 'postcss:build', 'uglify:build', 'htmlmin:build', 'connect', 'watch']);
    grunt.registerTask('dist', ['copy:dist', 'sass:dist', 'postcss:dist', 'concat:dist', 'uglify:dist', 'htmlmin:dist']);

};
