import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  seek(comp) {
    const {onChange, values} = this.props
    if (comp.type === 'input') {
      this.keyIndex++;
      return (<input {...comp.props} value={values[comp.props.name]} key={this.keyIndex} onChange={e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
        const answer = this.state;
        answer[name] = value;
        onChange(answer);
      }}/>);
    }
    return comp;
  }

  submit(e) {
    e.preventDefault();
    this.props.onChange(this.state);
  }

  render() {
    this.keyIndex = 0;
    return (
      <form onSubmit={this.submit.bind(this)}>{this.props.children.map(this.seek.bind(this))}</form>
    );
  }
}

export default Form
