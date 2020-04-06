const prodModel = process.env.NODE_ENV == 'production';
const env = process.env.SITE || (prodModel ? 'prod' : 'dev');
const path = require('path');
const rootPath = path.join(__dirname, '../');
const srcPath = path.join(rootPath, './src');
const publicPath = path.join(rootPath, './public');
const configPath = path.join(rootPath, './conf');
const mockPath = path.join(rootPath, './mock');
const distPath = path.join(rootPath, './dist', env);
const envPath = path.join(configPath, env);
const envPublicPath = path.join(envPath, './public');
const apiPath = path.join(srcPath, './api');
const moduleSearch = [srcPath];

const moduleAlias = {
  conf: envPath,
};
module.exports = {env, prodModel, rootPath, srcPath, apiPath, configPath, publicPath, distPath, mockPath, moduleAlias, moduleSearch, envPath, envPublicPath};
