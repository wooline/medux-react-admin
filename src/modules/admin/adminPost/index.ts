import {ModelHandlers, initModelState} from './model';

import {exportModule} from '@medux/react-web-router';
import list from './views/List';

export default exportModule('adminPost', initModelState, ModelHandlers, {list});
