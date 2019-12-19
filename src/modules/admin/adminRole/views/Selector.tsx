import {ListItem} from 'entity/role';
import React from 'react';
import ResourceSimpleSelector from 'components/ResourceSimpleSelector';
import api from '../api';

export interface Item {
  id: string;
  name: string;
}
interface OwnProps {
  placeholder?: string;
  limit?: number | [number, number];
  value?: string | Item | (Item | string)[];
  onChange?: (items?: Item | Item[]) => void;
}

class Component extends React.PureComponent<OwnProps> {
  fetch(term: string, pageSize: number, pageCurrent: number) {
    return api.searchList({term, pageSize, pageCurrent});
  }

  public render() {
    const {onChange, limit, value, placeholder} = this.props;
    return <ResourceSimpleSelector<ListItem> optionRender="roleName" onChange={onChange} placeholder={placeholder} value={value} limit={limit} fetch={this.fetch} />;
  }
}

export default Component;
