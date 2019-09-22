import React from 'react';

import './input.css';

const input = (props) => {
  return (
    <input
      className="queryInput"
      type="text"
      onChange={props.oninput} />
  );
}

export default input;
