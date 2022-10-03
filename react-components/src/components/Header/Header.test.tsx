import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppRouter from '../../router/AppRouter';

describe('Header', () => {
  let homeLink: HTMLElement;
  let aboutLink: HTMLElement;
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    homeLink = screen.getByTestId('home-link');
    aboutLink = screen.getByTestId('about-link');
  });

  it('should render component', async () => {
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });
});
