import {exportModule} from '@medux/react-web-router';
import {ModelHandlers, initModelState} from './model';

import list from './views/List';

export default exportModule('adminPost', initModelState, ModelHandlers, {list});
