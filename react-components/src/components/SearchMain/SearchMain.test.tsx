import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchMain from './SearchMain';

describe('Search form', () => {
  let wrapper: HTMLElement;
  let input: HTMLInputElement;
  beforeEach(() => {
    render(<SearchMain />);
    input = screen.getByPlaceholderText(/Search/i);
    wrapper = screen.getByTestId('home');
  });

  it('should render component', async () => {
    expect(wrapper).toBeInTheDocument();
  });

  it('should input type', async () => {
    expect(input).toContainHTML('');
    userEvent.type(input, 'Test query');
    expect(input).toContainHTML('Test query');
  });
});
