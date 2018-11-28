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

const header = () => {
  return (
      <div>
        <div className={styles['header-title']}>
          <Icon type="cloud" />
          XXX系统
        </div>
        <div className={styles['header-user-info']}>
          <Dropdown overlay={menu} placement="bottomRight">
            <a className={styles['header-dropdown-link']} href="/">
              <Icon type="user" /> {LocalStorage.get('TA-username') } <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
  );
};

export default header;