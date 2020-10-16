module.exports = {
  extends: ['plugin:@medux/recommended/react'],
  rules: {
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      env: {
        es6: true,
        browser: true,
        node: false,
      },
      rules: {},
    },
  ],
};
