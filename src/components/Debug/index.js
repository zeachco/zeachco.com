import './style.css';
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

  componentWillReceiveProps(newProps) {
    this.setState({
      updated: true
    });
    this.to = setTimeout(this.setState.bind(this), 300, { updated: false });
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
      clearTimeout(this.to);
  }

  render() {
    const {object} = this.props;
    const {show, updated} = this.state;
    return (<pre style={style} className={updated ? 'dark debug updated' : 'dark debug'}>{show ? JSON.stringify(object, null, 2) : '...'}</pre>);
  }
}
