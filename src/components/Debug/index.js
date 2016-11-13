import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const style = {
  background: '#222',
  color: 'white',
  position: 'fixed',
  right: 10,
  bottom: 10
};

export class Debug extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({show: true})
  }

  hide() {
    this.setState({show: false})
  }

  componentDidMount() {
      ReactDOM.findDOMNode(this).addEventListener('mouseenter', this.show);
      ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.hide);
  }

  componentWillUnmount() {
      ReactDOM.findDOMNode(this).removeEventListener('mouseenter', this.show);
      ReactDOM.findDOMNode(this).removeEventListener('mouseleave', this.hide);
  }

  render() {
    const {object} = this.props;
    const {show} = this.state;
    return (<pre style={style} className="dark">{show ? JSON.stringify(object, null, 2) : '...'}</pre>);
  }
}
