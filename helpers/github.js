const axios = require('axios');
const config = require('../config.js');

const getReposByUsername = (login) => {

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const options = {
    method: 'get',
    url: `https://api.github.com/users/${login}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options);
};

module.exports.getReposByUsername = getReposByUsername;