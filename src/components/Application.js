import React from 'react';
// import {TopNav, Footer} from './';
import TopNav from './TopNav';
import Footer from './Footer';

const Application = props => (
  <div>
    <TopNav/>
    <div className="container">
      {props.children}
    </div>
    <Footer/>
  </div>
);

export default Application;
