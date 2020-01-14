import React from 'react';

import classes from './DrawToggle.module.css';

const drawToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.toggleSideDrawer}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawToggle;
