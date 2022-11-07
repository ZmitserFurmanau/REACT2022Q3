import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Form from './Form';
import { store } from '../../store';

describe('Form page', () => {
  let form: HTMLElement;

  const setup = () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    form = screen.getByTestId('form');
  };

  it('should render page', async () => {
    setup();
    expect(form).toBeInTheDocument();
  });
});
