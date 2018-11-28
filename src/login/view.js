import React, {Component} from 'react';
import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { actions as loginActions } from './index';
import styles from './login.module.css';

import logoImage from '../assets/images/logo.jpg';
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
            <div className={styles.widthLimit}>
              <img src={logoImage} width="30" height="20" alt="" />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles['login-form']}>
              <h1>资质认证</h1>
              <ul>
                <li className={styles.errorTip}>
                  <div className={styles['err-msg']}>{this.state.errMsg}</div>
                </li>
                <li>
                  <Input
                      placeholder="请输入账号"
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
                      placeholder="请输入密码"
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
                <Button type="primary" onClick={this.login}>登录</Button>
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