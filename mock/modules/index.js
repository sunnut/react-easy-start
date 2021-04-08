let login = require('./login/login');
let user = require('./user/index');

module.exports = function (server) {
  login(server);
  user(server);
};