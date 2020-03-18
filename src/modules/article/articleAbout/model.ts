import {BaseModelHandlers, BaseModelState} from '@medux/react-web-router';

export interface State extends BaseModelState {}

export const initModelState: State = {};

export class ModelHandlers extends BaseModelHandlers<State, RootState> {}
