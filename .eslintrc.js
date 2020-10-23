module.exports = {
  root: true,
  extends: ['plugin:@medux/recommended/common'],
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  rules: {
    'global-require': 'off',
  },
  ignorePatterns: ['/src','/dist','/mock'],
};
