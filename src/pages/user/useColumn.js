import React, { useMemo, useState } from 'react';
import { Button, DatePicker, Icon, Input } from 'antd';
import * as ActionTypes from './actionTypes';

const OperButtonComponent = ({ confirm, clearFilters }) => (
  <>
    <Button
      type="primary"
      onClick={() => confirm()}
      icon="search"
      size="small"
      style={{ width: 90, marginRight: 8 }}
    >
      Search
    </Button>
    <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
      Reset
    </Button>
  </>
);

//===================================================================
// Table Input Column Search
//===================================================================
const getInputSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <OperButtonComponent confirm={confirm} clearFilters={clearFilters} />
    </div>
  ),
  filterIcon: filtered => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  )
});

const disabledDate = (current) => {
  if (current !== undefined) {
    return current && current._d.getTime() > Date.now();
  }
};

//===================================================================
// Table Time Column Search
//===================================================================
const getTimeSearchProps = () => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <DatePicker.RangePicker
        style={{ width: 330, marginBottom: 8, display: 'block' }}
        showTime="true"
        format="yyyy-MM-DD HH:mm:ss"
        disabledDate={disabledDate}
        value={selectedKeys}
        onChange={val => setSelectedKeys(val ? val : [])}
        onPressEnter={() => confirm()}
      />
      <OperButtonComponent confirm={confirm} clearFilters={clearFilters} />
    </div>
  )
});

//===================================================================
// Table Column Definition
//===================================================================
export default function useColumn() {
  const [currentItem, setCurrentItem] = useState(null);
  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filters: [
        {
          text: 'name1',
          value: 'name1',
        },
        {
          text: 'name8',
          value: 'name8',
        }
      ]
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true
    },
    {
      title: 'Tel',
      dataIndex: 'phone',
      key: 'phone',
      ...getInputSearchProps('phone')
    },
    {
      title: 'Addr',
      dataIndex: 'addr',
      key: 'addr'
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      ...getTimeSearchProps()
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a onClick={() => setCurrentItem({flag: ActionTypes.ACTION_DETAIL, ...record})}>detail</a>
      ),
    }
  ], []);

  return [columns, currentItem];
};