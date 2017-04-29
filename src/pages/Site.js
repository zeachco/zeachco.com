import React, {Component} from 'react'
import { connect } from 'react-redux'

import Translate from '../components/Translate'

class Site extends Component {
  render() {
    const {params, sites} = this.props
    const site = sites.filter(s => s._id === params.id)[0] || {}
    return (
      <div>
        <h2>
          <span>{site.name}&nbsp;</span>
          <small><Translate content="users" /></small>
        </h2>
        <pre>{JSON.stringify(site, null, 2)}</pre>
      </div>
    )
  }
}

Site.propTypes = {
  params: React.PropTypes.object.isRequired,
  sites: React.PropTypes.array.isRequired
};

const mapStatetoProps = (store) => ({
  isAuth: store.get('old').session.isAuth,
  isLoading: store.get('old').session.isLoading,
  session: store.get('old').session,
  sites: (store.get('old').session && store.session.sites) || []
})

export default connect(mapStatetoProps)(Site);
