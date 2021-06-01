import session from '../../util/session';
import * as Fetch from '../../util/fetch';

//===================================================================
// 检查包是否存在
//===================================================================
export const fileCheck = (md5, size, ext) => {
  const url = '/api/v1.0/upload/filecheck';
  const params = {
    md5, size, ext
  };
  return Fetch.get(url, params);
};

//===================================================================
// 检查包分段是否存在
//===================================================================
export const chunkCheck = (md5, chunk, size, ext) => {
  const url = '/api/v1.0/upload/chunkcheck';
  const params = {
    md5, chunk, size, ext
  };
  return Fetch.get(url, params);
};

//===================================================================
// 合并包分段
//===================================================================
export const mergeChunks = (md5, size, chunks, ext, fileName) => {
  const url = '/api/v1.0/upload/chunksmerge';
  const reqBody = {
    md5, size, chunks, ext, fileName
  };
  return Fetch.post(url, reqBody);
};

//===================================================================
// 导入包
//===================================================================
export const importPkgs = (fileId, fileName, md5, size, ext) => {
  const url = '/api/v1.0/pkgs';
  const newFile = {
    id: fileId,
    name: fileName,
    operator: session.get('TA-username'),
    version: md5 + '-' + size + '.' + ext,
    percentage: 0
  };
  return Fetch.post(url, newFile);
};

//===================================================================
// 更新包上传进度
//===================================================================
export const updatePkgPercentage = (fileId, percentage) => {
  const url = '/api/v1.0/pkgs/' + fileId;
  const reqBody = {
    percentage
  };
  return Fetch.put(url, reqBody);
};

//===================================================================
// 获取包信息
//===================================================================
export const getData = params => {
  const url = '/api/v1.0/pkgs';
  return Fetch.get(url, params);
};

//===================================================================
// 删除包信息
//===================================================================
export const batchDeletePkg = idList => {
  const url = '/api/v1.0/pkgs';
  return Fetch.del(url, {
    idList
  });
};

//===================================================================
// get the page params after table changed
//===================================================================
export const getParams = (pagination) => {
  return {
    pageNo: pagination.current,
    pageSize: pagination.pageSize
  };
};