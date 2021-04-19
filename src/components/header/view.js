import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import session from '../../util/session';
import { actions as homeActions } from '../../pages/home';
import styles from './header.module.css';
import { useDispatch, useSelector } from 'react-redux';

const languageList = [
  {
      key: 'en',
      label: 'English'
  },
  {
      key: 'zh',
      label: '中文 (简体)'
  },
]

const HeaderComponent = ({collapsed, setCollapsed}) => {
  const dispatch = useDispatch();
  const localLang = useSelector(s => s.home.localLang);

  const switchLang = ({ key }) => {
    session.put('language', key);
    dispatch(homeActions.changeLanage(key));
  };

  const menu = (
    <Menu>
      <Menu.Item key="11">
        <Link to="/home/setting">
          <Icon type="setting" />&nbsp;偏好设置
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="12">
        <Link to="/login">
          <Icon type="poweroff" />&nbsp;退出登录
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles['header-wrapper']}>
      <span className={styles['header-collapsed']} onClick={() => setCollapsed(!collapsed)}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <div className={styles['header-user-info']}>
        <Dropdown key="1" overlay={menu}>
          <span className={styles['header-dropdown-link']}>
            <Icon type="user" /> {session.get('TA-username') } <Icon type="down" />
          </span>
        </Dropdown>
        <Dropdown key="2" overlay={
          <Menu defaultSelectedKeys={[localLang, ]}>
            {
              languageList.map(item => <Menu.Item key={item.key} onClick={switchLang}>{item.label}</Menu.Item>)
            }
          </Menu>
        }>
          <span className={styles['header-dropdown-link']}>
            <Icon type="global" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderComponent;