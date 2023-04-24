import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List </h4>
    There are {repos.length} repos.
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Last Updated</th>
          <th>Forks</th>
          <th>Watchers</th>
        </tr>
      </thead>
      <tbody>
        {
          repos.map(repo => <RepoListEntry repo={repo} />)
            .reverse()
        }
      </tbody>
    </table>
  </div>
)

export default RepoList;