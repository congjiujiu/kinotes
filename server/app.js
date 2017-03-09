const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/');
  },
  filename: (req, file, cb) => {
    cb(null, 'clippings.txt');
  },
});
const upload = multer({ storage });

app.all('/upload', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/upload', upload.single('logo'), (req, res) => {
  res.send({
    ret_code: '0',
  });
});

app.listen(3090, (req, res) => {
  console.log('app running at 3090');
});
