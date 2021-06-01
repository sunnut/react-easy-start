const express = require('express');
const bodyParser = require('body-parser');
const { queryParser } = require('express-query-parser');
const app = express();
const path = require('path');
const webUploader = require('node-webuploader-server');
const uploaderConfig = {uploadDir: path.join(__dirname, 'public', 'uploads'), limitExtension: null};
const uploder = new webUploader(uploaderConfig);
const router = express.Router();
uploder.mount(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(queryParser({parseNull: true, parseBoolean: true}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/api/v1.0/upload', loginChecker, router);
const partition = require('./modules/index');
partition(app);

function loginChecker(req, res, next) {
    // check user login
    next();
}

app.listen(8080, function () {
  console.log('');
  console.log('');
  console.log('Mock Server is Started at 8080!!!');
  console.log('');
  console.log('');
});