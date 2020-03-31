import {ModelHandlers, initModelState} from './model';

import LoginPage from './views/LoginPage';
import Main from './views/Main';
import RegisterPage from './views/RegisterPage';
import {exportModule} from '@medux/react-web-router';

export default exportModule('app', initModelState, ModelHandlers, {Main, LoginPage, RegisterPage});
