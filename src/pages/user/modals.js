import { Modal } from 'antd';
import * as API from './api';

const { confirm } = Modal;

//===================================================================
// Show the modal of batch delete
//===================================================================
export const batchDeleteUserConfirm = (selectedData, refresh) => {
  confirm({
    title: 'Are you sure to delete the users?',
    content: selectedData.map(x => x.name).join(', '),
    onOk() {
      let reqParam = {ids: selectedData.map(x => x.id)};

      API.deleteUser(reqParam).then(res => {
        Modal.success({
          content: res.message,
          onOk() {
            refresh();
          }
        });
      });
    }
  });
};