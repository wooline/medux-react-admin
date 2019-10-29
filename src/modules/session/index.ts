import {ModelHandlers, initModelState} from './model';

import Judge from './views/Judge';
import LoginPage from './views/LoginPage';
import LoginPop from './views/LoginPop';
import Main from './views/Main';
import RegisterPage from './views/RegisterPage';
import {exportModule} from '@medux/react-web-router';

export default exportModule('session', initModelState, ModelHandlers, {LoginPage, LoginPop, RegisterPage, Judge, Main});
