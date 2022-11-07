import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CardList from './CardList';
import { mockGuardianResponse } from '../../tests/mockGuardianResponse';
import { store } from '../../store';

describe('Card item', () => {
  let list: HTMLElement;
  const testData = mockGuardianResponse().response.results;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CardList dataArr={testData} />
        </MemoryRouter>
      </Provider>
    );
    list = screen.getByTestId('card-list');
  });

  it('should render component', async () => {
    expect(list).toBeInTheDocument();
  });

  it('should render correct number of items', async () => {
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(testData.length);
  });
});
