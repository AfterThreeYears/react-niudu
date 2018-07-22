module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true
    },
    parser: 'babel-eslint',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 8,
      sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
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
      ],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'always'],
      "comma-dangle": ['error', 'always-multiline'],
      'no-console': ['warn'],
      // react组件内是否要引入React变量
      'react/react-in-jsx-scope': 'off',
      'react/sort-comp': 'error',
      'react/require-default-props': 'error',
      'react/no-unused-state': 'error',
      'react/no-unused-prop-types': 'error',
      'react/prop-types': 'off',
      'no-case-declarations': 'off',
    }
  };