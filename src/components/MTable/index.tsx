import {Select, Table} from 'antd';

import {BaseListSummary} from 'entity/common';
import React from 'react';
import {TableProps} from 'antd/lib/table';

const Option = Select.Option;

interface Props<T> extends TableProps<T> {
  topArea?: React.ReactNode;
  bottomArea?: React.ReactNode;
  listSummary?: BaseListSummary;
}

class MTable<T> extends React.PureComponent<Props<T>> {
  returnTotal = (total: number) => {
    return `共${total}个`;
  };
  changePageSize = (pageSize: number) => {
    const current = this.props.listSummary!.page;
    const onChange = this.props.onChange as any;
    onChange({current, pageSize}, {}, {}, {});
  };
  render() {
    const {listSummary = {page: 1, pageSize: 10, totalItems: 0, totalPages: 0}, bottomArea, topArea, ...props} = this.props;
    const {page, pageSize, totalItems} = listSummary;
    return (
      <>
        <div className="table-header">
          {topArea}
          <Select defaultValue={10} onChange={this.changePageSize}>
            {[10, 50, 100].map(i => {
              return (
                <Option key={i} value={i}>
                  显示{i}条
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="table-main-warp">
          <Table<T>
            scroll={{y: 440}}
            pagination={
              totalItems > pageSize
                ? {
                    current: page,
                    pageSize,
                    total: totalItems,
                    showQuickJumper: true,
                    showTotal: this.returnTotal,
                  }
                : false
            }
            className="g-table"
            {...props}
          />
          {totalItems && <div className="table-footer">{bottomArea}</div>}
          {totalItems <= pageSize && <div className="all-data">共{totalItems}个</div>}
        </div>
      </>
    );
  }
}

export default MTable;
