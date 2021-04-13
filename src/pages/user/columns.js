//===================================================================
// Table Column Definition
//===================================================================
const getColumns = () => {
    return [
        {
            title: '名称',
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
  
  export default getColumns;