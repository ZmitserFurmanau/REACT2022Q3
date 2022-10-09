import React, { Component } from 'react';

export default class ShortMessage extends Component {
  render() {
    return <p className="error">This field cannot be less than 3 characters</p>;
  }
}
