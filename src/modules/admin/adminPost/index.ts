import {ModelHandlers, initModelState} from './model';

import List from './views/List';
import {exportModule} from '@medux/react-web-router';

export default exportModule('adminPost', initModelState, ModelHandlers, {List});
