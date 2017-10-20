import './Base.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'

import ModalWrapper from '../components/ModalWrapper'

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
        <ModalWrapper modal={ this.props.modal } />
      </div>
    )
  }
}

Base.propTypes = {
  modal: ModalWrapper.propTypes.modal
};

const mapStatetoProps = (store) => ({
  modal: store.get('old').modal
});

export default connect(mapStatetoProps)(Base);
