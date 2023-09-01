module.exports = {
  extends: ['stylelint-config-recommended'],

  plugins: ['stylelint-scss', 'stylelint-order'],

  rules: {
    'at-rule-no-unknown': null,
    'no-irregular-whitespace': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['Fallback'] }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep'] }
    ]
  },

  ignoreFiles: ['dist/**/*.css'],

  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ]
};
