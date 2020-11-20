module.exports = {
	envs: ['browser'],
	rules: {
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'prefer-spread': 'off',
		'unicorn/no-for-loop': 'off',
	},
	overrides: [
		{
			files: 'test/*',
			env: 'jest',
		},
	],
};
