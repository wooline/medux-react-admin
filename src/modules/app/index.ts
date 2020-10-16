import {exportModule} from '@medux/react-web-router';
import {ModelHandlers, initModelState} from './model';

import loginPage from './views/LoginPage';
import main from './views/Main';
import registerPage from './views/RegisterPage';

export default exportModule('app', initModelState, ModelHandlers, {main, loginPage, registerPage});
