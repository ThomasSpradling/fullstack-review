const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bp = require('body-parser')
let app = express();

const { save, getTop } = require('../database');
const { getReposByUsername } = require('../helpers/github.js');

// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(cors());
app.use(express.json());
// app.use(bp.urlencoded({ extended: true }));
// app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/repos', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const username = req.body.username;
  getReposByUsername(username)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        console.log('Successfully fetched data from API!');
        const repos = res.data;

        // TODO: REFACTOR USING PROMISES
        for (const repo of repos) {
          save(repo, (err, found) => {
          if (err) {
              console.log(`Failed to save repo ${repo.name} to DB!`);
              // console.error(error);
              return;
            }
            console.log(`Successfuly saved repo ${repo.name} to DB!`);
          });
        }
      } else {
        console.log('Failed to fetch repos from API!');
      }
    })
    .catch((err) => {
      console.log('FAILED HERE');
      console.log(err.stack);
    });
});

app.get('/repos', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getTop(25, (error, repos) => {
    if (error) {
      // console.error(error.stack);
      return;
    }
    console.log(`Successfully fetched ${repos.length} repos from DB!`);
    res.send(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

