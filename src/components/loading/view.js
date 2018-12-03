import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import styles from './loading.module.css';

const Loading = (props) => {
  const loadingStyle = {
    display: props.show ? 'block' : 'none'
  };

  return (
    <div style={loadingStyle} className={styles['loading-wrapper']}>
      <div className={styles['loading-content']}>
        <Spin size="large" tip="加载中..." />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const loadingData = state.loading;
  
  return {
    show: loadingData.show
  };
};

export default connect(mapStateToProps)(Loading);