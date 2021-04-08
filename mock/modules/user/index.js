let data = require('./data.json');
let UUID = require('../util/UUID.js');

module.exports = function(server) {
    // 查询
    server.get('/api/v1.0/users', function(req, res) {
        let pageNo = req.query.pageNo;
        let pageSize = req.query.pageSize;
        let totalCount = data.length;

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

            let pageStart = pageNo * pageSize;

            if (pageStart + pageSize > totalCount) {
                data = data.slice(pageStart, totalCount);
            } else {
                data = data.slice(pageStart, pageStart + pageSize);
            }
        }

        res.send({
            data: data,
            total: totalCount,
            message: "Query Success",
            success: true
        });
    });

    // 查询详情
    server.get('/api/v1.0/users/:id', function(req, res) {
        res.send({
            data: data.find(x => x.id === req.params.id),
            message: "Get Detail Success",
            success: true
        });
    });

    // 增加
    server.post('/api/v1.0/users', function(req, res) {
        let newItem = req.body;
        data.push({
            id: UUID(),
            ...newItem
        });
        res.send({
            message: "Create Success",
            success: true
        });
    });

    // 编辑
    server.put('/api/v1.0/users/:id', function(req, res) {
        let editItem = req.body;

        data.map(x => {
            if (x.id === req.params.id) {
                return {...x, ...editItem};
            } else {
                return x;
            }
        })
    });

    // 刪除
    server.del('/api/v1.0/users/:id', function(req, res) {
        data = data.filter(x => x.id !== req.params.id);
        res.send({
            message: "Delete Success",
            success: true
        });
    });
};