const config = {
	branch: ['dev-release'],
	plugin: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/git',
			{
				assets: ['./*.js', './*.js.map'],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
			},
			'@semantic-release/github'
		]
	]
};

module.exports = config;