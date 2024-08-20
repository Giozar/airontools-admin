process.env.ESLINT_TSCONFIG = 'tsconfig.json';

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	globals: {
		NodeJS: true,
		NodeListOf: true,
	},
	env: {
		es2022: true,
		node: true,
		browser: true,
	},

	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'standard',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended',
		'eslint-config-prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc.mjs', 'node_modules'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},

	plugins: [
		'react-refresh',
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier',
		'no-relative-import-paths',
	],

	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react-hooks/rules-of-hooks': 'error',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/triple-slash-reference': 'warn',
		'no-relative-import-paths/no-relative-import-paths': [
			'warn',
			{ allowSameFolder: true, rootDir: 'src', prefix: '@', noSlashAfter: true },
		],
	},
};
