import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeliverySelect from './DeliverySelect';

describe('Delivery select', () => {
  let select: HTMLSelectElement;
  let errorsArr: string[] = [];

  const setup = () => {
    const mock = jest.fn();
    const ref = { current: {} } as React.RefObject<HTMLSelectElement>;
    render(<DeliverySelect forwardRef={ref} errorsArr={errorsArr} errReset={mock} />);
    select = screen.getByRole('combobox');
  };

  it('should render component', async () => {
    setup();
    expect(select).toBeInTheDocument();
  });

  it('should select option', async () => {
    setup();
    expect(select.value).toBe('default');
    userEvent.selectOptions(select, screen.getByRole('option', { name: /selfexport/i }));
    expect(select.value).toBe('selfexport');
  });

  it('should show required message', async () => {
    errorsArr = ['delivery'];
    setup();
    expect(screen.getByText(/this field cannot be empty/i)).toBeInTheDocument();
  });
});
