import api from '../services/api';

const doDetails = (book) => {
  if (!JSON.stringify(book).length) {
    return {};
  }

  if (book.images && book.images.large) {
    book.cover = book.images.large;
  } else {
    book.cover = 'https://img3.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-medium.gif';
  }

  return book;
};

export const uploadFile = ({ commit }, { formData }) => { // eslint-disable-line
  api.post({
    url: 'upload',
    data: formData,
  }).then((res) => {
    if (res.status === 200) {
      commit('addClipping', { data: res.data });
    }
  });
};

export const getBookDetail = ({ commit }, { index, title, author }) => { // eslint-disable-line
  api.get({
    url: 'search',
    params: {
      q: title,
      author,
    },
  }).then((res) => {
    if (JSON.stringify(res).length) {
      const book = doDetails(res.data);
      commit('addBookDetail', {
        index,
        book,
      });
    }
  });
};
