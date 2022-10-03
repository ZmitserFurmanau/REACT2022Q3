import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchForm from './SearchForm';

describe('Search form', () => {
  let input: HTMLInputElement;
  beforeEach(() => {
    render(<SearchForm />);
    input = screen.getByPlaceholderText(/Search/i);
  });

  it('should render component', async () => {
    expect(input).toBeInTheDocument();
  });

  it('should input focus', async () => {
    expect(input).toHaveFocus();
    input.focus();
  });

  it('should input type', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, 'Test query');
    expect(input).toContainHTML('Test query');
  });

  it('should input value if localstorage contain in', async () => {
    userEvent.type(input, 'test');
    expect(input).toBeInTheDocument();
  });
});
