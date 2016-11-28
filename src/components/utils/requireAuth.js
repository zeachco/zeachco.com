import React from 'react'
import {connect} from 'react-redux'
import {Login} from '../../pages'

export const requireAuth = ComposedComponent => {
    class Authenticate extends React.Component {
        componentWillMount() {
            console.log('componentWillMount');
        }

        componentWillUpdate() {
            console.log('componentWillUpdate');
        }

        render() {
            const ActualPage = this.props.isAuth
                ? ComposedComponent
                : Login;

            console.log(ActualPage)
            return (<ActualPage {...this.props}/>);
        }
    }

    const stateToProps = store => ({isAuth: store.session.isAuth});

    return connect(stateToProps, null)(Authenticate);
}