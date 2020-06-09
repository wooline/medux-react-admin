const {baseConf} = require('../package.json');
const {siteName, clientPublicPath, version, mock, server, proxy} = baseConf;

const clientGlobal = {
  version,
  siteName,
  staticPath: clientPublicPath + 'client/',
  apiServerPath: {'/api/': '/api/'},
};
module.exports = {
  proxy,
  server,
  mock,
  clientGlobal,
  clientPublicPath,
};
