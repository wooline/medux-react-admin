import {ModelHandlers, initModelState} from './model';

import Main from './views/Main';
import {exportModule} from '@medux/react-web-router';

export default exportModule('adminHome', initModelState, ModelHandlers, {Main});
