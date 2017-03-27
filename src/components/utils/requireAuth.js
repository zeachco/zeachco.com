import React from 'react'
import {connect} from 'react-redux'

import Login from '../../pages/Login'

const requireAuth = ComposedComponent => {
    const Authenticate = props => {
        const ActualPage = props.isAuth ? ComposedComponent : Login
        return (<ActualPage {...props}/>)
    }

    Authenticate.propTypes = {
        isAuth: React.PropTypes.bool.isRequired
    };

    const stateToProps = store => ({isAuth: store.session.isAuth})

    return connect(stateToProps, null)(Authenticate)
};

export default requireAuth
