import React from 'react';

const RepoListEntry = ({ repo }) => {
  return (
    <tr>
      <td>{repo.name}</td>
      <td>{repo.author}</td>
      <td>{repo.updatedAt}</td>
      <td>{repo.forks}</td>
      <td>{repo.watchers}</td>
    </tr>
  )
};

export default RepoListEntry;