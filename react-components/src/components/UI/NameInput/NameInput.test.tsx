import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NameInput from './NameInput';

describe('Name input', () => {
  let input: HTMLInputElement;
  let errorsArr: string[] = [];

  const setup = () => {
    const mock = jest.fn();
    const ref = { current: {} } as React.RefObject<HTMLInputElement>;
    render(<NameInput forwardRef={ref} errorsArr={errorsArr} errReset={mock} />);
    input = screen.getByRole('textbox', { name: /name:/i });
  };

  it('should render component', async () => {
    setup();
    expect(input).toBeInTheDocument();
  });

  it('should input focus', async () => {
    setup();
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it('should input type', async () => {
    setup();
    expect(input).toContainHTML('');
    userEvent.type(input, 'Test query');
    expect(input.value).toBe('Test query');
  });

  it('should show required message', async () => {
    errorsArr = ['name'];
    setup();
    expect(screen.getByText(/this field cannot be empty/i)).toBeInTheDocument();
  });

  it('should show short name error message', async () => {
    errorsArr = ['name:short'];
    setup();
    expect(screen.getByText(/this field cannot be less than 3 characters/i)).toBeInTheDocument();
  });

  it('should show invalid name error message', async () => {
    errorsArr = ['name:invalid'];
    setup();
    expect(
      screen.getByText(/the field contains invalid characters or numbers/i)
    ).toBeInTheDocument();
  });
});
