import React from 'react';

//===================================================================
// Table Column Definition
//===================================================================
const getColumns = (getUserDetail) => {
  return [
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
      key: 'phone'
    },
    {
      title: 'Addr',
      dataIndex: 'addr',
      key: 'addr'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a href="javascript:void(0);" onClick={() => getUserDetail({id: record.id})}>detail</a>
      ),
    }
  ];
};

export default getColumns;