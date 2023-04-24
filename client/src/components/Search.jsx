import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const [term, setTerm] = useState('');

  const onChange = (e) => {
    setTerm(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div>
      <h4>Add more repos!</h4>
      <form onSubmit={search}>
        Enter a github username: <input value={term} onChange={onChange}/>
        <button type="submit"> Add Repos </button>
      </form>
    </div>
  );
};

export default Search;