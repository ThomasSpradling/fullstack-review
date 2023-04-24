const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = mongoose.Schema({
  // your schema here!
  github_id: Number,
  name: String,
  description: String,
  author: String,
  author_id: Number,
  createdAt: Date,
  updatedAt: Date,
  github_url: String,
  watchers: Number,
  forks: Number
});

const Repo = mongoose.model('Repo', repoSchema);

const getTop = (count, cb) => {
  Repo.find()
    .sort({ forks: 1, watchers: 1 })
    .select()
    .limit(count)
    .exec((err, repos) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, repos);
    });
};

const save = (repo, cb) => {
  // This function should save a repo or repos to
  // the MongoDB
  Repo.where({ github_id: repo.github_id }).find((err, found) => {
    if (err) {
      cb(err);
      return;
    }
    if (!found.length) {
      Repo.create({
        github_id: repo.id,
        name: repo.name,
        description: repo.description,
        author: repo.owner.login,
        author_id: repo.owner.id,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        github_url: repo.clone_url,
        watchers: repo.watchers_count,
        forks: repo.forks_count
      })
      .then(repo => {
        cb(null, found);
        console.log(`Saved ${repo} to Repo successfully!`);
      })
      .catch();
    } else {
      console.log(`Error: A repo with id ${found[0].github_id} already exists! Did not insert.`);
    }
  });
}

module.exports.save = save;
module.exports.getTop = getTop;