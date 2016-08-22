import React from 'react';

const SearchBar = props => {
  const opts = Object.assign({
    autoFocus: true,
    placeholder: "Texte...",
    disabled: false,
    searchButtonText: "Rechercher",
    onSearch: e => console.log('onSearch undefined')
  }, props);

  const onSubmitCallback = e => {
    e.preventDefault();
    let val = e.target[0].value;
    opts.onSearch(val);
  }

  return (
    <form onSubmit={onSubmitCallback}>
      <div className="input-group">
        <input type="text" className="form-control" autoFocus={opts.autoFocus} placeholder={opts.placeholder} aria-describedby="basic-addon1"/>
        <span className="input-group-btn">
          <button type="submit" className="btn btn-default">{opts.searchButtonText}</button>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
