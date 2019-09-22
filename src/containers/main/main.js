import React, { Component } from 'react';

import Header from '../../components/header/header';
import Input from '../../components/input/input';
import Table from '../../components/table/table';

class Main extends Component {
  state = {
    queryItems: [],
    showTable: false,
    toggleFavourite: true
  };

  componentDidMount() {
    let urls = localStorage.getItem('urls');
    urls ? urls = JSON.parse(urls) : urls = [];
    urls.forEach(url => {
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          const selectedData = { url: data.url, name: data.name, full_name: data.full_name };
          this.setState(state => {
            const newState = [...state.queryItems];
            newState.push(selectedData);
            return { queryItems: newState, showTable: true };
          });
        })
        .catch(err => console.log(err));
    });
  }

  onInputChange = ({ target: { value } }) => {
    if (value) {
      this.setState({
        showTable: true,
        toggleFavourite: false
      });
      fetch(`https://api.github.com/search/repositories?q=${value}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          const selectedData = data.items.map(item => ({ url: item.url, name: item.name, full_name: item.full_name }));
          this.setState({
            queryItems: selectedData
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        queryItems: [],
        showTable: false
      });
    }
  }
  render() {
    const table = this.state.showTable ? <Table data={this.state.queryItems} favourite={this.state.toggleFavourite} /> : null;
    return (
      <React.Fragment>
        <Header />
        <Input oninput={this.onInputChange} />
        {table}
      </React.Fragment>
    );
  }
}

export default Main;
