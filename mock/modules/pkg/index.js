var pkgList = require('./data.json');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

module.exports = function (server) {
  server.post('/api/v1.0/pkgs', function (req, res) {
    var newPkg = {
      ...req.body,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    pkgList = [newPkg, ...pkgList];
    res.send({
      message: "Add Success",
      success: true
    });
  });

  server.put('/api/v1.0/pkgs/:id', function (req, res) {
    pkgList = pkgList.map(x => {
      if (x.id === req.params.id) {
        return {...x, percentage: req.body.percentage};
      } else {
        return x;
      }
    });
    res.send({
      message: "Update success",
      success: true
    });
  });

  server.get('/api/v1.0/pkgs', function (req, res) {
    var pageNo = req.query.pageNo;
    var pageSize = req.query.pageSize;
    var data = pkgList || [];
    var totalCount = data.length;

    if (pageNo != undefined) {
      pageNo = parseInt(pageNo);

      if (pageNo < 1) {
        pageNo = 0;
      } else {
        pageNo = pageNo - 1;
      }

      if (!pageSize) {
        pageSize = 10;
      } else {
        pageSize = parseInt(pageSize);
      }

      var pageStart = pageNo * pageSize;

      if (pageStart + pageSize > totalCount) {
        data = data.slice(pageStart, totalCount);
      } else {
        data = data.slice(pageStart, pageStart + pageSize);
      }
    }

    res.send({
      data,
      total: totalCount,
      message: "Query Success",
      success: true
    });
  });

  server.delete('/api/v1.0/pkgs', function (req, res) {
    var reqBody = req.body;
    var operIdList = reqBody.idList;
    var delPkgVers = pkgList.filter(x => operIdList.includes(x.id)).map(x => x.version);
    pkgList = pkgList.filter(x => !operIdList.includes(x.id));
    var uploadDir = path.join(__dirname + '\\..\\..\\', 'public', 'uploads');

    for (let version of delPkgVers) {
      var filePath = uploadDir + '\\' + version;

      if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
        fs.unlinkSync(filePath);
      }
    }

    res.send({
      success: true,
      message: "刪除成功"
    });
  });

};