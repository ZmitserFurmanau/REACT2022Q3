import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';

import AppRouter from './router/AppRouter';
import mockLocalStorage from './tests/mockLocalStorage';
import { mockGuardianResponse } from './tests/mockGuardianResponse';
import { store } from './store';

const { setItemMock } = mockLocalStorage();
const mockedResponse = mockGuardianResponse();

describe('App', () => {
  const server = setupServer(
    rest.get(`https://content.guardianapis.com/search`, (_req, res, ctx) => {
      return res(ctx.json(mockedResponse));
    })
  );

  let input: HTMLInputElement;

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    window.scrollTo = jest.fn();
    input = screen.getByPlaceholderText(/Search/i);
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

  it('should open article page', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, 'california');
    expect(input).toContainHTML('california');

    const button = screen.getByRole('button', {
      name: /find/i,
    });
    userEvent.click(button);
    const loader = await screen.findByTestId('loader');
    await waitForElementToBeRemoved(loader);
    const cards = await screen.findAllByRole('listitem');
    const card = cards[0];
    userEvent.click(card);

    let articlePage;

    await waitFor(() => {
      articlePage = screen.getByTestId('article');
    });

    expect(articlePage).toBeInTheDocument();

    expect(articlePage).toContainHTML(mockedResponse.response.results[0].fields.standfirst);
    expect(articlePage).toContainHTML(mockedResponse.response.results[0].fields.shortUrl);

    const goBackButton = screen.getByRole('button', {
      name: /go back/i,
    });

    userEvent.click(goBackButton);

    expect(await screen.findByTestId('home')).toBeInTheDocument();
  });
});

describe('Error page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/wrong-url']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    input = screen.getByPlaceholderText(/Search/i);
  });

  it('should save/read input value to/from localstorage', () => {
    userEvent.clear(input);
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
  });
});
