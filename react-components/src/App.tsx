import React from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Outlet />
      </div>
    );
  }
}
