import React, { Component, useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const inputChangeHandler = (event, controlName) => {
    const updatdControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        touched: true
      }
    };

    setControls(updatdControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    if (props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetRedirectPath();
    }
  }, []);

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      valid={formElement.config.valid}
      changed={e => inputChangeHandler(e, formElement.id)}
      touched={formElement.config.touched}
      shouldValidate={formElement.config.validation}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirect} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType='Success'>Submit</Button>
      </form>
      <Button btnType='Danger' type='button' clicked={switchAuthModeHandler}>
        Switch to {isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSingup) =>
      dispatch(actions.auth(email, password, isSingup)),
    onSetRedirectPath: () => dispatch(actions.setAuthredirectPath('/'))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
