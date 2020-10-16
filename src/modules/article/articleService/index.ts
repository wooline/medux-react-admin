import {exportModule} from '@medux/react-web-router';
import {ModelHandlers, initModelState} from './model';

import main from './views/Main';

export default exportModule('articleService', initModelState, ModelHandlers, {main});
