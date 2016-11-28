import React from 'react'
import {connect} from 'react-redux'
import {Login} from '../../pages'

export const requireAuth = ComposedComponent => {
    const Authenticate = props => {
        const ActualPage = props.isAuth
            ? ComposedComponent
            : Login

        return (<ActualPage {...props}/>)
    }

    const stateToProps = store => ({isAuth: store.session.isAuth})

    return connect(stateToProps, null)(Authenticate)
}