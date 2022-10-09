import React, { Component } from 'react';

export default class InvalidDateMessage extends Component {
  render() {
    return <p className="error">There is necessary to specify a date in the future</p>;
  }
}
