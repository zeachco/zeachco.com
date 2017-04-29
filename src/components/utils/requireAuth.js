import React from 'react'
import {connect} from 'react-redux'

import Login from '../../pages/Login'

const requireAuth = (ComposedComponent, FallbackComponent) => {
    const Authenticate = ({ isAuth, ...props }) => {
        let ActualPage = null;
        if(!FallbackComponent) {
            ActualPage = isAuth ? ComposedComponent : Login  
        } else {
            ActualPage = !isAuth ? ComposedComponent : FallbackComponent
        }
        return (<ActualPage {...props}/>);
    }

    Authenticate.propTypes = {
        isAuth: React.PropTypes.bool.isRequired
    };

    const stateToProps = store => ({
        isAuth: store.get('old').session.isAuth
    })

    return connect(stateToProps, null)(Authenticate)
};

export default requireAuth
