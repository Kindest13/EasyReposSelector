import React, { Component } from 'react';

import RenderRow from './row/row';
import Button from './button/button';

import './table.css';

class Table extends Component {

  onAddItem = ({ target }) => {
    let urls = localStorage.getItem('urls');
    const url = target.parentElement.children[0].textContent;
    urls ? urls = JSON.parse(urls) : urls = [];
    urls.push(url);
    localStorage.setItem('urls', JSON.stringify(urls));
    target.textContent = 'Added';
    target.style.backgroundColor = "yellow";
  }

  getKeys = () => Object.keys(this.props.data[0]);

  getHeader = () => {
    const keys = this.getKeys();
    return keys.map(key => <th key={key}>{key}</th>);
  }

  getRowsData = () => {
    const items = this.props.data;
    const keys = this.getKeys();
    const button = this.props.favourite ? null : <Button onAddItem={this.onAddItem} />;
    return items.map((row, index) => {
      return <tr key={index}>
        <RenderRow key={index} data={row} keys={keys} />
        {button}
      </tr>
    })
  }

  render() {
    return (
      <table>
        <thead>
          <tr>{this.getHeader()}</tr>
        </thead>
        <tbody>
          {this.getRowsData()}
        </tbody>
      </table>
    );
  }
}
export default Table;
