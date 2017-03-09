const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const parse = require('@sole/kindle-clippings-parser').parse;

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

const manageClip = (v) => {
  let title = v.title;
  let i = 0;
  for(i = title.length; i > 0; --i) {
    if (title[i] === '(') {
      break;
    }
  }
  const author = title.slice(i).split(/\(|\)/)[1];
  const name = title.slice(0, i);
  // console.log(v.highlights[0].metadata);
  const marks = v.highlights.map(r => {
    const position = r.metadata.split('|')[0].split('- ')[1];
    const time = r.metadata.split('|')[1];
    return {
      position,
      time,
      text: r.text,
    };
  });

  return {
    title: name,
    author,
    marks,
    // highlights: v.highlights,
  };
}

app.all('/upload', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/upload', upload.single('logo'), (req, res) => {
  const data = fs.readFileSync('./upload/clippings.txt', 'utf-8');
  const parsed = parse(data);
  const clippings = [];
  parsed.map(v => {
    const vs = manageClip(v);
    
    clippings.push(vs);
  });

  res.send(clippings);
});

app.listen(3090, (req, res) => {
  console.log('app running at 3090');
});
