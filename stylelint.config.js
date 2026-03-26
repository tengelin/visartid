/** @type {import('stylelint').Config} */
export default {
  extends: [ 'stylelint-config-standard', '@stylistic/stylelint-config' ],

  rules: {
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'media-feature-range-notation': null,
    'declaration-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'comment-empty-line-before': null,
    'no-descending-specificity': null,
    'declaration-block-single-line-max-declarations': null,
    '@stylistic/max-line-length': null,
    '@stylistic/string-quotes': 'single',
    '@stylistic/indentation': 2,
    'block-no-empty': true,
    'color-hex-length': 'short',
    'unit-no-unknown': true,
    'declaration-property-value-no-unknown': true,
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*(-[a-z0-9]+)*$',
      { message: 'Expected class selector to be kebab-case or camelCase' },
    ],
    'selector-id-pattern': null,
  },
};
