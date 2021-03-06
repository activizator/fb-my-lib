module.exports = {
  'env': {
    'node': true,
    'es6': true
  },
  'extends': ['eslint:recommended',],
  'parserOptions': {
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
    },
    'sourceType': 'module'
  },
  'rules': {
    'no-console': 0,
    'disallowMultipleVarDecl': 0,
    'maximumLineLength': 0,
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
