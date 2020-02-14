import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get('https://react-burger-builder-60e95.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredient(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
