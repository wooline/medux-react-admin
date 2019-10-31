const {baseConf} = require('../package.json');
const {siteName, clientPublicPath, version, mock, server, proxy} = baseConf;

const clientGlobal = {
  version,
  siteName,
  clientPublicPath,
  apiServerPath: {'/ajax/': '/ajax/'},
};
module.exports = {
  proxy,
  server,
  mock,
  clientGlobal,
};
