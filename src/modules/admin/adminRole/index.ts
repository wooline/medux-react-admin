import {ModelHandlers, initModelState} from './model';

import List from './views/List';
//import Selector from './views/Selector';
import {exportModule} from '@medux/react-web-router';

export default exportModule('adminRole', initModelState, ModelHandlers, {List});
