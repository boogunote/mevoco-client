import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';

import styles from './styles.css';

class ConfirmModal extends Component {

  getTextAndConfirm() {
    const text = this.confirmInput.value;
    this.props.onConfirm(text);
  }

  handleChange(event) {
    this.props.onUpdate('name', event.target.value);
  }

  render() {
    const { message, onCancel, data } = this.props;

    if (!data.isShowing) {
      return null;
    }

    // const CreateVmForm = require('./CreateVmForm').default

    return (
      <div className={styles.confirmModal}>
        <div>
          <div>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.confirmModalContent}>
              <span className={styles.confirmModalMessage}>{message}</span>
              <input className={styles.confirmModalInput} type="text" value={data.name} onChange={(event) => this.handleChange(event)} ref={(_ref) => { this.confirmInput = _ref; }} />
              <button className={styles.btn} onClick={() => this.getTextAndConfirm()}>OK</button>
              <button className={styles.btn} onClick={() => onCancel()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

ConfirmModal.propTypes = {
  message: React.PropTypes.string.isRequired,
  onConfirm: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.string.isRequired,
  onUpdate: React.PropTypes.string.isRequired,
  data: React.PropTypes.string.isRequired,
};


// const mapStateToComponent = (state) => {
//   return {
//     // isShowing: state.modals.isShowing
//   }
// }

const mapStateToComponent = () => {};

export default connect(mapStateToComponent)(ConfirmModal);
