const fs = require('fs');
const path = require('path');
const pathsConfig = require('./path.conifg');
const apiFile = path.join(pathsConfig.apiPath, '_api.ts');
let file = fs.readFileSync(apiFile).toString();

const ApiClient = `
import apiClient from './apiClient';
interface ApiClient {
    post<T = any>(url: string, data?: any, config?: any): Promise<T>
}
`;

file = file.replace(`import axiosInstance from '../common/fetch'`, ApiClient);

file = file.replace(/void\, Response/g, 'Response');

file = file.replace(/axiosInstance/g, `(apiClient as ApiClient)`);

file = file.replace(/(\s+\/\*.+?\*\/\s+sessionid)(:string;)/g, '$1?$2');

fs.writeFileSync(apiFile, file);
