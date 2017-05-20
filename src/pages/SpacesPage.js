import React, {Component} from 'react'
import { connect } from 'react-redux'

import Translate from '../components/Translate';
import FormContainer, {FIELD_TYPE} from '../components/FormContainer';

const searchFields = [{
  type: FIELD_TYPE.TEXT,
  name: 'search',
  label: 'search'
// }, {
//   type: FIELD_TYPE.TOGGLE,
//   name: 'live',
//   label: 'live'
}];

class SpacesPage extends Component {
  render() {
    const {params, sites} = this.props
    const site = sites.filter(s => s._id === params.id)[0] || {}
    return (
      <div>
        <h2><Translate content="spaces" /></h2>
        <FormContainer
          fields={searchFields}
          name="SpacesSearch"
        />
        {this.props.children}
        <pre>{JSON.stringify(site, null, 2)}</pre>
      </div>
    )
  }
}

SpacesPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  sites: React.PropTypes.array.isRequired
};

const mapStatetoProps = (store) => ({
  isAuth: store.get('old').session.isAuth,
  isLoading: store.get('old').session.isLoading,
  session: store.get('old').session,
  sites: (store.get('old').session && store.get('old').session.sites) || []
})

export default connect(mapStatetoProps)(SpacesPage);
