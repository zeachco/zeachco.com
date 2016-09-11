import React, {Component} from 'react';

const style = {
  position: 'relative',
  width: '100%',
  display: 'block',
  left: '-100%',
  transition: 'all .2s'
}

export class Base extends Component {
  constructor(...props) {
    super(...props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({activated: true});
    }, 20);
  }
  componentWillUnmount() {
    this.setState({activated: false});
  }
  render() {
    const tempStyle = this.state.activated
      ? {
        ...style,
        left: 0
      }
      : style;
    return (
      <div style={tempStyle}>
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}
