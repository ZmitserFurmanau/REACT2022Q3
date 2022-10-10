import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateInput from './DateInput';

describe('Date input', () => {
  let input: HTMLInputElement;
  let errorsArr: string[] = [];

  const setup = () => {
    const mock = jest.fn();
    const ref = { current: {} } as React.RefObject<HTMLInputElement>;
    render(<DateInput forwardRef={ref} errorsArr={errorsArr} errReset={mock} />);
    input = screen.getByTestId('date-input');
  };

  it('should render component', async () => {
    setup();
    expect(input).toBeInTheDocument();
  });

  it('should select date', async () => {
    setup();
    expect(input).toContainHTML('');
    userEvent.type(input, '2022-10-10');
    expect(input.value).toBe('2022-10-10');
  });

  it('should show required message', async () => {
    errorsArr = ['date'];
    setup();
    expect(screen.getByText(/this field cannot be empty/i)).toBeInTheDocument();
  });

  it('should show invalid message', async () => {
    errorsArr = ['date:invalid'];
    setup();
    expect(screen.getByText(/necessary specify a date in the future/i)).toBeInTheDocument();
  });
});
