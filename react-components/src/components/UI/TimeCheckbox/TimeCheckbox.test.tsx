import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimeCheckbox from './TimeCheckbox';

describe('Time checkbox', () => {
  let checkbox: HTMLInputElement;
  let customCheckbox: HTMLElement;
  const setup = () => {
    const ref = { current: {} } as React.RefObject<HTMLInputElement>;
    render(<TimeCheckbox forwardRef={ref} />);
    checkbox = screen.getByRole('checkbox');
    customCheckbox = screen.getByTestId('custom-checkbox');
  };

  it('should render component', async () => {
    setup();
    expect(checkbox).toBeInTheDocument();
    expect(customCheckbox).toBeInTheDocument();
  });

  it('should switch checked status', async () => {
    setup();
    expect(checkbox.checked).toEqual(false);
    userEvent.click(customCheckbox);
    expect(checkbox.checked).toEqual(true);
  });
});
