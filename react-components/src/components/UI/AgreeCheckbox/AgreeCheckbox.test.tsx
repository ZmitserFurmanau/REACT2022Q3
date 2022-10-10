import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AgreeCheckbox from './AgreeCheckbox';

describe('Agree checkbox', () => {
  let checkbox: HTMLInputElement;
  let errorsArr: string[] = [];
  const setup = () => {
    const mock = jest.fn();
    const ref = { current: {} } as React.RefObject<HTMLInputElement>;
    render(<AgreeCheckbox forwardRef={ref} errorsArr={errorsArr} errReset={mock} />);
    checkbox = screen.getByRole('checkbox');
  };

  it('should render component', async () => {
    setup();
    expect(checkbox).toBeInTheDocument();
  });

  it('should switch checked status', async () => {
    setup();
    expect(checkbox.checked).toEqual(false);
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('should show required message', async () => {
    errorsArr = ['agree'];
    setup();
    expect(
      screen.getByText(/necessary to agree to the processing of personal data/i)
    ).toBeInTheDocument();
  });
});
