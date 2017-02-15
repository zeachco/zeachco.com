import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import { Translate, Checkbox, BSFormField } from '.';

const SearchFilters = ({onChange, visible, spaces}) => (
  <div className="well">
    <Checkbox
      checked={visible || false}
      onChange={() => onChange({ filterKey: 'visible', filterValue: !visible })}
    ><Translate content="item_field_published" /></Checkbox>
    <BSFormField label={(<Translate content="space_name"/>)} icon="globe">
      <select name="space" className="form-control" onChange={e => {
        e.preventDefault();
        onChange({ filterKey: 'space', filterValue: e.target.value });
      }}>
          <option value="">{Translate.content("select_space")}</option>
          {spaces.map(space => (
              <option value={space} key={space}>{space}</option>
          ))}
      </select>
    </BSFormField>
  </div>
);

SearchFilters.protoTypes = {
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  spaces: state.session.spaces
});

const ConnectedSearchFilters = connect(mapStateToProps)(SearchFilters);

export { ConnectedSearchFilters as SearchFilters };