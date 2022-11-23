import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import SearchForm from './SearchForm';
import { store } from '../../store';

describe('Search form', () => {
  let input: HTMLInputElement;
  beforeEach(() => {
    const mock = jest.fn();
    render(
      <Provider store={store}>
        <SearchForm setQuery={mock} setSorting={mock} setPage={mock} setItemsPerPage={mock} />
      </Provider>
    );
    input = screen.getByPlaceholderText(/Search/i);
  });

  it('should render component', async () => {
    expect(input).toBeInTheDocument();
  });

  it('should input focus', async () => {
    expect(input).toHaveFocus();
    input.focus();
  });

  it('should input value if localstorage contain in', async () => {
    userEvent.type(input, 'test');
    expect(input).toBeInTheDocument();
  });
});
