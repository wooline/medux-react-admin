module.exports = {
  extends: ['../.eslintrc-src.js'],
  parserOptions: {
    // @ts-ignore
    project: `${__dirname}/tsconfig.json`,
  },
  ignorePatterns: [],
};
