import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as LocalStorage from '../../util/localstorage';
import styles from './header.module.css';

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/home/setting">
        <Icon type="setting" />&nbsp;偏好设置
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link to="/login">
        <Icon type="poweroff" />&nbsp;退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

const Header = ({collapsed, setCollapsed}) => {
  return (
    <div className={styles['header-wrapper']}>
      <span className={styles['header-collapsed']} onClick={() => setCollapsed(!collapsed)}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <div className={styles['header-user-info']}>
        <Dropdown overlay={menu} placement="bottomRight">
          <span className={styles['header-dropdown-link']}>
            <Icon type="user" /> {LocalStorage.get('TA-username') } <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;