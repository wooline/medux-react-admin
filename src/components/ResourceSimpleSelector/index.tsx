import {Select, Spin} from 'antd';

import {BaseListSummary} from 'entity/common';
import React from 'react';
import debounce from 'lodash/debounce';
import styles from './index.m.less';

const {Option, OptGroup} = Select;

interface Item {
  id: string;
  name: string;
}
// type Value = Item | string;

export interface Props<Resource> {
  limit?: number | [number, number];
  tagMode?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  pageSize?: number;
  value?: string | Item | (Item | string)[];
  optionToValue?: (option: {key: string; label: React.ReactNode}) => Item;
  onChange?: (value?: Item | Item[]) => void;
  optionRender?: string | ((item: Resource) => React.ReactNode);
  fetch: (str: string, pageSize: number, pageCurrent: number) => Promise<{list: Resource[]; listSummary: BaseListSummary}>;
}

interface State<Resource> {
  items?: {term: string; list: Resource[]; listSummary: BaseListSummary};
  fetching: boolean;
}

class Component<Resource extends {id: string} = Item> extends React.PureComponent<Props<Resource>, State<Resource>> {
  private lastFetchId = 0;

  constructor(props: any, context?: any) {
    super(props, context);
    this.fetch = debounce(this.fetch, 1000);
    this.popupScroll = debounce(this.popupScroll, 300);
  }
  state: State<Resource> = {
    fetching: false,
  };
  defOptionToValue: (option: {key: string; label: React.ReactNode}) => Item = option => {
    return {id: option.key, name: option.label?.toString() || option.key};
  };
  fetch = (term: string, pageCurrent: number = 1) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    const pageSize = this.props.pageSize || 10;
    this.props
      .fetch(term, pageSize, pageCurrent)
      .catch(() => {
        return null;
      })
      .then(result => {
        if (fetchId !== this.lastFetchId) {
          return;
        }
        let items: {term: string; list: Resource[]; listSummary: BaseListSummary};
        if (result) {
          if (pageCurrent > 1 && this.state.items) {
            items = {...result, list: [...this.state.items.list, ...result.list], term};
          } else {
            items = {...result, term};
          }
          this.setState({items, fetching: false});
        } else {
          this.setState({fetching: false});
        }
      });
  };
  onSearch = (str: string = '') => {
    console.log('search', str);
    if (!this.state.fetching || this.state.items) {
      this.setState({items: undefined, fetching: true});
    }
    this.fetch(str);
  };
  onChange = (value?: {key: string; label: any} | {key: string; label: any}[]) => {
    const optionToValue = this.props.optionToValue || this.defOptionToValue;
    let selected: Item | Item[] | undefined;
    if (value) {
      if (Array.isArray(value)) {
        selected = value.map(item => optionToValue(item));
      } else {
        selected = optionToValue(value);
      }
    }
    //this.setState({items: undefined, fetching: false});
    this.props.onChange && this.props.onChange(selected);
  };
  onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const {target} = e;
    this.popupScroll(target as HTMLDivElement);
  };
  popupScroll = (target: HTMLDivElement) => {
    const {items, fetching} = this.state;
    if (items && !fetching && target.scrollTop + target.offsetHeight === target.scrollHeight) {
      const {
        term,
        listSummary: {pageCurrent, totalPages},
      } = items;
      if (pageCurrent < totalPages) {
        this.setState({fetching: true});
        this.fetch(term, pageCurrent + 1);
      }
    }
  };
  getPopupContainer = (triggerNode: HTMLElement) => triggerNode.parentElement!;
  public render() {
    //limit === 1 ? 'default' : 'multiple'
    const {allowClear = true, placeholder = '请选择', limit = 1, tagMode, optionRender = 'name', value} = this.props;
    const {items, fetching} = this.state;
    let selected: {key: string; label: string} | {key: string; label: string}[] | undefined;
    let mode: 'default' | 'multiple' | 'tags' = 'default';
    if (limit !== 1) {
      mode = tagMode ? 'tags' : 'multiple';
    }
    if (Array.isArray(value)) {
      selected = value.map(item => {
        if (typeof item === 'string') {
          return {key: item, label: item};
        } else {
          return {key: item.id, label: item.name};
        }
      });
    } else if (value) {
      if (typeof value === 'string') {
        selected = {key: value, label: value};
      } else {
        selected = {key: value.id, label: value.name};
      }
    }
    const renderOption: (item: Resource) => React.ReactNode = typeof optionRender === 'string' ? item => item[optionRender] : optionRender;
    return (
      <Select
        dropdownClassName={fetching ? styles.fetching : ''}
        labelInValue={true}
        showArrow={true}
        showSearch={true}
        mode={mode}
        getPopupContainer={this.getPopupContainer}
        onFocus={this.onSearch}
        value={selected}
        allowClear={allowClear}
        placeholder={placeholder}
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.onChange}
        style={{width: '100%'}}
        onPopupScroll={this.onPopupScroll}
      >
        {items && items.list.length && (
          <OptGroup label={'结果共' + items.listSummary.totalItems + '条'}>
            {items.list.map(item => (
              <Option key={item.id}>{renderOption(item)}</Option>
            ))}
          </OptGroup>
        )}
      </Select>
    );
  }
}

export default Component;
