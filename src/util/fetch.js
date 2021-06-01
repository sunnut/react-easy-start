import { message } from 'antd';
//===================================================================
// 处理超时
//===================================================================
const timerAction = (time = 5000) => {
  return new Promise((resolve, reject) => {
    setTimeout(reject, time, 'Request timeout');
  });
};

//===================================================================
// 发起请求
//===================================================================
const request = async (url, config) => {
  try {
    let res = await Promise.race([fetch(url, config), timerAction()]);

    if (!res.ok) {
      // 服务器异常返回
      throw new Error('Server error');
    }

    if (res.url.includes('export') && res.status === 200) {
      // 导出功能
      let fetchResult = await res.blob();
      let a = document.createElement('a');
      let url = window.URL.createObjectURL(fetchResult);
      let filename = 'CurrentAlarm-' + new Date().getTime() + '.csv';
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      let fetchResult = await res.json();

      if (fetchResult && (fetchResult.success === false || fetchResult.isSuc === false)) {
        // 项目内部认为的错误
        throw new Error(fetchResult.message || '');
      } else {
        return fetchResult;
      }
    }
  } catch (e) {
    message.error(e.toString());
  }
};

//===================================================================
// GET请求
//===================================================================
export const get = async (url, params) => {
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
    
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
  }

  return request(url, {method: 'GET'});
};

//===================================================================
// POST请求
//===================================================================
export const post = async (url, data) => {
  return request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

//===================================================================
// PUT请求
//===================================================================
export const put = async (url, data) => {
  return request(url, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

//===================================================================
// DELETE请求
//===================================================================
export const del = async (url, data) => {
  return request(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};