import React, { Component } from 'react';
import SideBar from '../components/SideBar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <SideBar />
      </div>
    );
  }
}
