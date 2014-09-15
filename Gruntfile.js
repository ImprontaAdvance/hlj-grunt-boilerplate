module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            sourceDir: 'src',
            distDir: 'dist',
        },


        //         ******   ********  ********
        //        **////** **//////  **////// 
        //       **    // /**       /**       
        //      /**       /*********/*********
        //      /**       ////////**////////**
        //      //**    **       /**       /**
        //       //******  ********  ******** 
        //        //////  ////////  ////////  

        less: {
            options: {
                paths: ["<%= config.distDir %>/css"],
                modifyVars: {
                    'bower_components': '"../../bower_components"'
                }
            },
            dev: {
                files: {
                    "<%= config.distDir %>/css/main.css": "<%= config.sourceDir %>/css/main.less"
                }
            },
            prod: {
                options: {
                    cleancss: true
                },
                files: {
                    "<%= config.distDir %>/css/main.css": "<%= config.sourceDir %>/css/main.less"
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 9',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },

            main: {
                src: '<%= config.distDir %>/css/main.css',
                dest: '<%= config.distDir %>/css/main.css'
            }
        },

        //            **  ********
        //           /** **////// 
        //           /**/**       
        //           /**/*********
        //           /**////////**
        //       **  /**       /**
        //      //*****  ******** 
        //       /////  ////////  

        concat: {
            vendor: {
                src: [
                    'bower_components/path/to/file.js',
                ],
                dest: '<%= config.distDir %>/js/vendor.js'
            },

            app: {

                src: [
                    '<%= config.sourceDir %>/js/main.js',
                ],
                dest: '<%= config.distDir %>/js/main.js'
            },
        },

        jshint: {
            beforeconcat: ['Gruntfile.js', '<%= config.sourceDir %>/js/*.js']
        },

        uglify: {
            prod: {
                files: {
                    '<%= config.distDir %>/js/vendor.min.js': '<%= config.sourceDir %>/js/vendor.js',
                    '<%= config.distDir %>/js/app.min.js': '<%= config.sourceDir %>/js/app.js',
                }
            }
        },


        //       **      ** ********** ****     **** **      
        //      /**     /**/////**/// /**/**   **/**/**      
        //      /**     /**    /**    /**//** ** /**/**      
        //      /**********    /**    /** //***  /**/**      
        //      /**//////**    /**    /**  //*   /**/**      
        //      /**     /**    /**    /**   /    /**/**      
        //      /**     /**    /**    /**        /**/********
        //      //      //     //     //         // //////// 

        'compile-handlebars': {
            site: {
                template: '<%= config.sourceDir %>/index.hbs',
                partials: '<%= config.sourceDir %>/partials/*.hbs',
                templateData: '<%= config.sourceDir %>/data.json',
                output: '<%= config.distDir %>/index.html'
            }
        },

        //      ** ****     ****     **       ********  ********  ********
        //      /**/**/**   **/**    ****     **//////**/**/////  **////// 
        //      /**/**//** ** /**   **//**   **      // /**      /**       
        //      /**/** //***  /**  **  //** /**         /******* /*********
        //      /**/**  //*   /** **********/**    *****/**////  ////////**
        //      /**/**   /    /**/**//////**//**  ////**/**             /**
        //      /**/**        /**/**     /** //******** /******** ******** 
        //      // //         // //      //   ////////  //////// ////////  

        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.distDir %>/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.distDir %>/images/'
                }]
            }
        },

        dataUri: {
            dist: {
                src: ['<%= config.distDir %>/css/*.css'],
                dest: '<%= config.distDir %>/css',
                options: {
                    target: ['<%= config.distDir %>/images/*'],
                    fixDirLevel: true,
                    maxBytes: 2048

                }
            }
        },


        //       ****     **** **  ********   ****** 
        //      /**/**   **/**/** **//////   **////**
        //      /**//** ** /**/**/**        **    // 
        //      /** //***  /**/**/*********/**       
        //      /**  //*   /**/**////////**/**       
        //      /**   /    /**/**       /**//**    **
        //      /**        /**/** ********  //****** 
        //      //         // // ////////    //////  

        clean: ['<%= config.distDir %>/**'],

        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: '*',
                    base: '<%= config.distDir %>'
                }
            }
        },

        copy: {
            "static-files": {
                files: [{
                        expand: true,
                        cwd: '<%= config.sourceDir %>',
                        src: ['fonts/**', 'images/**'],
                        dest: '<%= config.distDir %>/'
                    },

                    // Simple copy example
                    // Font-Awesome
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/fonts/',
                        src: '*',
                        dest: '<%= config.distDir %>/fonts'
                    }
                ]
            }
        },

        'ftp-deploy': {
            dev: {
                auth: {
                    host: 'dev-host',
                    port: 21,
                    authKey: 'key1'
                },
                src: '<%= config.distDir %>/',
                dest: '/remote/server/path'
            },
            prod: {
                auth: {
                    host: 'prod-host',
                    port: 21,
                    authKey: 'key2'
                },
                src: '<%= config.distDir %>/',
                dest: '/remote/server/path'
            }
        },

        watch: {
            grunt: {
                files: 'Gruntfile.js',
                tasks: 'build:dev'
            },

            hbs: {
                files: ['<%= config.sourceDir %>/**/*.hbs', '<%= config.sourceDir %>/data.json'],
                tasks: ['compile-handlebars']
            },

            images: {
                files: '<%= config.sourceDir %>/images/*',
                tasks: 'copy'
            },

            css: {
                files: '<%= config.sourceDir %>/css/*',
                tasks: 'less'
            },

            js: {
                files: '<%= config.sourceDir %>/js/*.js',
                tasks: ['jshint', 'concat']
            },

            options: {
                livereload: true,
            }
        }

    });


    // CSS
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Dev
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // HTML
    grunt.loadNpmTasks('grunt-compile-handlebars');

    // Prod
    grunt.loadNpmTasks('grunt-data-uri');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Misc
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-clean');



    grunt.registerTask('_build', ['clean', 'copy', 'concat', 'compile-handlebars', 'jshint']);

    grunt.registerTask('build:dev', ['_build', 'less:dev']);
    grunt.registerTask('build:prod', ['_build', 'less:prod', 'autoprefixer', 'imagemin']);

    grunt.registerTask('server', ['connect', 'watch']);

    grunt.registerTask('deploy:dev', ['build:prod', 'ftp-deploy:dev']);
    grunt.registerTask('deploy:prod', ['build:prod', 'ftp-deploy:prod']);

    grunt.registerTask('default', ['build:dev', 'server']);

};