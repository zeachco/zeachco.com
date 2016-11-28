import React from 'react'
import {TopNav, Footer, Notifications} from '.'
// import TopNav from './TopNav';

export const App = props => (
  <div>
    <TopNav/>
    <div className="container">
      {props.children}
    </div>
    <Footer/>
    <Notifications/>
  </div>
)
