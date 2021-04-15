import React, { useCallback } from 'react';
import { Button } from 'antd';
import * as Modal from './modals';

const BatchActionsComponent = ({selectedList, research}) => {
  const batchDisabled = selectedList.length === 0;

  const gotoDelete = useCallback(() => {
    Modal.batchDeleteUserConfirm(selectedList, research);
  }, [selectedList]);

  return (
    <div style={{marginBottom: '8px'}} className="clearfix">
      <div style={{float: 'left'}}>
        <Button type="primary" icon="reload" onClick={() => research()}>
          刷新
        </Button>&nbsp;&nbsp;
        <Button type="danger" icon="delete" disabled={batchDisabled} onClick={ gotoDelete }>
          删除
        </Button>
      </div>
    </div>
  );
};

export default BatchActionsComponent;