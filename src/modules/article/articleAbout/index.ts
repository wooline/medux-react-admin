import {ModelHandlers, initModelState} from './model';

import {exportModule} from '@medux/react-web-router';
import main from './views/Main';

export default exportModule('articleAbout', initModelState, ModelHandlers, {main});
