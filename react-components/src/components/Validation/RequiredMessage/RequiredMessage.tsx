import React, { Component } from 'react';

export default class RequiredMessage extends Component {
  render() {
    return <p className="error">This field cannot be empty</p>;
  }
}
