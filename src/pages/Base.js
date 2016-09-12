import React, {Component} from 'react';

const style = {
  transform: 'translateX(-100%)',
  transition: 'transform .2s'
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
        transform: 'none'
      }
      : style;
    return (
      <div style={tempStyle}>
        <div>{this.props.children}</div>
        <hr/>
      </div>
    );
  }
}
