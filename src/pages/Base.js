import './Base.scss'
import React, {Component} from 'react'

class Base extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.to = setTimeout(() => {
      this.setState({ready: true})
    }, 0)
  }

  componentWillUnmount() {
    clearTimeout(this.to)
    this.setState({ready: false})
  }

  render() {
    const animationClasses = 'base-page' + (this.state.ready ? ' ready' : '');
    return (
      <div className={animationClasses}>
        <div>{this.props.children}</div>
        <hr/>
      </div>
    )
  }
}

export default Base
