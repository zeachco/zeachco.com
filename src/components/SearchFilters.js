import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Translate from './Translate';  
import Checkbox from './Checkbox';
import BSFormField from './BSFormField';
import {updateForm} from '../store/actions';

const handleStringChange = e => {
  updateForm(e.target.name, e.target.value)
}

const handleVisibilityChange = visible => {
  updateForm('inventory.visible', visible)
}

const SearchFilters = ({visible, space, spaces}) => (
  <div className="well">
    <Row>
      <Col sm={5}>
        <BSFormField label={(<Translate content="space_name"/>)} icon="globe">
          <select name="inventory.space" className="form-control" value={space} onChange={handleStringChange}>
              <option value="">{Translate.content("select_space")}</option>
              {spaces.map(s => (
                  <option value={s} key={s}>{s}</option>
              ))}
          </select>
        </BSFormField>
      </Col><Col  sm={5}>
        <Checkbox checked={visible} onChange={handleVisibilityChange}>
          <Translate content="item_field_published" />
        </Checkbox>
      </Col>
    </Row>
  </div>
);

SearchFilters.propTypes = {
  visible: PropTypes.bool,
  spaces: PropTypes.array.isRequired,
  space: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  spaces: state.get('old').session.spaces,
  visible: state.getIn('forms.inventory.visible', false),
  space: state.getIn('forms.inventory.space', '')
});

export default connect(mapStateToProps)(SearchFilters);
