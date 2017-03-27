import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Translate from './Translate'  
import Checkbox from './Checkbox'  
import BSFormField from './BSFormField'

const SearchFilters = ({onChange, visible, spaces}) => (
  <div className="well">
    <Row>
      <Col  sm={5}>
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
      </Col><Col  sm={5}>
        <Checkbox
          checked={visible || false}
          onChange={() => onChange({ filterKey: 'visible', filterValue: !visible })}
          ><Translate content="item_field_published" /></Checkbox>
      </Col>
    </Row>
  </div>
);

SearchFilters.propTypes = {
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  spaces: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  spaces: state.session.spaces
});

export default connect(mapStateToProps)(SearchFilters);
