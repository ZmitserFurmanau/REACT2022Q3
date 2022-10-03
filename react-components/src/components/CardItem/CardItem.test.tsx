import React from 'react';
import { render, screen } from '@testing-library/react';

import CardItem from './CardItem';
import data from '../../assets/data/db.json';

describe('Card item', () => {
  let item: HTMLElement;
  const testData = data[0];
  beforeEach(() => {
    render(
      <CardItem
        id={testData.id}
        title={testData.title}
        ingredients={testData.ingredients}
        price={testData.price}
        weight={testData.weight}
        ccal={testData.ccal}
      />
    );
    item = screen.getByRole('listitem');
  });

  it('should render component', async () => {
    expect(item).toBeInTheDocument();
  });

  it('should render props correctly', async () => {
    expect(item).toContainHTML(testData.title);
    expect(item).toContainHTML(testData.ingredients);
    expect(item).toContainHTML(testData.price);
    expect(item).toContainHTML(testData.weight);
    expect(item).toContainHTML(testData.ccal);
  });
});
