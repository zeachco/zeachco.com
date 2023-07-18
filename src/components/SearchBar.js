import React, { Component, PropTypes } from 'react';
import autobind from 'auto-bind-es5';
import {connect} from 'react-redux';

import SearchFilters from './SearchFilters';
import {updateForm} from '../store/actions' ;
import {searchItems} from '../store/actions/items';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {};
  }

  componentDidMount() {
    searchItems();
  }

  _submit(e) {
    e.preventDefault();
    searchItems();
  }

  handleChange(e) {
    e.preventDefault();
    updateForm(e.target.name, e.target.value);
  }

  render() {
    const {autoFocus, searchButtonText, placeholder, searchText} = this.props;

    return (
      <form onSubmit={this._submit} title={JSON.stringify(this.state, null, 2)} >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            autoFocus={autoFocus}
            name="inventory.search"
            placeholder={placeholder}
            aria-describedby="basic-addon1"
            onChange={this.handleChange}
            value={searchText}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">{searchButtonText}</button>
          </span>
        </div>
        <SearchFilters />
      </form>
    );
  }
}

const {string, object, oneOfType, bool} = PropTypes;

SearchBar.defaultProps = {
  autoFocus: true
}

SearchBar.propTypes = {
  placeholder: string.isRequired,
  searchText: string.isRequired,
  autoFocus: bool,
  searchButtonText: oneOfType([string, object]).isRequired
}

const mapStateToProps = state => {
  return {
    searchText: state.getIn('forms.inventory.search', '')
  }
};

export default connect(mapStateToProps)(SearchBar);
