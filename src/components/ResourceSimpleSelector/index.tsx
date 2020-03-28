import {BaseListSummary} from 'entity';
import {LabeledValue} from 'antd/lib/select';
import React from 'react';
import {Select} from 'antd';
import debounce from 'lodash/debounce';
import styles from './index.m.less';

const {Option, OptGroup} = Select;

interface Item {
  id: string;
  name: string;
}

export interface Props<Resource> {
  limit?: number | [number, number];
  tagMode?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  pageSize?: number;
  value?: Item | Item[];
  optionToValue?: (option: {value: string | number; label: React.ReactNode}) => Item;
  onChange?: (value?: Item | Item[]) => void;
  optionRender?: string | ((item: Resource) => React.ReactNode);
  fetch: (str: string, pageSize: number, pageCurrent: number) => Promise<{list: Resource[]; listSummary: BaseListSummary}>;
}

interface State<Resource> {
  items?: {term: string; list: Resource[]; listSummary: BaseListSummary};
  fetching: boolean;
}

const style = {width: '100%'};

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
  defOptionToValue: (option: {value: string | number; label: React.ReactNode}) => Item = (option) => {
    return {id: option.value.toString(), name: option.label?.toString() || option.value.toString()};
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
      .then((result) => {
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
  onSearch = (str: string) => {
    if (!this.state.fetching || this.state.items) {
      this.setState({items: undefined, fetching: true});
    }
    this.fetch(str);
  };
  onFocus = () => {
    if (!this.state.items) {
      this.onSearch('');
    }
  };
  onChange = (value?: LabeledValue | LabeledValue[]) => {
    const optionToValue = this.props.optionToValue || this.defOptionToValue;
    let selected: Item | Item[] | undefined;
    if (value) {
      if (Array.isArray(value)) {
        selected = value.map((item) => optionToValue(item));
      } else {
        selected = optionToValue(value);
      }
    }
    //this.setState({items: undefined, fetching: false});
    this.props.onChange && this.props.onChange(selected);
  };
  onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    this.popupScroll(e.target as HTMLDivElement);
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
    const {allowClear = true, placeholder = '请选择', limit = 1, tagMode, optionRender = 'name', value} = this.props;
    const {items, fetching} = this.state;
    let selected: LabeledValue | LabeledValue[] | undefined;
    let mode: undefined | 'multiple' | 'tags' = undefined;
    if (limit !== 1) {
      mode = tagMode ? 'tags' : 'multiple';
    }
    if (Array.isArray(value)) {
      selected = value.map((item) => {
        if (typeof item === 'string') {
          return {key: item, label: item, value: item};
        } else {
          return {key: item.id, label: item.name, value: item.id};
        }
      });
    } else if (value) {
      if (typeof value === 'string') {
        selected = {key: value, label: value, value: value};
      } else {
        selected = {key: value.id, label: value.name, value: value.id};
      }
    }
    const renderOption: (item: Resource) => React.ReactNode = typeof optionRender === 'string' ? (item) => item[optionRender] : optionRender;
    return (
      <Select<LabeledValue | LabeledValue[]>
        dropdownClassName={fetching ? styles.fetching : ''}
        labelInValue={true}
        showArrow={true}
        showSearch={true}
        mode={mode}
        getPopupContainer={this.getPopupContainer}
        onFocus={this.onFocus}
        value={selected}
        allowClear={allowClear}
        placeholder={placeholder}
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.onChange}
        style={style}
        onPopupScroll={this.onPopupScroll}
      >
        {items && items.list.length && (
          <OptGroup label={'结果共' + items.listSummary.totalItems + '条'}>
            {items.list.map((item) => (
              <Option value={item.id} key={item.id}>
                {renderOption(item)}
              </Option>
            ))}
          </OptGroup>
        )}
      </Select>
    );
  }
}

export default Component;
