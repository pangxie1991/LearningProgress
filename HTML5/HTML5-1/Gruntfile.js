module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        modernizr : {
            dist: {
                "dest" : "javascript/modernizr.js",
                "parseFiles": true,
                "customTests": [],
                "devFile": "javascript/modernizr-dev.js",
                "outputFile": "javascript/modernizr-output.js",
                "tests": [
                    // Tests
                ],
                "extensibility": [
                    "setClasses"
                ],
                "uglify": true
            }
        },
        cssmin : {
            combine: {
                files: {
                    'css/release/compress.css': ['css/*.css'] // 指定合并的CSS文件 ['css/base.css', 'css/global.css']
                }
            },
            minify: {
                options: {
                    keepSpecialComments: 0, /* 删除所有注释 */
                    banner: '/* minified css file */'
                },
                files: {
                    'css/release/master.min.css': ['css/master.css']
                }
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-modernizr");


    // Default task(s).
    grunt.registerTask('default', ['modernizr']);

};