import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Aux from './../../hoc/Aux/Aux';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const onIngredientAdded = ingredientName =>
    dispatch(actionCreators.addIngredient(ingredientName));
  const onIngredientRemoved = ingredientName =>
    dispatch(actionCreators.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(
    () => dispatch(actionCreators.initIngredient()),
    [dispatch]
  );
  const onInitPruchase = () => dispatch(actionCreators.purchaseInit());
  const onSetRedirectPath = path =>
    dispatch(actionCreators.setAuthredirectPath(path));

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const loading = useSelector(state => state.burgerBuilder.loading);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => onInitIngredients(), [onInitIngredients]);
  useEffect(() => console.log('render'));
  const updatePurchaseState = () => {
    const sum = Object.keys(ingredients).reduce(
      (previousSum, ingKey) => previousSum + ingredients[ingKey],
      0
    );

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPruchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  let orderSummary = null;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState()}
          price={totalPrice}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        totalPrice={totalPrice}
      />
    );
  }
  if (loading) {
    orderSummary = <Spinner />;
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
