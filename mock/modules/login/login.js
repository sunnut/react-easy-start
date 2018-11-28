var UUID = require('../util/UUID');
var testJson = require('./test.json');
module.exports = function (server) {
  //login
  server.get('/api/login', function (req, res) {
    res.send(testJson);
  });

  server.post('/api/login', function (req, res) {
    req.body = {};
    req.body.userId = UUID();
    res.send({
      data: req.body,
      message: null,
      success: true
    });
  });
};