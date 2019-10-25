const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const proxyMiddleware = require('http-proxy-middleware');
const devMock = require('@medux/dev-utils/dist/express-middleware/dev-mock');
const prodServer = require('@medux/dev-utils/dist/express-middleware/prod-server');
const htmlTpl = fs.readFileSync('./index.html', 'utf8');
const {proxy, server, mock} = require('./env.json');
const app = express();
const [, , port] = server.split(/:\/*/);

app.use('/client', express.static('./client', {fallthrough: false}));
app.use(devMock(mock, proxy, true));
app.use('/api', proxyMiddleware(proxy['/api/**']));
app.use(prodServer(htmlTpl));
app.listen(port, () => console.info(chalk`.....${new Date().toLocaleString()} starting {red SSR Server} on {green ${server}/} \n`));
