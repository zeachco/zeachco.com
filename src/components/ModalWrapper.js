import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import AutoBind from 'auto-bind';
import { hideModal } from '../store/actions/modal';

import Translate from '../components/Translate'

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
    AutoBind(this);
  }

  cancel() {
    hideModal();
  }

  render() {
    const { show, buttons, header, text } = this.props.modal;
    const buttonsComponents = buttons.map((b, i) => {
      return (<Button key={`btn_${i}`} bsStyle={ b.style || 'default' } onClick={ b.onClick || this.cancel }>
        <Translate content={ b.label } />
      </Button>);
    });

    return (
      <div className="static-modal">
        <Modal show={ show }>
          <Modal.Header closeButton onHide={ this.cancel }>
            <Modal.Title>
              <Translate content={ header } />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Translate content={ text } />
          </Modal.Body>

          <Modal.Footer>
            { buttonsComponents }
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalWrapper.propTypes = {
  modal: PropTypes.shape({
    show: PropTypes.bool,
    text: PropTypes.string,
    header: PropTypes.string,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        style: PropTypes.string,
        onClick: PropTypes.func
      })
    ).isRequired
  }).isRequired
};

export default ModalWrapper;
