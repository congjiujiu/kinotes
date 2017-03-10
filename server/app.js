const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const parse = require('@sole/kindle-clippings-parser').parse;

const app = express();

const DOUBAN_API = 'https://api.douban.com/v2/book/';

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/');
  },
  filename: (req, file, cb) => {
    cb(null, 'clippings.txt');
  },
});
const upload = multer({ storage });

const emptyObject = (obj) => {
  return JSON.stringify(obj).length <= 2;
};

const manageClip = (v) => {
  let title = v.title;
  let i = 0;
  for(i = title.length; i > 0; --i) {
    if (title[i] === '(') {
      break;
    }
  }
  const author = title.slice(i).split(/\(|\)/)[1];
  let titleTmp = title.slice(0, i);
  titleTmp = titleTmp.replace('《', '');
  titleTmp = titleTmp.replace('》', '');
  const firstLeftA = titleTmp.indexOf('(') === -1 ? 9999999999 : titleTmp.indexOf('(');
  const firstLeftB = titleTmp.indexOf('（') === -1 ? 9999999999 : titleTmp.indexOf('（');
  const firstLeft = firstLeftA < firstLeftB ? firstLeftA : firstLeftB;
  const name = titleTmp.slice(0, firstLeft).trim();
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

  const detail = {
    cover: 'https://img3.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-medium.gif',
    title,
    author,
  };

  return {
    title: name,
    author,
    marks,
    detail,
    // highlights: v.highlights,
  };
}

const findAuthor = (author, authors) => {
  return authors.some(au => {
    return au.indexOf(author) !== -1;
  });
};

const doBook = (book, q, author) => {
  console.log(JSON.stringify(book));
  if (emptyObject(book)) {
    book.title = q;
    book.author = author;
  } else {
    book.author = book.author.join(', ');
  }

  return book;
};

app.get('/search', (req, res) => {
  const q = req.query.q;
  const author = req.query.author;
  axios.get(`${DOUBAN_API}search`, {
    params: {
      q: q,
    }
  }).then(results => {
    const books = results.data.books;
    let book = {};
    for(i = 0; i < books.length; i++) {
      const b = books[i];
      if(findAuthor(author, b.author)) {
        book = b;
        break;
      }
    }
    if(emptyObject(book) && books[0]) {
      book = books[0];
    }
    book = doBook(book, q, author);

    res.send(book);
  }).catch(err => {
    console.error(err);
  });
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
