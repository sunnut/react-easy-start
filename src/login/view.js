import React, { useState } from 'react';
import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { actions as loginActions } from './index';
import styles from './login.module.css';

import verifyCodeImage from '../assets/images/verifycode.jpg';

const LoginPage = ({login}) => {
  let userNameInput = null;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  let errMsg = '';

  const emitEmptyUserName = () => {
    userNameInput.focus();
    setUserName('');
  };

  const gotoLogin = () => {
    login({userName, password, verifyCode});
  };

  const userNameSuffix = userName ? <Icon type="close-circle" onClick={emitEmptyUserName} /> : null;

  return (
    <>
      <div className={styles.banner}>
        <div className={styles['banner-wrapper']}>
          <div className={styles['banner-title-wrapper']}>
            <a className={styles['banner-title-link']} href="/">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                alt="" height="20" />
              <span className={styles['banner-title']}>XXX系统</span>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['login-form']}>
          <h1>用户名密码登录</h1>
            <ul>
              <li className={styles.errorTip}>
                <div className={styles['err-msg']}>{errMsg}</div>
              </li>
              <li>
                <Input
                  placeholder="用户名"
                  prefix={<Icon type="user" />}
                  suffix={userNameSuffix}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  ref={node => userNameInput = node}
                  size="large"
                />
              </li>
              <li className={styles['password-field']}>
                <Input
                  type="password"
                  placeholder="密码"
                  prefix={<Icon type="eye" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="large"
                />
              </li>
              <li>
                <span className={styles['verify-code-field']}>
                  <Input
                    placeholder="验证码"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    size="large"
                  />
                </span>
                <img className={styles['verify-code-pic']} src={verifyCodeImage} alt="" />
              </li>
            </ul>
            <div className={styles['button-area']}>
              <Button type="primary" onClick={gotoLogin} block>登录</Button>
            </div>
        </div>
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