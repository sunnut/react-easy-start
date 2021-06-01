let login = require('./login/login');
let user = require('./user/index');
let pkg = require('./pkg/index');

module.exports = function (server) {
  login(server);
  user(server);
  pkg(server);
};