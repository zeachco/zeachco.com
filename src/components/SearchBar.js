import React, { Component, PropTypes } from 'react';
import { SearchFilters } from '.';
import autoBind from 'auto-bind';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  _submit(e) {
    e.preventDefault();
    this.setState({ search: e.target[0].value });
    this._triggerSearch();
  }

  _filterChange({filterKey, filterValue}) {
    this.setState({ [filterKey]: filterValue });
    this._triggerSearch();
  }

  _triggerSearch() {
    setTimeout(() => {
      this.props.onSearch(this.state);
    }, 50);
  }

  render() {
    const {autoFocus, searchButtonText, placeholder} = this.props;
    const {visible} = this.state;

    return (
      <form onSubmit={this._submit} title={JSON.stringify(this.state, null, 2)} >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            autoFocus={autoFocus}
            placeholder={placeholder}
            aria-describedby="basic-addon1"/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">{searchButtonText}</button>
          </span>
        </div>
        <SearchFilters onChange={this._filterChange} visible={visible}/>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchButtonText: PropTypes.string.isRequired
}
