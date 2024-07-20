// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
	singleQuote: true,
	semi: true,
	printWidth: 80,
	tabWidth: 2,
	trailingComma: 'all',
	arrowParens: 'avoid',
	jsxSingleQuote: true,
	endOfLine: 'auto',
	plugins: ['prettier-plugin-css-order', 'prettier-plugin-organize-imports'],
};
