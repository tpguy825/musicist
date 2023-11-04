/** @type {import("eslint").Linter.Config} */
module.exports = {
	parser: "@typescript-eslint/parser",
	ignorePatterns: ["**/node_modules/", "**/dist/", ".eslintrc.cjs"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./packages/website/tsconfig.json", "./packages/backend/tsconfig.json", "./tsconfig.node.json"],
	},
	plugins: ["@typescript-eslint", "isaacscript", "import"],
	extends: [
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		// These opinionated rules are enabled in stylistic-type-checked above.
		// Feel free to reconfigure them to your own preference.
		"@typescript-eslint/array-type": "off",
		"@typescript-eslint/consistent-type-definitions": "off",

		"@typescript-eslint/no-misused-promises": [
			2,
			{
				checksVoidReturn: { attributes: false },
			},
		],
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
		],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ prefer: "type-imports", fixStyle: "inline-type-imports" },
		],
		"prettier/prettier": ["error", { endOfLine: "auto" }],
		"import/consistent-type-specifier-style": ["error", "prefer-inline"],
		"isaacscript/complete-sentences-jsdoc": "off",
		"isaacscript/format-jsdoc-comments": "off",
		"@typescript-eslint/no-confusing-void-expression": "off",
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/prefer-nullish-coalescing": "off",
		"import/no-anonymous-default-export": "off",
	},
};
