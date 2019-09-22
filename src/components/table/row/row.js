import React from 'react';

const renderRow = (props) => {
  return props.keys.map(key => <td key={key}>{props.data[key] ? props.data[key].toString() : ''}</td>);
};

export default renderRow;
