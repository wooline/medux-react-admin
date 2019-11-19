const devMock = require('@medux/dev-utils/dist/express-middleware/dev-mock');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pathsConfig = require('./path.conifg');
const {proxy, mock} = require(path.join(pathsConfig.envPath, './env'));

const config = {
  contentBase: [pathsConfig.envPublicPath, pathsConfig.publicPath],
  watchContentBase: true,
  publicPath: '/',
  compress: true,
  historyApiFallback: true,
  hot: true,
  overlay: {
    warnings: true,
    errors: true,
  },
  stats: {
    colors: true,
  },
  // clientLogLevel: 'none',
  quiet: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  proxy,
  before: app => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(devMock(mock, proxy, true));
  },
};
module.exports = config;
