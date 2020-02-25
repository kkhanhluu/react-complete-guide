import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = React.memo(
  props => {
    return (
      <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
          }}
        >
          {props.children}
        </div>
      </Aux>
    );
  },
  (prevProps, nextProps) =>
    nextProps.show !== prevProps.show ||
    nextProps.children !== prevProps.children
);

export default Modal;
