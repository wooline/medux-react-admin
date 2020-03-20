import {Button, Form, Input} from 'antd';
import {DispatchProp, connect} from 'react-redux';
import React, {useCallback} from 'react';

import {TabNav} from 'entity';
import {getFormDecorators} from 'common/utils';
import styles from './index.m.less';
import useEventCallback from 'hooks/useEventCallback';

const defCurItem: TabNav = {id: '', title: '', url: ''};
interface StoreProps {
  curItem?: TabNav;
}

interface FromData {
  title: string;
}
const formDecorators = getFormDecorators<FromData>({
  title: {rules: [{required: true, message: '请输入书签名'}]},
});

const Component: React.FC<StoreProps & DispatchProp> = ({curItem = defCurItem, dispatch}) => {
  const onFinish = useEventCallback(
    (values: FromData) => {
      const {title} = values;
      dispatch(actions.adminLayout.updateTabNav({...curItem, title}));
    },
    [dispatch, curItem]
  );

  const onCancel = useCallback(() => {
    dispatch(actions.adminLayout.closeTabNavEditor());
  }, [dispatch]);

  const initialValues = {title: curItem.title};

  return (
    <div className={styles.root}>
      <h4 className="title">{curItem.id ? '重命名当前书签：' : '将当前页面加入书签：'}</h4>
      <Form layout="horizontal" onFinish={onFinish as any} initialValues={initialValues}>
        <Form.Item {...formDecorators.title}>
          <Input allowClear={true} placeholder="请输入书签名" />
        </Form.Item>
        <div className="g-btns">
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curItem: state.adminLayout!.tabNavEditor,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
