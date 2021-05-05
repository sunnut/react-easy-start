import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';
import styles from './sidebar.module.css';
import logo from '../../assets/images/logo.svg';
import useData from './useData';
const { SubMenu } = Menu;

//============================================================
// 根据当前页面路由寻找当前菜单
//============================================================
const getCurrentMenu = (tree) => {
  const currentPath = window.location.pathname;
  
  for (let node of tree) {
    if (currentPath.includes(node.url)) {
      return node.key;
    }

    if (node.children) {
      let res = getCurrentMenu(node.children);

      if (res) {
        return res;
      }
    }
  }

  return null;
};

const Sidebar = ({collapsed}) => {
  const data = useData();
  const [current, setCurrent] = useState(getCurrentMenu(data) || 'overview');

  return (
    <div className="ant-layout-sider-children">
      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="logo" />
          <h1>React Easy Start</h1>
        </a>
      </div>
      <Menu
        theme="dark"
        onClick={(e) => setCurrent(e.key)}
        style={{ padding: '16px 0', width: '100%' }}
        defaultOpenKeys={['overview', 'sub-res', 'sub-other']}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={collapsed}
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
                    <Icon type={item.icon} /><span>{item.label}</span>
                  </Link>
                </Menu.Item>
              )
            }
          })
        }
      </Menu>
    </div>
  );
};

export default Sidebar;