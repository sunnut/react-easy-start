import * as Fetch from '../../util/fetch';

export const getColumns = () => {
    return [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '电子邮件',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '住址',
            dataIndex: 'addr',
            key: 'addr',
        }
    ];
};

export const getUsers = params => {
    const url = '/api/v1.0/users';
    return Fetch.get(url, params);
};