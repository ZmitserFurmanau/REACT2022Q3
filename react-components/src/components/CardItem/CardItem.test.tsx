import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CardItem from './CardItem';
import { mockGuardianResponse } from '../../tests/mockGuardianResponse';
import { store } from '../../store';

describe('Card item', () => {
  let item: HTMLElement;
  const testData = mockGuardianResponse().response.results[0];
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CardItem data={testData} />
        </MemoryRouter>
      </Provider>
    );
    item = screen.getByRole('listitem');
  });

  it('should render component', async () => {
    expect(item).toBeInTheDocument();
  });

  it('should render props correctly', async () => {
    const { headline } = testData.fields;
    expect(item).toHaveTextContent(headline);
  });
});
