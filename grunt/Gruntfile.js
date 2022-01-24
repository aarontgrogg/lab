// create Gruntfile.js
code Gruntfile.js

// add the following to Gruntfile.js:
// load Grunt
module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// create Tasks
		// Sass: compile .scss files to .css files
		sass: {
			dist: {
				options: {
					sourcemap: 'none'
				},
				// take any file in the 'src/sass' directory (`cwd`),
				// with the extension of '.scss' (`src`),
				// and compile into a same-named file in the 'src/css' directory (`dest`),
				// with the extension '.css' (`ext`)
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: ['**/*.scss'],
					dest: 'src/css',
					ext: '.css'
				}]
			}
		},
		// CSSMin: minify resulting CSS files
		cssmin: {
			target: {
				// take any file in the 'src/css' directory (`cwd`),
				// with the extension of '.css', but NOT .min.css (`src`),
				// and minify into a same-named file in the 'css' directory (`dest`),
				// with the extension '.min.css' (`ext`)
				files: [{
					expand: true,
					cwd: 'src/css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		// UglifyJS: minify JS files
		uglify: {
			build: {
				// take any file in the 'src/js' directory (`cwd`),
				// with the extension of '.js', but NOT .min.js (`src`),
				// and minify to 'script.min.js' in the 'js' directory (`dest`)
				src: ['src/js/*.js', '!*.min.js'],
				dest: 'js/script.min.js'
			}
		},
		// Watch: If something changes, do all that stuff above
		watch: {
			css: {
				files: 'src/**/*.scss',
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: 'src/**/*.js',
				tasks: ['uglify']
			}
		}
	});

	// load Plugins (each identified in `package.json`);
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// register Tasks (only `watch`; this will trigger others)
	grunt.registerTask('default', ['watch']);

} // module.exports