import {exportModule} from '@medux/react-web-router';
import {ModelHandlers, initModelState} from './model';

import list from './views/List';
import selector from './views/Selector';

export default exportModule('adminRole', initModelState, ModelHandlers, {list, selector});
