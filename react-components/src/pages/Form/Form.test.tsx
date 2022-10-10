import React from 'react';
import { render, screen } from '@testing-library/react';

import Form from './Form';

describe('Form page', () => {
  let form: HTMLElement;

  const setup = () => {
    render(<Form />);
    form = screen.getByTestId('form');
  };

  it('should render page', async () => {
    setup();
    expect(form).toBeInTheDocument();
  });
});
