import React from 'react';
import { Descriptions, Drawer } from 'antd';

const UserDetailComponent = ({user, onClose}) => {
  return (
    <>
      <Drawer title="User Info" placement="right" closable={true} onClose={onClose} visible={true} width="1000px">
        <Descriptions bordered={true} title="Basic Info" column={1}>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Addr">{user.addr}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserDetailComponent;