import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Parse from './parse';

const App = () => {

  const [repos, setRepos] = useState([]);


  const handleRepos = () => {
    Parse.get((repos) => {
      setRepos(repos || []);
    });
  };

  const search = (term) => {
    console.log(`${term} was searched`);
    Parse.post(JSON.stringify({ username: term }), () => {
      console.log('Successfully submitted form!');
      handleRepos();
    });
  };

  useEffect(() => {
    handleRepos();
  }, []);

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search} />
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));