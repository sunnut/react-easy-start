import React, { useEffect, useCallback, useRef } from 'react';
import cookie from 'react-cookies';
import { Button, message, Modal } from 'antd';
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import * as API from './api';
import { actions as loadingActions } from '../../components/loading';
import WebUploader from 'webuploader';

const BatchActionsComponent = ({selectedList, refresh, data, setData}) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const batchDisabled = selectedList.length === 0;
  const uploadProgress = useCallback((file, percentage) => {
    // 实时更新进度
    if (data) {
      let newData = {data: []};
      newData.data = data.data.map(x => {
        if (x.id === file.id) {
          return {...x, percentage: Math.floor(percentage * 100)};
        } else {
          return x;
        }
      });
      setData(newData);
    }
  }, [data, setData]);

  const updateProgress = useCallback((file) => {
    // 不管成功或失败，更新当前的进度至数据库
    if (data) {
      let currPkgs = data.data;
      let dstPkg = currPkgs.find(x => x.id === file.id);

      if (dstPkg) {
        API.updatePkgPercentage(file.id, dstPkg.percentage).then(() => {
          refresh();
        });
      }
    }
  }, [data, setData]);

  //====================================================
  // 删除
  //====================================================
  const gotoDelete = () => {
    Modal.confirm({
      title: intl.formatMessage({id: 'Delete.Tip'}),
      okText: intl.formatMessage({id: 'Confirm'}),
      okType: 'danger',
      cancelText: intl.formatMessage({id: 'Cancel'}),
      content: selectedList.map(x => x.name).join(', '),
      onOk() {
        (async () => {
          dispatch(loadingActions.showLoading());
          const idList = selectedList.map(x => x.id);
          const res = await API.batchDeletePkg(idList);

          idList.forEach(fileId => {
            try {
              window.uploader.removeFile(fileId, true);
            } catch (e) {}
          });

          dispatch(loadingActions.hideLoading());
          if (!res) return;

          Modal.success({
            content: res.message,
            onOk() {
              refresh();
            },
          });
        })();
      }
    });
  };

  const uploadProgressRef = useRef();
  const updateProgressRef = useRef();

  useEffect(() => {
    uploadProgressRef.current = uploadProgress;
  }, [uploadProgress]);

  useEffect(() => {
    updateProgressRef.current = updateProgress;
  }, [updateProgress]);

  useEffect(() => {
    const chunkSize = 500 * 1024;

    WebUploader.Uploader.register({
      'before-send-file': 'beforeSendFile',
      'before-send': 'beforeSend',
      'after-send-file': 'afterSendFile'
    }, {
      beforeSendFile: (file) => {
        const deferred = WebUploader.Deferred();
        (new WebUploader.Uploader()).md5File(file, 0, chunkSize).progress(function() {}).then(function(val) {
          file.md5 = val;

          // 检查上传的包是否存在
          API.fileCheck(file.md5, file.size, file.ext).then(data => {
            if (data.exists) {
              deferred.reject();
            } else {
              // 上传文件及时入库
              API.importPkgs(file.id, file.name, file.md5, file.size, file.ext).then(() => {
                refresh();
              });
              deferred.resolve();
            }
          });
        });
        return deferred.promise();
      },
      beforeSend: function(block) {
        const deferred = WebUploader.Deferred();
        // 检查文件块是否存在
        API.chunkCheck(block.file.md5, block.chunk, block.file.size, block.file.ext).then(data => {
          if (data.exists) {
            deferred.reject();
          } else {
            deferred.resolve();
          }
        });
        this.owner.options.formData.md5 = block.file.md5;
        return deferred.promise();
      },
      afterSendFile: (file) => {
        const md5 = file.md5;
        const size = file.size;
        const chunksTotal = Math.ceil(size / chunkSize);
        
        if (chunksTotal > 1) {
          const deferred = WebUploader.Deferred();
          // 合并文件块
          API.mergeChunks(md5, size, chunksTotal, file.ext, file.name).then(data => {
            deferred.resolve();
          }).catch(() => {
            deferred.reject();
          });

          return deferred.promise();
        }
      }
    });

    function initUploadBrz() {
      let info = {md5: ''};

      if (window.uploader) {
        window.uploader.destroy();
      }
      
      window.uploader = WebUploader.create({
        pick: '#upload-pkg-btn',
        server: '/api/v1.0/upload',
        auto: true,
        chunked: true,
        chunkSize,
        threads: 3,
        prepareNextFile: true,
        formData: info,
        headers: {
          'X-Session-Id': cookie.load('X-Session-Id'),
          'X-Auth-Token': cookie.load('X-Auth-Token')
        }
      }).on('uploadProgress', function(file, percentage) {
        uploadProgressRef.current(file, percentage);
      }).on('uploadError', function() {
        message.error('Upload error');
      }).on('uploadComplete', function(file) {
        updateProgressRef.current(file);
      });
    }

    initUploadBrz();
  }, []);

  return (
    <div style={{height:'36px' }}>
      <div style={{float:'left' }}>
        <Button type="primary" onClick={() => refresh()} icon="reload">
          <FormattedMessage id="Refresh" />
        </Button>&nbsp;&nbsp;
        <Button id="upload-pkg-btn" className="upload-btn" type="primary" icon="upload">
          <FormattedMessage id="Import" />
        </Button>&nbsp;&nbsp;
        <Button type="danger" onClick={gotoDelete} disabled={batchDisabled} icon="delete">
          <FormattedMessage id="Delete" />
        </Button>
      </div>
    </div>
  );
};

export default BatchActionsComponent;