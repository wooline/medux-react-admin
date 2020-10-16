const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const jsonFormat = require('json-format');
const pathsConfig = require('./path.conifg');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

fs.emptyDirSync(pathsConfig.distPath);
fs.copySync(pathsConfig.publicPath, pathsConfig.distPath, {dereference: true});
fs.copySync(pathsConfig.envPublicPath, pathsConfig.distPath, {dereference: true});
fs.copySync(pathsConfig.mockPath, path.join(pathsConfig.distPath, './mock'), {dereference: true});

const env = require(path.join(pathsConfig.envPath, './env'));
const envFile = path.join(pathsConfig.distPath, './env.json');
fs.writeFileSync(envFile, jsonFormat(env, {type: 'space'}), 'utf8');

compiler.run((error, stats) => {
  if (error) {
    console.error(error.stack || error);
    if (error.details) {
      console.error(error.details);
    }
    process.exit(1);
  } else {
    console.info(
      stats.toString({
        entrypoints: false,
        colors: true,
        modules: false,
        excludeAssets: /\.(?!js|html)\w+$/,
        // warningsFilter: '[mini-css-extract-plugin]\nConflicting order between',
      })
    );
    if (stats.hasWarnings()) {
      const statsJSON = stats.toJson();
      // Ignore "Conflicting order between" warning, produced by "mini-css-extract-plugin"
      // const warnings = statsJSON.warnings.filter((_) => _.indexOf('[mini-css-extract-plugin]\nConflicting order between') < 0);
      if (statsJSON.warnings.length > 0) {
        process.exit(1);
      }
    }
  }
});
