import {ModelHandlers, initModelState} from './model';

import {exportModule} from '@medux/react-web-router';
import list from './views/List';
import selector from './views/Selector';

export default exportModule('adminMember', initModelState, ModelHandlers, {list, selector});
