import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AppRouter from './router/AppRouter';
import mockLocalStorage from './tests/mockLocalStorage';
import { mockGuardianResponse } from './tests/mockGuardianResponse';

const { getItemMock, setItemMock } = mockLocalStorage();
const mockedResponse = mockGuardianResponse();

describe('App', () => {
  const server = setupServer(
    rest.get(`https://content.guardianapis.com/search`, (req, res, ctx) => {
      return res(ctx.json(mockedResponse));
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should render app component', async () => {
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('should change pages', async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
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

  it('should save/read input value to/from localstorage', () => {
    expect(input).toContainHTML('');
    userEvent.type(input, value);
    expect(input).toContainHTML(value);

    const aboutLink = screen.getByTestId('about-link');
    const button = screen.getByRole('button', {
      name: /find/i,
    });
    userEvent.click(button);
    userEvent.click(aboutLink);
    expect(setItemMock).toHaveBeenCalledWith(key, value);

    const homeLink = screen.getByTestId('home-link');
    userEvent.click(homeLink);
    expect(getItemMock).toHaveBeenCalledWith(key);
  });
});
