import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppRouter from '../../router/AppRouter';

describe('Header', () => {
  let mainLink: HTMLElement;
  let aboutLink: HTMLElement;
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    mainLink = screen.getByTestId('main-link');
    aboutLink = screen.getByTestId('about-link');
  });

  it('should render component', async () => {
    expect(mainLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });
});
