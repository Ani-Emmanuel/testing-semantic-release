const config = {
	branches: ['testing_ci'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/npm',
			{
				npmPublish: false
			}
		],
		[
			'@semantic-release/git',
			{
				assets: ['./**/*.js', './**/*.js.map']
			}
		],
		'@semantic-release/github'
	]
};

module.exports = config;
