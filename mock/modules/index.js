var login = require('./login/login');

module.exports = function (server) {
  login(server);
};