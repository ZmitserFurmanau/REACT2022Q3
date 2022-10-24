import React, { FC } from 'react';

import { ErrorMessageProps } from './types';

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return <p className="error">{text}</p>;
};

export default ErrorMessage;
