import $ from 'jquery';

const Parse = {
  server: 'http://localhost:1128/repos',

  get: (successCB) => {
    $.ajax({
      method: 'GET',
      url: Parse.server,
      contentType: 'application/json'
    })
    .done(successCB)
    .fail(error => {
      console.error(error.stack);
    });
  },

  post: (data, successCB) => {
    $.ajax({
      method: 'POST',
      url: Parse.server,
      contentType: 'application/json',
      data: data
    })
    .done(successCB)
    .fail(error => {
      console.error(error.stack);
    });
  }
};

export default Parse;
