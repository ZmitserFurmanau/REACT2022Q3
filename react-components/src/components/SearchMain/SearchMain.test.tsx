import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { mockGuardianResponse } from '../../tests/mockGuardianResponse';
import SearchMain from './SearchMain';
import { AppProvider } from '../../context/AppContext';

const mockedResponse = mockGuardianResponse();

describe('Main page search functionality', () => {
  const server = setupServer(
    rest.get(`https://content.guardianapis.com/search`, (req, res, ctx) => {
      return res(ctx.json(mockedResponse));
    })
  );
  let wrapper: HTMLElement;
  let input: HTMLInputElement;

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    render(
      <AppProvider>
        <SearchMain />
      </AppProvider>
    );
    input = screen.getByPlaceholderText(/Search/i);
    wrapper = screen.getByTestId('home');
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should render component', async () => {
    expect(wrapper).toBeInTheDocument();
  });

  it('should render card items', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, 'california');
    expect(input).toContainHTML('california');
    const button = screen.getByRole('button', {
      name: /find/i,
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText(mockedResponse.response.results[0].fields.headline)
      ).toBeInTheDocument();
    });
  });

  it('should open and close modal window, render modal data', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, 'california');
    expect(input).toContainHTML('california');

    const button = screen.getByRole('button', {
      name: /find/i,
    });
    userEvent.click(button);
    const loader = await screen.findByTestId('loader');
    await waitForElementToBeRemoved(loader);
    const card = screen.getAllByRole('listitem')[0];
    userEvent.click(card);

    let modalWindow;

    await waitFor(() => {
      modalWindow = screen.getByTestId('card-item-modal');
    });

    expect(modalWindow).toBeInTheDocument();
    userEvent.click(screen.getByTestId('modal-inner'));
    expect(modalWindow).toBeInTheDocument();

    expect(wrapper).toContainHTML(mockedResponse.response.results[0].fields.headline);
    expect(wrapper).toContainHTML(mockedResponse.response.results[0].fields.shortUrl);

    const closeBtn = screen.getByTestId('close-modal-button');
    userEvent.click(closeBtn);

    expect(screen.queryByTestId('card-item-modal')).not.toBeInTheDocument();
  });
});

describe('Main page network error behavior', () => {
  const server = setupServer(
    rest.get(`https://content.guardianapis.com/search`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render network error message', async () => {
    render(<SearchMain />);
    const input = screen.getByPlaceholderText(/Search/i);
    expect(input).toContainHTML('');
    userEvent.type(input, 'california');
    expect(input).toContainHTML('california');
    const button = screen.getByRole('button', {
      name: /find/i,
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText(/Something went wrong... Check your internet connection./i)
      ).toBeInTheDocument();
    });
  });
});
