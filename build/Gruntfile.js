module.exports = function(grunt) {

	grunt.initConfig({

		compass: {
			dist: {
				options: {
					sassDir: '<%= grunt.option("src") %>/src/css',
					cssDir: '<%= grunt.option("dest") %>/dist/css',
					outputStyle: 'compressed',
					noLineComments: true
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			'<%= grunt.option("dest") %>/dist/js/facts.js': ['<%= grunt.option("src") %>/src/js/*.js'],
		},

		uglify: {
			dist: {
				options: {
					banner: '/*! facts-js <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'<%= grunt.option("dest") %>/dist/js/facts.min.js': '<%= grunt.option("src") %>/dist/js/facts.js'
				}
			}
		},

		jshint: {
			files: ['<%= grunt.option("src") %>/src/js/**'],
			options: {
				globals: {
					console: true,
					module: true,
					document: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'compass']);
};
