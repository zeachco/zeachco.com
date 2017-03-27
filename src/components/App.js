import React from 'react'

import Notifications from './Notifications'
import TopNav from './TopNav'
import Footer from './Footer'
import '../styles/theme.scss';

const App = ({ children }) => (
  <div>
    <TopNav/>
    <div className="container">
      {children}
    </div>
    <Footer/>
    <Notifications/>
  </div>
)

export default App
