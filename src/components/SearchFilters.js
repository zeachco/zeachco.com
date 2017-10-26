import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Translate from './Translate'  
import Checkbox from './Checkbox'  
import BSFormField from './BSFormField'

const SearchFilters = ({onChange, visible, spaces, space}) => (
  <div className="well">
    <Row>
      <Col  sm={5}>
        <BSFormField label={(<Translate content="space_name"/>)} icon="globe">
          <select name="space" className="form-control" value={space || '(unselected)'} onChange={e => {
            e.preventDefault();
            const value = e.target.value === '(unselected)' ? null : e.target.value;
            onChange({ filterKey: 'space', filterValue: value });
          }}>
            <option value="(unselected)">{Translate.content("select_space")}</option>
              {spaces.map(s => (
                  <option value={s} key={s}>{s}</option>
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
  spaces: PropTypes.array.isRequired,
  space: PropTypes.string
};

const mapStateToProps = state => ({
  spaces: state.get('old').session.spaces
});

export default connect(mapStateToProps)(SearchFilters);
