var userList = require('./users.json');

module.exports = function(server) {
  server.post('/api/login', function(req, res) {
    res.send({
      data: req.body,
      message: null,
      success: true
    });
  });
};