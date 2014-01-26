'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '*.html',
                    'example/*.html',
                    '{.tmp,./}/styles/{,*/}*.css',
                    '{.tmp,./}/js/{,*/}*.js',
                    'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 8080,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, 'build')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/example'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*',
                        '!dist/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/{,*/}*.js'
            ]
        },
        uglify: {
            pkg: grunt.file.readJSON('package.json'),
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> ' + '\n<%= pkg.description %>\n' + '<%= pkg.author.email %> */\n'
            },
            my_target: {
                files: {
                    'dist/shareme.min.js': ['src/ShareMe.js']
                }
            }
        }
    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'uglify',
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};
