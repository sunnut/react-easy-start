import React, { useState } from 'react';
import { Checkbox, Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { actions as loginActions } from './index';
import logo from '../assets/images/logo.svg';
import styles from './login.module.css';
const FormItem = Form.Item;

const LoginPage = ({login}) => {
  let userNameInput = null;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const emitEmptyUserName = () => {
    userNameInput.focus();
    setUserName('');
  };

  const gotoLogin = (e) => {
    e.preventDefault();
    login({userName, password});
  };

  const userNameSuffix = userName ? <Icon type="close-circle" onClick={emitEmptyUserName} /> : null;

  return (
    <>
      <div className={styles.header}>
        <div className={styles['header-wrapper']}>
          <header>
            <a href="/">
              <img src={logo} alt="ant design mini" />
              <h2>React Easy Start</h2>
            </a>
            <div className={styles['nav-wrapper']}>
              <nav>
                <ul>
                  <li>
                    <a href="https://zhuanlan.zhihu.com/rr1024" target="_blank" rel="noopener noreferrer">帮助</a>
                  </li>
                  <li>
                    <a href="https://github.com/sunnut/react-easy-start" target="_blank" rel="noopener noreferrer">Github</a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </div>
      <div className={styles.content}>
        <Form onSubmit={gotoLogin} className={styles['login-form']}>
          <h3>欢迎登录</h3>
          <FormItem>
            <Input
              placeholder="用户名: admin or user"
              prefix={<Icon type="user" />}
              suffix={userNameSuffix}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              ref={node => userNameInput = node}
              size="large"
            />
          </FormItem>
          <FormItem>
            <Input
              type="password"
              placeholder="密码: 123456"
              prefix={<Icon type="eye" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </FormItem>
          <FormItem>
            <Checkbox>记住</Checkbox>
            <a className={styles['login-form-forgot']} href="/">忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              登录
            </Button>
            <a href="/">注册</a>
          </FormItem>
        </Form>
      </div>
      <div className={styles['footer']}>
        版权所有 © XXX有限公司 2018
      </div>
    </>
  );
};

const mapDispachToProps  = (dispatch, props) => ({
  login: (formValue) => {
    // 等待
    dispatch(loginActions.login(formValue, props.history));
  }
});

export default connect(null, mapDispachToProps)(LoginPage);