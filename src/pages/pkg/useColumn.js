import React from 'react';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { Progress } from 'antd';

export default function useColumn() {
  const intl = useIntl();
  const columns = useMemo(() => [
    {
      title: intl.formatMessage({id: 'Name'}),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: intl.formatMessage({id: 'Operator'}),
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: intl.formatMessage({id: 'Version'}),
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: intl.formatMessage({id: 'Progress'}),
      dataIndex: 'percentage',
      key: 'percentage',
      render: value => (
        <>
          <Progress percent={value} />
        </>
      )
    },
    {
      title: intl.formatMessage({id: 'Time'}),
      dataIndex: 'time',
      key: 'time',
    }
  ], []);

  return [columns];
};