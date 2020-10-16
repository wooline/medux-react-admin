const runtimeVersion = require('@babel/runtime/package.json').version;
const pathsConfig = require('./build/path.conifg');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ].filter(Boolean),
  plugins: [
    [
      'module-resolver',
      {
        root: pathsConfig.moduleSearch,
        alias: pathsConfig.alias,
      },
    ],
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', {legacy: false, decoratorsBeforeExport: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true,
        version: runtimeVersion,
      },
    ],
  ].filter(Boolean),
  ignore: ['**/*.d.ts'],
};
