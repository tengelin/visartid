import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      curly: [ 'error', 'multi-line' ],
      'dot-notation': [ 'error', { allowKeywords: true } ],
      eqeqeq: 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-shadow': 'error',
      'no-unused-expressions': 'error',
      'no-var': 'error',
      'prefer-const': [ 'error', { destructuring: 'all' } ],
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-use-before-define': [ 'error', {
        functions: false,
        classes: false,
        variables: true,
        allowNamedExports: false,
      } ],

      '@stylistic/semi': [ 'error', 'always' ],
      '@stylistic/quote-props': [ 'error', 'as-needed' ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/arrow-parens': [ 'error', 'always' ],
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/brace-style': [ 'error', '1tbs', { allowSingleLine: false } ],
      '@stylistic/object-curly-newline': [ 'error', { multiline: true } ],
      '@stylistic/object-property-newline': [ 'error', { allowAllPropertiesOnSameLine: true } ],
    },
  },
  {
    files: [ 'scripts/start.js' ],
    languageOptions: {
      globals: { ...globals.browser },
      sourceType: 'script',
    },
  },
  {
    files: [ 'scripts/serve.js' ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: [ 'tests/**/*.js' ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    ignores: [ 'dist/**', 'node_modules/**', 'eslint.config.js' ],
  },
];
