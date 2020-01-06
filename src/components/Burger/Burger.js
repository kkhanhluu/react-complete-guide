import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient type={igKey} key={igKey + i} />
      ));
    })
    .reduce((acc, currentArray) => acc.concat(currentArray), []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredient}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
