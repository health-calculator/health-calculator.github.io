module.exports = function(grunt){
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat:{
			dist: {
				src:  "./src/*",
				dest: "./dist/health-calculator.js"
			}
		},
		uglify: {
			build: {
				src: './dist/health-calculator.js',
				dest: './dist/health-calculator.min.js'
			}
		}
	});


	// Load the plugin that provides the "uglify task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Default Task(s)
	grunt.registerTask('default', ['concat','uglify']);

};
