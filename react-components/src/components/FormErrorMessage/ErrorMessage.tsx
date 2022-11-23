import React, { Component } from 'react';

import { ErrorMessageProps } from './types';

export default class ErrorMessage extends Component<ErrorMessageProps, Record<string, never>> {
  render() {
    const { text } = this.props;
    return <p className="error">{text}</p>;
  }
}
