import React from 'react';
import { render, screen, within } from '@testing-library/react';

import CardList from './CardList';
import { mockGuardianResponse } from '../../tests/mockGuardianResponse';

describe('Card item', () => {
  let list: HTMLElement;
  const testData = mockGuardianResponse().response.results;
  const mock = jest.fn();
  beforeEach(() => {
    render(<CardList dataArr={testData} toggleModal={mock} />);
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
