module.exports = function(grunt){
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: './dist/health-calculator.js',
				dest: './dist/health-calculator.min.js'
			}
		}		
	});


	// Load the plugin that provides the "uglify task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default Task(s)
	grunt.registerTask('default', ['uglify']);

};
