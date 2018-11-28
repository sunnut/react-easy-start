import React, {Component} from 'react';
import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { actions as loginActions } from './index';
import styles from './login.module.css';

import verifyCodeImage from '../assets/images/verifycode.jpg';

class LoginPage extends Component {
  userNameInput;

  constructor(props) {
    super(props);
    this.state = {
      errMsg: '',
      password: '',
      userName: '',
      verifyCode: ''
    };

    this.emitEmptyUserName = this.emitEmptyUserName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeVerifyCode = this.onChangeVerifyCode.bind(this);
    this.login = this.login.bind(this);
  }

  emitEmptyUserName() {
    this.userNameInput.focus();
    this.setState({...this.state, userName: ''});
  }

  onChangeUserName(e) {
    this.setState({...this.state, userName: e.target.value });
  }

  onChangePassword(e) {
    this.setState({...this.state, password: e.target.value });
  }

  onChangeVerifyCode(e) {
    this.setState({...this.state, verifyCode: e.target.value });
  }

  login() {
    this.props.login(this.state);
  }

  render() {
    const { password, userName, verifyCode } = this.state;
    const userNameSuffix = userName ? <Icon type="close-circle" onClick={this.emitEmptyUserName} /> : null;

    return (
        <div>
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
                  <div className={styles['err-msg']}>{this.state.errMsg}</div>
                </li>
                <li>
                  <Input
                      placeholder="用户名"
                      prefix={<Icon type="user" />}
                      suffix={userNameSuffix}
                      value={userName}
                      onChange={this.onChangeUserName}
                      ref={node => this.userNameInput = node}
                      size="large"
                  />
                </li>
                <li className={styles['password-field']}>
                  <Input
                      type="password"
                      placeholder="密码"
                      prefix={<Icon type="eye" />}
                      value={password}
                      onChange={this.onChangePassword}
                      size="large"
                  />
                </li>
                <li>
                  <span className={styles['verify-code-field']}>
                    <Input
                        placeholder="验证码"
                        value={verifyCode}
                        onChange={this.onChangeVerifyCode}
                        size="large"
                    />
                  </span>
                  <img className={styles['verify-code-pic']} src={verifyCodeImage} alt="" />
                </li>
              </ul>
              <div className={styles['button-area']}>
                <Button type="primary" onClick={this.login} block>登录</Button>
              </div>
            </div>
          </div>
          <div className={styles['footer']}>
            版权所有 © XXX有限公司 2018
          </div>
        </div>
    );
  }
}

const mapDispachToProps  = (dispatch, props) => ({
  login: (formValue) => {
    // 等待
    dispatch(loginActions.login(formValue, props.history));
  }
});

export default connect(null, mapDispachToProps)(LoginPage);