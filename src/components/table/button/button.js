import React from 'react';

import './button.css';

const button = (props) => (
  <button className="add" onClick={props.onAddItem}>Add To Favourite</button>
);

export default button;
