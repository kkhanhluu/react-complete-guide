import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
