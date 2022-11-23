import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import mockLocalStorage from './tests/mockLocalStorage';

const { getItemMock, setItemMock } = mockLocalStorage();

describe('App', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
  });

  it('should render app component', async () => {
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('should change pages', async () => {
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about')).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});

describe('Error page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/wrong-url']}>
        <AppRouter />
      </MemoryRouter>
    );
  });

  it('should show error 404 page', async () => {
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});

describe('Local storage', () => {
  let input: HTMLInputElement;
  const key = 'zmitserfurmanau-search-query';
  const value = 'Test query';

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    input = screen.getByPlaceholderText(/Search/i);
  });

  it('should save input value to localstorage', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, value);
    expect(input).toContainHTML(value);

    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(setItemMock).toHaveBeenCalledWith(key, value);
  });

  it('should read input value from localstorage', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, value);
    expect(input).toContainHTML(value);

    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(getItemMock).toHaveBeenCalledWith(key);

    const homeLink = screen.getByTestId('home-link');
    userEvent.click(homeLink);
    expect(getItemMock).toHaveBeenCalledWith(key);
  });
});
