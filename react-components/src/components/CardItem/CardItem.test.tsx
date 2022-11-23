import React from 'react';
import { render, screen } from '@testing-library/react';

import CardItem from './CardItem';
import { mockGuardianResponse } from '../../tests/mockGuardianResponse';

describe('Card item', () => {
  let item: HTMLElement;
  const testData = mockGuardianResponse().response.results[0];
  const mock = jest.fn();
  beforeEach(() => {
    render(<CardItem data={testData} toggleModal={mock} />);
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
