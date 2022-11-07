import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRouter from '../../router/AppRouter';
import { store } from '../../store';

describe('Header', () => {
  let homeLink: HTMLElement;
  let aboutLink: HTMLElement;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    homeLink = screen.getByTestId('home-link');
    aboutLink = screen.getByTestId('about-link');
  });

  it('should render component', async () => {
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });
});
