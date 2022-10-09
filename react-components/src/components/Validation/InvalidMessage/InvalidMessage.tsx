import React, { Component } from 'react';

export default class InvalidMessage extends Component {
  render() {
    return <p className="error">The field contains invalid characters or numbers</p>;
  }
}
