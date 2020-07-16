module.exports = {
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/react',
    'prettier',
    'prettier/@typescript-eslint', //屏蔽eslint
    'plugin:prettier/recommended', //转eslint
    'prettier/babel',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['@typescript-eslint', 'babel', 'react', 'react-hooks', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'sort-imports': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-prototype-builtins': 'off', //禁止使用hasOwnProperty
    'no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': ['warn', {additionalHooks: 'useEventCallback'}], // 检查 effect 的依赖
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js', 'jsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      env: {
        browser: true,
        node: false,
      },
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
