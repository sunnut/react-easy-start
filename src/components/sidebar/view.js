import React, { useState } from 'react';
import data from './data';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';
const { SubMenu } = Menu;

const Sidebar = () => {
  const [current, setCurrent] = useState('overview');

  return (
    <>
      <Menu
        theme="dark"
        onClick={(e) => setCurrent(e.key)}
        style={{ width: 240 }}
        defaultOpenKeys={['overview', 'sub-res', 'sub-other']}
        selectedKeys={[current]}
        mode="inline"
      >
        {
          data.map((item) => {
            if (item.children instanceof Array) {
              return (
                <SubMenu key={item.key}
                         title={<span><Icon type={item.icon} /><span>{item.label}</span></span>}>
                  {
                    item.children.map((subItem) => (
                      <Menu.Item key={subItem.key}>
                        <Link to={subItem.url}>{subItem.label}</Link>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={item.key}>
                  <Link to={item.url}>
                    <Icon type={item.icon} />{item.label}
                  </Link>
                </Menu.Item>
              )
            }
          })
        }
      </Menu>
    </>
  );
};

export default Sidebar;