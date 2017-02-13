import React, { PropTypes } from 'react'
import { Checkbox, Translate } from '.';

export const SearchFilters = ({onChange, visible}) => (
  <div className="well">
    <Checkbox
      checked={visible}
      onChange={() => onChange({ filterKey: 'visible', filterValue: !visible })}
    ><Translate content="item_field_published" /></Checkbox>
  </div>
);

SearchFilters.protoTypes = {
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};