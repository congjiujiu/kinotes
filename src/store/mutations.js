export const addFile = (states, { filename }) => { // eslint-disable-line
  states.filename = filename;
};

export const addClipping = (states, { data }) => {
  states.clippings = data;
};

export const addBookDetail = (states, { index, book }) => {
  states.clippings[index].detail = book;
};
